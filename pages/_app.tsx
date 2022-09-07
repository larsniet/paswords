import "../styles/globals.css";

import Navbar from "@/components/Navbar";
import { ThemeContextProvider } from "@/themes/themeContext";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeContextProvider>
			<div className="fixed top-0 left-0 w-full h-full rotate-180">
				<svg
					id="visual"
					preserveAspectRatio="none"
					viewBox="0 0 900 600"
					width="100%"
					height="100%"
				>
					<rect x="0" y="0" fill="#001220"></rect>
					<defs>
						<linearGradient id="grad1_0" x1="33.3%" y1="100%" x2="100%" y2="0%">
							<stop offset="20%" stopColor="#fbae3c" stopOpacity="1"></stop>
							<stop offset="80%" stopColor="#fbae3c" stopOpacity="1"></stop>
						</linearGradient>
					</defs>
					<defs>
						<linearGradient id="grad1_1" x1="33.3%" y1="100%" x2="100%" y2="0%">
							<stop offset="20%" stopColor="#fbae3c" stopOpacity="1"></stop>
							<stop offset="80%" stopColor="#001220" stopOpacity="1"></stop>
						</linearGradient>
					</defs>
					<defs>
						<linearGradient id="grad2_0" x1="0%" y1="100%" x2="66.7%" y2="0%">
							<stop offset="20%" stopColor="#fbae3c" stopOpacity="1"></stop>
							<stop offset="80%" stopColor="#fbae3c" stopOpacity="1"></stop>
						</linearGradient>
					</defs>
					<defs>
						<linearGradient id="grad2_1" x1="0%" y1="100%" x2="66.7%" y2="0%">
							<stop offset="20%" stopColor="#001220" stopOpacity="1"></stop>
							<stop offset="80%" stopColor="#fbae3c" stopOpacity="1"></stop>
						</linearGradient>
					</defs>
					<g transform="translate(900, 600)">
						<path
							d="M-216.3 0C-199.8 -22.4 -183.3 -44.9 -175.5 -72.7C-167.7 -100.5 -168.6 -133.7 -153 -153C-137.3 -172.2 -105.2 -177.5 -76.9 -185.7C-48.7 -193.9 -24.3 -205.1 0 -216.3L0 0Z"
							fill="#96446e"
						></path>
					</g>
					<g transform="translate(0, 0)">
						<path
							d="M216.3 0C206.1 24.8 195.9 49.6 187.5 77.7C179.2 105.8 172.6 137.3 153 153C133.4 168.7 100.8 168.5 73.1 176.5C45.4 184.4 22.7 200.4 0 216.3L0 0Z"
							fill="#96446e"
						></path>
						<path
							d="M108.2 0C103.1 12.4 98 24.8 93.8 38.8C89.6 52.9 86.3 68.6 76.5 76.5C66.7 84.3 50.4 84.3 36.5 88.2C22.7 92.2 11.4 100.2 0 108.2L0 0Z"
							fill="#fbae3c"
						></path>
					</g>
				</svg>
			</div>
			<div className="min-h-screen">
				<Navbar />
				<main className="flex flex-col">
					<Component {...pageProps} />
				</main>
			</div>
		</ThemeContextProvider>
	);
}

export default MyApp;
