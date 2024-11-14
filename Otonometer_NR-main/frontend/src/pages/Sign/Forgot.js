import React from "react";
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
import { Link, json, useNavigate } from "react-router-dom";
import AppleIcon from "../../assets/icons/apel.svg";
import GoogleIcon from "../../assets/icons/gugol.svg";
import MicrosoftIcon from "../../assets/icons/microsoft.svg";
import NeracaIcon from "../../assets/icons/neracaruangqu.svg";
import axios from "axios";
import qs from "qs";
import { GoogleLogin } from "@leecheuk/react-google-login";
import { useGoogleLogin } from "@leecheuk/react-google-login";
import { gapi } from "gapi-script";
import { func } from "prop-types";

class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  goBack = () => {
    window.history.back();
  };

  isEmailValid = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  sendOTP = async () => {
    const { email } = this.state;
    try {
      const response = await axios.post(
        process.env.REACT_APP_URL_API + "/reset-password",
        { email }
      );
      console.log("OTP sent:", response.data);
    } catch (error) {
      console.error("Sending OTP failed:", error);
    }
  };

  checkEmailExistence = async (email) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_URL_API + "/check-email-exist",
        { email }
      );
      return response.data.exist;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error(
          "Failed to check email existence:",
          error.response.data.message
        );
        return true;
      } else {
        console.error("Failed to check email existence:", error);
        return false;
      }
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    const emailExists = await this.checkEmailExistence(email);

    if (!email) {
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
        allowOutsideClick: false,
      });
      return;
    }

    if (!this.isEmailValid(email)) {
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
      return;
    }

    if (!email.includes('@')) {
      Swal.fire({
        title: "Perhatian!",
        text: "Email harus mengandung simbol '@'!",
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

    if (emailExists) {
      this.setState({ isLoading: true });
      await this.sendOTP();
      this.setState({ isLoading: false });
      await this.promptOTP();
    } else {
      Swal.fire({
        title: "Perhatian!",
        text: "Email belum terdaftar silahkan masukan Email yang sudah terdaftar.",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#24445A",
        customClass: {
          icon: "no-border",
          title: "title-icon-errorr",
          text: "text-icon",
          confirmButton: "confirm-icon",
        },
        allowOutsideClick: false,
      });
    }
  };

  promptOTP = async () => {
    let timerInterval;
    let countdown = 60;
    let canResend = false;
    const startTimer = () => {
      canResend = false;
      const resendButton = document.querySelector(".swal2-resend-button");
      if (resendButton) resendButton.disabled = true;
      const timerText = document.querySelector(".swal2-timer-text");
      timerInterval = setInterval(() => {
        const minutes = Math.floor(countdown / 60);
        let seconds = countdown % 60;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        timerText.textContent = `Timer: ${minutes}:${seconds}`;
        countdown--;
        if (countdown < 0) {
          clearInterval(timerInterval);
          canResend = true;
          if (resendButton) {
            resendButton.disabled = false;
            resendButton.textContent = "Kirim Ulang";
            resendButton.style.color = "#24445A";
          }
        }
      }, 1000);
    };

    const handleverif = async (enteredOTP) => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_URL_API + "/check-otp",
          new URLSearchParams({
            email: this.state.email,
            otp: enteredOTP,
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        Swal.fire({
          iconHtml:
            '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
          title: "Berhasil!",
          text: "Berhasil verifikasi. Silahkan ubah kata sandi.",
          confirmButtonText: "Lanjut",
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
            sessionStorage.setItem("savedOTP", enteredOTP);
            window.location.href = "/Ubah-Sandi";
          }
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Verifikasi OTP gagal. Silahkan coba lagi.",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#CD3838",
          customClass: {
            title: "title-icon-error",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
          allowOutsideClick: false,
        }).then(() => {
          this.promptOTP();
        });
      }
    };

    const { value: enteredOTP } = await Swal.fire({
      title: "Verifikasi Email Anda!",
      html: `
        <div style="text-align: center; margin-bottom: 10px; font-size: 15px">Kode OTP</div>
        <input id="otp" class="swal2-input otp-input" maxlength="6" style="width: 12em; text-align: center;" />
        <br>
        <br>
        <br>
        <button class="swal2-resend-button resend-button" ${
          canResend ? "" : "disabled"
        }>Kirim Ulang</button>
        <div class="swal2-timer-text" style="font-size: 15px">Timer: ${countdown}s</div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const enteredOTP = document.getElementById("otp").value;
        if (
          !enteredOTP ||
          enteredOTP.length !== 6 ||
          !/^\d+$/.test(enteredOTP)
        ) {
          Swal.showValidationMessage("Kode OTP harus berupa 6 digit angka.");
          return false;
        }
        return enteredOTP;
      },
      confirmButtonText: "Verifikasi",
      confirmButtonColor: "#24445A",
      cancelButtonText: "Batalkan",
      cancelButtonColor: "#CD3838",
      showCancelButton: true,
      customClass: {
        text: "text-icon",
        confirmButton: "otp-button simpan-button",
        cancelButton: "otp-button batalkan-button",
      },
      allowOutsideClick: false,
      didOpen: () => {
        startTimer();
        const resendButton = document.querySelector(".swal2-resend-button");
        resendButton.addEventListener("click", () => {
          if (canResend) {
            this.sendOTP();
            countdown = 60;
            startTimer();
          }
        });
      },
    });

    if (enteredOTP) {
      handleverif(enteredOTP);
    }
  };

  render() {
    const { isLoading } = this.state;
    const { email } = this.state;
    return (
      <div className="forgot-container">
        {isLoading && (
          <div id="loadingg" className="absolute left-0 top-0 right-0 bottom-0 flex justify-center items-center z-50">
            <div className="w-[400px] h-[250px] bg-white rounded-[10px] flex flex-col justify-center items-center drop-shadow-lg">
              <div className="holds-the-iframe w-[80px] h-[80px]"></div>
              <div className="text-secondary font-semibold mt-[25px]">Silakan tunggu sebentar...</div>
            </div>
          </div>
        )}

      <div className="flex flex-col md:flex-row h-screen">
        {/* Bagian Kiri: Ilustrasi */}
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
          onClick={this.goBack}
          className="flex align-top lg:ml-[50px] ml-[35px] mt-[50px] h-[20px] w-[20px] object-contain hover:scale-110 transform transition duration-300 lg:mb-[0px] mb-[40px]
        "
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
            onSubmit={this.handleSubmit}
            noValidate
            className="max-w-md bg-white rounded px-8 pt-6 pb-8 lg:mb-[0px] mb-[0px] md:mb-[350px] lg:ml-[0px] ml-[0px] md:ml-[30px]"
          >
            <h1 className="text-[45px] font-bold mb-4 text-left text-secondary">
              Lupa Kata Sandi
            </h1>
            <p className="text-sm mb-8 text-secondary">
              Masuk ke akun Anda untuk mengakses{" "}
              <span className="font-bold">fitur lainnya</span> Otonometer
            </p>
            <div className="mb-4">
              <label
                className="block text-secondary text-sm font-medium mb-[4px] text-[14px]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="border rounded-[8px] h-[40px] w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline text-[14px] font-regular"
                id="email"
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="text-white py-2 px-4 rounded-[8px] focus:outline-none text-[14px] font-medium focus:shadow-outline w-full bg-secondary hover:bg-third"
                type="submit"
                onClick={() => {
                  sessionStorage.setItem("savedEmail", email);
                }}
              >
                Kirim
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default Forgot;
