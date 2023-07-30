import React,{useState,useContext} from "react";
import { Context } from "../../App";
import { Navigate } from "react-router-dom";
import { firestore,auth } from "../../Firebase";
import { createUserWithEmailAndPassword} from 'firebase/auth';
import {addDoc, collection,updateDoc,doc} from '@firebase/firestore';
import './Signup.css';
export function Signup (){
    let contextData=useContext(Context);
    let ref=collection(firestore,'userData');
    let [page,newPage]=useState(false);
    if(page){
        return <Navigate to="/MainPage" replace={true}/>
    }
    async function handleSubmit(e){
        e.preventDefault();
        let form=new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
        let user=await createUser(data.email,data.password,data.username);
    }
    async function createUser(email,password,name){
        return createUserWithEmailAndPassword(auth,email,password).then(cred=>{addDoc(ref,{id:cred.user.uid,chatRooms:[],userDocId:'',name:name}).then(docu=>{updateDoc(doc(firestore,'userData',docu.id),{userDocId:docu.id});contextData.currentDoc.current=docu.id;}); newPage(true);})
    }
    return (
        <div id="box">
        <form className="form" onSubmit={handleSubmit}>
        <h1 id="title">Sign Up</h1>
        <label className='signitems' htmlFor="email">Email</label>
        <input className='signitems' name='email' required type='text'/>
        <label className='signitems' htmlFor='password'>Password</label>
        <input className='signitems' name='password' type='text' required/>
        <label className='signitems' htmlFor='username'>Username</label>
        <input className='signitems' name='username' required type="text"/>
        <input className='signitems' type='submit' name='submit'/>
        </form>
        </div>
    )
}