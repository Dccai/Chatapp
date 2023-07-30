import React,{useEffect,useState} from "react";
import { Preferences } from "../../Assets/Preferences";
import { Context } from "../../App";
import { useContext } from "react";
import { firestore } from "../../Firebase";
import { Navigate } from "react-router-dom";
import {collection,getDocs,where,query,data,updateDoc,doc} from "firebase/firestore"
import './Profile.css';
export function Profile(){
    let contextData=useContext(Context);
    let [user,setUser]=useState({});
    let [update,setUpdate]=useState(0);
    let ref=collection(firestore,'userData');
    useEffect(()=>{
    async function rando(){
    if(contextData.currentUser!==undefined){
    let q= query(ref,where("id","==",contextData.currentUser));
    let data=await getDocs(q);
    setUser(data.docs[0].data());
    }
    }
    rando();
    },[contextData.currentUser,update]);
    
    async function changeBio(e){
        await updateDoc(doc(ref,contextData.currentDoc.current),{bio:e.currentTarget.value});
    }
    async function deleteInterest(e){
        user.preferences.pop(user.preferences.indexOf(e.target.id)) ;
        await updateDoc(doc(ref,contextData.currentDoc.current),{preferences:user.preferences})
        setUpdate(a=>a+1);
    }
    async function addInterest(e){
        let newArray=user.preferences;
        if(user.preferences!==undefined){
        newArray.push(e.target.id);
        await updateDoc(doc(ref,contextData.currentDoc.current),{preferences:newArray});
        }
        else{
            await updateDoc(doc(ref,contextData.currentDoc.current),{preferences:[e.target.id]});
        } 
        setUpdate(a=>a+1);
    }
    async function addContact(e){
        e.preventDefault();
        let form= new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
        let array=user.contacts;
        console.log(array)
        if(array!==undefined){
        await updateDoc(doc(ref,contextData.currentDoc.current),{contacts:[...array,data.contact]});
        }else{
            await updateDoc(doc(ref,contextData.currentDoc.current),{contacts:[data.contact]});
        }
        setUpdate(a=>a+1);
        console.log(user.contacts)
    }
    async function deleteInvite(invite){
        user.invites.pop(user.invites.indexOf(invite));
        await updateDoc(doc(ref,contextData.currentDoc.current),{invites:[...user.invites]});
        setUpdate(a=>a+1);
    }
    return (
        <div  id="profile">
        <h1 id="profileName">{user.name}</h1>
        <h3 className="profileHead">Your Bio</h3>
        <textarea onChange={changeBio}id="bio" defaultValue={user.bio&&user.bio} />
        <h3 className="profileHead">Your Interests</h3>
        <div id="interestsHold">
        {user.preferences&&user.preferences.map((a)=>{
            return(<div className="interestBar"><h5 className="interestText">{a}</h5><button className="interestButton"id={a} onClick={deleteInterest}>Delete</button></div>);}
        )}
        </div>
        <h3 className="profileHead">Interests To Add To Profile</h3>
        <div id="specialtyGrid">
        {Preferences.map(a=>{return (<button className="specials" onClick={addInterest} id={a}>{a}</button>);})}
        </div>
        <h3 id="contact">Contacts</h3>
        <div id="contactGrid">
            {user.contacts&&user.contacts.map(a=>{return <div style={{display:"block"}}>{a}</div>;})}
        </div>
        <form onSubmit={addContact}>
            <label id="contactLabel"htmlFor="contact">New Contact</label>
            <input id="contactInput"type="text" name="contact"/>
            <button id="addContact"type="submit"name="submit">Add Contact</button>
        </form>
        <h3 id="inviteHead">Chat Invitations</h3>
        <div id="invites">
        {user.invites&&user.invites.map(a=>{
            return (<div className="inviteBlock"><h4>Inviter: {a.inviter}</h4><br/><h4>Message: {a.message}</h4><br/><h4>Chat Password: {a.password}</h4><br/><button className="buuton"onClick={()=>{deleteInvite(a);}}>Delete</button></div>);
        })}</div>
        
        </div>
    );
}