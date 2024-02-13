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
			<h1 className="text-4xl font-bold text-primary mb-4 max-w-3xl w-full">
				Accessibility Analysis Results
			</h1>
			<p
				className="w-full max-w-3xl mb-8
			"
			>
				<b>Note:</b> This list may not be complete due the software being a
				prototype.
				<br />
				Please note that aspects mentioned at the bottom of the list are not by
				definition less important. They are however less frequently required to
				be examined in the context of the answers you have provided.
			</p>
			<div className="w-full flex flex-col gap-y-4">
				{orderAspects(analysis.aspects).map((aspect, index) => {
					if (aspect.relationCount === 0) return null;

					let specificAspect = accessibilityAspects.find(
						(a) => a.id === aspect.id
					);

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
										<div className="flex-col gap-x-4">
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
										<div className="flex-col gap-x-4">
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
										<div className="flex-col gap-x-4">
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
										<div className="flex-col gap-x-4">
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
										<div className="flex-col gap-x-4">
											{specificAspect.sources.custom && (
												<p>{specificAspect.sources.custom}</p>
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
				<button className="bg-primary hover:bg-primary/70 text-white font-bold py-2 px-4 rounded mt-8">
					Back to home
				</button>
			</Link>
		</div>
	) : (
		<></>
	);
};
export default ResultPage;
