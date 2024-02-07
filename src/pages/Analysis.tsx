import analysisData from "../config/analysis.json";
import { useContext, useEffect, useState } from "react";

// import analysisTemplate from "../config/analysis.json";
import analysisTemplate from "../config/analysisV2.json";
import { AnalysisContext } from "../context/analysisContext";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
	const [activeQuestion, setActiveQuestion] = useState(0);
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
		setActiveQuestion(activeQuestion + 1);
	};

	const handlePreviousStep = () => {
		// TODO: undo relation count and restore deleted questions
		if (activeQuestion === 0) {
			return;
		}

		if (subtractFromRelationCount !== undefined) {
			subtractFromRelationCount(
				currentAnalysisTemplate[activeQuestion - 1].answers[
					answersGiven[answersGiven.length - 1]
				].relatedAspects
			);

			setAnswersGiven(answersGiven.slice(0, answersGiven.length - 1));
		}

		// restore deleted questions
		// TODO

		setActiveQuestion(activeQuestion - 1);
	};

	const handleSelectAnswer = (index: number) => {
		setAnswersGiven([...answersGiven, index]);
		if (
			currentAnalysisTemplate[activeQuestion].answers[index].relatedAspects !==
				undefined &&
			addToRelationCount !== undefined
		) {
			addToRelationCount(
				currentAnalysisTemplate[activeQuestion].answers[index].relatedAspects
			);
		}

		if (
			currentAnalysisTemplate[activeQuestion].answers[index]
				.deletesQuestions !== undefined
		) {
			const questionsToDelete =
				currentAnalysisTemplate[activeQuestion].answers[index].deletesQuestions;

			const newTemplate = currentAnalysisTemplate.filter((question) => {
				return !questionsToDelete.includes(question.id);
			});

			setCurrentAnalysisTemplate(newTemplate);
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
				{/* <p>
					You are{" "}
					{Math.round(
						((activeQuestion + 1) / (currentAnalysisTemplate.length + 1)) * 100
					)}{" "}
					% done
				</p> */}
				<progress
					className="w-full rounded-full bg-white"
					value={
						activeQuestion < currentAnalysisTemplate.length
							? activeQuestion + 1
							: currentAnalysisTemplate.length + 1
					}
					max={currentAnalysisTemplate.length + 1}
				></progress>
			</div>
			{activeQuestion === currentAnalysisTemplate.length ? (
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
						{/* {analysisData.categories[activeCategory].name} */}
						kategorie name
					</h1>
					<h2 className="text-lg font-bold">
						{currentAnalysisTemplate[activeQuestion].question}
					</h2>
					<div className="flex flex-col max-w-96 w-full mt-10 gap-y-6">
						{/* menu showing the selected questions and its possible answers */}
						{currentAnalysisTemplate[activeQuestion].answers.map(
							(step, index) => (
								<button
									key={index}
									onClick={() => handleSelectAnswer(index)}
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-4 px-4 rounded w-full"
								>
									{step.answer}
								</button>
							)
						)}
					</div>
				</>
			)}
			<div className="flex gap-x-10 mt-32">
				{activeQuestion > 0 && (
					<button onClick={handlePreviousStep}>Previous Step</button>
				)}
				{/* {activeQuestion < currentAnalysisTemplate.length && (
					<button onClick={handleNextStep}>Next Step</button>
				)} */}
			</div>
		</div>
	);
};

export default Analysis;
