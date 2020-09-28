import React, { useEffect, useState } from 'react';
import {Container} from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import LoginForm from "./components/LoginForm"
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";

// login credetials
const firstLogin = {
  username:"John",
  password:"12345",
  role:"line-chart-user"
}
const secondLogin = {
  username:"MICKY",
  password:"98765",
  role:"pie-chart-user"
}
// passkeys
const passKeys = [firstLogin,secondLogin ]



function App() {
 // current user state
  const [userObj, setUserObj] = useState([{role:"nonLoggedIn"}]);
  
  // this useeffect hook will set the passkeys in the loaclstorage for login credentials validation
useEffect(()=>{
  localStorage.setItem("passKeys",  JSON.stringify(passKeys));
  
  if(JSON.parse(localStorage.getItem("currentUser"))===undefined || JSON.parse(localStorage.getItem("currentUser"))==="nonLoggedIn"||JSON.parse(localStorage.getItem("currentUser"))===null ){
    localStorage.setItem("currentUser",JSON.stringify("nonLoggedIn"));
  }
  else{
    setUserObj([{role:JSON.parse(localStorage.getItem("currentUser"))}])
  }
}, [])

// if successfull login then change the state and render the component
const setUser = userObj=>{
  setUserObj(userObj);
  localStorage.setItem("currentUser",JSON.stringify(userObj[0].role));
}

// signout logic
const signOut = ()=>{
  const signOutObj = [{
    username:"",
    password:"",
    role:"nonLoggedIn"
  }]

  setUserObj(signOutObj);
  localStorage.setItem("currentUser",JSON.stringify(signOutObj[0].role));
}

   if(userObj[0].role==="nonLoggedIn"){
    return (
      <Container fluid id="login">
          <LoginForm setUser ={setUser}/>
        </Container>
     );
   }
   else if(userObj[0].role==="line-chart-user"){
    return (
      
      <Container fluid>
          <LineChart userObj={userObj} signOut={signOut}/>
        </Container>
     );
   }
   else if(userObj[0].role==="pie-chart-user"){
    return (
      
      <Container fluid>
          <PieChart userObj={userObj} signOut={signOut}/>
        </Container>
     );
   }
 
}

export default App;
