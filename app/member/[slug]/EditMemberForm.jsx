"use client"

import React, { useState, useEffect } from "react";
import { GetMembersEdit, UpdateMember,AddMember } from "../../api/ApiRoute";
import "./styleForm.css";
import Swal from 'sweetalert2'
import { RiEdit2Fill } from "react-icons/ri";
export default function EditMemberForm({ params }) {

  const userid = params.slug;
  const user = GetMembersEdit(userid);
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [website, setWebsite] = useState(user ? user.website : '');

   useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setWebsite(user.website);
    }
  }, [user]) ;

  const handleUpdate = async (event) =>{
    event.preventDefault();

    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    })
      if (result.isConfirmed) {
        try {
          const updateData = { 
            name ,
            email,
            phone,
            website
          };
          const updatedUser = await UpdateMember(userid, updateData);
          console.log('User updated:', updatedUser);
        } catch (error) {
          console.error('Update failed:', error);
        }

        Swal.fire("Saved!", "", "success");
      } 

    

  }
 

  

  console.log(name)

  return (
    <div className="form-container">

    <div style={{width:"100%"}}>
    <div className="form-label"> Update Username : {user && user.name} <RiEdit2Fill /></div>
    <div className="form-box">
      <div className="box-edit-form">
        <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}><div>Name : </div> 
        <input value={name} onChange={(e) => setName(e.target.value)}></input> </div>
        <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}><div>Email : </div> 
        <input value={email} onChange={(e) => setEmail(e.target.value)}></input> </div>
        <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}><div>Phone : </div> 
        <input value={phone} onChange={(e) => setPhone(e.target.value)}></input> </div>
        <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}><div>Website : </div> 
        <input value={website} onChange={(e) => setWebsite(e.target.value)}></input> </div>
        <div style={{width:"100%",display:"flex",justifyContent:"end"}}>
          <div style={{width:"50px",display:"flex",justifyContent:"center"}}>
        <button className="button-update" onClick={handleUpdate} style={{display:"flex",justifyContent:"center"}}><RiEdit2Fill /></button>
        </div>
        </div>
      </div>
    </div>
    </div>




    </div>
  );
}