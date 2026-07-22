# Changelog

All notable changes to Career Pilot are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses semantic versioning once public releases begin.

## [Unreleased]

### Added

- Automatic dashboard refresh on initial load, every five minutes while visible, and when the browser tab becomes visible again.
- Live-data freshness metadata, partial-source warnings, and an explicit demo-data state on the dashboard.
- Lever job-board ingestion alongside the existing Greenhouse and Ashby adapters.
- Source-aware scans so disabled public sources are excluded from the next refresh.
- A resume-aware career coach that opens after upload, asks evidence-based project questions, supports career-switch exploration, and saves the conversation locally.
- A living 12-week learning roadmap with measurable outcomes and a practical portfolio project for every stage; AI responses can refine it as the target changes.
- A local coaching fallback when no OpenAI key is configured, so career exploration and the starter roadmap remain available.
- GitHub Actions CI for collaborator branches and pull requests, including locked dependency installation, linting, production build, and rendered HTML tests.
- A committed static GitHub demo build that can be opened through GitHack without Pages enablement, Cloudflare, API tokens, or paid hosting.
- A pull-request checklist and default code ownership for safer collaborative development.
- Working score filters, company/match sorting, notification feedback, help navigation, and status restoration for controls that previously had no behavior.
- A dedicated local API testing window with masked key input, model validation, one-click career-coach testing, and session-key removal.
- An opt-in LinkedIn job importer that scores user-supplied job links and full descriptions against the current profile, then adds them to the Dashboard with explicit provenance.

### Changed

- Replaced the invalid `gpt-5.6` default with the explicit current API model ID `gpt-5.6-sol` across runtime routes, local test UI, environment examples, tests, and documentation.
- Removed the manual LinkedIn browser-connection confirmation flow. Saved LinkedIn search conditions now appear directly on the Dashboard with a one-click results link.
- Dashboard copy now distinguishes automatically fetched public-board results, an unscored LinkedIn saved search, and LinkedIn jobs explicitly imported by the user for scoring.
- Scan responses now disable caching, report the fetch timestamp, and identify individual source failures.
- Source counts in the interface now match the adapters that are actually implemented.
- Dashboard dates and update times are generated from the current locale instead of hard-coded sample timestamps.
- Resume upload now continues directly into the coaching conversation after profile analysis.
- Replaced deployment-dependent Launch workflows with an explicitly labeled, repository-hosted static demo and freshness validation. Server-only scanning and AI endpoints are disabled while browser-local demo features remain interactive.

### Fixed

- Restored access to profile, sources, settings, materials, and career coaching on mobile by making the complete bottom navigation horizontally scrollable.
- Fixed roadmap target changes using stale state, so leaving the target field immediately rebuilds every stage for the newly entered role.
- Prevented the initial demo state from overwriting saved browser jobs during React hydration.
- Prevented an older, slower scan response from replacing a newer dashboard refresh by cancelling superseded requests and checking request identity.
- Preserved accepted jobs when a fresh scan no longer returns their original posting.
- Kept existing results visible while a background refresh runs, avoiding the empty/misaligned dashboard state.
- Converted upstream HTTP failures into partial-source status instead of silently counting failed boards as successful.
- Restored the source hosting manifest required by the existing build configuration.
- Kept user-imported LinkedIn jobs through scheduled public-board refreshes and re-scored them when the target profile changes.
- Replaced the static sidebar job count with the current position-pool size; imported jobs now open directly in the complete position pool even when their score is below the radar threshold.
- Added an explicit remove action for user-imported LinkedIn jobs so opt-in data can be deleted from the local position pool.

### Security

- The public Demo has no deployment credentials or server-side API keys; GitHub’s short-lived Pages deployment identity is limited to the workflow’s `pages: write` and `id-token: write` permissions.
- Temporary user-supplied OpenAI keys can only be set or removed from loopback hosts, preventing the session-key endpoint from becoming a shared production credential surface.
- LinkedIn passwords and cookies remain outside the application. The app does not scrape, screenshot, or automate signed-in LinkedIn pages; job scoring only uses content the user explicitly imports.
- Career coaching prompts prohibit invented resume facts, sensitive-attribute inference, and guaranteed employment outcomes.
- The coaching interface explicitly discloses when resume text and recent messages are sent to the configured OpenAI API; local coaching does not transmit them.
- Resume upload copy now accurately distinguishes local file storage from optional AI text processing.

## [0.1.0] - 2026-07-21

### Added

- Initial local-first career dashboard, resume/profile workflow, public job-board scanning, application queue, materials placeholders, and OpenAI key configuration.
