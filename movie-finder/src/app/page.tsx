"use client";

import { useState, useEffect } from "react";
import { tmdbAPI } from "@/api/tmdb";
import { Movie } from "@/types/movies";
import { MovieList } from "@/components/Movies/MovieList";
import { TopRatedList } from "@/components/Movies/TopRatedList";
import { UpcomingList } from "@/components/Movies/UpcomingList";
import { Search } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UnifiedSearchBar from "@/components/searchbar/SearchBar";

export default function Home() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
	const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingTopRated, setIsLoadingTopRated] = useState(true);
	const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(true);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const { data } = await tmdbAPI.getPopularMovies();
				setMovies(data.results);
			} catch (error) {
				console.error("Erro ao buscar filmes populares:", error);
			} finally {
				setIsLoading(false);
			}
		};

		const fetchTopRated = async () => {
			try {
				const { data } = await tmdbAPI.getTopRated();
				setTopRatedMovies(data.results);
			} catch (error) {
				console.error(
					"Erro ao buscar filmes mais bem avaliados:",
					error,
				);
			} finally {
				setIsLoadingTopRated(false);
			}
		};

		const fetchUpcoming = async () => {
			try {
				const { data } = await tmdbAPI.getUpcoming();
				setUpcomingMovies(data.results);
			} catch (error) {
				console.error(
					"Erro aos buscar os filmes que irão lançar",
					error,
				);
			} finally {
				setIsLoadingUpcoming(false);
			}
		};

		fetchMovies();
		fetchTopRated();
		fetchUpcoming();
	}, []);

	return (
		<>
			<div className="w-full h-24 flex bg-zinc-950 border-b border-zinc-900">
				<div className="flex flex-row items-center mx-8 w-full">
					<div className="">
						<h1 className="text-4xl font-semibold text-white">
							Movie
							<span className="text-accentColor">Finder</span>
						</h1>
					</div>
					<div className="ml-auto">
						<span>
							<Dialog>
								<DialogTrigger className="flex flex-row bg-accentColor w-28 justify-between h-8 rounded-lg gap-x-2 items-center">
									<span className="text-white font-semibold ml-2">
										Buscar
									</span>
									<Search className="text-white mr-2" />
								</DialogTrigger>
								<DialogContent className="lg:max-w-[650px] lg:h-[180px] min-w-[250px] max-w-[350px] -translate-y-72 bg-zinc-950 backdrop-blur-2xl border-zinc-900">
									<DialogHeader>
										<DialogTitle className="text-white">
											Procure por algum filme
										</DialogTitle>
										<DialogDescription className="w-full pt-4">
											<UnifiedSearchBar />
										</DialogDescription>
									</DialogHeader>
								</DialogContent>
							</Dialog>
						</span>
					</div>
				</div>
			</div>
			<div className="w-full h-full bg-zinc-950">
				<div className="w-10/12 h-full mx-auto">
					<main className="container mx-auto px-4 py-2 flex flex-col gap-x-4">
						<div className="h-20 w-full flex flex-col xl:mb-4 mb-20">
							<h1 className="font-semibold text-3xl text-white mt-auto">
								Veja aqui os filmes mais populares recentemente{" "}
							</h1>
							<h1 className="font-semibold text-xl text-zinc-300 mt-auto">
								Clique nos <span className="italic">cards</span>{" "}
								para mais informações de cada filme
							</h1>
						</div>
						<MovieList
							movies={movies}
							isLoading={isLoading}
						/>
						<div className="border-b w-full border-b-zinc-900" />
						<div className="h-20 w-full flex flex-col xl:mb-4 mb-20">
							<h1 className="font-semibold text-3xl text-white mt-auto">
								Veja aqui os filmes mais bem avaliados até agora{" "}
							</h1>
							<h1 className="font-semibold text-xl text-zinc-300 mt-auto">
								Clique nos <span className="italic">cards</span>{" "}
								para mais informações de cada filme
							</h1>
						</div>
						<TopRatedList
							movies={topRatedMovies}
							isLoading={isLoadingTopRated}
						/>
						<div className="border-b w-full border-b-zinc-900" />
						<div className="h-20 w-full flex flex-col xl:mb-4 mb-20">
							<h1 className="font-semibold text-3xl text-white mt-auto">
								Veja aqui os filmes lançados recentemente{" "}
							</h1>
							<h1 className="font-semibold text-xl text-zinc-300 mt-auto">
								Clique nos <span className="italic">cards</span>{" "}
								para mais informações de cada filme
							</h1>
						</div>
						<UpcomingList
							movies={upcomingMovies}
							isLoading={isLoadingUpcoming}
						/>
					</main>
				</div>
			</div>
		</>
	);
}

