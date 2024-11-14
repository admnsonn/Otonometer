import React from "react";
import LandingPage from "../../assets/landingpageJelajah.svg";
import bulat from "../../assets/bulat.svg";
import Swal from "sweetalert2";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import { NavLink } from "react-router-dom";
const Jelajah = () => {
  sessionStorage.removeItem("historyParentDataset");
  sessionStorage.removeItem("historyChildDataset");
  sessionStorage.removeItem("historyChildDatasetArray");
  sessionStorage.removeItem("historyTipePeringkat");

  const handlePopup = () => {
    if (sessionStorage.getItem("token") != "") {
      window.location.href = "/Jelajah-Main";
    } else {
      sessionStorage.setItem("redirectPath", window.location.pathname);
      window.location.href = "/Jelajah-Main";
    }
  };

  return (
    <div className="relative mt-[130px] md:mt-[200px] h-full mb-[195px] md:mb-0 md:h-screen items-center justify-center">
      {/* <img src={bulat} alt="" className="fixed w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10" /> */}
      <img
        src={geometry}
        alt=""
        className="md:hidden lg:block hidden fixed w-full top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10 opacity-10 object-cover"
      />
      <img
        src={geometrys}
        alt=""
        className="hidden md:block lg:hidden fixed w-full top-[40%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover"
      />
      <img
        src={geometryss}
        alt=""
        className="block md:hidden lg:hidden fixed w-full top-[5%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover"
      />
      <div className="md:hidden flex justify-center">
        <img src={LandingPage} alt="loading" className="w-[120px]" />
      </div>
      <div className="flex justify-between w-full h-auto bg-primer px-[15%] gap-[20px] lg:gap-[200px] text-secondary mb-[100px]">
        <div className="w-[746px]">
          <h1 className="font-bold text-[30px] lg:text-[96px] text-center md:text-left">
            Jelajah
          </h1>
          <p className="text-center md:text-left font-medium text-[14px] lg:text-[30px] mt-[18px] ">
            Jelajah Lebih Dalam Daerah Pilihanmu!
          </p>
          <p className="text-center md:text-left font-regular text-[12px] lg:text-[20px] mt-[18px]">
          Melalui Jelajah, kita dapat melihat peringkat data Keuangan, Ekonomi, dan Statistik suatu daerah baik secara Nasional maupun di tingkat Provinsi.{" "}
          </p>
          <NavLink
            onClick={handlePopup}
            className="
            mt-[38px]
            flex 
            bg-[#24445A] 
            hover:bg-[#86BBD8]
            w-[105px] h-[39px] 
            rounded-[10px] 
            text-white 
            items-center justify-center text-[14px] md:text-[16px] mx-auto md:mx-0"
          >
            Lanjut
          </NavLink>
        </div>
        <div className="hidden md:block">
          <img src={LandingPage} alt="loading" className="w-450" />
        </div>
      </div>
    </div>
  );
};

export default Jelajah;
