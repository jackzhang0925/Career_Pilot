# Acceptance validation

Last audited: 2026-07-21

| Requested outcome | Status | Validation evidence |
| --- | --- | --- |
| Work inside `Career_Pilot` and preserve GitHub-ready documentation | Complete | All changes are confined to this repository; `CHANGELOG.md`, README, architecture, deployment, PR template, and this acceptance matrix are updated. |
| Streamlined LinkedIn connection | Complete within the documented browser boundary | Saving keywords/location immediately adds a LinkedIn search card to Dashboard; no browser-connection confirmation is required. The app explicitly does not read passwords, cookies, or signed-in results. |
| LinkedIn scoring | Complete for user-authorized imports | A user can paste a LinkedIn job URL and full description, then import it for profile-based scoring. The resulting Dashboard row is labeled “LinkedIn · 用户导入”, survives public-board refreshes, and is re-scored after profile changes; an unscored saved search never appears as a scored job. |
| Dashboard fetching alignment | Complete | Browser hydration no longer persists demo data before saved state is restored; prior requests are cancelled and stale responses cannot commit; current results remain visible while refreshing; queued jobs are preserved. |
| Real-time job fetching | Complete for public boards | Initial load, visible-tab five-minute interval, and tab-return refresh are implemented. Greenhouse, Lever, and Ashby adapters returned live results during the audit, with update time and partial-failure reporting. LinkedIn is intentionally excluded from background fetching. |
| Missing function logic | Complete for exposed controls | Filtering, score/company sorting, help, notifications, source toggles, status restoration, resume upload, coaching shortcuts, roadmap target updates, API test modal, and close/remove flows have handlers. |
| Collaborative development CI | Complete | Pull requests and collaborator branches run locked install, lint, production build, API tests, and rendered-page tests with concurrency cancellation and read-only repository permissions. |
| Free live demo from GitHub | Complete; owner must enable Pages once | `Actions → Launch GitHub Pages Demo → Run workflow` and pushes to `main` validate, build a static demo, upload a Pages artifact, and deploy without Cloudflare credentials. |
| Comprehensive changelog | Complete | `CHANGELOG.md` records added, changed, fixed, and security behavior, including audit fixes. |
| Resume-triggered career conversation | Complete | A synthetic TXT resume was parsed in the browser, local profile inference ran, and the UI automatically opened the coach with a resume-specific evidence question. |
| Career-switch discussion | Complete | Free-form messages and quick prompts produce evidence-focused follow-ups; local fallback works without an API key. |
| Vivid learning roadmap | Complete | Four staged periods include measurable outcomes and a practical project; changing the target role rebuilds the roadmap for the new role. AI mode can return 3–5 customized stages. |
| Safe local API-key testing window | Complete | Password-masked input, model validation, session-only memory storage, removal, coach handoff, Escape/close behavior, and loopback-only server enforcement are implemented. |
| Mobile access | Complete | All eight navigation destinations remain available through a horizontally scrollable bottom navigation. |

## External acceptance still requiring the repository owner

These are not implementation gaps, but they cannot be truthfully completed without owner-controlled accounts or credentials:

1. In **Settings → Pages**, select **GitHub Actions** as the publishing source, then run the Pages workflow once.
2. Use the local API test window with a real OpenAI key to validate the selected model on the owner’s account. Do not paste the key into an issue, commit, chat, screenshot, or test fixture.
3. Open the generated LinkedIn search in the owner’s browser session. For scoring, copy one job’s link and full description into the opt-in importer; the application deliberately does not inspect the login state itself.

## Commands used for repository acceptance

```bash
npm run check
npm run build:demo
git diff --check
```
