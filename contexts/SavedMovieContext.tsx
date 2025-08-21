// import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
// import { ID, Models, Permission, Query, Role } from "react-native-appwrite";
// import { databases } from "../lib/appwrite";
// import { toast } from "../lib/toast";

// /**
//  * Replace these with your Appwrite Database and Collection IDs
//  */
// export const MOVIES_DATABASE_ID = "default"; 
// export const MOVIES_COLLECTION_ID = "movies-tracker";

// /**
//  * Define the shape of a Movie document.
//  * Extends Models.Document to inherit system fields ($id, $createdAt, etc.)
//  */
// export interface Movie extends Models.Document {
//   userId: string;       // User identifier (who created/owns this movie entry)
//   title: string;        // Movie title
//   year: number;         // Release year
//   genre?: string;       // Optional genre
//   director?: string;    // Optional director name
//   description?: string; // Optional description
// }

// /**
//  * Context shape
//  */
// interface MoviesContextType {
//   current: Movie[];
//   add: (movie: Omit<Movie, keyof Models.Document>) => Promise<void>;
//   remove: (id: string) => Promise<void>;
// }

// /**
//  * Props for the Provider
//  */
// interface MoviesProviderProps {
//   children: ReactNode;
// }

// /**
//  * Create context (nullable initially)
//  */
// const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

// /**
//  * Custom hook to access MoviesContext
//  */
// export function useMovies(): MoviesContextType {
//   const context = useContext(MoviesContext);
//   if (!context) {
//     throw new Error("useMovies must be used within a MoviesProvider");
//   }
//   return context;
// }

// /**
//  * Provider for MoviesContext
//  */
// export function MoviesProvider({ children }: MoviesProviderProps) {
//   const [movies, setMovies] = useState<Movie[]>([]);

//   // Add a movie
//   async function add(movie: Omit<Movie, keyof Models.Document>) {
//     try {
//       const response = await databases.createDocument<Movie>(
//         MOVIES_DATABASE_ID,
//         MOVIES_COLLECTION_ID,
//         ID.unique(),
//         movie,
//         [Permission.write(Role.user(movie.userId))]
//       );
//       toast("Movie added");
//       setMovies((prev) => [response, ...prev].slice(0, 10));
//     } catch (err) {
//       console.error("Error adding movie:", err);
//       toast("Error adding movie");
//     }
//   }

//   // Remove a movie
//   async function remove(id: string) {
//     try {
//       await databases.deleteDocument(MOVIES_DATABASE_ID, MOVIES_COLLECTION_ID, id);
//       toast("Movie removed");
//       setMovies((prev) => prev.filter((movie) => movie.$id !== id));
//       await init(); // Refresh list to maintain 10 entries
//     } catch (err) {
//       console.error("Error removing movie:", err);
//       toast("Error removing movie");
//     }
//   }

//   // Fetch initial movies
//   async function init() {
//     try {
//       const response = await databases.listDocuments<Movie>(
//         MOVIES_DATABASE_ID,
//         MOVIES_COLLECTION_ID,
//         [Query.orderDesc("$createdAt"), Query.limit(10)]
//       );
//       setMovies(response.documents);
//     } catch (err) {
//       console.error("Error fetching movies:", err);
//       toast("Error fetching movies");
//     }
//   }

//   useEffect(() => {
//     init();
//   }, []);

//   return (
//     <MoviesContext.Provider value={{ current: movies, add, remove }}>
//       {children}
//     </MoviesContext.Provider>
//   );
// }
