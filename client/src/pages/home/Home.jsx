import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
// import "./home.scss";
import "../../styles/home.css"
import List from "../../components/list/List";
import { useState,useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { userContext } from "../../App";

const Home = ({type}) => {
 const [list,setList] = useState([]);
 const [genre,setGenre] = useState(null);
 const {state,dispatch} = useContext(userContext);
 const location = useLocation();
console.log(state);
//  console.log(genre);
// console.log(type)
 useEffect(()=>{
    if(location.pathname="/"){
       setGenre(null);
    }
 },[location])
 
 useEffect(()=>{
  const getList =async()=>{
    const url = `/list/all${type?"?cat="+type:""}${genre?"&type="+genre:""}`
    console.log(url)
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data)
    if(data.success){
      setList(data.list)
    }
  }
  getList();
 },[type,genre])

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {
        list.map((listitem)=>{
          return <List listitem={listitem} />
        })
      }
      
    </div>
  );
};

export default Home;
