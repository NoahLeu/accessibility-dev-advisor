export type AnalysisState = {
	started: boolean;
	finished: boolean;
	aspects: Aspect[];
};

export type Aspect = {
	id: string;
	relationCount: number;
};
