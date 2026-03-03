# Claude Code Project Instructions

## Project Overview

**CV Builder** - An online CV builder application built with React and TypeScript.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS v4
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint 9 (flat config) + Prettier
- **Package Manager**: npm (do NOT switch to pnpm/yarn)
- **Node**: >= 20

## Architecture

Domain-oriented folder structure:

```
src/
├── app/        # App shell, routing, providers
├── core/       # Shared types, config, app-wide utilities
├── features/   # Feature slices (self-contained modules with components, hooks, tests)
├── shared/     # Reusable UI components, hooks, styles
└── test/       # Test setup and utilities
```

- Tests are **colocated** with their source files (e.g., `HomePage.test.tsx` next to `HomePage.tsx`)
- Each feature module should be self-contained

## Key Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format
npm run format:check # Prettier check
npm run typecheck    # TypeScript check
npm run test         # Run tests
npm run test:watch   # Tests in watch mode
```

## Git Configuration

This repo uses a **personal GitHub account** (not company):

- **Remote**: `git@github-personal:Juanfe98/cv-generation.git`
- **User**: juanfe98
- **Email**: juanmontana1398@gmail.com

The remote uses the `github-personal` SSH host alias configured in `~/.ssh/config`.

## CI/CD

GitHub Actions workflow at `.github/workflows/ci.yml`:
- Triggers on PR and push to main
- Runs: install, lint, typecheck, test

## Conventions

- Do NOT add `Co-Authored-By` trailers to commits
- Keep PRs focused and single-purpose
- Run `npm run lint && npm run typecheck && npm run test` before committing

## Working Style

- **Ask before assuming**: If a ticket or task is missing context or requirements are unclear, ASK the user for clarification before implementing. Do not infer or assume - have a conversation to clarify.
- Prefer simple, minimal solutions over overengineered ones
