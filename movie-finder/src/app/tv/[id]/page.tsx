import { tmdbAPI } from "@/api/tmdb";
import Link from "next/link";

async function getTVShow(id: string) {
	try {
		return await tmdbAPI.getTVShowDetails(id);
	} catch (error) {
		console.error("Ocorreu um erro ao buscar detalhes da série.", error);
		throw new Error("failed to fetch tv show details");
	}
}

export default async function TVShowPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const tvShow = await getTVShow(id);

	return (
		<>
			<div className="w-full bg-zinc-950 h-screen flex items-center">
				<main className="container mx-auto px-24 py-8">
					<div className="flex flex-row gap-8 border p-8 border-zinc-800 bg-zinc-950 rounded-lg">
						<div>
							<img
								src={`https://image.tmdb.org/t/p/original${tvShow.poster_path}`}
								alt={tvShow.name}
								className="rounded-lg min-w-[300px]"
							/>
						</div>
						<div className="text-white">
							<h1 className="text-3xl font-bold mb-4">
								{tvShow.name}
							</h1>
							<p className="text-lg mb-4">{tvShow.overview}</p>
							<div className="space-y-2">
								<p>
									<strong>Primeira Exibição:</strong>{" "}
									{tvShow.first_air_date}
								</p>
								<p>
									<strong>Avaliação:</strong>{" "}
									{tvShow.vote_average.toFixed(1)}/10
								</p>
								<p>
									<strong>Temporadas:</strong>{" "}
									{tvShow.number_of_seasons}
								</p>
								<p>
									<strong>Episódios:</strong>{" "}
									{tvShow.number_of_episodes}
								</p>
								<p>
									<strong>Status:</strong> {tvShow.status}
								</p>
								<div>
									<strong>Gêneros:</strong>{" "}
									{tvShow.genres
										.map((genre) => genre.name)
										.join(", ")}
								</div>
								{tvShow.created_by.length > 0 && (
									<div className="pb-12">
										<strong>Criado por:</strong>{" "}
										{tvShow.created_by
											.map((creator) => creator.name)
											.join(", ")}
									</div>
								)}
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
