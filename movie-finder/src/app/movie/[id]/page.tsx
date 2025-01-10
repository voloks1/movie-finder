import { movieDetails } from "@/types/movies";
import { tmdbAPI } from "@/api/tmdb";
import { Calendar, Clock, Star } from "lucide-react";
import Link from "next/link";

async function getMovie(id: string): Promise<movieDetails> {
	try {
		return await tmdbAPI.getMovieID(id);
	} catch (error) {
		console.error("erro:", error);
		throw new Error("erro ao buscar detalhes do filme");
	}
}

export default async function MoviePage({
	params: { id },
}: {
	params: { id: string };
}) {
	const movie = await getMovie(id);

	return (
		<>
			<div className="w-full bg-zinc-950 h-screen flex items-center">
				<main className="container mx-auto px-24 py-8">
					<div className="flex flex-row gap-8 border p-8 border-zinc-800 bg-zinc-950 rounded-lg">
						<div className="flex">
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={movie.title}
								className="rounded-lg min-w-[300px] my-auto"
							/>
						</div>
						<div className="text-white">
							<h1 className="text-3xl font-bold mb-4">
								{movie.title}
							</h1>
							<p className="text-lg mb-4">{movie.overview}</p>
							<div className="space-y-2">
								<p className="">
									<strong>Data de lançamento:</strong>{" "}
								</p>
								<div className="flex flex-row">
									<Calendar />
									<p className="ml-2">{movie.release_date}</p>
								</div>
								<p>
									<strong>Avaliação:</strong>
								</p>
								<div className="flex flex-row">
									<Star />
									<p className="ml-2">
										{movie.vote_average.toFixed(1)}/10
									</p>
								</div>
								<p>
									<strong>Duração:</strong>
								</p>
								<div className="flex flex-row">
									<Clock />
									<span className="ml-2">
										{`${Math.floor(movie.runtime / 60)}h ${
											movie.runtime % 60
										}m`}
									</span>
								</div>
								<div className="pb-4">
									<strong>Gêneros:</strong>{" "}
									{movie.genres
										.map((genre) => genre.name)
										.join(", ")}
								</div>
								<Link
									href={"/"}
									className="bg-zinc-950 border-2 border-zinc-800 text-white font-semibold py-1 px-3 rounded-md">
									Voltar ao início
								</Link>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
