"use client";
import React, { useState, useEffect } from 'react';
import "./StyleDashboard.css";
import Banner from "./component/banner/Banner"; 
import Popular from "./component/popularList/Popular";
import Image from "next/image"
import BTC  from "../../../assets/BTC.png"
import ETH  from "../../../assets/ETH.png"
import BNB  from "../../../assets/BNB.png"
import SOL  from "../../../assets/SOL.png"
import USDT  from "../../../assets/USDT.png"
import USDC  from "../../../assets/USDC.png"
import { GoArrowSwitch } from "react-icons/go";
import { GetExchanges,GetMarketTrending } from "../../api/ApiRoute"
import { useRouter } from 'next/navigation'

import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


export default function Dashboard() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [coinList, setCoinList] = useState([]);

  const router = useRouter()
  const [cryptoData, setCryptoData] = useState([]);
  const  exchanges = GetExchanges();
  const  marketTrending = GetMarketTrending();

  useEffect(() => {
    fetchCoinList();
  }, []);

  useEffect(() => {
    if (selectedCoin) {
      fetchCoinData();
    }
  }, [selectedCoin]);

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
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=thb&days=1`);
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
            tension: 0.4,
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
      title: {
        display: true,
        text: `ราคา ${coinList.find(coin => coin.id === selectedCoin)?.name || selectedCoin} 7 วันล่าสุด`,
        font: {
          size: 20,
          family: "'Kanit', sans-serif",
        },
        color: 'white',
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
      x: {
        grid: {
          display: false,
        },
      },
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



  console.log(marketTrending)
  const coinImages = {
    BTC: BTC,
    ETH: ETH,
    BNB: BNB,
    SOL: SOL,
    USDT: USDT,
    USDC: USDC,
  };


  useEffect(() => {
    async function fetchCryptoData() {
      try {
        const response = await fetch('/api' , {
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

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-main">
          <div className="dashboard-container-banner">
            <Banner />
          </div>
          <div className="dashboard-container-popular">
          <div style={{ width: '80%', margin: 'auto', fontFamily: "'Kanit', sans-serif" }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>กราฟราคาเหรียญคริปโต</h1>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label htmlFor="coin-select" style={{ marginRight: '10px' }}>เลือกเหรียญ: </label>
        <select 
          id="coin-select"
          value={selectedCoin} 
          onChange={(e) => setSelectedCoin(e.target.value)}
          style={{ padding: '5px', fontSize: '16px' }}
        >
          {coinList.map((coin) => (
            <option key={coin.id} value={coin.id}>{coin.name}</option>
          ))}
        </select>
      </div>
      {chartData.labels.length > 0 ? (
        <Line options={options} data={chartData} />
      ) : (
        <p style={{ textAlign: 'center' }}>กำลังโหลดข้อมูล...</p>
      )}
    </div>
          </div>
        </div>
        <div className="dashboard-container-coin">
          
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
        </div>
      <div className="container-bot">





        <div className="container-exchanges-ranking">
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
            
        </tr>
    </thead>
    <tbody >
      {exchanges.map((app,index) => (
        
        <tr key={app.id} onClick={() => window.open(app.url)} >

           <td>{app.trust_score_rank}</td>
            <td style={{display:"flex"}}> <div style={{padding:"0px 10px 0px 0px"}}><Image
          src={app.image}
          alt="logo image platform"
          width={25}
          height={25}
        />
        </div>{app.name}</td>
            <td>{app.trade_volume_24h_btc.toFixed(3)}</td>
           
        </tr>
       
     ))}
    </tbody>
</table>


    </div>
          </div>
        </div>
        </div>





        <div className="container-market-trend">
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
          <td>{items.item.name}</td>
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
        </div>
        <div className="container-market-news">
          
        </div>
        </div>
      </div>
    </>
  );
}
