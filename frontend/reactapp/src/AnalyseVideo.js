import { cardClasses } from "@mui/material";
import React, { useState, useEffect } from "react";
import {useAuthValue} from './AuthContext'
import './profile.css'
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey } from "@mui/material/colors";
import { applyActionCode } from "firebase/auth";




function AnalyseVideo() {
	const {currentUser} = useAuthValue()
	// object for storing and using data
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
		let str = currentUser?.email;

		function replace (){
			var string = "";
			var chart = "";
			for(let i=0; i < str.length; i++){  //fixed spelling from 'str.lenght'
				if (str.charAt(i) === "@"||str.charAt(i) === "." ) {
					chart = "";
					string = string + chart;
				}
				else {
					chart = str.charAt(i);
					string = string + chart;
				}
			}
			console.log(string);
			return string
			
		}
	/* function genData(str){
		fetch("/lol/"+str+"/"+currentUser?.email)
		genData1(str)
		} */
	
		var value;
		var outline;
		var cntt;
		
		function del(){
			document.getElementById('pps').style.visibility='hidden';
			document.getElementById('delete').style.visibility='hidden';
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
		var t0= "<p1>Pipeline     </p1>"

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
			document.getElementById('delete').style.visibility='visible';





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
		
		var t1="<div id='pps'><p1>Pipeline- 1</p1>";
		var t2="<div id='options'>"+value+"</div>";
		var t5="<button id='delete'>Delete</button><p id='demo'></p> </div>";


		// var a="<div className='pps'><h1>Pipelines </h1><div className=\"pps\">  <p1>Pipeline 1 </p1><div id='options'>Count Objects</div><button onClick={warning} id='ppsdel'>Delete</button><p id=\"demo\"></p> </div>";

		// var mydiv=document.getElementById('pp');
		// mydiv.innerHTML+= "<br></br>"+ t1+t2+t3+t4+t5;
		
		// document.getElementById('pp').insertAdjacentHTML('afterend', '<br></br>'+ t1+t2+t3+t4+t5);
		fetch("/ai/video/"+str+"/"+currentUser?.email+"/"+value+"/"+outline+"/"+cntt).then((res) =>
		res.json().then((data) => {
			// Setting a data from api
			setdata(data);
			//console.log(JSON.stringify(data.Message));
			const countt = JSON.stringify(data.Count);
			const mes = (JSON.stringify(data.Message));
			alert(countt);
	})
		);


	
	
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
		<button onClick={pipelineui}>Save</button>
	
	  </p> 

	
        
         
		  
		 


	
</div>
 <div id="pp"></div> 

 <div id="pps" >  
		  {/* <div id='options'>Car</div>
          <div id='options'>Count Objects</div>
		  <div id='options'>Track Objects</div> */}
          
           <p id="demo"></p>
          </div> <button id='delete' onClick={del}><DeleteIcon id='icon'/></button>





<h1>Analyse Media </h1>
	
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
						<img src={('https://choppercharlie.blob.core.windows.net/'+replace()+'/'+thedata)} width="90px" height="60px" alt="Logo"/> <br/>

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
