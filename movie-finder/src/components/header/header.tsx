import { Search } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Header() {
	return (
		<>
			<div className="w-full h-24 flex bg-zinc-950 border-b border-zinc-900">
				<div className="flex flex-row items-center mx-8 w-full">
					<div className="">
						<h1 className="text-4xl font-semibold text-white">
							Movie<span className="text-amber-500">Finder</span>
						</h1>
					</div>
					<div className="w-full">
						<span>
							<Dialog>
								<DialogTrigger className="w-full">
									<Search className="text-white ml-auto" />
								</DialogTrigger>
								<DialogContent className="lg:max-w-[650px] lg:h-[180px] max-w-[180px] items-center bg-zinc-950 backdrop-blur-2xl border-zinc-900">
									<DialogHeader>
										<DialogTitle className="text-white">
											Procure por algum filme
										</DialogTitle>
										<DialogDescription className="w-full">
											<Input
												className="border-zinc-800 focus:ring-transparent text-white h-10 w-full"
												type="text"
												placeholder="Pesquisar filme..."
											/>
											<Button className="flex mx-auto mt-4 bg-transparent/20 text-zinc-300">
												<Search />
												Pesquisar
											</Button>
										</DialogDescription>
									</DialogHeader>
								</DialogContent>
							</Dialog>
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
