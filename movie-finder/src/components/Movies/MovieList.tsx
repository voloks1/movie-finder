import { Movie } from "@/types/movies";
import { MovieCard } from "./MovieCard";

interface MovieListProps {
	movies: Movie[];
	isLoading?: boolean;
}

export const MovieList = ({ movies, isLoading }: MovieListProps) => {
	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
			{movies.map((movie) => (
				<MovieCard
					key={movie.id}
					movie={movie}
				/>
			))}
		</div>
	);
};
