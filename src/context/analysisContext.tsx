import * as React from "react";
import { AnalysisState } from "../types/AnalysisState";

export const AnalysisContext = React.createContext<{
	analysis: AnalysisState;
	setAnalysis: React.Dispatch<React.SetStateAction<AnalysisState>>;
	initializeAnalysis: () => void;

	undoLastRelationCount: (aspectIds: string[]) => void;
	addToRelationCount: (aspectIds: string[], canAddNewAspect?: boolean) => void;
} | null>(null);

const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [analysis, setAnalysis] = React.useState<AnalysisState>({
		started: false,
		finished: false,
		aspects: [],
	});

	const addToRelationCount = (aspectIds: string[]) => {
		const newAnalysis = { ...analysis };

		aspectIds.forEach((aspectId) => {
			const aspectIndex = newAnalysis.aspects.findIndex(
				(aspect) => aspect.id === aspectId
			);

			if (aspectIndex !== -1) {
				newAnalysis.aspects[aspectIndex].relationCount++;
			}
		});

		setAnalysis(newAnalysis);
	};

	const undoLastRelationCount = (aspectIds: string[]) => {
		const newAnalysis = { ...analysis };

		aspectIds.forEach((aspectId) => {
			const aspectIndex = newAnalysis.aspects.findIndex(
				(aspect) => aspect.id === aspectId
			);

			if (
				aspectIndex !== -1 &&
				newAnalysis.aspects[aspectIndex].relationCount > 0
			) {
				newAnalysis.aspects[aspectIndex].relationCount--;
			}
		});

		setAnalysis(newAnalysis);
	};

	const initializeAnalysis = () => {
		setAnalysis({
			started: true,
			finished: false,
			aspects: [
				{
					id: "aspect_1",
					relationCount: 0,
				},
				{
					id: "aspect_2",
					relationCount: 0,
				},
				{
					id: "aspect_3",
					relationCount: 0,
				},
				{
					id: "aspect_4",
					relationCount: 0,
				},
			],
		});
	};

	return (
		<AnalysisContext.Provider
			value={{
				analysis,
				setAnalysis,
				undoLastRelationCount,
				initializeAnalysis,
				addToRelationCount,
			}}
		>
			{children}
		</AnalysisContext.Provider>
	);
};

export default AnalysisProvider;
