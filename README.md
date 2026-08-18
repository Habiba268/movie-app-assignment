# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
AI-Assisted Development Overview
Throughout the development of this React movie application, I utilized AI as a collaborative development assistant to accelerate coding, structure architectural patterns, and troubleshoot runtime issues. Rather than relying on AI blindly, I acted as the lead architect—directing the prompts, reviewing generated code, and refining implementations to ensure high code quality, security, and maintainability.

Below is an overview of how AI assisted me across the core phases of this project.

1. Project Initialization 
At the start of the project, I used AI to quickly scaffold the application workspace:

Scaffolding: Prompted the AI to initialize a clean React project using Vite and TypeScript without installing unnecessary UI component libraries.

Cleanup: Instructed the AI to strip out default Vite boilerplate code, images, and counting examples, leaving a clean, minimal workspace ready for custom feature development.

2. Establishing an MVVM Architecture
To maintain a clean separation of concerns, I guided the AI to implement an MVVM (Model-View-ViewModel) architectural pattern:

Models: Encapsulated business logic and data fetching wrappers (such as OMDB API requests and Firestore interactions).

ViewModels: Managed component state, custom hooks (useHomeViewModel, useFavoritesViewModel), and asynchronous execution flows.

Views: Handled purely presentational components and user interface rendering.

This separation made the codebase modular, testable, and much easier to scale.

3. API Integration & TypeScript Typing
OMDB Service: AI helped write asynchronous service functions using the native fetch API to query movie data securely via Vite environment variables.

Type Safety: The AI generated strict TypeScript interfaces for movie objects (id, Title, Poster, Year, vote_average), eliminating loose any types and preventing runtime property errors during compilation.

4. Firebase Authentication & Firestore Integration
Integrating a backend typically introduces a lot of boilerplate. AI assisted significantly in this phase:

Authentication: Setting up Firebase Auth configuration, sign-in state listeners (onAuthStateChanged), and route protection logic.

User-Scoped Database Queries: Structuring Firestore document paths under /users/{userId}/watchlist/{movieId} to ensure data isolation per user.

5. Debugging & Troubleshooting Support
One of the most valuable aspects of using AI as a collaborator was rapid debugging:
TypeScript & Casing Errors: When Windows file system case-insensitivity conflicted with strict TypeScript case checking (tsc), AI helped identify mismatched file imports (e.g., watchListService vs. watchlistService).

Firebase Permissions: When encountering Firestore Missing or insufficient permissions errors, AI assisted in identifying security rule configuration mistakes and validating authenticated user IDs before executing database writes.

*Examples of Manual Improvements, Corrections, or Refactoring*
1] Security Rules & Auth Context Fix
AI Output: The generated code initially tried writing user watchlists to a global path or failed due to missing userId parameters.

Manual Fix: Refactored watchlistService.ts to explicitly check that userId is defined prior to calling setDoc(), and updated Firestore Rules in the console to enforce user-level isolation:

JavaScript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/watchlist/{movieId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
2] Bug Fixing & UI Callbacks
AI Output: The AI created movie card components but forgot to attach the onClick event handler to the "Add to Watchlist" button.

Manual Fix: Wired up the prop callback handler (onAddToWatchlist(movie)) from the parent View to ensure user actions triggered state updates correctly.
