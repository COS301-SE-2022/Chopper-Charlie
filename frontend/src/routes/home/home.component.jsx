import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to='auth'><h3>LOGIN</h3></Link>
      <Link to='portal/analytics'><h3>PORTAL</h3></Link>
    </div>
  )
}

export default Home