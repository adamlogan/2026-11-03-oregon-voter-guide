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
