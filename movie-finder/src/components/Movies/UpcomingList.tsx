import { Movie } from "@/types/movies";
import { UpcomingCard } from "./UpcomingCard";

interface upcomingListProps {
	movies: Movie[];
	isLoading?: boolean;
}

export const UpcomingList = ({ movies, isLoading }: upcomingListProps) => {
	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<div className="flex gap-4 py-4 px-2 overflow-x-auto overflow-y-hidden">
			{movies.map((movie) => (
				<UpcomingCard
					key={movie.id}
					movie={movie}
				/>
			))}
		</div>
	);
};
