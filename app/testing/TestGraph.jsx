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
  import "./style.css"

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


export default function TestGraph() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [coinList, setCoinList] = useState([]);
  const [date, setDate] = useState('1');

  useEffect(() => {
    fetchCoinList();
  }, []);

  useEffect(() => {
    if (selectedCoin) {
      fetchCoinData();
    }
  }, [selectedCoin,date]);




  const fetchCoinList = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=thb&order=market_cap_desc&per_page=100&page=1&sparkline=false');
      const data = await response.json();
      setCoinList(data);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงรายชื่อเหรียญ:', error);
    }
  };


    const fetchCoinData = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=thb&days=${date}`);
        const data = await response.json();
        const coinData = data.prices;
  
        const labels = coinData.map(dataPoint => {
          const date = new Date(dataPoint[0]);
          return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
        });
  
        const prices = coinData.map(dataPoint => dataPoint[1]);

        const selectedCoinInfo = coinList.find(coin => coin.id === selectedCoin);

        setChartData({
          labels,
          datasets: [
            {
              label: `ราคา ${selectedCoinInfo ? selectedCoinInfo.name : selectedCoin} (THB)`,
              data: prices,
              borderColor: '#868B93',
              backgroundColor: '#4f435e',
              fill: true,
              tension: 1,
            },
          ],
        });
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      }
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(context.parsed.y);
              }
              return label;
            }
          }
        },
      },
      scales: {
       
        y: {
          beginAtZero: false,
          ticks: {
            callback: function(value, index, values) {
              return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(value);
            }
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false,
      },
    };


    
const handleChang1day = () => {

  setDate("1")

}

const handleChang7day = () => {

  setDate("7")

}

const handleChang30day = () => {

  setDate("30")

}


   

    
  return (
    
   <>
   
   <div style={{border:"2px solid #868B93",width:"40%",margin:"20px",borderRadius:"25px",height:"410px",backgroundColor:"#3C354A",padding:"20px" ,}}>

    <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
   <div style={{height:"30%"}}>
   <select 
     id="coin-select"
     value={selectedCoin} 
     onChange={(e) => setSelectedCoin(e.target.value)}
     style={{padding: '10px', fontSize: '16px' ,backgroundColor:"#1A111D",borderRadius:"10px",color:"#FFFFFF",}}
   >
     {coinList.map((coin) => (
       <option key={coin.id} value={coin.id} style={{minWidth:"200px",maxWidth:"200px"}}>{coin.name}</option>
     ))}
   </select>
 </div>


 <div style={{display:"flex",alignItems:"center",height:"30%",justifyContent:"space-between",width:"30%",paddingRight:"20px"}}>
   <div className="date" style={{borderRadius:"10px",color:date === "1" ? "#FFFFFF" : "#868B93",padding:"10px",fontSize:"14px",cursor:"pointer"}} onClick={handleChang1day}>1D</div>
   <div className="date" style={{borderRadius:"10px",color:date === "7" ? "#FFFFFF" : "#868B93",padding:"10px",fontSize:"14px",cursor:"pointer"}} onClick={handleChang7day}>1W</div>
   <div className="date" style={{borderRadius:"10px",color:date === "30" ? "#FFFFFF" : "#868B93",padding:"10px",fontSize:"14px",cursor:"pointer"}} onClick={handleChang30day}>1M</div>
   </div>


   </div>

   
    <div style={{color:"white",width:"100%" ,paddingRight:"20px",marginTop:"10px"}}>
    <Line 
    options={options}
    data={chartData}
    
    />
   </div> 
   </div>
    
   
   

   </>
  )
}
