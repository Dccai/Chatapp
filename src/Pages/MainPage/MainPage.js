import React, {useContext,useState}from "react";
import { Link } from "react-router-dom";
import { Context } from "../../App";
import './MainPage.css';
export function MainPage (){
    let contextData=useContext(Context);
    let [display,setDisplay]=useState('block');
    function handleClick(){
        setDisplay(display==='block'?'none':'block');
    }
    return (
        <>
        <button onClick={handleClick}id="options">Options</button>
        <div id="optionBar" style={{display:display}}>
        <Link className="barLinks" to='/Chatrooms'>Chat</Link>
        <Link className="barLinks"to='/Profile'>Profile</Link>
        <Link className="barLinks" to="/Search">Search</Link></div><div id="body"><h1 id="title">A Website To Connect Like-minded People!</h1><h4 className="subText">Find People With Similar Interests!</h4><br/><h4 className="subText">Create Chat Groups To Converse Your Favorite Topics!</h4><br/><h4 className="subText">Have Fun! Make Friends!</h4></div>
        </>
    );
}