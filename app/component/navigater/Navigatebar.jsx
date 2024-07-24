import React from 'react'
import { HiChevronLeft } from "react-icons/hi2";
import Image from "next/image";
import profile from '../../../assets/profile.jpg'
import { IoNotificationsOutline } from "react-icons/io5";

import "./StyleNavigate.css"

export default function Navigatebar() {
  return (
    <>

<div className="navigate-container">


        
<div className="navigate-box-top">
  <div className="navigate-box-button-back">
    <button className="navigate-iconbutton-back" aria-label="Back">
      <HiChevronLeft
        style={{ width: "30px", height: "30px", color: "#E2D8FD" }}
      />
    </button>
  </div>

  <div className="navigate-name-page">Dashboard</div>

  <div className="navigate-user-state">

    <button className="navigate-iconbutton-noti" aria-label="Back">
      <IoNotificationsOutline
        style={{ width: "30px", height: "30px", color: "#E2D8FD", }}
      />
    </button>



     <button className="navigate-iconbutton-profile" aria-label="Back">
<div className="image-container">
<Image
src={profile}
alt="Profile Image"
objectFit="cover"

/>
</div>
</button> 




  </div>
</div>



</div>
    
    
    </>
  )
}
