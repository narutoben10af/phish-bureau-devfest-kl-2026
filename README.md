# The Phish Bureau

A playable detective workstation for suspicious messages, by Eian. DevFest KL 2026 Vibing Lounge, challenge 03.

## Play

- **Practice:** eight shuffled cases, no clock, 100 points per correct call.
- **Beat the clock:** 20 seconds per case; 100 points per correct call plus up to 40 speed points. Wrong answers and timeouts score zero.
- **Live room:** host/join by six-character code, up to 24 players, synchronized server clocks, server-calculated scores and a shared leaderboard. New players join before the host starts.
- **Message lab:** Gemma 4 AI assessment with explicit sharing consent, plus a separate local pattern check. Paste text or locally import a plain-text .eml email.

The bank contains 80 authored fictional messages across 16 situations. Ten balanced eight-case solo rounds use all 80 without repeats in the same session, then the deck reshuffles. This is a casual learning game; the source bank is public and not suitable for adversarial exams or prize awards.

## Run and test

`npm start` serves `dist` at http://localhost:4173. No frontend installation or build is needed.

`npm test` runs 15 detector, shuffle, scoring and multiplayer API tests. Node 22.13+ is required for the test-only in-memory SQLite adapter.

## Deployments

- GitHub Pages serves the frontend through `.github/workflows/pages.yml` on pushes to `main`.
- `room-server/` contains all live-room backend source, its database schema and generated migrations. It is separately hosted through ChatGPT Sites because GitHub Pages cannot run a shared room server.
- The endpoint is declared as `ROOM_API` in `dist/app.js`.
- `room-server/build.mjs` embeds the shared case bank into a dependency-free Worker module. After changing the bank, synchronize `dist/cases.mjs` to `room-server/shared/cases.mjs` before building.
- Backend hosting identity is in `room-server/.openai/hosting.json`; it contains no secret. No credentials belong in this repository.

## Privacy and contact

Local checks remain on the device. AI review sends message text through the backend to Google’s Gemini API using gemma-4-26b-a4b-it. The app does not store message text or model responses. Free-tier Google processing may use submissions for product improvement; the form discloses this. Live room nicknames, answers, scores and timings are stored on the room server; room access expires after two hours, and expired data is purged when another room is created. Player credentials are randomly generated, stored in tab session storage, and hashed in the database. Only hosts can start. The server rejects duplicate or late submissions.

The frontend uses Google Fonts. It adds no advertising trackers or analytics cookies. Privacy policy and FAQ are linked in the footer.

Portfolio: https://eian-portfolio-2026.narutoxkillua.chatgpt.site

Enquiries: limsieian@gmail.com. Contact links open the visitor’s mail client. No automatic reply or continuous inbox monitoring is configured by this site.

## References and assistance

- Safety guidance: https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams
- Interface research: Front inbox and multi-column application patterns on https://mobbin.com/explore/web . No proprietary screenshots or assets are redistributed.
- Antigravity assisted with core message-checker review. See ANTIGRAVITY-HANDOFF.md for its actual contribution and applied findings.

Independent prototype. Not affiliated with Deriv. No competition submission was made automatically.

## Gemma 4 configuration

Set `GEMINI_API_KEY` as a secret environment variable on the room-server Site, then deploy a saved version to apply it. Never put a key into frontend code, GitHub, or hosting.json. The `/analyze` route uses a fixed scam-review instruction, no tools, 2000-character inputs, 25-second model timeout, response validation, and aggregate limits of 10 requests/minute and 250/day. Quota counters contain no messages or email addresses. If the provider is unavailable, the UI reports that honestly and offers the separate local checker.

Direct mailbox OAuth is not configured. Email import is local, and AI sharing requires explicit consent.

## Message-first home and Gmail beta

The default page is the message checker, with shared navigation for Check a message, Practice, Beat the clock and Live room. Room creation and joining have separate controls; pasted join codes accept spaces and lowercase. Real generated codes exclude 0 and 1.

The optional Gmail picker uses Google Identity Services with gmail.readonly. Its public OAuth client ID is configured in dist/gmail-config.mjs. Access tokens stay in tab memory. It lists at most 12 headers and reads one chosen plain-text body; no sending, deleting, HTML execution, or attachment fetches. Gmail-derived messages are blocked from the current free Gemma endpoint and use local checks. Google OAuth testing/verification controls who may connect.

Validation: 17 tests passed, including bounded Gmail requests and body extraction. Browser checks covered the message-first home, local analysis and return navigation, mobile layout, and creating a real room then joining from a second tab using a spaced lowercase code.
