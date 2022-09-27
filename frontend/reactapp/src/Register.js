import {useState} from 'react'
import './forms.css'
import {auth} from './firebase'
import {useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {useAuthValue} from './AuthContext'
import GoogleButton from 'react-google-button'

function Register() {
  

  const [color, changeColor] = useState('#242424');
	document.body.style.backgroundColor = color;



  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {setTimeActive} = useAuthValue()

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)   
          .then(() => {
            {createcon(email)}

            setTimeActive(true)
            navigate('/verify-email')
            

          }).catch((err) => alert(err.message))
        })
        .catch(err => setError(err.message))
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }





  function createcon(str){
		fetch("/cc/"+str)
		}

  return (
    // <center>
      <div className='center'>
      <div className='auth'>
      <img src={require('./logo.png')} width="75%" height="75%" alt="Logo"/> 
        <h2>Register</h2>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>
          <input 
            type='email' 
            value={email}
            placeholder="Enter your email"
            required
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password} 
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

            <input 
            type='password'
            value={confirmPassword} 
            required
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}/>

        
<div class="btn">
          <button  id='registerButton' type='submit'>Register</button>
          <a href="/login"><button type='button' id='reg'>Login</button></a>
</div>
        </form>
       
      </div>
      <img id='AB'  src={require('./AB.png')} width="10%" height="15%" alt="Logo"/>
    </div>
    
     
  )
  
}






export default Register
