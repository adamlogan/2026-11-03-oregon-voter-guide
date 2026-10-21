## October 21, 2026 — live accessibility verification

Published through GitHub Pages and checked in the in-app browser:

- Keyboard skip link focuses the filter heading. Enter opens a candidate dialog at its heading. Tab and Shift+Tab wrap at the dialog boundaries; Escape restores the opener. The boundary fix was made after a native-dialog backward-Tab gap was observed.
- An empty search returns zero results and a working reset. Reset focuses search and restores 400 listings / 173 contests / 1,200 claims. Searching the entity list hides options without losing selected entities or changing result counts. A combined Sierra chapter/national plus Marion/all-selected view returns three listings and six claims; reset clears both selections and geography.
- The actual main guide, published guides, source review and methodology were embedded at 320 CSS pixels. All four reported no horizontal page overflow with normal and doubled default text sizes. With scrollbars the available content width was 305 CSS pixels. This checks narrow reflow and text enlargement, not physical-phone behavior or browser-zoom UI.
- Six source palettes passed contrast calculations. OS-level preference switching and screen-reader speech output were not emulated or certified. No physical-device or end-user assistive-technology audit was performed.

## October 21, 2026 — accessibility source checks

Data/filter and download regressions pass. The focused accessibility harness verifies dialog heading focus, scroll reset and focus return/fallback; resetting empty results; coalescing rapid result announcements; retaining selections during entity search; semantic skip/table/dialog markup; and unchanged dependency footprint. Six source palettes pass contrast calculations: minimum normal text 4.93:1, minimum control/focus boundary 3.86:1. These are source checks, not an assistive-technology certification.

## October 21, 2026 — conservative-source additions

Dataset: 400 listings, 173 contests, 1,200 attributed claims, 47 distinct entities.

Added 90 records from Oregon Right to Life PAC (30), Taxpayers Association of Oregon (20), Oregon Firearms Federation PAC (3), Stand for Health Freedom (21), and Deschutes County Republican Party (16). Added the current Oregon Family Council questionnaire-guide resource without treating questionnaire answers as endorsements. Added 18 candidates from official November election sources and two AFSCME claims after matching the new local races.

Regression checks distinguish the Stand for Health Freedom recommendation from its 20 endorsements, 15 Deschutes party listings from its measure position, and OFFPAC primary support from the campaign-reported general-election claim. Checks exclude the May-only county race and the ambiguous research-only candidate mention. Existing filters include the recommendation through the shared candidate-support choice. Source-review counts match the dataset; local links include the new published-guides page.

Download behavior is checked through the behavioral harness, without opening a blocking native confirmation during browser review. Public source guides requiring an address or request form remain links to the publisher; no personal information was submitted.

## October 19, 2026 — reconciliation checks

Dataset: 382 listings, 164 contests, 1,108 attributed claims, 42 distinct entities.

Passed dataset parity, unique identities, source protocols, one claim per entity/candidate, geography/search/any-all/confidence/stage filters, all 75 legislative contests, retained ballot conflicts, and per-entity source-audit totals. Regressions verify PPAO 65; Sierra Oregon 52; Sierra National 5; ORCOPS 36; Farm Bureau 20; Umatilla Republicans 7; historical-list exclusions; and additional evidence fields.

Download checks passed first/repeat requests, cancellation, same file with different page fragments, original filename/title interpolation, reload persistence, a fresh visit and unavailable browser storage. Native repeat prompts were tested through the behavioral harness to avoid blocking the live browser.

A source match verifies attribution in the linked source, not that an issuer independently confirms a campaign claim. This release does not claim exhaustive coverage of all Oregon organizations or local ballot items.

# Validation — October 19, 2026

Passed JavaScript syntax, dataset parity, ID/source-reference integrity, source attribution fields, local asset links, and actual filter functions. Regression checks include Merkley’s expanded records, the OEA recommendation label, the primary-cycle label and the shared candidate-support filter.

The first release was checked in the in-app browser for switches, search, measure evidence dialogs, combined filters, empty states, reset and Escape dismissal. The expanded dataset was checked with the included verification script. No physical-phone or assistive-technology audit has been performed.

Source URLs were reviewed via primary-source retrieval/indexed primary text, not an automated HTTP-success check of every URL. Current local roster and coverage limitations remain documented in the methodology.

The OLCV slate was read on its official website and matched to November election-office sources: 105 included positions, with one material Salem Ward 6 conflict withheld. Dataset checks confirm all 105 included claims are issuer-confirmed. New-race candidates were added from election-office lists, including alternatives with no verified claims.

`node verify-downloads.cjs` checks first/repeat requests, confirmation accept/cancel, fragment-normalized PDF URLs, ordinary navigation, session persistence across reloads, fresh sessions and blocked storage. The guard tracks requests, not completed browser downloads. Browser context-menu saves are outside its event handling.

This release passes all 75 legislative contest coverage, full checked Sierra Club Oregon Chapter (52), AG-PAC (42), NFIB Oregon (38), and fire fighters (57) slate counts; withheld Salem conflict; Ballotpedia non-redlinks; and per-entity source audit counts. Filename interpolation and catalog metadata are exercised without opening native browser confirmation prompts.
