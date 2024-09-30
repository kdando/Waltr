# Waltr

> "Every passion borders on the chaotic, but the collector's passion borders on the chaos of memories."  
> — *Walter Benjamin*

## Overview

Explore a vast array of cultural treasures and save your favourites for future reference.

## Features

- **Search Multiple Museum APIs:** Access museum collections from different institutions around the world.
- **Personal Collection:** Save artefacts from any museum into your personal collection.
- **User Authentication:** Sign in to securely store your collection in a database.
- **Persistent Storage:** Your collection will persist across visits.

## Live Version

A hosted version of Waltr is available to try at [https://waltr.vercel.app/](https://waltr.vercel.app/)

## Tech and Packages

- This app is built with [NextJS](https://nextjs.org/), which is a [React](https://react.dev/)-based framework.
- [Axios](https://axios-http.com/docs/intro) for API calls.
- [Material-UI](https://mui.com/material-ui/getting-started/) for styling and design.
- [Firebase](https://firebase.google.com/docs/auth) (via [NextAuth](https://next-auth.js.org/getting-started/introduction)) to handle user authentication.
- [Firestore](https://firebase.google.com/docs/firestore) for persistent storage of user's collections. 
- [DOMPurify](https://www.npmjs.com/package/dompurify) for sanitising text content and rendering HTML in object records correctly.

If you are running this project locally, running `npm install` will install all the necessary packages, but the authentication system requires additional set-up. See the steps below for more details.

## Installation

To run Waltr yourself on your own machine, follow these steps.

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/waltr.git
   ```

2. Navigate into the project directory:
   ```bash
   cd waltr
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```

4. Create a `.env.local` file at the root of the project.

5. The env file should have the following environment variables:
   ```bash
   GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET
   NEXTAUTH_URL
   NEXTAUTH_SECRET
   GOOGLE_APPLICATION_CREDENTIALS
   AUTH_FIREBASE_PROJECT_ID
   AUTH_FIREBASE_CLIENT_EMAIL
   AUTH_FIREBASE_PRIVATE_KEY
   FIREBASE_WEB_APP_API_KEY
   UNSPLASH_ACCESS_KEY
   UNSPLASH_SECRET_KEY
   ```

We had GOOGLE_APPLICATION_CREDENTIALS point to another file, `./service-account.json`, so you may want to create that too at the root of your project.

For detailed instructions of what these variables should be and how to get set up see the official documentation:
[NextAuth](https://next-auth.js.org/getting-started/introduction)
[Firebase](https://firebase.google.com/docs/auth/web/start)
[Firestore](https://firebase.google.com/docs/firestore/quickstart)
[UnsplashAPI](https://unsplash.com/documentation)

For a short but clear walkthrough of setting up NextJS for authentication and persistence, see the following videos. Aside from some small details these are reflective of the design of this project:
[Part 1: Authentication](https://www.youtube.com/watch?v=zrjybW3UKr8)
[Part 2: Persistent Storage](https://www.youtube.com/watch?v=vUm-YIEbl7E)

6. When everything is installed and configured correctly, you can run the project locally:
   ```bash
   npm run dev
   ```

---
