# Verification

11 automated tests pass:
- Detector warnings, repeated use, benign wording and safe link display.
- Eight balanced cases per round; ten rounds exhaust all 80 unique messages before recycling.
- Bounded speed scoring and complete case data.
- Two-player API lifecycle: room creation, join, authentication, host-only start, synchronized cases, unique answers, score calculation, final standings and expiry cleanup.
- Disallowed origins and oversized requests rejected.

Browser verification in Chrome:
- Played the original five scenarios to completion and verified wrong-answer feedback, replay and reset.
- Verified the revised eight-case round renders all case files and evidence.
- Timed solo awarded 130 points for a correct call with approximately 15 seconds remaining, and froze the timer for reading feedback.
- A real hosted live room connected two separate browser sessions, synchronized cases and clocks, awarded 114 points to a correct answer and zero to an incorrect answer, updated both leaderboards, and progressed to final standings.
- Verified custom-message analysis and text-only rendering of HTML-like input.
- Verified phone navigation at 390px and no horizontal overflow before the final footer addition.
- Verified help, FAQ and field-guide dialogs.
- Fixed the reported notebook magnifier/text overlap with a dedicated icon box.

This is a casual open-source learning game. The public case bank can be studied; it is not an exam or prize-award system. Messages are checked locally. Live rooms share only nickname, game answers, timing, and scores.

## Gemma 4 addition

15 automated tests now pass, including request construction, fixed system instructions, no tools, server-side key handling, structured output validation, explicit consent enforcement, missing-key behavior, and local MIME email import. AI inputs are limited to 2000 characters with aggregate rate limits. Direct Gmail OAuth is not configured.

Live Gemma checks returned likely_scam for credential phishing, no_obvious_signs for a lunch invitation, and likely_scam for phishing containing an instruction override. The model identified the injected instruction as evidence and did not follow it.
