This directory contains scripts used for CI/CD and data/artifact generation.

## Purpose

- Centralize scripts that handle pre/post CI steps (lint, build, deploy) and artifact generation.
- Collect reusable helper tools for reproducible data generation and fixture creation across the project.

## Contribution Notes

- Keep scripts idempotent. Document inputs/outputs in README files or leave clear comments.
- Do not hard-code secrets. Read them from CI secrets or `.env`.

## Maintenance

- After modifying a script, run it locally and ensure CI passes.
- If you add new use cases or directories, update this README with purpose and usage.
