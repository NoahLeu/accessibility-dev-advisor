import { Aspect } from "../types/AnalysisState";

export const orderAspects = (aspects: Aspect[]): Aspect[] => {
	return aspects.sort((a, b) => {
		return b.relationCount - a.relationCount;
	});
};
