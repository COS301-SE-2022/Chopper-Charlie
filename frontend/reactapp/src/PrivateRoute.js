import { useSelector } from 'react-redux'
import {Navigate} from 'react-router-dom'
import { selectCurrentUser } from './store/user/user.selector'

export default function PrivateRoute({children}) {

  
  const currentUser = useSelector(selectCurrentUser)  


  

  /* if(!currentUser?.emailVerified){

    return <Navigate to='/login' replace/>
  }   */

  return children
}