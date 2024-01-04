import analysisData from "../config/analysis.json";
import { useContext, useEffect, useState } from "react";

import analysisTemplate from "../config/analysis.json";
import { AnalysisContext } from "../context/analysisContext";
import { Link, useNavigate } from "react-router-dom";

const getCurrentStepInTotal = (activeCategory: number, activeStep: number) => {
	return (
		analysisTemplate.categories
			.slice(0, activeCategory)
			.reduce(
				(accumulator, currentValue) => accumulator + currentValue.steps.length,
				0
			) + activeStep
	);
};

const getTotalSteps = () => {
	return analysisTemplate.categories.reduce(
		(accumulator, currentValue) => accumulator + currentValue.steps.length,
		0
	);
};

const Analysis = () => {
	const [activeCategory, setActiveCategory] = useState(0);
	const [activeStep, setActiveStep] = useState(0);
	const navigate = useNavigate();

	const { analysis, setAnalysis, initializeAnalysis, addToRelationCount } =
		useContext(AnalysisContext) || {};

	const handleNextStep = () => {
		if (activeStep < analysisData.categories[activeCategory].steps.length - 1) {
			setActiveStep(activeStep + 1);
		} else {
			setActiveCategory(activeCategory + 1);
			setActiveStep(0);
		}
	};

	const handlePreviousStep = () => {
		let nextStep = activeStep - 1;
		let nextCategory = activeCategory;

		if (nextStep < 0 && nextCategory > 0) {
			nextCategory--;
			nextStep = analysisData.categories[nextCategory].steps.length - 1;
		}

		// set to previous relation count
		// need history of relation counts for this

		setActiveCategory(nextCategory);
		setActiveStep(nextStep);
	};

	const handleSelectAnswer = (index: number) => {
		if (
			analysisData.categories[activeCategory].steps[activeStep].answers[index]
				.relatedAspects !== undefined &&
			addToRelationCount !== undefined
		) {
			addToRelationCount(
				analysisData.categories[activeCategory].steps[activeStep].answers[index]
					.relatedAspects!
			);
		}

		handleNextStep();
	};

	const finishAnalysis = () => {
		if (setAnalysis === undefined || analysis === undefined) {
			return;
		}

		setAnalysis({
			...analysis,
			finished: true,
		});

		// redirect to result page
		navigate("/result");
	};

	useEffect(() => {
		initializeAnalysis && !analysis?.started && initializeAnalysis();
	}, [initializeAnalysis, analysis?.started]);

	return (
		<div className="bg-gray flex flex-col justify-center items-center w-screen h-screen">
			<div className="flex flex-col w-full max-w-96 mx-auto mb-10">
				<p>
					Step: {getCurrentStepInTotal(activeCategory, activeStep) + 1} /{" "}
					{getTotalSteps() + 1}
				</p>
				<progress
					className="w-full rounded-full bg-white"
					value={getCurrentStepInTotal(activeCategory, activeStep) + 1}
					max={getTotalSteps() + 1}
				></progress>
			</div>
			{activeCategory === analysisData.categories.length ? (
				<div className="flex flex-col w-96 mt-10 gap-y-6">
					<p>
						You have finished the analysis. Click the button below to see the
						result. You will be presented with a list of accessibility
						requirements that are relevant to your project. The list is sorted
						based on your answers to the questions. The most relevant
						requirements to implement are at the top.
					</p>
					<button
						onClick={() => finishAnalysis()}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded w-full"
					>
						Calculate result
					</button>
				</div>
			) : (
				<>
					<h1 className="text-3xl font-bold">
						{analysisData.categories[activeCategory].name}
					</h1>
					<h2 className="text-lg font-bold">
						{analysisData.categories[activeCategory].steps[activeStep].question}
					</h2>
					<div className="flex flex-col max-w-96 w-full mt-10 gap-y-6">
						{/* menu showing the selected questions and its possible answers */}
						{analysisData.categories[activeCategory].steps[
							activeStep
						].answers.map((step, index) => (
							<button
								key={index}
								onClick={() => handleSelectAnswer(index)}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-4 px-4 rounded w-full"
							>
								{step.answer}
							</button>
						))}
					</div>
				</>
			)}
			<div className="flex gap-x-10 mt-32">
				{(activeStep > 0 || activeCategory > 0) && (
					<button onClick={handlePreviousStep}>Previous Step</button>
				)}
				{activeCategory < analysisData.categories.length && (
					<button onClick={handleNextStep}>Next Step</button>
				)}
			</div>
		</div>
	);
};

export default Analysis;
