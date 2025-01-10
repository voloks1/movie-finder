"use client";

import { useState } from "react";
import Link from "next/link";
import { tmdbAPI } from "@/api/tmdb";
import type { SearchResult } from "@/types/search";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export default function UnifiedSearchBar() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchQuery = e.target.value;
		setQuery(searchQuery);

		if (searchQuery.length > 2) {
			setIsLoading(true);
			try {
				const data = await tmdbAPI.multiSearch(searchQuery);
				// Filtra apenas resultados de filmes e séries
				const filteredResults = data.results.filter(
					(item) =>
						item.media_type === "movie" || item.media_type === "tv",
				);
				setResults(filteredResults);
			} catch (error) {
				console.error("Erro na busca:", error);
			} finally {
				setIsLoading(false);
			}
		} else {
			setResults([]);
		}
	};

	// Função helper para formatar o título
	const getTitle = (result: SearchResult) =>
		result.media_type === "movie" ? result.title : result.name;

	// Função helper para formatar a data
	const getYear = (result: SearchResult) => {
		const date =
			result.media_type === "movie"
				? result.release_date
				: result.first_air_date;
		return date ? new Date(date).getFullYear() : null;
	};

	// Função helper para gerar o link
	const getLink = (result: SearchResult) =>
		result.media_type === "movie"
			? `/movie/${result.id}`
			: `/tv/${result.id}`;

	// Função helper para obter o ícone do tipo de mídia
	const getMediaTypeIcon = (mediaType: "movie" | "tv") => {
		return mediaType === "movie" ? "🎬" : "📺";
	};

	return (
		<div className="relative w-full max-w-xl mx-auto">
			<div className="relative">
				<Input
					type="text"
					value={query}
					onChange={handleSearch}
					placeholder="Buscar filmes e séries..."
					className="w-full p-3 mt-2 pl-12 rounded-lg border-zinc-800 shadow-sm text-white"
				/>
				<span className="absolute left-3 top-1/2 transform -translate-y-1/2">
					<Search className="text-zinc-600" />
				</span>
			</div>

			{isLoading && (
				<div className="absolute top-full mt-2 w-full bg-zinc-950 rounded-lg shadow-lg p-4 z-50">
					<div className="flex items-center justify-center">
						<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
						<span className="ml-2 text-white">Buscando...</span>
					</div>
				</div>
			)}

			{results.length > 0 && !isLoading && (
				<div className="absolute top-full mt-2 w-full bg-zinc-950 rounded-lg shadow-lg z-50 max-h-[70vh] overflow-y-auto">
					{results.map((result) => (
						<Link
							key={`${result.media_type}-${result.id}`}
							href={getLink(result)}
							className="block p-3 hover:bg-zinc-800 transition-colors">
							<div className="flex items-center gap-3">
								{result.poster_path ? (
									<img
										src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
										alt={getTitle(result)}
										className="w-12 h-16 object-cover rounded"
									/>
								) : (
									<div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center">
										<span className="text-gray-400">
											No image
										</span>
									</div>
								)}
								<div className="flex-grow">
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-500">
											{getMediaTypeIcon(
												result.media_type,
											)}
										</span>
										<h3 className="font-semibold">
											{getTitle(result)}
										</h3>
									</div>
									<div className="flex items-center gap-2 text-sm text-gray-600">
										{getYear(result) && (
											<span>{getYear(result)}</span>
										)}
										<span className="text-yellow-500">
											⭐ {result.vote_average.toFixed(1)}
										</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
