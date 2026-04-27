# Security Policy

## Supported versions

SiliWiki is pre-1.0. Security fixes target the latest `main` branch unless a maintainer announces release branches.

## Reporting a vulnerability

Until official public contact details are added, please open a private GitHub security advisory if available, or create a minimal issue without exposing sensitive details.

## Local content safety

SiliWiki validates content packs for obvious secret-looking files and token patterns, but validation is not a substitute for human review.

Never commit:

- `.env` files
- API keys or OAuth secrets
- private keys / certificates
- cookies, session dumps, JWTs
- real customer or student data without explicit permission
