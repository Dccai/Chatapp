import React,{useContext,useState} from "react";
import { firestore } from "../../Firebase";
import {addDoc,collection,updateDoc,doc,getDoc,data} from '@firebase/firestore';
import { Context } from "../../App";
import { Chat } from "./Chat";
import { Navigate } from "react-router-dom";
import './Chatrooms.css';
export function Chatrooms(){
    let contextData=useContext(Context);
    let chatRef=collection(firestore,'chat');
    let userRef=collection(firestore,'userData');
    let [loadChat,setLoadChat]=useState(undefined);
    let [error,callError]=useState(false);
    if(error){
        return <Navigate to="/Error" replace={true}/>;
    }
    if(loadChat){
        return <Chat data={loadChat}/>
    }
    async function joinChat(e){
        e.preventDefault();
        let form =new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
        let oldArray=await getDoc(doc(userRef,contextData.currentDoc.current));
        let newdata=oldArray.data();
        let arrayData=newdata.chatRooms;
        let docy=await getDoc(doc(firestore,'chat',data.Password));
        if(docy.data()===undefined){
            callError(true);
            return;
        }
        let addDocy=docy.data();
        await updateDoc(doc(userRef,contextData.currentDoc.current),{chatRooms:[...arrayData,addDocy]});
        contextData.setChatRooms(a=>[...a,addDocy]);
  
}
    async function addChat(e){
        e.preventDefault();
        let form =new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
        addDoc(chatRef,{name:data.SetName,messages:[],id:''}).then(async(cred)=>{await updateDoc(doc(chatRef,cred.id),{id:cred.id});
        let oldArray=await getDoc(doc(userRef,contextData.currentDoc.current));
        let data=oldArray.data();
        let arrayData=data.chatRooms;
        let docy=await getDoc(cred);
        let addDocy=docy.data();
        
        await updateDoc(doc(userRef,contextData.currentDoc.current),{chatRooms:[...arrayData,addDocy]});
        contextData.setChatRooms(a=>[...a,addDocy]);
    });
       
    }
    async function setData(a){
        let docu=await getDoc(doc(firestore,'chat',a.id)); let deta=docu.data(); setLoadChat(deta);
    }
    return (
        <div id="chatroomBack">
        <form onSubmit={addChat} id="addChat">
        <h3 id="chatTitle">Create New Chat</h3>
        <label className="chatRoomLabel"htmlFor="SetName">Set Chat room Name</label>
        <input className='chatRoomInput' name="SetName" required type="text"/>
        <button id="add" type="submit">+</button>
        </form>
        <form onSubmit={joinChat} id="joinChat">
        <h3 id="chatTitle">Join Chat</h3>
        <label className="chatRoomLabel" htmlFor="Password">Chat room Password</label>
        <input className='chatRoomInput'  name="Password" required type="text"/>
        <button id="add" type="submit">+</button>
        </form>
        <div id='chats'>
          { /* */
        contextData.chatRooms.map(a=>{return <button className="chatDisplay" onClick={()=>{setData(a)}}>Chat Room: {a.name} <br/> Password: {a.id}</button>;})
        }
        </div>
        
        </div>
    );
}