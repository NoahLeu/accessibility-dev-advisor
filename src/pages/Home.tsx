import { Link } from "react-router-dom";
import { AnalysisContext } from "../context/analysisContext";
import { useContext } from "react";

const Home = () => {
	const { initializeAnalysis } = useContext(AnalysisContext) || {};

	return (
		<div className="bg-gray flex flex-col justify-center items-center w-screen h-screen">
			<h1 className="text-4xl font-bold text-primary mb-2">
				Accessibility Advisor for Developers
			</h1>
			<p className="text-center mb-4">
				context based accessibility advice for developers
			</p>
			<Link to="/analysis">
				<button
					onClick={initializeAnalysis}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Click here to start
				</button>
			</Link>
		</div>
	);
};

export default Home;
