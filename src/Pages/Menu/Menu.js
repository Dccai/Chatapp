import React,{useState} from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { signOut } from "firebase/auth";
import './Menu.css';
export function Menu (){
    let [login,exitLogin]=useState(false);
    let [signup,exitSignup]=useState(false);
    if(login){
        return <Navigate to="/Login" replace={true}/>;
    }
    else if (signup){
        return <Navigate to="/Signup" replace={true}/>;
    }
    function Login(){
        exitLogin(true);
    }
    function Signup(){
        exitSignup(true);
    }
    function Logout(){
        signOut(auth).then(()=>{window.location.reload(false);});
        
    }
    return (
        <div id="startScreen">
        <h1 id="welcome">Welcome To The Connectron!</h1>
        <h3 id="subtitle">We connect people with similar interests and goals!</h3>
        <button className="stylishButton" onClick={Signup}>Signup</button>
        <button className="stylishButton"onClick={Login}>Login</button>
        <button className="stylishButton"onClick={Logout}>Signout</button>
        </div>
    );
}