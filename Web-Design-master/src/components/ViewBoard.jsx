import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import View from "./View";
const ViewBoard = () => {
  // let Links = [
  //   { title: "Board1", description: "This is a Board description" },
  //   { title: "Board2", description: "This is a Board description" },
  //   { title: "Board3", description: "This is a Board description" },
  //   { title: "Board4", description: "This is a Board description" },
  //   { title: "Board5", description: "This is a Board description" },
  // ];
    
  
  let token="";
  useEffect(async() => {
    try{
      token=localStorage.getItem("token")
      console.log(token)
    }
    catch{
      console.log("ERROR FETCHING TOKEN")
    }
    const Links=await fetch("http://127.0.0.1:8000/getallboards",{    
    method:"GET",
    headers:{
      "Content-type":"application/json",
      "Authorization":`Bearer ${token}`
  
    }
  })
  const res=await Links.json()
  console.log(res)  
  
    
  }, [])

  const Links=[]
  // const history = useHis
  // const handleView =() => {
  //   <View props={link}/>
  // }
  return (
    <div className="w-9/12 my-12 p-12 mx-auto">
      {Links.map((link) => (
        <div key={link.title} className=" p-2 bg-white rounded text-xl my-7">
          <h1 className="text-3xl md-4">{link.title}</h1>
          <p>{link.description}</p>
          <Link
            to="/view"
            className="px-3 mt-3 mx-auto bg-indigo-600 hover:bg-indigo-400 ease-in-out duration-700 rounded px-3 py-2 text-white">
            View
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ViewBoard;
