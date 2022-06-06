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
        <img src={require('./logo.png')} width="40%" height="15%" alt="Logo"/>
               
          <h1>    </h1>
          
          <img id='pp'  src={require('./j.png')} width="26%" height="12%" alt="profile"/>
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
          <hr/>
          
          <span onClick={() => signOut(auth)}>Sign Out</span>
        </div>


      </div>
     
  )
}

export default Profile