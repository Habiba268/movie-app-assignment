import { db } from './firebase';
import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import type { Movie } from './tmdb';

export interface WatchlistItem extends Movie {
  addedAt?: number;
}

export const addToWatchlist = async (userId: string, movie: Movie): Promise<void> => {
  if (!userId) throw new Error("User ID is required to add to watchlist");
  const userRef = doc(db, 'users', userId, 'watchlist', String(movie.id));
  await setDoc(userRef, { ...movie, addedAt: Date.now() });
};

export const removeFromWatchlist = async (userId: string, movieId: number): Promise<void> => {
  const userRef = doc(db, 'users', userId, 'watchlist', String(movieId));
  await deleteDoc(userRef);
};

export const getUserWatchlist = async (userId: string): Promise<WatchlistItem[]> => {
  const querySnapshot = await getDocs(collection(db, 'users', userId, 'watchlist'));
  const movies: WatchlistItem[] = [];
  querySnapshot.forEach((docSnap) => {
    movies.push(docSnap.data() as WatchlistItem);
  });
  return movies;
};