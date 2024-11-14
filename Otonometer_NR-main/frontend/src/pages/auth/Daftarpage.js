import React, { useState, useEffect } from "react";
import Illustration from "../../assets/Auth/ilustrasi.jpg";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "../../style/Components.css";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCalendar, faArrowCircleLeft, faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import AppleIcon from "../../assets/icons/apple.svg";
import GoogleIcon from "../../assets/icons/google.svg";
import MicrosoftIcon from "../../assets/icons/microsoft.svg";
import NeracaIcon from "../../assets/icons/neracaruang.svg";
import { useNavigate } from "react-router-dom";
import { Form, Link } from "react-router-dom";
import { GoogleLogin } from "@leecheuk/react-google-login";
import { useGoogleLogin } from "@leecheuk/react-google-login";
import { gapi } from "gapi-script";
import "../../style/BtnLoginRegist.css";
import Illustration1 from "../../assets/Auth/ilustrasi1.png";
import Loader from "../../assets/loadernya.gif";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import "../../style/Components.css";
import Loadernya from "../../assets/loadernya.gif";
import "../../style/Components.css";
import Cookies from "js-cookie";
// import ReactGA from "react-ga4";

const Daftar = (province_id) => {
  function recordRegister(gender, age, province, city) {
    console.log(gender, age, Cookies.get("id_guest"), province, city);
    const qs = require("qs");
    let data = qs.stringify({
      guest: Cookies.get("id_guest"),
      gender: gender,
      age: age,
      province: province,
      city: city,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://development.otonometer.com:8000/api/visitor/record-registrasi",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      return (window.location.href = "/");
    } else {
      sessionStorage.clear();
    }
  }, [sessionStorage.getItem("token")]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    kondisiAwal: true,
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    reference: "",
    title: "",
    dob: "",
    province: "",
    city_id: "",
    city_value: "",
    postal_code: "",
    showPassword: false,
    showPassword2: false,
    otp: "",
    provinces: [],
    cities: [],
    postalCodes: [],
    address: "",
    listReferences: [],
    isOpen: false,
    isOpen2: false,
    isOpen3: false,
    inputValue: "",
    inputValueCity: "",
    inputValuePostal: "",
    isOpenTitle: false,
    selectedReference: "",
  });
  const {
    email,
    title,
    dob,
    showPassword,
    showPassword2,
    password,
    confirm_password,
    reference,
    name,
    otp,
    city_id,
    city_value,
    province,
    provinces,
    cities,
    postal_code,
    postalCodes,
    address,
    listReferences,
    isOpen,
    isOpen2,
    isOpen3,
    inputValue,
    inputValueCity,
    inputValuePostal,
    isOpenTitle,
    selectedReference,
  } = formData;

  const goBack = () => {
    if (step === 1) {
      window.history.back();
    } else {
      setStep(step - 1);
    }
  };

  const [garisNama, setGarisNama] = useState(false);
  const [garisEmail, setGarisEmail] = useState(false);
  const [garisTitle, setGarisTitle] = useState(false);
  const [garisDOB, setGarisDOB] = useState(false);
  const [garisProvinsi, setGarisProvinsi] = useState(false);
  const [garisCity, setGarisCity] = useState(false);
  const [garisCityValue, setGarisCityValue] = useState(false);
  const [garisPostalCode, setGarisPostalCode] = useState(false);
  const [garisPassword, setGarisPassword] = useState(false);
  const [garisConfirmPassword, setGarisConfirmPassword] = useState(false);
  const [garisReference, setGarisReference] = useState(false);

  const [titleUser, setTitleUser] = useState(null);
  const [namaUser, setNamaUser] = useState("");

  const titlenyaUser = ["Tn", "Ny", "Nn"];
  const toggleDropdownTitle = () => {
    setFormData((prevState) => ({
      ...prevState,
      isOpenTitle: !prevState.isOpenTitle,
    }));
  };

  const handleChangeTitle = (selectedTitle) => {
    setFormData((prevState) => ({
      ...prevState,
      title: selectedTitle,
    }));
  };

  useEffect(() => {
    var selectedTitle = titleUser;
    setFormData((prevState) => ({
      ...prevState,
      title: selectedTitle,
    }));
    handleChangeTitle(selectedTitle);
  }, [titleUser]);

  const getPostalCode = async (city_id) => {
    try {
      let data = new FormData();
      data.append("location_id", city_id);
      // data.append('postalcode', postalcode);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.REACT_APP_URL_API + "/get-postalcode",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };

      const response = await axios.request(config);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // useEffect(() => {
  //   fetchCities();
  // }, []);

  useEffect(() => {
    const storedCityId = sessionStorage.getItem("city_id");
    if (storedCityId) {
      setFormData((prevData) => ({
        ...prevData,
        city_id: storedCityId,
      }));
    }
  }, []);

  const fetchCities = async (provinceId) => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL_API + `/all_cities?province_id=${provinceId}`);
      setFormData((prevState) => ({
        ...prevState,
        cities: response.data.data,
      }));
    } catch (error) {
      console.error("Fetching cities failed:", error);
    }
  };

  useEffect(() => {
    fetchProvinces();
    fetchReferences();
  }, []);
  const fetchProvinces = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL_API + "/provinces");
      setFormData((prevState) => ({
        ...prevState,
        provinces: response.data.data,
      }));
    } catch (error) {
      console.error("Fetching provinces failed:", error);
    }
  };

  const fetchReferences = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL_API + "/reference/id");
      setFormData((prevState) => ({
        ...prevState,
        listReferences: response.data.data,
      }));
    } catch (error) {
      console.error("Fetching preferences failed:", error);
    }
  };

  const handleChange = (e) => {
    const { name: fieldName, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleChangeProvince = (selectedProvince) => {
    setFormData((prevState) => ({
      ...prevState,
      province: selectedProvince.id,
    }));
    setFormData((prevState) => ({
      ...prevState,
      city_id: "", // Reset city
      city_value: "", // Reset city label
      postal_code: "", // Reset postal code
      address: "", // Reset address
    }));
    fetchCities(selectedProvince.id);
  };

  const setInputValue = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      inputValue: value,
    }));
  };

  const setInputValueCity = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      inputValueCity: value,
    }));
  };

  const filterProvinces = () => {
    return provinces.filter((province) => province.nama.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const toggleDropdown = () => {
    setFormData((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
      isOpen2: false,
      isOpen3: false,
    }));
  };

  const toggleDropdown2 = () => {
    setFormData((prevState) => ({
      ...prevState,
      isOpen2: !prevState.isOpen2,
      isOpen: false,
      isOpen3: false,
    }));
  };
  const toggleDropdown3 = () => {
    setFormData((prevState) => ({
      ...prevState,
      isOpen3: !prevState.isOpen3,
      isOpen2: false,
      isOpen: false,
    }));
  };

  const handleChangeCityInput = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      inputValueCity: value,
    }));
  };

  const handleChangeReference = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      selectedReference: listReferences.find((item) => item.id === event.target.value),
    }));
  };

  const handleChangeCities = async (e) => {
    const value = JSON.parse(e.target.value);
    const selectedCityId = value.city_id;
    // const selectedCity = formData.cities.find((city) => city.id === selectedCityId);
    setFormData((prevState) => ({
      ...prevState,
      city_id: selectedCityId,
      city_value: value.nama,
      postal_code: "",
    }));

    try {
      const postalCodes = await getPostalCode(selectedCityId);
      setFormData((prevState) => ({
        ...prevState,
        postalCodes: postalCodes,
      }));
    } catch (error) {
      console.error("Failed to fetch postal codes:", error);
    }
  };

  const handleChangePostalCode = (e) => {
    const selectedPostalCode = JSON.parse(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      postal_code: selectedPostalCode.kodepos,
      address: selectedPostalCode.location,
    }));
  };

  const handleChangePostalInput = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      inputValuePostal: value,
    }));
  };

  const handleDateChange = (date) => {
    const tanggal = new Date(date);
    setFormData((prevState) => ({
      ...prevState,
      dob: tanggal.getFullYear() + "-" + String(tanggal.getMonth() + 1).padStart(2, "0") + "-" + String(tanggal.getDate()).padStart(2, "0"),
    }));
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

  const checkEmailExistence = async (email) => {
    try {
      const response = await axios.post(process.env.REACT_APP_URL_API + "/check-email-exist", { email });
      return response.data.exist;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Failed to check email existence:", error.response.data.message);
        return true; // Email sudah terdaftar
      } else {
        console.error("Failed to check email existence:", error);
        return false;
      }
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const MySwal = withReactContent(Swal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (step === 1) {
        if (!formData.email) {
          setGarisEmail(true); // Atur garisEmail menjadi true karena field email kosong
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
          return;
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(formData.email)) {
          setGarisEmail(true);
          Swal.fire({
            title: "Perhatian!",
            text: "Format email tidak valid.",
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

        const emailExist = await checkEmailExistence(email);
        if (emailExist) {
          Swal.fire({
            title: "Perhatian!",
            text: "Email sudah terdaftar.Silakan ke halaman Masuk, atau bisa gunakan email lain untuk Daftar.",
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
        setStep(step + 1);
      } else if (step === 2) {
        if (!formData.title || !formData.city_id || !formData.city_value || !formData.postal_code || !formData.name || !formData.dob || !formData.province) {
          setFormData((prevState) => ({
            ...prevState,
            kondisiAwal: false, // Set kondisiAwal menjadi false ketika user berinteraksi
          }));
          // setGarisNama(true);
          Swal.fire({
            title: "Perhatian!",
            text: "Pastikan data sudah terisi semua.",
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
        if (formData.name.trim() === "" || formData.name.length > 60) {
          Swal.fire({
            title: "Perhatian!",
            text: formData.name.trim() === "" ? "Masukkan setidaknya 1 karakter." : "Jumlah karakter paling banyak 60 karakter termasuk spasi, dan jumlah kata paling sedikit 1 kata.",
            confirmButtonText: "Tutup",
            confirmButtonColor: "#24445A",
            customClass: {
              title: "title-icon-errorr",
              text: "text-icon",
              confirmButton: "confirm-icon",
            },
          });
          return;
        }

        setFormData((prevState) => ({
          ...prevState,
          kondisiAwal: true, // Kembalikan kondisiAwal ke true ketika memulai langkah baru
        }));
        setStep(step + 1);
      } else if (step === 3) {
        if (!password || !confirm_password) {
          setGarisPassword(true);
          setGarisConfirmPassword(true);
          Swal.fire({
            title: "Perhatian!",
            text: "Kata sandi harus diisi.",
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
        if (!selectedReference) {
          setGarisReference(true);
          Swal.fire({
            title: "Perhatian!",
            text: "Pastikan data sudah terisi semua.",
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

        if (password !== confirm_password) {
          Swal.fire({
            title: "Perhatian!",
            text: "Kata sandi dan konfirmasi kata sandi tidak cocok!",
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
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
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

        if (!termsChecked) {
          Swal.fire({
            title: "Perhatian!",
            text: "Harap setujui Syarat & Ketentuan dan Kebijakan Privasi untuk melanjutkan.",
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

        const dataRegist = new FormData();
        dataRegist.append("email", formData.email);
        dataRegist.append("name", formData.name);
        dataRegist.append("address", formData.address);
        dataRegist.append("city_value", formData.city_value);
        dataRegist.append("city_id", formData.city_id);
        dataRegist.append("title", formData.title);
        dataRegist.append("dob", formData.dob);
        dataRegist.append("postal_code", formData.postal_code);
        dataRegist.append("password", formData.password);
        dataRegist.append("confirm_password", formData.confirm_password);
        dataRegist.append("reference", formData.reference);
        dataRegist.append("website_register", 1);
        let gender;
        if (formData.title == "Nn" || formData.title == "Ny") {
          gender = "female";
        } else {
          gender = "male";
        }
        const formDataObj = Object.fromEntries(dataRegist.entries());
        console.log("Data yang terkirim:", formDataObj);
        const calculateAge = (dob) => {
          const birthDate = new Date(dob);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          const dayDiff = today.getDate() - birthDate.getDate();
          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--; // subtract 1 if the birthday hasn't occurred yet this year
          }
          return age;
        };
        try {
          document.getElementById("loadingg").classList.remove("hidden");
          const response = await axios.post(process.env.REACT_APP_URL_API + "/register", dataRegist, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.data.status) {
            // ReactGA.event({
            //   category: 'User',
            //   action: 'Registration',
            //   label: 'Regist Without Google Account',
            //   user_gender: gender,
            //   user_age: calculateAge(formData.dob),
            //   user_city: formData.city_value,
            // });
            recordRegister(gender, calculateAge(formData.dob), formData.province, formData.city_value);
            document.getElementById("loadingg").classList.add("hidden");
            submitBerhasil();
          }
        } catch (error) {}
      }
    } catch (error) {
      console.error("Registration failed:", error);
      document.getElementById("loadingg").classList.add("hidden");
      Swal.fire({
        title: "Perhatian!",
        text: "Terdapat masalah saat mencoba register. Mohon coba beberapa saat lagi.",
      });
    }
  };

  useEffect(() => {
    // Set garisNama menjadi true jika field nama kosong dan user sudah interaksi
    if (formData.name === "" && !formData.kondisiAwal) {
      setGarisNama(true);
    } else {
      setGarisNama(false);
    }
  }, [formData.name, formData.kondisiAwal]);

  useEffect(() => {
    // Set garisProvinsi menjadi true jika field province kosong dan user sudah berinteraksi
    if (!formData.province && !formData.kondisiAwal) {
      setGarisProvinsi(true);
    } else {
      setGarisProvinsi(false);
    }
  }, [formData.province, formData.kondisiAwal]);

  useEffect(() => {
    // Set garisEmail menjadi true jika field email kosong dan user sudah interaksi
    if (formData.email === "" && !formData.kondisiAwal) {
      setGarisEmail(true);
    } else {
      setGarisEmail(false);
    }
  }, [formData.email, formData.kondisiAwal]);

  useEffect(() => {
    // Set garisTitle menjadi true jika field title tidak dipilih dan user telah berinteraksi
    if (!formData.title && !formData.kondisiAwal) {
      setGarisTitle(true);
    } else {
      setGarisTitle(false);
    }
  }, [formData.title, formData.kondisiAwal]);

  useEffect(() => {
    // Set garisDOB menjadi true jika field dob tidak dipilih dan user telah berinteraksi
    if (!formData.dob && !formData.kondisiAwal) {
      setGarisDOB(true);
    } else {
      setGarisDOB(false);
    }
  }, [formData.dob, formData.kondisiAwal]);

  useEffect(() => {
    // Set garisCity menjadi true jika field city_id atau city_value kosong dan user sudah berinteraksi
    if ((!formData.city_id || !formData.city_value) && !formData.kondisiAwal) {
      setGarisCity(true);
    } else {
      setGarisCity(false);
    }
  }, [formData.city_id, formData.city_value, formData.kondisiAwal]);

  useEffect(() => {
    // Set garisPostalCode menjadi true jika field postal_code kosong dan user sudah berinteraksi
    if (!formData.postal_code && !formData.kondisiAwal) {
      setGarisPostalCode(true);
    } else {
      setGarisPostalCode(false);
    }
  }, [formData.postal_code, formData.kondisiAwal]);

  useEffect(() => {
    // Set garisPassword menjadi true jika field password kosong dan user sudah berinteraksi
    if (!formData.password && !formData.kondisiAwal) {
      setGarisPassword(true);
    } else {
      setGarisPassword(false);
    }
  }, [formData.password, formData.kondisiAwal]);

  useEffect(() => {
    // Set garisConfirmPassword menjadi true jika field confirm_password kosong dan user sudah berinteraksi
    if (!formData.confirm_password && !formData.kondisiAwal) {
      setGarisConfirmPassword(true);
    } else {
      setGarisConfirmPassword(false);
    }
  }, [formData.confirm_password, formData.kondisiAwal]);

  useEffect(() => {
    if ((!formData.reference || !selectedReference) && !formData.kondisiAwal) {
      setGarisReference(true);
    } else {
      setGarisReference(false);
    }
  }, [formData.reference, selectedReference, formData.kondisiAwal]);

  // useEffect(() => {
  //   if (step !== 3) {
  //     setGarisPassword(true);
  //     setGarisConfirmPassword(true);
  //     setGarisReference(false);
  //   }
  // }, [step]);

  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const locale = {
    localize: {
      day: (n) => days[n],
      month: (n) => months[n],
    },
    formatLong: {
      date: () => "mm/dd/yyyy",
    },
  };

  const handlePopupKodePos = () => {
    Swal.fire({
      title: "Perhatian!",
      text: "Silakan memilih Kabupaten/Kota terlebih dahulu.",
      confirmButtonText: "Tutup",
      confirmButtonColor: "#24445a",
      customClass: {
        title: "title-icon-errorr",
        text: "text-icon",
        confirmButton: "confirm-icon",
      },
    });
  };
  const handlePopupKota = () => {
    Swal.fire({
      title: "Perhatian!",
      text: "Silakan memilih Provinsi terlebih dahulu.",
      confirmButtonText: "Tutup",
      confirmButtonColor: "#24445a",
      customClass: {
        title: "title-icon-errorr",
        text: "text-icon",
        confirmButton: "confirm-icon",
      },
    });
  };
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
      const defaultProfileImage = "path/to/default/profile/image.png";
      toDataURL(
        response.profileObj.imageUrl,
        function (dataUrl) {
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

                if (data_profile.wilayah_info === null) {
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
                  sessionStorage.setItem("idprovinsi_profile", data_profile.id_province);
                }

                if (data_profile.wilayah_info != null) {
                  if ([543, 544, 545, 546, 547, 548].includes(data_profile.id_wilayah)) {
                    sessionStorage.setItem("namaprovinsi", data_profile.wilayah_info.nama_provinsi);
                    sessionStorage.setItem("namaprovinsi_profile", data_profile.wilayah_info.nama_provinsi);
                    sessionStorage.setItem("namakota_profile", data_profile.wilayah_info.nama);
                    sessionStorage.setItem("namakota", "Kota Jakarta");
                  } else {
                    sessionStorage.setItem("namaprovinsi", data_profile.wilayah_info.nama_provinsi);
                    sessionStorage.setItem("namaprovinsi_profile", data_profile.wilayah_info.nama_provinsi);
                    sessionStorage.setItem("namakota_profile", data_profile.wilayah_info.nama);
                    sessionStorage.setItem("namakota", data_profile.wilayah_info.nama);
                  }
                }
              };

              xhr_profile.open("GET", process.env.REACT_APP_URL_API + "/profile", false);
              xhr_profile.setRequestHeader("Authorization", "Bearer " + loginResponse.token);
              xhr_profile.send();

              Swal.fire({
                iconHtml: '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
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
                  if (dataWilayahh === false) {
                    window.location.href = "/Edit-Profile-Google";
                  } else {
                    window.location.href = "/";
                  }
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
                },
              });
            }
          };
          xhr.onloadend = function () {
            document.getElementById("loadingg").classList.add("hidden");
          };
          xhr.open("POST", process.env.REACT_APP_URL_API + "/login/socialite", false);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.send(data.toString());
        },
        function () {
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

                if (data_profile.wilayah_info === null) {
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
                  sessionStorage.setItem("idprovinsi_profile", data_profile.id_province);
                }

                if (data_profile.wilayah_info != null) {
                  if ([543, 544, 545, 546, 547, 548].includes(data_profile.id_wilayah)) {
                    sessionStorage.setItem("namaprovinsi", data_profile.wilayah_info.nama_provinsi);
                    sessionStorage.setItem("namaprovinsi_profile", data_profile.wilayah_info.nama_provinsi);
                    sessionStorage.setItem("namakota_profile", data_profile.wilayah_info.nama);
                    sessionStorage.setItem("namakota", "Kota Jakarta");
                  } else {
                    sessionStorage.setItem("namaprovinsi", data_profile.wilayah_info.nama_provinsi);
                    sessionStorage.setItem("namaprovinsi_profile", data_profile.wilayah_info.nama_provinsi);
                    sessionStorage.setItem("namakota_profile", data_profile.wilayah_info.nama);
                    sessionStorage.setItem("namakota", data_profile.wilayah_info.nama);
                  }
                }
              };

              xhr_profile.open("GET", process.env.REACT_APP_URL_API + "/profile", true);
              xhr_profile.setRequestHeader("Authorization", "Bearer " + loginResponse.token);
              xhr_profile.send();

              Swal.fire({
                iconHtml: '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
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
                  if (dataWilayahh === false) {
                    window.location.href = "/Edit-Profile-Google";
                  } else {
                    window.location.href = "/";
                  }
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
                },
              });
            }
          };
          xhr.onloadend = function () {
            document.getElementById("loadingg").classList.add("hidden");
          };
          xhr.open("POST", process.env.REACT_APP_URL_API + "/login/socialite", false);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.send(data.toString());
        }
      );
    };

    const onFail = (response) => {
      console.log("onFailll", response);
      document.getElementById("loadingg").classList.add("hidden");
    };

    const start = () => {
      gapi.client.init({
        clientId: "123623149304-teco5205gvv6otp02l8b8mfhqr7otpuv.apps.googleusercontent.com",
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
              <span className="">Daftar dengan Google</span>
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

  // Fungsi untuk mengirim OTP
  const sendOTP = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_URL_API + "/send-otp", { email });
      console.log(response.data);
    } catch (error) {
      console.error("Sending OTP failed:", error);
    }
  };

  // Fungsi untuk memeriksa OTP
  const checkOTP = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_URL_API + "/check-otp", { email: email, otp: document.getElementById("otp").value }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
      console.log(response.data);
      // Lakukan apa pun yang perlu Anda lakukan setelah memeriksa OTP berhasil
    } catch (error) {
      console.error("Checking OTP failed:", error);
      // Tampilkan pesan kesalahan jika verifikasi gagal
      Swal.fire({
        title: "Gagal!",
        icon: "error",
        text: "Verifikasi OTP gagal. Silakan coba lagi!",
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

  const submitBerhasil = async () => {
    let timerInterval;
    let countdown = 60; // Timer countdown in seconds
    let canResend = false;
    let resendButton = null;

    // Function to start the timer
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

    // Function to handle OTP submission
    const handleOTPSubmission = async (enteredOTP) => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_URL_API + "/verify-email",
          new URLSearchParams({
            email: email,
            otp: enteredOTP,
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        Swal.fire({
          iconHtml: '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
          title: "Berhasil!",
          text: "Berhasil Verifikasi, Silakan Login Kembali!",
          confirmButtonText: "Lanjut",
          confirmButtonColor: "#27AE60",
          customClass: {
            icon: "no-border",
            title: "title-icon",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/Masuk";
          }
        });
      } catch (error) {
        console.error("Verifikasi OTP gagal:", error);
        Swal.fire({
          title: "Gagal!",
          icon: "error",
          text: "Verifikasi OTP gagal. Silakan coba lagi!",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#CD3838",
          customClass: {
            title: "title-icon-error",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
        }).then(() => {
          submitBerhasil();
        });
      }
    };

    // Show Swal modal with OTP input
    const { value: enteredOTP } = await Swal.fire({
      title: "Akun Sudah Terbuat",
      html: `
        <div style="text-align: center; margin-bottom: 10px; font-size: 20px">Verifikasi Email untuk mengakses seluruh fitur!</div>
        <div style="text-align: center; margin-bottom: 10px; font-size: 15px">Kode OTP</div>
        <input id="otp" class="swal2-input otp-input" maxlength="6" style="width: 12em; text-align: center;" />
        <br>
        <br>
        <br>
        <button class="swal2-resend-button resend-button" ${canResend ? "" : "disabled"}>Kirim Ulang</button>
        <div class="swal2-timer-text" style="font-size: 15px">Timer: ${countdown}s</div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const enteredOTP = document.getElementById("otp").value;
        if (!enteredOTP || enteredOTP.length !== 6 || !/^\d+$/.test(enteredOTP)) {
          Swal.showValidationMessage("Kode OTP harus berupa 6 digit angka.");
          return false;
        }
        return enteredOTP;
      },
      confirmButtonText: "Verifikasi",
      confirmButtonColor: "#24445A",
      showCancelButton: false,
      customClass: {
        text: "text-icon",
        confirmButton: "otp-button simpan-button",
        resendButton: "otp-button resend-button",
      },
      // allowOutsideClick: false,
      allowOutsideClick: false,
      // Show Resend button
      didOpen: () => {
        startTimer();
        const resendButton = document.querySelector(".swal2-resend-button");
        resendButton.addEventListener("click", () => {
          if (canResend) {
            // Check if resend button is enabled
            sendOTP();
            countdown = 60; // Reset countdown
            startTimer(); // Restart timer
          }
        });
      },
    });
    if (enteredOTP) {
      handleOTPSubmission(enteredOTP);
    }
  };

  const hundredYearsAgo = new Date();
  hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 100);

  const [termsChecked, setTermsChecked] = useState(false);

  let form;
  if (step === 1) {
    form = (
      <form onSubmit={handleSubmit} class="max-w-md bg-white rounded px-8 pt-6 pb-8 lg:mb-0 mb-0 md:mb-16 lg:ml-0 ml-0 md:ml-12">
        <h1 class="text-6xl font-bold mb-4 text-left text-secondary">Daftar</h1>
        <p class="text-sm mb-8 text-secondary">
          Daftarkan diri Anda untuk mengakses <span class="font-bold">fitur lainnya</span> Otonometer
        </p>

        <div class="mb-4">
          <label class={`block text-sm font-medium mb-4 md:mb-[4px] text-[14px] ${garisEmail ? "text-red-600" : "text-secondary"}`} for="email">
            {garisEmail ? "Email*" : "Email"}
          </label>
          <input
            class={`border rounded-[8px] h-[40px] w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline text-[14px] font-regular ${garisEmail ? "border-red-600" : ""}`}
            id="email"
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div class="mb-4">
          <button class="button rounded-[8px] h-[40px] w-full py-2 px-3" type="submit">
            Selanjutnya
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
        <div class="flex items-center justify-center mt-4 font-regular text-[14px] text-secondary ">
          <span>Sudah memiliki akun?</span>
          <span class="ml-1">
            <Link to="/Masuk" class="font-bold" style={{ color: "#24445A" }}>
              Masuk
            </Link>
          </span>
        </div>
      </form>
    );
  } else if (step === 2) {
    form = (
      <form onSubmit={handleSubmit} class="max-w-md bg-white rounded pl-4 pr-4 px-8 pt-6 pb-8 lg:mb-0 mb-0 md:mb-16 lg:ml-0 ml-0 md:ml-12">
        <h1 className="text-6xl lg:text-6xl font-bold mb-4 text-left text-secondary lg:ml-0 ml-2">Daftar</h1>
        {/* Tulisan di bawah judul */}
        <p className="text-sm mb-6 text-secondary lg:ml-0 ml-2">
          Daftarkan diri Anda untuk mengakses <span className="font-bold">fitur lainnya</span> Otonometer
        </p>

        <div className="mb-4 lg:flex flex gap-[10px] lg:items-center lg:ml-0 ml-2">
          <div>
            <label className={`block text-sm font-medium mb-[4px] text-[14px] ${garisTitle ? "text-red-600" : "text-secondary"}`} htmlFor="title">
              {garisTitle ? "Title*" : "Title"}
            </label>
            <div>
              <div className={`w-full infield leading-tight focus:outline-none focus:shadow-outline font-regular whitespace-nowrap cursor-pointer flex justify-between ${garisTitle ? "border-red-600" : ""}`} onClick={toggleDropdownTitle}>
                {title ? titlenyaUser.find((p) => p === title) : "Pilih"}
                <FontAwesomeIcon icon={faChevronDown} color="#24445A" className={`ml-[20px] w-[10px] h-[20px] ${isOpenTitle && "rotate-180"}`} />
              </div>
              {isOpenTitle && (
                <div className="flex flex-col w-[84px] bg-white border border-gray-300 rounded-md shadow-lg mt-[10px] absolute z-10 text-secondary">
                  <ul className="max-h-40 overflow-y-auto">
                    {titlenyaUser.map((title) => (
                      <li
                        key={title}
                        className="cursor-pointer select-none p-2 text-[12px] hover:bg-third hover:text-white rounded-md"
                        onClick={() => {
                          handleChangeTitle(title);
                          toggleDropdownTitle();
                        }}
                      >
                        {title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-3/4 lg:pl-4">
            <label className={`block text-sm font-medium mb-1 lg:text-[14px] ${garisNama ? "text-red-600" : "text-secondary"}`} htmlFor="nama">
              {garisNama ? "Nama Lengkap*" : "Nama Lengkap"}
            </label>
            <input
              className={`lg:w-full w-[259px] h-[40px] border rounded-lg text-secondary py-2 px-3 leading-tight text-[14px] focus:outline-none focus:shadow-outline font-regular ${garisNama ? "border-red-600" : ""}`}
              id="name"
              type="name"
              placeholder="Nama Lengkap"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-4 lg:ml-0 ml-2">
          <label className={`block text-sm font-medium mb-1 lg:text-[14px] ${garisDOB ? "text-red-600" : "text-secondary"}`} htmlFor="birthDate">
            {garisDOB ? "Tanggal Lahir*" : "Tanggal Lahir"}
          </label>
          <div className="relative">
            <div className={`infield leading-tight focus:outline-none focus:shadow-outline font-regular ${garisDOB ? "border-red-600" : ""}`}>
              <DatePicker
                id="dob"
                selected={dob ? new Date(dob) : null}
                locale={locale}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
                placeholderText="Pilih Tanggal"
                yearDropdownItemNumber={100}
                showYearDropdown
                showMonthDropdown
                scrollableYearDropdown
                scrollableMonthYearDropdown
                minDate={hundredYearsAgo}
                maxDate={new Date(2018, 11, 30)}
              />
            </div>
            <FontAwesomeIcon icon={faCalendar} className="absolute right-0 top-0 lg:mt-3 mt-3 mr-7 lg:mr-7 text-gray-400 lg:mr-0 lg:mt-0" />
          </div>
        </div>
        <div className="mb-4 lg:ml-0 ml-2">
          <label className={`block  text-sm font-medium mb-1 lg:text-[14px] ${garisProvinsi ? "text-red-600" : "text-secondary"}`} htmlFor="province">
            {garisProvinsi ? "Provinsi*" : "Provinsi"}
          </label>
          <div>
            <div className="relative">
              <div className={`infield leading-tight cursor-pointer focus:outline-none focus:shadow-outline font-regular ${garisProvinsi ? "border-red-600" : ""}`} onClick={toggleDropdown}>
                {province ? provinces.find((p) => p.id === province)?.nama : "Pilih Provinsi"}
                <FontAwesomeIcon icon={faChevronDown} color="##24445A" size="sm" className="absolute right-0 top-0 lg:mt-3 mt-3 mr-7 lg:mr-7 text-gray-400 lg:mr-0 lg:mt-0" />
              </div>
            </div>
            {isOpen && (
              <div className="absolute mt-1 lg:w-[415px] w-[250px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <div className="flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2">
                  <FontAwesomeIcon icon={faSearch} color="#24445A" style={{ opacity: "40%" }} className="w-[10px] h-[20px] opacity-75" />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Cari Provinsi"
                    className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
                  />
                </div>
                <ul className="max-h-40 overflow-y-auto">
                  {filterProvinces().map((province) => (
                    <li
                      key={province.id}
                      className="cursor-pointer select-none p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]"
                      onClick={() => {
                        handleChangeProvince(province);
                        toggleDropdown();
                      }}
                    >
                      {province.nama}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mb-4 lg:ml-0 ml-2">
          <label className={`block  text-sm font-medium mb-1 lg:text-[14px] ${garisCity ? "text-red-600" : "text-secondary"}`} htmlFor="district">
            {garisCity ? "Kota/Kabupaten*" : "Kota/Kabupaten"}
          </label>
          <div>
            <div className="relative">
              <div
                className={`infield leading-tight cursor-pointer focus:outline-none focus:shadow-outline font-regular ${garisCity ? "border-red-600" : ""}`}
                onClick={() => {
                  if (province !== "") {
                    toggleDropdown2();
                  } else {
                    handlePopupKota();
                  }
                }}
              >
                {city_value ? city_value : "Pilih Kabupaten/Kota"}
                <FontAwesomeIcon icon={faChevronDown} color="#24445A" size="sm" className="absolute right-0 top-0 lg:mt-3 mt-3 mr-7 lg:mr-7 text-gray-400 lg:mr-0 lg:mt-0" />
              </div>
            </div>
            {isOpen2 && (
              <div className="absolute mt-1 lg:w-[415px] w-[250px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <div className="flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2">
                  <FontAwesomeIcon icon={faSearch} color="#24445A" style={{ opacity: "40%" }} className="w-[10px] h-[20px] opacity-75" />
                  <input
                    type="text"
                    value={inputValueCity}
                    onChange={handleChangeCityInput}
                    placeholder="Cari Kota/Kabupaten"
                    className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
                  />
                </div>
                <ul className="max-h-40 overflow-y-auto">
                  {cities
                    .filter((city) => city.nama.toLowerCase().includes(inputValueCity.toLowerCase()))
                    .map((city) => (
                      <li
                        key={city.id}
                        className="cursor-pointer select-none p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]"
                        onClick={() => {
                          handleChangeCities({
                            target: {
                              value: JSON.stringify({
                                city_id: city.id,
                                nama: city.nama,
                              }),
                            },
                          });
                          toggleDropdown2();
                        }}
                      >
                        {city.nama}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mb-4 lg:ml-0 ml-2">
          <label className={`block  text-sm font-medium mb-1 lg:text-[14px] ${garisPostalCode ? "text-red-600" : "text-secondary"}`} htmlFor="postalCode">
            {garisPostalCode ? "Kode Pos*" : "Kode Pos"}
          </label>
          <div>
            <div className="relative">
              <div
                className={`infield leading-tight cursor-pointer focus:outline-none focus:shadow-outline font-regular ${garisPostalCode ? "border-red-600" : ""}`}
                onClick={() => {
                  if (formData.city_id !== "" || formData.city_value !== "") {
                    toggleDropdown3();
                  } else {
                    handlePopupKodePos();
                  }
                }}
              >
                {postal_code && address ? `${postal_code} - ${address ? (address.length > 28 ? address?.substring(0, 28) + "..." : address) : address}` : "Pilih Kode Pos"}
                <FontAwesomeIcon icon={faChevronDown} color="black" size="sm" className="absolute right-0 top-0 lg:mt-3 mt-3 mr-7 lg:mr-7 text-gray-400 lg:mr-0 lg:mt-0" />
              </div>
            </div>
            {isOpen3 && (
              <div className="absolute mt-1 lg:w-[415px] w-[250px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <div className="flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2">
                  <FontAwesomeIcon icon={faSearch} color="#24445A" style={{ opacity: "40%" }} className="w-[10px] h-[20px] opacity-75" />
                  <input
                    type="text"
                    value={inputValuePostal}
                    onChange={handleChangePostalInput}
                    placeholder="Cari Kode Pos"
                    className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
                  />
                </div>
                <ul className="max-h-40 overflow-y-auto">
                  {postalCodes
                    .filter((postal) => postal.kodepos.toString().toLowerCase().includes(inputValuePostal.toLowerCase()) || postal.location_name.toLowerCase().includes(inputValuePostal.toLowerCase()))
                    .map((postal, index) => (
                      <li
                        key={index} // Use index as the key
                        className="cursor-pointer select-none p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]"
                        onClick={() => {
                          handleChangePostalCode({ target: { value: JSON.stringify({ location: postal.location_name, kodepos: postal.kodepos }) } });
                          toggleDropdown3();
                        }}
                      >
                        {postal.kodepos} - {postal.location_name}
                      </li>
                    ))}

                  {postalCodes.filter((postal) => postal.kodepos.toString().toLowerCase().includes(inputValuePostal.toLowerCase()) || postal.location_name.toLowerCase().includes(inputValuePostal.toLowerCase())).length === 0 &&
                    inputValuePostal.length > 0 && <li className="p-2 text-[12px]">No matches found</li>}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="button rounded-lg lg:w-full py-2 px-3 lg:text-md"
            // style={{ backgroundColor: '#86BBD8' }}
            type="submit"
          >
            Selanjutnya
          </button>
        </div>

        <div className="flex items-center justify-center mt-4 font-regular text-[14px] text-secondary">
          <span>Sudah memiliki akun?</span>
          <span className="ml-1">
            <Link to="/Masuk" className="font-bold" style={{ color: "#24445A" }}>
              Masuk
            </Link>
          </span>
        </div>
      </form>
    );
  } else if (step === 3) {
    // Jika Anda memiliki lebih banyak langkah, tambahkan kondisi di sini
    // Contoh: else if (step === 3) { ... }
    form = (
      <form onSubmit={handleSubmit} className="max-w-md bg-white rounded px-8 pt-6 pb-8 lg:mb-[0px] mb-[0px] mt-[-40px] md:mb-[350px] lg:ml-[0px] ml-[0px] md:ml-[30px]">
        <div className="my-[10px]">
          <h1 className="text-6xl font-bold mb-4 text-left text-secondary">Daftar</h1>
          {/* Tulisan di bawah judul */}
          <p className="text-sm mb-8 text-secondary">
            Daftarkan diri Anda untuk mengakses <span className="font-bold">fitur lainnya</span> Otonometer
          </p>
        </div>
        <div className="flex flex-col">
          <div className="mb-[8px]">
            <div className="mb-[4px]">
              <label className={`block text-sm font-medium mb-[4px] text-[14px] ${garisPassword ? "text-red-600" : " text-secondary "}`} htmlFor="password">
                {garisPassword ? "Kata Sandi*" : "Kata Sandi"}
              </label>
              <div class="relative">
                <input
                  className={`w-full px-3 py-2 placeholder-gray-400 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none sm:text-sm ${garisPassword ? "border-red-600" : ""}`}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan Kata Sandi"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-transparent rounded-r-lg focus:outline-none">
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} color="#24445A" />
                </button>
              </div>
            </div>
            <p className="text-red-500 text-[12px] ">Panjang Kata sandi minimal 8 karakter</p>
            <p className="text-red-500 text-[12px]">Kata sandi harus mengandung huruf kapital dan huruf kecil</p>
            <p className="text-red-500 text-[12px]">Kata sandi harus mengandung setidaknya satu angka</p>
            <p className="text-red-500 text-[12px]">Kata sandi harus mengandung setidaknya satu karakter khusus</p>

            <div className="mt-[15px]">
              <label className={`block text-sm font-medium mb-[4px] text-[14px] ${garisConfirmPassword ? "text-red-600" : " text-secondary "}`} htmlFor="password">
                {garisConfirmPassword ? "Konfirmasi Kata Sandi*" : "Konfirmasi Kata Sandi"}
              </label>
              <div className="flex justify-between"></div>
              <div class="relative">
                <input
                  className={`w-full px-3 py-2 placeholder-gray-400 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none sm:text-sm ${garisConfirmPassword ? "border-red-600" : ""}`}
                  id="confirm_password"
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Konfirmasi Kata Sandi"
                  name="confirm_password"
                  value={confirm_password}
                  onChange={handleChange}
                />
                <button type="button" onClick={togglePasswordVisibility2} className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-transparent rounded-r-lg focus:outline-none">
                  <FontAwesomeIcon icon={showPassword2 ? faEye : faEyeSlash} color="#24445A" />
                </button>
              </div>
            </div>
          </div>

          {/* Dropdown untuk memilih */}
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-[4px] text-[14px] ${garisReference ? "text-red-600" : "text-secondary"}`} htmlFor="reference">
              {garisReference ? "Dimana anda mendengar Otonometer?*" : "Dimana anda mendengar Otonometer?"}
            </label>
            <div className="relative">
              <div className={`infield leading-tight focus:outline-none focus:shadow-outline font-regular ${garisReference ? "border-red-600" : ""}`} onClick={toggleDropdown}>
                {selectedReference ? selectedReference.name : "Pilih"}
                <FontAwesomeIcon icon={faChevronDown} color="black" size="sm" className="absolute right-0 top-0 lg:mt-3 mt-3 mr-7 lg:mr-7 text-gray-400 lg:mr-0 lg:mt-0" />
              </div>
              {isOpen && (
                <div className="absolute mt-1 lg:w-[385px] w-[250px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <ul>
                    <li
                      className="cursor-pointer select-none p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]"
                      onClick={() => {
                        handleChangeReference({ target: { value: "" } });
                        toggleDropdown();
                      }}
                    >
                      Pilih
                    </li>
                    {listReferences.map((item) => (
                      <li
                        key={item.id}
                        className="cursor-pointer select-none p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]"
                        onClick={() => {
                          handleChangeReference({ target: { value: item.id } });
                          toggleDropdown();
                        }}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center mt-2 mb-2 font-regular text-[14px] text-secondary">
            <label className="flex items-center">
              <input type="checkbox" checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} />
              <span className="ml-2">
                Dengan Melanjutkan, anda menyetujui <br />
                <strong>
                  <a href="/Syarat-Ketentuan" target="_blank" rel="noopener noreferrer">
                    Syarat & Ketentuan
                  </a>
                </strong>{" "}
                dan
                <strong>
                  <a href="/Kebijakan-Privasi" target="_blank" rel="noopener noreferrer">
                    {" "}
                    Kebijakan Privasi
                  </a>
                </strong>
              </span>
            </label>
          </div>

          <div className="flex items-center justify-center w-full sm:w-1/2 md:w-auto pr-2 h-[40px]">
            <button
              className="button rounded-[8px] h-[40px] lg:w-full"
              // style={{ backgroundColor: '#86BBD8' }}
              type="submit"
            >
              Daftar
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center mt-4 font-regular text-[14px] text-secondary">
          <span>Sudah memiliki akun?</span>
          <span className="ml-1">
            <Link to="/Masuk" className="font-bold" style={{ color: "#24445A" }}>
              Masuk
            </Link>
          </span>
        </div>
      </form>
    );
  }

  return (
    <div className="relative">
      <div id="loadingg" className="hidden absolute left-0 top-0 right-0 bottom-0 flex justify-center items-center z-50">
        <div className="w-[400px] h-[250px] bg-white rounded-[10px] flex flex-col justify-center items-center drop-shadow-lg">
          <div className="holds-the-iframe w-[80px] h-[80px]"></div>
          <div className="text-secondary font-semibold mt-[25px]">Silakan tunggu sebentar...</div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Bagian Kiri: Ilustrasi (Hanya ditampilkan pada layar laptop atau komputer) */}
        <div className="hidden lg:block md:hidden md:w-1/2 bg-gray-200 flex justify-center items-center">
          <img src={Illustration} alt="Illustration" className="lg:max-h-full lg:w-full" style={{ maxWidth: "100%" }} />
        </div>
        <div className="hidden md:block lg:hidden md:w-1/3 bg-gray-200 flex justify-center items-center">
          <img src={Illustration1} alt="Illustration" className="md:max-h-full md:w-full" style={{ maxWidth: "100%" }} />
        </div>
        {/* Bagian Kanan: Form Register */}
        <button onClick={goBack} className="flex align-top lg:ml-[50px] ml-[35px] lg:mt-[50px] mt-[50px] h-[20px] w-[20px] object-contain hover:scale-110 transform transition duration-300 lg:mb-[0px] mb-[40px]">
          <FontAwesomeIcon icon={faArrowCircleLeft} color="#24445A" className="fa-2x" />
        </button>
        <div className="md:w-1/2 flex justify-center items-center">{form}</div>
      </div>
    </div>
  );
};

export default Daftar;
