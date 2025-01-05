interface Credit {
	id: number;
	name: string;
	character?: string;
	job?: string;
	profile_path: string | null;
}

interface MovieCreditsProps {
	credits: {
		cast: Credit[];
		crew: Credit[];
	};
}

export const MovieCredits = ({ credits }: MovieCreditsProps) => {
	const mainCast = credits.cast.slice(0, 10);

	const keyCrewMembers = credits.crew.filter((member) =>
		["Director", "Screenplay"].includes(member.job || ""),
	);

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<section className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">
					Elenco Principal
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{mainCast.map((actor) => (
						<div
							key={actor.id}
							className="rounded-lg overflow-hidden shadow-md">
							{actor.profile_path ? (
								<img
									src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
									alt={actor.name}
									className="w-full h-48 object-cover"
								/>
							) : (
								<div className="w-full h-48 bg-gray-200 flex items-center justify-center">
									<span className="text-gray-400">
										Sem foto
									</span>
								</div>
							)}
							<div className="p-3">
								<h3 className="font-medium">{actor.name}</h3>
								<p className="text-sm text-gray-600">
									{actor.character}
								</p>
							</div>
						</div>
					))}
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-semibold mb-4">
					Equipe Técnica Principal
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{keyCrewMembers.map((crew) => (
						<div
							key={`${crew.id}-${crew.job}`}
							className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
							{crew.profile_path ? (
								<img
									src={`https://image.tmdb.org/t/p/w45${crew.profile_path}`}
									alt={crew.name}
									className="w-12 h-12 rounded-full object-cover"
								/>
							) : (
								<div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
									<span className="text-gray-400 text-xs">
										Sem foto
									</span>
								</div>
							)}
							<div>
								<h3 className="font-medium">{crew.name}</h3>
								<p className="text-sm text-gray-600">
									{crew.job}
								</p>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};
