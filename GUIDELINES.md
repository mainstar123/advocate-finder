# Application Guidelines

## Folder Structure

Description of the project files and directories.

```bash
.
├── .github
├── .husky
├── .next
├── .swc
├── cypress
    ├── e2e
    │   ├── backend
    │   └── frontend
├── drizzle
├── node_modules
├── public
└── src
    ├── app
    │   └── api
    │       ├── advocates
    │       └── seed
    ├── components
    │   ├── advocates
    │   └── shared
    ├── containers
    │   └── advocates-table-container.tsx
    ├── contexts
    │   └── theme-context.tsx
    └── db
        ├── mock
        │   ├── migrate.ts
        │   ├── schema.ts
        │   ├── seed.ts
        │   └── setup.ts
        └── hooks
            ├── use-debounce.test.ts
            ├── use-debounce.ts
            └── use-fetch-advocates.ts
    ├── lib
    │   └── redis.ts
    └── theme
        └── config.ts
    ├── types
    │   └── advocates.ts
    └── utils
        ├── color.test.ts
        ├── color.ts
        ├── error-message.test.ts
        ├── error-message.ts
        └── logger.ts
├── .env
├── .eslintrc.json
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── cypress.config.ts
├── DISCUSSION.md
├── docker-compose.yml
├── drizzle.config.ts
├── jest.config.ts
├── jest.setup.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── tsconfig.cjs.json
└── tsconfig.json
```

### Explanation:

- The root directory contains various configuration files and directories for the project.
- The `.github`, `.husky`, `.next` and `.swc` directories are likely related to Git(workflows, PR template), Husky (pre-commit hooks), Next.js and SWC respectively.
- The `cypress`, `drizzle`, `node_modules`, `public`, and `src` directories are common in a typical web application project.
- The `src` directory is where the main application code is located. It contains the following subdirectories:
- `app`: This directory likely contains the main application logic, including the API routes in the api subdirectory.
- `components`: This directory holds reusable UI components, divided by features like `advocates` and `shared` subdirectories.
- `containers`: This directory contains higher-level components that wrap and manage other components, such as the `advocates-table-container.tsx` file.
- `contexts`: This directory holds context-related files, like the `theme-context.tsx` file.
- `db`: This directory contains files related to the database, including mock data, migrations, schemas, and custom hooks.
- `lib`: This directory holds utility or helper functions, such as the `redis.ts` file.
- `theme`: This directory likely contains theme-related configuration, like the `config.ts` file.
- `types`: This directory holds type definitions, such as the `advocates.ts` file.
- `utils`: This directory contains various utility functions, including tests, for things like color handling and error messages.
- The remaining files in the root directory are mostly configuration files for the project, such as linting, testing, and deployment settings.

## Scripts

An explanation of the `package.json` scripts.

| Command              | Description                                            |
| -------------------- | ------------------------------------------------------ |
| `dev`                | Start the Next.js development server                   |
| `build`              | Run Prettier check and create a production build       |
| `start`              | Start the Next.js production server                    |
| `services:start`     | Start Docker services in detached mode                 |
| `services:stop`      | Stop Docker services                                   |
| `run:all`            | Start services and development server concurrently     |
| `db:generate:schema` | Generate database schema using Drizzle Kit             |
| `db:migrate:up`      | Run database migrations                                |
| `db:migrate:push`    | Push database changes using Drizzle Kit                |
| `db:seed`            | Seed the database with initial data                    |
| `lint`               | Run ESLint for linting                                 |
| `format`             | Check code formatting with Prettier                    |
| `format:fix`         | Fix code formatting issues with Prettier               |
| `test`               | Run Jest tests                                         |
| `test:watch`         | Run Jest tests in watch mode                           |
| `e2e:open`           | Open Cypress for end-to-end testing                    |
| `e2e:run`            | Run Cypress end-to-end tests                           |
| `ci`                 | Run linting, formatting, testing, and end-to-end tests |
| `prepare`            | Prepare Husky for git hooks                            |

## Technologies

This project is possible thanks to all these open source languages, libraries, and frameworks.

