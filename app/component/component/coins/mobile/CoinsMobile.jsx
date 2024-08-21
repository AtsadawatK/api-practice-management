"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import BTC from "../../../../../assets/BTC.png";
import ETH from "../../../../../assets/ETH.png";
import BNB from "../../../../../assets/BNB.png";
import SOL from "../../../../../assets/SOL.png";
import USDT from "../../../../../assets/USDT.png";
import USDC from "../../../../../assets/USDC.png";
import "./StyleCoinsMobile.css";

export default function CoinsMobile() {
    const [cryptoData, setCryptoData] = useState([]);
    const [cryptoDataInfo, setCryptoDataInfo] = useState([]);

    useEffect(() => {
        async function fetchCryptoData() {
            try {
                const response = await fetch('/api', {
                    cache: 'no-store',
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
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

    useEffect(() => {
        async function fetchCryptoDataInfo() {
            try {
                const response = await fetch('/api/routeCoinsInfo', {
                    cache: 'no-store',
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setCryptoDataInfo(data.data); 
            } catch (error) {
                console.error("Failed to fetch crypto data info:", error);
            }
        }
        fetchCryptoDataInfo();
        const intervalId = setInterval(fetchCryptoDataInfo, 500000);
        return () => clearInterval(intervalId);
    }, []);

    const sortedCryptoData = cryptoData.sort((b, a) => b.rank - a.rank);

    return (
        <>
            <div className="table-head">
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ borderTop: "1px solid white", borderBottom:"1px solid white", flex: 1 }}>#</div>
                    <div style={{ borderTop: "1px solid white", borderBottom:"1px solid white", flex: 2 }}>Name</div>
                    <div style={{ borderTop: "1px solid white", borderBottom:"1px solid white", flex: 2  }}>Price</div>
                    <div style={{ borderTop: "1px solid white", borderBottom:"1px solid white", flex: 2 }}>Volume(24h)</div>
                </div>

                {sortedCryptoData.map((item, index) => {
                    
                    const logoUrl = cryptoDataInfo[item.id]?.logo || ""; 
                    return (
                        <div
                            key={item.id}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                
                            }}
                        >
                            <div style={{ borderBottom: "1px solid white", flex: 1 ,padding:"5px 0px 5px 0px"}}>
                                {index + 1}
                            </div>
                            <div style={{ display: "flex", borderBottom: "1px solid white", flex: 2 ,padding:"5px 0px 5px 0px"}}>
                                <div style={{ padding: "0px 5px 0px 0px" ,display:"flex",alignItems:"center",justifyContent:"start"}}>
                                    {logoUrl && <Image src={logoUrl} alt={`${item.name} logo`} width={20} height={20} style={{ objectFit: "contain" }} />}
                                    
                                </div>
                                <div style={{ padding: "0px 5px 0px 0px",display:"flex",alignItems:"center" }}>
                                  {item.name}
                                </div>
                                <div style={{ color: "grey" ,display:"flex",alignItems:"center"}}>{item.symbol}</div>
                            </div>
                            <div style={{ borderBottom: "1px solid white", flex: 2,padding:"10px 0px 10px 0px" }}>
                                ${item.quote.USD.price.toFixed(3)}
                            </div>
                            <div style={{ borderBottom: "1px solid white", flex: 2 ,padding:"10px 0px 10px 0px"}}>
                                ${item.quote.USD.volume_24h.toFixed(3)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
