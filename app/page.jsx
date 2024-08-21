import Image from "next/image";
import Dashboard from "./component/dashboard/Dashboard";
import TestGraph from "./testing/TestGraph";



export default function Home() {
  return (
   <>
   {/*  <div
    className="navbar"
    style={{
        width:"100%",
        justifyContent:"center",
        border:"2px solid #868B93",
        maxWidth:"1920px"
    }}
    >

     <div style={{width:"100%"}}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi recusandae suscipit aut veritatis quod, expedita impedit quibusdam, optio quasi eaque nemo, accusantium rem reprehenderit. Nisi laboriosam vero architecto ipsa harum!
     </div>
      </div> */}


        <Dashboard />    
  {/*  <TestGraph />  */} 
   </>
  );
}
