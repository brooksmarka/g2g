# g2g

An application to let users share trail status

## Development Workflow

### Build Commands

This project uses several npm scripts to automate the development process, which you can run using `npm run <command>`.

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Locally preview production build
- `npm run lint`: Lints the codebase.

### Continuous Integration

The project is configured with Continuous Integration for automatic builds on push/merge events to specific branches.

- Main branch build is viewable at [production environment](https://main.dfgtjw67rhr7y.amplifyapp.com/).

**Development Branch:**

Pushes to the `dev` branch will automatically trigger a build and deployment to the development site URL.

**Main Branch:**

Pushes to the `main` branch will automatically trigger a build and deployment to the production site URL.