import React,{useContext} from 'react';
import { Context } from '../../App';
import { getDoc,doc,data,updateDoc} from 'firebase/firestore';
import { firestore } from '../../Firebase';
export function ShowProfile(){
    let contextData=useContext(Context);
    let data=contextData.showProfile;
    if(data.current===0){return <h1>Sign In And Choose Portfolio To View</h1>}
    async function invitePerson(e){
        e.preventDefault();
        let form=new FormData(e.currentTarget);
        let inviteData=Object.fromEntries(form);
        let docu=await getDoc(doc(firestore,'userData',data.current.userDocId));
        let duta=docu.data();
        if(duta.invites===undefined){
            await updateDoc(doc(firestore,'userData',duta.userDocId),{invites:[{message:inviteData.Message,password:inviteData.Password,inviter:contextData.username}]});
        }
        else{
            await updateDoc(doc(firestore,'userData',duta.userDocId),{invites:[...duta.invites,{message:inviteData.Message,password:inviteData.Password,inviter:contextData.username}]});
        }
    }
    return (
        <div id="profile">
        <h1 id="profileName">{data.current.name}</h1>
        <h3 className="profileHead">Their Bio</h3>
        <p id="showProfile">{data.current.bio}</p>
        <h3 className="profileHead">Their Interests</h3>
        <div id="interestsHold">
        {data.current.preferences&&data.current.preferences.map((a)=>{
            return(<div className="interestBar"><h5 className="interestText">{a}</h5></div>);}
        )}</div>
        <h3 className="profileHead">Contacts</h3>
        <div id="contactGrid" >
        {data.current.contacts&&data.current.contacts.map(a=>{return <a style={{display:"block"}}>{a}</a>;})}</div>
        <form onSubmit={invitePerson}>
        <label style={{display:'block',marginLeft:'auto',marginRight:'auto',background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,33,1) 35%, rgba(8,132,60,1) 43%, rgba(5,164,139,1) 66%, rgba(0,212,255,1) 100%)'
,'-webkit-background-clip': 'text',
'-webkit-text-fill-color': 'transparent',fontSize:'20px'}}htmlFor="Message">Invite Message</label>
        <input style={{display:'block',marginLeft:'auto',marginRight:'auto',borderRadius:'25px'}} name="Message" type="text" required/>
        <label style={{display:'block',marginLeft:'auto',marginRight:'auto',background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,33,1) 35%, rgba(8,132,60,1) 43%, rgba(5,164,139,1) 66%, rgba(0,212,255,1) 100%)'
,'-webkit-background-clip': 'text',
'-webkit-text-fill-color': 'transparent',fontSize:'20px'}} htmlFor="Password">Password For Chatroom</label>
        <input style={{display:'block',marginLeft:'auto',marginBottom:'20px',marginRight:'auto',borderRadius:'25px'}}name="Password" type="text" required/>
        <button style={{display:'block',marginLeft:'auto',marginRight:'auto',borderRadius:'25px',fontSize:'20px',color:'violet'}}type="submit">Invite {data.current.name}</button>
        </form>
        </div>
    );
}