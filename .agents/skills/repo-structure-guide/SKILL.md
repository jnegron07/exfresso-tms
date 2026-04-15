---
name: repo-structure-guide
description: Analyzes the current repository structure and provides suggestions so that any new changes follow the same conventions, patterns, and architecture already established in the codebase.
---

# Repo Structure Guide

## Purpose

When activated, analyze the repository to understand its existing conventions and provide concrete, project-specific suggestions so that any new code, files, or features follow the same structure.

## Instructions

### Step 1 — Explore the repository layout

Read the top-level directory tree. Look for:

- Directory organization (e.g., `src/`, `lib/`, `app/`, `modules/`, `features/`)
- Configuration files (`package.json`, `pyproject.toml`, `tsconfig.json`, `.eslintrc`, etc.)
- Any existing documentation (`README.md`, `CONTRIBUTING.md`, `docs/`)

### Step 2 — Identify patterns in the codebase

Pick 2–3 representative files from different areas of the project and read them. Look for:

- **Naming conventions**: camelCase, kebab-case, PascalCase — for files, folders, functions, classes
- **File structure**: how a typical module, component, or service is organized internally
- **Import style**: absolute vs relative paths, barrel exports (`index.ts`), aliases
- **Code style**: function vs class components, async patterns, error handling approach
- **Test conventions**: location of tests (`__tests__/`, `*.spec.ts`, `*.test.ts`), naming, structure

### Step 3 — Identify the architectural pattern

Determine which architecture or pattern the project follows, for example:

- Feature-based / domain-driven
- Layered (controllers → services → repositories)
- MVC, MVVM, Clean Architecture
- Monorepo with packages/workspaces

### Step 4 — Summarize findings and generate suggestions

After reading the codebase, produce a structured summary with the following sections:

#### 📁 Directory Structure
Describe the folder organization and what belongs where.

#### 📄 File & Folder Naming
State the exact naming convention to follow with examples from the actual codebase.

#### 🧩 Module / Component Pattern
Show the internal structure of a typical file in this project (use a real example found in the repo).

#### 📦 Imports & Exports
Describe how imports are organized and how to export things correctly.

#### 🧪 Testing
Describe where to place tests and how to name them based on existing tests in the repo.

#### ✅ Checklist for new changes
Provide a short checklist the developer should verify before submitting any new code, derived from the patterns found.


## Behavior

- Always base suggestions on **actual files found in the repo** — never assume generic conventions.
- Quote or reference real file paths and examples from the codebase when explaining a pattern.
- If the project has inconsistencies (mixed conventions), point them out and recommend which pattern appears more dominant or recent.
- Keep suggestions actionable and specific, not generic best practices.