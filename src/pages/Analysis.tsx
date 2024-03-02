import { useContext, useEffect, useState } from "react";
import analysisTemplate from "../config/analysis.json";
import { AnalysisContext } from "../context/analysisContext";
import { useNavigate } from "react-router-dom";
import InformationModal from "../components/InformationModal";

const getAnalysisLength = () => {
	let length = 0;
	analysisTemplate.forEach((category) => {
		length += category.questions.length;
	});
	return length;
};

const getCurrentStepOfTotal = (
	activeQuestion: number,
	activeCategory: number
) => {
	let currentStep = 0;
	for (let i = 0; i < activeCategory; i++) {
		currentStep += analysisTemplate[i].questions.length;
	}
	currentStep += activeQuestion + 1;
	return currentStep;
};

const Analysis = () => {
	const [activeCategory, setActiveCategory] = useState(0);
	const [activeQuestion, setActiveQuestion] = useState(0);
	const [done, setDone] = useState(false);

	const [currentAnalysisTemplate, setCurrentAnalysisTemplate] =
		useState(analysisTemplate);
	const [answersGiven, setAnswersGiven] = useState<number[]>([]);
	const navigate = useNavigate();

	const {
		analysis,
		setAnalysis,
		initializeAnalysis,
		addToRelationCount,
		subtractFromRelationCount,
	} = useContext(AnalysisContext) || {};

	const handleNextStep = () => {
		if (
			activeQuestion ===
				currentAnalysisTemplate[activeCategory].questions.length - 1 &&
			activeCategory === currentAnalysisTemplate.length - 1
		) {
			setDone(true);
			return;
		}

		if (
			activeQuestion <
			currentAnalysisTemplate[activeCategory].questions.length - 1
		) {
			setActiveQuestion(activeQuestion + 1);
			return;
		}

		if (
			activeQuestion ===
				currentAnalysisTemplate[activeCategory].questions.length - 1 &&
			activeCategory < currentAnalysisTemplate.length - 1
		) {
			setActiveQuestion(0);
			setActiveCategory(activeCategory + 1);
			return;
		}
	};

	const handleSelectAnswer = (index: number) => {
		setAnswersGiven([...answersGiven, index]);
		if (
			currentAnalysisTemplate[activeCategory].questions[activeQuestion].answers[
				index
			].relatedAspects !== undefined &&
			addToRelationCount !== undefined
		) {
			addToRelationCount(
				currentAnalysisTemplate[activeCategory].questions[activeQuestion]
					.answers[index].relatedAspects
			);
		}

		handleNextStep();
	};

	const analysisLength = getAnalysisLength();
	const currentAnalysisStep = getCurrentStepOfTotal(
		activeQuestion,
		activeCategory
	);

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
		<div className="bg-background flex flex-col justify-center items-center w-screen h-screen">
			<InformationModal initialShowModal />

			<div className="flex flex-col w-full max-w-96 mx-auto mb-10">
				<progress
					className="w-full rounded-full bg-backgroundLight text-primary"
					value={done ? analysisLength + 1 : currentAnalysisStep}
					max={analysisLength + 1}
				></progress>
			</div>
			{done ? (
				<div className="flex flex-col items-center justify-center p-10 rounded-lg bg-backgroundLight w-96 mt-10 gap-y-6">
					<p>
						You have finished the analysis. Click the button below to see the
						result. You will be presented with a list of accessibility
						requirements and considerations that are relevant to your project.
						The list is sorted based on your answers to the questions. The most
						relevant requirements to consider are at the top.
					</p>
					<button
						onClick={() => finishAnalysis()}
						className="bg-primary hover:bg-primary/70 text-white font-bold py-4 px-4 rounded w-full"
					>
						Calculate result
					</button>
				</div>
			) : (
				<div className="w-fit flex flex-col items-center justify-center p-10 rounded-lg bg-backgroundLight">
					<h1 className="text-4xl font-bold mb-2">
						{currentAnalysisTemplate[activeCategory].categoryName}
					</h1>
					<h2 className="text-lg font-bold">
						{
							currentAnalysisTemplate[activeCategory].questions[activeQuestion]
								.question
						}
					</h2>
					<div className="flex flex-col max-w-96 w-full mt-10 gap-y-6">
						{/* menu showing the selected questions and its possible answers */}
						{currentAnalysisTemplate[activeCategory].questions[
							activeQuestion
						].answers.map((step, index) => (
							<button
								key={index}
								onClick={() => handleSelectAnswer(index)}
								className="bg-primary hover:bg-primary/70 text-white font-bold text-lg py-4 px-4 rounded w-full"
							>
								{step.answerText}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Analysis;
