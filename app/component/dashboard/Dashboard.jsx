"use client";
import React from "react";

import Banner from "../../component/component/banner/Banner";
import Coins from "../../component/component/coins/Coins";
import Charts from "../../component/component/charts/Charts";
import Exchanges from "../component/exchanges/Exchanges";
import MarketTrend from "../component/trend/MarketTrend";

import "./StyleDashboard.css";
import CoinsMobile from "../component/coins/mobile/CoinsMobile";

export default function Dashboard() {
  return (
    <>
   
      <div className="dashboard-container">
        <div style={{fontSize:"30px",color:"#FFFFFF",fontWeight:600}}>Cryptocurrency</div>
         <div className="dashboard-main">     
               <Banner /> 
          
             <Charts />    
        </div>

         <div className="dashboard-container-coin-pc">
          <Coins />
        </div> 

        

         <div className="container-bot">
          <div className="container-exchanges-ranking">
            <Exchanges />
          </div>

           <div className="container-market-trend">
            <MarketTrend />
          </div> 
          
        </div>
         <div className="dashboard-container-coin-mobile">
          <CoinsMobile />
        </div>   
      </div>
    </>
  );
}
