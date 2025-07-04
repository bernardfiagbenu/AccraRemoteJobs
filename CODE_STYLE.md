# Code Style Guidelines for JobsInAccra

## Project Overview
A modern job board application with advanced search, filtering, structured job listings, tagging, and dashboards for candidates and employers.

### Technical Stack
- Platform: web
- Framework: React
- Key Dependencies: react-query, styled-components, chakra, mui, zustand, redux, shadcn, tailwind

---

## 1. File Organization
- **Directory Structure:**
  - Group by feature/domain (e.g., /components, /pages, /hooks, /store, /utils)
  - Place shared components in /components/shared
  - Keep tests alongside source files or in __tests__ folders
- **File Naming:**
  - Use kebab-case for files (e.g., job-listing-card.tsx)
  - Use PascalCase for React components (e.g., JobListingCard.tsx)
- **Module Organization:**
  - One component per file
  - Group related files (component, styles, test)
- **Import/Export:**
  - Use named exports for utilities/hooks
  - Default export for components
- **Grouping:**
  - Order: external deps, internal modules, styles, types

---

## 2. Code Formatting
- **Indentation:** 2 spaces, no tabs
- **Line Length:** 100 characters max
- **Line Breaks:** Unix (LF)
- **Spacing:**
  - One blank line between functions/classes
  - No trailing spaces
- **Brackets:**
  - Opening bracket on same line
- **Quotes:** Single quotes for JS/TS, double quotes for JSX
- **Semicolons:** Always required
- **Trailing Commas:** Required in multi-line objects/arrays
- **Comments:**
  - Use // for inline, /** */ for blocks
  - Write meaningful, concise comments

---

## 3. Naming Conventions
- **Variables:** camelCase
- **Functions:** camelCase
- **Classes/Interfaces:** PascalCase
- **Constants/Enums:** UPPER_SNAKE_CASE
- **File Names:** kebab-case
- **Component Names:** PascalCase
- **Test Files:** [name].test.tsx

---

## 4. TypeScript/JavaScript Guidelines
- **Type Annotations:** Always for function params/returns, public members
- **Interface vs Type:** Prefer interface for objects, type for unions/intersections
- **Generics:** Use descriptive names (T, U, V)
- **Null/Undefined:** Use optional chaining, nullish coalescing
- **Error Handling:** Use try/catch, never swallow errors
- **Async/Await:** Prefer over .then/.catch
- **Default Values:** Use in function params
- **Optional Chaining:** Use for safe property access

---

## 5. Component Guidelines
- **Composition:** Favor small, reusable components
- **Props:** Define with TypeScript interfaces
- **State:** Use hooks (useState, useReducer, zustand, redux)
- **Events:** Use handler naming (onClick, onChange)
- **Lifecycle:** useEffect for side effects
- **Custom Hooks:** Prefix with use, document usage
- **Optimization:** Use React.memo, useCallback, useMemo as needed
- **Error Boundaries:** Use for critical UI sections

---

## 6. Documentation Standards
- **JSDoc:** Required for exported functions/classes
- **README:** Project overview, setup, usage, contribution
- **Comments:** Explain why, not what
- **API Docs:** Document endpoints, params, responses
- **Type Docs:** Document complex types/interfaces
- **Examples:** Provide for custom hooks/components
- **Changelog:** Use Keep a Changelog format

---

## 7. Testing Standards
- **Organization:** Tests next to code or in __tests__
- **Naming:** [name].test.tsx
- **Structure:** Arrange-Act-Assert
- **Mocks:** Use for API, state, data
- **Coverage:** 90%+ required for core features
- **Integration:** Test user flows, API integration
- **E2E:** Use Cypress/Playwright for critical paths

---

## 8. Performance Guidelines
- **Bundle:** Minimize size, use dynamic imports
- **Code Splitting:** By route/component
- **Lazy Loading:** For heavy components
- **Memory:** Avoid memory leaks, clean up effects
- **State:** Minimize global state, use selectors
- **Rendering:** Avoid unnecessary re-renders
- **Assets:** Optimize images, SVGs

---

## 9. Security Guidelines
- **Auth:** Use secure tokens, never store secrets in code
- **Validation:** Validate all user input
- **API:** Use HTTPS, handle errors securely
- **Dependencies:** Keep updated, audit regularly
- **Env Vars:** Use .env, never commit secrets
- **Sensitive Data:** Mask in logs, never expose
- **Best Practices:** Follow OWASP Top 10

---

## 10. Development Workflow
- **Git:** Feature branches, squash merges
- **Branch Naming:** feature/bugfix/hotfix/task-[desc]
- **Commits:** Conventional Commits (e.g., feat: add job search)
- **PRs:** Require review, CI passing, description
- **Code Review:** Check style, logic, tests
- **CI/CD:** Lint, test, build on push/PR
- **Version Control:** Tag releases, maintain changelog

---

## Enforcement and Tools
- **Linting:** ESLint with project rules
- **Formatting:** Prettier for auto-formatting
- **TypeScript:** Strict mode, no implicit any
- **Git Hooks:** Pre-commit lint/test
- **CI:** Enforce checks before merge

---

## IDE Configuration
- **VS Code:** Recommend settings, extensions (ESLint, Prettier, TS, React)
- **Snippets:** Provide for common patterns
- **Debugging:** Configure launch.json for React

---

## Best Practices

### Code Quality
- Small, focused functions
- DRY (Don't Repeat Yourself)
- Separation of concerns
- Meaningful names
- Self-documenting code
- Proper error handling

### Performance
- Optimize bundle size
- Code splitting
- Caching
- Rendering optimization
- Lazy loading

### Maintainability
- Clear documentation
- Consistent patterns
- Error handling
- SOLID principles
- Up-to-date dependencies

### Collaboration
- Clear commits
- Document breaking changes
- Maintain changelog
- Code reviews
- Share knowledge 