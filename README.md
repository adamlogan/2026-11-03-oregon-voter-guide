# Oregon 2026 Endorsement Guide

A buildless, responsive static site for GitHub Pages. Open `index.html` locally; there are no dependencies or API keys. The site also works beneath a repository subpath.

## Publish with GitHub Pages

Repository: https://github.com/adamlogan/2026-11-03-oregon-voter-guide

The website files belong at the repository root. No build or installation is needed.

1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose **main** and **/(root)**, then **Save**.
4. GitHub displays the public site link when publishing finishes.

Expected site address: https://adamlogan.github.io/2026-11-03-oregon-voter-guide/

## Files

- `index.html`, `style.css`, `app.js`: interface, filters and accessible information dialogs.
- `data.js`: browser dataset; loaded as a script so a local file preview works.
- `data.json`: identical downloadable dataset.
- `methodology.html`: sourcing rules, coverage and known discrepancies.
- `verify.cjs`: dataset and filter checks; run `node verify.cjs`.

## Editing data

Use unique item/entity IDs. A candidate has an election-office source; each claim has its issuer ID, evidence URL, attribution, stage, position, note and check date. Do not treat a homepage or an old endorsement list as evidence for a new claim. Check final November roster and withdrawals before adding any candidate. Preserve party nomination separately from endorsement. Do not merge organizations just because their names resemble one another.

Update data.js and data.json together, then run validation. Update the research date, coverage counts and discrepancy notes in the methodology. The research date means checked, not that every endorsement was independently confirmed by its issuer. The site never automatically refreshes.

## Current limits

Partial research release: 153 listings, 73 contests, 287 claims, 40 entities. All federal House races, Senate and governor included; selective legislative/local coverage. Multnomah local candidate source is a November filing list rather than a final certified list. Some 2026 issuer pages do not specify stage. The methodology records these limitations and research gaps prominently.

UI checks should include phone-width layout, keyboard navigation, Escape and focus return in dialogs, any/all entity matches, source/stage filters, no-match states, reset, shared links and a GitHub project subpath. No third-party scripts, cookies or tracking.

## GitHub in plain language

- **Repository (repo):** this project folder, stored on GitHub.
- **Commit:** a saved version with a short description and an ID. Earlier versions remain in the history.
- **Push:** upload saved changes to GitHub. The browser upload creates a commit directly on GitHub.
- **Branch:** a named line of work. `main` holds the published project version.
- **GitHub Pages:** GitHub’s service for turning these files into a public website. Uploading a commit and publishing the website are separate steps.

For the simplest publishing setup: **Settings → Pages → Deploy from a branch → main → /(root) → Save**. No custom Actions workflow is required for this setup.

## Expanded research revision

The source review expanded Merkley from 2 to 21 sourced records (including a recommendation to NEA and one explicitly labeled primary-cycle record), and added SEIU/OEA slate coverage for roster-backed candidates already present. Recommendations use the same simple candidate support view; their exact nature is explained in the info cards.
