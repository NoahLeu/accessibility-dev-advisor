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
			className="bg-gray flex flex-col justify-center items-center w-screen min-h-screen py-32"
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
				<br />
				<br />
				This list is not complete and the software is a prototype and proof of
				concept. The list is based on the WCAG 2.2, ATAG 2.0, UAAG 2.0, and
				Apple's accessibility guidelines.
				<br />
				Please note that aspects mentioned at the bottom of the list are not
				less important. They are just less relevant to the questions you have
				answered. The list is not a complete list of all accessibility aspects.
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
										<Link
											key={source}
											to={source}
											target="_blank"
											rel="noreferrer"
										>
											{source}
										</Link>
									))}
								</div>
							</div>

							<p className="w-32 text-end">
								Points:{" "}
								<span className="font-bold">{aspect.relationCount}</span>
							</p>
						</div>
					) : (
						<></>
					);
				})}
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
