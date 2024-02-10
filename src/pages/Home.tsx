import { Link } from "react-router-dom";
import { AnalysisContext } from "../context/analysisContext";
import { useContext } from "react";
import InformationModal from "../components/InformationModal";

const Home = () => {
	const { initializeAnalysis } = useContext(AnalysisContext) || {};

	return (
		<div className="bg-background flex flex-col justify-center items-center w-screen h-screen">
			<InformationModal />

			<h1 className="text-6xl font-bold text-primary mb-2 max-w-2xl text-center leading-tight">
				Accessibility Advisor for Developers
			</h1>
			<p className="text-center mb-4">
				context based accessibility advice for developers
			</p>
			<Link to="/analysis">
				<button
					onClick={initializeAnalysis}
					className="bg-primary hover:bg-primary/70 text-white font-bold py-2 px-4 rounded"
				>
					Click here to start
				</button>
			</Link>
		</div>
	);
};

export default Home;
