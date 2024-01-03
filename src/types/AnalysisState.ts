export type AnalysisState = {
	finished: boolean;
	aspects: Aspect[];
};

export type Aspect = {
	id: string;
	relationCount: number;
};
