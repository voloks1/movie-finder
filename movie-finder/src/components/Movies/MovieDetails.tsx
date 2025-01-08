import { movieDetails as MovieDetailsType } from "@/types/movies";

interface MovieDetailsProps {
	movie: MovieDetailsType;
}

export const MovieDetails = ({ movie }: MovieDetailsProps) => {
	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<div
				className="w-full h-[400px] relative rounded-xl overflow-hidden mb-8"
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

				<div className="absolute bottom-0 left-0 p-8 text-white">
					<h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
					<div className="flex items-center gap-4 mb-4">
						<span>
							{new Date(movie.release_date).getFullYear()}
						</span>
						<span>{`${Math.floor(movie.runtime / 60)}h ${
							movie.runtime % 60
						}m`}</span>
						<span className="flex items-center gap-1">
							<span>⭐</span>
							{movie.vote_average.toFixed(1)}
						</span>
					</div>

					<div className="flex gap-2">
						{movie.genres.map((genre) => (
							<span
								key={genre.id}
								className="px-3 py-1 bg-white/20 rounded-full text-sm">
								{genre.name}
							</span>
						))}
					</div>
				</div>
			</div>

			<div className="max-w-3xl mb-8">
				<h2 className="text-2xl font-semibold mb-4">Sinopse</h2>
				<p className="text-gray-700 leading-relaxed">
					{movie.overview}
				</p>
			</div>
		</div>
	);
};
