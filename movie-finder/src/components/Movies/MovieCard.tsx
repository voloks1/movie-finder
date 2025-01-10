"use client";

import { useState } from "react";
import { Movie, movieDetails } from "@/types/movies";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { tmdbAPI } from "@/api/tmdb";
import { Button } from "../ui/button";
import { Play } from "lucide-react";
import Link from "next/link";

export interface MovieCardProps {
	movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [movieDetails, setMovieDetails] = useState<movieDetails | null>(null);
	const [isTrailerOpen, setIsTrailerOpen] = useState(false);
	const [trailer, setTrailer] = useState<string | null>(null);

	const handleOpenDialog = async () => {
		try {
			const { data } = await tmdbAPI.getMoviesDetails(movie.id);
			setMovieDetails(data);
			setIsOpen(true);
		} catch (error) {
			console.error("Erro ao buscar detalhes:", error);
		}
	};

	const handleOpenTrailer = async (e: React.MouseEvent) => {
		e.stopPropagation();
		try {
			if (!trailer) {
				const { data } = await tmdbAPI.getMoviesDetails(movie.id);
				const trailerVideo = data.videos?.results.find(
					(video: { type: string; site: string }) =>
						video.type === "Trailer" && video.site === "YouTube",
				);
				setTrailer(trailerVideo?.key || null);
			}
			setIsTrailerOpen(true);
		} catch (error) {
			console.error("Erro ao buscar trailer:", error);
		}
	};

	return (
		<>
			<Card
				className="overflow-hidden cursor-pointer hover:scale-105 transition-transform border-zinc-800 rounded-lg min-h-fit min-w-[220px]"
				onClick={handleOpenDialog}>
				<CardContent className="p-0 relative">
					<div className="relative aspect-[2/3] w-full">
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
							className="object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
						<Button
							onClick={handleOpenTrailer}
							variant="outline"
							size="icon"
							className="absolute bottom-20 left-2 h-8 w-24 rounded-lg bg-accentColor hover:bg-accentColor/70 border-accentColor/80">
							<span className="text-white font-semibold">
								Trailer
							</span>
							<Play className="h-4 w-4 text-white fill-white" />
						</Button>
					</div>

					<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
						<h3 className="font-semibold truncate">
							{movie.title}
						</h3>
						<div className="flex items-center gap-2 text-sm">
							<span>⭐ {movie.vote_average.toFixed(1)}</span>
							<span>•</span>
							<span>
								{new Date(movie.release_date).getFullYear()}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>

			<Dialog
				open={isOpen}
				onOpenChange={setIsOpen}>
				<DialogContent className="max-w-3xl h-[90vh] overflow-y-auto bg-zinc-950 border-zinc-900 text-white">
					{movieDetails && (
						<>
							<DialogHeader>
								<DialogTitle className="text-2xl font-bold">
									{movieDetails.title}
								</DialogTitle>
							</DialogHeader>

							<div className="relative w-full 2xl:aspect-video rounded-lg overflow-hidden">
								<img
									src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
									alt={movieDetails.title}
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="relative aspect-[2/3] rounded-lg overflow-hidden">
									<img
										src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
										alt={movieDetails.title}
										className="object-cover"
									/>
								</div>

								<div className="md:col-span-2 space-y-4">
									<div className="flex flex-wrap gap-2 text-sm">
										<span>
											{new Date(
												movieDetails.release_date,
											).getFullYear()}
										</span>
										<span>•</span>
										<span>{`${Math.floor(
											movieDetails.runtime / 60,
										)}h ${
											movieDetails.runtime % 60
										}m`}</span>
										<span>•</span>
										<span>
											⭐{" "}
											{movieDetails.vote_average.toFixed(
												1,
											)}
										</span>
									</div>
									<div className="flex flex-row">
										<div className="flex flex-wrap gap-2 items-center">
											{movieDetails.genres.map(
												(genre) => (
													<span
														key={genre.id}
														className="px-3 py-1 bg-accentColor font-semibold text-white rounded-full text-sm">
														{genre.name}
													</span>
												),
											)}
										</div>

										<Link
											href={`/movie/${movie.id}`}
											className="bg-accentColor/60 text-white font-semibold py-1 px-3 ml-auto rounded-lg">
											Ver Detalhes
										</Link>
									</div>

									<div>
										<h3 className="font-semibold mb-2">
											Sinopse
										</h3>
										<p className="text-gray-400 leading-relaxed overflow-scroll max-h-24 overflow-x-hidden">
											{movieDetails.overview}
										</p>
									</div>

									<div>
										<h3 className="font-semibold mb-2">
											Elenco Principal
										</h3>
										<div className="flex overflow-x-auto gap-4 pb-4">
											{movieDetails.credits.cast
												.slice(0, 5)
												.map((actor) => (
													<div
														key={actor.id}
														className="flex-shrink-0">
														<div className="relative w-20 h-20 rounded-full overflow-hidden mb-2">
															{actor.profile_path ? (
																<img
																	src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
																	alt={
																		actor.name
																	}
																	className="object-contain"
																/>
															) : (
																<div className="w-full h-full bg-gray-200 flex items-center justify-center">
																	<span className="text-xs text-gray-400">
																		Sem foto
																	</span>
																</div>
															)}
														</div>
														<p className="text-sm font-medium text-center truncate w-20">
															{actor.name}
														</p>
													</div>
												))}
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>

			<Dialog
				open={isTrailerOpen}
				onOpenChange={setIsTrailerOpen}>
				<DialogContent className="2xl:min-w-[1366px] xl:min-w-[1066px] h-auto sm:h-[80vh] p-0 bg-zinc-950 border-zinc-900 flex flex-col items-center">
					<DialogHeader className="h-8">
						<DialogTitle></DialogTitle>
					</DialogHeader>
					{trailer ? (
						<iframe
							src={`https://www.youtube.com/embed/${trailer}`}
							title={`${movie.title} - Trailer`}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="w-full h-full aspect-video"
						/>
					) : (
						<div className="flex items-center justify-center p-8 text-white">
							Trailer não disponível
						</div>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};
