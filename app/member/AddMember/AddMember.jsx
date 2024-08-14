"use client"


import React, { useState, useEffect } from "react";
import { AddMember } from "../../api/ApiRoute";
import { IoMdAdd } from "react-icons/io";

import "./StyleAddMember.css"
export default function AddUser() {
    const [addname, setAddname] = useState('');
    const [addemail, setAddemail] = useState('');
    const [addphone, setAddphone] = useState('');
    const [addwebsite, setAddwebsite] = useState('');

    const handleAdd = async (event) =>{
        event.preventDefault();
        try {
          const addData = { 
            name:addname,
            email:addemail,
            phone:addphone,
            website:addwebsite,
          };
          const addUser = await AddMember(addData);
          console.log('User Add:', addUser);
        } catch (error) {
          console.error('Add failed:', error);
        }
    
      }

  return (
    <>
    <div style={{width:"100%",padding:"20px"}}>
    <div className="form-label">Add User <IoMdAdd /></div>
    <div className="form-box"> 
      <div className="box-edit-form">
        <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}><div>Name : </div> 
        <input value={addname} onChange={(e) => setAddname(e.target.value)}></input> </div>
        <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}><div>Email : </div> 
        <input value={addemail} onChange={(e) => setAddemail(e.target.value)}></input> </div>
        <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}><div>Phone : </div> 
        <input value={addphone} onChange={(e) => setAddphone(e.target.value)}></input> </div>
        <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}><div>Website : </div> 
        <input value={addwebsite} onChange={(e) => setAddwebsite(e.target.value)}></input> </div>
        <div style={{width:"100%",display:"flex",justifyContent:"end"}}>
          <div style={{width:"50px",display:"flex",justifyContent:"center"}}>
        <button className="button-update" onClick={handleAdd} style={{display:"flex",justifyContent:"center"}}><IoMdAdd /></button>
        </div>
        </div>
      </div>
    </div>
    </div>
    
    
    </>
  )
}
