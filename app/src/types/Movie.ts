export interface Movie {
  _id: string;
  title: string;
  year: number;
  poster?: string;
  plot?: string;
  genres?: string[];
  runtime?: number;
  rated?: string;
  cast?: string[];
  num_mflix_comments?: number;
  lastupdated?: string;
  languages?: string[];
  released?: string | Date;
  directors?: string[];
  writers?: string[];
  awards?: {
    wins?: number;
    nominations?: number;
    text?: string;
  };
  imdb?: {
    rating?: number;
    votes?: number;
    id?: number;
  };
  countries?: string[];
  type?: string;
  tomatoes?: {
    viewer?: {
      rating?: number;
      numReviews?: number;
      meter?: number;
    };
    dvd?: string | Date;
    critic?: {
      rating?: number;
      numReviews?: number;
      meter?: number;
    };
    lastUpdated?: string | Date;
    rotten?: number;
    production?: string;
    fresh?: number;
  };
}
