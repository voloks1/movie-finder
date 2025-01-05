import { tmdbAPI } from "@/api/tmdb";
import { MovieCredits } from "@/components/Movies/MovieCredits";
import { MovieDetails } from "@/components/Movies/MovieDetails";
import { movieDetails } from "@/types/movies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MovieDetailsPage() {
	const router = useRouter();
	const { id } = router.query;
	const [movieDetails, setMovieDetails] = useState<movieDetails | null>(null);

	useEffect(() => {
		if (!id) return;

		const fetchDetails = async () => {
			try {
				const { data } = await tmdbAPI.getMoviesDetails(Number(id));
				setMovieDetails(data);
			} catch (error) {
				console.error("Error fetching movie details:", error);
			}
		};
		fetchDetails();
	}, [id]);

	if (!movieDetails) return <p>Loading...</p>;
	return (
		<div>
			<MovieDetails movie={movieDetails} />
			<MovieCredits credits={movieDetails.credits} />
		</div>
	);
}
