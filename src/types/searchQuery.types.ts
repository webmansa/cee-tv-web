export interface SearchQuery {
  page: number;
  results: SearchQueryResult[];
  total_pages: number;
  total_results: number;
}

export interface SearchQueryResult {
  backdrop_path: null | string;
  id: number;
  title?: string;
  original_title?: string;
  overview: string;
  poster_path: null | string;
  media_type: MediaType;
  adult: boolean;
  original_language: OriginalLanguage;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  first_air_date?: Date;
  origin_country?: string[];
}

export type MediaType = "movie" | "tv";

export type OriginalLanguage = "en" | "ja" | "it";