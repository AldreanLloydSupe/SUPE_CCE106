# CCE106 Student Portal

This repository contains the Quotes app and a practical authenticated Student Portal built with Expo SDK 57.

## Run the app

Open two terminals in the project folder.

Terminal 1 starts the temporary API:

    npm run start:api

Terminal 2 starts Expo:

    npx expo start

Open the app on an Android or iOS device connected to the same Wi-Fi as the computer running the API. The app uses the Expo development host address to contact the local server on port 3000.

## Demo account

- Email: student@cce106.edu.ph
- Password: CCE106pass!

The API issues a 30-minute Bearer token. On Android and iOS, the app stores the token with Expo SecureStore, restores the session on launch, requests the protected profile, and clears local and server session state on logout.

This is a classroom demo API. Users, tokens, and quotes are stored in memory, so restarting the server invalidates existing sessions.

## Postman routes

- GET http://localhost:3000/ lists available routes and demo credentials.
- GET http://localhost:3000/health checks the API.
- POST http://localhost:3000/api/auth/login accepts JSON: {"email":"student@cce106.edu.ph","password":"CCE106pass!"}.
- GET http://localhost:3000/api/profile requires Authorization: Bearer <accessToken>.
- POST http://localhost:3000/api/auth/logout requires the same Bearer header.
- GET http://localhost:3000/api/quotes/random returns one quote.
- GET http://localhost:3000/api/quotes returns all quotes.

## Repository branches

- Qoutes-App contains the Quotes mobile app and quote API.
- Student-Portal contains the authenticated portal and both sets of API routes.