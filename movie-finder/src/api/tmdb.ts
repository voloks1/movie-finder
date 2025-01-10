import { Season } from "@/types/tv";
import axios from "axios";

export const api = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
	params: {
		api_key: "5f6ffce07a9859138e4fb23d2bc7f8e3",
		language: "pt-BR",
	},
});

export const tmdbAPI = {
	getPopularMovies: (page = 1) =>
		api.get("movie/popular", { params: { page } }),
	searchMovies: (query: string, page = 1) =>
		api.get("search/movie", { params: { query, page } }),
	getMoviesDetails: (movieID: number) =>
		api.get(`/movie/${movieID}`, {
			params: { append_to_response: "credits,videos,similar" },
		}),
	getTopRated: (page = 1) => api.get("movie/top_rated", { params: { page } }),
	getUpcoming: (page = 1) => api.get("movie/upcoming", { params: { page } }),
	getMovieID: (id: string) =>
		api.get(`movie/${id}`).then((response) => response.data),
	getPopularTVShows: () =>
		api.get("/tv/popular").then((response) => response.data),
	getSeasonDetails: (tvId: string, seasonNumber: number) =>
		api
			.get<Season>(`/tv/${tvId}/season/${seasonNumber}`)
			.then((response) => response.data),
	getTVShowDetails: (id: string) =>
		api.get(`tv/${id}`).then((response) => response.data),
	getAiringToday: () =>
		api.get("/tv/airing_today").then((response) => response.data),
	getTopRatedTVShows: () =>
		api.get("/tv/top_rated").then((response) => response.data),
	multiSearch: (query: string) =>
		api
			.get("/search/multi", { params: { query } })
			.then((response) => response.data),
};
