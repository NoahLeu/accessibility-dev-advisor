import { useContext } from "react";
import { AnalysisContext } from "../context/analysisContext";
import { Link } from "react-router-dom";

import accessibilityAspects from "../config/accessibility_aspects.json";

const ResultPage = () => {
	const { analysis } = useContext(AnalysisContext) || {};

	console.log(analysis);

	return analysis && analysis.finished ? (
		<div>
			<h1>Result</h1>
			<p>Aspect 1: {analysis.aspects[0].relationCount}</p>
			<p>Aspect 2: {analysis.aspects[1].relationCount}</p>
		</div>
	) : (
		<div className="bg-gray flex flex-col justify-center items-center w-screen h-screen">
			<h1>Accessibility Advisor for Developers</h1>
			<p>context based accessibility advice for developers</p>
			<Link to="/analysis">
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Click here to start
				</button>
			</Link>
		</div>
	);
};
export default ResultPage;
