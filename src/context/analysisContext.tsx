import * as React from "react";
import { AnalysisState } from "../types/AnalysisState";

import allAccessibilityAspects from "../config/accessibility_aspects.json";

export const AnalysisContext = React.createContext<{
	analysis: AnalysisState;
	setAnalysis: React.Dispatch<React.SetStateAction<AnalysisState>>;
	initializeAnalysis: () => void;

	subtractFromRelationCount: (aspectIds: string[]) => void;
	addToRelationCount: (aspectIds: string[]) => void;
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

	const subtractFromRelationCount = (aspectIds: string[]) => {
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
			aspects: allAccessibilityAspects.map((aspect) => ({
				id: aspect.id,
				relationCount: 0,
			})),
		});
	};

	return (
		<AnalysisContext.Provider
			value={{
				analysis,
				setAnalysis,
				subtractFromRelationCount,
				initializeAnalysis,
				addToRelationCount,
			}}
		>
			{children}
		</AnalysisContext.Provider>
	);
};

export default AnalysisProvider;
