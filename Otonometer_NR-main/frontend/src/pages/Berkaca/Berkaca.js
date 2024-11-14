import React from "react";
import LandingPage from "../../assets/landingpageBerkaca.svg";
import bulat from "../../assets/bulat.svg";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
const Berkaca = () => {
  sessionStorage.removeItem("selectedDataBerkaca");
  sessionStorage.removeItem("all_ds_1");
  sessionStorage.removeItem("namaFilter1Berkaca");
  sessionStorage.removeItem("selectedDataBerkaca");
  sessionStorage.removeItem("namaFilter2Berkaca");
  sessionStorage.removeItem("namaParentBerkaca");
  sessionStorage.removeItem("namaFilter2Berkaca");
  sessionStorage.removeItem("namaParent2");
  sessionStorage.removeItem("namaParent1");

  const handlePopup = () => {
    if (sessionStorage.getItem("token") != null && sessionStorage.getItem("isverif") != "false") {
      window.location.href = "/Berkaca-Main";
    } else if (sessionStorage.getItem("token") == null) {
      Swal.fire({
        title: "Perhatian!",
        text: "Untuk mengakses halaman ini, Anda perlu melakukan login terlebih dahulu.",
        confirmButtonText: "Masuk",
        confirmButtonColor: "#24445A",
        showCancelButton: true,
        cancelButtonText: "Batal",
        cancelButtonColor: "#AFAFAF",
        customClass: {
          icon: "no-border",
          title: "title-icon-errorr",
          text: "text-icon",
          confirmButton: "confirm-icon",
          cancelButton: "cancel-icon",
          popup: "swal2-popup",
        },
        preConfirm: () => {
          sessionStorage.setItem("redirectPath", window.location.pathname);
          window.location.href = "/Masuk";
        },
      });
    } else if (sessionStorage.getItem("isverif") == "false") {
      Swal.fire({
        title: "Perhatian!",
        text: "Untuk mengakses halaman ini, Anda perlu melakukan verifikasi email terlebih dahulu. Silahkan kunjungi halaman profil.",
        confirmButtonText: "Verifikasi",
        confirmButtonColor: "#24445A",
        showCancelButton: true,
        cancelButtonText: "Batal",
        cancelButtonColor: "#AFAFAF",
        customClass: {
          icon: "no-border",
          title: "title-icon-errorr",
          text: "text-icon",
          confirmButton: "confirm-icon",
          cancelButton: "cancel-icon",
          popup: "swal2-popup",
        },
        preConfirm: () => {
          sessionStorage.setItem("redirectPath", window.location.pathname);
          window.location.href = "/Profile";
        },
      });
    }
  };
  return (
    <div className="relative mt-[130px] md:mt-[200px] h-full mb-[195px] md:mb-0 md:h-screen items-center justify-center">
      <img src={geometry} alt="" className="md:hidden lg:block hidden fixed w-full top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10 opacity-10 object-cover" />
      <img src={geometrys} alt="" className="hidden md:block lg:hidden fixed w-full top-[40%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover" />
      <img src={geometryss} alt="" className="block md:hidden lg:hidden fixed w-full top-[5%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover" />
      <div className="md:hidden flex justify-center">
        <img src={LandingPage} alt="loading" className="w-[120px]" />
      </div>
      <div className="flex justify-between w-full h-auto bg-primer px-[15%] gap-[20px] lg:gap-[200px] text-secondary mb-[100px]">
        <div className="w-[746px]">
          <h1 className="font-bold text-[30px] lg:text-[96px] text-center md:text-left">Berkaca</h1>
          <p className="text-center md:text-left font-medium text-[14px] lg:text-[30px] mt-[18px]">Bandingkan daerah Anda dengan daerah lain!</p>
          <p className="text-center md:text-left font-regular text-[12px] lg:text-[20px] mt-[18px]">
            Melalui Berkaca, kita dapat melakukan perbandingan data Keuangan, Ekonomi, dan Statistik satu daerah dengan daerah lain baik di tingkat Provinsi maupun Kota/Kabupaten.
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

export default Berkaca;
