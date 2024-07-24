"use client"
import React, { useEffect } from 'react';
import Image from 'next/image'
import Logo from '../../../assets/logo.png'
import { IoPeopleOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import { IoBarChartOutline } from "react-icons/io5";
import { IoCubeOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

import { useRouter } from 'next/navigation';
import './StyleSidebar.css'
export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const handleItemClick = (path) => {
    router.push(path);
  };

    const MenuList = [
        {
        MenuName:"Dashboard",
        icon:IoBarChartOutline,
        path: '/',
        },
        {
        MenuName:"Products List",
        icon:IoCubeOutline,
        path: '/products',

        },
        {
        MenuName:"Member List",
        icon:IoPeopleOutline,
        path: '/member',
        },
        {
        MenuName:"Search",
        icon:IoSearch,
        path: '/search',
        },

    
    ]
    
   


  return (
    <>
    <div className='main'>
    <div className='container'>
    
    <div className='box'>


       <div className='logo'>
        <Image 
        src={Logo}
        alt="Logo Image"
        className='logoimage'
        />

    
       </div>

    <div className='container-menu '>
    <ul className='menu'>
{MenuList.map((item,index) =>(
  
  <li  key={index} className={`list ${pathname === item.path ? 'listactive' : ''}`} onClick={() => handleItemClick(item.path)} >{item.icon && <item.icon  style={{width:"30px",height:"30px"}}/>}</li>
  
))}

</ul>
<ul className='helpmenu'>
<li className='helplist' ><IoExitOutline  style={{width:"30px",height:"30px"}} /></li>
</ul>

    </div>

    </div>
    </div>
    </div>
    </>
  )
}
