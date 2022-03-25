import React, { useRef } from "react";
import { Link,useNavigate } from "react-router-dom";

const AddBoard = () => {
  const titleRef=useRef()
  const descRef=useRef()
  const navigate=useNavigate()
const buttonHandler=async()=>{
  const title=titleRef.current.value
  const desc=descRef.current.value
  const token=localStorage.getItem("token")
  const res=await fetch("http://127.0.0.1:8000/createboard",{
    method:"POST",
    headers:{
      "Content-type":"application/json"
      ,"Authorization":`Bearer ${token}`
    },
    body:JSON.stringify({
      "title":title,
      "description":desc
    })
  })
  const data=res.json()
  console.log(data)
  navigate('/createdboard')

}

  return (
    <div className=" my-12 p-12 mx-auto">
      <div className="flex flex-col w-1/2 mx-auto rounded bg-white p-12 my-12">
        <label className=" py-2 bg-white rounded text-xl mt-4">Title</label>
        <input
          ref={titleRef}
          className="border-solid hover:border-dotted focus:outline-none border-2 rounded border-indigo-600 py-2 md-4"
          placeholder="Enter a Title..."
        />
        <label className=" py-2 bg-white rounded text-xl mt-4">
          Description
        </label>
        <textarea
          ref={descRef}
          name="description"
          className="border-solid hover:border-dotted focus:outline-none border-2 rounded border-indigo-600 py-2 md-4"
          cols="30"
          rows="10">
          Enter Description...
        </textarea>
        <button
          onClick={buttonHandler}
          className="w-2/3 mx-auto text-center bg-indigo-600 hover:bg-indigo-400 ease-in-out duration-700 rounded px-3 py-2 mt-12 text-white">
          Add a Board
        </button>
      </div>
    </div>
  );
};

export default AddBoard;
