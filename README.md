# CineSuggest

CineSuggest is a movie recommendation app that shows the most popular movies worldwide using the TMDb API. It also highlights the most famous movies within the app community. Users can register, log in, save their favorite movies, and personalize their experience. Built with Expo, CineSuggest runs on both Android and iOS platforms.

---

## Features

- Display trending and popular movies using the TMDb API  
- Show community-famous movies within the app  
- User authentication with registration and login  
- Save favorite movies for later access  

---

## Development Setup

### Prerequisites

- Node.js and npm installed  
- Expo CLI installed globally or use npx  

### Installation

1. Clone the repository  
2. Run the following command to install dependencies:

```
npm install
```

3. Create a `.env` file in the root folder based on the `.env.sample` file  

### Environment Variables

The `.env` file should include the following keys with your respective values:

- `EXPO_PUBLIC_MOVIE_API_KEY` — Your TMDb API key for fetching movie data  
- `EXPO_PUBLIC_APPWRITE_PROJECT_ID` — Your Appwrite project ID  
- `EXPO_PUBLIC_APPWRITE_DATABASE_ID` — Appwrite database ID  
- `EXPO_PUBLIC_APPWRITE_COLLECTION_ID` — Collection ID for users or general data  
- `EXPO_PUBLIC_APPWRITE_SAVED_MOVIE_COLLECTION_ID` — Collection ID for saved movies  

---

## Running the App

Since CineSuggest is not yet released on app stores, you can use it through the Expo Go application.

Start the Expo development server with:

```
npx expo start
```

Then, open the Expo Go app on your Android or iOS device and scan the QR code to load CineSuggest.

---
