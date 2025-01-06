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
			<main className="container mx-auto px-4 flex flex-col gap-x-4">
				<div className="h-20 w-full flex flex-col">
					<h1 className="font-semibold text-3xl text-white mt-auto">
						Veja aqui os filmes mais populares recentemente{" "}
					</h1>
					<h1 className="font-semibold text-xl text-zinc-300 mt-auto">
						Clique nos <span className="italic">cards</span> para
						mais informações de cada filme
					</h1>
				</div>
				<MovieList
					movies={movies}
					isLoading={isLoading}
				/>
			</main>
		</div>
	);
}

