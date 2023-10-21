'use client'

import Navbar from "../../components/Navbar";
import { ContextProvider, useAppContext } from "../../context/AppContext";
import { useEffect } from "react";

const layout = ({ children }) => {
   const { getUserData } = useAppContext()

   useEffect(() => {
    getUserData()
  },[])
  return (
      <div className="h-full w-full flex flex-col">
        <Navbar />
        {children}
      </div>
  );
};

export default layout;
