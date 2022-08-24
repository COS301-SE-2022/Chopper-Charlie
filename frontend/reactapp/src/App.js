import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Profile from './Profile'
import Register from './Register'
import VerifyEmail from './VerifyEmail';
import Login from './Login'
import {useState, useEffect} from 'react'
import {AuthProvider} from './AuthContext'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './PrivateRoute'
import {Navigate} from 'react-router-dom'
import Download from './Download';
import Delete from './Delete';
import Upload from './Upload'; //added by mumi
import Analyse from './Analyse';
import Analytics from './Analytics'; //added by mumi
import Settings from './Settings'; //added by mumi
import AnalyseVideo from './AnalyseVideo'; //added by mumi

import {Deploy} from './Component/Deploy/Deploy'

function App() {

  const [state, setState] = useState({})
  
  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

useEffect(() => {
  fetch("/mydatapage/<index_boo>").then(response => {
    if(response.status == 200){
      return response.json()
    }
  }).then(data => setState(data))
  .then(error => console.log(error))
})

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <Router>
      <Deploy prop={state}/>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }/>
          <Route path="/login" element={
            !currentUser?.emailVerified 
            ? <Login/>
            : <Navigate to='/' replace/>
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified 
            ? <Register/>
            : <Navigate to='/' replace/>
          } />
          <Route path='/verify-email' element={<VerifyEmail/>} /> 
          <Route path='/download' element={<Download/>} />
          <Route path='/delete' element={<Delete/>} /> 
          <Route path='/upload' element={<Upload/>} />    {/*    added by mumi */}
          <Route path='/analyse' element={<Analyse/>} /> 
          <Route path='/analytics' element={<Analytics/>} />    {/*    added by mumi */}
          <Route path='/settings' element={<Settings/>} />    {/*    added by mumi */}
          <Route path='/analysevideo' element={<AnalyseVideo/>} /> 
        </Routes>  
      </AuthProvider>
  </Router>
 
  );
}

export default App;