import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "../../style/Components.css";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faChevronUp,
  faChevronDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Form, Link } from "react-router-dom";
import "../../style/BtnLoginRegist.css";
import axios from "axios";
import ProfileImage from "../../assets/icons/iconuser.png";
import editicon from "../../assets/Edit.png"
import Compressor from 'compressorjs';
const EditProfile = () => {
  
    ///GET PROFILE USER 
    const [titleUser, setTitleUser] = useState(null);
    const [namaUser, setNamaUser] = useState("");
    // const [emailUser, setemailUser] = useState("");
    const [provincessID, setProvincessID] = useState(null);
    const [provincessNama, setProvincessNama] = useState(null);
    const [city, setCity] = useState(null);
    const [namaCity, setNamaCity] = useState(null);
    const [birthUser, setBirthUser] = useState(null);
    const [postalCodeUser, setPostalCodeUser] = useState(null);
    const [addressUser, setAddressUser] = useState(null);
    const [askVerified, SetAskVerified] = useState(null);


    const [fotoUser, setFotoUser] = useState(null);
          
    const [step, setStep] = useState(1);
    
    const [formData, setFormData] = useState({
      kondisiAwal: true,
      // email: "",
      title: "",
      name: "",
      dob: "",
      city_id: "",
      city_value: "",
      address: "",
      postal_code: "",
      photo:"",
      province: "",
      nama_province: "",
      provinces: [],
      cities: [],
      postalCodes: [],
      isOpen: false,
      isOpen2: false,
      isOpen3: false,
      isOpenTitle: false,
      inputValue:"",
      inputValueCity:"",
      inputValuePostal: "",
      nameError: "",  // Add this line
    });

    const {
      // email,
      title,
      name,
      dob,
      city_id,
      city_value,
      address,
      postal_code,
      photo,
      province,
      provinces,
      cities,
      postalCodes,
      isOpen,
      isOpen2,
      isOpen3,
      isOpenTitle,
      inputValue,
      inputValueCity,
      inputValuePostal,
    } = formData;

    const validateName = (name) => {
      const maxLength = 60;
      const minWords = 1;
      const words = name.trim().split(/\s+/);
      if (name.length > maxLength || words.length < minWords) {
        return `Jumlah karakter paling banyak ${maxLength} karakter termasuk spasi, dan jumlah kata paling sedikit ${minWords} kata.`;
      }
      return "";
    };
    const handleNameChange = (e) => {
      const { value } = e.target;
      const errorMessage = validateName(value);
      setFormData((prevState) => ({
        ...prevState,
        name: value,
        nameError: errorMessage,
      }));
    };
    

    const tokenUser = sessionStorage.getItem("token");
    ///GET INFO USER
    useEffect(() => {
      const xhr_profile = new XMLHttpRequest();
      xhr_profile.onload = function () {
          const data_profile = JSON.parse(xhr_profile.responseText).data;
          if(data_profile.manual_login == true  && data_profile.wilayah_info != null){
            setTitleUser(data_profile.title);
            setNamaUser(data_profile.name);
            setProvincessID(data_profile.id_province);
            setProvincessNama(data_profile.wilayah_info.nama_provinsi)
            setCity(data_profile.wilayah_info.id);
            setNamaCity(data_profile.wilayah_info.nama);
            setBirthUser(data_profile.tanggal_lahir);
            setPostalCodeUser(data_profile.postal_code);
            setFotoUser(data_profile.image)
            setAddressUser(data_profile.address);
            SetAskVerified(data_profile.is_verified)
          }else if(data_profile.manual_login == false && data_profile.wilayah_info == null){
            setTitleUser(data_profile.title);
            setNamaUser(data_profile.name);
            setProvincessID(data_profile.id_province);
            setBirthUser(data_profile.tanggal_lahir);
            setPostalCodeUser(data_profile.postal_code);
            setFotoUser(data_profile.image)
            setAddressUser(data_profile.address);
            SetAskVerified(data_profile.is_verified)
          }else if(data_profile.manual_login == false && data_profile.wilayah_info != null){
            setTitleUser(data_profile.title);
            setNamaUser(data_profile.name);
            setProvincessID(data_profile.id_province);
            setProvincessNama(data_profile.wilayah_info.nama_provinsi)
            setCity(data_profile.wilayah_info.id);
            setNamaCity(data_profile.wilayah_info.nama);
            setBirthUser(data_profile.tanggal_lahir);
            setPostalCodeUser(data_profile.postal_code);
            setFotoUser(data_profile.image)
            setAddressUser(data_profile.address);
            SetAskVerified(data_profile.is_verified)
          }else if(data_profile.manual_login == true && data_profile.wilayah_info == null){
            setTitleUser(data_profile.title);
            setNamaUser(data_profile.name);
            setProvincessID(data_profile.id_province);
            setBirthUser(data_profile.tanggal_lahir);
            setPostalCodeUser(data_profile.postal_code);
            setFotoUser(data_profile.image)
            setAddressUser(data_profile.address);
            SetAskVerified(data_profile.is_verified)
          }
      };
      xhr_profile.open("GET", process.env.REACT_APP_URL_API+"/profile", true);
      xhr_profile.setRequestHeader("Authorization", "Bearer " + tokenUser);
      xhr_profile.send();
      }, [tokenUser]);

    ///FUNCTION BATALKAN
    const goBack = () => {
      window.history.back();
    };

    ///KONDISI NON LOGIN
    useEffect(()=>{
      if(sessionStorage.getItem("token") == null || sessionStorage.getItem("token") == ""){
        return window.location.href = "/"
      }
    },[sessionStorage.getItem("token")])
    
    ///SETUP KALENDER
    const hundredYearsAgo = new Date();
    hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 100);
    const handleDateChange = (date) => {
      const tanggal = new Date(date);
      setFormData((prevState) => ({
        ...prevState,
        dob: tanggal.getFullYear() + "-" + String(tanggal.getMonth() + 1).padStart(2, "0") + "-" + String(tanggal.getDate()).padStart(2, "0"),
      }));
    };
    
    ///FETCHING
    useEffect(() => {
      fetchProvinces();
    }, []);
    
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_URL_API+"/provinces"
        );
        setFormData((prevState) => ({
          ...prevState,
          provinces: response.data.data,
        }));
      } catch (error) {
        // console.error("Fetching provinces failed:", error);
      }
    };
    const fetchCities = async (provinceId) => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_URL_API+`/all_cities?province_id=${provinceId}`
        );
        setFormData((prevState) => ({
          ...prevState,
          cities: response.data.data,
        }));
      } catch (error) {
        // console.error("Fetching cities failed:", error);
      }
    };
    const getPostalCode = async (city_id) => {
      try {
        let data = new FormData();
        data.append("location_id", city_id);
        // data.append('postalcode', postalcode);
  
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: process.env.REACT_APP_URL_API+"/get-postalcode",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: data,
        };
  
        const response = await axios.request(config);
        // console.log(response.data);
        return response.data.data;
      } catch (error) {
        // console.log(error);
        throw error;
      }
    };
    ///DROPDOWN TITLE v2
    const titlenyaUser =["Tn", "Ny", "Nn"]
    const toggleDropdownTitle = () => {
      if(isOpen3){
        setFormData((prevState) => ({
          ...prevState,
          isOpen3: !prevState.isOpen3,
        }));
      }
      if(isOpen2){
        setFormData((prevState) => ({
          ...prevState,
          isOpen2: !prevState.isOpen2,
        }));
      }
      if(isOpen){
        setFormData((prevState) => ({
          ...prevState,
          isOpen: !prevState.isOpen,
        }));
      }
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

    useEffect(()=>{
      var namanyaUser = namaUser
      setFormData((prevState)=>({
        ...prevState,
        name: namanyaUser
      }))
    },[namaUser])
    useEffect(()=>{
      var dateOfBirth = birthUser
      setFormData((prevState)=>({
        ...prevState,
        dob: dateOfBirth
      }))
    },[birthUser])
    

    useEffect(() => {
      var selectedTitle = titleUser
      setFormData((prevState) => ({
        ...prevState,
        title: selectedTitle,
      }));
      handleChangeTitle(selectedTitle);
    }, [titleUser]);
    ///DROPDOWN PROVINSI V2
    const filterProvinces = () => {
      return provinces.filter((province) =>
        province.nama.toLowerCase().includes(inputValue.toLowerCase())
      );
    };
    const toggleDropdown = () => {
      if(isOpen3){
        setFormData((prevState) => ({
          ...prevState,
          isOpen3: !prevState.isOpen3,
        }));
      }
      if(isOpen2){
        setFormData((prevState) => ({
          ...prevState,
          isOpen2: !prevState.isOpen2,
        }));
      }
      if(isOpenTitle){
        setFormData((prevState) => ({
          ...prevState,
          isOpenTitle: !prevState.isOpenTitle,
        }));
      }
      setFormData((prevState) => ({
        ...prevState,
        isOpen: !prevState.isOpen,
      }));
    };
    const toggleDropdown23 = () => {
      setFormData((prevState) => ({
        ...prevState,
        isOpen: prevState.isOpen,
      }));
    };
    
    const handleChangeProvince = (selectedProvince) => {
      setFormData((prevState) => ({
        ...prevState,
        province: selectedProvince.id,
        nama_province: selectedProvince.nama,
      }));
      setFormData(prevState => ({
        ...prevState,
        city_id: "", // Reset city
        city_value: "", // Reset city label
        postal_code: "", // Reset postal code
        address: "" // Reset address
      }));
      fetchCities(selectedProvince.id);
    };
    useEffect(() => {
      const fetchData = async () => {
        if (provincessID !== null && city !== null) {
          try {
            setFormData((prevState) => ({
              ...prevState,
              province: provincessID,
              nama_province: provincessNama,
              city_id: "", // Reset city
              city_value: "", // Reset city label
              postal_code: "", // Reset postal code
              address: "" // Reset address
            }));
    
            await fetchCities(provincessID);
            setFormData((prevState) => ({
              ...prevState,
              city_id: city,
              city_value: namaCity,
            }));
    
            const postalCodes = await getPostalCode(city);
            setFormData((prevState) => ({
              ...prevState,
              postalCodes: postalCodes,
            }));
          } catch (error) {
            // console.error("An error occurred:", error);
            alert("An error occurred while fetching data. Please try again.");
          }
        }
      };
      fetchData();
    }, [provincessID, provincessNama, city, namaCity]);

    /// DROPDOWN KOTA
    const toggleDropdown2 = () => {
      if(isOpen3){
        setFormData((prevState) => ({
          ...prevState,
          isOpen3: !prevState.isOpen3,
        }));
      }
      if(isOpen){
        setFormData((prevState) => ({
          ...prevState,
          isOpen: !prevState.isOpen,
        }));
      }
      if(isOpenTitle){
        setFormData((prevState) => ({
          ...prevState,
          isOpenTitle: !prevState.isOpenTitle,
        }));
      }
      setFormData((prevState) => ({
        ...prevState,
        isOpen2: !prevState.isOpen2,
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
      }));
      setFormData(prevState => ({
        ...prevState,
        postal_code: "", // Reset postal code
        address: "" // Reset address
      }));
  
      try {
        const postalCodes = await getPostalCode(selectedCityId);
        setFormData((prevState) => ({
          ...prevState,
          postalCodes: postalCodes,
        }));
      } catch (error) {
        // console.error("Failed to fetch postal codes:", error);
      }
    };

    const setInputValue = (value) => {
      setFormData((prevState) => ({
        ...prevState,
        inputValue: value,
      }));
    };
    const handleChangeCityInput = (e) => {
      const { value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        inputValueCity: value,
      }));
    };

    /// DROPDOWN KODEPOS
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
    const toggleDropdown3 = () => {
      if(isOpen2){
        setFormData((prevState) => ({
          ...prevState,
          isOpen2: !prevState.isOpen2,
        }));
      }
      if(isOpen){
        setFormData((prevState) => ({
          ...prevState,
          isOpen: !prevState.isOpen,
        }));
      }
      if(isOpenTitle){
        setFormData((prevState) => ({
          ...prevState,
          isOpenTitle: !prevState.isOpenTitle,
        }));
      }
      setFormData((prevState) => ({
        ...prevState,
        isOpen3: !prevState.isOpen3,
      }));
    };
    const handleChangePostalInput = (e) => {
      const { value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        inputValuePostal: value,
      }));
    };
    const handleChangePostalCode = (e) => {
      const selectedPostalCode = JSON.parse(e.target.value);
      // console.log("selectedPostalCode",selectedPostalCode);
      setFormData((prevState) => ({
        ...prevState,
        address: selectedPostalCode.location,
        postal_code: selectedPostalCode.kodepos,
      }));
    };
    useEffect(()=>{
      setFormData((prevState)=>({
        ...prevState,
        address: addressUser,
        postal_code: postalCodeUser,
      }))
    },[postalCodeUser,addressUser])
    
    
    /// UPLOAD IMAGE
    const inputRef = useRef(null);
    const [imageUser, setImageUser] = useState("");

    const handleImageClick = () =>{
      inputRef.current.click();
    }
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      const fileType = file.type.split("/")[1]; // Extract file type
    
      if (file && file.size <= 5242880 && (fileType === "jpeg" || fileType === "png")) {
        // Check if file is PNG, if so, convert to JPEG
        if (fileType === "png") {
          convertToJPEG(file);
        } else {
          compressImage(file);
        }
      } else {
        Swal.fire({
          title: "Gagal!",
          icon: "error",
          text: "Ukuran file harus dibawah 5MB dan format file harus JPEG atau PNG!",
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
    
    const convertToJPEG = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            const jpegFile = new File([blob], "image.jpg", { type: "image/jpeg" });
            compressImage(jpegFile);
          }, "image/jpeg", 1);
        };
      };
    };
    
    const compressImage = (file) => {
      new Compressor(file, {
        quality: 0.1,
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onloadend = () => {
            const base64String = reader.result.split(",")[1];
            setImageUser(`data:image/jpeg;base64,${base64String}`);
          };
        },
        error(err) {
          Swal.fire({
            title: "Gagal!",
            icon: "error",
            text: "Ukuran file harus dibawah 5MB!",
            confirmButtonText: "Tutup",
            confirmButtonColor: "#CD3838",
            customClass: {
              title: "title-icon-error",
              text: "text-icon",
              confirmButton: "confirm-icon",
            },
          });
        },
      });
    };
    
    useEffect(() => {
      if (imageUser) {
        setFotoUser(imageUser);
      }
    }, [imageUser]);


    /// VARIABLE UNTUK LARANGAN SUBMIT DENGAN NILAI NULL
    const [garisTitle, setGarisTitle] = useState(false);
    const [garisNama, setGarisNama] = useState(false);
    const [garisDOB, setGarisDOB] = useState(false);
    const [garisProvinsi, setGarisProvinsi] = useState(false);
    const [garisCity, setGarisCity] = useState(false);
    const [garisCityValue, setGarisCityValue] = useState(false);
    const [garisPostalCode, setGarisPostalCode] = useState(false);

    ///FINAL PROSES
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(askVerified == true){
        if(formData.title !== "" && formData.name !== "" && formData.dob !== null && formData.city_id !== "" && formData.city_value !== "" && formData.postal_code !== "" && formData.address !== ""){
          try {
            const updateProfile = new FormData();
              updateProfile.append("title", formData.title);
              updateProfile.append("name", formData.name);
              updateProfile.append("dob", formData.dob);
              updateProfile.append("city_id", formData.city_id);
              updateProfile.append("city_value", formData.city_value);
              updateProfile.append("postal_code", formData.postal_code);
              updateProfile.append("address", formData.address);
              updateProfile.append("photo", imageUser);
              try {
              const response = await axios.post(
                process.env.REACT_APP_URL_API+"/update-profile",
                updateProfile,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${tokenUser}`, // Add the Authorization header with the token
                  },
                }
              );
              if (response.data.status) {
                sessionStorage.setItem("titleUser", formData.title);
                sessionStorage.setItem("namaUser", formData.name);
                if(formData.city_id === 543 || formData.city_id === 544 || formData.city_id === 545 ||formData.city_id === 546 || formData.city_id === 547 || formData.city_id === 548){
                  sessionStorage.setItem("namakota", "Kota Jakarta");
                  sessionStorage.setItem("namakota_profile", formData.city_value);
                  sessionStorage.setItem("idkota", 549);
                  sessionStorage.setItem("idkota_profile", formData.city_id);
                  sessionStorage.setItem("idwilayah", 549);
                  sessionStorage.setItem("namaprovinsi", formData.nama_province);
                  sessionStorage.setItem("namaprovinsi_profile", formData.nama_province);
                  sessionStorage.setItem("idprovinsi", formData.province);
                  sessionStorage.setItem("idprovinsi_profile", formData.province);
                }else{
                  sessionStorage.setItem("namakota", formData.city_value);
                  sessionStorage.setItem("namakota_profile", formData.city_value);
                  sessionStorage.setItem("idkota", formData.city_id);
                  sessionStorage.setItem("idkota_profile", formData.city_id);
                  sessionStorage.setItem("idwilayah", formData.city_id);
                  sessionStorage.setItem("namaprovinsi", formData.nama_province);
                  sessionStorage.setItem("namaprovinsi_profile", formData.nama_province);
                  sessionStorage.setItem("idprovinsi", formData.province);
                  sessionStorage.setItem("idprovinsi_profile", formData.province);
                }
                
                Swal.fire({
                  iconHtml:
                    '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
                  title: "Berhasil!",
                  text: "Berhasil memperbarui data",
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
                    window.location.href = "/Profile";
                  }
                });
              }
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
          } catch (error) {
          }
          if (formData.nameError) {
            Swal.fire({
              title: "Perhatian!",
              text: formData.nameError,
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
          if (name.trim() === "") {
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
          }
        }else if(formData.title === "" ||formData.name === "" ||formData.dob === null ||formData.city_id === "" ||formData.city_value === "" ||formData.postal_code === "" || formData.address === ""){
          if (formData.name === ""){
            setGarisNama(true)
          }
          if (formData.province === ""){
            setGarisProvinsi(true)
          }
          if (formData.title == null){
            setGarisTitle(true)
          }
          if (formData.postal_code === null || formData.address === null || formData.postal_code === "" || formData.address === ""){
            setGarisPostalCode(true)
          }
          if (formData.dob === null){
            setGarisDOB(true)
          }
          if (formData.city_id === "" || formData.city_value === ""){
            setGarisCity(true)
            setGarisPostalCode(true)
          }

          Swal.fire({
            title: "Perhatian!",
            text: "Silakan lengkapi data terlebih dahulu",
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
        
      }else if(askVerified == false){
        Swal.fire({
          title: "Gagal!",
          icon: "error",
          text: "Email belum terverifikasi!",
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
    useEffect(()=>{
      if (formData.name === "" && formData.kondisiAwal == false){
        setGarisNama(true)
      }else{
        setGarisNama(false)
      }
    },[formData.name,formData.kondisiAwal])

    useEffect(()=>{
      if (formData.province === "" && formData.kondisiAwal == false){
        setGarisProvinsi(true)
      }else{
        setGarisProvinsi(false)
      }
    },[formData.province,formData.kondisiAwal])
    
    useEffect(()=>{
      if (formData.title === null && formData.kondisiAwal == false){
        setGarisTitle(true)
      }else{
        setGarisTitle(false)
      }
    },[formData.title,formData.kondisiAwal])
    
    useEffect(()=>{
      if (formData.dob === null && formData.kondisiAwal == false){
        setGarisDOB(true)
      }else{
        setGarisDOB(false)
      }
    },[formData.dob,formData.kondisiAwal])
    useEffect(()=>{
      if ((formData.city_id === "" || formData.city_value === "") && (formData.kondisiAwal == false)){
        setGarisCity(true)
        setGarisPostalCode(true)
      }else{
        setGarisCity(false)
      }
    },[formData.city_id,formData.city_value,formData.kondisiAwal])

    useEffect(()=>{
      if ((formData.postal_code === null || formData.address === null || formData.postal_code === "" || formData.address === "") && (formData.kondisiAwal == false)){
        setGarisPostalCode(true)
      }else{
        setGarisPostalCode(false)
      }
    },[formData.postal_code,formData.address,formData.kondisiAwal])

    const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

    const locale = {
      localize: {
        day: n => days[n],
        month: n => months[n]
      },
      formatLong: {
        date: () => 'mm/dd/yyyy'
      }
    }
    return (
      <div className="w-full h-auto flex items-start justify-center mb-[75px]">
        <div className="flex w-full justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-[450px] rounded px-8 pt-6 pb-8"
        >
        <h1 className="text-center flex justify-center items-center text-secondary text-[30px] md:text-[34px] font-bold mt-[125px]">
            Ubah Data Diri
        </h1>
        {/* UPLOAD IMAGE */}
        <div className="relative mb-4 w-[100px] h-[100px] mx-auto">
          <div onClick={handleImageClick} style={{ width: "100%", height: "100%" }}>
            {fotoUser ? (
              <img
                src={fotoUser}
                alt="Profile"
                className="mt-[20px] mx-auto hover:cursor-pointer rounded-lg"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
              />
            ) : (
              <img
                src={ProfileImage}
                alt="Profile"
                className="mt-[20px] mx-auto hover:cursor-pointer rounded-lg"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
              />
            )}
          </div>
          <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handleImageChange} />
          <div className="absolute bg-white w-[30px] h-[30px] rounded-full hover:cursor-pointer translate-y-[89px]" style={{ top: "0", right: "0" }} onClick={handleImageClick}>
            <img src={editicon} alt="Edit" className="py-[5px] px-[6px]" />
          </div>
        </div>
        <p className="text-center mt-[10px] text-secondary text-[14px] opacity-80">Maksimal 5Mb</p>
        {/* EMAIL */}
          <div className="mb-4">
            <label
              className="block text-secondary text-sm font-medium mb-[4px] text-[14px]"
              // htmlFor="email"
            >
              Email
            </label>
            <input
              className="infield focus:outline-none focus:shadow-outline font-regular placeholder-secondary cursor-not-allowed"
              placeholder={sessionStorage.getItem("emailUser")}
              style={{ fontStyle: 'italic'}}
              disabled
            />
          </div>
          {/* NAMA DAN TITLE */}
          <div className="flex mb-[10px]">
            <div>
              <label
                className={`block text-sm font-medium mb-[4px] text-[14px] ${garisTitle ? "text-red-600" :"text-secondary"}`}
                htmlFor="title"
              >
                {garisTitle ? "Title*" :"Title"}
              </label>
              <div>
                <div
                  className={`w-full infield leading-tight focus:outline-none focus:shadow-outline font-regular whitespace-nowrap cursor-pointer flex justify-between ${garisTitle ? "border-red-600" :""}`}
                  onClick={toggleDropdownTitle}
                >
                  {title ? titlenyaUser.find((p) => p === title) : "Pilih"}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    color="#24445A"
                    className={`ml-[20px] w-[10px] h-[20px] ${
                      isOpenTitle && "rotate-180"
                    }`}
                  />
                </div>
                {isOpenTitle && (
                  <div className="flex flex-col w-full bg-white border border-gray-300 rounded-md shadow-lg mt-[10px] text-secondary">
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
            <div className="w-full ml-[20px]">
              <label className={`block text-sm font-medium mb-[4px] text-[14px] ${garisNama ? "text-red-600" : "text-secondary"} `}>
                {garisNama ? "Nama Lengkap*" : "Nama Lengkap"}
              </label>
              <input
                className={`w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[14px] items-center leading-tight focus:outline-none focus:shadow-outline font-regular whitespace-nowrap flex justify-between ${garisNama ? "border-red-600" : ""}`}
                id="name"
                type="text"
                placeholder="Nama Lengkap"
                value={formData.name}
                name="name"
                onChange={handleNameChange}
              />
              {formData.nameError && <p className="text-red-600 text-[12px]">{formData.nameError}</p>}
            </div>
{/* 
            <div className="w-full ml-[20px]">
              <label className={`block text-sm font-medium mb-[4px] text-[14px] ${garisNama ? "text-red-600" :"text-secondary"}`}>
                {garisNama ? "Nama Lengkap*" :"Nama Lengkap"}
              </label>
              <input
                className={`w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[14px] items-center leading-tight focus:outline-none focus:shadow-outline font-regular whitespace-nowrap flex justify-between ${garisNama ? "border-red-600" :""}`}
                id="name"
                type="text"
                placeholder="Nama Lengkap"
                value={formData.name}
                name="name"
                onChange={(e) => setFormData((prevState) => ({ ...prevState, name: e.target.value }))}
              />
            </div> */}
          </div>
            {/* BIRTH */}
            <div className="mb-[10px]">
              <label
                className={`block text-sm font-medium mb-[4px] text-[14px] ${garisDOB ? "text-red-600" :"text-secondary"}`}
                htmlFor="birthDate"
              >
                {garisDOB ? "Tanggal Lahir*" :"Tanggal Lahir"}
              </label>
              <div className={`w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[14px] items-center font-regular flex justify-between ${garisDOB ? "border-red-600" :""}`}>
                <DatePicker
                  id="dob"
                  selected={dob ? new Date(dob) : null}
                  value={formData.dob}
                  locale={locale}
                  onChange={handleDateChange}
                  placeholderText={birthUser} // Placeholder
                  yearDropdownItemNumber={100}
                  showYearDropdown
                  showMonthDropdown
                  scrollableYearDropdown
                  minDate={hundredYearsAgo}
                  maxDate={new Date(2018,11,30)}
                  className="w-[300px] outline-none placeholder:text-secondary flex"
                />
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="text-gray-400 w-[20px] flex"
                />
              </div>
            </div>
            {/* DROPDOWN PROVINSI */}
            <div className="mb-[10px]">
              <label
                className={`block text-sm font-medium mb-[4px] text-[14px] ${garisProvinsi ? "text-red-600" :"text-secondary"}`}
                htmlFor="province"
              >
                {garisProvinsi ? "Provinsi*" :"Provinsi"}
              </label>
              <div>
                <div
                id="storagenya"
                  className={`w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[14px] items-center leading-tight focus:outline-none focus:shadow-outline font-regular whitespace-nowrap cursor-pointer flex justify-between ${garisProvinsi ? "border-red-600" :""}`}
                  onClick={() => {
                    toggleDropdown();
                    // document.getElementById("searchbar").classList.remove("hidden");
                    // document.getElementById("storagenya").classList.add("hidden");
                  }}
                >
                  {province ? provinces.find((p) => p.id === province)?.nama : "Pilih Provinsi"}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    color="#24445A"
                    className={`ml-[20px] w-[10px] h-[20px] ${
                      isOpen && "rotate-180"
                    }`}
                  />
                </div>
                {/* <div id="searchbar" className="hidden">
                  <div className={`w-full h-[40px] border rounded-[8px] text-secondary text-[14px] items-center leading-tight font-regular whitespace-nowrap cursor-pointer flex justify-between px-[10px] gap-[10px] ${garisProvinsi ? "border-red-600" : ""}`}>
                    <FontAwesomeIcon
                      icon={faSearch}
                      color="#24445A"
                      className="w-[15px] h-[15px]"
                    />
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Cari Provinsi"
                      className="text-secondary outline-none w-full text-[14px] font-regular"
                      onFocus={(e) => {
                        setFormData((prevState) => ({ ...prevState, isOpen: true }));
                        document.getElementById("storagenya").classList.add("hidden");
                      }}
                      onBlur={(e) => {
                        setFormData((prevState) => ({ ...prevState, isOpen: false }));
                        document.getElementById("storagenya").classList.remove("hidden");
                        document.getElementById("searchbar").classList.add("hidden");
                      }}
                      // onBlur={toggleDropdown}
                    />
                  </div>
                </div> */}
                {isOpen && (
                //   <div className="flex flex-col w-full bg-white border border-gray-300 rounded-md mt-[10px]">
                //     <ul className="max-h-40 overflow-y-auto">
                //       {filterProvinces().map((province) => (
                //         <li
                //           key={province.id}
                //           className="cursor-pointer select-none p-2 text-[12px] hover:bg-third hover:text-white rounded-[5px]"
                //           onMouseDown={() => {
                //             handleChangeProvince(province);
                //             toggleDropdown();
                //             document.getElementById("searchbar").classList.add("hidden");
                //             document.getElementById("storagenya").classList.remove("hidden");
                //           }}
                //         >
                //           {province.nama}
                //         </li>
                //       ))}
                //     </ul>
                // </div>
                  <div className="flex flex-col w-full bg-white border border-gray-300 rounded-md shadow-lg mt-[10px]">
                    <div className="flex items-center px-2 bg-[#ebebeb] w-full">
                      <FontAwesomeIcon
                        icon={faSearch}
                        color="#24445A"
                        style={{ opacity: "40%" }}
                        className="w-[10px] h-[20px] opacity-75"
                      />
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

            {/* DROPDOWN KOTA */}
            <div className="mb-[10px]">
            <label
              className={`block text-sm font-medium mb-[4px] text-[14px] ${garisCity ? "text-red-600" :"text-secondary"}`}
              htmlFor="district"
            >
              {garisCity ? "Kabupaten/Kota*" :"Kabupaten/Kota"}
            </label>
            <div>
              <div
                className={`w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[14px] items-center leading-tight focus:outline-none focus:shadow-outline font-regular whitespace-nowrap cursor-pointer flex justify-between ${garisCity ? "border-red-600" :""}`}
                onClick={toggleDropdown2}
              >
                {city_value ? city_value : "Pilih Kabupaten/Kota"}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color="#24445A"
                  className={`ml-[20px] w-[10px] h-[20px] ${
                    isOpen2 && "rotate-180"
                  }`}
                />
              </div>
              {isOpen2 && (
              <div className="flex flex-col w-full bg-white border border-gray-300 rounded-md shadow-lg mt-[10px]">
                <div className="flex items-center px-2 bg-[#ebebeb] w-full">
                  <FontAwesomeIcon
                    icon={faSearch}
                    color="#24445A"
                    style={{ opacity: "40%" }}
                    className="w-[10px] h-[20px] opacity-75"
                  />
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
                    .filter((city) =>
                      city.nama.toLowerCase().includes(inputValueCity.toLowerCase())
                    )
                    .map((city) => (
                      <li
                        key={city.id}
                        className="cursor-pointer select-none p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]"
                        onClick={() => {
                          handleChangeCities({ target: { value: JSON.stringify({ city_id: city.id, nama: city.nama }) } });
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
            {/* DROPDOWN KODEPOS */}
            <div className="mb-[10px]">
              <label
                className={`block text-sm font-medium mb-[4px] text-[14px] ${garisPostalCode ? "text-red-600" :"text-secondary"}`}
                htmlFor="postalCode"
              >
                {garisPostalCode ? "Kode Pos*" :"Kode Pos"}
              </label>
              <div>
                <div
                  className={`w-full h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[14px] items-center leading-tight focus:outline-none focus:shadow-outline font-regular whitespace-nowrap cursor-pointer flex justify-between ${garisPostalCode ? "border-red-600" :""}`}
                  onClick={()=>{
                    if(formData.city_id !== "" || formData.city_value !== ""){
                      toggleDropdown3()
                    }else{
                      handlePopupKodePos()
                    }
                  }}
                >
                  {postal_code && address ? `${postal_code} - ${address ? address.length > 28 ? address?.substring(0, 28) + "..." : address : address}` : "Pilih Kode Pos"}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    color="#24445A"
                    className={`ml-[20px] w-[10px] h-[20px] ${
                      isOpen3 && "rotate-180"
                    }`}
                  />
                </div>
                {isOpen3 && (
                  <div className="flex flex-col w-full bg-white border border-gray-300 rounded-md shadow-lg mt-[10px]">
                    <div className="flex items-center px-2 bg-[#ebebeb] w-full">
                      <FontAwesomeIcon
                        icon={faSearch}
                        color="#24445A"
                        style={{ opacity: "40%" }}
                        className="w-[10px] h-[20px] opacity-75"
                      />
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
                      .filter((postal) =>
                        postal.kodepos.toString().toLowerCase().includes(inputValuePostal.toLowerCase()) ||
                        postal.location_name.toLowerCase().includes(inputValuePostal.toLowerCase())
                      )
                      .map((postal, index) => (
                        <li
                          key={index} // Use index as the key
                          className="cursor-pointer select-none p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]"
                          onClick={() => {
                            handleChangePostalCode({ target: { value: JSON.stringify({ location: postal.location_name, kodepos: postal.kodepos, }) } });
                            toggleDropdown3();
                          }}
                        >
                          {postal.kodepos} - {postal.location_name}
                        </li>
                      ))}

                    {postalCodes.filter((postal) =>
                      postal.kodepos.toString().toLowerCase().includes(inputValuePostal.toLowerCase()) ||
                      postal.location_name.toLowerCase().includes(inputValuePostal.toLowerCase())
                    ).length === 0 && inputValuePostal.length > 0 && (
                      <li className="p-2 text-[12px]">Tidak ditemukan kecocokan</li>
                    )}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          <div className="flex items-center justify-center">
            <button
              className="button rounded-[8px] h-[40px] w-full py-2 px-3"
              type="submit"
            >
              Simpan
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="button rounded-[8px] h-[40px] w-full py-2 px-3 mt-[10px] bg-[#CD3838] hover:bg-[#E54747] "
              type="submit"
              onClick={goBack}
            >
              Batalkan
            </button>
          </div>
        </form>
        </div>
      </div>
    );
  };
export default EditProfile