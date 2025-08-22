import React, { createContext, ReactNode, useContext, useState } from "react";
import { ID, Models, Permission, Query, Role } from "react-native-appwrite";
import { databases } from "../lib/appwrite";
import { toast } from "../lib/toast";


/**
 * Replace these with your Appwrite Database and Collection IDs
 */
export const MOVIES_DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
export const MOVIES_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_MOVIE_COLLECTION_ID!;

/**
 * Define the shape of a Movie document.
 * Extends Models.Document to inherit system fields ($id, $createdAt, etc.)
 */
export interface savedMovie extends Models.Document {
  userId: string;       // User identifier (who created/owns this movie entry)
  movieId: string;       // Movie Identifier
}

/**
 * Context shape
 */
interface MoviesContextType {
  current: savedMovie[];
  add: (movie: Omit<savedMovie, keyof Models.Document>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  init: () => Promise<void>;
  getSavedMovieFromId: (movieId: string) => Promise<savedMovie[] | undefined>
}

/**
 * Props for the Provider
 */
interface MoviesProviderProps {
  children: ReactNode;
}

/**
 * Create context (nullable initially)
 */
const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

/**
 * Custom hook to access MoviesContext
 */
export function useMovies(): MoviesContextType {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMovies must be used within a MoviesProvider");
  }
  return context;
}

/**
 * Provider for MoviesContext
 */
export function MoviesProvider({ children }: MoviesProviderProps) {
  const [movies, setMovies] = useState<savedMovie[]>([]);

  // Add a movie
  async function add(movie: Omit<savedMovie, keyof Models.Document>) {
    try {
      const response = await databases.createDocument<savedMovie>(
        MOVIES_DATABASE_ID,
        MOVIES_COLLECTION_ID,
        ID.unique(),
        movie,
        [
          Permission.read(Role.user(movie.userId)),
          Permission.write(Role.user(movie.userId))
        ]
      );
      toast("Movie added");
      setMovies((prev) => [response, ...prev].slice(0, 10));
    } catch (err) {
      console.error("Error adding movie:", err);
      toast("Error adding movie");
    }
  }

  // Remove a movie
  async function remove(movieId: string) {
    try {
      await databases.deleteDocument(MOVIES_DATABASE_ID, MOVIES_COLLECTION_ID, movieId);
      toast("Movie removed");
    } catch (err) {
      console.error("Error removing movie:", err);
      toast("Error removing movie");
    }
  }

  async function init() {
    try {
      const response = await databases.listDocuments<savedMovie>(
        MOVIES_DATABASE_ID,
        MOVIES_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      setMovies(response.documents);
    } catch (err) {
      console.error("Error fetching movies:", err);
      toast("Error fetching movies");
    }
  }




  // Retrieve documents from a collection

  async function getSavedMovieFromId(movieId: string): Promise<savedMovie[] | undefined> {
    try {
      const response = await databases.listDocuments<savedMovie>(
        MOVIES_DATABASE_ID,
        MOVIES_COLLECTION_ID,
        [
          Query.equal('movieId', movieId),
        ]
      );
      return response.documents;
    } catch (error) {
      console.error('Failed to get documents:', error);
    }
  }


  return (
    <MoviesContext.Provider value={{ current: movies, add, remove, init, getSavedMovieFromId }}>
      {children}
    </MoviesContext.Provider>
  );
}
