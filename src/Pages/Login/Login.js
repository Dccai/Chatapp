import React,{useState} from "react";
import { auth } from "../../Firebase";
import { signInWithEmailAndPassword} from "firebase/auth";
import { Navigate } from "react-router-dom";
import './Login.css'
export function Login(){
    let [page,newPage]=useState(false);
    if(page){
        return <Navigate to="/MainPage" replace={true}/>;
    }
    async function handleSubmit(e){
        e.preventDefault();
        let form= new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
        let login=await loginUser(data.email,data.password);
    }
    async function loginUser(email,password){
        return signInWithEmailAndPassword(auth,email,password).then(cred=>{newPage(true);})
    }
    return (
        <div id="box">
        <form className="form" onSubmit={handleSubmit}>
        <h1 id="title">Login</h1>
        <label className='items' htmlFor="email">Email</label>
        <input className='items' name="email" required type="text"/>
        <label className='items'  htmlFor="password" >Password</label>
        <input className='items' name="password" required type="text"/>
        <input className='items' name="submit" type="submit"/>
        </form>
        </div>
    );
}