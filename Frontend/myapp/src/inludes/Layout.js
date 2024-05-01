import React, { useContext } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {  BsMoonFill, BsFillSunFill } from "react-icons/bs";



function Layout({ children }) {
 
  
//   const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <div>
        <Header />
        <main>{children}</main>
        <Sidebar />
      </div>
      
    </>
  );
}

export default Layout;