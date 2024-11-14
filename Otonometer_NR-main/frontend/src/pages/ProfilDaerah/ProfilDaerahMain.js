import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Header/Navbar'
import Footer from '../../components/Footer'
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import map from "../../assets/icons/peta.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import CardPejabat from './cardPejabat';
import { NavLink } from 'react-router-dom';
import { getListJabatanALL, getListJabatanSpesific } from './services';

const ProfilDaerahMain = () => {
  ///SETTING TAHUN BY CURRENT YEAR
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();

  // const [years, setYears] = useState([]);
  // const [inputValueofYears, setInputValueofYears] = useState("");
  // const [selectedYears, setSelectedYears] = useState("");
  // const [openYears, setOpenYears] = useState(false);
  // useEffect(() => {
  //   fetch(process.env.REACT_APP_URL_API+"/year")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (sessionStorage.getItem("yearss") === null) {
  //         sessionStorage.setItem("yearss", data.data[1].tahun);
  //       }
  //       setYears(data.data);
  //     });
  // }, [sessionStorage.getItem("yearss")]);
  // useEffect(() => {
  //   const selectedYear = sessionStorage.getItem("yearss");
  //   if (selectedYear) {
  //     setSelectedYears(selectedYear);
  //   }
  // }, [sessionStorage.getItem("yearss")]);

    ///FETCHING DROPDOWN PROVINSI
    const [provincess, setProvinces] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState(sessionStorage.getItem("namaprovinsi"));
    const [openProvinsi, setOpenProvinsi] = useState(false);
    const [getInfoProvinsi, setGetInfoProvinsi] = useState(null);
    const [wilayahID, setWilayahID] = useState(null);
    const [is_province, askIsProvince] = useState();
    const [nilaisektor, setNilaisektor] = useState(null);
  
    useEffect(() => {
      fetch(process.env.REACT_APP_URL_API+"/provinces")
        .then((response) => response.json())
        .then((data) => {
          if (sessionStorage.getItem("idprovinsi") === null && sessionStorage.getItem("namaprovinsi") === null){
            setProvinces(data.data);
            // document.getElementById("kondisiLogin").classList.add("hidden")
            // document.getElementById("kondisiNonLogin").classList.remove("hidden")
          }else{
            setProvinces(data.data);
            // document.getElementById("kondisiLogin").classList.remove("hidden")
            // document.getElementById("kondisiNonLogin").classList.add("hidden")
          }
        });
    }, []);

  
    ///FETCHING DROPDOWN KOTA
    const [cities, setCity] = useState(null);
    const [inputValueofCity, setInputValueofCity] = useState("");
    const [selectedCity, setSelectedCity] = useState(
      sessionStorage.getItem("namakota")
    );
    const [openCity, setOpenCity] = useState(false);
  
    useEffect(() => {
      if (sessionStorage.getItem("idprovinsi") !== null) {
        // updateKota(provincess.nama, selected, sessionStorage.getItem("idprovinsi"))
        fetch(
          process.env.REACT_APP_URL_API+"/cities?province_id=" +
            sessionStorage.getItem("idprovinsi")
        )
          .then((response) => response.json())
          .then((data) => {
            setCity(data.data);
          });
      }
    }, [sessionStorage.getItem("idprovinsi")]);
    ///UPDATE DATA KOTA BERDASARKAN DATA PROVINSI
    function updateKota(item, choosed, id) {
      setSelected(item);
      setOpenProvinsi(false);
      setInputValue("");
      if (item && choosed && item.toLowerCase() !== choosed.toLowerCase()) {
        fetch(
          process.env.REACT_APP_URL_API+"/cities?province_id=" + id
        )
          .then((response) => response.json())
          .then((data) => {
            setCity(data.data);
          });
      }
    }
   
  
    ///UPDATE PETANYA DORA THE EXPLORER
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
    const [satuan, setSatuan] = useState(null);
  
    var wilayah = "";
    var provinsi = "";
  
    useEffect(() => {
      if (sessionStorage.getItem("idkota") !== null) {
        wilayah = sessionStorage.getItem("idkota");
        updatePeta(
          sessionStorage.getItem("idkota")
          // sessionStorage.getItem("yearss")
        );
        setWilayahID(sessionStorage.getItem("idkota"));
        if (sessionStorage.getItem("idprovinsi") !== null) {
          provinsi = sessionStorage.getItem("idprovinsi");
          setGetInfoProvinsi(sessionStorage.getItem("idprovinsi"));
        }
      }
    }, []);
  
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    function updatePeta(wilayah_id) {
      fetch(
        process.env.REACT_APP_URL_API+"/wilayah-info?lang=id&wilayah_id=" +
          wilayah_id +
          "&tahun=" +
          currentYear,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setPeta(result.data.peta);
          if (sessionStorage.getItem("namawilayah") === "Semua") {
              setDataranicon(
                "https://storage.googleapis.com/otonometer-bucket/infografis/664c63abef1c7.tidak_identifikasi_LIGHT.png"
              );
          } else {
            setDataranicon(result.data.dataran_icon);
          }
          setInfoDaerah(result.data.nama);
          setSektoricon(result.data.wilayah_info.sektor_icon);
          setKoordinatLokasi(result.data.longitude + ", " + result.data.latitude);
          setDatarannama(result.data.dataran_nama);
          setKetinggian(result.data.wilayah_info.ketinggian);
          setSektornama(result.data.wilayah_info.sektor_nama);
          setLuaswilayah(result.data.wilayah_info.luas_wilayah);
          setJumlahpenduduk(result.data.wilayah_info.jumlah_penduduk);
          setNilaisektor(result.data.wilayah_info.nilai_sektor);
          setPinMap(map);
        });
    }
    if(jumlahpenduduk!=null){
      var convertStringtoInt = jumlahpenduduk.replaceAll(".","")
      var data_Penduduk = parseInt(convertStringtoInt) / 1000;
    }

    ///BUTTON SWITCH
    const [activeTab, setActiveTab] = useState("pemda");
    const SwitchBtn = ({ selected, onSelect }) => (
      <div className="switch">
        <input type="checkbox" id="toggle" checked={selected === "dprd"} onChange={onSelect}/>
        <label htmlFor="toggle" className="slider"></label>
      </div>
    );
    const toggleTab = () => {
      setActiveTab(activeTab === "pemda" ? "dprd" : "pemda");
    };

    ///DATA CARD TIPE BUPATI
    const [dataCardPimpinan, setDataCardPimpinan] = useState([]);
    const [idPertama, setIdPertama] = useState("");
    useEffect(() => {
      getListJabatanALL((data) => {
        const filteredData = data.data.filter(item => item.pejabat && item.pejabat.length > 0);
        // setDataCardPimpinan(filteredData);
        // console.log(data)
        setDataCardPimpinan(data.data);

      });
    }, [idPertama]);
  return (
    <div>
        <Navbar />
          <div className="flex flex-col mt-[125px] justify-start items-center min-h-screen h-auto">
              {/* <img src={bulat} alt="" className="fixed w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10" /> */}
              <img
                  src={geometry}
                  alt=""
                  className="md:hidden lg:block hidden fixed w-full top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10 opacity-10 object-cover"
              />
              <img
                  src={geometrys}
                  alt=""
                  className="hidden md:block lg:hidden fixed w-full top-[40%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover"
              />
              <img
                  src={geometryss}
                  alt=""
                  className="block md:hidden lg:hidden fixed w-full top-[5%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover"
              />
              <h1 className="text-center flex justify-center items-center text-secondary text-[24px] md:text-[34px] font-bold mt-[24px]">
                Telusuri Pemerintahan Wilayah!
              </h1>
                {/* DROPDOWN */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[40px] gap-y-[10px] mt-[20px]">
                  {/* FETCHING PROVINSI */}
                  <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
                    <div
                      onClick={() => {setOpenProvinsi(!openProvinsi)
                        if (openCity){
                          setOpenCity(!openCity)
                        }
                        // if (openYears){
                        //   setOpenYears(!openYears)
                        // }
                      }}
                      className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
                    >
                      {selected
                        ? selected?.length > 20
                          ? selected?.substring(0, 20) + "..."
                          : selected
                        : "Provinsi"}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        color="#24445A"
                        className={`ml-[20px] w-[10px] h-[20px] ${
                          openProvinsi && "rotate-180"
                        }`}
                      />
                    </div>
                    <div
                      className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
                    ${openProvinsi ? "max-h-auto" : "hidden"}`}
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        color="#24445A"
                        style={{ opacity: "40%" }}
                        className="w-[10px] h-[20px] opacity-75"
                      />
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                        placeholder="Cari Provinsi"
                        className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
                      />
                    </div>
                    <ul
                      className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                        ${openProvinsi ? "max-h-[240px]" : "max-h-[0]"}`}
                    >
                      {provincess?.map((provinces) => (
                        <li
                          key={provinces?.nama}
                          className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                          ${
                            provinces?.nama?.toLowerCase() ===
                              selected?.toLowerCase() && "bg-secondary text-white"
                          }
                          ${
                            provinces?.nama?.toLowerCase().includes(inputValue)
                              ? "block"
                              : "hidden"
                          }`}
                          onClick={() => {
                            updateKota(provinces?.nama, selected, provinces.id);
                            sessionStorage.setItem("idprovinsi", provinces.id);
                            sessionStorage.setItem("namaprovinsi", provinces.nama);
                            sessionStorage.setItem("idwilayah", provinces.id);
                            setGetInfoProvinsi(provinces.id);
                            setWilayahID(provinces.id);
                            sessionStorage.setItem("namawilayah", "Semua");
                            setInfoDaerah("Semua");
                            setSelectedCity("Semua");
                            setDataranicon("Semua");
                            // setSelectedYears(sessionStorage.getItem("yearss"));
                            updatePeta(provinces.id);
                            askIsProvince(true);
                            provinsi = provinces.id;
                            wilayah = provinces.id;
                            sessionStorage.setItem("namakota", "Semua");
                            sessionStorage.setItem("idkota", provinces.id);
                          }}
                        >
                          {provinces?.nama}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* FETCHING KOTA */}
                  <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
                    <div
                      onClick={() => {
                        setOpenCity(!openCity);
                        if (openProvinsi){
                          setOpenProvinsi(!openProvinsi)
                        }
                        // if (openYears){
                        //   setOpenYears(!openYears)
                        // }
                      }}
                      className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
                    >
                      {selectedCity
                        ? selectedCity?.length > 20
                          ? selectedCity?.substring(0, 20) + "..."
                          : selectedCity
                        : "Kota/Kabupaten"}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        color="#24445A"
                        className={`ml-[20px] w-[10px] h-[20px] ${
                          openCity && "rotate-180"
                        }`}
                      />
                    </div>
                    <div
                      className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
                      ${openCity ? "max-h-auto" : "hidden"}`}
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        color="#24445A"
                        style={{ opacity: "40%" }}
                        className="w-[10px] h-[20px] opacity-75"
                      />
                      <input
                        type="text"
                        value={inputValueofCity}
                        onChange={(e) =>
                          setInputValueofCity(e.target.value.toLowerCase())
                        }
                        placeholder="Cari Kota/Kabupaten"
                        className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
                      />
                    </div>
                    <ul
                      className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                        ${openCity ? "max-h-[240px]" : "max-h-[0]"}`}
                    >
                      <li
                        className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary
                          ${
                            "semua" === selectedCity?.toLowerCase() &&
                            "bg-secondary text-white"
                          }
                          `}
                        onClick={() => {
                          wilayah = provinsi;
                          setInfoDaerah("Semua");
                          setSelectedCity("Semua");
                          setDataranicon("Semua");
                          setWilayahID(getInfoProvinsi);
                          // setSelectedYears(sessionStorage.getItem("yearss"));
                          sessionStorage.setItem("idwilayah", getInfoProvinsi);
                          updatePeta(getInfoProvinsi);
                          setOpenCity(false);
                          askIsProvince(true);
                          sessionStorage.setItem("namawilayah", "Semua");
                          sessionStorage.setItem("idkota", getInfoProvinsi);
                          sessionStorage.setItem("namakota", "Semua");
                        }}
                      >
                        Semua
                      </li>
                      {cities?.map((regencies) => (
                        <li
                          key={regencies?.nama}
                          className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                          ${
                            regencies?.nama?.toLowerCase() ===
                              selectedCity?.toLowerCase() && "bg-secondary text-white"
                          }
                          ${
                            regencies?.nama?.toLowerCase().includes(inputValueofCity)
                              ? "block"
                              : "hidden"
                          }`}
                          onClick={() => {
                            if (
                              regencies?.nama?.toLowerCase() !==
                              selectedCity.toLowerCase()
                            ) {
                              wilayah = regencies.id;
                              sessionStorage.setItem("namawilayah", regencies.nama);
                              setSelectedCity(regencies?.nama);
                              sessionStorage.setItem("idkota", regencies.id);
                              sessionStorage.setItem("namakota", regencies.nama);
                              sessionStorage.setItem("idwilayah", regencies.id);
                              setOpenCity(false);
                              setInputValueofCity("");
                              updatePeta(regencies.id);
                              setWilayahID(regencies.id);
                              // setSelectedYears(sessionStorage.getItem("yearss"));
                              askIsProvince(false);
                            }
                          }}
                        >
                          {regencies?.nama}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* FETCHING TAHUN */}
                  {/* <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
                    <div
                      onClick={() => {setOpenYears(!openYears)
                        if (openProvinsi){
                          setOpenProvinsi(!openProvinsi)
                        }
                        if (openCity){
                          setOpenCity(!openCity)
                        }
                      }}
                      className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
                    >
                      {selectedYears
                        ? selectedYears?.length > 12
                          ? selectedYears?.substring(0, 12) + "..."
                          : selectedYears
                        : "Tahun"}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        color="#24445A"
                        className={`ml-[120px] w-[10px] h-[20px] ${
                          openYears && "rotate-180"
                        }`}
                      />
                    </div>
                    <ul
                      className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-auto mini-scrollbar
                        ${openYears ? "max-h-[240px]" : "max-h-[0]"}`}
                    >
                      {years?.map((tahunn) => (
                        <li
                          key={tahunn?.tahun}
                          className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                          ${
                            tahunn?.tahun?.toLowerCase() ===
                              selectedYears?.toLowerCase() && "bg-secondary text-white"
                          }

                          ${
                            tahunn?.tahun?.toLowerCase().includes(inputValueofYears)
                              ? "block"
                              : "hidden"
                          }`}
                          onClick={() => {
                            if (
                              tahunn?.tahun?.toLowerCase() !==
                              selectedYears.toLowerCase()
                            ) {
                              setSelectedYears(tahunn?.tahun);
                              setOpenYears(false);
                              setInputValueofYears("");
                              sessionStorage.setItem("yearss", tahunn?.tahun);
                              updatePeta(wilayahID);
                            }
                          }}
                        >
                          {tahunn?.tahun}
                        </li>
                      ))}
                    </ul>
                  </div> */}
              </div>

              <img
                src={peta}
                alt=""
                className="flex items-center w-[200px] md:w-80 mb-[40px] mt-[20px]"
              />

              <div className="flex justify-between items-center gap-x-[40px]">
                <img src={pinMap} alt="" className="flex w-6" />
                <div className="text-secondary">
                  <h1 className="text-[18px] md:text-[24px] font-bold">
                    {infoDaerah}
                  </h1>
                  <p className="font-semibold text-[16px] md:text-[20px]">
                    {koordinatLokasi}
                  </p>
                </div>
              </div>

              <div
                id="informasiDaerahnya"
                className="flex gap-[20px] mt-[40px] mb-[20px] lg:gap-[50px] justify-center"
              >
                <div className="text-[14px] md:text-[20px] text-secondary mt-[5px]">
                  <p className="font-bold text-right">
                  {luaswilayah}
                  </p>
                  <p className="font-regular text-right">km²</p>
                </div>
                <div className="flex gap-[10px]">
                <div className="hover-container">
                  <img src={dataranicon} alt="" className="object-contain w-[60px] lg:w-20" />
                  <span className="hover-text w-auto mb-[10px]">
                    {selectedCity !== "Semua" && ( // Hanya tampilkan mdpl jika selectedCity bukan "Semua"
                    <>
                      {luaswilayah}
                      <span>&nbsp;km²</span>
                      <p>
                        {ketinggian}
                        {selectedCity !== "Kota Jakarta" && (
                          <span>&nbsp;mdpl</span>
                        )}
                      </p>
                    </>
                    )}
                    <p>{datarannama}</p>
                  </span>
                </div>
                  {/* <a href="/Jelajah-Profil">
                    <img
                      src={people}
                      alt=""
                      className="w-[70px] lg:w-[95px] object-contain hover:scale-110 transform transition duration-300 lg:mt-[-10px]"
                    />
                  </a> */}
                  <div className="hover-container">
                    <img src={sektoricon} alt="" className="object-contain w-[60px] lg:w-20" />
                    <span className="hover-text w-auto mb-[10px]">
                      <p>{nilaisektor}</p>
                      <p>{sektornama}</p>
                    </span>
                  </div>
                </div>
                <div className="text-[14px] md:text-[20px] text-secondary mt-[5px]">
                  <p className="font-bold text-left">
                    {Math.round(data_Penduduk).toLocaleString().replaceAll(/,/g, ".")}
                  </p>
                  <p className="font-regular text-left">10³ Jiwa</p>
                </div>
              </div>
              {/* SWITCH */}
              <div className="flex gap-[50px] items-center justify-center font-semibold text-secondary mt-[48px] text-[16px] md:text-[20px]">
                <p className={activeTab === "dprd" ? "inactive-text" : ""}>EKSEKUTIF</p>
                <SwitchBtn selected={activeTab} onSelect={toggleTab} />
                <p className={activeTab === "pemda" ? "inactive-text" : ""}>LEGISLATIF</p>
              </div>
              <div className="text-secondary text-center mt-[48px]">
                <p className="text-[20px] md:text-[32px] font-extrabold uppercase">Pemerintah {infoDaerah} Tahun {currentYear}</p>
              </div>
            {/* CARD PEJABAT */}
            <div className='flex justify-center w-auto overflow-scroll mini-scrollbar mt-[45px]'>
              {CardPejabat(dataCardPimpinan)}
            </div>
            <NavLink to={"/ProfilDaerah-Main/Detail"}>
                <p className="mt-[30px] font-bold text-secondary text-[16px] md:text-[20px] cursor-pointer mb-[150px]"
                >Lihat Selengkapnya
                </p>
            </NavLink>
          </div>
        <Footer />
    </div>
  )
}

export default ProfilDaerahMain