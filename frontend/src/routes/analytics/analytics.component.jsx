import PipelineForm from '../../components/pipeline-form/pipeline-form.component';
import PipelineItem from '../../components/pipeline-item/pipeline-item.component';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectPipelines } from '../../store/pipelines/pipelines.selector';
import Drawer from '../../components/drawer/drawer.component';
import './analytics.styles.css';

const Analytics = () => {
	const pipelines = useSelector(selectPipelines);
	return (
		<div className='analytics-container'>
			<h1>Your Pipelines</h1>
			<br />
			<PipelineForm />
			<br />
			<div>
				{pipelines.map((pipelineItem) => {
					return (
						<pipelineItem
							key={pipelineItem.title}
							pipelineItem={pipelineItem}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Analytics;
