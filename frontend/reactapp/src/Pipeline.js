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
import { useSelector } from 'react-redux';
import { selectPipelines } from './store/pipelines/pipelines.selector';
import PipelineForm from './pipeline-form.component';
import PipelineItem from './pipeline-item.component';
//change
function Profile() {
  


  const {currentUser} = useAuthValue()


	
	const [data, setdata] = useState({
		
	});
	

// The array for pipelines
	const pipelines = useSelector(selectPipelines);

	
	console.log("sksks",pipelines)
	// Using useEffect for single rendering
	
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		
		fetch("/mydatapage/"+currentUser?.email).then((res) =>
			res.json().then((data) => {
				// Setting a data from api
				setdata(data);
                console.log(data);

			})
		);
		
	/* function genData(str){
		fetch("/lol/"+str+"/"+currentUser?.email)
		genData1(str)
		} */
	
		var value;
		var outline;
		var cntt;
		
		function del(){
			document.getElementById('pps').style.visibility='hidden';
			document.getElementById('deletepipeline').style.visibility='hidden';
		}


		function selected(){
			var t = window.confirm("lol");
		}


		function pipelineui(){


		var select = document.getElementById('vehicle');
		value = select.options[select.selectedIndex].value;
		// var t = window.confirm(value);

		var ol = document.querySelector('#outline').checked;
        var countt= document.querySelector('#cnt').checked;
		var pName= document.getElementById('pipelineName').value;
		var n= pName.length;
		if (n<26) {

		var t0= "<h4>"+pName+"</h4>"

		var t1="<div id='options'>"+value+"</div>";
		if (ol===true){
			outline="y"
			var t2="<div id='options'>Track Objects</div>";
		}
		else{
			outline="n"
			var t2="";
			
		}

		if (countt===true){
			cntt="y"
			var t3=" <div id='options'>Count Objects</div>";
		}
		else{
			cntt="n"
			var t3="";
		}

		
			
			document.getElementById('pps').innerHTML=t0+t1+t2+t3;
			var a = document.getElementById('pps');
			a.style.visibility='visible';
			document.getElementById('deletepipeline').style.visibility='visible';

		}
		else {
			window.alert("Please choose a pipeline name with 25 or less characters.");
		}



		}

		
	
	function pipeline(str){
		var select = document.getElementById('vehicle');
		value = select.options[select.selectedIndex].value;
		// var t = window.confirm(value);

		var ol = document.querySelector('#outline').checked;
        var countt= document.querySelector('#cnt').checked;

		if (ol===true){
			outline="y"
			var t3="<div id='options'>Track Objects</div>";
		}
		else{
			outline="n"
			var t3="";
			
		}

		if (countt===true){
			cntt="y"
			var t4=" <div id='options'>Count Objects</div>";
		}
		else{
			cntt="n"
			var t4="";
		}

		// var t = window.confirm(value+"   "+ol+"  " +countt);
		
		var t1="<div id='pps'><h4>Pipeline- 1</h4>";
		var t2="<div id='options'>"+value+"</div>";
		var t5="<button id='delete'>Delete</button><p id='demo'></p> </div>";


		// var a="<div className='pps'><h1>Pipelines </h1><div className=\"pps\">  <h4>Pipeline 1 </h4><div id='options'>Count Objects</div><button onClick={warning} id='ppsdel'>Delete</button><p id=\"demo\"></p> </div>";

		// var mydiv=document.getElementById('pp');
		// mydiv.innerHTML+= "<br></br>"+ t1+t2+t3+t4+t5;
		
		// document.getElementById('pp').insertAdjacentHTML('afterend', '<br></br>'+ t1+t2+t3+t4+t5);
		fetch("/ai/video/"+str+"/"+currentUser?.email+"/"+value+"/"+outline+"/"+cntt)

	
	
	}	
	


  return (
   
      <div className='center'>

    
     <h2>Pipelines</h2>
     <hr></hr>

	 <div className='analytics-container'>
			<h1>Your Pipelines</h1>
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








		   <div className='profile'>

<img src={require('./logo.png')} width="80%" height="17%" alt="Logo"/>
	   
 
  
  <br/>
  <AccountCircleRoundedIcon sx={{ fontSize: 45 }}/>
  
  <br/>
  <h4 id="user-id"><strong> </strong>{currentUser?.email}</h4>
  <br/>
  <hr/>
  <br/>
  
  <div>
  <a id='pagelinks' href="/home"><button type='button' id='home'><HomeRoundedIcon id='icon'/><p>Home</p></button></a>
   
   <a id='pagelinks' href="/pipeline"><button type='button' id='home'><FiberManualRecordIcon id='icon'/><p>Pipelines</p></button></a>
   <a id='pagelinks' href="/settings"><button type='button' id='home'><SettingsRoundedIcon id='icon'/><p>Settings</p></button></a>
   <br/>
  
   </div>
   
  <hr/>

  <br/>
			
  <a href="/login" ><button type='button' id='homelogout'  onClick={() => signOut(auth)}   ><LogoutRoundedIcon id='iconlo'/><p>Logout</p></button></a>
 
  
<div className='sub_div'> <img id='ABlogo'  src={require('./AB.png')} width="35%" height="40%" alt="Logo"/></div> 

</div>






      </div>
      



     
  )
}

export default Profile