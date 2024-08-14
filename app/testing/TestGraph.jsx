"use client"

import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';


  import { Line } from 'react-chartjs-2';
  

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


export default function TestGraph() {
    const [coinList , setCoinList] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  
    const options ={};

    const chartdata = {
        labels : [
            "Monday",
            "Tuesday",
            "Wendesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],
        datasets : [
            {
                label:"Steps",
                data:[3000,4500,2000,6000,10000,3800,500],
                borderColor : "#927dac",
                backgroundColor:"#d9baff",
                fill: true,
            }
        ]
    }


    useEffect(() => {
        getCoindList();
      }, []);

    const getCoindList = async () => {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets')
        const data = await response.json();
        setCoinList(data);
    
    }

    console.log(coinList)


    
    const getChartCoinData = async () => {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=thb&days=1`)
        const data = await response.json();
        const coinData = data.prices;
    
    }

    
  return (
   <>
   {/* <div style={{color:"white",height:"50vh"}}>
    <Line 
    options={options}
    data={chartdata}
    
    />
   </div> */}
   
   <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label htmlFor="coin-select" style={{ marginRight: '10px' }}>เลือกเหรียญ: </label>
        <select 
          id="coin-select"
          value={selectedCoin} 
          onChange={(e) => setSelectedCoin(e.target.value)}
          style={{ padding: '5px', fontSize: '16px' }}
        >
          {/* {filterCoinList.map((coin) => (
            <option key={coin.id} value={coin.id}>{coin.name}</option>
          ))} */}
        </select>
      </div>

   </>
  )
}
