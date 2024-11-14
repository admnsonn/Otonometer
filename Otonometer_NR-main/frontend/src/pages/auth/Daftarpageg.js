import React, { useEffect, useState } from "react";
import Illustration from "../../assets/Auth/ilustrasi.jpg";
import Illustration1 from "../../assets/Auth/ilustrasi1.png";
import Swal from "sweetalert2";
import "../../style/Components.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Ubah = () => {
  const [state, setState] = useState({
    formArraykata: [1, 2, 3],
    formNokata: 1,
    statekata: {
      newPassword: "",
      showNewPassword: false,
      newPassword_confirmation: "",
      showNewPassword2: false,
    },
    kondisiAwal: true,
  });
  const { formNokata, kondisiAwal, statekata } = state;
  const { newPassword, showNewPassword, newPassword_confirmation, showNewPassword2 } = statekata;
  const [pass1User, setPass1User] = useState('');
  const [pass2User, setPass2User] = useState('');
  const [tokennyaUser, settokennyaUser] = useState(sessionStorage.getItem("token"));

  const [garisPassword, setGarisPassword] = useState(false);
  const [garisPassword2, setGarisPassword2] = useState(false);
  const handleChangepass1 = (e) => {
    setPass1User(e.target.value);
  };
  const handleChangepass2 = (e) => {
    setPass2User(e.target.value)
  };

  useEffect(()=>{
    if(pass1User === "" && state.kondisiAwal === false){
      setGarisPassword(true)
    }else{
      setGarisPassword(false)
    }
  },[pass1User])
  useEffect(()=>{
    if(pass2User === "" && state.kondisiAwal === false){
      setGarisPassword2(true)
    }else{
      setGarisPassword2(false)
    }
  },[pass2User])

  const submitNewPassword = async (e) => {
    e.preventDefault();
    if(pass1User === ""){
      setGarisPassword(true)
      Swal.fire({
        title: "Perhatian!",
        text: "Silakan isi kata sandi terlebih dahulu!",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#24445a",
        customClass: {
          title: "title-icon-errorr",
          text: "text-icon",
          confirmButton: "confirm-icon",
        },
      });
    }else if(pass1User !== ""){
      setGarisPassword(false)
    }
    if(pass2User === ""){
      setGarisPassword2(true)
      Swal.fire({
        title: "Perhatian!",
        text: "Silakan isi kata sandi terlebih dahulu!",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#24445a",
        customClass: {
          title: "title-icon-errorr",
          text: "text-icon",
          confirmButton: "confirm-icon",
        },
      });
    }else if(pass2User !== ""){
      setGarisPassword2(false)
    }

    if(pass1User || pass2User){
      if(pass1User !== pass2User){
        Swal.fire({
          title: "Perhatian!",
          text: "Kata sandi harus sama.",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#24445a",
          customClass: {
            title: "title-icon-errorr",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
        });
      }else if(pass1User === pass2User){
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        if(!passwordRegex.test(pass1User)){
          Swal.fire({
            title: "Perhatian!",
            text: "Kata sandi harus memiliki setidaknya 8 karakter, huruf kapital, huruf kecil, angka, dan karakter khusus",
            confirmButtonText: "Tutup",
            confirmButtonColor: "#24445a",
            customClass: {
              title: "title-icon-errorr",
              text: "text-icon",
              confirmButton: "confirm-icon",
            },
          });
        }else{
          try {
            var dataPass = new URLSearchParams();
            dataPass.append("password", pass1User);
            dataPass.append("password_confirmation", pass2User);
            var xhr_newPass = new XMLHttpRequest();
            xhr_newPass.onload = function () {
              var response = JSON.parse(this.responseText);
              if (response.status) {
                Swal.fire({
                  iconHtml:
                    '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
                  title: "Berhasil!",
                  text:
                    "Kata sandi berhasil dibuat. Silakan masuk dan mengisi data profil terlebih dahulu.",
                  confirmButtonText: "Lanjutkan",
                  confirmButtonColor: "#27AE60",
                  customClass: {
                    icon: "no-border",
                    title: "title-icon",
                    text: "text-icon",
                    confirmButton: "confirm-icon",
                  },
                  allowOutsideClick: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = "/";
                  }
                });
              } else {
                Swal.fire({
                  title: "Gagal!",
                  icon: "error",
                  text: "Gagal membuat kata sandi. Silakan coba lagi!",
                  confirmButtonText: "Tutup",
                  confirmButtonColor: "#CD3838",
                  customClass: {
                    title: "title-icon-error",
                    text: "text-icon",
                    confirmButton: "confirm-icon",
                  },
                });
              }
            };
            xhr_newPass.open(
              "POST",
              process.env.REACT_APP_URL_API+"/password/create",
            );
            xhr_newPass.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr_newPass.setRequestHeader(
              "Authorization",
              `Bearer ${tokennyaUser}`
            );
            xhr_newPass.send(dataPass.toString());
          } catch (error) {
            Swal.fire({
              title: "Gagal!",
              icon: "error",
              text: "Gagal membuat kata sandi. Silakan coba lagi!",
              confirmButtonText: "Tutup",
              confirmButtonColor: "#CD3838",
              customClass: {
                title: "title-icon-error",
                text: "text-icon",
                confirmButton: "confirm-icon",
              },
            });
          }
        }
      }
    }
  };

  const togglePasswordVisibility2 = () => {
    setState((prevState) => ({
      statekata: {
        ...prevState.statekata,
        showNewPassword: !prevState.statekata.showNewPassword,
      },
    }));
  };

  const togglePasswordVisibility3 = () => {
    setState((prevState) => ({
      statekata: {
        ...prevState.statekata,
        showNewPassword2: !prevState.statekata.showNewPassword2,
      },
    }));
  };

  // const goBack = () => {
  //   window.history.back();
  // };
    return (
      <div className="flex flex-col md:flex-row h-screen">
        <div className="hidden lg:block md:hidden md:w-1/2 bg-gray-200 flex justify-center items-center">
          <img
            src={Illustration}
            alt="Illustration"
            className="lg:max-h-full lg:w-full"
            style={{ maxWidth: "100%" }}
          />
        </div>
        <div className="hidden md:block lg:hidden md:w-1/3 bg-gray-200 flex justify-center items-center">
          <img
            src={Illustration1}
            alt="Illustration"
            className="md:max-h-full md:w-full"
            style={{ maxWidth: "100%" }}
          />
        </div>
        {/* <button
          onClick={goBack}
          className="flex align-top lg:ml-[50px] ml-[35px] mt-[50px] h-[20px] w-[20px] object-contain hover:scale-110 transform transition duration-300 lg:mb-[0px] mb-[40px]"
        >
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            color="#24445A"
            className="fa-2x"
          />
        </button> */}
        {/* Bagian Kanan: Form Login */}
        <div className="md:w-1/2 flex justify-center items-center">
          <form className="max-w-md bg-white rounded px-8 pt-6 pb-8 lg:mb-[0px] mb-[0px] md:mb-[350px] lg:ml-[0px] ml-[0px] md:ml-[30px]">
            <h1 className="text-[44px] font-bold mb-4 text-left text-secondary">
              Buat Kata Sandi
            </h1>
            <div className="mb-[24px]">
              <div className="mb-[4px]">
                <label
                  className={`block text-sm font-medium mb-[4px] text-[14px] ${garisPassword ? "text-red-600" :"text-secondary"}`}
                  htmlFor="password"
                >
                  {garisPassword ? "Kata Sandi*" :"Kata Sandi"}
                </label>
                <div className="relative">
                  <input
                    className={`w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[14px] items-center leading-tight focus:outline-none focus:shadow-outline font-regular whitespace-nowrap flex justify-between ${garisPassword ? "border-red-600" :""}`}
                    id="password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Masukkan Kata Sandi"
                    name="password"
                    value={pass1User}
                    onChange={handleChangepass1}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility2}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-transparent rounded-r-lg focus:outline-none"
                  >
                    <FontAwesomeIcon
                      icon={showNewPassword ? faEye : faEyeSlash}
                      color="#24445A"
                    />
                  </button>
                </div>
              </div>
              <p className="text-red-500 text-[12px] ">
                Panjang kata sandi minimal 8 karakter
              </p>
              <p className="text-red-500 text-[12px]">
                Kata sandi harus mengandung huruf kapital dan huruf kecil
              </p>
              <p className="text-red-500 text-[12px]">
                Kata sandi harus mengandung setidaknya satu angka
              </p>
              <p className="text-red-500 text-[12px]">
                Kata sandi harus mengandung setidaknya satu karakter khusus
              </p>
              <div className="mt-[15px]">
                <label
                  className={`block text-sm font-medium mb-[4px] text-[14px] ${garisPassword2 ? "text-red-600" :"text-secondary"}`}
                  htmlFor="confirm_password"
                >
                  {garisPassword2 ? "Konfirmasi Kata Sandi*" :"Konfirmasi Kata Sandi"}
                </label>
                <div className="flex justify-between"></div>
                <div className="relative">
                  <input
                    className={`w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[14px] items-center leading-tight focus:outline-none focus:shadow-outline font-regular whitespace-nowrap flex justify-between ${garisPassword2 ? "border-red-600" :""}`}
                    id="password_confirmation"
                    type={showNewPassword2 ? "text" : "password"}
                    placeholder="Masukkan Kata Sandi"
                    name="password_confirmation"
                    value={pass2User}
                    onChange={handleChangepass2}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility3}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-transparent rounded-r-lg focus:outline-none"
                  >
                    <FontAwesomeIcon
                      icon={showNewPassword2 ? faEye : faEyeSlash}
                      color="#24445A"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="text-white py-2 px-4 rounded-[8px] focus:outline-none text-[14px] font-medium focus:shadow-outline w-full bg-secondary hover:bg-third"
                type="submit"
                onClick={submitNewPassword}
              >
                Buat Kata Sandi
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}
export default Ubah;
