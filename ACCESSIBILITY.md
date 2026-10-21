# Accessibility review — October 21, 2026

This is a source-level review and improvement pass, not a certification of WCAG conformance. No accessibility overlay, runtime library, analytics or external assets were added.

## Changes

- Relative text sizes follow the browser's default font size. Wrapping headers, flexible controls, single-column small-screen filters and breakable document links reduce horizontal scrolling at zoom.
- Text, control borders, switch tracks and keyboard outlines use contrast-tested color pairs. Light/dark appearance, higher/lower contrast and reduced motion follow supported browser/system preferences. Forced-color modes use system colors and native switch inputs. Lower-contrast palettes retain at least 4.5:1 for normal text.
- Skip links reach filters, listings and supporting-page content. Labels and native selects, checkboxes, switches and disclosure controls are retained. Information buttons, entity rows and standalone filter actions have at least 44-pixel targets at the usual 16-pixel default font size.
- Information dialogs focus their heading, keep their close button outside the scrolling content, support native Escape/Tab behavior and restore focus to the opener. A removed opener falls back to search. Reset returns focus to search after rebuilding the results.
- Result and entity-search announcements are atomic and delayed briefly to avoid announcing every keystroke. Entity searching preserves selected filters. Copying a view announces success without moving focus.
- Tables have captions, column/row headers and wrapping text. Candidate/race and evidence buttons identify that they open dialogs. Campaign reports are marked in text as well as with dashed underlines.

## Verification and limits

The included `verify.cjs` and `verify-downloads.cjs` cover real filter functions, data/source integrity and session-only file-request behavior. `verify-accessibility.cjs` checks focus restoration/reset, announcement coalescing, selection retention, table/skip-link semantics, contrast values and the absence of new runtime dependencies.

Manual browser checks and any remaining limits are recorded in `VALIDATION.md`. Browser/platform support determines which display preferences are available. People may also adjust browser zoom, font settings and system colors. No physical-device, end-user assistive-technology or full screen-reader conformance audit has been performed. Please report barriers through [Github Issues](https://github.com/adamlogan/2026-11-03-oregon-voter-guide/issues).

## Reference guidance

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI modal-dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [WAI table headers](https://www.w3.org/WAI/tutorials/tables/one-header/)
- [Browser contrast preferences](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast)
