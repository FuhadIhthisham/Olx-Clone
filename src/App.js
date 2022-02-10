import React, {useEffect, useContext} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"

import Signup from './Pages/Signup'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';

import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import Post from './store/postContext'

function App() {

  
  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  useEffect(()=>{
    
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
    
  })

  return (
    <div>
      <Router>
        
        <Post>
            <Route exact path='/'>
              <Home />
            </Route>

            <Route path='/signup'>
              <Signup />
            </Route>

            <Route path='/login'>
              <Login />
            </Route>
            
            <Route path='/create'>
              <Create />
            </Route>
            
            <Route path='/view-post'>
              <ViewPost />
            </Route>
        </Post>

      </Router>
    </div>
  );
}

export default App;
