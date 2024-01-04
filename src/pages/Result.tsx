import { useContext, useEffect } from "react";
import { AnalysisContext } from "../context/analysisContext";
import { Link, useNavigate } from "react-router-dom";

import accessibilityAspects from "../config/accessibility_aspects.json";
import { orderAspects } from "../calc/aspectOrdering";

const ResultPage = () => {
	const { analysis } = useContext(AnalysisContext) || {};
	const navigate = useNavigate();

	useEffect(() => {
		if (!analysis || !analysis.finished) {
			navigate("/");
		}
	}, [analysis, navigate]);

	return analysis && analysis.finished ? (
		<div
			className="bg-gray flex flex-col justify-center items-center w-screen h-screen"
			style={{ overflow: "scroll" }}
		>
			<h1 className="text-4xl font-bold text-primary mb-4">Result</h1>
			<p
				className="w-full max-w-5xl mb-8
			"
			>
				You have answered all questions. Here are the results of your analysis.
				The list is sorted based on your answers to the questions. The most
				relevant requirements to implement are at the top with the highest
				number of points.
			</p>
			<div className="w-full flex flex-col gap-y-4">
				{orderAspects(analysis.aspects).map((aspect, index) => {
					let specificAspect = accessibilityAspects.find(
						(a) => a.id === aspect.id
					);

					return specificAspect ? (
						<div
							key={aspect.id}
							className="w-full flex p-4 border-2 rounded-md border-primary max-w-5xl mx-auto"
						>
							<div className="rounded-full bg-primary text-white aspect-square h-12 w-12 font-bold flex justify-center items-center mr-4">
								{index + 1}.
							</div>

							<div className="flex flex-col grow">
								<h2 className="text-xl font-bold">{specificAspect.name}</h2>
								<p>{specificAspect.description}</p>
								<p className="text-primary font-bold mt-2">Quellen:</p>
								<div className="flex gap-x-4 flex-wrap underline text-primary">
									{specificAspect.sources.map((source) => (
										<Link key={source} to={source}>
											{source}
										</Link>
									))}
								</div>
							</div>

							<p>
								Points:{" "}
								<span className="font-bold">{aspect.relationCount}</span>
							</p>
						</div>
					) : (
						<></>
					);
				})}
				p
			</div>
			<Link to="/">
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
					Back to home
				</button>
			</Link>
		</div>
	) : (
		<></>
	);
};
export default ResultPage;
