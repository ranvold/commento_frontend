# Commento Frontend

This repository contains the React frontend for the test task "Build app for comments and notifications".

The Rails API is a separate project. This frontend consumes that API over REST and Action Cable and covers the user-facing flows required by the assignment: authentication, comments CRUD, search, mentions, and notifications.

## Live Review

- Frontend: https://commento-iota.vercel.app
- Backend repo: https://github.com/ranvold/commento_backend
- Backend/API deployment: separate from this repository

Note: this repo is frontend-only. Backend-specific implementation details such as Rails 8 setup, database schema, Meilisearch indexing, and notification creation live in the separate Rails API repository: https://github.com/ranvold/commento_backend.

## Task Coverage

Required task items and how they are represented in the delivered solution:

- Rails 8: implemented in the separate backend repository
- Token-based auth: this frontend integrates with a token auth flow via login, signup, current-user restore, and logout
- Comment model: consumed through paginated comments endpoints
- Meilisearch index for comments: consumed through the `query` search parameter on the comments endpoint
- Notification model: consumed through notifications listing, unread count, and read actions
- Mention notifications: supported through `@username` mentions in comment bodies and surfaced in the notifications UI

## What Reviewers Can Verify In This Frontend

- Sign up and log in with different users
- Create comments
- Edit and delete your own comments
- Search comments by body
- Mention users with `@username`
- Receive and view notifications for mentions
- Mark a single notification as read
- Mark all notifications as read
- Navigate paginated comments and notifications lists

## Main Technical Decisions

- React 19 with Vite for the SPA shell
- React Router v7 for routing and route protection
- TanStack Query for API state, cache invalidation, and mutation handling
- Tailwind CSS v4 for styling
- Rails Action Cable client for notification updates
- URL-driven pagination and search so review flows are bookmarkable and back/forward friendly

## Architecture Overview

Provider tree:

- `QueryProvider`
- `AuthProvider`
- `NotificationsProvider`
- `AppRouterProvider`

Routing:

- `/login` and `/signup` are guest-only
- `/` and `/notifications` are protected routes

State and behavior highlights:

- Auth token is stored locally and attached as a Bearer token on API requests
- Session restore happens on app load through a current-user request
- Comment search is debounced and persisted in the URL
- Comment and notification mutations invalidate React Query caches and refetch fresh server data
- Mention suggestions query users as the author types `@username`
- Notification updates are subscribed through Action Cable and trigger query invalidation

## Feature Notes

### Authentication

- Login: `POST /session`
- Signup: `POST /signup`
- Restore current user: `GET /me`
- Logout: `DELETE /session`

The app uses token-based auth and automatically clears the local token on API `401` responses.

### Comments

- Read comments with pagination and search: `GET /comments?page=...&query=...`
- Create comment: `POST /comments`
- Update comment: `PUT /comments/:id`
- Delete comment: `DELETE /comments/:id`

The home page supports:

- creating a new comment
- editing and deleting owned comments
- searching by body
- pagination correction when the current page becomes invalid after data changes

### Mentions and Notifications

- Mention suggestions are fetched from `GET /users?query=...`
- Notifications list: `GET /notifications`
- Unread count: `GET /notifications/unread_count`
- Mark one as read: `PATCH /notifications/:id/mark_as_read`
- Mark all as read: `PATCH /notifications/mark_all_as_read`

Comments render highlighted mentions, and notifications show the actor, status, and related comment body.

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Default local values:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

Expected meaning:

- `VITE_API_BASE_URL`: base Rails app URL used for REST requests
- `VITE_WS_URL`: base Rails app URL used for Action Cable

### 3. Run the app

```bash
npm run dev
```

## Validation Commands

This repository does not currently include automated test files. The available validation commands are:

```bash
npm run lint
npm run build
```

## Reviewer Walkthrough

Suggested manual review path:

1. Open the deployed frontend at https://commento-iota.vercel.app
2. Create two users or log in with two existing users
3. Create comments from one account
4. Edit and delete a comment you own
5. Search comments by body text
6. Mention the second user with `@username` inside a comment
7. Open the notifications page for the mentioned user
8. Mark one notification as read, then mark all as read

## Important Scope Note

Because this repository only contains the frontend, a reviewer checking Rails 8 configuration, auth implementation details, Meilisearch setup, models, migrations, and backend deployment must inspect the separate Rails API repository: https://github.com/ranvold/commento_backend.

## Deployment Note

This frontend is configured through environment variables, so the deployed API host is not stored in source. The current public Vercel deployment is available at https://commento-iota.vercel.app.

If the backend deployment target changes, update the Vercel environment values for `VITE_API_BASE_URL` and `VITE_WS_URL` and redeploy the frontend.
