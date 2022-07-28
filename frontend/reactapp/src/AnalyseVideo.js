import { cardClasses } from "@mui/material";
import React, { useState, useEffect } from "react";
import {useAuthValue} from './AuthContext'
import './profile.css'
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { grey } from "@mui/material/colors";
import { applyActionCode } from "firebase/auth";



function AnalyseVideo() {
	const {currentUser} = useAuthValue()
	// object for storing and using data
	const [data, setdata] = useState({
		
	});
	

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
		



		function selected(){
			
		}


		function pipelineui(){
			
			var select = document.getElementById('vehicle');
			value = select.options[select.selectedIndex].value;
			// var t = window.confirm(value);
	
			var ol = document.querySelector('#outline').checked;
			var countt= document.querySelector('#cnt').checked;
	
			if (ol===true){
				// outline="y"
				var t3="<div id='options'>Track Objects</div>";
			}
			else{
				// outline="n"
				var t3="";
				
			}
	
			if (countt===true){
				// cntt="y"
				var t4=" <div id='options'>Count Objects</div>";
			}
			else{
				// cntt="n"
				var t4="";
			}
	
			// var t = window.confirm(value+"   "+ol+"  " +countt);
			
			var t1="<div id='pps'><p1>Pipeline- 1</p1>";
			var t2="<div id='options'>"+value+"</div>";
			var t5="<button id='delete'>Delete</button><p id='demo'></p><button id='edit' onClick={selected}>Select</button></div>";
	
	
			// var a="<div className='pps'><h1>Pipelines </h1><div className=\"pps\">  <p1>Pipeline 1 </p1><div id='options'>Count Objects</div><button onClick={warning} id='ppsdel'>Delete</button><p id=\"demo\"></p> </div>";
	
			// var mydiv=document.getElementById('pp');
			// mydiv.innerHTML+= "<br></br>"+ t1+t2+t3+t4+t5;
			
			document.getElementById('pp').insertAdjacentHTML('afterend', '<br></br>'+ t1+t2+t3+t4+t5);	
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

		var t = window.confirm(value+"   "+ol+"  " +countt);
		
		var t1="<div id='pps'><p1>Pipeline- 1</p1>";
		var t2="<div id='options'>"+value+"</div>";
		var t5="<button id='delete'>Delete</button><p id='demo'></p> </div>";


		// var a="<div className='pps'><h1>Pipelines </h1><div className=\"pps\">  <p1>Pipeline 1 </p1><div id='options'>Count Objects</div><button onClick={warning} id='ppsdel'>Delete</button><p id=\"demo\"></p> </div>";

		// var mydiv=document.getElementById('pp');
		// mydiv.innerHTML+= "<br></br>"+ t1+t2+t3+t4+t5;
		
		// document.getElementById('pp').insertAdjacentHTML('afterend', '<br></br>'+ t1+t2+t3+t4+t5);
		fetch("/ai/video/"+str+"/"+currentUser?.email+"/"+value+"/"+outline+"/"+cntt)

	
	
	}	
	


	return (
		
		
    
		 <div   >    
 
<div><a   href="/"><button type='button' id='back'>Back</button></a></div>
<h1>Pipelines</h1>
<div className='Pipelineform'>
    <p> Analyse :  <span></span>  <span></span> 
	<select id="vehicle">
        <option value="car">Cars</option>
        <option value="bus">Buses</option>
        <option value="truck">Trucks</option>
        <option value="motorbike">Motorbikes</option>
    
      </select>

	  
		<span></span>
		<span></span>
		<input type="checkbox" id="outline" name="outline" value="y"></input>
		<label for="outline"> Track Object</label>
		<input type="checkbox" id="cnt" name="count" value="y"></input>
		<label for="count"> Count Objects</label> <span></span>
		<button onClick={pipelineui}> Create</button>
	
	  </p> 

	
        
         
		  
		 


	
</div>
 <div id="pp"></div> 

{/* <div className="pps" >  
          <p1>Pipeline- 1 </p1>
		  <div id='options'>Car</div>
          <div id='options'>Count Objects</div>
		  <div id='options'>Track Objects</div>
          <button id='delete'>Delete</button>
          <p id="demo"></p> 
          </div> */}





<h1>Analyse Video </h1>
	
			 {(typeof data.mydata === 'undefined')?(
				//  <p>Loading...</p>

				<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
			 ) : (
				 data.mydata.map((thedata, i)=>(
					 
					// <center><br></br><div><button   type="button" onClick={()=>genData(thedata)}   style={{height: "50px", width: "200px"}} key={i}  >{thedata}</button></div></center>



					<div className='Vd'>
        
      					  <center>
			
					<div className='Vids'>
					<div className='tx'>
						<p2>{thedata}<br/>
						<hr/>
						<img src={require('./play.png')} width="90px" height="60px" alt="Logo"/> <br/>

						<button id="analyse"  type="button" onClick={()=>pipeline(thedata)}  key={i}  ><AnalyticsIcon sx={{ fontSize: 20}}/></button>
						
						</p2>
						</div>
						</div>
						
						</center> 

         			</div>
					
					






					
				 ))
			 )
			 }
				

		</div>
	);
}

export default AnalyseVideo;
