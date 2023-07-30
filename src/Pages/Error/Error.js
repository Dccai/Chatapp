import React, {useState}from "react";
import { Navigate } from "react-router-dom";
import './Error.css';
export function Error(){
    let [goBack,setGoBack]=useState(false);
    if(goBack){
        return <Navigate to="/Chatrooms" replace={true}/>;
    }
    return (
        <div id="error">
        <h1 id="errorHead">Oops, Sorry! Either You Were Given The Wrong Password Or The Chatroom Does Not Exist!</h1>
        <button id="errorButton"onClick={()=>{setGoBack(true)}}>Go Back</button>
        </div>
    )
}