export interface SearchResult {
	id: number;
	title?: string;
	name?: string;
	media_type: "movie" | "tv";
	poster_path: string | null;
	release_date?: string;
	first_air_date?: string;
	vote_average: number;
}
