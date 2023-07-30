
import React ,{useState,useContext}from "react";
import { Context } from "../../App";
import { firestore } from "../../Firebase";
import { Navigate } from "react-router-dom";
import {collection,getDocs,where,query,data} from "firebase/firestore"
import './Search.css';
export function Search(){
    let ref=collection(firestore,'userData');
    let contextData=useContext(Context);
    let [search,setSearch]=useState([]);
    let [searchDone,setSearchDone]=useState(false);
    let [searchNo,setSearchNo]=useState(false);
    let n=100;
    if(searchDone){
        return <Navigate to="/ShowProfile" replace={true}/>;
    }
    if(searchNo){
        return <Navigate to="/MainPage" replace={true}/>;
    }
    async function getSearchResults(){
        let q=query(ref);
        let docs=await getDocs(q);
        let searchResult=[];
        let qUser= query(ref,where("id","==",contextData.currentUser));
        let data=await getDocs(qUser);
        let userData=data.docs[0]&&data.docs[0].data();
        if(userData.preferences===undefined||userData.preferences.length===0){
            setSearchNo(true);
            return;
        }
        docs.forEach(doc=>{
            if(docs!==undefined){
            let data=doc.data();
            if(data.id!==contextData.currentUser&&data.preferences!==undefined&&data.preferences.length!==0&&userData.preferences.length!==0){
                let score=0;
                for (let x in data.preferences){
                    if(userData.preferences.includes(data.preferences[x])){
                        score++;
                    }
                }
                searchResult.push([data,score]);
            }
        }
        });
        searchResult.sort((a,b)=>{return b[1]-a[1];});
        setSearch(searchResult.slice(0,n));
    }
function goToPortfolio(data){
    contextData.showProfile.current=data;
    setSearchDone(true);
    
}
    return(<div id="searchBackground">
        <button id="search"onClick={getSearchResults}><h3 id="searchText">Search Based On Your Preferences</h3></button>
        <h1 id="results">Results</h1>
        <div id="searchContainer">
        {search&&search.map((a)=>{console.log(a[0].name);return (<div  id={a[0].id}><button className="searchResults"onClick={()=>{goToPortfolio(a[0])}}>{a[0].name}</button></div>);})}
        </div>
    </div>);
}