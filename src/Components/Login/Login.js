import React, { useState, useContext } from 'react';
import {FirebaseContext} from '../../store/FirebaseContext'
import { useHistory } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  
  // storing user datas
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const history = useHistory()
  const {firebase} = useContext(FirebaseContext)

  // handling login button click
  const handleLogin = (e) =>{
    e.preventDefault()
    
    // authenticating user with firebase user data
    firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
      history.push('/')
    }).catch((err)=>{
      setLoginErr(err.message)
    })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img onClick={()=>history.push('/')} style={{cursor: "pointer"}} width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <br />
          <br />
          <div style={{color:"red", width: "20em"}}> {loginErr} </div>
          <br />
          <button>Login</button>
        </form>
          <br />
        <a onClick={()=>history.push('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
