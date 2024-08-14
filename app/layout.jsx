import { Mulish } from "next/font/google";
import "./globals.css";
import Sidebar from "./component/navigater/Sidebar";
import Navigatebar from "./component/navigater/Navigatebar";

const mulish = Mulish({  weight: '400',
  subsets: ['latin'],});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mulish.className}>
     
        <Sidebar /> <div style={{display:"flex",flexDirection:"column",width:"100%",height:"100vh"}}><Navigatebar />{children}</div></body>
    </html>
  );
}
