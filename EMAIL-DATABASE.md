# Email Database — Bad & Good

A single, version-controlled list of **bad** (spam / blocklist) and **good**
(legitimate lead / customer / allowlist) email addresses, plus a web tool to
work with it. Because it lives in this repo, it's reachable from anywhere your
site is hosted.

## What's here

| File | What it is |
|------|------------|
| `data/email-database.json` | The data — the single source of truth. Two lists: `bad` and `good`. |
| `email-db.html` | A web page to **check**, **add**, **search**, and **compare** emails. |

This one dataset covers all the uses you asked for:
- **Spam filter** — the `bad` list (block these).
- **Email validation** — domain rules (e.g. disposable domains).
- **Lead-quality tracking** — the `good` list (real customers / leads).
- **Training data** — every entry is labeled bad/good with a category and reason.

## Using the tool

Open **`email-db.html`** on your live site (e.g. `https://your-site/email-db.html`).
From any device you can:

- **Check an email** — type an address (or `@domain.com`) and see `BAD`, `GOOD`,
  or `UNKNOWN`, including the matching reason.
- **Add an entry** — pick the list, enter the email/domain, category, and a note.
- **Search** the lists; **Compare** flags any email that's in *both* lists (a conflict).
- **Export JSON** / **Copy JSON** — download your edits to save them (see below).
- **Import JSON** — load a `.json` file you have.

> Edits you make in the page are saved in that browser only until you **Export**
> the JSON and it gets committed back into `data/email-database.json`.

## How updates work

The repo is the master copy. Two ways to update it:

1. **Hand the data to Claude** (easiest): paste a batch of bad or good emails in
   chat and ask to add them. The `data/email-database.json` file gets updated and
   pushed for you.
2. **Self-serve:** edit in `email-db.html`, click **Export JSON**, and commit the
   downloaded file to `data/email-database.json`.

## Data format

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
