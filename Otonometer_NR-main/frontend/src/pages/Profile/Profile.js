import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import map from "../../assets/icons/peta.png";
import "react-toastify/dist/ReactToastify.css";
import ProfileImage from "../../assets/icons/iconuser.png";
import Terverifikasi from "../../assets/verif.png";
import BelumVerif from "../../assets/unverif.png";
import geometry from "../../assets/8.svg";
import sortIcon from "../../assets/SortingAktivitas.png";
import geometrys from "../../assets/7.svg";
import back from "../../assets/back.svg";
import pindah from "../../assets/icons/koleksii.svg";
import hapus from "../../assets/icons/pindah.svg";
import geometryss from "../../assets/9.svg";
import move from "../../assets/icons/move.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendar,
  faChevronDown,
  faChevronUp,
  faEye,
  faEyeSlash,
  faDeleteLeft,
  faTrash,
  faTrashAlt,
  faSort,
  faSortAsc,
  faSortAlphaAsc,
  faSortAmountAsc,
  faSortNumericAsc,
  faSortDown,
  faSortUp,
  faPlus,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NavLink, Link, useFetcher } from "react-router-dom";
import imgcard from "../../assets/JELAJAH2.png";
import imgcard2 from "../../assets/landingpageUtak.svg";
import imgcard3 from "../../assets/landingpageBerkaca.svg";
import deleteicon from "../../assets/Delete.png";
import editicon from "../../assets/Edit.png";
import { func } from "prop-types";

