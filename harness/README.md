# SiliWiki Agent Harness

This folder contains the files that make SiliWiki agent-friendly.

- `skills/siliwiki-writer/SKILL.md` is the natural-language harness for a local agent.
- `schemas/meta.schema.json` defines the expected shape of `meta.json`.
- `schemas/glossary.schema.json` defines the expected shape of `glossary.json`.
- `templates/wiki/` is the filesystem scaffold used by `siliwiki new`.

Recommended local-agent loop:

```bash
npm run skill > siliwiki-skill.md
npm run new -- my-topic --title "My Topic"
# Give siliwiki-skill.md + the user request to your local agent.
npm run validate
npm run dev
```

The harness intentionally writes plain files. This makes generated output inspectable, diffable, testable, and easy to commit.
