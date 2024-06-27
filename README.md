
# Mud Or Hero

![Screenshot 2024-06-12 at 12 04 44 PM](https://github.com/brooksmarka/g2g/assets/20527972/cb8fb2d7-4e03-41bf-88c9-705b5355fa49)


A place to update and share trail status

## Development Workflow

You will need to obtain a mapbox api token for local development purposes.
Create a .env file at the root of the project and place your mapbox api key within it like so:
`VITE_MAPBOX_ACCESS_TOKEN="TOKEN_GOES_HERE"`

### Build Commands

This project uses several npm scripts to automate the development process, which you can run using `npm run <command>`.

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Locally preview production build
- `npm run lint`: Lints the codebase.

### Setting the Mode:
You can run your Vite project with different modes using the '--mode flag:

```bash
# Development mode
vite

# Production Mode
vite build

# Staging mode
vite --mode staging
vite build --mode staging
```

You can also specifiy different .env files for development (.env) or production (.env.production)

### Continuous Integration

The project is configured with Continuous Integration for automatic builds on push/merge events to specific branches.

- Main branch build is viewable at www.mudorhero.org

**Main Branch:**

Pushes to the `main` branch will automatically trigger a build and deployment to the production site URL.