| Tech                                                       | Description                                                                      |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [React](https://reactjs.org/)                              | Front end user interface                                                         |
| [Next.js](https://nextjs.org/)                             | The React Framework for Production                                               |
| [TypeScript](https://www.typescriptlang.org/)              | Static type-checking programming language                                        |
| [Drizzle ORM](https://orm.drizzle.team/)                   | Type-safe ORM for SQL databases                                                  |
| [Docker](https://www.docker.com/)                          | Platform for containerization                                                    |
| [Cypress](https://www.cypress.io/)                         | End-to-end testing framework                                                     |
| [Jest](https://jestjs.io/)                                 | JavaScript testing framework                                                     |
| [ESLint](https://eslint.org/)                              | Linter for identifying and fixing problems in JavaScript code                    |
| [Prettier](https://prettier.io/)                           | An opinionated code formatter                                                    |
| [Husky](https://typicode.github.io/husky/#/)               | Git hooks made easy                                                              |
| [Concurrently](https://www.npmjs.com/package/concurrently) | Run multiple commands concurrently                                               |
| [Lint-staged](https://github.com/okonet/lint-staged)       | Run linters on git staged files                                                  |
| [Ant Design](https://ant.design/)                          | A design system with a set of high-quality React components                      |
| [PostgreSQL](https://www.postgresql.org/)                  | A powerful, open-source relational database system                               |
| [Redis](https://redis.io/)                                 | An in-memory data structure store, used as a database, cache, and message broker |
| [dotenv](https://www.npmjs.com/package/dotenv)             | Module to load environment variables from a `.env` file                          |
| [Tailwind CSS](https://tailwindcss.com/)                   | A utility-first CSS framework for rapid UI development                           |

## Styleguide

Coding conventions are enforced by [ESLint](.eslintrc.js) and [Prettier](.prettierrc).

### ESLint Rules

- **React Hooks**:
  - Follow the rules of hooks: **no custom hooks** should call hooks conditionally.
  - Ensure to specify all dependencies in effect hooks (`react-hooks/exhaustive-deps` is a warning).
- **Variables**:

  - **No unused variables**: Warns for any declared but unused variables.
  - **No console statements**: Warns against using `console.log`.

- **Equality**:

  - Use `===` and `!==` instead of `==` and `!=` (enforced).

- **Braces and Indentation**:

  - Always use curly braces for control statements (enforced).
  - Use 2 spaces for indentation (enforced).

- **Commas**:

  - Always use trailing commas in multi-line objects and arrays (enforced).

- **Spacing**:

  - Always include spaces inside curly braces and around operators (enforced).
  - No spaces inside parentheses (enforced).
  - Ensure proper spacing around keywords and before blocks (enforced).

- **Comments**:
  - Comments must have a space after the `//` (enforced).

### Prettier Default Settings

By default, Prettier enforces the following styles unless overridden:

- **Print Width**: 80 characters
- **Tab Width**: 2 spaces
- **Use Tabs**: false (spaces)
- **Semicolons**: true (always add semicolons)
- **Single Quotes**: false (double quotes by default)
- **Trailing Commas**: "es5" (only where valid in ES5)
- **Bracket Spacing**: true (spaces between brackets)
- **Arrow Function Parentheses**: "always" (always include parentheses)
- **End of Line**: "lf" (as specified in your config)

### Custom Prettier Configuration

- Use `LF` line endings (as specified).

## Naming Conventions

Consistent naming conventions are crucial for maintaining code readability and organization. Here are the guidelines for naming various entities in the project:

### Files and Directories

- Use **kebab-case** for file and directory names.
  - Example: `advocates-table-container.tsx`, `theme-context.tsx`

### Variables and Functions

- Use **camelCase** for variable and function names.
  - Example: `fetchData`, `userList`

### Classes and Components

- Use **PascalCase** for class and React component names.
  - Example: `UserProfile`, `AdvocatesTableContainer`

### Constants

- Use **UPPER_SNAKE_CASE** for constant values.
  - Example: `API_BASE_URL`, `MAX_RETRY_COUNT`

### TypeScript Types and Interfaces

- Use **PascalCase** for TypeScript types and interfaces.
  - Example: `User`, `Advocate`

### Enums

- Use **PascalCase** for enum names and **UPPER_SNAKE_CASE** for enum values.
  - Example:
    ```typescript
    enum UserRole {
      ADMIN = "ADMIN",
      USER = "USER",
    }
    ```

### Test Files

- Use **kebab-case** and append `.test.ts` or `.test.tsx` for test files.
  - Example: `use-debounce.test.ts`, `color.test.ts`

By following these naming conventions, the codebase will remain clean, consistent, and easier to navigate.
