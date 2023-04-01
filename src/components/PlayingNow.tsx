import {
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	useContext,
} from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import me from "../img/EgLF6Jmi_4x.jpg";
import Image from "next/image";
import Head from "next/head";
import { BsRepeat1, BsPlayFill } from "react-icons/bs";
import { FiPause } from "react-icons/fi";
import { useRouter } from "next/router";
import { PodcastContext } from "../context/podcastContext";

interface playingProp {
	playingNow: boolean;
	setPlayingNow: Dispatch<SetStateAction<boolean>>;
}

function PlayingNow({ playingNow, setPlayingNow }: playingProp) {
	const [title, setTitle] = useState("Podcast");
	const router = useRouter();
	const { pathname } = router;
	const { playSinglePodcast } = useContext(PodcastContext);

	useEffect(() => {
		setPlayingNow(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const customIcons = {
		play: <BsPlayFill size={35} />,
		pause: <FiPause size={35} />,
		rewind: (
			<svg
				stroke="currentColor"
				fill="none"
				strokeWidth="2.25"
				viewBox="0 0 24 24"
				strokeLinecap="round"
				strokeLinejoin="round"
				height="17"
				width="17"
				xmlns="http://www.w3.org/2000/svg"
			>
				<desc></desc>
				<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
				<path d="M15 4.55a8 8 0 0 0 -6 14.9m0 -4.45v5h-5"></path>
				<line x1="18.37" y1="7.16" x2="18.37" y2="7.17"></line>
				<line x1="13" y1="19.94" x2="13" y2="19.95"></line>
				<line x1="16.84" y1="18.37" x2="16.84" y2="18.38"></line>
				<line x1="19.37" y1="15.1" x2="19.37" y2="15.11"></line>
				<line x1="19.94" y1="11" x2="19.94" y2="11.01"></line>
			</svg>
		),
		forward: (
			<svg
				stroke="currentColor"
				fill="none"
				strokeWidth="2.25"
				viewBox="0 0 24 24"
				strokeLinecap="round"
				strokeLinejoin="round"
				height="17"
				width="17"
				xmlns="http://www.w3.org/2000/svg"
			>
				<desc></desc>
				<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
				<path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5"></path>
				<line x1="5.63" y1="7.16" x2="5.63" y2="7.17"></line>
				<line x1="4.06" y1="11" x2="4.06" y2="11.01"></line>
				<line x1="4.63" y1="15.1" x2="4.63" y2="15.11"></line>
				<line x1="7.16" y1="18.37" x2="7.16" y2="18.38"></line>
				<line x1="11" y1="19.94" x2="11" y2="19.95"></line>
			</svg>
		),
		loop: <BsRepeat1 />,
	};

	return (
		<>
			<Head key="111">
				<title>{title}</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="mx-auto max-w-[300px] pt-3 md:sticky md:top-0 md:right-0 md:h-screen md:w-full">
				<div className="rounded-lg bg-[#2d0796] p-5 md:p-3">
					<div className="h-[240px] w-full rounded-2xl p-1 md:p-0">
						<Image
							src={playSinglePodcast.imageUrl ? playSinglePodcast.imageUrl : me}
							priority={true}
							alt="sdfsd"
							width={100}
							height={100}
							className=" h-full w-full rounded-2xl object-cover"
						/>
					</div>
					<div className="p-2 text-center text-white">
						{playSinglePodcast.description ? (
							<h1 className=" text-xl font-bold">
								{playSinglePodcast.description.length > 45
									? playSinglePodcast.description.slice(0, 45) + "..."
									: playSinglePodcast.description.slice(0, 45)}
							</h1>
						) : (
							<h1 className=" text-2xl">
								<span className="text-purple-500">Po</span>dcast.
							</h1>
						)}
						<div className="scrolling-carousel">
							{playSinglePodcast.name ? (
								<h1 className="scrolling-text text-right">
									Playing-Now {playSinglePodcast.name}
								</h1>
							) : (
								<h1>Now playingNow - nothing</h1>
							)}
						</div>
					</div>
					<AudioPlayer
						autoPlay={false}
						src={playSinglePodcast.audioUrl}
						loop={false}
						className="me"
						customIcons={customIcons}
						volume={60}
						onPlay={() =>
							setTitle(
								playSinglePodcast.description.length > 45
									? playSinglePodcast.description.slice(0, 45) + "..."
									: playSinglePodcast.description.slice(0, 45)
							)
						}
					/>
				</div>
			</div>
		</>
	);
}

export default PlayingNow;
