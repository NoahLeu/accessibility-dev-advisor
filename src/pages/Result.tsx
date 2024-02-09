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
			className="bg-background flex flex-col justify-center items-center w-screen min-h-screen py-32"
			style={{ overflow: "scroll" }}
		>
			<h1 className="text-4xl font-bold text-primary mb-4">Result</h1>
			<p
				className="w-full max-w-3xl mb-8
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
					if (aspect.relationCount === 0) return null;

					let specificAspect = accessibilityAspects.find(
						(a) => a.id === aspect.id
					);

					// TODO: show aspects with 0 points as separate list

					return (
						specificAspect && (
							<div
								key={aspect.id}
								className="w-full flex p-4 max-w-3xl mx-auto bg-backgroundLight shadow-md rounded-lg"
							>
								<div className="rounded-full bg-primary text-white text-2xl aspect-square h-12 w-12 font-bold flex justify-center items-center mr-4">
									{index + 1}
								</div>

								<div className="flex flex-col grow relative">
									<h2 className="text-xl font-bold">{specificAspect.name}</h2>
									<p>{specificAspect.description}</p>
									{specificAspect.additionalRequirements?.length > 0 && (
										<>
											<p className="mt-4 mb-2">Specific requirements:</p>
											<ul className="list-disc pl-4">
												{specificAspect.additionalRequirements?.map(
													(req, index) => (
														<li key={index} className="mb-2">
															{req}
														</li>
													)
												)}
											</ul>
										</>
									)}
									<details className="mt-4">
										<summary className="text-primary font-bold">
											Sources and more information
										</summary>
										<div className="flex-col gap-x-4 text-black1">
											{specificAspect.sources.wcag?.length > 0 && (
												<div className="w-full flex justify-start">
													<p className="font-bold mr-4 w-20 flex flex-wrap">
														WCAG:
													</p>
													<div className="flex flex-col gap-y-2">
														{specificAspect.sources.wcag.map((source) => (
															<Link
																className="underline text-secondary"
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
											)}
										</div>
										<div className="flex-col gap-x-4 text-black1">
											{specificAspect.sources.atag?.length > 0 && (
												<div className="w-full flex justify-start">
													<p className="font-bold mr-4 w-20 flex flex-wrap">
														ATAG:
													</p>
													<div className="flex flex-col gap-y-2">
														{specificAspect.sources.atag.map((source) => (
															<Link
																className="underline text-secondary"
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
											)}
										</div>
										<div className="flex-col gap-x-4 text-black1">
											{specificAspect.sources.uaag?.length > 0 && (
												<div className="w-full flex justify-start">
													<p className="font-bold mr-4 w-20 flex flex-wrap">
														UAAG:
													</p>
													<div className="flex flex-col gap-y-2">
														{specificAspect.sources.uaag.map((source) => (
															<Link
																className="underline text-secondary"
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
											)}
										</div>
										<div className="flex-col gap-x-4 text-black1">
											{specificAspect.sources.apple?.length > 0 && (
												<div className="w-full flex justify-start">
													<p className="font-bold mr-4 w-20 flex flex-wrap">
														Apple's guidelines:
													</p>
													<div className="flex flex-col gap-y-2">
														{specificAspect.sources.apple.map((source) => (
															<Link
																className="underline text-secondary"
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
											)}
										</div>
									</details>
								</div>
								{/* <p className="w-32 text-end">
									Points:{" "}
									<span className="font-bold">{aspect.relationCount}</span>
								</p> */}
							</div>
						)
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
