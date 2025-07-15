import { Movie } from './Movie';

export interface ApiResponse {
  total: number;
  page: number;
  limit: number;
  movies: Movie[];
}
