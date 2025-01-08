import { Movie } from "@/types/movies";
import { TopRatedCard } from "./TopRatedCard";

interface TopRatedListProps {
	movies: Movie[];
	isLoading?: boolean;
}

export const TopRatedList = ({ movies, isLoading }: TopRatedListProps) => {
	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<div className="flex gap-4 py-4 px-2 overflow-x-auto overflow-y-hidden">
			{movies.map((movie) => (
				<TopRatedCard
					key={movie.id}
					movie={movie}
				/>
			))}
		</div>
	);
};
