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
import { Link, NavLink, json, useNavigate } from "react-router-dom";
import AppleIcon from "../../assets/icons/apel.svg";
import GoogleIcon from "../../assets/icons/gugol.svg";
import MicrosoftIcon from "../../assets/icons/microsoft.svg";
import NeracaIcon from "../../assets/icons/neracaruangqu.svg";
import axios from "axios";
import qs from "qs";
import { GoogleLogin } from "@leecheuk/react-google-login";
import { useGoogleLogin } from "@leecheuk/react-google-login";
import { gapi } from "gapi-script";
import Loadernya from "../../assets/loadernya.gif";
import withReactContent from "sweetalert2-react-content";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import "../../style/Components.css";
import Loader from "../../assets/loadernya.gif";

const Login = () => {
  useEffect(()=>{
    if(sessionStorage.getItem("token")!==null){
      if(sessionStorage.getItem("idprovinsi_profile")!==null){
        return window.location.href = "/"
      }else{
        return window.location.href = "/Edit-Profile-Google";
      }
    }else{
      sessionStorage.clear();
    }
  },[sessionStorage.getItem("token")])
  
  const [state, setState] = useState({
    kondisiAwal: true,
    email: "",
    password: "",
    showPassword: false,
    isLoggedIn: false
  });
  const { email, password, showPassword } = state;
  const goBack = () => {
    window.location.href = "/"
  };

  const [emailUser, setEmailUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  
  const handleChange = (e) => {
    setEmailUser(e.target.value);
  };
  const handleChangePass = (e) => {
    setPasswordUser(e.target.value)
  };

  const togglePasswordVisibility = () => {
    setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };
  useEffect(()=>{
    if(emailUser === "" && state.kondisiAwal === false){
      setGarisEmail(true)
    }else{
      setGarisEmail(false)
    }
  },[emailUser])
  useEffect(()=>{
    if(passwordUser === "" && state.kondisiAwal === false){
      setGarisPassword(true)
    }else{
      setGarisPassword(false)
    }
  },[passwordUser])

  const checkEmailExistence = async (email) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_URL_API+"/check-email-exist",
        { email }
      );
      return response.data.exist;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error(
          "Failed to check email existence:",
          error.response.data.message
        );
        return true; // Email sudah terdaftar
      } else {
        console.error("Failed to check email existence:", error);
        return false;
      }
    }
  };

  // const onProgressAPI = () =>{
  //   return(
  //     <div className="flex w-screen h-screen items-center justify-center">
  //       <div className="flex flex-col w-[400px] h-[250px] items-center justify-center text-secondary bg-white rounded-[20px] drop-shadow-md">
  //         <img src={Loadernya} alt="loading" className="w-[60px]" />
  //         <p className="text-[20px] font-semibold mt-[20px]">Silakan tunggu sebentar...</p>
  //       </div>
  //     </div>
  //   )
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { email } = state;
    const isEmailValid = /\S+@\S+\.\S+/.test(emailUser);
    const emailExists = await checkEmailExistence(emailUser);
    
    if(emailUser === ""){
      setGarisEmail(true)
      Swal.fire({
        title: "Perhatian!",
        text: "Silakan isi email terlebih dahulu.",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#24445A",
        customClass: {
          icon: "no-border",
          title: "title-icon-errorr",
          text: "text-icon",
          confirmButton: "confirm-icon",
        },
      });
    }else if(emailUser !== ""){
      setGarisEmail(false)
    }
    if (passwordUser === ""){
      setGarisPassword(true)
      Swal.fire({
        title: "Perhatian!",
        text: "Silakan isi kata sandi terlebih dahulu.",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#24445A",
        customClass: {
          icon: "no-border",
          title: "title-icon-errorr",
          text: "text-icon",
          confirmButton: "confirm-icon",
        },
      });
    }else if (passwordUser !== ""){
      setGarisPassword(false)
    }

    if(emailUser !== "" && passwordUser !== ""){
      if (isEmailValid) {
        if (emailExists) {
          document.getElementById("loadingg").classList.remove("hidden");
          try {
            setState({ isLoggedIn: true });
          } catch (error) {
            Swal.fire({
              title: "Gagal!",
              icon: "error",
              text: "Terdapat kesalahan, coba lagi nanti.",
              confirmButtonText: "Tutup",
              confirmButtonColor: "#CD3838",
              customClass: {
                title: "title-icon-error",
                text: "text-icon",
                confirmButton: "confirm-icon",
              },
            });
          }
          var data = new URLSearchParams();
          data.append("email", emailUser);
          data.append("password", passwordUser);
          console.log(data.toString());
          var xhr = new XMLHttpRequest();
          xhr.onload = function () {
            console.log(JSON.parse(this.responseText));
            var response = JSON.parse(this.responseText);
            if (response.status) {
              sessionStorage.setItem("token", response.token);
              var xhr_profile = new XMLHttpRequest();
              xhr_profile.onload = function () {
                var data_profile = JSON.parse(this.responseText).data;
                sessionStorage.setItem("titleUser", data_profile.title);
                sessionStorage.setItem("namaUser", data_profile.name);
                sessionStorage.setItem("emailUser", data_profile.email);
                sessionStorage.setItem("isverif", data_profile.is_verified);
                sessionStorage.setItem("member", data_profile.id)
                if(data_profile.id_wilayah == 543 || data_profile.id_wilayah == 544 || data_profile.id_wilayah == 545 || data_profile.id_wilayah == 546 || data_profile.id_wilayah == 547 || data_profile.id_wilayah == 548){
                  sessionStorage.setItem("idprovinsi", 149);
                  sessionStorage.setItem("idkota", 549);
                  sessionStorage.setItem("idwilayah", 549);
                  sessionStorage.setItem("idprovinsi_profile", 149);
                  sessionStorage.setItem("idkota_profile", data_profile.id_wilayah);
                  sessionStorage.setItem("namaprovinsi", data_profile.wilayah_info.nama_provinsi);
                  sessionStorage.setItem("namaprovinsi_profile", data_profile.wilayah_info.nama_provinsi);
                  sessionStorage.setItem("namakota_profile", data_profile.wilayah_info.nama);
                  sessionStorage.setItem("namakota", "Kota Jakarta");
                }else{
                  sessionStorage.setItem("idprovinsi", data_profile.id_province);
                  sessionStorage.setItem("idkota", data_profile.id_wilayah);
                  sessionStorage.setItem("idwilayah", data_profile.id_wilayah);
                  sessionStorage.setItem("idprovinsi_profile", data_profile.id_province);
                  sessionStorage.setItem("idkota_profile", data_profile.id_wilayah);
                  sessionStorage.setItem("namaprovinsi", data_profile.wilayah_info.nama_provinsi);
                  sessionStorage.setItem("namaprovinsi_profile", data_profile.wilayah_info.nama_provinsi);
                  sessionStorage.setItem("namakota_profile", data_profile.wilayah_info.nama);
                  sessionStorage.setItem("namakota", data_profile.wilayah_info.nama);
                }
              };
              xhr_profile.open(
                "GET",
                process.env.REACT_APP_URL_API+"/profile",
                false
              );
              xhr_profile.setRequestHeader(
                "Authorization",
                "Bearer " + response.token
              );
              xhr_profile.send();
              Swal.fire({
                iconHtml:
                    '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
                title: "Berhasil!",
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
                  document.getElementById("loadingg").classList.add("hidden");
                }
              });
            } else {
              Swal.fire({
                title: "Gagal!",
                icon: "error",
                text: "Kata sandi salah. Silakan coba lagi.",
                confirmButtonText: "Tutup",
                confirmButtonColor: "#CD3838",
                customClass: {
                  title: "title-icon-error",
                  text: "text-icon",
                  confirmButton: "confirm-icon",
                },
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  document.getElementById("loadingg").classList.add("hidden");
                }
              });
            }
          };
          xhr.open("POST", process.env.REACT_APP_URL_API+"/login");
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.send(data.toString());
        }else if(!emailExists){
          Swal.fire({
            title: "Perhatian!",
            text: "Email belum terdaftar. Silakan ke halaman Daftar untuk melakukan pendaftaran akun.",
            confirmButtonText: "Tutup",
            confirmButtonColor: "#24445A",
            customClass: {
              icon: "no-border",
              title: "title-icon-errorr",
              text: "text-icon",
              confirmButton: "confirm-icon",
            },  
          });
        }  
      } else if (!isEmailValid) {
        Swal.fire({
          title: "Perhatian!",
          text: "Email tidak valid!",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#24445A",
          customClass: {
            icon: "no-border",
            title: "title-icon-errorr",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
        });
      }
    }else if(emailUser === "" && passwordUser === ""){
      Swal.fire({
        title: "Perhatian!",
        text: "Silakan isi email dan kata sandi terlebih dahulu.",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#24445A",
        customClass: {
          icon: "no-border",
          title: "title-icon-errorr",
          text: "text-icon",
          confirmButton: "confirm-icon",
        },
      });
    }
  };

  const MySwal = withReactContent(Swal);
  const [dataWilayahnya, setDataWilayah] = useState();
  const LoginGoogle = () => {
    
    const responseGoogle = (response) => {
      console.log(response);
    };

    const toDataURL = (url, callback, errorCallback) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status === 200) {
          var reader = new FileReader();
          reader.onloadend = function () {
            callback(reader.result);
          };
          reader.readAsDataURL(xhr.response);
        } else {
          errorCallback(xhr.status);
        }
      };
      xhr.onerror = function () {
        errorCallback(xhr.status);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
      document.getElementById("loadingg").classList.remove("hidden");
    };
    
    const onSuccess = (response) => {
      const defaultProfileImage = 'path/to/default/profile/image.png';
      toDataURL(response.profileObj.imageUrl, function (dataUrl) {
        var dataWilayahh = true;
        var data = new URLSearchParams();
        data.append("socialite_id", response.googleId);
        data.append("socialite_name", "google");
        data.append("email", response.profileObj.email);
        data.append("name", response.profileObj.name);
        data.append("photo", dataUrl);
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          var loginResponse = JSON.parse(this.responseText);
          if (loginResponse.status) {
            
            var xhr_profile = new XMLHttpRequest();
            xhr_profile.onload = function () {
              var data_profile = JSON.parse(this.responseText).data;
              sessionStorage.setItem("titleUser", data_profile.title);
              sessionStorage.setItem("namaUser", data_profile.name);
              sessionStorage.setItem("emailUser", data_profile.email);
              sessionStorage.setItem("isverif", data_profile.is_verified);
              sessionStorage.setItem("member", data_profile.id);
    
              if(data_profile.wilayah_info === null){
                setDataWilayah(false);
                dataWilayahh = false
              } else {
                setDataWilayah(true);
              }
    
              if (data_profile.id_province != null && data_profile.id_province != "") {
                sessionStorage.setItem("idprovinsi", data_profile.id_province);
              }
    
              if (data_profile.id_wilayah != null && data_profile.id_wilayah != "") {
                if ([543, 544, 545, 546, 547, 548].includes(data_profile.id_wilayah)) {
                  sessionStorage.setItem("idkota", 549);
                  sessionStorage.setItem("idwilayah", 549);
                  sessionStorage.setItem("idkota_profile", data_profile.id_wilayah);
                } else {
                  sessionStorage.setItem("idkota", data_profile.id_wilayah);
                  sessionStorage.setItem("idwilayah", data_profile.id_wilayah);
                  sessionStorage.setItem("idkota_profile", data_profile.id_wilayah);
                }
              }
    
              if (data_profile.id_province != null && data_profile.id_province != "") {
                sessionStorage.setItem("idprovinsi_profile",data_profile.id_province);
              }
    
              if (data_profile.wilayah_info != null) {
                if ([543, 544, 545, 546, 547, 548].includes(data_profile.id_wilayah)) {
                  sessionStorage.setItem("namaprovinsi",data_profile.wilayah_info.nama_provinsi);
                  sessionStorage.setItem("namaprovinsi_profile",data_profile.wilayah_info.nama_provinsi);
                  sessionStorage.setItem("namakota_profile",data_profile.wilayah_info.nama);
                  sessionStorage.setItem("namakota","Kota Jakarta");
                } else {
                  sessionStorage.setItem("namaprovinsi",data_profile.wilayah_info.nama_provinsi);
                  sessionStorage.setItem("namaprovinsi_profile",data_profile.wilayah_info.nama_provinsi);
                  sessionStorage.setItem("namakota_profile",data_profile.wilayah_info.nama);
                  sessionStorage.setItem("namakota",data_profile.wilayah_info.nama);
                }
              }
            };
    
            xhr_profile.open(
              "GET",
              process.env.REACT_APP_URL_API + "/profile",
              false
            );
            xhr_profile.setRequestHeader(
              "Authorization",
              "Bearer " + loginResponse.token
            );
            xhr_profile.send();
    
            Swal.fire({
              iconHtml:
                '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
              title: "Berhasil!",
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
                sessionStorage.setItem("token", loginResponse.token);
                if(dataWilayahh === false){
                  window.location.href = "/Edit-Profile-Google";
                } else {
                  window.location.href = "/";
                }
              }
            });
          } else {
            Swal.fire({
              iconHtml:
                "<img src='https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihYZPXF44y7OB6l4YYsMNu3Ch8sD5wCW2oyOefMQuMpTcOkFPxlWVCcnvG0Jdp8pleEHWyc-DrJbERHmu8We62KV087J=w1920-h970'",
              title: "ERROR!",
              text: "Harap login terlebih dahulu!",
              confirmButtonText: "Keluar",
              confirmButtonColor: "#CD3838",
              customClass: {
                icon: "no-border",
                title: "title-icon-error",
                text: "text-icon",
                confirmButton: "confirm-icon",
              },
            });
          }
        };
        xhr.onloadend = function () {
          document.getElementById("loadingg").classList.add("hidden");
        };
        xhr.open(
          "POST",
          process.env.REACT_APP_URL_API + "/login/socialite",
          false
        );
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(data.toString());
      }, function () {
        // Fallback to default image if fetching fails
        var dataWilayahh = true;
        var data = new URLSearchParams();
        data.append("socialite_id", response.googleId);
        data.append("socialite_name", "google");
        data.append("email", response.profileObj.email);
        data.append("name", response.profileObj.name);
        data.append("photo", defaultProfileImage);
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          var loginResponse = JSON.parse(this.responseText);
          if (loginResponse.status) {
            
            var xhr_profile = new XMLHttpRequest();
            xhr_profile.onload = function () {
              var data_profile = JSON.parse(this.responseText).data;
              sessionStorage.setItem("titleUser", data_profile.title);
              sessionStorage.setItem("namaUser", data_profile.name);
              sessionStorage.setItem("emailUser", data_profile.email);
              sessionStorage.setItem("isverif", data_profile.is_verified);
              sessionStorage.setItem("member", data_profile.id);
    
              if(data_profile.wilayah_info === null){
                setDataWilayah(false);
                dataWilayahh = false;
              } else {
                setDataWilayah(true);
              }
    
              if (data_profile.id_province != null && data_profile.id_province != "") {
                sessionStorage.setItem("idprovinsi", data_profile.id_province);
              }
    
              if (data_profile.id_wilayah != null && data_profile.id_wilayah != "") {
                if ([543, 544, 545, 546, 547, 548].includes(data_profile.id_wilayah)) {
                  sessionStorage.setItem("idkota", 549);
                  sessionStorage.setItem("idwilayah", 549);
                  sessionStorage.setItem("idkota_profile", data_profile.id_wilayah);
                } else {
                  sessionStorage.setItem("idkota", data_profile.id_wilayah);
                  sessionStorage.setItem("idwilayah", data_profile.id_wilayah);
                  sessionStorage.setItem("idkota_profile", data_profile.id_wilayah);
                }
              }
    
              if (data_profile.id_province != null && data_profile.id_province != "") {
                sessionStorage.setItem("idprovinsi_profile",data_profile.id_province);
              }
    
              if (data_profile.wilayah_info != null) {
                if ([543, 544, 545, 546, 547, 548].includes(data_profile.id_wilayah)) {
                  sessionStorage.setItem("namaprovinsi",data_profile.wilayah_info.nama_provinsi);
                  sessionStorage.setItem("namaprovinsi_profile",data_profile.wilayah_info.nama_provinsi);
                  sessionStorage.setItem("namakota_profile",data_profile.wilayah_info.nama);
                  sessionStorage.setItem("namakota","Kota Jakarta");
                } else {
                  sessionStorage.setItem("namaprovinsi",data_profile.wilayah_info.nama_provinsi);
                  sessionStorage.setItem("namaprovinsi_profile",data_profile.wilayah_info.nama_provinsi);
                  sessionStorage.setItem("namakota_profile",data_profile.wilayah_info.nama);
                  sessionStorage.setItem("namakota",data_profile.wilayah_info.nama);
                }
              }
            };
    
            xhr_profile.open(
              "GET",
              process.env.REACT_APP_URL_API + "/profile",
              true
            );
            xhr_profile.setRequestHeader(
              "Authorization",
              "Bearer " + loginResponse.token
            );
            xhr_profile.send();
    
            Swal.fire({
              iconHtml:
                '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
              title: "Berhasil!",
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
                sessionStorage.setItem("token", loginResponse.token);
                if(dataWilayahh === false){
                  window.location.href = "/Edit-Profile-Google";
                } else {
                  window.location.href = "/";
                }
              }
            });
          } else {
            Swal.fire({
              iconHtml:
                "<img src='https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihYZPXF44y7OB6l4YYsMNu3Ch8sD5wCW2oyOefMQuMpTcOkFPxlWVCcnvG0Jdp8pleEHWyc-DrJbERHmu8We62KV087J=w1920-h970'",
              title: "ERROR!",
              text: "Harap login terlebih dahulu!",
              confirmButtonText: "Keluar",
              confirmButtonColor: "#CD3838",
              customClass: {
                icon: "no-border",
                title: "title-icon-error",
                text: "text-icon",
                confirmButton: "confirm-icon",
              },
            });
          }
        };
        xhr.onloadend = function () {
          document.getElementById("loadingg").classList.add("hidden");
        };
        xhr.open(
          "POST",
          process.env.REACT_APP_URL_API + "/login/socialite",
          false
        );
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(data.toString());
      });
    };
    

    const onFail = (response) => {
      console.log("onFailll",response);
      document.getElementById("loadingg").classList.add("hidden");
    };

    const start = () => {
      gapi.client.init({
        clientId:
          "123623149304-teco5205gvv6otp02l8b8mfhqr7otpuv.apps.googleusercontent.com",
        scope: "",
      });
    };
    const first = () => {
      gapi.load("client:auth2", start);
    };

    first();
    return (
      <GoogleLogin
        clientId="123623149304-teco5205gvv6otp02l8b8mfhqr7otpuv.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            className="border mt-2 rounded-[8px] h-[40px] w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline hover:bg-secondary hover:text-white font-regular text-[14px]"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <div className="flex items-center justify-center gap-4">
              <img src={GoogleIcon} alt="loading" className="hover:" />
              <span className="">Masuk dengan Google</span>
            </div>
          </button>
          // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
        )}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFail}
        cookiePolicy={"single_host_origin"}
      />
    );
  };

  const { isLoggedIn } = state;
  const [garisEmail, setGarisEmail] = useState(false);
  const [garisPassword, setGarisPassword] = useState(false);
  return (
    <div className="relative">
      <div id="loadingg" className="hidden absolute left-0 top-0 right-0 bottom-0 flex justify-center items-center z-50">
        <div className="w-[400px] h-[250px] bg-white rounded-[10px] flex flex-col justify-center items-center drop-shadow-lg">
          <div className="holds-the-iframe w-[80px] h-[80px]"></div>
          <div className="text-secondary font-semibold mt-[25px]">Silakan tunggu sebentar...</div>
        </div>
      </div>
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
        <button
          onClick={goBack}
          className="flex align-top lg:ml-[50px] ml-[35px] mt-[50px] h-[20px] w-[20px] object-contain hover:scale-110 transform transition duration-300 lg:mb-[0px] mb-[40px]
        "
        >
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            color="#24445A"
            className="fa-2x"
          />
        </button>
        {/* {onProgressAPI()} */}
        {/* Bagian Kanan: Form Login */}
        <div className="md:w-1/2 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="max-w-md bg-white rounded px-8 pt-6 pb-8 lg:mb-[0px] mb-[0px] md:mb-[350px] lg:ml-[0px] ml-[0px] md:ml-[30px]"
          >
            <h1 className="text-6xl font-bold mb-4 text-left text-secondary">
              Masuk
            </h1>
            <p className="text-sm mb-8 text-secondary">
              Masuk ke akun Anda untuk mengakses{" "}
              <span className="font-bold">fitur lainnya</span> Otonometer
            </p>
            <div className="mb-4">
              <label
                className={`block text-sm font-medium mb-[4px] text-[14px] ${garisEmail ? "text-red-600" :"text-secondary"}`}
                htmlFor="email"
              >
                {garisEmail ? "Email*" :"Email"}
              </label>
              <input
                className={`w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[14px] items-center leading-tight focus:outline-none focus:shadow-outline font-regular whitespace-nowrap flex justify-between ${garisEmail ? "border-red-600" :""}`}
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={emailUser}
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative">
              <label
                className={`block text-sm font-medium mb-[4px] text-[14px] ${garisPassword ? "text-red-600" :"text-secondary"}`}
                htmlFor="password"
              >
                {garisPassword ? "Password*" :"Password"}
              </label>
              <div className="flex justify-between"></div>
              <input
                className={`w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[14px] items-center leading-tight focus:outline-none focus:shadow-outline font-regular whitespace-nowrap flex justify-between ${garisPassword ? "border-red-600" :""}`}
                id="password"
                type={state.showPassword ? "text" : "password"}
                placeholder="Masukkan Kata Sandi"
                name="password"
                value={passwordUser}
                onChange={handleChangePass}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-4"
                style={{ top: "45%", color: "#24445A" }}
              >
                <FontAwesomeIcon
                  icon={state.showPassword ? faEye : faEyeSlash}
                  color="#24445A"
                />
              </button>
            </div>
            <div className="text-right mb-6 mt-2 text-medium text-[14px] text-secondary hover:text-third">
              <Link to="/Lupa-Sandi">Lupa Kata Sandi?</Link>
            </div>
            <div className="flex items-center justify-center mb-[10px]">
              <button
                className="text-white py-2 px-4 rounded-[8px] focus:outline-none text-[14px] font-medium focus:shadow-outline w-full bg-secondary hover:bg-third"
                type="submit"
                onClick={handleSubmit}
              >
                Masuk
              </button>
            </div>

            <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-center md:gap-10">
              <div className="border-t-2 border-[#24445A] ml-4 md:ml-0 md:mr-4 md:ml-4 md:w-1/4 lg:w-1/5"></div>
              <div>
                <span className="text-[#24445A] text-sm font-medium">atau</span>
              </div>
              <div className="border-t-2 border-[#24445A] ml-4 md:mr-0 md:ml-4 md:w-1/4 lg:w-1/5"></div>
            </div>
            <LoginGoogle />
            <div className="flex items-center justify-center mt-4 font-regular text-[14px] text-secondary">
              <span>Belum memiliki akun?</span>
              <span className="ml-1">
                <Link
                  to="/daftar"
                  className="font-bold"
                  style={{ color: "#24445A" }}
                >
                  Daftar
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
      
  );
}

export default Login;
