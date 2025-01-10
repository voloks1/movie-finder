export interface TVShowDetails {
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	first_air_date: string;
	vote_average: number;
	number_of_seasons: number;
	number_of_episodes: number;
	genres: Array<{ id: number; name: string }>;
	status: string;
	created_by: Array<{ id: number; name: string }>;
}

export interface Season {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
}
