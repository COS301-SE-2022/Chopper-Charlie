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

//change
function Profile() {
  
  const {currentUser} = useAuthValue()


	
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
		fetch("/ai/video/"+str+"/"+currentUser?.email+"/"+value+"/"+outline+"/"+cntt)

	
	
	}	
	


  return (
   
      <div className='center'>
<div id="HomeContent">
    
     <h2>Pipelines</h2>
     <hr></hr>

  
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
		 {/* // */}
		 &nbsp;&nbsp;&nbsp;&nbsp;
		 <label for="outline"> Track Object</label>&nbsp;&nbsp;
		
		 <label class="switch"><input type="checkbox" id="outline"  value="y" ></input><span class="slider round"></span></label>
		{/* // */}

		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		{/* <input type="checkbox" id="outline" name="outline" value="y"></input> */}
		<label for="count"> Count Objects</label> <span></span>
		{/* <input type="checkbox" id="cnt" name="count" value="y"></input> */}
		<label class="switch"><input type="checkbox" id="cnt" value="y"></input><span class="slider round"></span></label>

		
		<button  id='CreateButton'  onClick={pipelineui}>Create</button>
	
	  </p> 

	
        
         
		  
		 


	
</div>
 <div id="pp"></div> 

 <div id="pps" >  
		  {/* <div id='options'>Car</div>
          <div id='options'>Count Objects</div>
		  <div id='options'>Track Objects</div> */}
          
           <p id="demo"></p>
          </div> <button id='delete' onClick={del}><DeleteIcon id='icon'/></button>








         
      <div className='profile'>

<img src={require('./logo.png')} width="80%" height="20%" alt="Logo"/>
       
  <h1>    </h1>
  
  
  <AccountCircleRoundedIcon sx={{ fontSize: 45 }}/>
  
  <br/>
  <p1 id="user-id"><strong> </strong>{currentUser?.email}</p1>
  <br/>
  <hr/>
  <br/>

  <div>
   <button type='button' id='home'><HomeRoundedIcon id='icon'/><p3>Home</p3></button>
   
   <a id='pagelinks' href="/pipeline"><button type='button' id='home'><FiberManualRecordIcon id='icon'/><p3>Pipelines</p3></button></a>
   <a id='pagelinks' href="/settings"><button type='button' id='home'><SettingsRoundedIcon id='icon'/><p3>Settings</p3></button></a>
   
   </div>
   
   <br/>
  <hr/>

<br/>
            
  <a href="/login" ><button type='button' id='homelogout'  onClick={() => signOut(auth)}   ><LogoutRoundedIcon id='iconlo'/><p3>Logout</p3></button></a>
 
  
<div className='sub_div'> <img id='ABlogo'  src={require('./AB.png')} width="35%" height="40%" alt="Logo"/></div> 

</div>



</div>


      </div>
      



     
  )
}

export default Profile