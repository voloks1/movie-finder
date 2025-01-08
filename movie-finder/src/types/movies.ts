export interface Movie {
	trailerKey: string;
	id: number;
	title: string;
	poster_path: string;
	backdrop_path: string;
	overview: string;
	release_date: string;
	vote_average: number;
}

export interface movieDetails extends Movie {
	genres: Array<{
		id: number;
		name: string;
	}>;
	runtime: number;
	budget: number;
	revenue: number;
	credits: {
		cast: Array<{
			id: number;
			name: string;
			character: string;
			profile_path: string | null;
		}>;
		crew: Array<{
			id: number;
			name: string;
			job: string;
			profile_path: string | null;
		}>;
	};
	videos: {
		results: Array<{
			key: string;
			name: string;
			type: string;
		}>;
	};
}
