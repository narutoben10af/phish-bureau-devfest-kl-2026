# The Phish Bureau

A playable detective desk for suspicious messages, built for DevFest KL 2026 Vibing Lounge, challenge 03.

## The experience

- Five fictional case files: support impersonation, parcel redelivery, an ordinary lunch plan, prize bait, and an investment pitch.
- Pin phrases to a case notebook, make a judgment, and learn why.
- Track progress, earn a detective rank, replay or revisit cases.
- Paste your own message for explainable, browser-local pattern checks with highlighted evidence.
- Responsive workstation: case inbox, evidence desk, and field notebook; three-panel navigation on phones.
- Keyboard-accessible dialogs, reduced-motion support, no dependency installation or build step.

## Run and test

`npm start` serves `dist` at http://localhost:4173.

`npm test` runs detector tests. JavaScript syntax can be checked with `node --check dist/app.js`.

## Publish

The included `.github/workflows/pages.yml` tests the detector and publishes `dist` to GitHub Pages on pushes to `main`. Set Pages build type to GitHub Actions. Asset references are relative, so repository-based Pages hosting works.

## Privacy and limits

Messages are processed locally, without storage or network submission. They disappear on reload. Google Fonts is used for typography; message text is never sent to that service. The checker uses transparent warning-pattern rules, not AI or live link reputation. It cannot verify senders or certify safety. User text is rendered using textContent and text nodes. Example URLs use reserved `.example` domains. Training progress is in memory only.

## References

- Safety guidance: [FTC phishing guide](https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams)
- Interface research: Front inbox and multi-column application examples on [Mobbin](https://mobbin.com/explore/web). No proprietary screenshots or assets are redistributed.

Independent prototype. Not affiliated with Deriv. No competition submission has been made automatically.
