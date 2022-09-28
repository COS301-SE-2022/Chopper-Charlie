import { createAction } from '../../utils/reducer/reducer.utils';
import { PIPELINES_ACTION_TYPES } from './pipelines.types';
import { setPipelines } from "../../firebase.js";


export const setPipelinesArray = (pipelineArray) =>
	createAction(PIPELINES_ACTION_TYPES.SET_PIPELINES, pipelineArray);

const removePipeline = (pipelines, pipelineToRemove) => {
	return pipelines.filter(
		(pipeline) => pipeline.title !== pipelineToRemove.title
	);
};

const addPipeline = (pipelines, pipelineToAdd) => {
	return [...pipelines, pipelineToAdd];
};

export const removeItemFromPipelines = (pipelines, pipelineToRemove, currentUser) => {
	const newPipelinesItems = removePipeline(pipelines, pipelineToRemove);
	setPipelines(newPipelinesItems, currentUser);
	return createAction(PIPELINES_ACTION_TYPES.SET_PIPELINES, newPipelinesItems);
};

export const addItemToPipelines = (pipelines, pipelineToAdd, currentUser) => {
	const newPipelinesItems = addPipeline(pipelines, pipelineToAdd);
	setPipelines(newPipelinesItems, currentUser);
	return createAction(PIPELINES_ACTION_TYPES.SET_PIPELINES, newPipelinesItems);
};