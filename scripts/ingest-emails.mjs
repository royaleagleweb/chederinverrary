#!/usr/bin/env node
// ingest-emails.mjs — stream a big file of emails into the bulk bad/good lists.
//
// Built for volume: reads the input line-by-line (never loads the whole file
// into memory), dedupes against what's already on the list, and appends only
// the new addresses. Handles hundreds of thousands of rows without crushing.
//
// Usage:
//   node scripts/ingest-emails.mjs <bad|good> <input-file> [--replace]
//
// The input can be a plain list, a CSV, or any text — every email-looking
// token on each line is extracted. A bare "@domain.com" is kept as a
// whole-domain rule. Pass --replace to overwrite the list instead of append.
//
// Examples:
//   node scripts/ingest-emails.mjs bad  spam-dump.csv
//   node scripts/ingest-emails.mjs good customers-export.txt
//   node scripts/ingest-emails.mjs bad  blocklist.txt --replace

import { createReadStream, existsSync, createWriteStream } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, '..', 'data');

const EMAIL_RE = /[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}/g;
const DOMAIN_RE = /^@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

function fail(msg) {
  console.error('Error: ' + msg);
  console.error('Usage: node scripts/ingest-emails.mjs <bad|good> <input-file> [--replace]');
  process.exit(1);
}

const args = process.argv.slice(2);
const replace = args.includes('--replace');
const positional = args.filter(a => !a.startsWith('--'));
const list = positional[0];
const inputPath = positional[1];

if (list !== 'bad' && list !== 'good') fail('first argument must be "bad" or "good".');
if (!inputPath) fail('second argument must be the input file path.');
if (!existsSync(inputPath)) fail('input file not found: ' + inputPath);

const listPath = resolve(DATA_DIR, `${list}-emails.txt`);

// Pull out every address (and any bare @domain tokens) from one line of text.
function extract(line) {
  const out = [];
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return out;
  // Bare whole-domain rule, e.g. "@mailinator.com"
  for (const tok of trimmed.split(/[\s,;]+/)) {
    if (DOMAIN_RE.test(tok)) out.push(tok.toLowerCase());
  }
  const matches = trimmed.match(EMAIL_RE);
  if (matches) for (const m of matches) out.push(m.toLowerCase());
  return out;
}

// Load the existing entries (and preserved header comments) for dedupe.
async function loadExisting() {
  const have = new Set();
  let header = '';
  if (!existsSync(listPath)) return { have, header };
  const text = await readFile(listPath, 'utf8');
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('#')) { header += raw + '\n'; continue; }
    if (line) have.add(line.toLowerCase());
  }
  return { have, header };
}

async function main() {
  const { have, header } = replace ? { have: new Set(), header: '' } : await loadExisting();
  const startCount = have.size;

  // Re-read the original header even on --replace so the file stays documented.
  let keepHeader = header;
  if (replace && existsSync(listPath)) {
    const text = await readFile(listPath, 'utf8');
    keepHeader = text.split('\n').filter(l => l.trim().startsWith('#')).join('\n') + '\n';
  }

  const out = createWriteStream(listPath, { flags: replace ? 'w' : 'a' });
  if (replace && keepHeader.trim()) out.write(keepHeader);

  let scanned = 0, added = 0;
  const rl = createInterface({
    input: createReadStream(inputPath, { encoding: 'utf8' }),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    scanned++;
    for (const addr of extract(line)) {
      if (have.has(addr)) continue;
      have.add(addr);
      out.write(addr + '\n');
      added++;
    }
    if (scanned % 100000 === 0) process.stdout.write(`  …scanned ${scanned} lines, ${added} new\n`);
  }

  await new Promise(res => out.end(res));

  console.log(`\nDone. List: ${list}`);
  console.log(`  input lines scanned : ${scanned}`);
  console.log(`  new entries added   : ${added}`);
  console.log(`  total on list now   : ${have.size}${replace ? '' : ` (was ${startCount})`}`);
  console.log(`  file                : data/${list}-emails.txt`);
  console.log(`\nCommit data/${list}-emails.txt to publish it.`);
}

main().catch(e => { console.error(e); process.exit(1); });
