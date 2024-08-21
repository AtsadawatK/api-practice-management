"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image"
import BTC  from "../../../../assets/BTC.png"
import ETH  from "../../../../assets/ETH.png"
import BNB  from "../../../../assets/BNB.png"
import SOL  from "../../../../assets/SOL.png"
import USDT  from "../../../../assets/USDT.png"
import USDC  from "../../../../assets/USDC.png"
import { GoArrowSwitch } from "react-icons/go";

export default function Coins() {
    const [cryptoData, setCryptoData] = useState([]);

    
  useEffect(() => {
    async function fetchCryptoData() {
      try {
        const response = await fetch('/api/routeCoins' , {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        } );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setCryptoData(data.data);
      } catch (error) {
        console.error("Failed to fetch crypto data:", error);
      } 
    }
    fetchCryptoData(); 
     const intervalId = setInterval(fetchCryptoData, 500000); 
    return () => clearInterval(intervalId);
  }, []);

  const sortedCryptoData = cryptoData.sort((b, a) => b.rank - a.rank);


  const coinImages = {
    BTC: BTC,
    ETH: ETH,
    BNB: BNB,
    SOL: SOL,
    USDT: USDT,
    USDC: USDC,
  };



  return (
    <>
     {sortedCryptoData && sortedCryptoData.slice(0, 6).length > 0 ? (
  sortedCryptoData.slice(0, 6).map((item, index) => (
    <div key={index} className="card-coin">
      <div className='coin-logo'>
        <Image
          src={coinImages[item.symbol]}
          alt={`${item.name} logo`}
          style={{ objectFit: "contain", width: "50px", height: "auto" }}
        />
      </div>
      <div className='name-coin'>
        <div>{item.name} {item.symbol}</div>
        <div><GoArrowSwitch /></div>
        <div>USD</div>
      </div>
      <div className='coin-price'>${item.quote.USD.price.toFixed(3)}</div>
    </div>
  ))
) : (
  Array.from({ length: 6 }).map((_, index) => (
    <div key={index} className="skeleton">
      <div class="loader"></div>
      <div class="" style={{marginTop:"20px",color:"#FFFFFF"}}>Loading ... </div>
    </div>
  ))
)}
    </>
  )
}
