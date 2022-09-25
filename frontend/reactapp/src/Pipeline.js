import './profile.css'
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from './firebase'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import React, { useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import PipelineForm from './pipeline-form.component';
import PipelineItem from './pipeline-item.component';
import { useSelector } from 'react-redux';
import { selectPipelines } from './store/pipelines/pipelines.selector';
import TuneIcon from '@mui/icons-material/Tune';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SideBar from './components/sidebar/sidebar.component';
// import Drawer from '../../components/drawer/drawer.component';
// import './analytics.styles.css';
//change
function Profile() {
  
	const [color, changeColor] = useState("#242424");

	document.body.style.backgroundColor = color;



  const {currentUser} = useAuthValue()


	
	const [data, setdata] = useState({
		
	});
	

// The array for pipelines
const pipelines = useSelector(selectPipelines);

	
	// console.log("sksks",pipelines)
	
	// Using useEffect for single rendering
	
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		
		// fetch("/mydatapage/"+currentUser?.email).then((res) =>
		// 	res.json().then((data) => {
		// 		// Setting a data from api
		// 		setdata(data);
        //         // console.log(data);

		// 	})
		// );
		
	
	


  return (
   
      <div className='center'>

    
     <h2 id='pipelineHeading'>Your Pipelines</h2>


	 <div className='analytics-container'>

			<br />
			<PipelineForm />
			<br />
			<div>
				{pipelines.map((pipelineItem) => {
					return (
						<PipelineItem
							key={pipelineItem.title}
							pipelineItem={pipelineItem}
						/>
					);
				})}
			</div>
		</div>















  
{/* <div className='Pipelineform'>
    <p> <input type="text" id="pipelineName"  placeholder="Pipeline Name" ></input>  <span></span> 
	<select id="vehicle">
        <option id="optionss" value="car">Cars</option>
        <option id="optionss" value="bus">Buses</option>
        <option id="optionss" value="truck">Trucks</option>
        <option id="optionss" value="motorbike">Motorbikes</option>
    
      </select>
	
	  
		<span></span>
		<span></span>
		 
		 &nbsp;&nbsp;&nbsp;&nbsp;
		 <label for="outline"> Track Object</label>&nbsp;&nbsp;
		
		 <label class="switch"><input type="checkbox" id="outline"  value="y" ></input><span class="slider round"></span></label>
		

		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<label for="count"> Count Objects</label> <span></span>
		<label class="switch"><input type="checkbox" id="cnt" value="y"></input><span class="slider round"></span></label>

		
		<button  id='CreateButton'  onClick={pipelineui}>Create</button>
	
	  </p> 

	
        
         
		  
		 


	
</div>
 <div id="pp"></div> 

 <div id="pps" >  
           <p id="demo"></p>
		   <br></br>
           </div><button id='deletepipeline' onClick={del}>Delete</button> */}






		<SideBar/>


		</div>



     
  )
}

export default Profile