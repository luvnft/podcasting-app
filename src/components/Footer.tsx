import { sideLinks } from "@/sidebarData";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaTwitter } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

function Footer() {
	const { pathname } = useRouter();

	return (
		<div className="sticky left-0 z-20 w-full py-3 mt-3 bg-black my-scroll -bottom-32 sm:fixed sm:bottom-0 lg:relative lg:px-5">
			<div className="flex flex-col justify-center gap-3 mb-20 sm:mb-0 sm:flex-row ">
				<ul className="flex-1 hidden gap-1 mx-auto lg:flex lg:max-w-full">
					{sideLinks.map((data) => {
						return (
							<Link
								className={` ${
									pathname === data.path && "text-[#A71930]"
								} flex w-fit items-center py-1 px-4 text-sm text-white hover:text-[#A71930] active:scale-[1.2]`}
								key={data.id}
								href={data.path}
							>
								{data.name}
							</Link>
						);
					})}
				</ul>
				<div className="flex items-center justify-center flex-1 gap-7">
					<Link href="https://discord.gg/WJB4GAAvNr">
						<FaDiscord color="white" size={15} />
					</Link>
					<Link href="https://tiktok.com/@atl5d">
						<FaTiktok color="white " size={15} />
					</Link>
					<Link href="https://x.com/atl5d">
						<FaTwitter color="white" size={15} />
					</Link>
				</div>
				<p className="flex-1 text-center text-sm text-white sm:flex-[2]">
					Created by <span className="text-[#A71930]">The Wizard of Hahz</span>{" "}
					with ❤️
				</p>
				<p className="flex-1 text-center text-sm text-white sm:flex-[2]">
					&copy;
					<span className="text-[#A71930]">{` ${new Date().getFullYear()} `}</span>{" "}
					All rights reserved
				</p>
			</div>
		</div>
	);
}

export default Footer;
