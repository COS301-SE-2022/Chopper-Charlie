import './profile.css'
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from './firebase'


//change
function Profile() {
  
  const {currentUser} = useAuthValue()

  return (
   
      <div className='center'>

         
        <div className='profile'>
        <img src={require('./logo.png')} width="45%" height="15%" alt="Logo"/>
               
          <h1>    </h1>
          
          <img id='pp'  src={require('./j.png')} width="27%" height="12%" alt="profile"/>
          <p><strong> </strong>{currentUser?.email}</p>

          <hr/>
          <p>
            <strong>Email verified: </strong>
            {`${currentUser?.emailVerified}`}
          </p>
          <div>
           <button type='button' id='home'>Home</button>
           <button type='button' id='home'>Analytics</button>
           <button type='button' id='home'>Settings</button>
           </div>
           <div></div>
          <hr/>

          <span onClick={() => signOut(auth)}>Logout</span>
         

        <div className='sub_div'> <img id='ABlogo'  src={require('./AB.png')} width="70%" height="70%" alt="Logo"/></div>

        </div>


      </div>
     
  )
}

export default Profile