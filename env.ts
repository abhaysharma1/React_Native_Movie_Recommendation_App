import Constants from 'expo-constants';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Do NOT redeclare NODE_ENV here if it's already declared.
      EXPO_PUBLIC_MOVIE_API_KEY: string;
      EXPO_PUBLIC_APPWRITE_PROJECT_ID: string;
      EXPO_PUBLIC_APPWRITE_DATABASE_ID: string;
      EXPO_PUBLIC_APPWRITE_COLLECTION_ID: string;
      EXPO_PUBLIC_APPWRITE_SAVED_MOVIE_COLLECTION_ID: string;
      [key: string]: string | undefined;
    }
  }
}

const extra = Constants.manifest?.extra || Constants.expoConfig?.extra || {};

// Use existing process.env.NODE_ENV or default to production
const nodeEnv = process.env.NODE_ENV || 'production';

const env: NodeJS.ProcessEnv = {
  NODE_ENV: nodeEnv,
  EXPO_PUBLIC_MOVIE_API_KEY: extra.EXPO_PUBLIC_MOVIE_API_KEY || '',
  EXPO_PUBLIC_APPWRITE_PROJECT_ID: extra.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '',
  EXPO_PUBLIC_APPWRITE_DATABASE_ID: extra.EXPO_PUBLIC_APPWRITE_DATABASE_ID || '',
  EXPO_PUBLIC_APPWRITE_COLLECTION_ID: extra.EXPO_PUBLIC_APPWRITE_COLLECTION_ID || '',
  EXPO_PUBLIC_APPWRITE_SAVED_MOVIE_COLLECTION_ID: extra.EXPO_PUBLIC_APPWRITE_SAVED_MOVIE_COLLECTION_ID || '',
};

export default env;
