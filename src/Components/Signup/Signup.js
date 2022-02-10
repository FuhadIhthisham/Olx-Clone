import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import { useHistory } from "react-router-dom"

import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {

  // storing user signup datas to use state variables
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  
  const [signupErr,setSignupErr] = useState('')

  // getting fire base context
  const {firebase} = useContext(FirebaseContext)
  const history = useHistory()

  // handling submit click event
  const handleSubmit = (e)=>{
    e.preventDefault()

    // creating a user in firebase
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result)=>{
      result.user.updateProfile({displayName: username}).then(()=>{
        firebase.firestore().collection('users').add({
          id: result.user.uid,
          username: username,
          phone: phone
        }).then(()=>{
          history.push("/login")
        })

      })
    }).catch((err)=>{
      setSignupErr(err.message)
    })
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img onClick={()=>history.push('/')} style={{cursor: "pointer"}} width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit} id='signupForm'>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            name="name"
          />
          <br />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
          />
          <br />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            name="phone"
          />
          <br />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
          />
          <br />
          <br />
          <div style={{color:"red", width: "20em"}}> { signupErr } </div>
          <br />
          <button>Signup</button>
        </form>
          <br />
        <a onClick={()=>history.push('/login')}>Login</a>
      </div>
    </div>
  );
}
