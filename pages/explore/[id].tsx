import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { GraphQLClient } from "graphql-request";
import { useRouter } from "next/router";
import { PodcastContext } from "@/src/context/podcastContext";
import CardSkeleton from "@/src/components/CardSkeleton";
interface PodcastInterface {
	imageUrl: string;
	name: string;
	description: string;
	datePublished: string;
	genres: string[];
	language: string;
}

function ListenToSingleCast() {
	const { setPlaySinglePodcast, playSinglePodcast } =
		useContext(PodcastContext);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [episodes, setEpisodes] = useState([]);
	const [fullPodcast, setfullPodcast] = useState<PodcastInterface>({
		description: "",
		name: "",
		imageUrl: "",
		datePublished: "",
		genres: [],
		language: "",
	});
	const { query } = useRouter();
	const { id } = query;

	useEffect(() => {
		const client = new GraphQLClient("https://api.taddy.org", {
			headers: {
				"X-USER-ID": "1493",
				"X-API-KEY":
					"05d91224222843e9df7f45a0a3b6b6d0842e657db350d3ff071a57452d15c337f1cdf32888f8b96d7afc1d032ac9531fcc",
			},
		});

		const query = `
					query {
							getPodcastSeries(name:"${id}"){
							  uuid
							  name
							  itunesId
							  description
							  imageUrl
							  language
							  genres
							  datePublished
							  
							  episodes{
								uuid
							  	datePublished
								episodeNumber
								name
								description
								audioUrl
								imageUrl
							  }
							}
					}
					`;

		client
			.request(query)
			.then((data: any) => {
				setEpisodes(data.getPodcastSeries.episodes);
				setfullPodcast(data.getPodcastSeries);
				setLoading(false);
				setError(null);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	}, [id]);

	const myDate = new Date(fullPodcast.datePublished).toLocaleDateString(
		"en-us",
		{
			weekday: "long",
			year: "numeric",
			month: "short",
			day: "numeric",
		}
	);

	return (
		<>
			{error ? (
				<div className="flex flex-col items-center justify-center h-screen gap-2">
					<h1 className="text-center text-3xl text-[red] md:text-5xl">
						Something went wrong😥
					</h1>
					<p className="text-center text-red-600">
						Please check your internet and try again
						<span className="text-2xl">😪</span>
					</p>
				</div>
			) : (
				<div className="mt-3 text-3xl text-[#cbcbce]">
					<h1 className="mx-auto mb-3 max-w-[400px] text-center">
						{fullPodcast?.name}
					</h1>
					<div className="z-50 mx-auto grid grid-cols-1 gap-3 rounded-lg bg-[#131218] p-5 shadow-lg shadow-[#00000049] sm:max-w-[300px] md:max-w-full  md:grid-cols-2 md:p-3 xl:sticky xl:top-0">
						{loading ? (
							<Skeleton width={200} height={200} duration={1.4} />
						) : (
							<div className="w-full h-full ">
								<Image
									width={500}
									height={500}
									property="true"
									src={fullPodcast?.imageUrl}
									alt={fullPodcast?.name}
									className="w-full h-full"
								/>
							</div>
						)}
						{loading ? (
							<div>
								<div>
									<Skeleton />
									<Skeleton height={70} />
								</div>
								<div>
									<Skeleton width={140} height={22} />
									<Skeleton width={170} height={20} />
								</div>
							</div>
						) : (
							<div className="w-full h-full">
								<h1 className="py-1 text-2xl font-medium text-white">
									{fullPodcast?.name}
								</h1>
								<p className="text-sm font-normal leading-5 text-[gray]">
									{fullPodcast?.description?.length > 250
										? fullPodcast?.description?.substring(0, 250) + "..."
										: fullPodcast?.description}
								</p>
								<div className="mt-5 text-lg text-[grey]">
									<p className="text-white">
										Language:
										<span className="ml-1 text-base font-normal text-[grey]">
											{fullPodcast?.language}
										</span>
									</p>
									<p className="text-white">
										Date Published:
										<span className="ml-1 text-base font-normal text-[grey]">
											{myDate.toString()}
										</span>
									</p>
									<p className="text-white">
										Genre:
										<span
											style={{ overflowWrap: "anywhere" }}
											className="ml-2 text-sm text-[grey]"
										>
											{fullPodcast?.genres[0]}
										</span>
									</p>
								</div>
							</div>
						)}
					</div>
					<div className="mt-20 lg:mt-10">
						<h3 className="text-center lg:text-left">Episodes</h3>
						{loading ? (
							<CardSkeleton cards={16} />
						) : (
							<div className="grid grid-cols-2 gap-3 mt-5 mb-7 sm:gap-7 md:gap-10">
								{episodes.map((data: any) => {
									return (
										<div
											key={data.uuid}
											onClick={() => setPlaySinglePodcast(data)}
											className={`${
												playSinglePodcast.uuid === data.uuid && "active-podcast"
											} mx-auto flex w-full max-w-[270px] cursor-pointer flex-col flex-wrap items-center justify-center gap-5 rounded-lg bg-[#0b0a0fad] p-3 shadow-sm shadow-black transition-colors hover:bg-[#2d0796] md:flex-row lg:max-w-none lg:flex-col xl:flex-row`}
										>
											<div className="flex-1 w-full h-auto lg:h-full ">
												<Image
													width={200}
													height={200}
													src={data?.imageUrl}
													alt={data.name}
													priority
													className="object-cover w-full h-full"
												/>
											</div>
											<div className="flex-[2]">
												<h3 className="mb-3 text-base text-white">
													{data.name.length > 35
														? data.name.slice(0, 35) + "..."
														: data.name}
												</h3>
												<p className=" hidden text-sm text-[white] lg:text-[12px] xl:flex">
													{data.description
														? data?.description?.substring(0, 70) + "..."
														: fullPodcast?.description?.substring(0, 70) +
														  "..."}
												</p>
												<p className="flex text-sm text-[grey] lg:text-[12px] xl:hidden">
													{data.description
														? data?.description?.substring(0, 70) + "..."
														: fullPodcast?.description?.substring(0, 70) +
														  "..."}
												</p>
												{data.episodeNumber && (
													<p className="mt-3 text-sm text-white">
														Episode:{data.episodeNumber}
													</p>
												)}
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default ListenToSingleCast;
