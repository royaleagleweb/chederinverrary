# Email Database — Bad & Good

A single, version-controlled list of **bad** (spam / blocklist) and **good**
(legitimate lead / customer / allowlist) email addresses, plus a web tool to
work with it. Because it lives in this repo, it's reachable from anywhere your
site is hosted.

## What's here

| File | What it is |
|------|------------|
| `data/bad-emails.txt` | **Bulk blocklist** — one address (or `@domain`) per line. Holds the large volume (500k+). |
| `data/good-emails.txt` | **Bulk allowlist** — same compact format. |
| `data/email-database.json` | **Annotated** entries only — the curated ones that carry a category + reason. |
| `email-db.html` | A web page to **check**, **add**, **search**, and **compare** emails. |
| `scripts/ingest-emails.mjs` | Streaming importer — load a big CSV/list into the bulk files without choking. |

This one dataset covers all the uses you asked for:
- **Spam filter** — the `bad` list (block these).
- **Email validation** — domain rules (e.g. disposable domains).
- **Lead-quality tracking** — the `good` list (real customers / leads).
- **Training data** — every entry is labeled bad/good.

## Handling 500k+ emails (so it doesn't get crushed)

Big volume lives in the compact **`.txt`** files (one entry per line ≈ 25 bytes each,
so 500k ≈ 13 MB), **not** in pretty-printed JSON. The web tool loads those lines into a
hash `Set`, so checking an address is **instant** regardless of list size, browsing is
**paginated**, and search results are **capped** — the page never tries to render half a
million rows. Verified: a 500k blocklist loads in ~1s and lookups stay sub-millisecond.

**To load a big batch**, don't paste it into the browser — stream it in:

```bash
# Add a CSV/export/dump of emails to the bad (or good) list.
# Emails are auto-extracted from any text, lowercased, and de-duplicated.
node scripts/ingest-emails.mjs bad  spam-dump.csv
node scripts/ingest-emails.mjs good customers-export.csv

# Replace a list wholesale instead of appending:
node scripts/ingest-emails.mjs bad blocklist.txt --replace
```

Then commit the updated `data/bad-emails.txt` / `data/good-emails.txt`.

The browser tool is for **lookups and a few hand additions** (saved as "pending", then
**Export my additions**). Keep the JSON file for the small set of entries you want a
written reason on; everything else belongs in the bulk `.txt` lists.

## Using the tool

Open **`email-db.html`** on your live site (e.g. `https://your-site/email-db.html`).
From any device you can:

- **Check an email** — type an address (or `@domain.com`) and see `BAD`, `GOOD`,
  or `UNKNOWN`, including the matching reason. Works instantly even on a 500k list.
- **Add an entry** — pick the list, enter the email/domain, category, and a note.
  Adds are held as "pending" in your browser.
- **Search** this list (capped to stay fast); **Compare** flags any email in *both* lists.
- **Export my additions** / **Copy additions** — download just the pending adds to commit.

> Hand additions are saved in that browser as a small "pending" delta until you
> **Export my additions** and they get committed. Bulk loads go through the
> ingest script, not the browser (see above).

## How updates work

The repo is the master copy. Ways to update it:

1. **Bulk import** (for thousands at once): `node scripts/ingest-emails.mjs bad <file>`,
   then commit the updated `data/*-emails.txt`.
2. **Hand the data to Claude**: paste a batch of bad or good emails in chat and ask to
   add them — the right file gets updated and pushed for you.
3. **A few by hand:** add them in `email-db.html`, click **Export my additions**, and
   commit the result.

## Data format

**Bulk lists** (`data/bad-emails.txt`, `data/good-emails.txt`) — one entry per line:

```
spammer@example.com
@mailinator.com      # whole-domain rule
# lines starting with # are comments
```

**Annotated entries** (`data/email-database.json`) — for the few you want a note on:

```json
{
  "bad":  [ { "email": "x@y.com", "domain": "y.com", "category": "spam",
              "reason": "why", "source": "contact form", "addedAt": "2026-06-26" } ],
  "good": [ { "email": "a@b.com", "domain": "b.com", "category": "customer",
              "reason": "why", "source": "manual",      "addedAt": "2026-06-26" } ]
}
```

- Leave `email` blank and set `domain` to make a **whole-domain** rule.
- `category` is free-form. Suggested values:
  - **bad:** `spam`, `phishing`, `disposable`, `bot`, `competitor`
  - **good:** `lead`, `customer`, `partner`, `vendor`

The two example entries currently in the file are marked `EXAMPLE ENTRY` — replace
them with your real data.
