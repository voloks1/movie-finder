"use client";

import { useState, useEffect } from "react";
import { tmdbAPI } from "@/api/tmdb";
import { Movie } from "@/types/movies";
import { MovieList } from "@/components/Movies/MovieList";

export default function Home() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const { data } = await tmdbAPI.getPopularMovies();
				setMovies(data.results);
			} catch (error) {
				console.error("Erro:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMovies();
	}, []);

	return (
		<div className="w-full h-full">
			<main className="container mx-auto px-4 py-8 mt-20 flex flex-row gap-x-4">
				<div className="mb-8">
					<h1 className="text-4xl font-bold mb-2 text-white">
						Filmes Populares
					</h1>
					<p className="text-gray-600">
						Descubra os filmes mais populares do momento
					</p>
					<div className="my-4">
						<input
							type="text"
							placeholder="Buscar filmes..."
							className="w-full md:w-96 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
						/>
					</div>
				</div>

				<MovieList
					movies={movies}
					isLoading={isLoading}
				/>
			</main>
		</div>
	);
}

