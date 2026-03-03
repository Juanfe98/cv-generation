# CV Builder

An online CV builder application built with React and TypeScript.

## Requirements

- Node.js >= 20

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Scripts

| Script         | Description                  |
| -------------- | ---------------------------- |
| `dev`          | Start development server     |
| `build`        | Build for production         |
| `preview`      | Preview production build     |
| `lint`         | Run ESLint                   |
| `lint:fix`     | Run ESLint with auto-fix     |
| `format`       | Format code with Prettier    |
| `format:check` | Check code formatting        |
| `typecheck`    | Run TypeScript type checking |
| `test`         | Run tests                    |
| `test:watch`   | Run tests in watch mode      |

## Project Structure

```
src/
├── app/           # Application shell, routing, providers
├── core/          # Shared types, config, app-wide utilities
├── features/      # Feature slices (editor, preview, export, etc.)
│   └── home/      # Home feature module
├── shared/        # Reusable UI components, hooks, styles
│   ├── components/
│   ├── hooks/
│   └── styles/
└── test/          # Test setup and utilities
```

### Architecture

- **app/**: Contains the main App component and will house routing and global providers
- **core/**: App-wide shared code (types, constants, utilities)
- **features/**: Domain-oriented feature modules, each self-contained with components, hooks, and tests
- **shared/**: Reusable code that isn't feature-specific (UI components, hooks, styles)
