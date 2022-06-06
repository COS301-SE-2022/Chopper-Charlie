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
               
          <h1>Profile</h1>
          <img src={require('./account.png')} width="40%" height="15%" alt="profile"/>
          <p><strong>Email: </strong>{currentUser?.email}</p>
          <p>
            <strong>Email verified: </strong>
            {`${currentUser?.emailVerified}`}
          </p>
          <span onClick={() => signOut(auth)}>Sign Out</span>
        </div>


      </div>
     
  )
}

export default Profile