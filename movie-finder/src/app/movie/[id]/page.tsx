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
		<main>
			<div className="w-full flex flex-col">
				<div className="w-full h-[350px] 2xl:h-[450px]">
					<img
						src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
						alt={movie.title}
						className="mx-auto object-contain z-0"
					/>
				</div>
				<div className="bg-zinc-950 text-white h-[410px] 2xl:h-[660px] z-10">
					<div className="mt-4">
						<Link
							href={"/"}
							className="bg-accentColor/60 text-white font-semibold py-1 px-3 ml-4 rounded-lg">
							Voltar ao início
						</Link>
					</div>
					<div className="w-10/12 mx-auto justify-center -mt-4">
						<h1 className="text-4xl text-center font-bold">
							{movie.title}
						</h1>
						<div className="flex flex-col items-center">
							<div className="flex flex-row text-zinc-300">
								<Clock className="mr-2" />
								<span>{`${Math.floor(movie.runtime / 60)}h ${
									movie.runtime % 60
								}m`}</span>
							</div>
							<p className="mt-2">Data de lançamento</p>
							<div className="flex flex-row mb-8 text-zinc-300">
								<Calendar className="mr-2" />
								<p>{movie.release_date}</p>
							</div>
						</div>
						<p className="text-center">
							&quot;{movie.overview}&quot;
						</p>
						<div className="mt-4">
							<div className="flex flex-row">
								<Star className="mr-2 fill-white" />
								<p>{movie.vote_average.toFixed(1)}</p>
							</div>
							<div className="mt-2 flex flex-row gap-x-2 items-center">
								<p className="">Gêneros:</p>
								{movie.genres.map((genre) => (
									<span
										key={genre.id}
										className="px-3 py-1 bg-accentColor font-semibold text-white rounded-full text-sm">
										{genre.name}
									</span>
								))}
							</div>
						</div>
					</div>
					<div className="border-t flex flex-col items-center border-zinc-700 w-full mt-4 2xl:mt-36 text-white text-center">
						<p className="lg:mt-4">
							Made by{" "}
							<a
								className="underline"
								href="https://github.com/voloks1">
								Voloks1
							</a>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
