import React, { useState } from "react";
import Footer from "../../components/Footer"
import Navbar from "../../components/Header/Navbar"
import DPR from "./DPR";

const DPRPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <DPR className="w-full h-full"/>
      <Footer />
    </div>
  )
}

export default DPRPage