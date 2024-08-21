"use client"
import React from 'react';
import { GoHome } from "react-icons/go";
import { IoPeopleOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

import { useRouter } from 'next/navigation';
import "./StyleNavbar.css";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    
    const handleItemClick = (path) => {
        router.push(path);
    };

    const MenuList = [
        {
            MenuName: "Home",
            icon: GoHome,
            path: '/',
        },
        {
            MenuName: "Member List",
            icon: IoPeopleOutline,
            path: '/member',
        },

    ];

    return (
        <div
            className="navbar"
            style={{
                width: "100%",
                height: "7vh",
                position: "fixed",
                bottom: "0",
                justifyContent: "center",
                borderTop: "2px solid #868B93",
            }}
        >
            <div
                style={{
                    backgroundColor: "#372C44",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-around",
                }}
            >
                {MenuList.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleItemClick(item.path)}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            borderBottom: pathname === item.path ? "4px solid #9f7ec5" : "none",
                            padding: "0px 8px",
                            cursor: "pointer"
                        }}
                    >
                        <div>
                            {item.icon && <item.icon className='icon' style={{color:pathname === item.path ? "#9f7ec5" : "white"}} />}
                        </div>
                        <div
                            style={{
                                color: pathname === item.path ? "#9f7ec5" : "white",
                            }}
                        >
                            {item.MenuName}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

