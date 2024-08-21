"use client"

import React, { useState, useEffect } from 'react';
import 'chart.js/auto'


  import { Line } from 'react-chartjs-2';
  import "./StyleCharts.css"

 

export default function Charts() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [coinList, setCoinList] = useState([]);
  const [date, setDate] = useState('1');
  const [fontSize, setFontSize] = useState(12);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setFontSize(7);
      } else if (window.innerWidth <= 820) {
        setFontSize(10);
      } else {
        setFontSize(12);
      }
    };

    handleResize(); // Set initial font size

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


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
          labels: {
            font: {
              size: 5, // ปรับขนาดฟอนต์ของ legend
            },
        }},
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
        x: {
          ticks: {
            font: {
              size: fontSize,
            },
          },
        },
        y: {
          beginAtZero: false,
          ticks: {
            callback: function(value, index, values) {
              return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(value);
            },
            font: {
              size: fontSize,
            },
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
   
   <div className='container-charts'>

    <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
   <div style={{height:"30%",width:"50%"}}>
   <select 
     className='select'
     value={selectedCoin} 
     onChange={(e) => setSelectedCoin(e.target.value)}
     style={{padding: '10px', fontSize: '16px' ,backgroundColor:"#1A111D",borderRadius:"10px",color:"#FFFFFF",width:"100%"}}
   >
     {coinList.map((coin) => (
       <option key={coin.id} value={coin.id} style={{minWidth:"200px",maxWidth:"200px"}}>{coin.name}</option>
     ))}
   </select>
 </div>


 <div className="select-date" >
   <div className="date" style={{borderRadius:"10px",color:date === "1" ? "#FFFFFF" : "#868B93",padding:"10px",fontSize:"14px",cursor:"pointer"}} onClick={handleChang1day}>1D</div>
   <div className="date" style={{borderRadius:"10px",color:date === "7" ? "#FFFFFF" : "#868B93",padding:"10px",fontSize:"14px",cursor:"pointer"}} onClick={handleChang7day}>1W</div>
   <div className="date" style={{borderRadius:"10px",color:date === "30" ? "#FFFFFF" : "#868B93",padding:"10px",fontSize:"14px",cursor:"pointer"}} onClick={handleChang30day}>1M</div>
   </div>


   </div> 

   
    <div  className="charts-container" >
    <Line 
    options={options}
    data={chartData}
    
    />
   </div> 
   </div>
    
   
   

   </>
  )
}
