const Loading = () => {
	return (
		<div className="absolute w-full h-full z-10 bg-opacity-80 bg-white">
			<div className="flex items-center justify-center h-screen">
				<div className="flex flex-col items-center justify-center space-y-2">
					<progress className="progress w-56"></progress>

					<p className="text-black">Loading...</p>
				</div>
			</div>
		</div>
	);
};

export default Loading;
