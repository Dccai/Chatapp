import React,{useContext,useState,useEffect} from "react";
import { Context } from "../../App";
import { firestore } from "../../Firebase";
import { getDocs,query,where,collection,getDoc,doc,data,updateDoc,onSnapshot} from "firebase/firestore";
import "./Chat.css";
export function Chat(props){
    let contextData=useContext(Context);
    let data=React.useRef();
    data.current=props.data;
    let [up,newUp]=useState(0);
    let [snapShot,setSnapShot]=useState(undefined);
    async function newMessage(){
        let docus=await getDoc(doc(firestore,'chat',data.current.id));
        let newData=docus.data();
        data.current=newData;
        newUp(a=>a+1);
    }
    useEffect(()=>{
        const unsub = onSnapshot(doc(firestore, "chat", data.current.id), (doc) => {
            setSnapShot(doc.data())});
        newMessage();
        return ()=>unsub
    },[snapShot])
    async function sendMessage(e){
        e.preventDefault();
        let form= new FormData(e.currentTarget);
        let message=Object.fromEntries(form);
        let counter=0;
        data.current.messages.push({message:message.textBox,id:contextData.currentUser,name:contextData.username});
        await updateDoc(doc(firestore,'chat',data.current.id),{messages:data.current.messages});
    }
    return (
        <div id="chatBack">
        <h1 id="chatTitle">{data.current.name}</h1>
        <div id="chatView">
        {data.current.messages.map((a,h)=>{
            if(a.id===contextData.currentUser){
            return <div className="you"><h3 className="chatBoxTitle">{a.name}</h3>{a.message}</div>;
            }
            else{
                return <div className="other"><h3 className="chatBoxTitle">{a.name}</h3>{a.message}</div>
            }
        }
            )}
        </div>
        <form id="chatty" onSubmit={sendMessage}>
            <input id='chatBox' type="text" name="textBox"/>
            <button type='submit' id="chatSend"name="Send">Send</button>
        </form>
        </div>
    )
}