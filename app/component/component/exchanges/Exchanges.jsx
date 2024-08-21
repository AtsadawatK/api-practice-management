"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image"
import { GetExchanges } from "../../../api/ApiRoute"

import "./StyleExchanges.css"
export default function Exchanges() {

    const  exchanges = GetExchanges();
  return (


    <>

        <div className="box-exchanges-ranking">
          <div style={{color:"#FFFFFF",fontSize:"18px",fontWeight:600}}>Exchanges Rankings</div>
          <div className="exchanges-ranking-table">
          <div className='Table-exchanges'>
    <table style={{width:"100%",}}>
    <thead >
        <tr>
          <th><div style={{width:"100%",display:"flex",justifyContent:"start"}}>Rank</div></th>
            <th><div style={{width:"100%",display:"flex",justifyContent:"start"}}>Platform</div></th>
            <th><div style={{width:"100%",display:"flex",justifyContent:"start"}}>Volumn 24 h</div></th>
            <th><div style={{width:"100%",display:"flex",justifyContent:"start"}}>Country</div></th>
            
        </tr>
    </thead>
    <tbody >
      {exchanges.map((app,index) => (
        
        <tr key={app.id} onClick={() => window.open(app.url)} >

           <td>{app.trust_score_rank}</td>
            <td style={{display:"flex"}}> <div style={{padding:"0px 10px 0px 0px"}}>
                <Image
          src={app.image}
          alt="logo image platform"
          width={25}
          height={25}
        />
        </div>{app.name}</td>
            <td>${app.trade_volume_24h_btc.toFixed(3)}</td>
            <td>{app.country}</td>
        </tr>
       
     ))}
    </tbody>
</table>


    </div>
          </div>
        </div>
       

    </>

  )
}
