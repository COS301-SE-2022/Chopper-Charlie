import { createSelector } from 'reselect';

const selectPipelinesReducer = (state) => state.pipelines;


export const selectPipelines = createSelector(
	[selectPipelinesReducer],
	(pipelinesSlice) => pipelinesSlice.pipelines
);
