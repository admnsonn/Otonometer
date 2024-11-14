import React, { useState, useEffect } from "react";
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
  const [formData, setFormData] = useState({
    email: sessionStorage.getItem("savedEmail") || "",
    otp: sessionStorage.getItem("savedOTP") || "",
    password: "",
    password_confirmation: "",
    showPassword: false,
    showPassword2: false,
  });
  const { password, password_confirmation, showPassword, showPassword2 } =
    formData;

  const [wajibPassword, setWajibPassword] = useState(false);
  const [wajibConfirmPassword, setWajibConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "password") {
      setWajibPassword(false);
      setPasswordError(false);
    }
    if (name === "password_confirmation") {
      setWajibConfirmPassword(false);
      setPasswordError(false);
    }
  };

  const togglePasswordVisibility = () => {
    setFormData((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const togglePasswordVisibility2 = () => {
    setFormData((prevState) => ({
      ...prevState,
      showPassword2: !prevState.showPassword2,
    }));
  };

  const goBack = () => {
    window.history.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !password_confirmation) {
      setWajibPassword(true);
      setWajibConfirmPassword(true);
      setPasswordError(true);
      Swal.fire({
        title: "Perhatian!",
        text: "Harap isi kata sandi terlebih dahulu!",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#24445a",
        customClass: {
          title: "title-icon-errorr",
          text: "text-icon",
          confirmButton: "confirm-icon",
        },
      });
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    if (!passwordRegex.test(password)) {
      Swal.fire({
        title: "Perhatian!",
        text: "Kata Sandi harus memiliki setidaknya 8 karakter, huruf kapital, huruf kecil, angka, dan karakter khusus.",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#24445A",
        customClass: {
          icon: "no-border",
          title: "title-icon-errorr",
          text: "text-icon",
          confirmButton: "confirm-icon",
        },
      });
      return;
    }

    try {
      const response = await axios.post(
        process.env.REACT_APP_URL_API + "/verify-password",
        formData
      );

      if (response.status === 200) {
        Swal.fire({
          iconHtml:
            '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
          icon: "success",
          title: "Berhasil!",
          text: "Kata sandi berhasil diganti. Harap masuk kembali menggunakan kata sandi yang baru.",
          confirmButtonText: "Berhasil",
          confirmButtonColor: "#27AE60",
          customClass: {
            icon: "no-border",
            title: "title-icon",
            text: "text-icon",
            confirmButton: "confirm-icon",
            popup: "swal2-popup",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/Masuk";
          }
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          icon: "error",
          text: "Terdapat masalah pada sistem. Silakan coba lagi nanti!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Kata sandi baru tidak boleh sama dengan kata sandi lama.",
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

  useEffect(() => {
    if (!passwordError) {
      setWajibPassword(!password);
      setWajibConfirmPassword(!password_confirmation);
    }
  }, [passwordError, password, password_confirmation]);

  useEffect(() => {
    setWajibPassword(false);
    setWajibConfirmPassword(false);
    setPasswordError(false);
  }, []);

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
      <button
        onClick={goBack}
        className="flex align-top lg:ml-[50px] ml-[35px] mt-[50px] h-[20px] w-[20px] object-contain hover:scale-110 transform transition duration-300 lg:mb-[0px] mb-[40px]"
      >
        <FontAwesomeIcon
          icon={faArrowCircleLeft}
          color="#24445A"
          className="fa-2x"
        />
      </button>
      {/* Bagian Kanan: Form Login */}
      <div className="md:w-1/2 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-md bg-white rounded px-8 pt-6 pb-8 lg:mb-[0px] mb-[0px] md:mb-[350px] lg:ml-[0px] ml-[0px] md:ml-[30px]"
        >
          <h1 className="text-[44px] font-bold mb-4 text-left text-secondary">
            Ubah Kata Sandi
          </h1>
          <div className="mb-[24px]">
            <div className="mb-[4px]">
              <label
                className={`block text-sm font-medium mb-[4px] text-[14px] ${
                  wajibPassword || passwordError
                    ? "text-red-600"
                    : " text-secondary "
                }`}
                htmlFor="password"
              >
                {wajibPassword || passwordError ? "Kata Sandi*" : "Kata Sandi"}
              </label>
              <div className="relative">
                <input
                  className={`w-full px-3 py-2 placeholder-gray-400 text-gray-700 bg-white border ${
                    wajibPassword || passwordError
                      ? "border-red-600"
                      : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none sm:text-sm`}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan Kata Sandi"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-transparent rounded-r-lg focus: outline-none"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    color="#24445A"
                  />
                </button>
              </div>
            </div>
            <p className="text-red-500 text-[12px] ">
              Panjang password minimal 8 karakter
            </p>
            <p className="text-red-500 text-[12px]">
              Password harus mengandung huruf kapital dan huruf kecil
            </p>
            <p className="text-red-500 text-[12px]">
              Password harus mengandung setidaknya satu angka
            </p>
            <p className="text-red-500 text-[12px]">
              Password harus mengandung setidaknya satu karakter khusus
            </p>
            <div className="mt-[15px]">
              <label
                className={`block text-sm font-medium mb-[4px] text-[14px] ${
                  wajibConfirmPassword || passwordError
                    ? "text-red-600"
                    : " text-secondary "
                }`}
                htmlFor="password_confirmation"
              >
                {wajibConfirmPassword || passwordError
                  ? "Konfirmasi Kata Sandi*"
                  : "Konfirmasi Kata Sandi"}
              </label>
              <div className="relative">
                <input
                  className={`w-full px-3 py-2 placeholder-gray-400 text-gray-700 bg-white border ${
                    wajibConfirmPassword || passwordError
                      ? "border-red-600"
                      : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none sm:text-sm`}
                  id="password_confirmation"
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Masukkan Kata Sandi"
                  name="password_confirmation"
                  value={password_confirmation}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility2}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-transparent rounded-r-lg focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={showPassword2 ? faEye : faEyeSlash}
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
            >
              Ubah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Ubah;
