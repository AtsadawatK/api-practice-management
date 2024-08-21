import React from 'react'
import Image from "next/image"
import { GetMarketTrending } from "../../../api/ApiRoute"
export default function MarketTrend() {
  const  marketTrending = GetMarketTrending();

  return (
    <>
     <div className="box-exchanges-ranking">
          <div style={{color:"#FFFFFF",fontSize:"18px",fontWeight:600}}>Market Trend</div>
          <div className="market-trending-table">
      
    
      

        <table style={{width:"100%",}}>
        <thead >
            <tr>
              <th><div style={{width:"100%",display:"flex",justifyContent:"start"}}>Name</div></th>
                <th><div style={{width:"100%",display:"flex",justifyContent:"start"}}>LastPrice</div></th>
                <th><div style={{width:"100%",display:"flex",justifyContent:"start"}}>Market Change</div></th>
                
            </tr>
        </thead>
        <tbody >
        {marketTrending.map((items,index) => (
          <tr key={index}>
          <td style={{display:"flex"}}> 
          <div style={{padding:"0px 10px 0px 0px"}}>
            
            <Image
          src={items.item.small}
          alt="logo image platform"
          width={25}
          height={25}
        /> 
        </div> 
<div>{items.item.name}</div> <div style={{color:"grey",marginLeft:"10px"}}>{items.item.symbol}</div></td>
          <td>${items.item.data.price_change_percentage_24h.usd.toFixed(3)}</td> 
          <td><Image
          src={items.item.data.sparkline}
          alt="logo image platform"
          width={60}
          height={60}
        /></td>
          </tr>
            ))}
        </tbody>
    </table>


        
      

          </div>
        </div>
    
    
    </>
  )
}
