# Project Updates

## Acknowledgment

**Thanks to Solace for giving me the opportunity to work on such an interesting assignment. I really enjoyed working on it. I apologize for the huge pull request; in a general development process, I would split the PRs into multiple parts for review. However, to provide a better overview of the final changes and help you understand the full picture, I preserved it as a single PR.**

### Date: 03/13/2025

### Performance Optimization

- Used correct memoization strategy to reduce unnecessary renderings.
- Enhanced search performance by utilizing React's concurrent rendering capabilities and the `useTransition` hook in Next.js.
- Added debounce to reduce api calls to backend while user typing.
- Migrated search and pagination logic to the backend for efficiency.
- Added Redis as a backend cache layer to cache infrequently changing data, enhancing app responsiveness and reducing load times.
- Implemented CRUD operations for backend advocacy with appropriate Redis caching mechanisms.
- Improved database setup using a connection pool for better performance and scalability.

### UI/UX Enhancement

- Added Ant Design and rewrote the UI for a more consistent and visually appealing interface.
- Improve lagging UX while typing using `debouncing` and `useTransition`
- Enhanced search function for better accuracy and case-insensitivity.
- Added responsive and user-engaged design for both mobile and desktop.
- Fully considered accessibility for disabled individuals.
- Added ARIA attributes to the search input and button for better accessibility.
- Added dark theme to get color themes from system preferences and persist them in local storage.
- Used unique colors generated from the specialty name for easier identification.
- Added pagination to reduce page overload.
- Added nice-looking toast for server errors

### Code Maintenance

- Separated error handling logic from database setup for modularity.
- Added necessary ESLint rules to improve code quality and maintainability.
- Introduced derived state using `useMemo` for better readability and maintainability.
- Broke down the Home component into smaller, reusable components (Separation of Concerns).
- Created a custom hook (`useFetchAdvocates`) for data fetching to improve reusability.
- Moved Redis to a Docker container to run with the database.
- Managed all configurations in a centralized `config.ts`.
- Added a pull request template for consistency in contributions.

### Security and Error Handling

- Added client-side sanitization to prevent injection attacks in the SearchBar component.
- Added sanitization logic on the backend.
- Implemented error notifications for server errors.
- Added error handling for the fetch operation to manage potential failures gracefully.

### Project Architecture and Structural Changes

- Rewrote all code to TypeScript.
- Separated the advocates table into container and presentational components for better code organization.
- Rewrote the database migration code.
- Added useful commands to the `package.json` file for running services.

### Testing Strategy

- Added React component tests for reusable components.
- Added unit tests for hooks and utilities.
- Added Cypress tests for end-to-end testing for both frontend and backend.
- Added unit & end-to-end testing to GitHub Actions so that all tests are run on creating PR.

### CI/CD Pipelines

- Added GitHub Actions for deploying Docker, Heroku, end-to-end testing, linting, Prettier, and unit tests on pull request creation.
- Added a pre-commit hook using lint-staged & Husky to ensure code quality and formatting.

### Bug Fixes

- Improved database setup integration with clear error handling for the `DATABASE_URL` environment variable.
- Fixed hydration error by properly index elements in the table.
- Fixed search and reset search functionality.
- Fixed type issues.
- Removed direct DOM manipulation and replaced with React state.
- Removed unnecessary state management and introduced derived state using useMemo that can be more easy to read & maintainable.

## TODO

- Implement semantic search (Elastic Search) to improve search effectiveness.
- Consider to migrate the page to SSR or SSG as the page content doesn't change frequentely.
- Add an additional cache layer in the frontend using Tanstack-Query or SWR.
- Sort by Degree and Years of Experience (YoE).
- Consider implementing a RAG-based AI assistant using Amazon Bedrock, SageMaker, and Langchain for patient advocacy searches.
- Add Sentry for client app bug reporting and monitoring.
- Add Datadog for overall app monitoring.
- Add Storybook for UI component documentation.
- Implement a global state management library like Redux, Zustand, or MobX.
- Consider changing the design from a table view to card view for better layout.
- Plans to use hosted services like Redis Labs or Heroku Redis, storing Redis credentials in environment variables for production connections.
