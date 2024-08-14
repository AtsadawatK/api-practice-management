
import './StyleBanner.css'
import Image from "next/image"
import Cover1 from "../../../../../assets/cover2.jpg"
export default function Banner() {
  
  return (
    <div className='banner-main'>
       <Image
                  src={Cover1}
                  alt="Picture of the author"
                  style={{objectFit:"cover",width:"100%",
                  height:"100%",borderRadius:"20px"}}/>
    </div>
  );
}