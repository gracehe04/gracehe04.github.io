# Grace He's Portfolio

Personal portfolio website built with React and deployed to GitHub Pages.

Live site: https://gracehe04.github.io

## Demo

https://github.com/user-attachments/assets/6e8e6d3b-82a4-4f17-b2b2-7da272d1087e

## Features

- Responsive single-page layout with Home, About, and Projects sections
- Theme toggle with light/dark mode persistence via localStorage
- Typing-style rotating intro text on the home section
- Project cards with drag-and-drop reordering
- First-visit onboarding tip for project card interaction
- External links to GitHub, LinkedIn, resume, and selected project deployments

## Tech Stack

- React 19
- react-scripts (Create React App)
- CSS
- react-icons and lucide-react
- GitHub Pages (gh-pages)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gracehe04/gracehe04.github.io.git
cd my-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The app will run at http://localhost:3000.

## Available Scripts

- npm start: Runs the app in development mode
- npm test: Launches the test runner in interactive watch mode
- npm run build: Builds the app for production into the build folder
- npm run deploy: Builds and deploys the build folder to GitHub Pages

## Deployment

This project uses the homepage field in package.json plus gh-pages scripts:

- predeploy: npm run build
- deploy: gh-pages -d build

To publish changes:

```bash
npm run deploy
```

## Project Structure

Main source code lives in the src directory:

- src/App.js: App-level theme state and shell wiring
- src/components/Home.jsx: Intro, rotating text, and social/resume links
- src/components/About.jsx: Background and experience section
- src/components/Projects.jsx: Project list and drag-and-drop behavior

## License

This project is for personal portfolio use.
