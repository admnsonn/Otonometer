import React from 'react'
import Illustration from "../../assets/Auth/ilustrasi.jpg";
import logo from "../../assets/biglogo.svg";
import { Link } from "react-router-dom";
import { useState } from 'react';
import AppleIcon from "../../assets/icons/apel.svg";
import GoogleIcon from "../../assets/icons/gugol.svg";
import MicrosoftIcon from "../../assets/icons/microsoft.svg";
import NeracaIcon from "../../assets/icons/neracaruangqu.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
const Masuk = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    showPassword: false
  });
  const { email, password, showPassword } = state;
  const togglePasswordVisibility = () => {
    setState(prevState => ({
      ...prevState,
      showPassword: !prevState.showPassword
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = state;
    const isEmailValid = /\S+@\S+\.\S+/.test(email);

    if (isEmailValid) {
      Swal.fire({
        iconHtml: '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
        title: "SUCCESS!",
        text: "Berhasil Login!",
        confirmButtonText: "Berhasil",
        confirmButtonColor: "#27AE60",
        customClass: {
          icon: "no-border",
          title: "title-icon",
          text: "text-icon",
          confirmButton: "confirm-icon",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
        }
      });
    } else {
      Swal.fire({
        iconHtml: "<img src='https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihYZPXF44y7OB6l4YYsMNu3Ch8sD5wCW2oyOefMQuMpTcOkFPxlWVCcnvG0Jdp8pleEHWyc-DrJbERHmu8We62KV087J=w1920-h970'",
        title: "ERROR!",
        text: "Harap login terlebih dahulu!",
        confirmButtonText: "Keluar",
        confirmButtonColor: "#CD3838",
        customClass: {
          icon: "no-border",
          title: "title-icon-error",
          text: "text-icon",
          confirmButton: "confirm-icon",
        }
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  return (
    <section className='w-full h-screen xl:flex xl:items-start xl:justify-between flex justify-center items-start'>
      <div className="hidden xl:block xl:relative xl:w-1/2 h-full xl:flex-col">
        <img
          src={Illustration}
          alt="Illustration"
          className="w-full h-full object-cover"
          style={{ maxWidth: "100%" }}
        />
      </div>
      <div className="mt-[40px] w-[390px] md:w-1/2 md:flex md:flex-col justify-center items-center mx-[20px]">
        <button 
          className="md:absolute xl:left-[50%] xl:top-0 md:left-[20%] md:top-0 w-8 p-2 mt-4 xl:ml-4 md:mt-8"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            color="#24445A"
            className="fa-xl"
            onclick=""
          />
        </button>
        <form
            onSubmit={handleSubmit}
        >
          <img
            src={logo}
            alt='Logo Otonometer'
            className='w-[300px] h-[40px] my-[30px] bg-primary mx-auto rounded-full p-2'
          >
          </img>

          <h1 className="text-5xl font-bold mb-4 text-left text-secondary xl:mt-2 mt-[30px]">
            Masuk
          </h1>
          <p className="text-sm mb-8 text-secondary">
            Masuk ke akun Anda untuk mengakses{" "}
            <span className="font-bold">fitur lainnya</span> Otonometer
          </p>
          
          <div className="mb-4 mx-auto">
            <label
              className="block text-secondary text-sm font-medium mb-[4px] text-[14px]"
              htmlFor="email"
            >
              Email
            </label>

            <input
              className="infield md:w-full focus:outline-none focus:shadow-outline font-regular"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <label
              className="block text-secondary text-sm font-medium mb-[4px] text-[14px]"
              htmlFor="password"
            >
              Kata Sandi
            </label>
            <div className='infield md:w-full font-regular'>
              <input
                className="focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Kata Sandi"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
              <button
              className='ml-[160px] md:ml-[230px]'
              type="button"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                color="#24445A"
                size='fa-lg'
              />
            </button>
            </div>
            <button className='w-full text-right mb-6 mt-2 text-medium text-[14px] text-secondary hover:text-third'>Lupa Kata Sandi?</button>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="text-white py-2 px-4 rounded-[8px] focus:outline-none text-[14px] font-medium focus:shadow-outline w-full bg-secondary hover:bg-third"
              type="submit"
                onClick={handleSubmit}
            >
              Masuk
            </button>
          </div>

          <div className="flex items-center mt-4">
            <hr
              className="flex-1 border-t-2 border-secondary mr-3"
              style={{ borderWidth: "1px" }}
            />
            <span className="text-secondary text-sm font-medium">atau</span>
            <hr
              className="flex-1 border-t-2 border-secondary ml-3"
              style={{ borderWidth: "1px" }}
            />
          </div>

          {/* <div className="flex flex-col items-center mt-4 gap-y-[10px]">
            <button className="border rounded-[8px] h-[40px] w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline hover:bg-secondary hover:text-white font-regular text-[14px]">
              <div className="flex items-center justify-center gap-4">
                <img src={NeracaIcon} alt="loading" className="hover:" />
                <span className="">Masuk dengan Neraca Ruang</span>
              </div>
            </button>
            
            <button className="border rounded-[8px] h-[40px] w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline hover:bg-secondary hover:text-white font-regular text-[14px]">
              <div className="flex items-center justify-center gap-4">
                <img src={AppleIcon} alt="loading" className="hover:" />
                <span className="">Masuk dengan Apple</span>
              </div>
            </button>

            <button className="border rounded-[8px] h-[40px] w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline hover:bg-secondary hover:text-white font-regular text-[14px]">
              <div className="flex items-center justify-center gap-4">
                <img src={GoogleIcon} alt="loading" className="hover:" />
                <span className="">Masuk dengan Google</span>
              </div>
            </button>

            <button className="border rounded-[8px] h-[40px] w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline hover:bg-secondary hover:text-white font-regular text-[14px]">
              <div className="flex items-center justify-center gap-4">
                <img src={MicrosoftIcon} alt="loading" className="hover:" />
                <span className="">Masuk dengan Microsoft</span>
              </div>
            </button>
          </div> */}

          <div className="flex items-center justify-center mt-4 font-regular text-[14px] text-secondary">
            <span>Belum memiliki akun?</span>
            <span className="ml-1">
              <Link
                to="/register"
                className="font-bold"
                style={{ color: "#24445A" }}
              >
                Daftar
              </Link>
            </span>
          </div>

        </form>
      </div>
    </section>
  )
}

export default Masuk