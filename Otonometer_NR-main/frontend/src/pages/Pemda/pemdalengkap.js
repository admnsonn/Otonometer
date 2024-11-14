import React, { useState, useEffect, useRef } from "react";
import people from "../../assets/icons/people.png";
import LandingPage from "../../assets/landingpageJelajah.svg";
import "../../style/Switchbtn.css";
import "../../style/Components.css";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import Circleimage from "../../components/Circleimage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bulat from "../../assets/circ.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faArrowRight, faCaretDown, faChevronDown, faSearch, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import map from "../../assets/icons/peta.png";
import iconuser from "../../assets/fotopejabat.jpg";
import fotodprd from "../../assets/fotoketuad.jpg";
import fotowalikota from "../../assets/walikota.svg";
import komisi from "../../assets/komisi.png";
import badan from "../../assets/badan.png";
import fraksi from "../../assets/fraksi.png";
import kelengkapan from "../../assets/kelengkapan.png";

const PemdaLengkap = () => {
  const [activeTab, setActiveTab] = useState("pemda");

  const toggleTab = () => {
    setActiveTab(activeTab === "pemda" ? "dprd" : "pemda");
  };

  const [activeDprd, setActiveDprd] = useState("dprdd");

  const toggleDprd = () => {
    setActiveDprd(activeDprd === "dprdd" ? "sekretariatdprd" : "dprdd");
  };

  const [selectedOption, setSelectedOption] = useState("Plih");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showDropdownButton, setShowDropdownButton] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const [selectedKota, setSelectedKota] = useState("Kota");
  const [dropdownKota, setDropdownKota] = useState(false);

  const [selectedTahun, setSelectedTahun] = useState("Tahun");
  const [dropdownTahun, setDropdownTahun] = useState(false);

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownKota = () => {
    setDropdownKota(!dropdownKota);
  };

  const handleDropdownTahun = () => {
    setDropdownTahun(!dropdownTahun);
  };
  const handlePilihClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
    setOpenDropdown(false);
  };

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setIsPilihVisible(!isPilihVisible);
  };
  const options = ["Paud", "SD", "SMP"];

  const [isPilihVisible, setIsPilihVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOptionD, setSelectedOptionD] = useState(null);

  const details = {
    Paud: {
      title: "Panggilan Pusat",
      department: "Paud",
      address: "Jalan Kapten Tendean No 1",
      contact: "Kontak : 08XXXXXXXX",
    },
    SD: {
      title: "Panggilan Pusat",
      department: "Sekolah Dasar",
      address: "Jalan Kapten Tendean No 1",
      contact: "Kontak : 08XXXXXXXX",
    },
    SMP: {
      title: "Panggilan Pusat",
      department: "Sekolah Menengah",
      address: "Jalan Kapten Tendean No 1",
      contact: "Kontak : 08XXXXXXXX",
    },
  };

  const selectedDetail = details[selectedOptionD];

  const handleOptionClickD = (option) => {
    setSelectedOptionD(option);
    setIsDropdownVisible(false);
  };

  const handleOptionKota = (option) => {
    setSelectedKota(option);
    setDropdownKota(false);
  };

  const handleOptionTahun = (option) => {
    setSelectedTahun(option);
    setDropdownTahun(false);
  };

  const renderDropdownOptions = () => {
    const options = ["Jawa Barat", "Jawa Tengah", "Jawa Timur"];

    return options.map((option, index) => (
      <div key={index} onClick={() => handleOptionClick(option)} className="flex  w-[167px] h-[41px] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg cursor-pointer">
        <p>{option}</p>
      </div>
    ));
  };

  const SwitchBtn = ({ selected, onSelect }) => (
    <div className="switch" onClick={onSelect}>
      <input type="checkbox" id="toggle" checked={selected === "dprd" || selected === "sekretariatdprd"} />
      <label htmlFor="toggle" className="slider"></label>
    </div>
  );

  const renderDropdownKota = () => {
    const options = ["Kota Bandung", "Kota Cirebon", "Kota Bekasi"];

    return options.map((option, index) => (
      <div key={index} onClick={() => handleOptionKota(option)} className="flex w-[167px] h-[41px] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg cursor-pointer">
        <p>{option}</p>
      </div>
    ));
  };

  const renderDropdownTahun = () => {
    const options = ["2022", "2021", "2020"];

    return options.map((option, index) => (
      <div key={index} onClick={() => handleOptionTahun(option)} className="flex w-[167px] h-[41px] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg cursor-pointer">
        <p>{option}</p>
      </div>
    ));
  };

  const Carousel = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  };

  ///FETCHING DROPDOWN PROVINSI
  const [provincess, setProvinces] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(sessionStorage.getItem("namaprovinsi"));
  const [openProvinsi, setOpenProvinsi] = useState(false);
  const [wilayahID, setWilayahID] = useState(null);
  const [getInfoProvinsi, setGetInfoProvinsi] = useState(null);
  const [is_province, askIsProvince] = useState();
  var wilayah = "";
  var provinsi = "";

  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API + "/provinces")
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data.data);
        console.log(provincess);
      });
  }, []);

  ///FETCHING DROPDOWN KOTA
  const [cities, setCity] = useState(null);
  const [inputValueofCity, setInputValueofCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(sessionStorage.getItem("namakota"));
  const [openCity, setOpenCity] = useState(false);

  ///UPDATE DATA KOTA BERDASARKAN DATA PROVINSI
  function updateKota(item, choosed, id) {
    if (item.toLowerCase() !== choosed.toLowerCase()) {
      setSelected(item);
      setOpenProvinsi(false);
      setInputValue("");
      fetch(process.env.REACT_APP_URL_API + "/cities?province_id=" + id)
        .then((response) => response.json())
        .then((data) => {
          setCity(data.data);
        });
    }
  }
  useEffect(() => {
    if (sessionStorage.getItem("idprovinsi") !== null) {
      fetch(process.env.REACT_APP_URL_API + "/cities?province_id=" + sessionStorage.getItem("idprovinsi"))
        .then((response) => response.json())
        .then((data) => {
          setCity(data.data);
        });
    }
  }, [sessionStorage.getItem("idprovinsi")]);

  ///FETCHING DROPDOWN TAHUN
  const [years, setYears] = useState([]);
  const [inputValueofYears, setInputValueofYears] = useState("");
  const [selectedYears, setSelectedYears] = useState("");
  const [openYears, setOpenYears] = useState(false);
  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API + "/year")
      .then((response) => response.json())
      .then((data) => {
        setYears(data.data);
      });
  }, []);
  useEffect(() => {
    const selectedYear = sessionStorage.getItem("yearss");
    if (selectedYear) {
      setSelectedYears(selectedYear);
    }
  }, []);

  ///UPDATE PETANYA DORA THE EXPLORER
  const [peta, setPeta] = useState(null);
  const [koordinatLokasi, setKoordinatLokasi] = useState(null);
  const [infoDaerah, setInfoDaerah] = useState(null);
  const [pinMap, setPinMap] = useState(null);
  const [dataranicon, setDataranicon] = useState(null);
  const [sektoricon, setSektoricon] = useState(null);
  const [datarannama, setDatarannama] = useState(null);
  const [sektornama, setSektornama] = useState(null);
  const [nilaisektor, setNilaisektor] = useState(null);
  const [luaswilayah, setLuaswilayah] = useState(null);
  const [jumlahpenduduk, setJumlahpenduduk] = useState(null);
  const [namawilayah, setNamawilayah] = useState(null);
  const [ketinggian, setKetinggian] = useState(null);

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  useEffect(() => {
    if (sessionStorage.getItem("idprovinsi") === null && sessionStorage.getItem("namaprovinsi") === null) {
      return (window.location.href = "/Jelajah-main");
    }
  }, [sessionStorage.getItem("idprovinsi"), sessionStorage.getItem("namaprovinsi") === null]);
  function updatePeta(wilayah_id) {
    fetch(process.env.REACT_APP_URL_API + "/wilayah-info?lang=id&wilayah_id=" + wilayah_id + "&tahun=" + sessionStorage.getItem("yearss"), requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPeta(result.data.peta);
        if (sessionStorage.getItem("namawilayah") === "Semua") {
          setDataranicon("https://storage.googleapis.com/otonometer-bucket/infografis/664c63abef1c7.tidak_identifikasi_LIGHT.png");
        } else {
          setDataranicon(result.data.dataran_icon);
        }
        setSektoricon(result.data.wilayah_info.sektor_icon);
        setKoordinatLokasi(result.data.longitude + ", " + result.data.latitude);
        setInfoDaerah(result.data.nama);
        setDatarannama(result.data.dataran_nama);
        setKetinggian(result.data.wilayah_info.ketinggian);
        setSektornama(result.data.wilayah_info.sektor_nama);
        setLuaswilayah(result.data.wilayah_info.luas_wilayah);
        setJumlahpenduduk(result.data.wilayah_info.jumlah_penduduk);
        setNilaisektor(result.data.wilayah_info.nilai_sektor);

        setPinMap(map);
        setNamawilayah(result.data.nama);
        console.log(result.data.peta);
        console.log(result.data.dataran_icon);
      });
  }

  useEffect(() => {
    if (sessionStorage.getItem("idkota") !== null) {
      updatePeta(sessionStorage.getItem("idkota"));
    }
  }, []);

  ///UPDATE PEJABAT
  const [namaketua, setNamaketua] = useState(null);
  const [namawakil, setNamawakil] = useState(null);
  const [tlketua, setTlketua] = useState(null);
  const [taketua, setTaketua] = useState(null);
  const [fotoketua, setFotoketua] = useState(null);
  const [jabatanketua, setJabatanketua] = useState(null);
  const [tlwakilketua, setTlwakilketua] = useState(null);
  const [tawakilketua, setTawakilketua] = useState(null);
  const [fotowakilketua, setFotowakilketua] = useState(null);
  const [jabatanwakilketua, setJabatanwakilketua] = useState(null);
  const [kondisiBelumAda, setKondisiBelumAda] = useState(null);

  function updatePejabat(wilayah_id, tahun) {
    fetch(process.env.REACT_APP_URL_API + "/pemda?wilayah_id=" + wilayah_id + "&tahun=" + tahun)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          if (result.data.ketua.length > 0 && result.data.wakil.length > 0) {
            setNamaketua(result.data.ketua[0].nama_lengkap);
            setTlketua(result.data.ketua[0].tahun_lantik);
            setTaketua(result.data.ketua[0].tahun_akhir);
            setFotoketua(result.data.ketua[0].foto == "https://storage.googleapis.com/otonometer-bucket/" ? iconuser : result.data.ketua[0].foto);
            setJabatanketua(result.data.ketua[0].jabatan_nama);
            setNamawakil(result.data.wakil[0].nama_lengkap);
            setTlwakilketua(result.data.wakil[0].tahun_lantik);
            setTawakilketua(result.data.wakil[0].tahun_akhir);
            setFotowakilketua(result.data.wakil[0].foto == "https://storage.googleapis.com/otonometer-bucket/" ? iconuser : result.data.wakil[0].foto);
            setJabatanwakilketua(result.data.wakil[0].jabatan_nama);
          } else if (result.data.ketua.length > 0 && result.data.wakil.length === 0) {
            setNamaketua(result.data.ketua[0].nama_lengkap);
            setTlketua(result.data.ketua[0].tahun_lantik);
            setTaketua(result.data.ketua[0].tahun_akhir);
            setFotoketua(result.data.ketua[0].foto == "https://storage.googleapis.com/otonometer-bucket/" ? iconuser : result.data.ketua[0].foto);
            setJabatanketua(result.data.ketua[0].jabatan_nama);
            setJabatanwakilketua("Wakil " + result.data.ketua[0].jabatan_nama);
            setFotowakilketua(iconuser);
            setNamawakil(null);
            setTlwakilketua(null);
            setTawakilketua(null);
          }
        } else if (result.success === false) {
          setNamaketua("Data tidak tersedia");
          setTlketua(null);
          setTaketua(null);
          setFotoketua(null);
          setJabatanketua(null);
          setJabatanwakilketua(null);
          setFotowakilketua(null);
          setNamawakil("Data tidak tersedia");
          setTlwakilketua(null);
          setTawakilketua(null);
        }
      });
  }

  useEffect(() => {
    if (sessionStorage.getItem("idkota") !== null) {
      wilayah = sessionStorage.getItem("idkota");
      updatePejabat(sessionStorage.getItem("idkota"), sessionStorage.getItem("yearss"));
      setWilayahID(sessionStorage.getItem("idkota"));
      if (sessionStorage.getItem("idprovinsi") !== null) {
        provinsi = sessionStorage.getItem("idprovinsi");
        setGetInfoProvinsi(sessionStorage.getItem("idprovinsi"));
        console.log("idprovinsi = " + getInfoProvinsi);
        console.log("idprovinsisession = " + sessionStorage.getItem("idprovinsi"));
        console.log("provinsi = " + provinsi);
        sessionStorage.setItem("Jelajahprofil_provinsi", sessionStorage.getItem("idprovinsi"));
      }
    }
  }, [namaketua, namawakil, tlketua, taketua, fotoketua, jabatanketua, tlwakilketua, tawakilketua, fotowakilketua, jabatanwakilketua]);

  ///UPDATE DPRD

  const [ketuadprd, setKetuadprd] = useState(null);
  const [wakildprd, setWakildprd] = useState(null);
  const [tlketuadprd, setTlketuadprd] = useState(null);
  const [taketuadprd, setTaketuadprd] = useState(null);
  const [fotoketuadprd, setFotoketuadprd] = useState(null);
  const [jabatanketuadprd, setJabatanketuadprd] = useState(null);
  const [fotopartaiketuadprd, setFotopartaiketuadprd] = useState(null);
  const [tlwakilketuadprd, setTlwakilketuadprd] = useState(null);
  const [tawakilketuadprd, setTawakilketuadprd] = useState(null);
  const [fotowakilketuadprd, setFotowakilketuadprd] = useState(null);
  const [jabatanwakilketuadprd, setJabatanwakilketuadprd] = useState(null);
  const [fotopartaiwakilketuadprd, setFotopartaiwakilketuadprd] = useState(null);

  function updateDPRD(wilayah_id, tahun) {
    fetch(process.env.REACT_APP_URL_API + "/dewan?wilayah_id=" + wilayah_id + "&tahun=" + tahun)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          if (result.data !== null && result.data.ketua && result.data.ketua.length > 0) {
            setKetuadprd(result.data.ketua[0].nama_lengkap);
            setTlketuadprd(result.data.ketua[0].tahun_lantik);
            setTaketuadprd(result.data.ketua[0].tahun_akhir);
            setFotoketuadprd(result.data.ketua[0].foto == "https://storage.googleapis.com/otonometer-bucket/" ? iconuser : result.data.ketua[0].foto);
            setJabatanketuadprd(result.data.ketua[0].jabatan_nama);
            setFotopartaiketuadprd(result.data.ketua[0].partai_foto);
          }
          if (result.data !== null && result.data.wakil && result.data.wakil.length > 0) {
            setWakildprd(result.data.wakil[0].nama_lengkap);
            setTlwakilketuadprd(result.data.wakil[0].tahun_lantik);
            setTawakilketuadprd(result.data.wakil[0].tahun_akhir);
            setFotowakilketuadprd(result.data.wakil[0].foto);
            setJabatanwakilketuadprd(result.data.wakil[0].jabatan_nama);
            setFotopartaiwakilketuadprd(result.data.wakil[0].partai_foto);
          }
        } else if (result.success === false) {
          setKetuadprd("Data Tidak Tersedia");
          setTlketuadprd(null);
          setTaketuadprd(null);
          setFotoketuadprd(null);
          setJabatanketuadprd(null);
          setFotopartaiketuadprd(null);
          setWakildprd(null);
          setTlwakilketuadprd(null);
          setTawakilketuadprd(null);
          setFotowakilketuadprd(null);
          setJabatanwakilketuadprd(null);
          setFotopartaiwakilketuadprd(null);
        }
      });
  }

  useEffect(() => {
    if (sessionStorage.getItem("idkota") !== null) {
      updateDPRD(sessionStorage.getItem("idkota"), sessionStorage.getItem("yearss"));
      setWilayahID(sessionStorage.getItem("idkota"));
    }
  }, [
    ketuadprd,
    wakildprd,
    tlketuadprd,
    taketuadprd,
    fotoketuadprd,
    jabatanketuadprd,
    fotopartaiketuadprd,
    tlwakilketuadprd,
    tawakilketuadprd,
    fotowakilketuadprd,
    jabatanwakilketuadprd,
    fotopartaiwakilketuadprd,
    sessionStorage.getItem("idkota"),
    sessionStorage.getItem("yearss"),
    sessionStorage.getItem("idprovinsi"),
  ]);
  if (jumlahpenduduk != null) {
    var convertStringtoInt = jumlahpenduduk.replaceAll(".", "");
    var data_Penduduk = parseInt(convertStringtoInt) / 1000;
  }

  // OPSI PEMERINTAH
  const [selectedButton, setSelectedButton] = useState(null);
  useEffect(() => {
    if (sessionStorage.getItem("namakota") === "Semua") {
      askIsProvince(true);
      setSelectedButton(null);
      setOpsiAktif(null);
    } else {
      askIsProvince(false);
      setSelectedButton("DPRD");
      setOpsiAktif("DPRD");
    }
  }, [is_province]);

  const [opsiPemerintah, setOpsiPemerintah] = useState(["DPRD", "DPR", "DPD"]);
  const [opsiAktif, setOpsiAktif] = useState(null);

  // SETTING CARD
  const [openCard, setOpenCard] = useState(false);
  const [openCard2, setOpenCard2] = useState(false);

  return (
    <div className="flex flex-col mb-[150px] justify-center items-center mt-[125px]">
      <img src={geometry} alt="" className="md:hidden lg:block hidden fixed w-full top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10 opacity-10 object-cover" />
      <img src={geometrys} alt="" className="hidden md:block lg:hidden fixed w-full top-[40%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover" />
      <img src={geometryss} alt="" className="block md:hidden lg:hidden fixed w-full top-[5%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover" />
      <h1 className="text-center flex justify-center items-center text-secondary text-[24px] md:text-[34px] font-bold mt-[24px]">Info Daerah</h1>
      {/* DROPDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-x-[40px] gap-y-[10px] mt-[20px]">
        {/* FETCHING TAHUN */}
        <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
          <div
            onClick={() => {
              setOpenYears(!openYears);
              if (openProvinsi) {
                setOpenProvinsi(!openProvinsi);
              }
              if (openCity) {
                setOpenCity(!openCity);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedYears ? (selectedYears?.length > 12 ? selectedYears?.substring(0, 12) + "..." : selectedYears) : "Tahun"}
            <FontAwesomeIcon icon={faChevronDown} color="#24445A" className={`ml-[120px] w-[10px] h-[20px] ${openYears && "rotate-180"}`} />
          </div>
          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-auto 
              ${openYears ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {years?.map((tahunn) => (
              <li
                key={tahunn?.tahun}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                ${tahunn?.tahun?.toLowerCase() === selectedYears?.toLowerCase() && "bg-secondary text-white"}

                ${tahunn?.tahun?.toLowerCase().includes(inputValueofYears) ? "block" : "hidden"}`}
                onClick={() => {
                  if (tahunn?.tahun?.toLowerCase() !== selectedYears.toLowerCase()) {
                    setSelectedYears(tahunn?.tahun);
                    setOpenYears(false);
                    setInputValueofYears("");
                    updatePeta(wilayahID);
                    updatePejabat(wilayahID, tahunn.tahun);
                    updateDPRD(wilayahID, tahunn.tahun);
                    sessionStorage.setItem("yearss", tahunn?.tahun);
                  }
                }}
              >
                {tahunn?.tahun}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h1 className="text-center flex justify-center items-center text-secondary text-[20px] md:text-[34px] lg:text-[30px] xl:text-[30px] font-bold mt-[24px]">PEMERINTAH KOTA BANDUNG</h1>

      <h1 className="text-center flex justify-center items-center text-secondary text-[20px] md:text-[34px] lg:text-[30px] xl:text-[30px] font-bold italic mt-[40px]">PEJABAT</h1>

      {/* DATA */}
      <div className="flex max-w-[1189px] h-auto p-[29px] gap-x-[60px] overflow-scroll mt-[30px]">
        {/* Card Pejabat 1 */}
        <div className={`flex items-center rounded-[50px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-auto ${openCard ? "animate-expand" : "animate-collapse"}`}>
          <div className="flex flex-col items-center w-[347px] h-[302px] rounded-[50px] bg-white py-[20px] px-[34px] relative">
            <div
              className="w-full flex justify-end cursor-pointer"
              onClick={() => {
                if (openCard) {
                  setOpenCard(false);
                } else {
                  setDropdownOpen(!dropdownOpen);
                }
              }}
            >
              <FontAwesomeIcon icon={openCard ? faArrowRight : faEllipsisV} color="#24445A" className={`transition duration-200 ease-in ${openCard ? "w-[21px] h-auto rotate-180" : "w-[5px] h-auto"}`} />
            </div>
            {dropdownOpen && (
              <div ref={dropdownRef} className="absolute top-[40px] right-[-55px] w-[100px] bg-white border border-gray-200 rounded-md shadow-lg">
                <div
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setOpenCard(true);
                    // Handle edit action here
                    console.log("Edit clicked");
                    setDropdownOpen(false);
                  }}
                >
                  Detail
                </div>
                <div
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    // Handle delete action here
                    window.location.href = "/PemdaLiniMasa";
                    setDropdownOpen(false);
                  }}
                >
                  Lini Masa
                </div>
              </div>
            )}
            <div className="w-full flex justify-center">
              <div className="relative w-[146px] h-[146px] bg-white rounded-full border-[5px] border-solid border-secondary">
                <img src={fotowalikota} alt="" className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-[128px] h-[128px] bg-secondary rounded-full border-[4px] border-solid border-secondary" />
              </div>
            </div>
            <p className="w-full text-secondary text-[16px] text-center break-words font-bold mt-[11px]">Bambang Tirtoyuliono</p>
            <p className="w-full text-secondary text-[12px] text-center break-words font-regular">Walikota</p>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Masa Periode : 2019 - 2024
            </a>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Kontak : 08XXXXXXXX
            </a>
          </div>

          <div className={`${openCard ? "block animate-fadeIn" : "hidden"} transition duration-200 ease-in w-[347px] h-[382px] rounded-[50px] bg-white py-[20px] pr-[34px]`}>
            <div className="w-full h-full bg-[#EFEFEF] rounded-[15px] text-secondary text-[12px] p-[18px] overflow-auto mini-scrollbar">
              <p>Alamat Kantor : HVRW+M8W, Simbula, Kec. Katoi, Kabupaten Kolaka Utara, Sulawesi Tenggara 93957 Adasdasdsda asdasdasd jkkk asd asdasdasd</p>
              <p className="mt-[10px]">Jabatan Lain : Anggota DPRnya mi</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
            </div>
          </div>
        </div>
        {/* Card Pejabat 2 */}
        <div className={`flex items-center rounded-[50px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-auto ${openCard ? "animate-expand" : "animate-collapse"}`}>
          <div className="flex flex-col items-center w-[347px] h-[302px] rounded-[50px] bg-white py-[20px] px-[34px]">
            <div
              className="w-full flex justify-end cursor-pointer"
              onClick={() => {
                setOpenCard(!openCard);
                console.log(openCard);
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} color="#24445A" className={`w-[21px] h-auto transition duration-200 ease-in ${openCard ? "rotate-180" : ""}`} />
            </div>
            <div className="w-full flex justify-center">
              <div className="relative w-[146px] h-[146px] bg-white rounded-full border-[5px] border-solid border-secondary">
                <img src={fotowalikota} alt="" className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-[128px] h-[128px] bg-secondary rounded-full border-[4px] border-solid border-secondary" />
              </div>
            </div>
            <p className="w-full text-secondary text-[16px] text-center break-words font-bold mt-[11px]">Bambang Tirtoyuliono</p>
            <p className="w-full text-secondary text-[12px] text-center break-words font-regular">Wakil Walikota</p>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Masa Periode : 2019 - 2024
            </a>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Kontak : 08XXXXXXXX
            </a>
          </div>

          <div className={`${openCard ? "block animate-fadeIn" : "hidden"} transition duration-200 ease-in w-[347px] h-[382px] rounded-[50px] bg-white py-[20px] pr-[34px]`}>
            <div className="w-full h-full bg-[#EFEFEF] rounded-[15px] text-secondary text-[12px] p-[18px] overflow-auto mini-scrollbar">
              <p>Alamat Kantor : HVRW+M8W, Simbula, Kec. Katoi, Kabupaten Kolaka Utara, Sulawesi Tenggara 93957 Adasdasdsda asdasdasd jkkk asd asdasdasd</p>
              <p className="mt-[10px]">Jabatan Lain : Anggota DPRnya mi</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="border-b-2 border-[#DADADA] w-[400px] xl:w-[1190px] lg:w-[900px] md:w-[700px] sm:w-[500px] mt-[50px] mb-[30px] relative"></div>

      <h1 className="text-center flex justify-center items-center text-secondary text-[20px] md:text-[34px] lg:text-[30px] xl:text-[30px] font-bold italic mt-[10px]">Staff Function</h1>

      <div className="flex max-w-[1200px] h-auto p-[29px] gap-x-[45px] overflow-scroll mt-[30px]">
        {/* Card 1 */}
        <div className={`flex items-center rounded-[50px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-auto ${openCard ? "animate-expand" : "animate-collapse"}`}>
          <div className="flex flex-col items-center w-[347px] h-[302px] rounded-[50px] bg-white py-[20px] px-[34px]">
            <div
              className="w-full flex justify-end cursor-pointer"
              onClick={() => {
                setOpenCard(!openCard);
                console.log(openCard);
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} color="#24445A" className={`w-[21px] h-auto transition duration-200 ease-in ${openCard ? "rotate-180" : ""}`} />
            </div>
            <div className="w-full flex justify-center">
              <a href="pemdaanakan">
                <div className="relative w-[146px] h-[146px] bg-white rounded-full border-[5px] border-solid border-secondary">
                  <img src={fotowalikota} alt="" className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-[128px] h-[128px] bg-secondary rounded-full border-[4px] border-solid border-secondary" />
                </div>
              </a>
            </div>
            <p className="w-full text-secondary text-[16px] text-center break-words font-bold mt-[11px]">Bambang Tirtoyuliono</p>
            <p className="w-full text-secondary text-[12px] text-center break-words font-regular">Sekretaris Daerah</p>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Masa Periode : 2019 - 2024
            </a>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Kontak : 08XXXXXXXX
            </a>
          </div>

          <div className={`${openCard ? "block animate-fadeIn" : "hidden"} transition duration-200 ease-in w-[347px] h-[382px] rounded-[50px] bg-white py-[20px] pr-[34px]`}>
            <div className="w-full h-full bg-[#EFEFEF] rounded-[15px] text-secondary text-[12px] p-[18px] overflow-auto mini-scrollbar">
              <p>Alamat Kantor : HVRW+M8W, Simbula, Kec. Katoi, Kabupaten Kolaka Utara, Sulawesi Tenggara 93957 Adasdasdsda asdasdasd jkkk asd asdasdasd</p>
              <p className="mt-[10px]">Jabatan Lain : Anggota DPRnya mi</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className={`flex items-center rounded-[50px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-auto ${openCard ? "animate-expand" : "animate-collapse"}`}>
          <div className="flex flex-col items-center w-[347px] h-[302px] rounded-[50px] bg-white py-[20px] px-[34px]">
            <div
              className="w-full flex justify-end cursor-pointer"
              onClick={() => {
                setOpenCard(!openCard);
                console.log(openCard);
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} color="#24445A" className={`w-[21px] h-auto transition duration-200 ease-in ${openCard ? "rotate-180" : ""}`} />
            </div>
            <div className="w-full flex justify-center">
              <div className="relative w-[146px] h-[146px] bg-white rounded-full border-[5px] border-solid border-secondary">
                <img src={fotowalikota} alt="" className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-[128px] h-[128px] bg-secondary rounded-full border-[4px] border-solid border-secondary" />
              </div>
            </div>
            <p className="w-full text-secondary text-[16px] text-center break-words font-bold mt-[11px]">Bambang Tirtoyuliono</p>
            <p className="w-full text-secondary text-[12px] text-center break-words font-regular">Walikota</p>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Masa Periode : 2019 - 2024
            </a>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Kontak : 08XXXXXXXX
            </a>
          </div>

          <div className={`${openCard ? "block animate-fadeIn" : "hidden"} transition duration-200 ease-in w-[347px] h-[382px] rounded-[50px] bg-white py-[20px] pr-[34px]`}>
            <div className="w-full h-full bg-[#EFEFEF] rounded-[15px] text-secondary text-[12px] p-[18px] overflow-auto mini-scrollbar">
              <p>Alamat Kantor : HVRW+M8W, Simbula, Kec. Katoi, Kabupaten Kolaka Utara, Sulawesi Tenggara 93957 Adasdasdsda asdasdasd jkkk asd asdasdasd</p>
              <p className="mt-[10px]">Jabatan Lain : Anggota DPRnya mi</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className={`flex items-center rounded-[50px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-auto ${openCard ? "animate-expand" : "animate-collapse"}`}>
          <div className="flex flex-col items-center w-[347px] h-[302px] rounded-[50px] bg-white py-[20px] px-[34px]">
            <div
              className="w-full flex justify-end cursor-pointer"
              onClick={() => {
                setOpenCard(!openCard);
                console.log(openCard);
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} color="#24445A" className={`w-[21px] h-auto transition duration-200 ease-in ${openCard ? "rotate-180" : ""}`} />
            </div>
            <div className="w-full flex justify-center">
              <div className="relative w-[146px] h-[146px] bg-white rounded-full border-[5px] border-solid border-secondary">
                <img src={fotowalikota} alt="" className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-[128px] h-[128px] bg-secondary rounded-full border-[4px] border-solid border-secondary" />
              </div>
            </div>
            <p className="w-full text-secondary text-[16px] text-center break-words font-bold mt-[11px]">Bambang Tirtoyuliono</p>
            <p className="w-full text-secondary text-[12px] text-center break-words font-regular">Walikota</p>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Masa Periode : 2019 - 2024
            </a>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Kontak : 08XXXXXXXX
            </a>
          </div>

          <div className={`${openCard ? "block animate-fadeIn" : "hidden"} transition duration-200 ease-in w-[347px] h-[382px] rounded-[50px] bg-white py-[20px] pr-[34px]`}>
            <div className="w-full h-full bg-[#EFEFEF] rounded-[15px] text-secondary text-[12px] p-[18px] overflow-auto mini-scrollbar">
              <p>Alamat Kantor : HVRW+M8W, Simbula, Kec. Katoi, Kabupaten Kolaka Utara, Sulawesi Tenggara 93957 Adasdasdsda asdasdasd jkkk asd asdasdasd</p>
              <p className="mt-[10px]">Jabatan Lain : Anggota DPRnya mi</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="border-b-2 border-[#DADADA] w-[400px] xl:w-[1190px] lg:w-[900px] md:w-[700px] sm:w-[500px] mt-[50px] mb-[30px] relative"></div>

      <h1 className="text-center flex justify-center items-center text-secondary text-[20px] md:text-[34px] lg:text-[30px] xl:text-[30px] font-bold italic mt-[10px]">Line Function</h1>
      <div className="flex max-w-[1200px] h-auto p-[29px] gap-x-[45px] overflow-scroll mt-[30px]">
        {/* Card 1 */}
        <div className={`flex items-center rounded-[50px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-auto ${openCard ? "animate-expand" : "animate-collapse"}`}>
          <div className="flex flex-col items-center w-[347px] h-[302px] rounded-[50px] bg-white py-[20px] px-[34px]">
            <div
              className="w-full flex justify-end cursor-pointer"
              onClick={() => {
                setOpenCard(!openCard);
                console.log(openCard);
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} color="#24445A" className={`w-[21px] h-auto transition duration-200 ease-in ${openCard ? "rotate-180" : ""}`} />
            </div>
            <div className="w-full flex justify-center">
              <div className="relative w-[146px] h-[146px] bg-white rounded-full border-[5px] border-solid border-secondary">
                <img src={fotowalikota} alt="" className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-[128px] h-[128px] bg-secondary rounded-full border-[4px] border-solid border-secondary" />
              </div>
            </div>
            <p className="w-full text-secondary text-[16px] text-center break-words font-bold mt-[11px]">Bambang Tirtoyuliono</p>
            <p className="w-full text-secondary text-[12px] text-center break-words font-regular">Walikota</p>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Masa Periode : 2019 - 2024
            </a>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Kontak : 08XXXXXXXX
            </a>
          </div>

          <div className={`${openCard ? "block animate-fadeIn" : "hidden"} transition duration-200 ease-in w-[347px] h-[382px] rounded-[50px] bg-white py-[20px] pr-[34px]`}>
            <div className="w-full h-full bg-[#EFEFEF] rounded-[15px] text-secondary text-[12px] p-[18px] overflow-auto mini-scrollbar">
              <p>Alamat Kantor : HVRW+M8W, Simbula, Kec. Katoi, Kabupaten Kolaka Utara, Sulawesi Tenggara 93957 Adasdasdsda asdasdasd jkkk asd asdasdasd</p>
              <p className="mt-[10px]">Jabatan Lain : Anggota DPRnya mi</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className={`flex items-center rounded-[50px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-auto ${openCard ? "animate-expand" : "animate-collapse"}`}>
          <div className="flex flex-col items-center w-[347px] h-[302px] rounded-[50px] bg-white py-[20px] px-[34px]">
            <div
              className="w-full flex justify-end cursor-pointer"
              onClick={() => {
                setOpenCard(!openCard);
                console.log(openCard);
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} color="#24445A" className={`w-[21px] h-auto transition duration-200 ease-in ${openCard ? "rotate-180" : ""}`} />
            </div>
            <div className="w-full flex justify-center">
              <div className="relative w-[146px] h-[146px] bg-white rounded-full border-[5px] border-solid border-secondary">
                <img src={fotowalikota} alt="" className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-[128px] h-[128px] bg-secondary rounded-full border-[4px] border-solid border-secondary" />
              </div>
            </div>
            <p className="w-full text-secondary text-[16px] text-center break-words font-bold mt-[11px]">Bambang Tirtoyuliono</p>
            <p className="w-full text-secondary text-[12px] text-center break-words font-regular">Walikota</p>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Masa Periode : 2019 - 2024
            </a>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Kontak : 08XXXXXXXX
            </a>
          </div>

          <div className={`${openCard ? "block animate-fadeIn" : "hidden"} transition duration-200 ease-in w-[347px] h-[382px] rounded-[50px] bg-white py-[20px] pr-[34px]`}>
            <div className="w-full h-full bg-[#EFEFEF] rounded-[15px] text-secondary text-[12px] p-[18px] overflow-auto mini-scrollbar">
              <p>Alamat Kantor : HVRW+M8W, Simbula, Kec. Katoi, Kabupaten Kolaka Utara, Sulawesi Tenggara 93957 Adasdasdsda asdasdasd jkkk asd asdasdasd</p>
              <p className="mt-[10px]">Jabatan Lain : Anggota DPRnya mi</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className={`flex items-center rounded-[50px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-auto ${openCard ? "animate-expand" : "animate-collapse"}`}>
          <div className="flex flex-col items-center w-[347px] h-[302px] rounded-[50px] bg-white py-[20px] px-[34px]">
            <div
              className="w-full flex justify-end cursor-pointer"
              onClick={() => {
                setOpenCard(!openCard);
                console.log(openCard);
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} color="#24445A" className={`w-[21px] h-auto transition duration-200 ease-in ${openCard ? "rotate-180" : ""}`} />
            </div>
            <div className="w-full flex justify-center">
              <div className="relative w-[146px] h-[146px] bg-white rounded-full border-[5px] border-solid border-secondary">
                <img src={fotowalikota} alt="" className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-[128px] h-[128px] bg-secondary rounded-full border-[4px] border-solid border-secondary" />
              </div>
            </div>
            <p className="w-full text-secondary text-[16px] text-center break-words font-bold mt-[11px]">Bambang Tirtoyuliono</p>
            <p className="w-full text-secondary text-[12px] text-center break-words font-regular">Walikota</p>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Masa Periode : 2019 - 2024
            </a>
            <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
              Kontak : 08XXXXXXXX
            </a>
          </div>

          <div className={`${openCard ? "block animate-fadeIn" : "hidden"} transition duration-200 ease-in w-[347px] h-[382px] rounded-[50px] bg-white py-[20px] pr-[34px]`}>
            <div className="w-full h-full bg-[#EFEFEF] rounded-[15px] text-secondary text-[12px] p-[18px] overflow-auto mini-scrollbar">
              <p>Alamat Kantor : HVRW+M8W, Simbula, Kec. Katoi, Kabupaten Kolaka Utara, Sulawesi Tenggara 93957 Adasdasdsda asdasdasd jkkk asd asdasdasd</p>
              <p className="mt-[10px]">Jabatan Lain : Anggota DPRnya mi</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
              <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="border-b-2 border-[#DADADA] w-[400px] xl:w-[1190px] lg:w-[900px] md:w-[700px] sm:w-[500px] mt-[50px] mb-[30px] relative"></div>

      <h1 className="text-center flex justify-center items-center text-secondary text-[20px] md:text-[34px] lg:text-[30px] xl:text-[30px] font-bold italic mt-[20px]">Layanan Publik</h1>

      <div className="flex mt-[40px] space-x-10 relative">
        <button
          onClick={() => handleButtonClick("Pendidikan")}
          className={`flex w-[100px] md:w-[167px] h-[40px] rounded-full border border-[#f1f1f1] text-[14px] font-bold items-center justify-center ${activeButton === "Pendidikan" ? "bg-secondary text-white" : "bg-third text-secondary"}`}
        >
          Pendidikan
        </button>
        <button className="flex w-[100px] md:w-[167px] h-[40px] rounded-full border border-[#f1f1f1] text-[14px] font-bold items-center justify-center bg-third text-secondary">Kesehatan</button>
        <button className="flex w-[100px] md:w-[167px] h-[40px] rounded-full border border-[#f1f1f1] text-[14px] font-bold items-center justify-center bg-third text-secondary">Transportasi</button>
      </div>

      {isPilihVisible && (
        <>
          <button
            onClick={handlePilihClick}
            className="w-full sm:w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer bg-white p-2 sm:px-[30px] flex items-center justify-between rounded-[10px] mt-[30px] drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)]"
          >
            {selectedOptionD ? selectedOptionD : "Pilih"}
          </button>
          {isDropdownVisible && (
            <div className="dropdown bg-white mt-2 rounded-[10px] w-full sm:w-[250px] h-auto overflow-y-auto text-[14px] drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)]">
              {options.map((option, index) => (
                <div key={index} onClick={() => handleOptionClickD(option)} className="dropdown-option p-2 hover:bg-gray-200 cursor-pointer">
                  {option}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {selectedDetail && (
        <div className="flex flex-col items-center mt-8 w-[400px] h-auto rounded-[25px] bg-secondary py-[20px] px-[34px] drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)]">
          <div className="w-full text-center">
            <h1 className="text-[20px] text-white font-bold">{selectedDetail.title}</h1>
            <h1 className="text-[14px] text-white font-bold">{selectedDetail.department}</h1>
            <h1 className="text-[12px] text-white">{selectedDetail.address}</h1>
            <h1 className="text-[12px] text-white">{selectedDetail.contact}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default PemdaLengkap;
