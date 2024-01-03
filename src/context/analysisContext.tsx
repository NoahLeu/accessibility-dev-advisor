import * as React from "react";
import { AnalysisState } from "../types/AnalysisState";

export const AnalysisContext = React.createContext<{
	analysis: AnalysisState;
	setAnalysis: React.Dispatch<React.SetStateAction<AnalysisState>>;
	addToRelationCount: (aspectIds: string[], canAddNewAspect?: boolean) => void;
} | null>(null);

const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [analysis, setAnalysis] = React.useState<AnalysisState>({
		finished: false,
		aspects: [
			// {
			// 	id: "aspect_1",
			// 	relationCount: 0,
			// },
			// {
			// 	id: "aspect_2",
			// 	relationCount: 0,
			// },
			// {
			// 	id: "aspect_3",
			// 	relationCount: 0,
			// },
			// {
			// 	id: "aspect_4",
			// 	relationCount: 0,
			// },
		],
	});

	const addToRelationCount = (
		aspectIds: string[],
		canAddNewAspect: boolean = false
	) => {
		const newAnalysis = { ...analysis };

		aspectIds.forEach((aspectId) => {
			const aspectIndex = newAnalysis.aspects.findIndex(
				(aspect) => aspect.id === aspectId
			);

			if (aspectIndex !== -1) {
				newAnalysis.aspects[aspectIndex].relationCount++;
			} else {
				newAnalysis.aspects.push({
					id: aspectId,
					relationCount: 1,
				});
			}
		});

		setAnalysis(newAnalysis);
	};

	return (
		<AnalysisContext.Provider
			value={{ analysis, setAnalysis, addToRelationCount }}
		>
			{children}
		</AnalysisContext.Provider>
	);
};

export default AnalysisProvider;
