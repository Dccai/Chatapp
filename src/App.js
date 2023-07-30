import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import React,{createContext,useState,useEffect} from 'react';
import { auth,firestore} from './Firebase';
import { Route,Routes,Link,BrowserRouter} from 'react-router-dom';
import { Signup } from './Pages/Signup/Signup';
import { Login } from './Pages/Login/Login';
import { Menu } from './Pages/Menu/Menu';
import { MainPage } from './Pages/MainPage/MainPage';
import { Chatrooms } from './Pages/Chatrooms/Chatrooms';
import { Profile } from './Pages/Profile/Profile';
import { Chat } from './Pages/Chatrooms/Chat';
import { ShowProfile } from './Pages/ShowProfile/ShowProfile';
import { Search } from './Pages/Search/Search';
import {doc,getDocs,where,collection,query,data} from 'firebase/firestore';
import { Error } from './Pages/Error/Error';
export const Context=createContext();
function App() {
  let userRef=collection(firestore,'userData');
  let [currentUser,setCurrentUser]=useState(undefined);
  let currentDoc=React.useRef(undefined);
  let username=React.useRef(undefined);
  let [chatRooms,setChat]=useState([]);
  let showProfile=React.useRef(0);
  useEffect(()=>{
    let auther=onAuthStateChanged(auth,async(user)=>{user&&setCurrentUser(user.uid);
      if(user){
      let q=query(userRef,where('id','==',user.uid));
    let docs=await getDocs(q);
      currentDoc.current=docs.docs[0].id;
      let data=docs.docs[0].data();
      username.current=data.name;
      setChat(data.chatRooms);
    }
    });
    return ()=> auther;
  },[]);
  let contextData={currentUser:currentUser,currentDoc:currentDoc,setChatRooms:setChat,chatRooms:chatRooms,username:username.current,showProfile:showProfile};
  function Navbar(){
    return (
      <nav id="websiteHead">
        <div className="Link">
        <Link className="Links" to="/">Getting Started</Link>
        </div>
        <div className="Link">
          {currentUser&&<Link className="Links"to="/MainPage">Menu</Link>}
        </div>
      </nav>
    );
  }
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Context.Provider value={contextData}><Menu/></Context.Provider>}/>
      <Route path="/Signup" element={<Context.Provider value={contextData}><Signup/></Context.Provider>}/>
      <Route path="/Login" element={<Context.Provider value={contextData}><Login/></Context.Provider>}/>
      <Route path="/MainPage" element={<Context.Provider value={contextData}><MainPage/></Context.Provider>}/>
      <Route path="/Chatrooms" element={<Context.Provider value={contextData}><Chatrooms/></Context.Provider>}/>
      <Route path="/Profile" element={<Context.Provider value={contextData}><Profile/></Context.Provider>}/>
      <Route path="/Chat" element={<Context.Provider value={contextData}><Chat/></Context.Provider>}/>
      <Route path="/ShowProfile" element={<Context.Provider value={contextData}><ShowProfile/></Context.Provider>}/>
      <Route path="/Search" element={<Context.Provider value={contextData}><Search/></Context.Provider>}/>
      <Route path="/Error" element={<Error/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;