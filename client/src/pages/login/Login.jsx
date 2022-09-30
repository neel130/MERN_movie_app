import "../../styles/login.css"
import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect,useContext } from "react";
import { userContext } from "../../App";


export default function Login() {
const [email,setEmail] = useState('');
const [password,setPassword]= useState('');
const {state,dispatch} = useContext(userContext);
const navigate = useNavigate();

const logIn = async(e)=>{
  e.preventDefault();
  const res = await fetch('/auth/login',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      email,
      password
    })
  })
  const data = await res.json();
  console.log(data)
  if(data.success){
    localStorage.setItem("user",JSON.stringify(data.user));
    dispatch({type:"USER",payload:data.user});
    navigate('/')
  }
}


  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <Link to={"/"} >
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          </Link>
        </div>
      </div>
      <div className="login-container">
        <form>
          <h1>Sign In</h1>
          <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email or phone number" />
          <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
          <button onClick={logIn} className="loginButton">Sign In</button>
          <span>
            New to Netflix? <b> <Link to={'/signup'} className="link" > Sign up now.</Link></b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