const Profile = () => {
  sessionStorage.removeItem("historyParentDataset");
  sessionStorage.removeItem("historyChildDataset");
  sessionStorage.removeItem("historyChildDatasetArray");
  sessionStorage.removeItem("historyTipePeringkat");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  ///GET INFO USER
  ///GET PROFILE USER
  const [titleUser, setTitleUser] = useState("");
  const [namaUser, setNamaUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [provincessID, setProvincessID] = useState(null);
  const [provincessNama, setProvincessNama] = useState(null);
  const [city, setCity] = useState(null);
  const [namaCity, setNamaCity] = useState(null);
  const [birthUser, setBirthUser] = useState(null);
  const [postalCodeUser, setPostalCodeUser] = useState(null);
  const [imageUser, setImageUser] = useState("");
  const [askVerified, SetAskVerified] = useState(null);

  const tokenUser = sessionStorage.getItem("token");
  useEffect(() => {
    if (
      sessionStorage.getItem("token") == null ||
      sessionStorage.getItem("token") == ""
    ) {
      return (window.location.href = "/");
    }
  }, [sessionStorage.getItem("token")]);
  ///GET INFO USER
  const [totalDownload, setTotalDownload] = useState(null);
  const [totalShare, setShare] = useState(null);
  const [totalSave, setSave] = useState(null);

  document.addEventListener("DOMContentLoaded", function () {
    if (window.location.hash === "#scroll") {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  });
  function updateInfoDelete() {
    if (tokenUser !== null) {
      const xhr_profile = new XMLHttpRequest();
      xhr_profile.onload = function () {
        const data_profile = JSON.parse(xhr_profile.responseText).data;
        setSave(data_profile.total_save);
      };
      xhr_profile.open("GET", process.env.REACT_APP_URL_API + "/profile", true);
      xhr_profile.setRequestHeader("Authorization", "Bearer " + tokenUser);
      xhr_profile.send();
    }
  }
  useEffect(() => {
    const xhr_profile = new XMLHttpRequest();
    xhr_profile.onload = function () {
      const data_profile = JSON.parse(xhr_profile.responseText).data;
      setEmailUser(data_profile.email);
      setTitleUser(data_profile.title);
      setNamaUser(data_profile.name);
      setProvincessID(data_profile.id_province);
      setProvincessNama(data_profile.wilayah_info.nama_provinsi);
      setCity(data_profile.wilayah_info.id);
      setNamaCity(data_profile.wilayah_info.nama);
      setBirthUser(data_profile.tanggal_lahir);
      setPostalCodeUser(data_profile.postal_code);
      setImageUser(data_profile.image);
      SetAskVerified(data_profile.is_verified);
      setTotalDownload(data_profile.total_download);
      setShare(data_profile.total_share);
      setSave(data_profile.total_save);
    };
    xhr_profile.open("GET", process.env.REACT_APP_URL_API + "/profile", true);
    xhr_profile.setRequestHeader("Authorization", "Bearer " + tokenUser);
    xhr_profile.send();
  }, [tokenUser]);

  const [activeTab, setActiveTab] = useState("activity");
  const [selectedTab, setSelectedTab] = useState("all");

  const toggleTab = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setSelectedTab("all");
      setIsStepOne(true);
    }
  };
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup); // Mengubah nilai state showPopup menjadi sebaliknya
  };
  const [showPopupPass, setShowPopupPass] = useState(false);
  const togglePopupPass = () => {
    setShowPopupPass(!showPopupPass); // Mengubah nilai state showPopup menjadi sebaliknya
  };
  const handleFormSebelum = () => {
    setStep(step - 1);
  };

  // FORM UBAH KATA SANDI
  const formArraykata = [1, 2, 3];
  const [formNokata, setFormNokata] = useState(formArraykata[0]);
  const [statekata, setStatekata] = useState({
    password: "",
    showPassword: false,
    newPassword: "",
    showNewPassword: false,
    newPassword_confirmation: "",
    showNewPassword2: false,
  });

  const togglePasswordVisibility = () => {
    setStatekata((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };
  const togglePasswordVisibility2 = () => {
    setStatekata((prevState) => ({
      ...prevState,
      showNewPassword: !prevState.showNewPassword,
    }));
  };
  const togglePasswordVisibility3 = () => {
    setStatekata((prevState) => ({
      ...prevState,
      showNewPassword2: !prevState.showNewPassword2,
    }));
  };

  const inputHandlekata = (e) => {
    setStatekata({
      ...statekata,
      [e.target.password]: e.target.value,
    });
  };
  const inputHandlekataBaru = (e) => {
    setStatekata({
      ...statekata,
      [e.target.newPassword]: e.target.value,
    });
  };
  const inputHandlekataBaruKonfirmasi = (e) => {
    setStatekata({
      ...statekata,
      [e.target.newPassword_confirmation]: e.target.value,
    });
  };
  // DROPDOWN Title
  const [selectedOption, setSelectedOption] = useState("Pilih");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOptionClick = (option) => {
    let formattedOption = "";
    if (option === "Tuan") {
      formattedOption = "Tn";
    } else if (option === "Nyonya") {
      formattedOption = "Ny";
    } else if (option === "Nona") {
      formattedOption = "Nn";
    } else {
      formattedOption = option; // Jika tidak ada pemformatan khusus
    }

    setSelectedOption(formattedOption);
    setDropdownOpen(false);
  };
  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const renderDropdownOptions = () => {
    const options = ["Tuan", "Nyonya", "Nona"];
    return options.map((option, index) => (
      <div
        key={index}
        onClick={() => handleOptionClick(option)}
        className="flex w-[74px] h-[40px] border rounded-[8px] text-secondary py-2 px-3 leading-tight text-[14px] text-center font-regular items-center justify-left hover:bg-[#E4E5F0]"
      >
        <p>{option}</p>
      </div>
    ));
  };

  //DROPDOWN PROVINSI
  var email = emailUser;
  const sendOTP = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_URL_API + "/send-otp",
        { email }
      );
      // console.log("OTP sent:", response.data);
    } catch (error) {
      // console.error("Sending OTP failed:", error);
    }
  };
  const submitBerhasil = async () => {
    let timerInterval;
    let countdown = 60;
    let canResend = false;
    const startTimer = () => {
      canResend = false;
      const resendButton = document.querySelector(".swal2-resend-button");
      if (resendButton) resendButton.disabled = true;
      if (resendButton) resendButton.disabled = true; // Disable resend button
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
            resendButton.disabled = false; // Enable resend button
            resendButton.textContent = "Kirim Ulang";
            resendButton.style.color = "#24445A";
          }
        }
      }, 1000);
    };

    const handleOTPVERIFEMAIL = async (enteredOTP) => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_URL_API + "/verify-email",
          new URLSearchParams({
            email: email,
            otp: enteredOTP,
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        // console.log("OTP checked:", response.data);
        Swal.fire({
          iconHtml:
            '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
          title: "Berhasil!",
          text: "Berhasil verifikasi. Silakan masuk kembali.",
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
            window.location.href = "/Masuk";
          }
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Verifikasi OTP gagal. Silakan coba lagi.",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#CD3838",
          customClass: {
            title: "title-icon-error",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
          allowOutsideClick: false,
        }).then(() => {
          submitBerhasil();
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
            sendOTP();
            countdown = 60;
            startTimer();
          }
        });
      },
    });
    if (enteredOTP) {
      handleOTPVERIFEMAIL(enteredOTP);
    }
  };

  const [peta, setPeta] = useState(null);
  const [koordinatLokasi, setKoordinatLokasi] = useState(null);
  const [infoDaerah, setInfoDaerah] = useState(null);
  const [pinMap, setPinMap] = useState(null);
  const [dataranicon, setDataranicon] = useState(null);
  const [sektoricon, setSektoricon] = useState(null);
  const [datarannama, setDatarannama] = useState(null);
  const [ketinggian, setKetinggian] = useState(null);
  const [sektornama, setSektornama] = useState(null);
  const [luaswilayah, setLuaswilayah] = useState(null);
  const [jumlahpenduduk, setJumlahpenduduk] = useState(null);
  const [nilaisektor, setNilaisektor] = useState(null);
  const [kondisiVerif, setKondisiVerif] = useState(null);

  useEffect(() => {
    if (askVerified === true) {
      setKondisiVerif(Terverifikasi);
    } else if (askVerified === false) {
      setKondisiVerif(BelumVerif);
    }
  }, [askVerified]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      process.env.REACT_APP_URL_API +
        "/wilayah-info?lang=id&wilayah_id=" +
        sessionStorage.getItem("idkota_profile") +
        "&tahun=2022",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPeta(result.data.peta);

        setDataranicon(result.data.dataran_icon);
        setInfoDaerah(result.data.nama);
        setSektoricon(result.data.wilayah_info.sektor_icon);
        if (
          sessionStorage.getItem("idkota_profile") == 543 ||
          544 ||
          545 ||
          546 ||
          547 ||
          548
        ) {
          setKoordinatLokasi(null);
          setPinMap(null);
        } else {
          setKoordinatLokasi(
            result.data.longitude + ", " + result.data.latitude
          );
          setPinMap(map);
        }
        setDatarannama(result.data.dataran_nama);
        setKetinggian(result.data.wilayah_info.ketinggian);
        setSektornama(result.data.wilayah_info.sektor_nama);
        setLuaswilayah(result.data.wilayah_info.luas_wilayah);
        setJumlahpenduduk(result.data.wilayah_info.jumlah_penduduk);
        setNilaisektor(result.data.wilayah_info.nilai_sektor);
      });
  }, []);
  if (jumlahpenduduk != null) {
    var convertStringtoInt = jumlahpenduduk.replaceAll(".", "");
    var data_Penduduk = parseInt(convertStringtoInt) / 1000;
  }
  const handleLogout = async () => {
    sessionStorage.clear();
    window.location.replace("/Masuk");
    window.history.replaceState(null, "", "/Masuk");
  };
  const [step, setStep] = useState(1);
  const sendOTPResetPass = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_URL_API + "/reset-password",
        { email }
      );
    } catch (error) {}
  };
  const OtpResetPassword = async () => {
    let timerInterval;
    let countdown = 60; // Timer countdown in seconds
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

    const handleOTPnya = async (enteredOTP) => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_URL_API + "/check-otp",
          new URLSearchParams({
            email: email,
            otp: enteredOTP,
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        Swal.fire({
          iconHtml:
            '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
          title: "Berhasil!",
          text: "Berhasil verifikasi. Silakan ubah kata sandi.",
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
            setStep(step + 1);
          }
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Verifikasi OTP gagal. Silakan coba lagi.",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#CD3838",
          customClass: {
            title: "title-icon-error",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
          allowOutsideClick: false,
        }).then(() => {
          OtpResetPassword();
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
          // sendOTP();
          if (canResend) {
            // Check if resend button is enabled
            sendOTPResetPass();
            countdown = 60; // Reset countdown
            startTimer(); // Restart timer
          }
        });
      },
    });
    if (enteredOTP) {
      handleOTPnya(enteredOTP);
    }
  };
  const submitPass = async () => {
    const { password } = statekata;
    if (password) {
      var data = new URLSearchParams();
      data.append("email", email);
      data.append("password", statekata.password);
      // console.log(data.toString());
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        // console.log(JSON.parse(this.responseText));
        var response = JSON.parse(this.responseText);
        if (response.status) {
          document.getElementById("loadingg").classList.add("hidden");
          Swal.fire({
            iconHtml:
              '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
            title: "Berhasil!",
            text: "Kata sandi benar! Silakan lanjutkan ke verifikasi akun",
            confirmButtonText: "Lanjutkan",
            confirmButtonColor: "#27AE60",
            customClass: {
              icon: "no-border",
              title: "title-icon",
              text: "text-icon",
              confirmButton: "confirm-icon",
            },
          }).then((result) => {
            OtpResetPassword();
          });
        } else {
          document.getElementById("loadingg").classList.add("hidden");
          Swal.fire({
            title: "Gagal!",
            icon: "error",
            text: "Kata sandi salah. Silakan coba lagi!",
            confirmButtonText: "Tutup",
            confirmButtonColor: "#CD3838",
            customClass: {
              title: "title-icon-error",
              text: "text-icon",
              confirmButton: "confirm-icon",
            },
          });
          setStatekata({ password: statekata.password });
          setStatekata({ showPassword: statekata.showPassword });
        }
      };
      xhr.open("POST", process.env.REACT_APP_URL_API + "/check-password");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data.toString());
    } else if (!password) {
      document.getElementById("loadingg").classList.add("hidden");
      Swal.fire({
        title: "Perhatian!",
        text: "Silakan isi kata sandi terlebih dahulu.",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#24445a",
        customClass: {
          title: "title-icon-errorr",
          text: "text-icon",
          confirmButton: "confirm-icon",
        },
      });
      setStatekata({ password: "" });
    }
  };
  const submitNewPassword = async (e) => {
    const { password } = statekata;
    const { newPassword, newPassword_confirmation } = statekata;
    e.preventDefault();
    if (newPassword || newPassword_confirmation) {
      if (newPassword === password) {
        Swal.fire({
          title: "Perhatian!",
          text: "Kata sandi baru tidak boleh sama dengan kata sandi lama.",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#24445a",
          customClass: {
            title: "title-icon-errorr",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
        });
      } else {
        if (newPassword !== newPassword_confirmation) {
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
        } else if (newPassword === newPassword_confirmation) {
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
          if (!passwordRegex.test(newPassword)) {
            Swal.fire({
              title: "Perhatian!",
              text: "Kata sandi tidak memenuhi syarat\nKata sandi harus memiliki setidaknya 8 karakter, huruf kapital, huruf kecil, angka, dan karakter khusus",
              confirmButtonText: "Tutup",
              confirmButtonColor: "#24445a",
              customClass: {
                title: "title-icon-errorr",
                text: "text-icon",
                confirmButton: "confirm-icon",
              },
            });
            return;
          } else {
            try {
              var dataPass = new URLSearchParams();
              dataPass.append("password", statekata.newPassword);
              dataPass.append(
                "password_confirmation",
                statekata.newPassword_confirmation
              );
              var xhr_newPass = new XMLHttpRequest();
              xhr_newPass.onload = function () {
                var response = JSON.parse(this.responseText);
                if (response.status) {
                  Swal.fire({
                    iconHtml:
                      '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
                    title: "Berhasil!",
                    text: "Kata sandi berhasil diganti. Silakan masuk kembali menggunakan kata sandi yang baru.",
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
                      sessionStorage.clear();
                      window.location.replace("/Masuk");
                      window.history.replaceState(null, "", "/Masuk");
                    }
                  });
                } else {
                  Swal.fire({
                    title: "Gagal!",
                    icon: "error",
                    text: "Terdapat masalah pada sistem. Silakan coba lagi nanti!",
                  });
                }
              };
              xhr_newPass.open(
                "POST",
                process.env.REACT_APP_URL_API + "/password/create"
              );
              xhr_newPass.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
              );
              xhr_newPass.setRequestHeader(
                "Authorization",
                `Bearer ${tokenUser}`
              );
              xhr_newPass.send(dataPass.toString());
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Gagal!",
                text: "Gagal mengubah kata sandi. Silakan coba lagi!",
              });
            }
          }
        }
      }
    } else {
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
    }
  };

  ///AKTIVITAS
  const [dataAktivitasUser, setDataAktivitasUser] = useState([]);
  const [idPage, setIDPage] = useState(null);
  const [wilayahPage, setWilayahPage] = useState([]);
  const [tahunPage, setTahunPage] = useState([]);
  const [timeStampPage, setTimeStampPage] = useState([]);
  const [datasetPage, setDatasetPage] = useState([]);
  const [imageActivity, setImageActivity] = useState([]);
  // useEffect(() => {
  //   const xhr_activity = new XMLHttpRequest();
  //   xhr_activity.onload = function () {
  //     const data_history = JSON.parse(xhr_activity.responseText).data;
  //     setDataAktivitasUser(data_history);
  //   };
  //   xhr_activity.open("GET", process.env.REACT_APP_URL_API + "/history?", true);
  //   xhr_activity.setRequestHeader("Accept", "application/json");
  //   xhr_activity.setRequestHeader("Authorization", "Bearer " + tokenUser);
  //   xhr_activity.send();
  // }, [tokenUser]);
  const [totalPageeee, setTotalPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingData, setSortingData] = useState(false);
  const [collectiondata, setCollectionData] = useState([]);
  const [collectionisidata, setCollectionIsiData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchPageData = (page, sorting) => {
    const xhr_activity = new XMLHttpRequest();
    xhr_activity.onload = function () {
      const response = JSON.parse(xhr_activity.responseText);
      const data_history = JSON.parse(xhr_activity.responseText).data;
      const detailPage = JSON.parse(
        xhr_activity.responseText
      ).pagination_detail;
      if (response.success !== false) {
        setDataAktivitasUser(data_history);
        setTotalPage(detailPage.last_page);
      }
    };
    xhr_activity.open(
      "GET",
      `${process.env.REACT_APP_URL_API}/history?page=${page}&asc=${sorting}`,
      true
    );
    xhr_activity.setRequestHeader("Accept", "application/json");
    xhr_activity.setRequestHeader("Authorization", `Bearer ${tokenUser}`);
    xhr_activity.send();
  };
  useEffect(() => {
    if (currentPage == null && sortingData == null) {
      fetchPageData(1, true);
    } else {
      fetchPageData(currentPage, sortingData);
    }
  }, [currentPage, sortingData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const renderPageButtons = () => {
    const totalPages = totalPageeee;
    const pageButtons = [];
    const renderButton = (page) => (
      <div key={page}>
        <button
          onClick={() => handlePageChange(page)}
          className={`flex items-center justify-center text-secondary text-[12px] md:text-[16px] w-[25px] h-[25px] md:w-[35px] md:h-[35px] p-2 mx-1 rounded-[10px] bg-gray-200 hover:bg-third hover:text-white focus:outline-none ${
            currentPage === page ? "bg-secondary text-white" : ""
          }`}
        >
          {page}
        </button>
      </div>
    );

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(renderButton(i));
      }
    } else {
      const startPage = Math.max(currentPage - 1, 1);
      const endPage = Math.min(currentPage + 2, totalPages);

      if (startPage > 1) {
        pageButtons.push(renderButton(1));
        if (startPage > 2) {
          pageButtons.push(
            <div key="start-dots">
              <span className="flex items-center justify-center w-[35px] h-[35px] p-2 mx-1 text-secondary">
                ...
              </span>
            </div>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(renderButton(i));
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageButtons.push(
            <div key="end-dots">
              <span className="flex items-center justify-center w-[35px] h-[35px] p-2 mx-1 text-secondary">
                ...
              </span>
            </div>
          );
        }
        pageButtons.push(renderButton(totalPages));
      }
    }

    return pageButtons;
  };

  function findCommonElements(array1, array2) {
    if (array1 === null || array2 === null) {
      return "semua";
    }
    return array1.filter((value) => array2.includes(value));
  }

  ///SAVE SEMUA
  const [dataSaveAllUser, setDataSaveAllUser] = useState([]);
  const [belumAdaData, setBelumAdaData] = useState(null);
  const [belumAdaDataKoleksi, setBelumAdaDataKoleksi] = useState(null);
  const [belumAdaDataIsiKoleksi, setBelumAdaDataIsiKoleksi] = useState(null);
  const [deleteCheckbox, setDeleteCheckbox] = useState(false);
  const [showBtnDelete, setShowBtnDelete] = useState(true);

  const [deleteCheckboxKoleksi, setDeleteCheckboxKoleksi] = useState(false);
  const [showBtnDeleteKoleksi, setShowBtnDeleteKoleksi] = useState(true);
  const [checkNull, setCheckNull] = useState(true);
  const [targetDelete, setTargetDelete] = useState([]);

  const [showBtnDeleteIsiKoleksi, setShowBtnDeleteIsiKoleksi] = useState(true);
  const [deleteCheckboxIsiKoleksi, setDeleteCheckboxIsiKoleksi] =
    useState(false);

  const [showBtnMoveIsiKoleksi, setShowBtnMoveIsiKoleksi] = useState("");
  const [moveCheckboxIsiKoleksi, setMoveCheckboxIsiKoleksi] = useState("");

  const [sortingDataSaveAll, setSortingDataSaveAll] = useState(false);
  const [sortingDataSaveKoleksi, setSortingDataSaveKoleksi] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [showPopupCollection, setShowPopupCollection] = useState(false);

  const fetchPageDataSaveAll = (sortingDataSaveAll) => {
    const xhr_saveAll = new XMLHttpRequest();
    xhr_saveAll.onload = function () {
      const data_save = JSON.parse(xhr_saveAll.responseText).data;
      if (data_save == null) {
        setBelumAdaData("Belum ada halaman yang tersimpan");
      } else {
        setDataSaveAllUser(data_save);
      }
    };
    xhr_saveAll.open(
      "GET",
      process.env.REACT_APP_URL_API + `/all-saved?asc=${sortingDataSaveAll}`,
      true
    );
    xhr_saveAll.setRequestHeader("Accept", "application/json");
    xhr_saveAll.setRequestHeader("Authorization", "Bearer " + tokenUser);
    xhr_saveAll.send();
  };

  useEffect(() => {
    fetchPageDataSaveAll(sortingDataSaveAll);
  }, [sortingDataSaveAll]);

  const deleteDataSimpan = async (data_id) => {
    try {
      const deleteDataSimpan = new URLSearchParams();
      deleteDataSimpan.append("kodeHalaman", data_id);

      const response = await fetch(
        `${process.env.REACT_APP_URL_API}/delete-saved?id=${JSON.stringify(
          data_id
        )}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${tokenUser}`,
          },
          body: deleteDataSimpan.toString(),
        }
      );

      const result = await response.json();

      if (result.success === true) {
        updateInfoDelete();
        Swal.fire({
          iconHtml:
            '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
          title: "Berhasil!",
          text: "Berhasil menghapus data.",
          confirmButtonText: "Lanjutkan",
          confirmButtonColor: "#27AE60",
          customClass: {
            icon: "no-border",
            title: "title-icon",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
        });
        setShowBtnDelete(true);
        setDeleteCheckbox(false);
        fetchPageDataSaveAll(sortingDataSaveAll);
        resetCheckboxes();
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terdapat kesalahan. Silakan coba lagi nanti.",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#CD3838",
          customClass: {
            title: "title-icon-error",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terdapat kesalahan. Silakan coba lagi nanti.",
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

  const isiCheckBox = () => {
    Swal.fire({
      title: "Perhatian!",
      text: "Silakan pilih data yang ingin Anda hapus!",
      confirmButtonText: "Tutup",
      confirmButtonColor: "#24445a",
      customClass: {
        title: "title-icon-errorr",
        text: "text-icon",
        confirmButton: "confirm-icon",
      },
    });
  };

  const PopUPDeleteDataSimpan = () => {
    Swal.fire({
      title: "Perhatian!",
      text: "Apakah anda yakin untuk menghapus data ini?",
      confirmButtonText: "Ya",
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
        deleteDataSimpan(targetDelete);
      },
    });
  };

  const handleCheckboxChange = () => {
    const elm = document.getElementsByClassName("idDelete");
    const newTargetDelete = [];
    let hasChecked = false;

    for (let i = 0; i < elm.length; i++) {
      if (elm[i].checked) {
        newTargetDelete.push(elm[i].getAttribute("value"));
        setShowBtnDelete(false);
        hasChecked = true;
      }
    }

    setTargetDelete(newTargetDelete);
    setCheckNull(!hasChecked);
  };

  const resetCheckboxes = () => {
    const checkboxes = document.getElementsByClassName("idDelete");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    setTargetDelete([]);
    setCheckNull(true);
  };

  // Simpan Koleksi

  const resetCheckboxeskoleksi = () => {
    const checkboxes = document.getElementsByClassName("idDelete");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    setTargetDelete([]);
    setCheckNull(true);
  };

  const resetCheckboxesIsikoleksi = () => {
    const checkboxes = document.getElementsByClassName("idDelete");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    setTargetDelete([]);
    setCheckNull(true);
  };

  const fetchCollectionData = () => {
    const xhr_collection = new XMLHttpRequest();
    xhr_collection.onload = function () {
      try {
        const response = JSON.parse(xhr_collection.responseText);
        if (response.success) {
          if (response.data.length === 0) {
            setBelumAdaDataKoleksi(
              "Belum ada koleksi, silahkan buat koleksi anda"
            );
          } else {
            setCollectionData(response.data);
            setBelumAdaDataKoleksi(null);
          }
        } else {
          setCollectionData([]);
          setBelumAdaDataKoleksi(
            "Belum ada koleksi, silahkan buat koleksi anda"
          );
        }
      } catch (error) {
        console.error("Error parsing collection data:", error);
      }
    };
    xhr_collection.onerror = function () {
      console.error(
        "Error fetching collection data:",
        xhr_collection.statusText
      );
    };
    xhr_collection.open(
      "GET",
      `${process.env.REACT_APP_URL_API}/get-collection`,
      true
    );
    xhr_collection.setRequestHeader("Accept", "application/json");
    xhr_collection.setRequestHeader("Authorization", `Bearer ${tokenUser}`);
    xhr_collection.send();
  };

  useEffect(() => {
    fetchCollectionData();
  }, []);

  const addNewCollection = (newCollectionName) => {
    if (!newCollectionName.trim()) {
      Swal.fire({
        title: "Perhatian!",
        text: "Masukkan setidaknya 1 karakter.",
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

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      try {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
          fetchCollectionData();
          Swal.fire({
            iconHtml:
              '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
            title: "Berhasil!",
            text: "Berhasil membuat koleksi baru.",
            confirmButtonText: "Lanjutkan",
            confirmButtonColor: "#27AE60",
            customClass: {
              icon: "no-border",
              title: "title-icon",
              text: "text-icon",
              confirmButton: "confirm-icon",
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: response.error,
            confirmButtonText: "Tutup",
            confirmButtonColor: "#CD3838",
            customClass: {
              title: "title-icon-error",
              text: "text-icon",
              confirmButton: "confirm-icon",
            },
          });
        }
      } catch (error) {
        console.error("Error adding collection:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terdapat kesalahan. Silakan coba lagi nanti.",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#CD3838",
        });
      }
    };
    xhr.onerror = function () {
      console.error("Error adding collection:", xhr.statusText);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terdapat kesalahan. Silakan coba lagi nanti.",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#CD3838",
      });
    };
    xhr.open("POST", `${process.env.REACT_APP_URL_API}/make-collection`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${tokenUser}`);
    xhr.send(JSON.stringify({ name: newCollectionName }));
  };

  const deleteDataKoleksi = async (data_id) => {
    try {
      const deleteDataKoleksi = new URLSearchParams();
      deleteDataKoleksi.append("kodeHalaman", data_id);

      const response = await fetch(
        `${process.env.REACT_APP_URL_API}/delete-collection?id=${JSON.stringify(
          data_id
        )}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${tokenUser}`,
          },
          body: deleteDataKoleksi.toString(),
        }
      );

      const result = await response.json();

      if (result.success === true) {
        updateInfoDelete();
        Swal.fire({
          iconHtml:
            '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
          title: "Berhasil!",
          text: "Berhasil menghapus data.",
          confirmButtonText: "Lanjutkan",
          confirmButtonColor: "#27AE60",
          customClass: {
            icon: "no-border",
            title: "title-icon",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
        });
        setShowBtnDeleteKoleksi(true);
        setDeleteCheckboxKoleksi(false);
        fetchCollectionData();
        resetCheckboxeskoleksi();
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terdapat kesalahan. Silakan coba lagi nanti.",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#CD3838",
          customClass: {
            title: "title-icon-error",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terdapat kesalahan. Silakan coba lagi nanti.",
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

  const isiCheckBoxKoleksi = () => {
    Swal.fire({
      title: "Perhatian!",
      text: "Silakan pilih data yang ingin Anda hapus!",
      confirmButtonText: "Tutup",
      confirmButtonColor: "#24445a",
      customClass: {
        title: "title-icon-errorr",
        text: "text-icon",
        confirmButton: "confirm-icon",
      },
    });
  };

  const PopUPDeleteDataSimpanKoleksi = () => {
    Swal.fire({
      title: "Perhatian!",
      text: "Apakah anda yakin untuk menghapus data ini?",
      confirmButtonText: "Ya",
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
        deleteDataKoleksi(targetDelete);
      },
    });
  };

  const handleCheckboxChangeKoleksi = () => {
    const elm = document.getElementsByClassName("idDelete");
    const newTargetDelete = [];
    let hasChecked = false;

    for (let i = 0; i < elm.length; i++) {
      if (elm[i].checked) {
        newTargetDelete.push(elm[i].getAttribute("value"));
        setShowBtnDeleteKoleksi(false);
        hasChecked = true;
      }
    }

    setTargetDelete(newTargetDelete);
    setCheckNull(!hasChecked);
  };

  const handleAddNewCollectionClick = () => {
    Swal.fire({
      title: "Buat Koleksi",
      input: "text",
      inputPlaceholder: "Nama Koleksi",
      showCancelButton: true,
      confirmButtonText: "Tambah",
      cancelButtonText: "Batal",
      confirmButtonColor: "#24445A",
      cancelButtonColor: "#CD3838",
      customClass: {
        title:
          "text-[20px] md:text-[34px] lg:text-[30px] font-bold text-secondary text-center mb-[40px]",
        input:
          "lg:text-[15px] focus:outline-none focus:shadow-outline font-regular rounded-md mb-[40px]",
        confirmButton:
          "button focus:outline-none focus:shadow-outline w-full bg-secondary hover:bg-secondary font-medium mt-[20px] rounded-md mb-[-10px]",
        cancelButton:
          "button focus:outline-none focus:shadow-outline w-full bg-secondary hover:bg-secondary font-medium mt-[20px] rounded-md",
      },
      preConfirm: (newCollectionName) => {
        if (!newCollectionName.trim()) {
          Swal.fire({
            title: "Perhatian!",
            text: "Masukkan setidaknya 1 karakter.",
            confirmButtonText: "Tutup",
            confirmButtonColor: "#24445a",
            customClass: {
              title: "title-icon-errorr",
              text: "text-icon",
              confirmButton: "confirm-icon",
            },
          }).then(() => {
            handleAddNewCollectionClick();
          });
          return false;
        }
        return newCollectionName;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        addNewCollection(result.value);
      }
    });
  };

  const fetchSavedCollection = (id, sortingDataSaveKoleksi) => {
    const xhr_collection = new XMLHttpRequest();
    xhr_collection.onload = function () {
      try {
        const response = JSON.parse(xhr_collection.responseText);
        if (response.success) {
          if (response.data.length === 0) {
            setBelumAdaDataIsiKoleksi("Belum ada halaman yang tersimpan");
          } else {
            setCollectionIsiData(response.data);
            setBelumAdaDataIsiKoleksi(null);
          }
        } else {
          setCollectionIsiData([]);
          setBelumAdaDataIsiKoleksi("Belum ada halaman yang tersimpan");
        }
        setIsStepOne(false);
      } catch (error) {
        console.error("Error parsing collection data:", error);
      }
    };
    xhr_collection.onerror = function () {
      console.error(
        "Error fetching collection data:",
        xhr_collection.statusText
      );
    };
    xhr_collection.open(
      "GET",
      `${process.env.REACT_APP_URL_API}/collection-pages?koleksi=${id}&asc=${sortingDataSaveKoleksi}`,
      true
    );
    xhr_collection.setRequestHeader("Accept", "application/json");
    xhr_collection.setRequestHeader("Authorization", `Bearer ${tokenUser}`);
    xhr_collection.send();
  };

  useEffect(() => {
    fetchSavedCollection(
      sessionStorage.getItem("idCollection"),
      sortingDataSaveKoleksi
    );
  }, [sortingDataSaveKoleksi]);

  const editdataSimpan = (id, changeCollection) => {
    if (typeof changeCollection !== "string" || !changeCollection.trim()) {
      Swal.fire({
        title: "Perhatian!",
        text: "Masukkan setidaknya 1 karakter.",
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

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      try {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
          fetchCollectionData();
          Swal.fire({
            iconHtml:
              '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
            title: "Berhasil!",
            text: "Berhasil membuat koleksi baru.",
            confirmButtonText: "Lanjutkan",
            confirmButtonColor: "#27AE60",
            customClass: {
              icon: "no-border",
              title: "title-icon",
              text: "text-icon",
              confirmButton: "confirm-icon",
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: response.error,
            confirmButtonText: "Tutup",
            confirmButtonColor: "#CD3838",
            customClass: {
              title: "title-icon-error",
              text: "text-icon",
              confirmButton: "confirm-icon",
            },
          });
        }
      } catch (error) {
        console.error("Error adding collection:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terdapat kesalahan. Silakan coba lagi nanti.",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#CD3838",
        });
      }
    };
    xhr.onerror = function () {
      console.error("Error adding collection:", xhr.statusText);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terdapat kesalahan. Silakan coba lagi nanti.",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#CD3838",
      });
    };
    xhr.open(
      "POST",
      `${process.env.REACT_APP_URL_API}/change-collection-name/${id}`,
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${tokenUser}`);
    xhr.send(JSON.stringify({ name: changeCollection }));
  };

  const handleChangeCollectionClick = (id) => {
    Swal.fire({
      title: "Ubah Koleksi",
      input: "text",
      inputPlaceholder: "Nama Koleksi",
      showCancelButton: true,
      confirmButtonText: "Tambah",
      cancelButtonText: "Batal",
      confirmButtonColor: "#24445A",
      cancelButtonColor: "#CD3838",
      customClass: {
        title:
          "text-[20px] md:text-[34px] lg:text-[30px] font-bold text-secondary text-center mb-[40px]",
        input:
          "lg:text-[15px] focus:outline-none focus:shadow-outline font-regular rounded-md mb-[40px]",
        confirmButton:
          "button focus:outline-none focus:shadow-outline w-full bg-secondary hover:bg-secondary font-medium mt-[20px] rounded-md mb-[-10px]",
        cancelButton:
          "button focus:outline-none focus:shadow-outline w-full bg-secondary hover:bg-secondary font-medium mt-[20px] rounded-md",
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        editdataSimpan(id, result.value);
      }
    });
  };

  const deleteIsiDataKoleksi = async (data_id, KoleksiId) => {
    try {
      const deleteIsiDataKoleksi = new URLSearchParams();
      deleteIsiDataKoleksi.append("kodeHalaman", data_id);

      const response = await fetch(
        `${process.env.REACT_APP_URL_API}/delete-saved?id=${JSON.stringify(
          data_id
        )}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${tokenUser}`,
          },
          body: deleteIsiDataKoleksi.toString(),
        }
      );

      const result = await response.json();

      if (result.success === true) {
        updateInfoDelete();
        Swal.fire({
          iconHtml:
            '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
          title: "Berhasil!",
          text: "Berhasil menghapus data.",
          confirmButtonText: "Lanjutkan",
          confirmButtonColor: "#27AE60",
          customClass: {
            icon: "no-border",
            title: "title-icon",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
        });
        setShowBtnDeleteIsiKoleksi(true);
        setDeleteCheckboxIsiKoleksi(false);
        fetchSavedCollection(KoleksiId, sortingDataSaveKoleksi);
        fetchCollectionData();
        resetCheckboxesIsikoleksi();
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terdapat kesalahan. Silakan coba lagi nanti.",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#CD3838",
          customClass: {
            title: "title-icon-error",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terdapat kesalahan. Silakan coba lagi nanti.",
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

  const isiCheckBoxIsiKoleksi = () => {
    Swal.fire({
      title: "Perhatian!",
      text: "Silakan pilih data yang ingin Anda hapus!",
      confirmButtonText: "Tutup",
      confirmButtonColor: "#24445a",
      customClass: {
        title: "title-icon-errorr",
        text: "text-icon",
        confirmButton: "confirm-icon",
      },
    });
  };

  const PopUPDeleteDataIsiKoleksi = () => {
    Swal.fire({
      title: "Perhatian!",
      text: "Apakah anda yakin untuk menghapus data ini?",
      confirmButtonText: "Ya",
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
      preConfirm: async () => {
        await deleteIsiDataKoleksi(
          targetDelete,
          sessionStorage.getItem("idCollection")
        );
      },
    });
  };

  const handleCheckboxChangeIsiKoleksi = (type, value) => {
    const elm = document.getElementsByClassName("idDelete");
    console.log("isi", value);
    const newTargetDelete = [];
    let hasChecked = false;
  
    if (type === "delete") {
      for (let i = 0; i < elm.length; i++) {
        if (elm[i].checked) {
          newTargetDelete.push(elm[i].getAttribute("value"));
          setShowBtnDeleteIsiKoleksi(false);
          hasChecked = true;
        }
      }
      setTargetDelete(newTargetDelete);
      setCheckNull(!hasChecked);
    } else {
      let selectedIds = [];
  
      for (let i = 0; i < elm.length; i++) {
        if (elm[i].checked) {
          selectedIds.push(elm[i].getAttribute("value"));
        }
      }
  
      // Store the updated array in sessionStorage
      sessionStorage.setItem("idKoleksi", JSON.stringify(selectedIds));
      console.log("Updated idKoleksi:", selectedIds);
    }
  };
  

  const moveCollection = (collectionIds, sourceCollectionId, destinationCollectionId) => {
    const xhr = new XMLHttpRequest();
    console.log("idkoleksi", collectionIds);
    xhr.onload = function () {
      try {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
          console.log("Collection moved successfully:", response.data);
          Swal.fire({
            iconHtml:
              '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
            title: "Berhasil!",
            text: "Berhasil dipindahkan. Silakan kembali.",
            confirmButtonText: "Lanjutkan",
            confirmButtonColor: "#27AE60",
            customClass: {
              icon: "no-border",
              title: "title-icon",
              text: "text-icon",
              confirmButton: "confirm-icon",
            },
            allowOutsideClick: false,
          }).then(() => {
            setShowBtnDeleteIsiKoleksi(true);
            setDeleteCheckboxIsiKoleksi(false);
            fetchCollectionData();
            fetchSavedCollection(sourceCollectionId, true);
          });
        } else {
          console.error("Error parsing move collection response:");
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Koleksi anda sudah penuh untuk paket ini.",
            confirmButtonText: "Tutup",
            confirmButtonColor: "#CD3838",
          });
        }
      } catch (error) {
        console.error("Error parsing move collection response:", error);
      }
    };
  
    xhr.onerror = function () {
      console.error("Error moving collection:", xhr.statusText);
    };
  
    xhr.open("POST", `${process.env.REACT_APP_URL_API}/move-collection`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${tokenUser}`);
  
    const formattedCollectionIds = JSON.stringify(collectionIds.map(id => String(id)));
  
    const requestData = JSON.stringify({
      id: formattedCollectionIds,
      from: +sourceCollectionId,
      to: +destinationCollectionId,
    });
  
    xhr.send(requestData);
  };
   

  var koleksi = sessionStorage.getItem("idCollection");
  const Popupmovecollection = () => {
    Swal.fire({
      title: "Tambah Koleksi",
      html: `
        <div class="flex flex-wrap gap-4 justify-center mb-[20px]">
          ${collectiondata
            .filter((collection) => collection.id != koleksi)
            .map(
              (collection) => `
                <button 
                  class="button bg-secondary lg:hover:bg-secondary-light md:hover:bg-secondary-light text-white font-medium py-2 px-10 rounded-md" 
                  data-collection-id="${collection.id}"
                  style="min-width: 150px;" 
                >
                  ${collection.nama}
                </button>
              `
            )
            .join("")}
        </div>
      `,
      confirmButtonText: "Batal",
      confirmButtonColor: "#24445A",
      allowOutsideClick: false,
      customClass: {
        title:
          "text-[20px] md:text-[34px] lg:text-[30px] font-bold text-secondary text-center mb-[40px]",
        confirmButton: "confirm-icon",
        cancelButton:
          "button focus:outline-none focus:shadow-outline w-full bg-secondary hover:bg-secondary font-medium mt-[20px] rounded-md",
      },
      showCancelButton: false,
    });
    document.querySelectorAll(".button").forEach((button) => {
      button.addEventListener("click", () => {
        const xhr_collection = new XMLHttpRequest();
        const collectionIds = JSON.parse(sessionStorage.getItem("idKoleksi"));
        const destinationCollectionId = button.dataset.collectionId;
        xhr_collection.onload = function () {
          try {
            const response = JSON.parse(xhr_collection.responseText);
            if (response.success) {
              if (response.data.length === 0) {
                moveCollection(collectionIds, koleksi, destinationCollectionId);
                console.log("datalength = 0")
                Swal.close();
              } else {
                var isfound = false
                for (var i = 0; i < response.data.length; i++) {
                  if (response.data[i].id == collectionIds) {
                    isfound = true
                    break
                  }
                } 
                if (isfound) {
                  console.log("data ada")
                  Swal.fire({
                    title: "Perhatian!",
                    text: "Data sudah tersedia di folder lain.",
                    confirmButtonText: "Tutup",
                    confirmButtonColor: "#24445a",
                    customClass: {
                      title: "title-icon-errorr",
                      text: "text-icon",
                      confirmButton: "confirm-icon",
                    },
                  });
                } else {
                moveCollection(collectionIds, koleksi, destinationCollectionId);
                console.log("datalength > 0")
                Swal.close();
                }
              }
            } else {
              setCollectionIsiData([]);
              setBelumAdaDataIsiKoleksi("Belum ada halaman yang tersimpan");
            }
            setIsStepOne(false);
          } catch (error) {
            console.error("Error parsing collection data:", error);
          }
        };
        xhr_collection.onerror = function () {
          console.error(
            "Error fetching collection data:",
            xhr_collection.statusText
          );
        };
        xhr_collection.open(
          "GET",
          `${process.env.REACT_APP_URL_API}/collection-pages?koleksi=${destinationCollectionId}&asc=true`,
          true
        );
        xhr_collection.setRequestHeader("Accept", "application/json");
        xhr_collection.setRequestHeader("Authorization", `Bearer ${tokenUser}`);
        xhr_collection.send();
      });
    });
  };

  // useEffect(() => {
  //   const xhr_saveAll = new XMLHttpRequest();
  //   xhr_saveAll.onload = function () {
  //     const data_save = JSON.parse(xhr_saveAll.responseText).data;
  //     if (data_save == null) {
  //       setBelumAdaData("Belum ada halaman yang tersimpan");
  //     } else {
  //       setDataSaveAllUser(data_save);
  //     }
  //   };
  //   xhr_saveAll.open("GET", process.env.REACT_APP_URL_API + "/all-saved", true);
  //   xhr_saveAll.setRequestHeader("Accept", "application/json");
  //   xhr_saveAll.setRequestHeader("Authorization", "Bearer " + tokenUser);
  //   xhr_saveAll.send();
  // }, [tokenUser]);

  function saveNamaProvince(id) {
    const xhr_saveProvince = new XMLHttpRequest();
    xhr_saveProvince.onload = function () {
      const dataProvince = JSON.parse(xhr_saveProvince.responseText).data;
      sessionStorage.setItem("namaprovinsi", dataProvince.nama);
    };
    xhr_saveProvince.open(
      "GET",
      process.env.REACT_APP_URL_API +
        "/wilayah-info?lang=en&tahun=2020&wilayah_id=" +
        id,
      false
    );
    xhr_saveProvince.send();
  }
  function saveNamaProvince2(id) {
    const xhr_saveProvince = new XMLHttpRequest();
    xhr_saveProvince.onload = function () {
      const dataProvince = JSON.parse(xhr_saveProvince.responseText).data;
      sessionStorage.setItem("namaprovinsi_berkaca2", dataProvince.nama);
    };
    xhr_saveProvince.open(
      "GET",
      process.env.REACT_APP_URL_API +
        "/wilayah-info?lang=en&tahun=2020&wilayah_id=" +
        id,
      false
    );
    xhr_saveProvince.send();
  }

  const handlePopUpLogout = () => {
    Swal.fire({
      title: "Perhatian!",
      text: "Apakah Anda yakin ingin keluar?",
      confirmButtonText: "Ya",
      confirmButtonColor: "#24445A",
      showCancelButton: true,
      cancelButtonText: "Tidak",
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
        handleLogout();
      },
    });
  };

  const [isStepOne, setIsStepOne] = useState(true);

  return (
    <body className="relative">
      <div id="loadingg" className="hidden fixed left-1/2 top-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[400px] h-[250px] bg-white rounded-[10px] flex flex-col justify-center items-center drop-shadow-lg">
          <div className="holds-the-iframe w-[80px] h-[80px]"></div>
          <div className="text-secondary font-semibold mt-[25px]">Silakan tunggu sebentar...</div>
        </div>
      </div>
      <body className="flex justify-center items-center px-[20px]">
        
        <div className="hidden md:block mb-[170px] px-[50px] lg:mx-[200px] w-full">
          <div className="flex justify-center mt-[134px] gap-x-[20px] mb-[70px]">
            <img
              src={geometry}
              alt=""
              className="md:hidden lg:block hidden fixed w-full top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10 opacity-10 object-cover"
            />
            <div className="flex flex-col h-[500px] w-[55%] bg-primary rounded-[10px] justify-center lg:px-[30px]">
              {/* PHOTO USER */}
              <div className="relative mb-4 w-[100px] h-[100px] mx-auto">
                {imageUser ? (
                  <img
                    src={imageUser}
                    alt="Profile"
                    className="mt-[20px] mx-auto hover:cursor-pointer rounded-lg"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <img
                    src={ProfileImage}
                    alt="Profile"
                    className="mt-[20px] mx-auto hover:cursor-pointer rounded-lg"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                )}
              </div>
              {/* NAMA USER */}
              <h1 className="mt-[20px] text-center font-semibold text-secondary lg:text-[24px] text-[20px]">
                {titleUser}.&nbsp;<span className="font-bold">{namaUser}</span>
              </h1>
              <p className="text-secondary text-center lg:text-[16px] text-[14px]">
                {emailUser}
              </p>
              {/* VERIF AKUN */}
              <div className="flex flex-col items-center text-center px-[10px] lg:p-0">
                <img
                  src={kondisiVerif}
                  className="mt-[10px] rounded-lg w-auto lg:h-[40px] h-[30px]"
                />
                <a
                  className={`mt-[10px] text-secondary text-[14px] font-semibold cursor-pointer underline hover:opacity-70 ${
                    askVerified ? "hidden" : ""
                  }`}
                  type="submit"
                  onClick={() => {
                    submitBerhasil();
                    sendOTP();
                  }}
                >
                  Verifikasi Akun
                </a>
              </div>
              {/* BUTTON EDIT PROFILE */}
              <div className="flex items-center text-center px-[10px] lg:p-0 mt-[15px]">
                <a
                  href="/Edit-Profile"
                  className="button bg-secondary hover:bg-third font-medium mt-[10px] w-full"
                >
                  <button className="">Ubah Data Diri</button>
                </a>
              </div>
              {/* UBAH KATA SANDI */}
              <div className="flex items-center text-center px-[10px] lg:p-0">
                <button
                  className="button bg-secondary hover:bg-third font-medium mt-[10px] w-full"
                  onClick={togglePopupPass}
                >
                  Ubah Kata Sandi
                </button>
              </div>
              {showPopupPass && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10 ">
                  <ToastContainer />
                  {step === 1 && (
                    <div className="flex flex-col bg-white rounded-[25px] justify-center items-center w-[700px] h-[600px] mx-[40px] md:mx-0">
                      <form className="flex flex-col w-[320px] gap-y-[120px]">
                        <h1 className="text-[24px] md:text-[34px] font-bold text-secondary text-center">
                          Ubah Kata Sandi
                        </h1>
                        <div className="">
                          {/* Kata Sandi */}
                          <div className="w-full">
                            <label className="block text-secondary text-sm font-medium mb-[4px] text-[14px]">
                              Kata Sandi Lama
                            </label>
                            <div className="flex w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[14px] items-center justify-between">
                              <input
                                className="focus:outline-none focus:shadow-outline font-regular w-full"
                                id="password"
                                type={
                                  statekata.showPassword ? "text" : "password"
                                }
                                placeholder="Masukkan Kata Sandi"
                                name="password"
                                value={statekata.password}
                                onChange={(e) =>
                                  setStatekata((prevState) => ({
                                    ...prevState,
                                    password: e.target.value,
                                  }))
                                }
                                required
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="w-[30px]"
                              >
                                <FontAwesomeIcon
                                  icon={
                                    statekata.showPassword ? faEye : faEyeSlash
                                  }
                                  color="#24445A"
                                />
                              </button>
                            </div>
                          </div>
                          <div className="text-right mt-2 text-medium text-[14px] text-secondary hover:text-third">
                            <Link to="/Lupa-Sandi">Lupa Kata Sandi?</Link>
                          </div>
                        </div>
                        <div className="flex flex-col w-full">
                          <button
                            className="button focus:outline-none  focus:shadow-outline w-full bg-secondary hover:bg-third font-medium mt-[10px]"
                            type="button"
                            onClick={()=>{document.getElementById("loadingg").classList.remove("hidden")
                              submitPass()
                            }}
                          >
                            Selanjutnya
                          </button>
                          <button
                            className="button focus:outline-none  focus:shadow-outline w-full bg-[#CD3838] hover:bg-[#E54747] font-medium mt-[10px]"
                            type="button"
                            onClick={togglePopupPass}
                          >
                            Batalkan
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="flex flex-col bg-white rounded-[25px] justify-center items-center w-[700px] h-[600px] text-secondary">
                      <form className="flex flex-col w-[320px] gap-y-[20px]">
                        <h1 className="text-[34px] font-bold text-secondary text-center">
                          Ubah Kata Sandi
                        </h1>
                        <div className="">
                          {/* Kata Sandi */}
                          <div className="w-full">
                            <label className="block text-secondary text-sm font-medium mb-[4px] text-[14px]">
                              Kata Sandi Baru
                            </label>
                            <div className="flex w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[14px] items-center justify-between">
                              <input
                                className="focus:outline-none focus:shadow-outline font-regular w-full"
                                id="newpassword"
                                type={
                                  statekata.showNewPassword ? "text" : "password"
                                }
                                placeholder="Masukkan Kata Sandi Baru"
                                name="newPassword"
                                value={statekata.newPassword}
                                onChange={(e) =>
                                  setStatekata((prevState) => ({
                                    ...prevState,
                                    newPassword: e.target.value,
                                  }))
                                }
                                // style={{ color: '#24445A' }}
                                required
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility2}
                                className="w-[30px]"
                              >
                                <FontAwesomeIcon
                                  icon={
                                    statekata.showNewPassword ? faEye : faEyeSlash
                                  }
                                  color="#24445A"
                                />
                              </button>
                            </div>
                            <p className="text-red-500 text-[12px] ">
                              Panjang kata sandi minimal 8 karakter
                            </p>
                            <p className="text-red-500 text-[12px]">
                              Kata sandi harus mengandung huruf kapital dan huruf
                              kecil
                            </p>
                            <p className="text-red-500 text-[12px]">
                              Kata sandi harus mengandung setidaknya satu angka
                            </p>
                            <p className="text-red-500 text-[12px]">
                              Kata sandi harus mengandung setidaknya satu karakter
                              khusus
                            </p>
                          </div>
                          {/* Konfirm */}
                          <div className="mt-[10px] w-full">
                            <label className="block text-secondary text-sm font-medium mb-[4px] text-[14px]">
                              Konfirmasi Kata Sandi
                            </label>
                            <div className="flex w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[14px] items-center justify-between">
                              <input
                                className="focus:outline-none focus:shadow-outline font-regular w-full"
                                id="newPassword_confirmation"
                                type={
                                  statekata.showNewPassword2 ? "text" : "password"
                                }
                                placeholder="Konfirmasi Kata Sandi"
                                name="newPassword_confirmation"
                                value={statekata.newPassword_confirmation}
                                onChange={(e) =>
                                  setStatekata((prevState) => ({
                                    ...prevState,
                                    newPassword_confirmation: e.target.value,
                                  }))
                                }
                                required
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility3}
                                className="w-[30px]"
                              >
                                <FontAwesomeIcon
                                  icon={
                                    statekata.showNewPassword2
                                      ? faEye
                                      : faEyeSlash
                                  }
                                  color="#24445A"
                                />
                              </button>
                            </div>
                          </div>
                          <div className="text-right mt-2 text-medium text-[14px] text-secondary hover:text-third">
                            <Link to="/Lupa-Sandi">Lupa Kata Sandi?</Link>
                          </div>
                        </div>
                        <div className="flex flex-col w-full">
                          <button
                            className="button focus:outline-none  focus:shadow-outline w-full bg-secondary hover:bg-third font-medium mt-[10px]"
                            type="button"
                            onClick={submitNewPassword}
                          >
                            Selanjutnya
                          </button>
                          <button
                            className="button focus:outline-none  focus:shadow-outline w-full bg-[#CD3838] hover:bg-[#E54747] font-medium mt-[10px]"
                            type="button"
                            onClick={handleFormSebelum}
                          >
                            Sebelumnya
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
              {/* LOGOUT */}
              <div className="flex items-center text-center px-[10px] lg:p-0">
                <NavLink
                  onClick={handlePopUpLogout}
                  className="button bg-[#CD3838] hover:bg-[#E54747] font-medium mt-[10px] w-full"
                >
                  Keluar Dari Akun
                </NavLink>
              </div>
            </div>
            <div className="flex flex-col w-full h-[500px] bg-primary rounded-[10px] items-center justify-center text-secondary px-[30px]">
              {/* INFORMASI DAERAH USER */}
              <div className="flex w-auto">
                <div>
                  <h1 className="text-[25px] lg:text-[35px] font-bold ">
                    {provincessNama}
                  </h1>
                  <h1 className="text-[18px] lg:text-[24px] font-semibold ">
                    {infoDaerah}
                  </h1>
                  <div className="flex flex-col lg:flex-row mt-[20px] lg:mt-[30px] lg:gap-[10px]">
                    <div className="flex lg:flex-col flex-row items-center lg:mr-4">
                      <div className="hover-container">
                        <img
                          src={dataranicon}
                          alt=""
                          className="w-[45px] lg:w-[90px]"
                        />
                        <span className="hover-text w-auto mb-[10px]">
                          {luaswilayah}
                          <span>&nbsp;km²</span>
                          <p>
                            {ketinggian}
                            <span>&nbsp;mdpl</span>
                          </p>
                          <p>{datarannama}</p>
                        </span>
                      </div>
                      <div className="text-[16px] lg:text-[20px] text-secondary mt-[5px]">
                        <p className="text-left">
                          <span className="font-bold">{luaswilayah}</span>
                          <span className="font-regular text-left text-italic">
                            &nbsp;km²
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex lg:flex-col flex-row items-center mt-[10px] lg:mt-0">
                      <div className="hover-container">
                        <img
                          src={sektoricon}
                          alt=""
                          className="w-[45px] lg:w-[90px]"
                        />
                        <span className="hover-text w-auto mb-[10px]">
                          <p>{nilaisektor}</p>
                          <p>{sektornama}</p>
                        </span>
                      </div>
                      <div className="text-[16px] lg:text-[20px] mt-[5px]">
                        <p className="text-left">
                          <span className="font-bold">
                            {Math.round(data_Penduduk)
                              .toLocaleString()
                              .replaceAll(/,/g, ".")}
                          </span>
                          <span className="font-regular text-left text-italic">
                            &nbsp;10³ Jiwa
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <img src={peta} alt="Peta" className="lg:w-[250px] w-[180px]" />
                  <div className="flex items-center gap-x-[20px]">
                    <img src={pinMap} alt="" className="flex w-[15px] h-auto" />
                    <div className="text-secondary">
                      <p className="font-semibold text-[12px] lg:text-[16px]">
                        {koordinatLokasi}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* INFORMASI UNDUH USER */}
              <div className="flex w-full justify-around items-center mt-[20px] text-center ">
                <div
                  className="flex flex-col items-center justify-center text-center"
                  style={{ color: "#24445A" }}
                >
                  <div className="text-[20px] lg:text-[40px] font-bold">
                    {totalDownload}
                  </div>
                  <div className="text-[16px] lg:text-lg font-semibold">
                    Unduh
                  </div>
                </div>
                <div
                  className=" flex flex-col items-center justify-center text-center"
                  style={{ color: "#24445A" }}
                >
                  <div className="text-[20px] lg:text-[40px] font-bold">
                    {totalSave}
                  </div>
                  <div className="text-[16px] lg:text-lg font-semibold">
                    Simpan
                  </div>
                </div>
                <div
                  className=" flex flex-col items-center justify-center text-center"
                  style={{ color: "#24445A" }}
                >
                  <div className="text-[20px] lg:text-[40px] font-bold">
                    {totalShare}
                  </div>
                  <div className="text-[16px] lg:text-lg font-semibold">Bagi</div>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle button */}
          <div className="flex justify-center mb-[20px]">
            <div className="grid grid-cols-2 gap-[10px] w-full bg-primary rounded-[10px] p-[10px]">
              <button
                className={`py-2 rounded-[10px] ${
                  activeTab === "activity"
                    ? "bg-[#EFF7FB] text-[#24445A]"
                    : "bg-[#24445A] text-white"
                }`}
                style={
                  activeTab === "activity"
                    ? { boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.2)" }
                    : {}
                }
                onClick={() => toggleTab("activity")}
              >
                Aktivitas
              </button>
              <button
                className={`py-2 rounded-[10px] ${
                  activeTab === "save"
                    ? "bg-[#EFF7FB] text-[#24445A]"
                    : "bg-[#24445A] text-white"
                }`}
                style={
                  activeTab === "save"
                    ? { boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.2)" }
                    : {}
                }
                onClick={() => toggleTab("save")}
              >
                Simpan
              </button>
            </div>
          </div>

          <div className="p-[10px] bg-primary rounded-[10px] w-full ">
            {activeTab === "activity" && (
              <section className="flex flex-col items-end">
                <div className="flex items-center justify-center mt-[20px] mb-[20px]">
                  <div>
                    <div className="px-[20px]">
                      <img
                        src={sortIcon}
                        alt=""
                        className={`w-[30px] h-[30px] object-contain cursor-pointer hover:scale-[110%] ${
                          !sortingData && "rotate-180"
                        }`}
                        onClick={() => {
                          setSortingData(!sortingData)
                          handlePageChange(1)
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                  {dataAktivitasUser?.map((userActivity) => (
                    <div
                      key={userActivity.id}
                      className="w-full flex items-start justify-between bg-primary text-secondary hover:bg-third hover:text-white p-[20px] rounded-lg cursor-pointer"
                      onClick={() => {
                        if (userActivity.id_parent_wilayah_satu !== null) {
                          sessionStorage.setItem("yearss", userActivity.tahun);
                          sessionStorage.setItem(
                            "idkota",
                            userActivity.id_wilayah_satu
                          );
                          sessionStorage.setItem(
                            "namakota",
                            userActivity.wilayah_satu
                          );
                          sessionStorage.setItem(
                            "namawilayah",
                            userActivity.wilayah_satu
                          );
                          sessionStorage.setItem(
                            "idprovinsi",
                            userActivity.id_parent_wilayah_satu
                          );
                          sessionStorage.setItem(
                            "idwilayah",
                            userActivity.id_wilayah_satu
                          );
                          saveNamaProvince(userActivity.id_parent_wilayah_satu);
                        } else {
                          sessionStorage.setItem("yearss", userActivity.tahun);
                          sessionStorage.setItem(
                            "idkota",
                            userActivity.id_wilayah_satu
                          );
                          sessionStorage.setItem("namakota", "Semua");
                          sessionStorage.setItem("namawilayah", "Semua");
                          sessionStorage.setItem(
                            "idprovinsi",
                            userActivity.id_wilayah_satu
                          );
                          sessionStorage.setItem(
                            "idwilayah",
                            userActivity.id_wilayah_satu
                          );
                          saveNamaProvince(userActivity.id_wilayah_satu);
                        }
                        if (userActivity.halaman_tipe == "JELAJAH") {
                          ///DATASET JELAJAH
                          sessionStorage.setItem(
                            "historyTipePeringkat",
                            userActivity.peringkat
                          );
                          sessionStorage.setItem(
                            "historyParentDataset",
                            userActivity.parent_dataset
                          );
                          const lastElement =
                            userActivity.dataset_array_satu.at(-1);
                          sessionStorage.setItem(
                            "historyChildDatasetArray",
                            JSON.stringify(userActivity.dataset_array_satu)
                          );
                          sessionStorage.setItem(
                            "historyChildDataset",
                            lastElement
                          );
                          window.location.href = "/Jelajah-Main";
                        } else if (userActivity.halaman_tipe == "UTAK-ATIK") {
                          var labels = [];
                          if (userActivity.dataset_array_satu != null) {
                            for (
                              var i = 0;
                              i < userActivity.dataset_array_satu.length;
                              i++
                            ) {
                              labels[userActivity.dataset_array_satu[i]] =
                                userActivity.dataset_array_satu_nama[i];
                            }
                          } else {
                            labels[userActivity.parent_satu] =
                              userActivity.parent_satu_nama;
                          }
                          var labels2 = [];
                          if (userActivity.dataset_array_dua != null) {
                            for (
                              var i = 0;
                              i < userActivity.dataset_array_dua.length;
                              i++
                            ) {
                              labels2[userActivity.dataset_array_dua[i]] =
                                userActivity.dataset_array_dua_nama[i];
                            }
                          } else {
                            labels2[userActivity.parent_dua] =
                              userActivity.parent_dua_nama;
                          }
                          var xhr = new XMLHttpRequest();
                          xhr.onload = function () {
                            var response = JSON.parse(xhr.responseText);
                            if (userActivity.tahun == "semua") {
                              sessionStorage.setItem(
                                "yearss",
                                response.data[0].tahun
                              );
                            } else {
                              sessionStorage.setItem(
                                "yearss",
                                userActivity.tahun
                              );
                            }
                          };
                          xhr.open(
                            "GET",
                            process.env.REACT_APP_URL_API + "/year",
                            false
                          );
                          xhr.send();
                          sessionStorage.setItem(
                            "namaFilter1",
                            userActivity.parent_satu_nama
                          );
                          sessionStorage.setItem(
                            "namaFilter2",
                            userActivity.parent_dua_nama
                          );

                          var allOptions = [4, 132, 196, 214];
                          var allds2 = userActivity.dataset_all_dua;

                          const commonElements2 = findCommonElements(
                            allOptions,
                            allds2
                          );

                          if (userActivity.dataset_all_satu != null) {
                            var allds1 = userActivity.dataset_all_satu;
                            const commonElements = findCommonElements(
                              allOptions,
                              allds1
                            );
                            if (commonElements.length > 0) {
                              sessionStorage.setItem("all_ds_1", "semua");
                            } else {
                              sessionStorage.setItem(
                                "all_ds_1",
                                "[" +
                                  userActivity.dataset_all_satu[
                                    userActivity.dataset_all_satu.length - 3
                                  ] +
                                  "]"
                              );
                            }
                          } else {
                            sessionStorage.setItem("all_ds_1", "semua");
                          }

                          if (userActivity.dataset_all_dua != null) {
                            if (commonElements2.length > 0) {
                              sessionStorage.setItem("all_ds_2", "semua");
                            } else {
                              sessionStorage.setItem(
                                "all_ds_2",
                                "[" +
                                  userActivity.dataset_all_dua[
                                    userActivity.dataset_all_dua.length - 3
                                  ] +
                                  "]"
                              );
                            }
                          } else {
                            sessionStorage.setItem("all_ds_2", "semua");
                          }

                          sessionStorage.setItem(
                            "selectedData",
                            JSON.stringify({
                              parent_id_1: userActivity.parent_satu,
                              parent_id_2: userActivity.parent_dua,
                              dataset_1:
                                userActivity.dataset_array_satu == null
                                  ? "semua"
                                  : userActivity.dataset_array_satu,
                              dataset_2:
                                userActivity.dataset_array_dua == null
                                  ? "semua"
                                  : userActivity.dataset_array_dua,
                              LabelnyaTimeseries_1: labels,
                              LabelnyaTimeseries_2: labels2,
                              labelset1: labels,
                              labelset2: labels2,
                              all_ds1_set:
                                userActivity.dataset_array_satu == null
                                  ? []
                                  : userActivity.dataset_array_satu,
                              all_ds2_set:
                                userActivity.dataset_array_dua == null
                                  ? []
                                  : userActivity.dataset_array_dua,
                              ds1_child: userActivity.parent_satu,
                              ds2_child: userActivity.parent_dua,
                              ds1_parent: userActivity.root_dataset_satu,
                              ds2_parent: userActivity.root_dataset_dua,
                              grafikTimeseries: [],
                              grafikTimeseries2: [],
                              namachild: userActivity.parent_satu_nama,
                              sumberTimeseries: "",
                            })
                          );
                          if (userActivity.tahun == "semua") {
                            window.location.href = "/Utak-Atik-Grafik#scroll";
                          } else {
                            window.location.href = "/Utak-Atik-Grafik";
                          }
                        } else if (userActivity.halaman_tipe == "BERKACA") {
                          if (userActivity.id_parent_wilayah_dua !== null) {
                            sessionStorage.setItem(
                              "idkota_berkaca2",
                              userActivity.id_wilayah_dua
                            );
                            sessionStorage.setItem(
                              "namakota_berkaca2",
                              userActivity.wilayah_dua
                            );
                            sessionStorage.setItem(
                              "namawilayah_berkaca2",
                              userActivity.wilayah_dua
                            );
                            sessionStorage.setItem(
                              "idprovinsi_berkaca2",
                              userActivity.id_parent_wilayah_dua
                            );
                            sessionStorage.setItem(
                              "idwilayah_berkaca2",
                              userActivity.id_wilayah_dua
                            );
                            saveNamaProvince2(userActivity.id_parent_wilayah_dua);
                          } else {
                            sessionStorage.setItem(
                              "idkota_berkaca2",
                              userActivity.id_wilayah_dua
                            );
                            sessionStorage.setItem("namakota_berkaca2", "Semua");
                            sessionStorage.setItem(
                              "namawilayah_berkaca2",
                              "Semua"
                            );
                            sessionStorage.setItem(
                              "idprovinsi_berkaca2",
                              userActivity.id_wilayah_dua
                            );
                            sessionStorage.setItem(
                              "idwilayah_berkaca2",
                              userActivity.id_wilayah_dua
                            );
                            saveNamaProvince2(userActivity.id_wilayah_dua);
                          }
                          var labels = [];
                          if (userActivity.dataset_array_satu != null) {
                            for (
                              var i = 0;
                              i < userActivity.dataset_array_satu.length;
                              i++
                            ) {
                              labels[userActivity.dataset_array_satu[i]] =
                                userActivity.dataset_array_satu_nama[i];
                            }
                          } else {
                            labels[userActivity.parent_satu] =
                              userActivity.parent_satu_nama;
                          }
                          var labels2 = [];
                          if (userActivity.dataset_array_dua != null) {
                            for (
                              var i = 0;
                              i < userActivity.dataset_array_dua.length;
                              i++
                            ) {
                              labels2[userActivity.dataset_array_dua[i]] =
                                userActivity.dataset_array_dua_nama[i];
                            }
                          } else {
                            labels2[userActivity.parent_dua] =
                              userActivity.parent_dua_nama;
                          }
                          var xhr = new XMLHttpRequest();
                          xhr.onload = function () {
                            var response = JSON.parse(xhr.responseText);
                            if (userActivity.tahun == "semua") {
                              sessionStorage.setItem(
                                "yearss",
                                response.data[0].tahun
                              );
                            } else {
                              sessionStorage.setItem(
                                "yearss",
                                userActivity.tahun
                              );
                            }
                          };
                          xhr.open(
                            "GET",
                            process.env.REACT_APP_URL_API + "/year",
                            false
                          );
                          xhr.send();
                          sessionStorage.setItem(
                            "namaFilter1",
                            userActivity.parent_satu_nama
                          );
                          sessionStorage.setItem(
                            "namaFilter2",
                            userActivity.parent_dua_nama
                          );
                          sessionStorage.setItem(
                            "idwilayah_berkaca2",
                            userActivity.id_wilayah_dua
                          );

                          var allOptions = [4, 132, 196, 214];
                          var allds2 = userActivity.dataset_all_dua;

                          const commonElements2 = findCommonElements(
                            allOptions,
                            allds2
                          );

                          if (userActivity.dataset_all_satu != null) {
                            var allds1 = userActivity.dataset_all_satu;
                            const commonElements = findCommonElements(
                              allOptions,
                              allds1
                            );
                            if (commonElements.length > 0) {
                              sessionStorage.setItem("all_ds_1", "semua");
                            } else {
                              sessionStorage.setItem(
                                "all_ds_1",
                                "[" +
                                  userActivity.dataset_all_satu[
                                    userActivity.dataset_all_satu.length - 3
                                  ] +
                                  "]"
                              );
                            }
                          } else {
                            sessionStorage.setItem("all_ds_1", "semua");
                          }

                          if (userActivity.dataset_all_dua != null) {
                            if (commonElements2.length > 0) {
                              sessionStorage.setItem("all_ds_2", "semua");
                            } else {
                              sessionStorage.setItem(
                                "all_ds_2",
                                "[" +
                                  userActivity.dataset_all_dua[
                                    userActivity.dataset_all_dua.length - 3
                                  ] +
                                  "]"
                              );
                            }
                          } else {
                            sessionStorage.setItem("all_ds_2", "semua");
                          }

                          sessionStorage.setItem(
                            "selectedDataBerkaca",
                            JSON.stringify({
                              parent_id_1Berkaca: userActivity.parent_satu,
                              parent_id_2Berkaca: userActivity.parent_dua,
                              dataset_1Berkaca:
                                userActivity.dataset_array_satu == null
                                  ? "semua"
                                  : userActivity.dataset_array_satu,
                              dataset_2Berkaca:
                                userActivity.dataset_array_dua == null
                                  ? "semua"
                                  : userActivity.dataset_array_dua,
                              LabelnyaTimeseries_1: labels,
                              LabelnyaTimeseries_2: labels2,
                              labelset1: labels,
                              labelset2: labels2,
                              all_ds1_set:
                                userActivity.dataset_array_satu == null
                                  ? []
                                  : userActivity.dataset_array_satu,
                              all_ds2_set:
                                userActivity.dataset_array_dua == null
                                  ? []
                                  : userActivity.dataset_array_dua,
                              ds1_child: userActivity.parent_satu,
                              ds2_child: userActivity.parent_dua,
                              ds1_parent: userActivity.root_dataset_satu,
                              ds2_parent: userActivity.root_dataset_dua,
                              grafikTimeseries: [],
                              grafikTimeseries2: [],
                              namachild: userActivity.parent_satu_nama,
                              sumberTimeseries: "",
                            })
                          );
                          if (userActivity.tahun == "semua") {
                            window.location.href = "/Berkaca-Grafik-Timeseries";
                          } else {
                            window.location.href = "/Berkaca-Grafik-PieChart";
                          }
                        }
                      }}
                    >
                      <div className="flex items-center justify-center">
                        <img
                          src={
                            userActivity.halaman_tipe === "JELAJAH"
                              ? imgcard
                              : userActivity.halaman_tipe === "UTAK-ATIK"
                              ? imgcard2
                              : userActivity.halaman_tipe === "BERKACA"
                              ? imgcard3
                              : null
                          }
                          alt="Gambar"
                          className="w-24 h-24 rounded-lg mr-3 bg-white"
                        />
                        <div>
                          <p className="text-sm font-medium mb-1">
                            {userActivity.tahun}
                          </p>
                          <p className="text-xl font-bold mb-1">
                            {userActivity.halaman_tipe === "BERKACA" ? (
                              <p>
                                {userActivity.wilayah_satu}&nbsp;&&nbsp;
                                {userActivity.wilayah_dua}
                              </p>
                            ) : (
                              <p>{userActivity.wilayah_satu}</p>
                            )}
                          </p>
                          <p className="text-sm font-medium mb-1">
                            {userActivity.halaman_tipe === "JELAJAH" ? (
                              <p>{userActivity.dataset_satu}</p>
                            ) : userActivity.halaman_tipe === "UTAK-ATIK" ? (
                              <p>
                                1.&nbsp;
                                {userActivity.dataset_satu
                                  ? userActivity.dataset_satu.length > 45
                                    ? userActivity.dataset_satu?.substring(
                                        0,
                                        45
                                      ) + "..."
                                    : userActivity.dataset_satu
                                  : userActivity.dataset_satu}
                              </p>
                            ) : userActivity.halaman_tipe === "BERKACA" ? (
                              <p>
                                1.&nbsp;
                                {userActivity.dataset_satu
                                  ? userActivity.dataset_satu.length > 45
                                    ? userActivity.dataset_satu?.substring(
                                        0,
                                        45
                                      ) + "..."
                                    : userActivity.dataset_satu
                                  : userActivity.dataset_satu}
                              </p>
                            ) : null}
                          </p>
                          <p className="text-sm font-medium mb-1">
                            {userActivity.halaman_tipe === "JELAJAH" ? (
                              <p>{userActivity.dataset_dua}</p>
                            ) : userActivity.halaman_tipe === "UTAK-ATIK" ? (
                              <p>
                                2.&nbsp;
                                {userActivity.dataset_dua
                                  ? userActivity.dataset_dua.length > 45
                                    ? userActivity.dataset_dua?.substring(0, 45) +
                                      "..."
                                    : userActivity.dataset_dua
                                  : userActivity.dataset_dua}
                              </p>
                            ) : userActivity.halaman_tipe === "BERKACA" ? (
                              <p>
                                2.&nbsp;
                                {userActivity.dataset_dua
                                  ? userActivity.dataset_dua.length > 45
                                    ? userActivity.dataset_dua?.substring(0, 45) +
                                      "..."
                                    : userActivity.dataset_dua
                                  : userActivity.dataset_dua}
                              </p>
                            ) : null}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {userActivity.timestamps}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center mt-[20px] mb-[20px] px-[20px]">
                  <div className="flex justify-end">{renderPageButtons()}</div>
                </div>
              </section>
            )}
            {activeTab === "save" && (
              <div>
                <div className="flex justify-center mt-4 mb-4 gap-x-[10px] mx-[20px]">
                  <button
                    className={`py-2 px-4 rounded-[10px] ${
                      selectedTab === "all"
                        ? "bg-[#86bbd8] text-white"
                        : "bg-[#86bbd8] text-white"
                    }`}
                    style={
                      selectedTab === "all"
                        ? { boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.2)" }
                        : {}
                    }
                    onClick={() => {
                      setSelectedTab("all");
                      setIsStepOne(true);
                    }}
                  >
                    Semua
                  </button>
                  {/* <button
                    className={`py-2 px-4 rounded-[10px] ${
                      selectedTab === "collection"
                        ? "bg-[#86bbd8] text-white"
                        : "bg-[#86bbd8] text-white"
                    }`}
                    style={
                      selectedTab === "collection"
                        ? { boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.2)" }
                        : {}
                    }
                    onClick={() => setSelectedTab("collection")}
                  >
                    Koleksi
                  </button> */}
                </div>
                {selectedTab === "all" && (
                  <div>
                    {belumAdaData != null ? (
                      <p className="flex justify-center bg-primary text-secondary mb-[50px] p-[10px] mt-[50px] rounded-lg text-center items-center">
                        {belumAdaData}
                      </p>
                    ) : (
                      <section>
                        <div className="flex items-center justify-center mt-[20px] mb-[20px]">
                          <div className="flex justify-between items-center w-full">
                            {showBtnDelete === true ? (
                              <div className="flex items-center ml-auto">
                                <div
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setDeleteCheckbox(true);
                                    setShowBtnDelete(false);
                                  }}
                                >
                                  <img
                                    src={hapus}
                                    alt=""
                                    className="w-[30px] md:w-[30px] lg:w-[33px] transition-transform duration-300 transform hover:scale-110"
                                  />
                                </div>
                                <div className="px-[10px] cursor-pointer">
                                  <img
                                    src={sortIcon}
                                    alt=""
                                    className={`w-[30px] h-[30px] object-contain cursor-pointer hover:scale-[110%] ${
                                      !sortingDataSaveAll && "rotate-180"
                                    }`}
                                    onClick={() =>
                                      setSortingDataSaveAll(!sortingDataSaveAll)
                                    }
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-start lg:mb-[20px] xl:mb-[20px] md:mb-[20px] lg:mt-[20px] xl:mt-[20px] md:mt-[20px] xl:ml-[20px] lg:ml-[20px] md:ml-0">
                                <a
                                  className={`relative cursor-pointer`}
                                  onClick={() => {
                                    setDeleteCheckbox(false);
                                    setShowBtnDelete(true);
                                    resetCheckboxes();
                                  }}
                                >
                                  <img
                                    src={back}
                                    alt=""
                                    className="w-[30px] md:w-[30px] lg:w-[40px] transition-transform duration-300 transform hover:scale-110"
                                  />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                        {dataSaveAllUser?.map((userActivity) => (
                          <div className="w-full flex">
                            <div
                              className="w-full flex items-start justify-between bg-primary text-secondary hover:bg-third hover:text-white p-[20px] rounded-lg cursor-pointer"
                              onClick={() => {
                                if (
                                  userActivity.id_parent_wilayah_satu !== null
                                ) {
                                  sessionStorage.setItem(
                                    "yearss",
                                    userActivity.tahun
                                  );
                                  sessionStorage.setItem(
                                    "idkota",
                                    userActivity.id_wilayah_satu
                                  );
                                  sessionStorage.setItem(
                                    "namakota",
                                    userActivity.wilayah_satu
                                  );
                                  sessionStorage.setItem(
                                    "namawilayah",
                                    userActivity.wilayah_satu
                                  );
                                  sessionStorage.setItem(
                                    "idprovinsi",
                                    userActivity.id_parent_wilayah_satu
                                  );
                                  sessionStorage.setItem(
                                    "idwilayah",
                                    userActivity.id_wilayah_satu
                                  );
                                  saveNamaProvince(
                                    userActivity.id_parent_wilayah_satu
                                  );
                                } else {
                                  sessionStorage.setItem(
                                    "yearss",
                                    userActivity.tahun
                                  );
                                  sessionStorage.setItem(
                                    "idkota",
                                    userActivity.id_wilayah_satu
                                  );
                                  sessionStorage.setItem("namakota", "Semua");
                                  sessionStorage.setItem("namawilayah", "Semua");
                                  sessionStorage.setItem(
                                    "idprovinsi",
                                    userActivity.id_wilayah_satu
                                  );
                                  sessionStorage.setItem(
                                    "idwilayah",
                                    userActivity.id_wilayah_satu
                                  );
                                  saveNamaProvince(userActivity.id_wilayah_satu);
                                }
                                if (userActivity.halaman_tipe == "JELAJAH") {
                                  ///DATASET JELAJAH
                                  sessionStorage.setItem(
                                    "historyTipePeringkat",
                                    userActivity.peringkat
                                  );
                                  sessionStorage.setItem(
                                    "historyParentDataset",
                                    userActivity.parent_dataset
                                  );
                                  const lastElement =
                                    userActivity.dataset_array_satu.at(-1);
                                  sessionStorage.setItem(
                                    "historyChildDatasetArray",
                                    JSON.stringify(
                                      userActivity.dataset_array_satu
                                    )
                                  );
                                  sessionStorage.setItem(
                                    "historyChildDataset",
                                    lastElement
                                  );
                                  window.location.href = "/Jelajah-Main";
                                } else if (
                                  userActivity.halaman_tipe == "UTAK-ATIK"
                                ) {
                                  var labels = [];
                                  if (userActivity.dataset_array_satu != null) {
                                    for (
                                      var i = 0;
                                      i < userActivity.dataset_array_satu.length;
                                      i++
                                    ) {
                                      labels[userActivity.dataset_array_satu[i]] =
                                        userActivity.dataset_array_satu_nama[i];
                                    }
                                  } else {
                                    labels[userActivity.parent_satu] =
                                      userActivity.parent_satu_nama;
                                  }
                                  var labels2 = [];
                                  if (userActivity.dataset_array_dua != null) {
                                    for (
                                      var i = 0;
                                      i < userActivity.dataset_array_dua.length;
                                      i++
                                    ) {
                                      labels2[userActivity.dataset_array_dua[i]] =
                                        userActivity.dataset_array_dua_nama[i];
                                    }
                                  } else {
                                    labels2[userActivity.parent_dua] =
                                      userActivity.parent_dua_nama;
                                  }
                                  var xhr = new XMLHttpRequest();
                                  xhr.onload = function () {
                                    var response = JSON.parse(xhr.responseText);
                                    if (userActivity.tahun == "semua") {
                                      sessionStorage.setItem(
                                        "yearss",
                                        response.data[0].tahun
                                      );
                                    } else {
                                      sessionStorage.setItem(
                                        "yearss",
                                        userActivity.tahun
                                      );
                                    }
                                  };
                                  xhr.open(
                                    "GET",
                                    process.env.REACT_APP_URL_API + "/year",
                                    false
                                  );
                                  xhr.send();
                                  sessionStorage.setItem(
                                    "namaFilter1",
                                    userActivity.parent_satu_nama
                                  );
                                  sessionStorage.setItem(
                                    "namaFilter2",
                                    userActivity.parent_dua_nama
                                  );

                                  var allOptions = [4, 132, 196, 214];
                                  var allds2 = userActivity.dataset_all_dua;

                                  const commonElements2 = findCommonElements(
                                    allOptions,
                                    allds2
                                  );

                                  if (userActivity.dataset_all_satu != null) {
                                    var allds1 = userActivity.dataset_all_satu;
                                    const commonElements = findCommonElements(
                                      allOptions,
                                      allds1
                                    );
                                    if (commonElements.length > 0) {
                                      sessionStorage.setItem("all_ds_1", "semua");
                                    } else {
                                      sessionStorage.setItem(
                                        "all_ds_1",
                                        "[" +
                                          userActivity.dataset_all_satu[
                                            userActivity.dataset_all_satu.length -
                                              3
                                          ] +
                                          "]"
                                      );
                                    }
                                  } else {
                                    sessionStorage.setItem("all_ds_1", "semua");
                                  }

                                  if (userActivity.dataset_all_dua != null) {
                                    if (commonElements2.length > 0) {
                                      sessionStorage.setItem("all_ds_2", "semua");
                                    } else {
                                      sessionStorage.setItem(
                                        "all_ds_2",
                                        "[" +
                                          userActivity.dataset_all_dua[
                                            userActivity.dataset_all_dua.length -
                                              3
                                          ] +
                                          "]"
                                      );
                                    }
                                  } else {
                                    sessionStorage.setItem("all_ds_2", "semua");
                                  }

                                  sessionStorage.setItem(
                                    "selectedData",
                                    JSON.stringify({
                                      parent_id_1: userActivity.parent_satu,
                                      parent_id_2: userActivity.parent_dua,
                                      dataset_1:
                                        userActivity.dataset_array_satu == null
                                          ? "semua"
                                          : userActivity.dataset_array_satu,
                                      dataset_2:
                                        userActivity.dataset_array_dua == null
                                          ? "semua"
                                          : userActivity.dataset_array_dua,
                                      LabelnyaTimeseries_1: labels,
                                      LabelnyaTimeseries_2: labels2,
                                      labelset1: labels,
                                      labelset2: labels2,
                                      all_ds1_set:
                                        userActivity.dataset_array_satu == null
                                          ? []
                                          : userActivity.dataset_array_satu,
                                      all_ds2_set:
                                        userActivity.dataset_array_dua == null
                                          ? []
                                          : userActivity.dataset_array_dua,
                                      ds1_child: userActivity.parent_satu,
                                      ds2_child: userActivity.parent_dua,
                                      ds1_parent: userActivity.root_dataset_satu,
                                      ds2_parent: userActivity.root_dataset_dua,
                                      grafikTimeseries: [],
                                      grafikTimeseries2: [],
                                      namachild: userActivity.parent_satu_nama,
                                      sumberTimeseries: "",
                                    })
                                  );
                                  if (userActivity.tahun == "semua") {
                                    window.location.href =
                                      "/Utak-Atik-Grafik#scroll";
                                  } else {
                                    window.location.href = "/Utak-Atik-Grafik";
                                  }
                                } else if (
                                  userActivity.halaman_tipe == "BERKACA"
                                ) {
                                  if (
                                    userActivity.id_parent_wilayah_dua !== null
                                  ) {
                                    sessionStorage.setItem(
                                      "idkota_berkaca2",
                                      userActivity.id_wilayah_dua
                                    );
                                    sessionStorage.setItem(
                                      "namakota_berkaca2",
                                      userActivity.wilayah_dua
                                    );
                                    sessionStorage.setItem(
                                      "namawilayah_berkaca2",
                                      userActivity.wilayah_dua
                                    );
                                    sessionStorage.setItem(
                                      "idprovinsi_berkaca2",
                                      userActivity.id_parent_wilayah_dua
                                    );
                                    sessionStorage.setItem(
                                      "idwilayah_berkaca2",
                                      userActivity.id_wilayah_dua
                                    );
                                    saveNamaProvince2(
                                      userActivity.id_parent_wilayah_dua
                                    );
                                  } else {
                                    sessionStorage.setItem(
                                      "idkota_berkaca2",
                                      userActivity.id_wilayah_dua
                                    );
                                    sessionStorage.setItem(
                                      "namakota_berkaca2",
                                      "Semua"
                                    );
                                    sessionStorage.setItem(
                                      "namawilayah_berkaca2",
                                      "Semua"
                                    );
                                    sessionStorage.setItem(
                                      "idprovinsi_berkaca2",
                                      userActivity.id_wilayah_dua
                                    );
                                    sessionStorage.setItem(
                                      "idwilayah_berkaca2",
                                      userActivity.id_wilayah_dua
                                    );
                                    saveNamaProvince2(
                                      userActivity.id_wilayah_dua
                                    );
                                  }
                                  var labels = [];
                                  if (userActivity.dataset_array_satu != null) {
                                    for (
                                      var i = 0;
                                      i < userActivity.dataset_array_satu.length;
                                      i++
                                    ) {
                                      labels[userActivity.dataset_array_satu[i]] =
                                        userActivity.dataset_array_satu_nama[i];
                                    }
                                  } else {
                                    labels[userActivity.parent_satu] =
                                      userActivity.parent_satu_nama;
                                  }
                                  var labels2 = [];
                                  if (userActivity.dataset_array_dua != null) {
                                    for (
                                      var i = 0;
                                      i < userActivity.dataset_array_dua.length;
                                      i++
                                    ) {
                                      labels2[userActivity.dataset_array_dua[i]] =
                                        userActivity.dataset_array_dua_nama[i];
                                    }
                                  } else {
                                    labels2[userActivity.parent_dua] =
                                      userActivity.parent_dua_nama;
                                  }
                                  var xhr = new XMLHttpRequest();
                                  xhr.onload = function () {
                                    var response = JSON.parse(xhr.responseText);
                                    if (userActivity.tahun == "semua") {
                                      sessionStorage.setItem(
                                        "yearss",
                                        response.data[0].tahun
                                      );
                                    } else {
                                      sessionStorage.setItem(
                                        "yearss",
                                        userActivity.tahun
                                      );
                                    }
                                  };
                                  xhr.open(
                                    "GET",
                                    process.env.REACT_APP_URL_API + "/year",
                                    false
                                  );
                                  xhr.send();
                                  sessionStorage.setItem(
                                    "namaFilter1",
                                    userActivity.parent_satu_nama
                                  );
                                  sessionStorage.setItem(
                                    "namaFilter2",
                                    userActivity.parent_dua_nama
                                  );
                                  sessionStorage.setItem(
                                    "idwilayah_berkaca2",
                                    userActivity.id_wilayah_dua
                                  );

                                  var allOptions = [4, 132, 196, 214];
                                  var allds2 = userActivity.dataset_all_dua;

                                  const commonElements2 = findCommonElements(
                                    allOptions,
                                    allds2
                                  );

                                  if (userActivity.dataset_all_satu != null) {
                                    var allds1 = userActivity.dataset_all_satu;
                                    const commonElements = findCommonElements(
                                      allOptions,
                                      allds1
                                    );
                                    if (commonElements.length > 0) {
                                      sessionStorage.setItem("all_ds_1", "semua");
                                    } else {
                                      sessionStorage.setItem(
                                        "all_ds_1",
                                        "[" +
                                          userActivity.dataset_all_satu[
                                            userActivity.dataset_all_satu.length -
                                              3
                                          ] +
                                          "]"
                                      );
                                    }
                                  } else {
                                    sessionStorage.setItem("all_ds_1", "semua");
                                  }

                                  if (userActivity.dataset_all_dua != null) {
                                    if (commonElements2.length > 0) {
                                      sessionStorage.setItem("all_ds_2", "semua");
                                    } else {
                                      sessionStorage.setItem(
                                        "all_ds_2",
                                        "[" +
                                          userActivity.dataset_all_dua[
                                            userActivity.dataset_all_dua.length -
                                              3
                                          ] +
                                          "]"
                                      );
                                    }
                                  } else {
                                    sessionStorage.setItem("all_ds_2", "semua");
                                  }

                                  sessionStorage.setItem(
                                    "selectedDataBerkaca",
                                    JSON.stringify({
                                      parent_id_1Berkaca:
                                        userActivity.parent_satu,
                                      parent_id_2Berkaca: userActivity.parent_dua,
                                      dataset_1Berkaca:
                                        userActivity.dataset_array_satu == null
                                          ? "semua"
                                          : userActivity.dataset_array_satu,
                                      dataset_2Berkaca:
                                        userActivity.dataset_array_dua == null
                                          ? "semua"
                                          : userActivity.dataset_array_dua,
                                      LabelnyaTimeseries_1: labels,
                                      LabelnyaTimeseries_2: labels2,
                                      labelset1: labels,
                                      labelset2: labels2,
                                      all_ds1_set:
                                        userActivity.dataset_array_satu == null
                                          ? []
                                          : userActivity.dataset_array_satu,
                                      all_ds2_set:
                                        userActivity.dataset_array_dua == null
                                          ? []
                                          : userActivity.dataset_array_dua,
                                      ds1_child: userActivity.parent_satu,
                                      ds2_child: userActivity.parent_dua,
                                      ds1_parent: userActivity.root_dataset_satu,
                                      ds2_parent: userActivity.root_dataset_dua,
                                      grafikTimeseries: [],
                                      grafikTimeseries2: [],
                                      namachild: userActivity.parent_satu_nama,
                                      sumberTimeseries: "",
                                    })
                                  );
                                  if (userActivity.tahun == "semua") {
                                    window.location.href =
                                      "/Berkaca-Grafik-Timeseries";
                                  } else {
                                    window.location.href =
                                      "/Berkaca-Grafik-PieChart";
                                  }
                                }
                              }}
                            >
                              <div className="flex items-center justify-center">
                                <img
                                  src={
                                    userActivity.halaman_tipe === "JELAJAH"
                                      ? imgcard
                                      : userActivity.halaman_tipe === "UTAK-ATIK"
                                      ? imgcard2
                                      : userActivity.halaman_tipe === "BERKACA"
                                      ? imgcard3
                                      : null
                                  }
                                  alt="Gambar"
                                  className="w-24 h-24 rounded-lg mr-3 bg-white"
                                />
                                <div>
                                  <p className="text-sm font-medium mb-1">
                                    {userActivity.tahun}
                                  </p>
                                  <p className="text-xl font-bold mb-1">
                                    {userActivity.halaman_tipe === "BERKACA" ? (
                                      <p>
                                        {userActivity.wilayah_satu}&nbsp;&&nbsp;
                                        {userActivity.wilayah_dua}
                                      </p>
                                    ) : (
                                      <p>{userActivity.wilayah_satu}</p>
                                    )}
                                  </p>
                                  <p className="text-sm font-medium mb-1">
                                    {userActivity.halaman_tipe === "JELAJAH" ? (
                                      <p>{userActivity.dataset_satu}</p>
                                    ) : userActivity.halaman_tipe ===
                                      "UTAK-ATIK" ? (
                                      <p>
                                        1.&nbsp;
                                        {userActivity.dataset_satu
                                          ? userActivity.dataset_satu.length > 45
                                            ? userActivity.dataset_satu?.substring(
                                                0,
                                                45
                                              ) + "..."
                                            : userActivity.dataset_satu
                                          : userActivity.dataset_satu}
                                      </p>
                                    ) : userActivity.halaman_tipe ===
                                      "BERKACA" ? (
                                      <p>
                                        1.&nbsp;
                                        {userActivity.dataset_satu
                                          ? userActivity.dataset_satu.length > 45
                                            ? userActivity.dataset_satu?.substring(
                                                0,
                                                45
                                              ) + "..."
                                            : userActivity.dataset_satu
                                          : userActivity.dataset_satu}
                                      </p>
                                    ) : null}
                                  </p>
                                  <p className="text-sm font-medium mb-1">
                                    {userActivity.halaman_tipe === "JELAJAH" ? (
                                      <p>{userActivity.dataset_dua}</p>
                                    ) : userActivity.halaman_tipe ===
                                      "UTAK-ATIK" ? (
                                      <p>
                                        2.&nbsp;
                                        {userActivity.dataset_dua
                                          ? userActivity.dataset_dua.length > 45
                                            ? userActivity.dataset_dua?.substring(
                                                0,
                                                45
                                              ) + "..."
                                            : userActivity.dataset_dua
                                          : userActivity.dataset_dua}
                                      </p>
                                    ) : userActivity.halaman_tipe ===
                                      "BERKACA" ? (
                                      <p>
                                        2.&nbsp;
                                        {userActivity.dataset_dua
                                          ? userActivity.dataset_dua.length > 45
                                            ? userActivity.dataset_dua?.substring(
                                                0,
                                                45
                                              ) + "..."
                                            : userActivity.dataset_dua
                                          : userActivity.dataset_dua}
                                      </p>
                                    ) : null}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  {userActivity.timestamps}
                                </p>
                              </div>
                            </div>
                            {deleteCheckbox == false ? (
                              <></>
                            ) : (
                              <div className="flex justify-center items-center mx-[20px]">
                                <label className="container">
                                  <input
                                    value={userActivity.id}
                                    className="idDelete peer cursor-pointer hidden after:opacity-100"
                                    type="checkbox"
                                    onChange={handleCheckboxChange}
                                  />
                                  <span className="inline-block w-[25px] h-[25px] rounded-[2px] border-2 border-secondary relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[13px] after:h-[13px] after:bg-secondary after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"></span>
                                </label>
                              </div>
                            )}
                          </div>
                        ))}
                        {deleteCheckbox === true ? (
                          <div className="flex justify-center lg:mb-[20px] xl:mb-[20px] md:mb-[20px] lg:mt-[20px] xl:mt-[20px] md:mt-[20px]">
                            <button
                              className={`py-2 px-4 rounded-[10px] text-white bg-[#CD3838] hover:bg-[#E54747]`}
                              onClick={() => {
                                if (checkNull == true) {
                                  isiCheckBox();
                                } else {
                                  PopUPDeleteDataSimpan(targetDelete);
                                }
                              }}
                            >
                              Hapus
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </section>
                    )}
                  </div>
                )}

                {selectedTab === "collection" && (
                  <div>
                    {belumAdaDataKoleksi != null ? (
                      <>
                        <div className="ml-[20px]">
                          <button
                            className={`py-2 px-5 rounded-[10px] text-white bg-third hover:bg-secondary flex items-center`}
                            onClick={handleAddNewCollectionClick}
                          >
                            <FontAwesomeIcon icon={faPlus} className=" mr-2" />
                            Tambah Koleksi
                          </button>
                        </div>
                        <p className="flex justify-center bg-primary text-secondary mb-[50px] p-[10px] mt-[50px] rounded-lg text-center items-center">
                          {belumAdaDataKoleksi}
                        </p>
                      </>
                    ) : (
                      <section className="flex flex-col">
                        <div>
                          {isStepOne ? (
                            <div>
                              <div className="flex items-center justify-center mt-[20px] mb-[20px]">
                                <div className="flex justify-between items-center w-full">
                                  {showBtnDeleteKoleksi === true ? (
                                    <>
                                      <div className="ml-[20px]">
                                        <button
                                          className={`py-2 px-5 rounded-[10px] text-white bg-third hover:bg-secondary flex items-center`}
                                          onClick={handleAddNewCollectionClick}
                                        >
                                          <FontAwesomeIcon
                                            icon={faPlus}
                                            className=" mr-2"
                                          />
                                          Tambah Koleksi
                                        </button>
                                      </div>
                                      <div className="flex items-center space-x-4 mr-[20px]">
                                        <div
                                          className="cursor-pointer"
                                          onClick={() => {
                                            setDeleteCheckboxKoleksi(true);
                                            setShowBtnDeleteKoleksi(false);
                                          }}
                                        >
                                          <img
                                            src={hapus}
                                            alt=""
                                            className="w-[30px] md:w-[30px] lg:w-[33px] transition-transform duration-300 transform hover:scale-110"
                                          />
                                        </div>
                                        {/* <div className="cursor-pointer">
                                          <img
                                            src={sortIcon}
                                            alt=""
                                            className={`w-[30px] h-[30px] object-contain cursor-pointer hover:scale-[110%] ${
                                              !sortingDataSaveKoleksi &&
                                              "rotate-180"
                                            }`}
                                            onClick={() =>
                                              setSortingDataSaveKoleksi(
                                                !sortingDataSaveKoleksi
                                              )
                                            }
                                          />
                                        </div> */}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="flex justify-start lg:mb-[20px] xl:mb-[20px] md:mb-[20px] lg:mt-[20px] xl:mt-[20px] md:mt-[20px] xl:ml-[20px] lg:ml-[20px] md:ml-[20px]">
                                      <a
                                        className={`relative cursor-pointer`}
                                        onClick={() => {
                                          setDeleteCheckboxKoleksi(false);
                                          setShowBtnDeleteKoleksi(true);
                                          resetCheckboxeskoleksi();
                                        }}
                                      >
                                        <img
                                          src={back}
                                          alt=""
                                          className="w-[30px] md:w-[30px] lg:w-[40px] transition-transform duration-300 transform hover:scale-110"
                                        />
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {collectiondata.map((item) => (
                                <div className="w-full flex">
                                  <div
                                    key={item.id}
                                    className="w-full flex items-start justify-between bg-primary text-secondary hover:bg-third hover:text-white p-[20px] rounded-lg cursor-pointer"
                                    onClick={() => {
                                      sessionStorage.setItem(
                                        "namaCollection",
                                        item.nama
                                      );
                                      sessionStorage.setItem(
                                        "idCollection",
                                        item.id
                                      );
                                      fetchSavedCollection(
                                        item.id,
                                        sortingDataSaveKoleksi
                                      );
                                      setSelectedItem(item.id);
                                    }}
                                  >
                                    <div className="flex items-center">
                                      <div>
                                        <p className="text-xl font-bold mb-1">
                                          {item.nama}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  {deleteCheckboxKoleksi === false ? (
                                    <></>
                                  ) : (
                                    <div className="flex justify-center items-center mx-[20px]">
                                      <label className="container">
                                        <input
                                          value={item.id}
                                          className="idDelete peer cursor-pointer hidden after:opacity-100"
                                          type="checkbox"
                                          onChange={handleCheckboxChangeKoleksi}
                                        />
                                        <span className="inline-block w-[25px] h-[25px] rounded-[2px] border-2 border-secondary relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[13px] after:h-[13px] after:bg-secondary after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"></span>
                                      </label>
                                    </div>
                                  )}
                                </div>
                              ))}
                              {deleteCheckboxKoleksi === true ? (
                                <div className="flex justify-center lg:mb-[20px] xl:mb-[20px] md:mb-[20px] lg:mt-[20px] xl:mt-[20px] md:mt-[20px]">
                                  <button
                                    className={`py-2 px-4 rounded-[10px] text-white bg-[#CD3838] hover:bg-[#E54747]`}
                                    onClick={() => {
                                      if (checkNull == true) {
                                        isiCheckBoxKoleksi();
                                      } else {
                                        PopUPDeleteDataSimpanKoleksi(
                                          targetDelete
                                        );
                                      }
                                    }}
                                  >
                                    Hapus
                                  </button>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          ) : (
                            <>
                              {belumAdaDataIsiKoleksi != null ? (
                                <>
                                  <div className="flex justify-between items-center w-full lg:mt-[20px] xl:mt-[20px] md:mt-[20px]">
                                    <div className="ml-[20px]">
                                      <a
                                        className="relative cursor-pointer"
                                        onClick={() => setIsStepOne(true)}
                                      >
                                        <img
                                          src={back}
                                          alt=""
                                          className="w-[30px] md:w-[30px] lg:w-[40px] transition-transform duration-300 transform hover:scale-110"
                                        />
                                      </a>
                                    </div>
                                    <div className="flex lg:mr-[250px] xl:mr-[640px] md:mr-[270px]">
                                      {collectiondata.map((ambil) => (
                                        <div
                                          key={ambil.id}
                                          className="text-secondary"
                                        >
                                          <div className="flex items-center">
                                            {selectedItem === ambil.id && (
                                              <>
                                                <div className="lg:mr-[5px]">
                                                  <p className="text-xl font-bold mb-1">
                                                    {ambil.nama}
                                                  </p>
                                                </div>
                                                <div className="">
                                                  <button
                                                    onClick={() =>
                                                      handleChangeCollectionClick(
                                                        ambil.id
                                                      )
                                                    }
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={faPen}
                                                      className=" mr-2"
                                                    />
                                                  </button>
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="flex justify-center bg-primary text-secondary mb-[50px] p-[10px] mt-[50px] rounded-lg text-center items-center">
                                      {belumAdaDataIsiKoleksi}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="new-collection-list mt-8">
                                    <div className="flex items-center justify-center mt-[20px] mb-[20px]">
                                      <div className="flex justify-between items-center w-full">
                                        {showBtnDeleteIsiKoleksi === true ? (
                                          <>
                                            <div className="ml-[20px]">
                                              <a
                                                className="relative cursor-pointer"
                                                onClick={() => setIsStepOne(true)}
                                              >
                                                <img
                                                  src={back}
                                                  alt=""
                                                  className="w-[30px] md:w-[30px] lg:w-[40px] transition-transform duration-300 transform hover:scale-110"
                                                />
                                              </a>
                                            </div>
                                            <div className="ml-[20px]">
                                              {collectiondata.map((ambil) => (
                                                <div
                                                  key={ambil.id}
                                                  className="text-secondary"
                                                >
                                                  <div className="flex items-center">
                                                    {selectedItem ===
                                                      ambil.id && (
                                                      <>
                                                        <div className="lg:mr-[5px]">
                                                          <p className="text-xl font-bold mb-1">
                                                            {ambil.nama}
                                                          </p>
                                                        </div>
                                                        <div className="">
                                                          <button
                                                            onClick={() =>
                                                              handleChangeCollectionClick(
                                                                ambil.id
                                                              )
                                                            }
                                                          >
                                                            <FontAwesomeIcon
                                                              icon={faPen}
                                                              className=" mr-2"
                                                            />
                                                          </button>
                                                        </div>
                                                      </>
                                                    )}
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                            <div className="flex items-center space-x-4 mr-[20px]">
                                              <div
                                                className="cursor-pointer"
                                                onClick={() => {
                                                  setDeleteCheckboxIsiKoleksi(
                                                    true
                                                  );
                                                  setShowBtnDeleteIsiKoleksi(
                                                    false
                                                  );
                                                  setMoveCheckboxIsiKoleksi(
                                                    "move"
                                                  );
                                                }}
                                              >
                                                <img
                                                  src={pindah}
                                                  alt=""
                                                  className="w-[30px] md:w-[30px] lg:w-[40px] transition-transform duration-300 transform hover:scale-110"
                                                />
                                              </div>
                                              <div
                                                className="cursor-pointer"
                                                onClick={() => {
                                                  setDeleteCheckboxIsiKoleksi(
                                                    true
                                                  );
                                                  setShowBtnDeleteIsiKoleksi(
                                                    false
                                                  );
                                                  setMoveCheckboxIsiKoleksi(
                                                    "delete"
                                                  );
                                                }}
                                              >
                                                <img
                                                  src={hapus}
                                                  alt=""
                                                  className="w-[30px] md:w-[30px] lg:w-[33px] transition-transform duration-300 transform hover:scale-110"
                                                />
                                              </div>
                                              <div className="cursor-pointer">
                                                <img
                                                  src={sortIcon}
                                                  alt=""
                                                  className={`w-[30px] h-[30px] object-contain cursor-pointer hover:scale-[110%] ${
                                                    !sortingDataSaveKoleksi &&
                                                    "rotate-180"
                                                  }`}
                                                  onClick={() =>
                                                    setSortingDataSaveKoleksi(
                                                      !sortingDataSaveKoleksi
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                          </>
                                        ) : (
                                          <div className="flex justify-start lg:mb-[20px] xl:mb-[20px] md:mb-[20px] lg:mt-[20px] xl:mt-[20px] md:mt-[20px] xl:ml-[20px] lg:ml-[20px] md:ml-[20px]">
                                            <a
                                              className={`relative cursor-pointer`}
                                              onClick={() => {
                                                setDeleteCheckboxIsiKoleksi(
                                                  false
                                                );
                                                setShowBtnDeleteIsiKoleksi(true);
                                                resetCheckboxesIsikoleksi();
                                              }}
                                            >
                                              {" "}
                                              <img
                                                src={back}
                                                alt=""
                                                className="w-[30px] md:w-[30px] lg:w-[40px] transition-transform duration-300 transform hover:scale-110"
                                              />
                                            </a>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    {collectionisidata.map((dataItem) => (
                                      <div className="w-full flex">
                                        <div
                                          key={dataItem.id}
                                          className="w-full flex items-start justify-between bg-primary text-secondary hover:bg-third hover:text-white p-[20px] rounded-lg cursor-pointer"
                                          onClick={() => {
                                            if (
                                              dataItem.id_parent_wilayah_satu !==
                                              null
                                            ) {
                                              sessionStorage.setItem(
                                                "yearss",
                                                dataItem.tahun
                                              );
                                              sessionStorage.setItem(
                                                "idkota",
                                                dataItem.id_wilayah_satu
                                              );
                                              sessionStorage.setItem(
                                                "namakota",
                                                dataItem.wilayah_satu
                                              );
                                              sessionStorage.setItem(
                                                "namawilayah",
                                                dataItem.wilayah_satu
                                              );
                                              sessionStorage.setItem(
                                                "idprovinsi",
                                                dataItem.id_parent_wilayah_satu
                                              );
                                              sessionStorage.setItem(
                                                "idwilayah",
                                                dataItem.id_wilayah_satu
                                              );
                                              saveNamaProvince(
                                                dataItem.id_parent_wilayah_satu
                                              );
                                            } else {
                                              sessionStorage.setItem(
                                                "yearss",
                                                dataItem.tahun
                                              );
                                              sessionStorage.setItem(
                                                "idkota",
                                                dataItem.id_wilayah_satu
                                              );
                                              sessionStorage.setItem(
                                                "namakota",
                                                "Semua"
                                              );
                                              sessionStorage.setItem(
                                                "namawilayah",
                                                "Semua"
                                              );
                                              sessionStorage.setItem(
                                                "idprovinsi",
                                                dataItem.id_wilayah_satu
                                              );
                                              sessionStorage.setItem(
                                                "idwilayah",
                                                dataItem.id_wilayah_satu
                                              );
                                              saveNamaProvince(
                                                dataItem.id_wilayah_satu
                                              );
                                            }
                                            if (
                                              dataItem.halaman_tipe === "JELAJAH"
                                            ) {
                                              sessionStorage.setItem(
                                                "historyTipePeringkat",
                                                dataItem.peringkat
                                              );
                                              sessionStorage.setItem(
                                                "historyParentDataset",
                                                dataItem.parent_dataset
                                              );
                                              const lastElement =
                                                dataItem.dataset_array_satu.at(
                                                  -1
                                                );
                                              sessionStorage.setItem(
                                                "historyChildDatasetArray",
                                                JSON.stringify(
                                                  dataItem.dataset_array_satu
                                                )
                                              );
                                              sessionStorage.setItem(
                                                "historyChildDataset",
                                                lastElement
                                              );
                                              window.location.href =
                                                "/Jelajah-Main";
                                            } else if (
                                              dataItem.halaman_tipe ===
                                              "UTAK-ATIK"
                                            ) {
                                              var labels = [];
                                              if (
                                                dataItem.dataset_array_satu !=
                                                null
                                              ) {
                                                for (
                                                  var i = 0;
                                                  i <
                                                  dataItem.dataset_array_satu
                                                    .length;
                                                  i++
                                                ) {
                                                  labels[
                                                    dataItem.dataset_array_satu[i]
                                                  ] =
                                                    dataItem.dataset_array_satu_nama[
                                                      i
                                                    ];
                                                }
                                              } else {
                                                labels[dataItem.parent_satu] =
                                                  dataItem.parent_satu_nama;
                                              }
                                              var labels2 = [];
                                              if (
                                                dataItem.dataset_array_dua != null
                                              ) {
                                                for (
                                                  var i = 0;
                                                  i <
                                                  dataItem.dataset_array_dua
                                                    .length;
                                                  i++
                                                ) {
                                                  labels2[
                                                    dataItem.dataset_array_dua[i]
                                                  ] =
                                                    dataItem.dataset_array_dua_nama[
                                                      i
                                                    ];
                                                }
                                              } else {
                                                labels2[dataItem.parent_dua] =
                                                  dataItem.parent_dua_nama;
                                              }
                                              var xhr = new XMLHttpRequest();
                                              xhr.onload = function () {
                                                var response = JSON.parse(
                                                  xhr.responseText
                                                );
                                                if (dataItem.tahun == "semua") {
                                                  sessionStorage.setItem(
                                                    "yearss",
                                                    response.data[0].tahun
                                                  );
                                                } else {
                                                  sessionStorage.setItem(
                                                    "yearss",
                                                    dataItem.tahun
                                                  );
                                                }
                                              };
                                              xhr.open(
                                                "GET",
                                                process.env.REACT_APP_URL_API +
                                                  "/year",
                                                false
                                              );
                                              xhr.send();
                                              sessionStorage.setItem(
                                                "namaFilter1",
                                                dataItem.parent_satu_nama
                                              );
                                              sessionStorage.setItem(
                                                "namaFilter2",
                                                dataItem.parent_dua_nama
                                              );

                                              var allOptions = [4, 132, 196, 214];
                                              var allds2 =
                                                dataItem.dataset_all_dua;

                                              const commonElements2 =
                                                findCommonElements(
                                                  allOptions,
                                                  allds2
                                                );

                                              if (
                                                dataItem.dataset_all_satu != null
                                              ) {
                                                var allds1 =
                                                  dataItem.dataset_all_satu;
                                                const commonElements =
                                                  findCommonElements(
                                                    allOptions,
                                                    allds1
                                                  );
                                                if (commonElements.length > 0) {
                                                  sessionStorage.setItem(
                                                    "all_ds_1",
                                                    "semua"
                                                  );
                                                } else {
                                                  sessionStorage.setItem(
                                                    "all_ds_1",
                                                    "[" +
                                                      dataItem.dataset_all_satu[
                                                        dataItem.dataset_all_satu
                                                          .length - 3
                                                      ] +
                                                      "]"
                                                  );
                                                }
                                              } else {
                                                sessionStorage.setItem(
                                                  "all_ds_1",
                                                  "semua"
                                                );
                                              }

                                              if (
                                                dataItem.dataset_all_dua != null
                                              ) {
                                                if (commonElements2.length > 0) {
                                                  sessionStorage.setItem(
                                                    "all_ds_2",
                                                    "semua"
                                                  );
                                                } else {
                                                  sessionStorage.setItem(
                                                    "all_ds_2",
                                                    "[" +
                                                      dataItem.dataset_all_dua[
                                                        dataItem.dataset_all_dua
                                                          .length - 3
                                                      ] +
                                                      "]"
                                                  );
                                                }
                                              } else {
                                                sessionStorage.setItem(
                                                  "all_ds_2",
                                                  "semua"
                                                );
                                              }

                                              sessionStorage.setItem(
                                                "selectedData",
                                                JSON.stringify({
                                                  parent_id_1:
                                                    dataItem.parent_satu,
                                                  parent_id_2:
                                                    dataItem.parent_dua,
                                                  dataset_1:
                                                    dataItem.dataset_array_satu ==
                                                    null
                                                      ? "semua"
                                                      : dataItem.dataset_array_satu,
                                                  dataset_2:
                                                    dataItem.dataset_array_dua ==
                                                    null
                                                      ? "semua"
                                                      : dataItem.dataset_array_dua,
                                                  LabelnyaTimeseries_1: labels,
                                                  LabelnyaTimeseries_2: labels2,
                                                  labelset1: labels,
                                                  labelset2: labels2,
                                                  all_ds1_set:
                                                    dataItem.dataset_array_satu ==
                                                    null
                                                      ? []
                                                      : dataItem.dataset_array_satu,
                                                  all_ds2_set:
                                                    dataItem.dataset_array_dua ==
                                                    null
                                                      ? []
                                                      : dataItem.dataset_array_dua,
                                                  ds1_child: dataItem.parent_satu,
                                                  ds2_child: dataItem.parent_dua,
                                                  ds1_parent:
                                                    dataItem.root_dataset_satu,
                                                  ds2_parent:
                                                    dataItem.root_dataset_dua,
                                                  grafikTimeseries: [],
                                                  grafikTimeseries2: [],
                                                  namachild:
                                                    dataItem.parent_satu_nama,
                                                  sumberTimeseries: "",
                                                })
                                              );
                                              if (dataItem.tahun == "semua") {
                                                window.location.href =
                                                  "/Utak-Atik-Grafik#scroll";
                                              } else {
                                                window.location.href =
                                                  "/Utak-Atik-Grafik";
                                              }
                                            } else if (
                                              dataItem.halaman_tipe === "BERKACA"
                                            ) {
                                              if (
                                                dataItem.id_parent_wilayah_dua !==
                                                null
                                              ) {
                                                sessionStorage.setItem(
                                                  "idkota_berkaca2",
                                                  dataItem.id_wilayah_dua
                                                );
                                                sessionStorage.setItem(
                                                  "namakota_berkaca2",
                                                  dataItem.wilayah_dua
                                                );
                                                sessionStorage.setItem(
                                                  "namawilayah_berkaca2",
                                                  dataItem.wilayah_dua
                                                );
                                                sessionStorage.setItem(
                                                  "idprovinsi_berkaca2",
                                                  dataItem.id_parent_wilayah_dua
                                                );
                                                sessionStorage.setItem(
                                                  "idwilayah_berkaca2",
                                                  dataItem.id_wilayah_dua
                                                );
                                                saveNamaProvince2(
                                                  dataItem.id_parent_wilayah_dua
                                                );
                                              } else {
                                                sessionStorage.setItem(
                                                  "idkota_berkaca2",
                                                  dataItem.id_wilayah_dua
                                                );
                                                sessionStorage.setItem(
                                                  "namakota_berkaca2",
                                                  "Semua"
                                                );
                                                sessionStorage.setItem(
                                                  "namawilayah_berkaca2",
                                                  "Semua"
                                                );
                                                sessionStorage.setItem(
                                                  "idprovinsi_berkaca2",
                                                  dataItem.id_wilayah_dua
                                                );
                                                sessionStorage.setItem(
                                                  "idwilayah_berkaca2",
                                                  dataItem.id_wilayah_dua
                                                );
                                                saveNamaProvince2(
                                                  dataItem.id_wilayah_dua
                                                );
                                              }
                                              var labels = [];
                                              if (
                                                dataItem.dataset_array_satu !=
                                                null
                                              ) {
                                                for (
                                                  var i = 0;
                                                  i <
                                                  dataItem.dataset_array_satu
                                                    .length;
                                                  i++
                                                ) {
                                                  labels[
                                                    dataItem.dataset_array_satu[i]
                                                  ] =
                                                    dataItem.dataset_array_satu_nama[
                                                      i
                                                    ];
                                                }
                                              } else {
                                                labels[dataItem.parent_satu] =
                                                  dataItem.parent_satu_nama;
                                              }
                                              var labels2 = [];
                                              if (
                                                dataItem.dataset_array_dua != null
                                              ) {
                                                for (
                                                  var i = 0;
                                                  i <
                                                  dataItem.dataset_array_dua
                                                    .length;
                                                  i++
                                                ) {
                                                  labels2[
                                                    dataItem.dataset_array_dua[i]
                                                  ] =
                                                    dataItem.dataset_array_dua_nama[
                                                      i
                                                    ];
                                                }
                                              } else {
                                                labels2[dataItem.parent_dua] =
                                                  dataItem.parent_dua_nama;
                                              }
                                              var xhr = new XMLHttpRequest();
                                              xhr.onload = function () {
                                                var response = JSON.parse(
                                                  xhr.responseText
                                                );
                                                if (dataItem.tahun == "semua") {
                                                  sessionStorage.setItem(
                                                    "yearss",
                                                    response.data[0].tahun
                                                  );
                                                } else {
                                                  sessionStorage.setItem(
                                                    "yearss",
                                                    dataItem.tahun
                                                  );
                                                }
                                              };
                                              xhr.open(
                                                "GET",
                                                process.env.REACT_APP_URL_API +
                                                  "/year",
                                                false
                                              );
                                              xhr.send();
                                              sessionStorage.setItem(
                                                "namaFilter1",
                                                dataItem.parent_satu_nama
                                              );
                                              sessionStorage.setItem(
                                                "namaFilter2",
                                                dataItem.parent_dua_nama
                                              );
                                              sessionStorage.setItem(
                                                "idwilayah_berkaca2",
                                                dataItem.id_wilayah_dua
                                              );

                                              var allOptions = [4, 132, 196, 214];
                                              var allds2 =
                                                dataItem.dataset_all_dua;

                                              const commonElements2 =
                                                findCommonElements(
                                                  allOptions,
                                                  allds2
                                                );

                                              if (
                                                dataItem.dataset_all_satu != null
                                              ) {
                                                var allds1 =
                                                  dataItem.dataset_all_satu;
                                                const commonElements =
                                                  findCommonElements(
                                                    allOptions,
                                                    allds1
                                                  );
                                                if (commonElements.length > 0) {
                                                  sessionStorage.setItem(
                                                    "all_ds_1",
                                                    "semua"
                                                  );
                                                } else {
                                                  sessionStorage.setItem(
                                                    "all_ds_1",
                                                    "[" +
                                                      dataItem.dataset_all_satu[
                                                        dataItem.dataset_all_satu
                                                          .length - 3
                                                      ] +
                                                      "]"
                                                  );
                                                }
                                              } else {
                                                sessionStorage.setItem(
                                                  "all_ds_1",
                                                  "semua"
                                                );
                                              }

                                              if (
                                                dataItem.dataset_all_dua != null
                                              ) {
                                                if (commonElements2.length > 0) {
                                                  sessionStorage.setItem(
                                                    "all_ds_2",
                                                    "semua"
                                                  );
                                                } else {
                                                  sessionStorage.setItem(
                                                    "all_ds_2",
                                                    "[" +
                                                      dataItem.dataset_all_dua[
                                                        dataItem.dataset_all_dua
                                                          .length - 3
                                                      ] +
                                                      "]"
                                                  );
                                                }
                                              } else {
                                                sessionStorage.setItem(
                                                  "all_ds_2",
                                                  "semua"
                                                );
                                              }

                                              sessionStorage.setItem(
                                                "selectedDataBerkaca",
                                                JSON.stringify({
                                                  parent_id_1Berkaca:
                                                    dataItem.parent_satu,
                                                  parent_id_2Berkaca:
                                                    dataItem.parent_dua,
                                                  dataset_1Berkaca:
                                                    dataItem.dataset_array_satu ==
                                                    null
                                                      ? "semua"
                                                      : dataItem.dataset_array_satu,
                                                  dataset_2Berkaca:
                                                    dataItem.dataset_array_dua ==
                                                    null
                                                      ? "semua"
                                                      : dataItem.dataset_array_dua,
                                                  LabelnyaTimeseries_1: labels,
                                                  LabelnyaTimeseries_2: labels2,
                                                  labelset1: labels,
                                                  labelset2: labels2,
                                                  all_ds1_set:
                                                    dataItem.dataset_array_satu ==
                                                    null
                                                      ? []
                                                      : dataItem.dataset_array_satu,
                                                  all_ds2_set:
                                                    dataItem.dataset_array_dua ==
                                                    null
                                                      ? []
                                                      : dataItem.dataset_array_dua,
                                                  ds1_child: dataItem.parent_satu,
                                                  ds2_child: dataItem.parent_dua,
                                                  ds1_parent:
                                                    dataItem.root_dataset_satu,
                                                  ds2_parent:
                                                    dataItem.root_dataset_dua,
                                                  grafikTimeseries: [],
                                                  grafikTimeseries2: [],
                                                  namachild:
                                                    dataItem.parent_satu_nama,
                                                  sumberTimeseries: "",
                                                })
                                              );
                                              if (dataItem.tahun == "semua") {
                                                window.location.href =
                                                  "/Berkaca-Grafik-Timeseries";
                                              } else {
                                                window.location.href =
                                                  "/Berkaca-Grafik-PieChart";
                                              }
                                            }
                                          }}
                                        >
                                          <div className="flex items-center justify-center">
                                            <img
                                              src={
                                                dataItem.halaman_tipe ===
                                                "JELAJAH"
                                                  ? imgcard
                                                  : dataItem.halaman_tipe ===
                                                    "UTAK-ATIK"
                                                  ? imgcard2
                                                  : dataItem.halaman_tipe ===
                                                    "BERKACA"
                                                  ? imgcard3
                                                  : null
                                              }
                                              alt="Gambar"
                                              className="w-24 h-24 rounded-lg mr-3 bg-white"
                                            />
                                            <div>
                                              <p className="text-sm font-medium mb-1">
                                                {dataItem.tahun}
                                              </p>
                                              <p className="text-xl font-bold mb-1">
                                                {dataItem.halaman_tipe ===
                                                "BERKACA" ? (
                                                  <p>
                                                    {dataItem.wilayah_satu}
                                                    &nbsp;&&nbsp;
                                                    {dataItem.wilayah_dua}
                                                  </p>
                                                ) : (
                                                  <p>{dataItem.wilayah_satu}</p>
                                                )}
                                              </p>
                                              <p className="text-sm font-medium mb-1">
                                                {dataItem.halaman_tipe ===
                                                "JELAJAH" ? (
                                                  <p>{dataItem.dataset_satu}</p>
                                                ) : dataItem.halaman_tipe ===
                                                  "UTAK-ATIK" ? (
                                                  <p>
                                                    1.&nbsp;
                                                    {dataItem.dataset_satu
                                                      ? dataItem.dataset_satu
                                                          .length > 45
                                                        ? dataItem.dataset_satu?.substring(
                                                            0,
                                                            45
                                                          ) + "..."
                                                        : dataItem.dataset_satu
                                                      : dataItem.dataset_satu}
                                                  </p>
                                                ) : dataItem.halaman_tipe ===
                                                  "BERKACA" ? (
                                                  <p>
                                                    1.&nbsp;
                                                    {dataItem.dataset_satu
                                                      ? dataItem.dataset_satu
                                                          .length > 45
                                                        ? dataItem.dataset_satu?.substring(
                                                            0,
                                                            45
                                                          ) + "..."
                                                        : dataItem.dataset_satu
                                                      : dataItem.dataset_satu}
                                                  </p>
                                                ) : null}
                                              </p>
                                              <p className="text-sm font-medium mb-1">
                                                {dataItem.halaman_tipe ===
                                                "JELAJAH" ? (
                                                  <p>{dataItem.dataset_dua}</p>
                                                ) : dataItem.halaman_tipe ===
                                                  "UTAK-ATIK" ? (
                                                  <p>
                                                    2.&nbsp;
                                                    {dataItem.dataset_dua
                                                      ? dataItem.dataset_dua
                                                          .length > 45
                                                        ? dataItem.dataset_dua?.substring(
                                                            0,
                                                            45
                                                          ) + "..."
                                                        : dataItem.dataset_dua
                                                      : dataItem.dataset_dua}
                                                  </p>
                                                ) : dataItem.halaman_tipe ===
                                                  "BERKACA" ? (
                                                  <p>
                                                    2.&nbsp;
                                                    {dataItem.dataset_dua
                                                      ? dataItem.dataset_dua
                                                          .length > 45
                                                        ? dataItem.dataset_dua?.substring(
                                                            0,
                                                            45
                                                          ) + "..."
                                                        : dataItem.dataset_dua
                                                      : dataItem.dataset_dua}
                                                  </p>
                                                ) : null}
                                              </p>
                                            </div>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium text-gray-500">
                                              {dataItem.timestamps}
                                            </p>
                                          </div>
                                        </div>
                                        {deleteCheckboxIsiKoleksi === false ? (
                                          <></>
                                        ) : (
                                          <>
                                            <div className="flex justify-center items-center mx-[20px]">
                                              <label className="container">
                                                <input
                                                  value={dataItem.id}
                                                  className="idDelete peer cursor-pointer hidden after:opacity-100"
                                                  type="checkbox"
                                                  onChange={(e) =>
                                                    handleCheckboxChangeIsiKoleksi(
                                                      moveCheckboxIsiKoleksi,
                                                      e.target.value
                                                    )
                                                  }
                                                />
                                                <span className="inline-block w-[25px] h-[25px] rounded-[2px] border-2 border-secondary relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[13px] after:h-[13px] after:bg-secondary after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"></span>
                                              </label>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    ))}
                                    {deleteCheckboxIsiKoleksi === true ? (
                                      <div className="flex justify-center lg:mb-[20px] xl:mb-[20px] md:mb-[20px] lg:mt-[20px] xl:mt-[20px] md:mt-[20px]">
                                        <button
                                          className={`py-2 px-4 rounded-[10px] text-white ${
                                            moveCheckboxIsiKoleksi === "move"
                                              ? "bg-[#24445A] hover:bg-[#86BBD8]"
                                              : "bg-[#CD3838] hover:bg-[#E54747]"
                                          }`}
                                          onClick={() => {
                                            if (
                                              moveCheckboxIsiKoleksi == "move"
                                            ) {
                                              Popupmovecollection();
                                            } else if (checkNull == true) {
                                              isiCheckBoxIsiKoleksi();
                                            } else {
                                              PopUPDeleteDataIsiKoleksi(
                                                targetDelete
                                              );
                                            }
                                          }}
                                        >
                                          {moveCheckboxIsiKoleksi === "move"
                                            ? "Pindahkan"
                                            : "Hapus"}
                                        </button>
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </section>
                    )}
                  </div>
                )}
              </div>
            )}
            {/* {selectedTab === "collection" && (
                  <div>
                    
                    <div className="flex items-center justify-between border-b pb-3 mb-3" style={{ marginLeft: "42px", marginRight: "42px", backgroundColor: "#FFFFFF",borderRadius: "10px" }}>
                    <div className="flex items-center" style={{ marginLeft: "10px"}}>
                        <img src={editicon} alt="Edit" />
                      </div>
                      <div>
                        <p className="text-xl font-bold mb-1">DATA KEUANGAN DAERAH 3T</p>
                      </div>
                      <div className="flex items-center" style={{ marginRight: "10px", marginTop: "10px"}}>
                        <img src={deleteicon} alt="delete" />
                      </div>
                    </div>
                    
                    
                    <div className="flex items-center justify-between border-b pb-3 mb-3" style={{ marginLeft: "42px", marginRight: "42px", backgroundColor: "#FFFFFF",borderRadius: "10px" }}>
                      <div className="flex items-center" style={{ marginLeft: "10px"}}>
                        <img src={editicon} alt="Edit" />
                      </div>
                      <div>
                        <p className="text-xl font-bold mb-1">DATA KEUANGAN DAERAH 3T</p>
                      </div>
                      <div className="flex items-center" style={{ marginRight: "10px", marginTop: "10px"}}>
                        <img src={deleteicon} alt="delete" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-b pb-3 mb-3" style={{ marginLeft: "42px", marginRight: "42px", backgroundColor: "#FFFFFF",borderRadius: "10px" }}>
                      <div className="flex items-center" style={{ marginLeft: "10px"}}>
                        <img src={editicon} alt="Edit" />
                      </div>
                      <div>
                        <p className="text-xl font-bold mb-1">DATA KEUANGAN DAERAH 3T</p>
                      </div>
                      <div className="flex items-center" style={{ marginRight: "10px", marginTop: "10px"}}>
                        <img src={deleteicon} alt="delete" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-b pb-3 mb-3" style={{ marginLeft: "42px", marginRight: "42px", backgroundColor: "#FFFFFF",borderRadius: "10px" }}>
                    < div className="flex items-center" style={{ marginLeft: "10px"}}>
                        <img src={editicon} alt="Edit" />
                      </div>
                      <div>
                        <p className="text-xl font-bold mb-1">DATA KEUANGAN DAERAH 3T</p>
                      </div>
                      <div className="flex items-center" style={{ marginRight: "10px", marginTop: "10px"}}>
                        <img src={deleteicon} alt="delete" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button className="bg-[#24445A] hover:bg-[#86BBD8] text-white  py-2 px-4 rounded">
                        Tambahkan Koleksi
                      </button>
                    </div>
                  </div>
                )} */}
          </div>
        </div>

        <div className="md:hidden mb-[120px]">
          <div className="w-full">
            <img
              src={geometrys}
              alt=""
              className="md:hidden fixed w-full top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10 opacity-10 object-cover"
            />
            <div className="text-secondary mt-[130px] text-center text-[24px] font-bold">
              <p>PROFIL AKUN</p>
            </div>
            <div className="flex flex-col w-full h-full bg-primary rounded-[45px] mt-[65px] items-center justify-start p-[40px]">
              <div className="absolute w-[100px] h-[100px] mx-auto top-[180px] bottom-0 left-0 right-0 bg-primary rounded-full">
                <div>
                  {imageUser ? (
                    <img
                      src={imageUser}
                      alt="Pics"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "5px solid #FFFFFF",
                      }}
                    />
                  ) : (
                    <img
                      src={ProfileImage}
                      alt="Pics"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "5px solid #FFFFFF",
                      }}
                    />
                  )}
                </div>
              </div>
              <p className="mt-[20px] text-secondary font-bold text-[20px]">
                {namaUser}
              </p>
              <p className=" text-secondary font-regular text-[14px]">{email}</p>
              <div className="flex flex-col items-center text-center px-[10px] lg:p-0">
                <img
                  src={kondisiVerif}
                  className="mt-[10px] rounded-lg w-auto lg:h-[40px] h-[30px]"
                />
                <a
                  className={`mt-[10px] text-secondary text-[12px] font-semibold cursor-pointer underline hover:opacity-70 mb-[10px] ${
                    askVerified ? "hidden" : ""
                  }`}
                  type="submit"
                  onClick={() => {
                    submitBerhasil();
                    sendOTP();
                  }}
                >
                  Verifikasi Akun
                </a>
                {/* <button
                  className={`button bg-secondary hover:bg-third font-medium mt-[10px] ${askVerified ? "hidden" : ""}`}
                  type="submit"
                  onClick={() => {
                    submitBerhasil();
                    sendOTP();
                  }}
                >
                  Verifikasi Akun
                </button> */}
              </div>
              {/* <div className="mx-auto text-center">
                <p
                  id="belumverif"
                  className="text-secondary text-[16px]"
                >
                  Akun Belum Verifikasi
                </p>
                <p
                  id="sudahverif"
                  className="text-secondary text-[16px]"
                >
                  Akun Sudah Verifikasi
                </p>
                <button
                  id="belumverif2"
                  className="button bg-secondary hover:bg-third font-medium mt-[10px]"
                  type="submit"
                  onClick={submitBerhasil}
                >
                  Verifikasi Akun
                </button>
              </div> */}

              <div className="flex flex-col items-center justify-center w-full h-[250px] bg-white mt-[10px] rounded-[20px]">
                <img
                  src={peta}
                  alt="Peta"
                  className="flex items-center w-[80px]"
                />
                <div className="flex justify-between gap-x-[5px] items-center mt-[10px]"></div>
                <div className="flex">
                  <div className="flex items-center justify-between gap-x-[5px]">
                    <div className="flex text-secondary">
                      <p className="text-right">
                        <p className="font-bold text-[12px]">{luaswilayah}</p>
                        <p className="font-regular text-italic text-[10px]">
                          km²
                        </p>
                      </p>
                    </div>
                    <div className="hover-container">
                      <img src={dataranicon} alt="" className="w-[30px]" />
                      <span className="hover-text w-auto mb-[10px] text-[10px]">
                        {luaswilayah}
                        <span>&nbsp;km²</span>
                        <p>
                          {ketinggian}
                          <span>&nbsp;mdpl</span>
                        </p>
                        <p>{datarannama}</p>
                      </span>
                    </div>
                    <div className="hover-container">
                      <img src={sektoricon} alt="" className="w-[30px]" />
                      <span className="hover-text w-auto mb-[10px] text-[10px]">
                        <p>{nilaisektor}</p>
                        <p>{sektornama}</p>
                      </span>
                    </div>
                    <div className="flex text-secondary">
                      <p className="text-left">
                        <p className="font-bold text-[12px]">
                          {Math.round(data_Penduduk)
                            .toLocaleString()
                            .replace(/,/g, ".")}
                        </p>
                        <p className="font-regular text-italic text-[10px]">
                          10³ Jiwa
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-x-[20px] mt-[10px]">
                  <div className="text-secondary text-center">
                    <p className="text-[14px] font-bold">{infoDaerah}</p>
                    <p className="font-semibold text-[10px]">{provincessNama}</p>
                  </div>
                </div>

                <div className="flex w-full justify-around items-center mt-[20px] text-center ">
                <div
                  className="flex flex-col items-center justify-center text-center"
                  style={{ color: "#24445A" }}
                >
                  <div className="text-[20px] lg:text-[40px] font-bold">
                    {totalDownload}
                  </div>
                  <div className="text-[16px] lg:text-lg font-semibold">
                    Unduh
                  </div>
                </div>
                <div
                  className=" flex flex-col items-center justify-center text-center"
                  style={{ color: "#24445A" }}
                >
                  <div className="text-[20px] lg:text-[40px] font-bold">
                    {totalSave}
                  </div>
                  <div className="text-[16px] lg:text-lg font-semibold">
                    Simpan
                  </div>
                </div>
                <div
                  className=" flex flex-col items-center justify-center text-center"
                  style={{ color: "#24445A" }}
                >
                  <div className="text-[20px] lg:text-[40px] font-bold">
                    {totalShare}
                  </div>
                  <div className="text-[16px] lg:text-lg font-semibold">Bagi</div>
                </div>
              </div>
              </div>

              {/* BUTTON EDIT PROFILE */}
              <div className="flex mt-[20px]">
                <a href="/Edit-Profile">
                  <button className="button bg-secondary hover:bg-third font-medium">
                    Ubah Data Diri
                  </button>
                </a>
              </div>
              {/* UBAH KATA SANDI */}
              <button
                className="button bg-secondary hover:bg-third font-medium mt-[10px]"
                onClick={togglePopupPass}
              >
                Ubah Kata Sandi
              </button>
              {showPopupPass && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10 ">
                  {step === 1 && (
                    <div className="flex flex-col bg-white rounded-[25px] justify-center items-center w-auto h-auto p-[40px]">
                      <form className="flex flex-col w-auto">
                        <h1 className="text-[20px] font-bold text-secondary text-center">
                          Ubah Kata Sandi
                        </h1>
                        <div className="mt-[35px]">
                          {/* Kata Sandi */}
                          <div className="w-full">
                            <label className="block text-secondary text-sm font-medium mb-[4px] text-[14px]">
                              Kata Sandi Lama
                            </label>
                            <div className="flex w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[12px] items-center justify-between">
                              <input
                                className="focus:outline-none focus:shadow-outline font-regular w-full"
                                id="password"
                                type={
                                  statekata.showPassword ? "text" : "password"
                                }
                                placeholder="Masukkan Kata Sandi"
                                name="password"
                                value={statekata.password}
                                onChange={(e) =>
                                  setStatekata((prevState) => ({
                                    ...prevState,
                                    password: e.target.value,
                                  }))
                                }
                                required
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="w-[30px]"
                              >
                                <FontAwesomeIcon
                                  icon={
                                    statekata.showPassword ? faEye : faEyeSlash
                                  }
                                  color="#24445A"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col w-full mt-[20px]">
                          <button
                            className="button focus:outline-none  focus:shadow-outline w-full bg-secondary hover:bg-third font-medium mt-[10px]"
                            type="button"
                            onClick={()=>{document.getElementById("loadingg").classList.remove("hidden")
                              submitPass()
                            }}
                          >
                            Selanjutnya
                          </button>
                          <button
                            className="button focus:outline-none  focus:shadow-outline w-full bg-[#CD3838] hover:bg-[#E54747] font-medium mt-[10px]"
                            type="button"
                            onClick={togglePopupPass}
                          >
                            Batalkan
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="flex flex-col bg-white rounded-[25px] justify-center items-center w-auto h-auto p-[40px]">
                      <form className="flex flex-col w-auto">
                        <h1 className="text-[20px] font-bold text-secondary text-center">
                          Ubah Kata Sandi
                        </h1>
                        <div className="mt-[35px]">
                          {/* Kata Sandi */}
                          <div className="w-full">
                            <label className="block text-secondary text-sm font-medium mb-[4px] text-[12px]">
                              Kata Sandi Baru
                            </label>
                            <div className="flex w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[12px] items-center justify-between">
                              <input
                                className="focus:outline-none focus:shadow-outline font-regular w-full"
                                id="newpassword"
                                type={
                                  statekata.showNewPassword ? "text" : "password"
                                }
                                placeholder="Masukkan Kata Sandi Baru"
                                name="newPassword"
                                value={statekata.newPassword}
                                onChange={(e) =>
                                  setStatekata((prevState) => ({
                                    ...prevState,
                                    newPassword: e.target.value,
                                  }))
                                }
                                // style={{ color: '#24445A' }}
                                required
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility2}
                                className="w-[30px]"
                              >
                                <FontAwesomeIcon
                                  icon={
                                    statekata.showNewPassword ? faEye : faEyeSlash
                                  }
                                  color="#24445A"
                                />
                              </button>
                            </div>
                          </div>
                          {/* Konfirm */}
                          <div className="mt-[10px] w-full">
                            <label className="block text-secondary text-sm font-medium mb-[4px] text-[12px]">
                              Konfirmasi Kata Sandi
                            </label>
                            <div className="flex w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[12px] items-center justify-between">
                              <input
                                className="focus:outline-none focus:shadow-outline font-regular w-full"
                                id="newPassword_confirmation"
                                type={
                                  statekata.showNewPassword2 ? "text" : "password"
                                }
                                placeholder="Konfirmasi Kata Sandi"
                                name="newPassword_confirmation"
                                value={statekata.newPassword_confirmation}
                                onChange={(e) =>
                                  setStatekata((prevState) => ({
                                    ...prevState,
                                    newPassword_confirmation: e.target.value,
                                  }))
                                }
                                required
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility3}
                                className="w-[30px]"
                              >
                                <FontAwesomeIcon
                                  icon={
                                    statekata.showNewPassword2
                                      ? faEye
                                      : faEyeSlash
                                  }
                                  color="#24445A"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col w-full mt-[20px]">
                          <button
                            className="button focus:outline-none  focus:shadow-outline w-full bg-secondary hover:bg-third font-medium mt-[10px]"
                            type="button"
                            onClick={submitNewPassword}
                          >
                            Selanjutnya
                          </button>
                          <button
                            className="button focus:outline-none  focus:shadow-outline w-full bg-[#CD3838] hover:bg-[#E54747] font-medium mt-[10px]"
                            type="button"
                            onClick={handleFormSebelum}
                          >
                            Sebelumnya
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
              {/* LOGOUT */}
              <div className="flex items-center justify-center">
                <NavLink
                  onClick={handleLogout}
                  className="button bg-[#CD3838] hover:bg-[#E54747] font-medium mt-[10px] text-center "
                >
                  Keluar Dari Akun
                </NavLink>
              </div>
            </div>
          </div>

          {/* Toggle button */}
          <div className="flex justify-center mb-[20px] mt-[20px]">
            <div className="grid grid-cols-2 gap-[10px] w-full bg-primary rounded-[10px] p-[10px]">
              <button
                className={`py-2 rounded-[10px] ${
                  activeTab === "activity"
                    ? "bg-[#EFF7FB] text-[#24445A]"
                    : "bg-[#24445A] text-white"
                }`}
                style={
                  activeTab === "activity"
                    ? { boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.6)" }
                    : {}
                }
                onClick={() => toggleTab("activity")}
              >
                Aktivitas
              </button>
              <button
                className={`py-2 rounded-[10px] ${
                  activeTab === "save"
                    ? "bg-[#EFF7FB] text-[#24445A]"
                    : "bg-[#24445A] text-white"
                }`}
                style={
                  activeTab === "save"
                    ? { boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.6)" }
                    : {}
                }
                onClick={() => toggleTab("save")}
              >
                Simpan
              </button>
            </div>
          </div>

          <div className="p-[10px] bg-primary rounded-[10px] w-full ">
            {activeTab === "activity" && (
              <section className="flex flex-col items-end">
                <div className="flex items-center justify-center mt-[20px] mb-[20px]">
                  <div>
                    <div className="px-[10px]">
                      <img
                        src={sortIcon}
                        alt=""
                        className={`w-[30px] h-[30px] object-contain cursor-pointer hover:scale-[110%] ${
                          !sortingData && "rotate-180"
                        }`}
                        onClick={() => {
                          setSortingData(!sortingData)
                          handlePageChange(1)
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                  {dataAktivitasUser?.map((userActivity) => (
                    <div
                      key={userActivity.id}
                      className="w-full flex items-start justify-between bg-primary text-secondary hover:bg-third hover:text-white p-[20px] rounded-lg cursor-pointer"
                      onClick={() => {
                        if (userActivity.id_parent_wilayah_satu !== null) {
                          sessionStorage.setItem("yearss", userActivity.tahun);
                          sessionStorage.setItem(
                            "idkota",
                            userActivity.id_wilayah_satu
                          );
                          sessionStorage.setItem(
                            "namakota",
                            userActivity.wilayah_satu
                          );
                          sessionStorage.setItem(
                            "namawilayah",
                            userActivity.wilayah_satu
                          );
                          sessionStorage.setItem(
                            "idprovinsi",
                            userActivity.id_parent_wilayah_satu
                          );
                          sessionStorage.setItem(
                            "idwilayah",
                            userActivity.id_wilayah_satu
                          );
                          saveNamaProvince(userActivity.id_parent_wilayah_satu);
                        } else {
                          sessionStorage.setItem("yearss", userActivity.tahun);
                          sessionStorage.setItem(
                            "idkota",
                            userActivity.id_wilayah_satu
                          );
                          sessionStorage.setItem("namakota", "Semua");
                          sessionStorage.setItem("namawilayah", "Semua");
                          sessionStorage.setItem(
                            "idprovinsi",
                            userActivity.id_wilayah_satu
                          );
                          sessionStorage.setItem(
                            "idwilayah",
                            userActivity.id_wilayah_satu
                          );
                          saveNamaProvince(userActivity.id_wilayah_satu);
                        }
                        if (userActivity.halaman_tipe == "JELAJAH") {
                          ///DATASET JELAJAH
                          sessionStorage.setItem(
                            "historyTipePeringkat",
                            userActivity.peringkat
                          );
                          sessionStorage.setItem(
                            "historyParentDataset",
                            userActivity.parent_dataset
                          );
                          const lastElement =
                            userActivity.dataset_array_satu.at(-1);
                          sessionStorage.setItem(
                            "historyChildDatasetArray",
                            JSON.stringify(userActivity.dataset_array_satu)
                          );
                          sessionStorage.setItem(
                            "historyChildDataset",
                            lastElement
                          );
                          window.location.href = "/Jelajah-Main";
                        } else if (userActivity.halaman_tipe == "UTAK-ATIK") {
                          var labels = [];
                          if (userActivity.dataset_array_satu != null) {
                            for (
                              var i = 0;
                              i < userActivity.dataset_array_satu.length;
                              i++
                            ) {
                              labels[userActivity.dataset_array_satu[i]] =
                                userActivity.dataset_array_satu_nama[i];
                            }
                          } else {
                            labels[userActivity.parent_satu] =
                              userActivity.parent_satu_nama;
                          }
                          var labels2 = [];
                          if (userActivity.dataset_array_dua != null) {
                            for (
                              var i = 0;
                              i < userActivity.dataset_array_dua.length;
                              i++
                            ) {
                              labels2[userActivity.dataset_array_dua[i]] =
                                userActivity.dataset_array_dua_nama[i];
                            }
                          } else {
                            labels2[userActivity.parent_dua] =
                              userActivity.parent_dua_nama;
                          }
                          var xhr = new XMLHttpRequest();
                          xhr.onload = function () {
                            var response = JSON.parse(xhr.responseText);
                            if (userActivity.tahun == "semua") {
                              sessionStorage.setItem(
                                "yearss",
                                response.data[0].tahun
                              );
                            } else {
                              sessionStorage.setItem(
                                "yearss",
                                userActivity.tahun
                              );
                            }
                          };
                          xhr.open(
                            "GET",
                            process.env.REACT_APP_URL_API + "/year",
                            false
                          );
                          xhr.send();
                          sessionStorage.setItem(
                            "namaFilter1",
                            userActivity.parent_satu_nama
                          );
                          sessionStorage.setItem(
                            "namaFilter2",
                            userActivity.parent_dua_nama
                          );

                          var allOptions = [4, 132, 196, 214];
                          var allds2 = userActivity.dataset_all_dua;

                          const commonElements2 = findCommonElements(
                            allOptions,
                            allds2
                          );

                          if (userActivity.dataset_all_satu != null) {
                            var allds1 = userActivity.dataset_all_satu;
                            const commonElements = findCommonElements(
                              allOptions,
                              allds1
                            );
                            if (commonElements.length > 0) {
                              sessionStorage.setItem("all_ds_1", "semua");
                            } else {
                              sessionStorage.setItem(
                                "all_ds_1",
                                "[" +
                                  userActivity.dataset_all_satu[
                                    userActivity.dataset_all_satu.length - 3
                                  ] +
                                  "]"
                              );
                            }
                          } else {
                            sessionStorage.setItem("all_ds_1", "semua");
                          }

                          if (userActivity.dataset_all_dua != null) {
                            if (commonElements2.length > 0) {
                              sessionStorage.setItem("all_ds_2", "semua");
                            } else {
                              sessionStorage.setItem(
                                "all_ds_2",
                                "[" +
                                  userActivity.dataset_all_dua[
                                    userActivity.dataset_all_dua.length - 3
                                  ] +
                                  "]"
                              );
                            }
                          } else {
                            sessionStorage.setItem("all_ds_2", "semua");
                          }

                          sessionStorage.setItem(
                            "selectedData",
                            JSON.stringify({
                              parent_id_1: userActivity.parent_satu,
                              parent_id_2: userActivity.parent_dua,
                              dataset_1:
                                userActivity.dataset_array_satu == null
                                  ? "semua"
                                  : userActivity.dataset_array_satu,
                              dataset_2:
                                userActivity.dataset_array_dua == null
                                  ? "semua"
                                  : userActivity.dataset_array_dua,
                              LabelnyaTimeseries_1: labels,
                              LabelnyaTimeseries_2: labels2,
                              labelset1: labels,
                              labelset2: labels2,
                              all_ds1_set:
                                userActivity.dataset_array_satu == null
                                  ? []
                                  : userActivity.dataset_array_satu,
                              all_ds2_set:
                                userActivity.dataset_array_dua == null
                                  ? []
                                  : userActivity.dataset_array_dua,
                              ds1_child: userActivity.parent_satu,
                              ds2_child: userActivity.parent_dua,
                              ds1_parent: userActivity.root_dataset_satu,
                              ds2_parent: userActivity.root_dataset_dua,
                              grafikTimeseries: [],
                              grafikTimeseries2: [],
                              namachild: userActivity.parent_satu_nama,
                              sumberTimeseries: "",
                            })
                          );
                          if (userActivity.tahun == "semua") {
                            window.location.href = "/Utak-Atik-Grafik#scroll";
                          } else {
                            window.location.href = "/Utak-Atik-Grafik";
                          }
                        } else if (userActivity.halaman_tipe == "BERKACA") {
                          if (userActivity.id_parent_wilayah_dua !== null) {
                            sessionStorage.setItem(
                              "idkota_berkaca2",
                              userActivity.id_wilayah_dua
                            );
                            sessionStorage.setItem(
                              "namakota_berkaca2",
                              userActivity.wilayah_dua
                            );
                            sessionStorage.setItem(
                              "namawilayah_berkaca2",
                              userActivity.wilayah_dua
                            );
                            sessionStorage.setItem(
                              "idprovinsi_berkaca2",
                              userActivity.id_parent_wilayah_dua
                            );
                            sessionStorage.setItem(
                              "idwilayah_berkaca2",
                              userActivity.id_wilayah_dua
                            );
                            saveNamaProvince2(userActivity.id_parent_wilayah_dua);
                          } else {
                            sessionStorage.setItem(
                              "idkota_berkaca2",
                              userActivity.id_wilayah_dua
                            );
                            sessionStorage.setItem("namakota_berkaca2", "Semua");
                            sessionStorage.setItem(
                              "namawilayah_berkaca2",
                              "Semua"
                            );
                            sessionStorage.setItem(
                              "idprovinsi_berkaca2",
                              userActivity.id_wilayah_dua
                            );
                            sessionStorage.setItem(
                              "idwilayah_berkaca2",
                              userActivity.id_wilayah_dua
                            );
                            saveNamaProvince2(userActivity.id_wilayah_dua);
                          }
                          var labels = [];
                          if (userActivity.dataset_array_satu != null) {
                            for (
                              var i = 0;
                              i < userActivity.dataset_array_satu.length;
                              i++
                            ) {
                              labels[userActivity.dataset_array_satu[i]] =
                                userActivity.dataset_array_satu_nama[i];
                            }
                          } else {
                            labels[userActivity.parent_satu] =
                              userActivity.parent_satu_nama;
                          }
                          var labels2 = [];
                          if (userActivity.dataset_array_dua != null) {
                            for (
                              var i = 0;
                              i < userActivity.dataset_array_dua.length;
                              i++
                            ) {
                              labels2[userActivity.dataset_array_dua[i]] =
                                userActivity.dataset_array_dua_nama[i];
                            }
                          } else {
                            labels2[userActivity.parent_dua] =
                              userActivity.parent_dua_nama;
                          }
                          var xhr = new XMLHttpRequest();
                          xhr.onload = function () {
                            var response = JSON.parse(xhr.responseText);
                            if (userActivity.tahun == "semua") {
                              sessionStorage.setItem(
                                "yearss",
                                response.data[0].tahun
                              );
                            } else {
                              sessionStorage.setItem(
                                "yearss",
                                userActivity.tahun
                              );
                            }
                          };
                          xhr.open(
                            "GET",
                            process.env.REACT_APP_URL_API + "/year",
                            false
                          );
                          xhr.send();
                          sessionStorage.setItem(
                            "namaFilter1",
                            userActivity.parent_satu_nama
                          );
                          sessionStorage.setItem(
                            "namaFilter2",
                            userActivity.parent_dua_nama
                          );
                          sessionStorage.setItem(
                            "idwilayah_berkaca2",
                            userActivity.id_wilayah_dua
                          );

                          var allOptions = [4, 132, 196, 214];
                          var allds2 = userActivity.dataset_all_dua;

                          const commonElements2 = findCommonElements(
                            allOptions,
                            allds2
                          );

                          if (userActivity.dataset_all_satu != null) {
                            var allds1 = userActivity.dataset_all_satu;
                            const commonElements = findCommonElements(
                              allOptions,
                              allds1
                            );
                            if (commonElements.length > 0) {
                              sessionStorage.setItem("all_ds_1", "semua");
                            } else {
                              sessionStorage.setItem(
                                "all_ds_1",
                                "[" +
                                  userActivity.dataset_all_satu[
                                    userActivity.dataset_all_satu.length - 3
                                  ] +
                                  "]"
                              );
                            }
                          } else {
                            sessionStorage.setItem("all_ds_1", "semua");
                          }

                          if (userActivity.dataset_all_dua != null) {
                            if (commonElements2.length > 0) {
                              sessionStorage.setItem("all_ds_2", "semua");
                            } else {
                              sessionStorage.setItem(
                                "all_ds_2",
                                "[" +
                                  userActivity.dataset_all_dua[
                                    userActivity.dataset_all_dua.length - 3
                                  ] +
                                  "]"
                              );
                            }
                          } else {
                            sessionStorage.setItem("all_ds_2", "semua");
                          }

                          sessionStorage.setItem(
                            "selectedDataBerkaca",
                            JSON.stringify({
                              parent_id_1Berkaca: userActivity.parent_satu,
                              parent_id_2Berkaca: userActivity.parent_dua,
                              dataset_1Berkaca:
                                userActivity.dataset_array_satu == null
                                  ? "semua"
                                  : userActivity.dataset_array_satu,
                              dataset_2Berkaca:
                                userActivity.dataset_array_dua == null
                                  ? "semua"
                                  : userActivity.dataset_array_dua,
                              LabelnyaTimeseries_1: labels,
                              LabelnyaTimeseries_2: labels2,
                              labelset1: labels,
                              labelset2: labels2,
                              all_ds1_set:
                                userActivity.dataset_array_satu == null
                                  ? []
                                  : userActivity.dataset_array_satu,
                              all_ds2_set:
                                userActivity.dataset_array_dua == null
                                  ? []
                                  : userActivity.dataset_array_dua,
                              ds1_child: userActivity.parent_satu,
                              ds2_child: userActivity.parent_dua,
                              ds1_parent: userActivity.root_dataset_satu,
                              ds2_parent: userActivity.root_dataset_dua,
                              grafikTimeseries: [],
                              grafikTimeseries2: [],
                              namachild: userActivity.parent_satu_nama,
                              sumberTimeseries: "",
                            })
                          );
                          if (userActivity.tahun == "semua") {
                            window.location.href = "/Berkaca-Grafik-Timeseries";
                          } else {
                            window.location.href = "/Berkaca-Grafik-PieChart";
                          }
                        }
                      }}
                    >
                      <div className="flex items-center justify-center">
                        <img
                          src={
                            userActivity.halaman_tipe === "JELAJAH"
                              ? imgcard
                              : userActivity.halaman_tipe === "UTAK-ATIK"
                              ? imgcard2
                              : userActivity.halaman_tipe === "BERKACA"
                              ? imgcard3
                              : null
                          }
                          alt="Gambar"
                          className="w-[70px] h-[70px] rounded-lg mr-3 bg-white"
                        />
                        <div>
                          <p className="text-[12px] font-medium mb-1">
                            {userActivity.tahun}
                          </p>
                          <p className="text-[14px] font-bold mb-1">
                            {userActivity.halaman_tipe === "BERKACA" ? (
                              <>
                                <p>
                                  {userActivity.wilayah_satu
                                    ? userActivity.wilayah_satu.length > 15
                                      ? userActivity.wilayah_satu?.substring(
                                          0,
                                          12
                                        ) + "..."
                                      : userActivity.wilayah_satu
                                    : userActivity.wilayah_satu}
                                </p>
                                <p>
                                  {userActivity.wilayah_dua
                                    ? userActivity.wilayah_dua.length > 15
                                      ? userActivity.wilayah_dua?.substring(
                                          0,
                                          12
                                        ) + "..."
                                      : userActivity.wilayah_dua
                                    : userActivity.wilayah_dua}
                                </p>
                              </>
                            ) : (
                              <p>
                                {userActivity.wilayah_satu
                                  ? userActivity.wilayah_satu.length > 15
                                    ? userActivity.wilayah_satu?.substring(
                                        0,
                                        12
                                      ) + "..."
                                    : userActivity.wilayah_satu
                                  : userActivity.wilayah_satu}
                              </p>
                            )}
                          </p>

                          <p className="text-[12px] font-medium mb-1">
                            {userActivity.halaman_tipe === "JELAJAH" ? (
                              <p>{userActivity.dataset_satu}</p>
                            ) : userActivity.halaman_tipe === "UTAK-ATIK" ? (
                              <p>
                                1.&nbsp;
                                {userActivity.dataset_satu
                                  ? userActivity.dataset_satu.length > 20
                                    ? userActivity.dataset_satu?.substring(
                                        0,
                                        20
                                      ) + "..."
                                    : userActivity.dataset_satu
                                  : userActivity.dataset_satu}
                              </p>
                            ) : userActivity.halaman_tipe === "BERKACA" ? (
                              <p>
                                1.&nbsp;
                                {userActivity.dataset_satu
                                  ? userActivity.dataset_satu.length > 20
                                    ? userActivity.dataset_satu?.substring(
                                        0,
                                        20
                                      ) + "..."
                                    : userActivity.dataset_satu
                                  : userActivity.dataset_satu}
                              </p>
                            ) : null}
                          </p>
                          <p className="text-[12px] font-medium mb-1">
                            {userActivity.halaman_tipe === "JELAJAH" ? (
                              <p>{userActivity.dataset_dua}</p>
                            ) : userActivity.halaman_tipe === "UTAK-ATIK" ? (
                              <p>
                                2.&nbsp;
                                {userActivity.dataset_dua
                                  ? userActivity.dataset_dua.length > 20
                                    ? userActivity.dataset_dua?.substring(0, 20) +
                                      "..."
                                    : userActivity.dataset_dua
                                  : userActivity.dataset_dua}
                              </p>
                            ) : userActivity.halaman_tipe === "BERKACA" ? (
                              <p>
                                2.&nbsp;
                                {userActivity.dataset_dua
                                  ? userActivity.dataset_dua.length > 20
                                    ? userActivity.dataset_dua?.substring(0, 20) +
                                      "..."
                                    : userActivity.dataset_dua
                                  : userActivity.dataset_dua}
                              </p>
                            ) : null}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[12px] font-medium text-gray-500">
                          {userActivity.timestamps}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center mt-[20px] mb-[20px] px-[10px]">
                  <div className="flex justify-end">{renderPageButtons()}</div>
                </div>
              </section>
            )}
            {activeTab === "save" && (
              <div>
                <div className="flex justify-center mt-4 mb-4 gap-x-[10px] mx-[20px]">
                  <button
                    className={`py-2 px-4 rounded-[10px] ${
                      selectedTab === "all"
                        ? "bg-[#86bbd8] text-white"
                        : "bg-[#86bbd8] text-white"
                    }`}
                    style={
                      selectedTab === "all"
                        ? { boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.2)" }
                        : {}
                    }
                    onClick={() => {
                      setSelectedTab("all");
                      setIsStepOne(true);
                    }}
                  >
                    Semua
                  </button>
                  <button
                    className={`py-2 px-4 rounded-[10px] ${
                      selectedTab === "collection"
                        ? "bg-[#86bbd8] text-white"
                        : "bg-[#86bbd8] text-white"
                    }`}
                    style={
                      selectedTab === "collection"
                        ? { boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.2)" }
                        : {}
                    }
                    onClick={() => setSelectedTab("collection")}
                  >
                    Koleksi
                  </button>
                </div>
                {selectedTab === "all" && (
                  <div>
                    {belumAdaData != null ? (
                      <p className="flex justify-center bg-primary text-secondary mb-[50px] p-[10px] mt-[50px] rounded-lg text-center items-center">
                        {belumAdaData}
                      </p>
                    ) : (
                      <section>
                        <div className="flex items-center justify-center mt-[20px] mb-[20px]">
                          <div className="flex justify-between items-center w-full">
                            {showBtnDelete === true ? (
                              <div className="flex items-center ml-auto">
                                <div
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setDeleteCheckbox(true);
                                    setShowBtnDelete(false);
                                  }}
                                >
                                  <img
                                    src={hapus}
                                    alt=""
                                    className="w-[30px] md:w-[30px] lg:w-[33px] transition-transform duration-300 transform hover:scale-110"
                                  />
                                </div>
                                <div className="px-[10px] cursor-pointer">
                                  <img
                                    src={sortIcon}
                                    alt=""
                                    className={`w-[30px] h-[30px] object-contain cursor-pointer hover:scale-[110%] ${
                                      !sortingDataSaveAll && "rotate-180"
                                    }`}
                                    onClick={() =>
                                      setSortingDataSaveAll(!sortingDataSaveAll)
                                    }
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="flex mt-4 mb-4 gap-x-[10px] mx-[20px]">
                                <a
                                  className={`relative cursor-pointer`}
                                  onClick={() => {
                                    setDeleteCheckbox(false);
                                    setShowBtnDelete(true);
                                    resetCheckboxes();
                                  }}
                                >
                                  <img
                                    src={back}
                                    alt=""
                                    className="w-[30px] md:w-[30px] lg:w-[40px] transition-transform duration-300 transform hover:scale-110"
                                  />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                        {dataSaveAllUser?.map((userActivity) => (
                          <div className="w-full flex">
                            <div
                              className="w-full flex items-start justify-between bg-primary text-secondary hover:bg-third hover:text-white p-[20px] rounded-lg cursor-pointer"
                              onClick={() => {
                                if (
                                  userActivity.id_parent_wilayah_satu !== null
                                ) {
                                  sessionStorage.setItem(
                                    "yearss",
                                    userActivity.tahun
                                  );
                                  sessionStorage.setItem(
                                    "idkota",
                                    userActivity.id_wilayah_satu
                                  );
                                  sessionStorage.setItem(
                                    "namakota",
                                    userActivity.wilayah_satu
                                  );
                                  sessionStorage.setItem(
                                    "namawilayah",
                                    userActivity.wilayah_satu
                                  );
                                  sessionStorage.setItem(
                                    "idprovinsi",
                                    userActivity.id_parent_wilayah_satu
                                  );
                                  sessionStorage.setItem(
                                    "idwilayah",
                                    userActivity.id_wilayah_satu
                                  );
                                  saveNamaProvince(
                                    userActivity.id_parent_wilayah_satu
                                  );
                                } else {
                                  sessionStorage.setItem(
                                    "yearss",
                                    userActivity.tahun
                                  );
                                  sessionStorage.setItem(
                                    "idkota",
                                    userActivity.id_wilayah_satu
                                  );
                                  sessionStorage.setItem("namakota", "Semua");
                                  sessionStorage.setItem("namawilayah", "Semua");
                                  sessionStorage.setItem(
                                    "idprovinsi",
                                    userActivity.id_wilayah_satu
                                  );
                                  sessionStorage.setItem(
                                    "idwilayah",
                                    userActivity.id_wilayah_satu
                                  );
                                  saveNamaProvince(userActivity.id_wilayah_satu);
                                }
                                if (userActivity.halaman_tipe == "JELAJAH") {
                                  ///DATASET JELAJAH
                                  sessionStorage.setItem(
                                    "historyTipePeringkat",
                                    userActivity.peringkat
                                  );
                                  sessionStorage.setItem(
                                    "historyParentDataset",
                                    userActivity.parent_dataset
                                  );
                                  const lastElement =
                                    userActivity.dataset_array_satu.at(-1);
                                  sessionStorage.setItem(
                                    "historyChildDatasetArray",
                                    JSON.stringify(
                                      userActivity.dataset_array_satu
                                    )
                                  );
                                  sessionStorage.setItem(
                                    "historyChildDataset",
                                    lastElement
                                  );
                                  window.location.href = "/Jelajah-Main";
                                } else if (
                                  userActivity.halaman_tipe == "UTAK-ATIK"
                                ) {
                                  var labels = [];
                                  if (userActivity.dataset_array_satu != null) {
                                    for (
                                      var i = 0;
                                      i < userActivity.dataset_array_satu.length;
                                      i++
                                    ) {
                                      labels[userActivity.dataset_array_satu[i]] =
                                        userActivity.dataset_array_satu_nama[i];
                                    }
                                  } else {
                                    labels[userActivity.parent_satu] =
                                      userActivity.parent_satu_nama;
                                  }
                                  var labels2 = [];
                                  if (userActivity.dataset_array_dua != null) {
                                    for (
                                      var i = 0;
                                      i < userActivity.dataset_array_dua.length;
                                      i++
                                    ) {
                                      labels2[userActivity.dataset_array_dua[i]] =
                                        userActivity.dataset_array_dua_nama[i];
                                    }
                                  } else {
                                    labels2[userActivity.parent_dua] =
                                      userActivity.parent_dua_nama;
                                  }
                                  var xhr = new XMLHttpRequest();
                                  xhr.onload = function () {
                                    var response = JSON.parse(xhr.responseText);
                                    if (userActivity.tahun == "semua") {
                                      sessionStorage.setItem(
                                        "yearss",
                                        response.data[0].tahun
                                      );
                                    } else {
                                      sessionStorage.setItem(
                                        "yearss",
                                        userActivity.tahun
                                      );
                                    }
                                  };
                                  xhr.open(
                                    "GET",
                                    process.env.REACT_APP_URL_API + "/year",
                                    false
                                  );
                                  xhr.send();
                                  sessionStorage.setItem(
                                    "namaFilter1",
                                    userActivity.parent_satu_nama
                                  );
                                  sessionStorage.setItem(
                                    "namaFilter2",
                                    userActivity.parent_dua_nama
                                  );

                                  var allOptions = [4, 132, 196, 214];
                                  var allds2 = userActivity.dataset_all_dua;

                                  const commonElements2 = findCommonElements(
                                    allOptions,
                                    allds2
                                  );

                                  if (userActivity.dataset_all_satu != null) {
                                    var allds1 = userActivity.dataset_all_satu;
                                    const commonElements = findCommonElements(
                                      allOptions,
                                      allds1
                                    );
                                    if (commonElements.length > 0) {
                                      sessionStorage.setItem("all_ds_1", "semua");
                                    } else {
                                      sessionStorage.setItem(
                                        "all_ds_1",
                                        "[" +
                                          userActivity.dataset_all_satu[
                                            userActivity.dataset_all_satu.length -
                                              3
                                          ] +
                                          "]"
                                      );
                                    }
                                  } else {
                                    sessionStorage.setItem("all_ds_1", "semua");
                                  }

                                  if (userActivity.dataset_all_dua != null) {
                                    if (commonElements2.length > 0) {
                                      sessionStorage.setItem("all_ds_2", "semua");
                                    } else {
                                      sessionStorage.setItem(
                                        "all_ds_2",
                                        "[" +
                                          userActivity.dataset_all_dua[
                                            userActivity.dataset_all_dua.length -
                                              3
                                          ] +
                                          "]"
                                      );
                                    }
                                  } else {
                                    sessionStorage.setItem("all_ds_2", "semua");
                                  }

                                  sessionStorage.setItem(
                                    "selectedData",
                                    JSON.stringify({
                                      parent_id_1: userActivity.parent_satu,
                                      parent_id_2: userActivity.parent_dua,
                                      dataset_1:
                                        userActivity.dataset_array_satu == null
                                          ? "semua"
                                          : userActivity.dataset_array_satu,
                                      dataset_2:
                                        userActivity.dataset_array_dua == null
                                          ? "semua"
                                          : userActivity.dataset_array_dua,
                                      LabelnyaTimeseries_1: labels,
                                      LabelnyaTimeseries_2: labels2,
                                      labelset1: labels,
                                      labelset2: labels2,
                                      all_ds1_set:
                                        userActivity.dataset_array_satu == null
                                          ? []
                                          : userActivity.dataset_array_satu,
                                      all_ds2_set:
                                        userActivity.dataset_array_dua == null
                                          ? []
                                          : userActivity.dataset_array_dua,
                                      ds1_child: userActivity.parent_satu,
                                      ds2_child: userActivity.parent_dua,
                                      ds1_parent: userActivity.root_dataset_satu,
                                      ds2_parent: userActivity.root_dataset_dua,
                                      grafikTimeseries: [],
                                      grafikTimeseries2: [],
                                      namachild: userActivity.parent_satu_nama,
                                      sumberTimeseries: "",
                                    })
                                  );
                                  if (userActivity.tahun == "semua") {
                                    window.location.href =
                                      "/Utak-Atik-Grafik#scroll";
                                  } else {
                                    window.location.href = "/Utak-Atik-Grafik";
                                  }
                                } else if (
                                  userActivity.halaman_tipe == "BERKACA"
                                ) {
                                  if (
                                    userActivity.id_parent_wilayah_dua !== null
                                  ) {
                                    sessionStorage.setItem(
                                      "idkota_berkaca2",
                                      userActivity.id_wilayah_dua
                                    );
                                    sessionStorage.setItem(
                                      "namakota_berkaca2",
                                      userActivity.wilayah_dua
                                    );
                                    sessionStorage.setItem(
                                      "namawilayah_berkaca2",
                                      userActivity.wilayah_dua
                                    );
                                    sessionStorage.setItem(
                                      "idprovinsi_berkaca2",
                                      userActivity.id_parent_wilayah_dua
                                    );
                                    sessionStorage.setItem(
                                      "idwilayah_berkaca2",
                                      userActivity.id_wilayah_dua
                                    );
                                    saveNamaProvince2(
                                      userActivity.id_parent_wilayah_dua
                                    );
                                  } else {
                                    sessionStorage.setItem(
                                      "idkota_berkaca2",
                                      userActivity.id_wilayah_dua
                                    );
                                    sessionStorage.setItem(
                                      "namakota_berkaca2",
                                      "Semua"
                                    );
                                    sessionStorage.setItem(
                                      "namawilayah_berkaca2",
                                      "Semua"
                                    );
                                    sessionStorage.setItem(
                                      "idprovinsi_berkaca2",
                                      userActivity.id_wilayah_dua
                                    );
                                    sessionStorage.setItem(
                                      "idwilayah_berkaca2",
                                      userActivity.id_wilayah_dua
                                    );
                                    saveNamaProvince2(
                                      userActivity.id_wilayah_dua
                                    );
                                  }
                                  var labels = [];
                                  if (userActivity.dataset_array_satu != null) {
                                    for (
                                      var i = 0;
                                      i < userActivity.dataset_array_satu.length;
                                      i++
                                    ) {
                                      labels[userActivity.dataset_array_satu[i]] =
                                        userActivity.dataset_array_satu_nama[i];
                                    }
                                  } else {
                                    labels[userActivity.parent_satu] =
                                      userActivity.parent_satu_nama;
                                  }
                                  var labels2 = [];
                                  if (userActivity.dataset_array_dua != null) {
                                    for (
                                      var i = 0;
                                      i < userActivity.dataset_array_dua.length;
                                      i++
                                    ) {
                                      labels2[userActivity.dataset_array_dua[i]] =
                                        userActivity.dataset_array_dua_nama[i];
                                    }
                                  } else {
                                    labels2[userActivity.parent_dua] =
                                      userActivity.parent_dua_nama;
                                  }
                                  var xhr = new XMLHttpRequest();
                                  xhr.onload = function () {
                                    var response = JSON.parse(xhr.responseText);
                                    if (userActivity.tahun == "semua") {
                                      sessionStorage.setItem(
                                        "yearss",
                                        response.data[0].tahun
                                      );
                                    } else {
                                      sessionStorage.setItem(
                                        "yearss",
                                        userActivity.tahun
                                      );
                                    }
                                  };
                                  xhr.open(
                                    "GET",
                                    process.env.REACT_APP_URL_API + "/year",
                                    false
                                  );
                                  xhr.send();
                                  sessionStorage.setItem(
                                    "namaFilter1",
                                    userActivity.parent_satu_nama
                                  );
                                  sessionStorage.setItem(
                                    "namaFilter2",
                                    userActivity.parent_dua_nama
                                  );
                                  sessionStorage.setItem(
                                    "idwilayah_berkaca2",
                                    userActivity.id_wilayah_dua
                                  );

                                  var allOptions = [4, 132, 196, 214];
                                  var allds2 = userActivity.dataset_all_dua;

                                  const commonElements2 = findCommonElements(
                                    allOptions,
                                    allds2
                                  );

                                  if (userActivity.dataset_all_satu != null) {
                                    var allds1 = userActivity.dataset_all_satu;
                                    const commonElements = findCommonElements(
                                      allOptions,
                                      allds1
                                    );
                                    if (commonElements.length > 0) {
                                      sessionStorage.setItem("all_ds_1", "semua");
                                    } else {
                                      sessionStorage.setItem(
                                        "all_ds_1",
                                        "[" +
                                          userActivity.dataset_all_satu[
                                            userActivity.dataset_all_satu.length -
                                              3
                                          ] +
                                          "]"
                                      );
                                    }
                                  } else {
                                    sessionStorage.setItem("all_ds_1", "semua");
                                  }

                                  if (userActivity.dataset_all_dua != null) {
                                    if (commonElements2.length > 0) {
                                      sessionStorage.setItem("all_ds_2", "semua");
                                    } else {
                                      sessionStorage.setItem(
                                        "all_ds_2",
                                        "[" +
                                          userActivity.dataset_all_dua[
                                            userActivity.dataset_all_dua.length -
                                              3
                                          ] +
                                          "]"
                                      );
                                    }
                                  } else {
                                    sessionStorage.setItem("all_ds_2", "semua");
                                  }

                                  sessionStorage.setItem(
                                    "selectedDataBerkaca",
                                    JSON.stringify({
                                      parent_id_1Berkaca:
                                        userActivity.parent_satu,
                                      parent_id_2Berkaca: userActivity.parent_dua,
                                      dataset_1Berkaca:
                                        userActivity.dataset_array_satu == null
                                          ? "semua"
                                          : userActivity.dataset_array_satu,
                                      dataset_2Berkaca:
                                        userActivity.dataset_array_dua == null
                                          ? "semua"
                                          : userActivity.dataset_array_dua,
                                      LabelnyaTimeseries_1: labels,
                                      LabelnyaTimeseries_2: labels2,
                                      labelset1: labels,
                                      labelset2: labels2,
                                      all_ds1_set:
                                        userActivity.dataset_array_satu == null
                                          ? []
                                          : userActivity.dataset_array_satu,
                                      all_ds2_set:
                                        userActivity.dataset_array_dua == null
                                          ? []
                                          : userActivity.dataset_array_dua,
                                      ds1_child: userActivity.parent_satu,
                                      ds2_child: userActivity.parent_dua,
                                      ds1_parent: userActivity.root_dataset_satu,
                                      ds2_parent: userActivity.root_dataset_dua,
                                      grafikTimeseries: [],
                                      grafikTimeseries2: [],
                                      namachild: userActivity.parent_satu_nama,
                                      sumberTimeseries: "",
                                    })
                                  );
                                  if (userActivity.tahun == "semua") {
                                    window.location.href =
                                      "/Berkaca-Grafik-Timeseries";
                                  } else {
                                    window.location.href =
                                      "/Berkaca-Grafik-PieChart";
                                  }
                                }
                              }}
                            >
                              <div className="flex items-center justify-center">
                                <img
                                  src={
                                    userActivity.halaman_tipe === "JELAJAH"
                                      ? imgcard
                                      : userActivity.halaman_tipe === "UTAK-ATIK"
                                      ? imgcard2
                                      : userActivity.halaman_tipe === "BERKACA"
                                      ? imgcard3
                                      : null
                                  }
                                  alt="Gambar"
                                  className="w-[70px] h-[70px] rounded-lg mr-3 bg-white"
                                />
                                <div>
                                  <p className="text-[12px] font-medium mb-1">
                                    {userActivity.tahun}
                                  </p>
                                  <p className="text-xl font-bold mb-1">
                                    {userActivity.halaman_tipe === "BERKACA" ? (
                                      <p>
                                        {userActivity.wilayah_satu}&nbsp;&&nbsp;
                                        {userActivity.wilayah_dua}
                                      </p>
                                    ) : (
                                      <p>{userActivity.wilayah_satu}</p>
                                    )}
                                  </p>

                                  <p className="text-[12px] font-medium mb-1">
                                    {userActivity.halaman_tipe === "JELAJAH" ? (
                                      <p>{userActivity.dataset_satu}</p>
                                    ) : userActivity.halaman_tipe ===
                                      "UTAK-ATIK" ? (
                                      <p>
                                        1.&nbsp;
                                        {userActivity.dataset_satu
                                          ? userActivity.dataset_satu.length > 20
                                            ? userActivity.dataset_satu?.substring(
                                                0,
                                                20
                                              ) + "..."
                                            : userActivity.dataset_satu
                                          : userActivity.dataset_satu}
                                      </p>
                                    ) : userActivity.halaman_tipe ===
                                      "BERKACA" ? (
                                      <p>
                                        1.&nbsp;
                                        {userActivity.dataset_satu
                                          ? userActivity.dataset_satu.length > 20
                                            ? userActivity.dataset_satu?.substring(
                                                0,
                                                20
                                              ) + "..."
                                            : userActivity.dataset_satu
                                          : userActivity.dataset_satu}
                                      </p>
                                    ) : null}
                                  </p>
                                  <p className="text-[12px] font-medium mb-1">
                                    {userActivity.halaman_tipe === "JELAJAH" ? (
                                      <p>{userActivity.dataset_dua}</p>
                                    ) : userActivity.halaman_tipe ===
                                      "UTAK-ATIK" ? (
                                      <p>
                                        2.&nbsp;
                                        {userActivity.dataset_dua
                                          ? userActivity.dataset_dua.length > 20
                                            ? userActivity.dataset_dua?.substring(
                                                0,
                                                20
                                              ) + "..."
                                            : userActivity.dataset_dua
                                          : userActivity.dataset_dua}
                                      </p>
                                    ) : userActivity.halaman_tipe ===
                                      "BERKACA" ? (
                                      <p>
                                        2.&nbsp;
                                        {userActivity.dataset_dua
                                          ? userActivity.dataset_dua.length > 20
                                            ? userActivity.dataset_dua?.substring(
                                                0,
                                                20
                                              ) + "..."
                                            : userActivity.dataset_dua
                                          : userActivity.dataset_dua}
                                      </p>
                                    ) : null}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="text-[12px] font-medium text-gray-500">
                                  {userActivity.timestamps}
                                </p>
                              </div>
                            </div>
                            {deleteCheckbox == false ? (
                              <></>
                            ) : (
                              <div className="flex justify-center items-center mx-[20px]">
                                <label className="container">
                                  <input
                                    value={userActivity.id}
                                    className="idDelete peer cursor-pointer hidden after:opacity-100"
                                    type="checkbox"
                                    onChange={handleCheckboxChange}
                                  />
                                  <span className="inline-block w-[25px] h-[25px] rounded-[2px] border-2 border-secondary relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[13px] after:h-[13px] after:bg-secondary after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"></span>
                                </label>
                              </div>
                            )}
                          </div>
                        ))}
                        {deleteCheckbox === true ? (
                          <div className="flex justify-center lg:mb-[20px] xl:mb-[20px] md:mb-[20px] lg:mt-[20px] xl:mt-[20px] md:mt-[20px]">
                            <button
                              className={`py-2 px-4 rounded-[10px] text-white bg-[#CD3838] hover:bg-[#E54747]`}
                              onClick={() => {
                                if (checkNull == true) {
                                  isiCheckBox();
                                } else {
                                  PopUPDeleteDataSimpan(targetDelete);
                                }
                              }}
                            >
                              Hapus
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </section>
                    )}
                  </div>
                )}

                {selectedTab === "collection" && (
                  <div>
                    {belumAdaDataKoleksi != null ? (
                      <>
                        <div className="ml-[20px]">
                          <button
                            className={`py-2 px-5 rounded-[10px] text-white bg-third hover:bg-secondary flex items-center`}
                            onClick={handleAddNewCollectionClick}
                            style={{ fontSize: "12px" }}
                          >
                            <FontAwesomeIcon icon={faPlus} className=" mr-2" />
                            Tambah Koleksi
                          </button>
                        </div>
                        <p className="flex justify-center bg-primary text-secondary mb-[50px] p-[10px] mt-[50px] rounded-lg text-center items-center">
                          {belumAdaDataKoleksi}
                        </p>
                      </>
                    ) : (
                      <section className="flex flex-col">
                        <div>
                          {isStepOne ? (
                            <div>
                              <div className="flex items-center justify-center mt-[20px] mb-[20px]">
                                <div className="flex justify-between items-center w-full">
                                  {showBtnDeleteKoleksi === true ? (
                                    <>
                                      <div className="ml-[20px]">
                                        <button
                                          className={`py-2 px-5 rounded-[10px] text-white bg-third hover:bg-secondary flex items-center`}
                                          onClick={handleAddNewCollectionClick}
                                          style={{ fontSize: "12px" }}
                                        >
                                          <FontAwesomeIcon
                                            icon={faPlus}
                                            className=" mr-2"
                                          />
                                          Tambah Koleksi
                                        </button>
                                      </div>
                                      <div className="flex items-center space-x-4 mr-[20px]">
                                        <div
                                          className="cursor-pointer"
                                          onClick={() => {
                                            setDeleteCheckboxKoleksi(true);
                                            setShowBtnDeleteKoleksi(false);
                                          }}
                                        >
                                          <img
                                            src={hapus}
                                            alt=""
                                            className="w-[25px] md:w-[30px] lg:w-[33px] transition-transform duration-300 transform hover:scale-110"
                                          />
                                        </div>
                                        {/* <div className="cursor-pointer">
                                          <img
                                            src={sortIcon}
                                            alt=""
                                            className={`w-[30px] h-[30px] object-contain cursor-pointer hover:scale-[110%] ${
                                              !sortingDataSaveKoleksi &&
                                              "rotate-180"
                                            }`}
                                            onClick={() =>
                                              setSortingDataSaveKoleksi(
                                                !sortingDataSaveKoleksi
                                              )
                                            }
                                          />
                                        </div> */}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="flex justify-start lg:mb-[20px] xl:mb-[20px] md:mb-[20px] lg:mt-[20px] xl:mt-[20px] md:mt-[20px] xl:ml-[20px] lg:ml-[20px] md:ml-[20px]">
                                      <a
                                        className={`relative cursor-pointer`}
                                        onClick={() => {
                                          setDeleteCheckboxKoleksi(false);
                                          setShowBtnDeleteKoleksi(true);
                                          resetCheckboxeskoleksi();
                                        }}
                                      >
                                        <img
                                          src={back}
                                          alt=""
                                          className="w-[30px] md:w-[30px] lg:w-[40px] transition-transform duration-300 transform hover:scale-110"
                                        />
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {collectiondata.map((item) => (
                                <div className="w-full flex">
                                  <div
                                    key={item.id}
                                    className="w-full flex items-start justify-between bg-primary text-secondary hover:bg-third hover:text-white p-[20px] rounded-lg cursor-pointer"
                                    onClick={() => {
                                      sessionStorage.setItem(
                                        "namaCollection",
                                        item.nama
                                      );
                                      sessionStorage.setItem(
                                        "idCollection",
                                        item.id
                                      );
                                      fetchSavedCollection(
                                        item.id,
                                        sortingDataSaveKoleksi
                                      );
                                      setSelectedItem(item.id);
                                    }}
                                  >
                                    <div className="flex items-center">
                                      <div>
                                        <p className="text-xl font-bold mb-1">
                                          {item.nama}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  {deleteCheckboxKoleksi === false ? (
                                    <></>
                                  ) : (
                                    <div className="flex justify-center items-center mx-[20px]">
                                      <label className="container">
                                        <input
                                          value={item.id}
                                          className="idDelete peer cursor-pointer hidden after:opacity-100"
                                          type="checkbox"
                                          onChange={handleCheckboxChangeKoleksi}
                                        />
                                        <span className="inline-block w-[25px] h-[25px] rounded-[2px] border-2 border-secondary relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[13px] after:h-[13px] after:bg-secondary after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"></span>
                                      </label>
                                    </div>
                                  )}
                                </div>
                              ))}
                              {deleteCheckboxKoleksi === true ? (
                                <div className="flex justify-center lg:mb-[20px] xl:mb-[20px] md:mb-[20px] lg:mt-[20px] xl:mt-[20px] md:mt-[20px]">
                                  <button
                                    className={`py-2 px-4 rounded-[10px] text-white bg-[#CD3838] hover:bg-[#E54747]`}
                                    onClick={() => {
                                      if (checkNull == true) {
                                        isiCheckBoxKoleksi();
                                      } else {
                                        PopUPDeleteDataSimpanKoleksi(
                                          targetDelete
                                        );
                                      }
                                    }}
                                  >
                                    Hapus
                                  </button>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          ) : (
                            <>
                              {belumAdaDataIsiKoleksi != null ? (
                                <>
                                  <div className="flex justify-between items-center w-full lg:mt-[20px] xl:mt-[20px] md:mt-[20px]">
                                    <div className="ml-[20px]">
                                      <a
                                        className="relative cursor-pointer"
                                        onClick={() => setIsStepOne(true)}
                                      >
                                        <img
                                          src={back}
                                          alt=""
                                          className="w-[30px] md:w-[30px] lg:w-[40px] transition-transform duration-300 transform hover:scale-110"
                                        />
                                      </a>
                                    </div>
                                    <div className="flex lg:mr-[250px] xl:mr-[640px] md:mr-[270px]">
                                      {collectiondata.map((ambil) => (
                                        <div
                                          key={ambil.id}
                                          className="text-secondary"
                                        >
                                          <div className="flex items-center">
                                            {selectedItem === ambil.id && (
                                              <>
                                                <div className="lg:mr-[5px]">
                                                  <p className="text-xl font-bold mb-1">
                                                    {ambil.nama}
                                                  </p>
                                                </div>
                                                <div className="">
                                                  <button
                                                    onClick={() =>
                                                      handleChangeCollectionClick(
                                                        ambil.id
                                                      )
                                                    }
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={faPen}
                                                      className=" mr-2 ml-2"
                                                    />
                                                  </button>
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="flex justify-center bg-primary text-secondary mb-[50px] p-[10px] mt-[50px] rounded-lg text-center items-center">
                                      {belumAdaDataIsiKoleksi}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="new-collection-list mt-8">
                                    <div className="flex items-center justify-center mt-[20px] mb-[20px]">
                                      <div className="flex justify-between items-center w-full">
                                        {showBtnDeleteIsiKoleksi === true ? (
                                          <>
                                            <div className="ml-[20px]">
                                              <a
                                                className="relative cursor-pointer"
                                                onClick={() => setIsStepOne(true)}
                                              >
                                                <img
                                                  src={back}
                                                  alt=""
                                                  className="w-[30px] md:w-[30px] lg:w-[40px] transition-transform duration-300 transform hover:scale-110"
                                                />
                                              </a>
                                            </div>
                                            <div className="ml-[20px]">
                                              {collectiondata.map((ambil) => (
                                                <div
                                                  key={ambil.id}
                                                  className="text-secondary"
                                                >
                                                  <div className="flex items-center">
                                                    {selectedItem ===
                                                      ambil.id && (
                                                      <>
                                                        <div className="lg:mr-[5px]">
                                                          <p className="text-xl font-bold mb-1">
                                                            {ambil.nama}
                                                          </p>
                                                        </div>
                                                        <div className="">
                                                          <button
                                                            onClick={() =>
                                                              handleChangeCollectionClick(
                                                                ambil.id
                                                              )
                                                            }
                                                          >
                                                            <FontAwesomeIcon
                                                              icon={faPen}
                                                              className=" mr-2"
                                                            />
                                                          </button>
                                                        </div>
                                                      </>
                                                    )}
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                            <div className="flex items-center space-x-4 mr-[20px]">
                                              <div
                                                className="cursor-pointer"
                                                onClick={() => {
                                                  setDeleteCheckboxIsiKoleksi(
                                                    true
                                                  );
                                                  setShowBtnDeleteIsiKoleksi(
                                                    false
                                                  );
                                                  setMoveCheckboxIsiKoleksi(
                                                    "move"
                                                  );
                                                }}
                                              >
                                                <img
                                                  src={pindah}
                                                  alt=""
                                                  className="w-[25px] md:w-[30px] lg:w-[40px] transition-transform duration-300 transform hover:scale-110"
                                                />
                                              </div>
                                              <div
                                                className="cursor-pointer"
                                                onClick={() => {
                                                  setDeleteCheckboxIsiKoleksi(
                                                    true
                                                  );
                                                  setShowBtnDeleteIsiKoleksi(
                                                    false
                                                  );
                                                  setMoveCheckboxIsiKoleksi(
                                                    "delete"
                                                  );
                                                }}
                                              >
                                                <img
                                                  src={hapus}
                                                  alt=""
                                                  className="w-[25px] md:w-[30px] lg:w-[33px] transition-transform duration-300 transform hover:scale-110"
                                                />
                                              </div>
                                              <div className="cursor-pointer">
                                                <img
                                                  src={sortIcon}
                                                  alt=""
                                                  className={`w-[25px] h-[25px] object-contain cursor-pointer hover:scale-[110%] ${
                                                    !sortingDataSaveKoleksi &&
                                                    "rotate-180"
                                                  }`}
                                                  onClick={() =>
                                                    setSortingDataSaveKoleksi(
                                                      !sortingDataSaveKoleksi
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                          </>
                                        ) : (
                                          <div className="flex justify-start lg:mb-[20px] xl:mb-[20px] md:mb-[20px] lg:mt-[20px] xl:mt-[20px] md:mt-[20px] xl:ml-[20px] lg:ml-[20px] md:ml-[20px]">
                                            <a
                                              className={`relative cursor-pointer`}
                                              onClick={() => {
                                                setDeleteCheckboxIsiKoleksi(
                                                  false
                                                );
                                                setShowBtnDeleteIsiKoleksi(true);
                                                resetCheckboxesIsikoleksi();
                                              }}
                                            >
                                              {" "}
                                              <img
                                                src={back}
                                                alt=""
                                                className="w-[30px] md:w-[30px] lg:w-[40px] transition-transform duration-300 transform hover:scale-110"
                                              />
                                            </a>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    {collectionisidata.map((dataItem) => (
                                      <div className="w-full flex">
                                        <div
                                          key={dataItem.id}
                                          className="w-full flex items-start justify-between bg-primary text-secondary hover:bg-third hover:text-white p-[20px] rounded-lg cursor-pointer"
                                          onClick={() => {
                                            if (
                                              dataItem.id_parent_wilayah_satu !==
                                              null
                                            ) {
                                              sessionStorage.setItem(
                                                "yearss",
                                                dataItem.tahun
                                              );
                                              sessionStorage.setItem(
                                                "idkota",
                                                dataItem.id_wilayah_satu
                                              );
                                              sessionStorage.setItem(
                                                "namakota",
                                                dataItem.wilayah_satu
                                              );
                                              sessionStorage.setItem(
                                                "namawilayah",
                                                dataItem.wilayah_satu
                                              );
                                              sessionStorage.setItem(
                                                "idprovinsi",
                                                dataItem.id_parent_wilayah_satu
                                              );
                                              sessionStorage.setItem(
                                                "idwilayah",
                                                dataItem.id_wilayah_satu
                                              );
                                              saveNamaProvince(
                                                dataItem.id_parent_wilayah_satu
                                              );
                                            } else {
                                              sessionStorage.setItem(
                                                "yearss",
                                                dataItem.tahun
                                              );
                                              sessionStorage.setItem(
                                                "idkota",
                                                dataItem.id_wilayah_satu
                                              );
                                              sessionStorage.setItem(
                                                "namakota",
                                                "Semua"
                                              );
                                              sessionStorage.setItem(
                                                "namawilayah",
                                                "Semua"
                                              );
                                              sessionStorage.setItem(
                                                "idprovinsi",
                                                dataItem.id_wilayah_satu
                                              );
                                              sessionStorage.setItem(
                                                "idwilayah",
                                                dataItem.id_wilayah_satu
                                              );
                                              saveNamaProvince(
                                                dataItem.id_wilayah_satu
                                              );
                                            }
                                            if (
                                              dataItem.halaman_tipe === "JELAJAH"
                                            ) {
                                              sessionStorage.setItem(
                                                "historyTipePeringkat",
                                                dataItem.peringkat
                                              );
                                              sessionStorage.setItem(
                                                "historyParentDataset",
                                                dataItem.parent_dataset
                                              );
                                              const lastElement =
                                                dataItem.dataset_array_satu.at(
                                                  -1
                                                );
                                              sessionStorage.setItem(
                                                "historyChildDatasetArray",
                                                JSON.stringify(
                                                  dataItem.dataset_array_satu
                                                )
                                              );
                                              sessionStorage.setItem(
                                                "historyChildDataset",
                                                lastElement
                                              );
                                              window.location.href =
                                                "/Jelajah-Main";
                                            } else if (
                                              dataItem.halaman_tipe ===
                                              "UTAK-ATIK"
                                            ) {
                                              var labels = [];
                                              if (
                                                dataItem.dataset_array_satu !=
                                                null
                                              ) {
                                                for (
                                                  var i = 0;
                                                  i <
                                                  dataItem.dataset_array_satu
                                                    .length;
                                                  i++
                                                ) {
                                                  labels[
                                                    dataItem.dataset_array_satu[i]
                                                  ] =
                                                    dataItem.dataset_array_satu_nama[
                                                      i
                                                    ];
                                                }
                                              } else {
                                                labels[dataItem.parent_satu] =
                                                  dataItem.parent_satu_nama;
                                              }
                                              var labels2 = [];
                                              if (
                                                dataItem.dataset_array_dua != null
                                              ) {
                                                for (
                                                  var i = 0;
                                                  i <
                                                  dataItem.dataset_array_dua
                                                    .length;
                                                  i++
                                                ) {
                                                  labels2[
                                                    dataItem.dataset_array_dua[i]
                                                  ] =
                                                    dataItem.dataset_array_dua_nama[
                                                      i
                                                    ];
                                                }
                                              } else {
                                                labels2[dataItem.parent_dua] =
                                                  dataItem.parent_dua_nama;
                                              }
                                              var xhr = new XMLHttpRequest();
                                              xhr.onload = function () {
                                                var response = JSON.parse(
                                                  xhr.responseText
                                                );
                                                if (dataItem.tahun == "semua") {
                                                  sessionStorage.setItem(
                                                    "yearss",
                                                    response.data[0].tahun
                                                  );
                                                } else {
                                                  sessionStorage.setItem(
                                                    "yearss",
                                                    dataItem.tahun
                                                  );
                                                }
                                              };
                                              xhr.open(
                                                "GET",
                                                process.env.REACT_APP_URL_API +
                                                  "/year",
                                                false
                                              );
                                              xhr.send();
                                              sessionStorage.setItem(
                                                "namaFilter1",
                                                dataItem.parent_satu_nama
                                              );
                                              sessionStorage.setItem(
                                                "namaFilter2",
                                                dataItem.parent_dua_nama
                                              );

                                              var allOptions = [4, 132, 196, 214];
                                              var allds2 =
                                                dataItem.dataset_all_dua;

                                              const commonElements2 =
                                                findCommonElements(
                                                  allOptions,
                                                  allds2
                                                );

                                              if (
                                                dataItem.dataset_all_satu != null
                                              ) {
                                                var allds1 =
                                                  dataItem.dataset_all_satu;
                                                const commonElements =
                                                  findCommonElements(
                                                    allOptions,
                                                    allds1
                                                  );
                                                if (commonElements.length > 0) {
                                                  sessionStorage.setItem(
                                                    "all_ds_1",
                                                    "semua"
                                                  );
                                                } else {
                                                  sessionStorage.setItem(
                                                    "all_ds_1",
                                                    "[" +
                                                      dataItem.dataset_all_satu[
                                                        dataItem.dataset_all_satu
                                                          .length - 3
                                                      ] +
                                                      "]"
                                                  );
                                                }
                                              } else {
                                                sessionStorage.setItem(
                                                  "all_ds_1",
                                                  "semua"
                                                );
                                              }

                                              if (
                                                dataItem.dataset_all_dua != null
                                              ) {
                                                if (commonElements2.length > 0) {
                                                  sessionStorage.setItem(
                                                    "all_ds_2",
                                                    "semua"
                                                  );
                                                } else {
                                                  sessionStorage.setItem(
                                                    "all_ds_2",
                                                    "[" +
                                                      dataItem.dataset_all_dua[
                                                        dataItem.dataset_all_dua
                                                          .length - 3
                                                      ] +
                                                      "]"
                                                  );
                                                }
                                              } else {
                                                sessionStorage.setItem(
                                                  "all_ds_2",
                                                  "semua"
                                                );
                                              }

                                              sessionStorage.setItem(
                                                "selectedData",
                                                JSON.stringify({
                                                  parent_id_1:
                                                    dataItem.parent_satu,
                                                  parent_id_2:
                                                    dataItem.parent_dua,
                                                  dataset_1:
                                                    dataItem.dataset_array_satu ==
                                                    null
                                                      ? "semua"
                                                      : dataItem.dataset_array_satu,
                                                  dataset_2:
                                                    dataItem.dataset_array_dua ==
                                                    null
                                                      ? "semua"
                                                      : dataItem.dataset_array_dua,
                                                  LabelnyaTimeseries_1: labels,
                                                  LabelnyaTimeseries_2: labels2,
                                                  labelset1: labels,
                                                  labelset2: labels2,
                                                  all_ds1_set:
                                                    dataItem.dataset_array_satu ==
                                                    null
                                                      ? []
                                                      : dataItem.dataset_array_satu,
                                                  all_ds2_set:
                                                    dataItem.dataset_array_dua ==
                                                    null
                                                      ? []
                                                      : dataItem.dataset_array_dua,
                                                  ds1_child: dataItem.parent_satu,
                                                  ds2_child: dataItem.parent_dua,
                                                  ds1_parent:
                                                    dataItem.root_dataset_satu,
                                                  ds2_parent:
                                                    dataItem.root_dataset_dua,
                                                  grafikTimeseries: [],
                                                  grafikTimeseries2: [],
                                                  namachild:
                                                    dataItem.parent_satu_nama,
                                                  sumberTimeseries: "",
                                                })
                                              );
                                              if (dataItem.tahun == "semua") {
                                                window.location.href =
                                                  "/Utak-Atik-Grafik#scroll";
                                              } else {
                                                window.location.href =
                                                  "/Utak-Atik-Grafik";
                                              }
                                            } else if (
                                              dataItem.halaman_tipe === "BERKACA"
                                            ) {
                                              if (
                                                dataItem.id_parent_wilayah_dua !==
                                                null
                                              ) {
                                                sessionStorage.setItem(
                                                  "idkota_berkaca2",
                                                  dataItem.id_wilayah_dua
                                                );
                                                sessionStorage.setItem(
                                                  "namakota_berkaca2",
                                                  dataItem.wilayah_dua
                                                );
                                                sessionStorage.setItem(
                                                  "namawilayah_berkaca2",
                                                  dataItem.wilayah_dua
                                                );
                                                sessionStorage.setItem(
                                                  "idprovinsi_berkaca2",
                                                  dataItem.id_parent_wilayah_dua
                                                );
                                                sessionStorage.setItem(
                                                  "idwilayah_berkaca2",
                                                  dataItem.id_wilayah_dua
                                                );
                                                saveNamaProvince2(
                                                  dataItem.id_parent_wilayah_dua
                                                );
                                              } else {
                                                sessionStorage.setItem(
                                                  "idkota_berkaca2",
                                                  dataItem.id_wilayah_dua
                                                );
                                                sessionStorage.setItem(
                                                  "namakota_berkaca2",
                                                  "Semua"
                                                );
                                                sessionStorage.setItem(
                                                  "namawilayah_berkaca2",
                                                  "Semua"
                                                );
                                                sessionStorage.setItem(
                                                  "idprovinsi_berkaca2",
                                                  dataItem.id_wilayah_dua
                                                );
                                                sessionStorage.setItem(
                                                  "idwilayah_berkaca2",
                                                  dataItem.id_wilayah_dua
                                                );
                                                saveNamaProvince2(
                                                  dataItem.id_wilayah_dua
                                                );
                                              }
                                              var labels = [];
                                              if (
                                                dataItem.dataset_array_satu !=
                                                null
                                              ) {
                                                for (
                                                  var i = 0;
                                                  i <
                                                  dataItem.dataset_array_satu
                                                    .length;
                                                  i++
                                                ) {
                                                  labels[
                                                    dataItem.dataset_array_satu[i]
                                                  ] =
                                                    dataItem.dataset_array_satu_nama[
                                                      i
                                                    ];
                                                }
                                              } else {
                                                labels[dataItem.parent_satu] =
                                                  dataItem.parent_satu_nama;
                                              }
                                              var labels2 = [];
                                              if (
                                                dataItem.dataset_array_dua != null
                                              ) {
                                                for (
                                                  var i = 0;
                                                  i <
                                                  dataItem.dataset_array_dua
                                                    .length;
                                                  i++
                                                ) {
                                                  labels2[
                                                    dataItem.dataset_array_dua[i]
                                                  ] =
                                                    dataItem.dataset_array_dua_nama[
                                                      i
                                                    ];
                                                }
                                              } else {
                                                labels2[dataItem.parent_dua] =
                                                  dataItem.parent_dua_nama;
                                              }
                                              var xhr = new XMLHttpRequest();
                                              xhr.onload = function () {
                                                var response = JSON.parse(
                                                  xhr.responseText
                                                );
                                                if (dataItem.tahun == "semua") {
                                                  sessionStorage.setItem(
                                                    "yearss",
                                                    response.data[0].tahun
                                                  );
                                                } else {
                                                  sessionStorage.setItem(
                                                    "yearss",
                                                    dataItem.tahun
                                                  );
                                                }
                                              };
                                              xhr.open(
                                                "GET",
                                                process.env.REACT_APP_URL_API +
                                                  "/year",
                                                false
                                              );
                                              xhr.send();
                                              sessionStorage.setItem(
                                                "namaFilter1",
                                                dataItem.parent_satu_nama
                                              );
                                              sessionStorage.setItem(
                                                "namaFilter2",
                                                dataItem.parent_dua_nama
                                              );
                                              sessionStorage.setItem(
                                                "idwilayah_berkaca2",
                                                dataItem.id_wilayah_dua
                                              );

                                              var allOptions = [4, 132, 196, 214];
                                              var allds2 =
                                                dataItem.dataset_all_dua;

                                              const commonElements2 =
                                                findCommonElements(
                                                  allOptions,
                                                  allds2
                                                );

                                              if (
                                                dataItem.dataset_all_satu != null
                                              ) {
                                                var allds1 =
                                                  dataItem.dataset_all_satu;
                                                const commonElements =
                                                  findCommonElements(
                                                    allOptions,
                                                    allds1
                                                  );
                                                if (commonElements.length > 0) {
                                                  sessionStorage.setItem(
                                                    "all_ds_1",
                                                    "semua"
                                                  );
                                                } else {
                                                  sessionStorage.setItem(
                                                    "all_ds_1",
                                                    "[" +
                                                      dataItem.dataset_all_satu[
                                                        dataItem.dataset_all_satu
                                                          .length - 3
                                                      ] +
                                                      "]"
                                                  );
                                                }
                                              } else {
                                                sessionStorage.setItem(
                                                  "all_ds_1",
                                                  "semua"
                                                );
                                              }

                                              if (
                                                dataItem.dataset_all_dua != null
                                              ) {
                                                if (commonElements2.length > 0) {
                                                  sessionStorage.setItem(
                                                    "all_ds_2",
                                                    "semua"
                                                  );
                                                } else {
                                                  sessionStorage.setItem(
                                                    "all_ds_2",
                                                    "[" +
                                                      dataItem.dataset_all_dua[
                                                        dataItem.dataset_all_dua
                                                          .length - 3
                                                      ] +
                                                      "]"
                                                  );
                                                }
                                              } else {
                                                sessionStorage.setItem(
                                                  "all_ds_2",
                                                  "semua"
                                                );
                                              }

                                              sessionStorage.setItem(
                                                "selectedDataBerkaca",
                                                JSON.stringify({
                                                  parent_id_1Berkaca:
                                                    dataItem.parent_satu,
                                                  parent_id_2Berkaca:
                                                    dataItem.parent_dua,
                                                  dataset_1Berkaca:
                                                    dataItem.dataset_array_satu ==
                                                    null
                                                      ? "semua"
                                                      : dataItem.dataset_array_satu,
                                                  dataset_2Berkaca:
                                                    dataItem.dataset_array_dua ==
                                                    null
                                                      ? "semua"
                                                      : dataItem.dataset_array_dua,
                                                  LabelnyaTimeseries_1: labels,
                                                  LabelnyaTimeseries_2: labels2,
                                                  labelset1: labels,
                                                  labelset2: labels2,
                                                  all_ds1_set:
                                                    dataItem.dataset_array_satu ==
                                                    null
                                                      ? []
                                                      : dataItem.dataset_array_satu,
                                                  all_ds2_set:
                                                    dataItem.dataset_array_dua ==
                                                    null
                                                      ? []
                                                      : dataItem.dataset_array_dua,
                                                  ds1_child: dataItem.parent_satu,
                                                  ds2_child: dataItem.parent_dua,
                                                  ds1_parent:
                                                    dataItem.root_dataset_satu,
                                                  ds2_parent:
                                                    dataItem.root_dataset_dua,
                                                  grafikTimeseries: [],
                                                  grafikTimeseries2: [],
                                                  namachild:
                                                    dataItem.parent_satu_nama,
                                                  sumberTimeseries: "",
                                                })
                                              );
                                              if (dataItem.tahun == "semua") {
                                                window.location.href =
                                                  "/Berkaca-Grafik-Timeseries";
                                              } else {
                                                window.location.href =
                                                  "/Berkaca-Grafik-PieChart";
                                              }
                                            }
                                          }}
                                        >
                                          <div className="flex items-center justify-center">
                                            <img
                                              src={
                                                dataItem.halaman_tipe ===
                                                "JELAJAH"
                                                  ? imgcard
                                                  : dataItem.halaman_tipe ===
                                                    "UTAK-ATIK"
                                                  ? imgcard2
                                                  : dataItem.halaman_tipe ===
                                                    "BERKACA"
                                                  ? imgcard3
                                                  : null
                                              }
                                              alt="Gambar"
                                              className="w-[70px] h-[70px] rounded-lg mr-3 bg-white"
                                            />
                                            <div>
                                              <p className="text-[12px] font-medium mb-1">
                                                {dataItem.tahun}
                                              </p>
                                              <p className="text-xl font-bold mb-1">
                                                {dataItem.halaman_tipe ===
                                                "BERKACA" ? (
                                                  <p>
                                                    {dataItem.wilayah_satu}
                                                    &nbsp;&&nbsp;
                                                    {dataItem.wilayah_dua}
                                                  </p>
                                                ) : (
                                                  <p>{dataItem.wilayah_satu}</p>
                                                )}
                                              </p>
                                              <p className="text-[12px] font-medium mb-1">
                                                {dataItem.halaman_tipe ===
                                                "JELAJAH" ? (
                                                  <p>{dataItem.dataset_satu}</p>
                                                ) : dataItem.halaman_tipe ===
                                                  "UTAK-ATIK" ? (
                                                  <p>
                                                    1.&nbsp;
                                                    {dataItem.dataset_satu
                                                      ? dataItem.dataset_satu
                                                          .length > 20
                                                        ? dataItem.dataset_satu?.substring(
                                                            0,
                                                            20
                                                          ) + "..."
                                                        : dataItem.dataset_satu
                                                      : dataItem.dataset_satu}
                                                  </p>
                                                ) : dataItem.halaman_tipe ===
                                                  "BERKACA" ? (
                                                  <p>
                                                    1.&nbsp;
                                                    {dataItem.dataset_satu
                                                      ? dataItem.dataset_satu
                                                          .length > 20
                                                        ? dataItem.dataset_satu?.substring(
                                                            0,
                                                            20
                                                          ) + "..."
                                                        : dataItem.dataset_satu
                                                      : dataItem.dataset_satu}
                                                  </p>
                                                ) : null}
                                              </p>
                                              <p className="text-[12px] font-medium mb-1">
                                                {dataItem.halaman_tipe ===
                                                "JELAJAH" ? (
                                                  <p>{dataItem.dataset_dua}</p>
                                                ) : dataItem.halaman_tipe ===
                                                  "UTAK-ATIK" ? (
                                                  <p>
                                                    2.&nbsp;
                                                    {dataItem.dataset_dua
                                                      ? dataItem.dataset_dua
                                                          .length > 20
                                                        ? dataItem.dataset_dua?.substring(
                                                            0,
                                                            20
                                                          ) + "..."
                                                        : dataItem.dataset_dua
                                                      : dataItem.dataset_dua}
                                                  </p>
                                                ) : dataItem.halaman_tipe ===
                                                  "BERKACA" ? (
                                                  <p>
                                                    2.&nbsp;
                                                    {dataItem.dataset_dua
                                                      ? dataItem.dataset_dua
                                                          .length > 20
                                                        ? dataItem.dataset_dua?.substring(
                                                            0,
                                                            20
                                                          ) + "..."
                                                        : dataItem.dataset_dua
                                                      : dataItem.dataset_dua}
                                                  </p>
                                                ) : null}
                                              </p>
                                            </div>
                                          </div>
                                          <div>
                                            <p className="text-[12px] font-medium text-gray-500">
                                              {dataItem.timestamps}
                                            </p>
                                          </div>
                                        </div>
                                        {deleteCheckboxIsiKoleksi === false ? (
                                          <></>
                                        ) : (
                                          <>
                                            <div className="flex justify-center items-center mx-[20px]">
                                              <label className="container">
                                                <input
                                                  value={dataItem.id}
                                                  className="idDelete peer cursor-pointer hidden after:opacity-100"
                                                  type="checkbox"
                                                  onChange={(e) =>
                                                    handleCheckboxChangeIsiKoleksi(
                                                      moveCheckboxIsiKoleksi,
                                                      e.target.value
                                                    )
                                                  }
                                                />
                                                <span className="inline-block w-[25px] h-[25px] rounded-[2px] border-2 border-secondary relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[13px] after:h-[13px] after:bg-secondary after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"></span>
                                              </label>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    ))}
                                    {deleteCheckboxIsiKoleksi === true ? (
                                      <div className="flex justify-center lg:mb-[20px] xl:mb-[20px] md:mb-[20px] lg:mt-[20px] xl:mt-[20px] md:mt-[20px]">
                                        <button
                                          className={`py-2 px-4 rounded-[10px] text-white ${
                                            moveCheckboxIsiKoleksi === "move"
                                              ? "bg-[#24445A] hover:bg-[#86BBD8]"
                                              : "bg-[#CD3838] hover:bg-[#E54747]"
                                          }`}
                                          onClick={() => {
                                            if (
                                              moveCheckboxIsiKoleksi == "move"
                                            ) {
                                              Popupmovecollection();
                                            } else if (checkNull == true) {
                                              isiCheckBoxIsiKoleksi();
                                            } else {
                                              PopUPDeleteDataIsiKoleksi(
                                                targetDelete
                                              );
                                            }
                                          }}
                                        >
                                          {moveCheckboxIsiKoleksi === "move"
                                            ? "Pindahkan"
                                            : "Hapus"}
                                        </button>
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </section>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </body>
    </body>
    
  );
};

export default Profile;
