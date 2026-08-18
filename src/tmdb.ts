export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  vote_average: number;
  overview?: string;
  release_date?: string;
}

const API_KEY = '9a9b42c2d68162430339e7b53dc653f1'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results || [];
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query.trim()) return fetchPopularMovies();
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.results || [];
};