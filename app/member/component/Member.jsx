"use client"

import React, { useState, useEffect } from 'react';
import "./StyleMember.css"
import { GetMembers } from "../../api/ApiRoute"
import { MdKeyboardDoubleArrowLeft ,MdKeyboardDoubleArrowRight} from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
export default function Member() {

  
  const [pagination , setPagination ] = useState(1);
  const usersPerPage = 5;
  const  users = GetMembers();
  console.log(users)
  const totalPages = Math.ceil(users.length / usersPerPage);
  const handleUserPrevPage = () => {
    setPagination((prev) => Math.max(prev - 1 , 1));
  }

  const handleUserNextPage = () => {
    setPagination((prev) => Math.min(prev + 1 , totalPages));
  }


  const displayedUsers = users.slice((pagination - 1) * usersPerPage, pagination * usersPerPage);

  return (
    <>
    
    <div className='Member-main'>
    <div  className='Member-container'>
    <div className='Member-header-bar'>
    <div className='Member-table-name'>

      <div style={{fontSize:"24px",fontWeight:600}}>
      All Members
      </div>

      <div style={{paddingBottom:"20px"}}>
        Status
      </div>

    </div>

    <div style={{display:"flex",}}>
      {/* <form action="" style={{position:"relative",alignItems:"center",paddingRight:"50px",}} > 

      <input className ="Member-search" type="text" placeholder="Search" name="search" ></input>
       <div style={{
      position: "absolute",zIndex:10,
      top:12,
      right:60,
      color:"#FFFFFF",
      cursor:"pointer",
    }}>
      <MdSearch style={{width:"25px",height:"25px"}}/></div>
      </form> */}

      <div className="Add-Button" style={{display:"flex",alignItems:"center",cursor:"pointer",margin:"0px 0px 0px 0px",}} onClick={() => { window.location.href = '/member/AddMember'; }}>
        <div style={{widtd:"25px",height:"25px"}}>
        <IoMdPersonAdd style={{width:"100%",height:"100%",color:"white"}}/></div></div>
    </div>
    </div>
    

    <div className='Table'>
    <table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
      {displayedUsers.map((items) =>(
        <tr key={items.id}>
            <td>{items.id}</td>
            <td>{items.username}</td>
            <td>{items.name}</td>
            <td>{items.email}</td>
            <td>{items.phone}</td>
            <td><div className="btn-edit" style={{padding:"5px",borderRadius:"20px",backgroundColor:"#8e75ce",cursor:"pointer"}} onClick={() => { window.location.href = `/member/${items.id}`; }}>Edit</div></td>
        </tr>
        ))}
    </tbody>
</table>


    </div>
    </div>




    <div style={{display:"flex",justifyContent:"end",paddingTop:15}}>
      
      <div className='pageNumber' style={{display:"flex",gap:50,paddingRight:50,alignItems:"center"}}>
      <div style={{color:"white",cursor:"pointer"}} onClick={handleUserPrevPage}><MdKeyboardDoubleArrowLeft style={{width:"20px",height:"30px" }}/></div>
      {[...Array(totalPages)].map((_,index) =>(
         <div key={index} style={{color: pagination === index + 1 ? "white" : "gray",cursor:"pointer"  }} onClick={() => setPagination(index + 1)}>{index + 1}</div>

))}
       
        <div style={{color:"white",cursor:"pointer"}} onClick={handleUserNextPage} ><MdKeyboardDoubleArrowRight style={{width:"20px",height:"30px"  }}/></div>
      </div>
      
      
      </div>
    </div>

    </>
  )
}
