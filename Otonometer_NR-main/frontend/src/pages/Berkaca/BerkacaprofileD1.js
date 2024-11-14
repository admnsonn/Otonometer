import React, { useState, useEffect } from "react";
import people from "../../assets/icons/people.png";
import "../../style/Switchbtn.css";
import "../../style/Components.css";
import Circleimage from "../../components/Circleimage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bulat from "../../assets/circ.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  faCaretDown,
  faChevronDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import map from "../../assets/icons/peta.png";
import iconuser from "../../assets/icons/iconuser.png";
import dattinggi from "../../assets/icons/dattinggi.png";
import LandingPage from "../../assets/landingpageBerkaca.svg";

const BerkacaprofileD1 = () => {
  const tokenUser = sessionStorage.getItem("token");
  useEffect(() => {
    if (
      sessionStorage.getItem("token") == null ||
      sessionStorage.getItem("token") == ""
    ) {
      return (window.location.href = "/");
    }
  }, [sessionStorage.getItem("token")]);
  const [activeTab, setActiveTab] = useState("pemda");

  const toggleTab = () => {
    setActiveTab(activeTab === "pemda" ? "dprd" : "pemda");
  };

  const [selectedOption, setSelectedOption] = useState("Provinsi");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleOptionKota = (option) => {
    setSelectedKota(option);
    setDropdownKota(false);
  };

  const handleOptionTahun = (option) => {
    setSelectedTahun(option);
    setDropdownTahun(false);
  };

  const SwitchBtn = ({ selected, onSelect }) => (
    <div className="switch" onClick={onSelect}>
      <input type="checkbox" id="toggle" checked={selected === "dprd"} />
      <label htmlFor="toggle" className="slider"></label>
    </div>
  );

  ///FETCHING DROPDOWN PROVINSI
  const [provincess, setProvinces] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(
    sessionStorage.getItem("namaprovinsi")
  );
  const [openProvinsi, setOpenProvinsi] = useState(false);
  const [wilayahID, setWilayahID] = useState(null);
  const [getInfoProvinsi, setGetInfoProvinsi] = useState(null);
  const [is_province, askIsProvince] = useState();
  var wilayah = "";
  var provinsi = "";

  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API+"/provinces")
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data.data);
      });
  }, []);

  ///FETCHING DROPDOWN KOTA
  const [cities, setCity] = useState(null);
  const [inputValueofCity, setInputValueofCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(
    sessionStorage.getItem("namakota")
  );
  const [openCity, setOpenCity] = useState(false);

  ///UPDATE DATA KOTA BERDASARKAN DATA PROVINSI
  function updateKota(item, choosed, id) {
    if (item.toLowerCase() !== choosed.toLowerCase()) {
      setSelected(item);
      setOpenProvinsi(false);
      setInputValue("");
      fetch(
        process.env.REACT_APP_URL_API+"/cities?province_id=" + id
      )
        .then((response) => response.json())
        .then((data) => {
          setCity(data.data);
        });
    }
  }
  useEffect(() => {
    if (sessionStorage.getItem("idprovinsi") !== null) {
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

  ///FETCHING DROPDOWN TAHUN
  const [years, setYears] = useState([]);
  const [inputValueofYears, setInputValueofYears] = useState("");
  const [selectedYears, setSelectedYears] = useState("");
  const [openYears, setOpenYears] = useState(false);
  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API+"/year")
      .then((response) => response.json())
      .then((data) => {
        setYears(data.data);
        sessionStorage.setItem("yearss", data.data[1].tahun);
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
  const [nilaisektor, setNilaisektor]=useState(null);
  const [luaswilayah, setLuaswilayah] = useState(null);
  const [jumlahpenduduk, setJumlahpenduduk] = useState(null);
  const [namawilayah, setNamawilayah] = useState(null);
  const [ketinggian, setKetinggian] = useState(null);

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  function updatePeta(wilayah_id) {
    fetch(
      process.env.REACT_APP_URL_API+"/wilayah-info?lang=id&wilayah_id=" +
        wilayah_id +
        "&tahun=" +
        sessionStorage.getItem("yearss"),
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
    fetch(
      process.env.REACT_APP_URL_API+"/pemda?wilayah_id=" +
        wilayah_id +
        "&tahun=" +
        tahun
    )
      .then((response) => response.json())
      .then((result) => {
        if(result.success === true){
          if (result.data.ketua.length > 0 && result.data.wakil.length > 0) {
            setNamaketua(result.data.ketua[0].nama_lengkap);
            setTlketua(result.data.ketua[0].tahun_lantik);
            setTaketua(result.data.ketua[0].tahun_akhir);
            setFotoketua(
              result.data.ketua[0].foto ==
                "https://storage.googleapis.com/otonometer-bucket/"
                ? iconuser
                : result.data.ketua[0].foto
            );
            setJabatanketua(result.data.ketua[0].jabatan_nama);
            setNamawakil(result.data.wakil[0].nama_lengkap);
            setTlwakilketua(result.data.wakil[0].tahun_lantik);
            setTawakilketua(result.data.wakil[0].tahun_akhir);
            setFotowakilketua(
              result.data.wakil[0].foto ==
                "https://storage.googleapis.com/otonometer-bucket/"
                ? iconuser
                : result.data.wakil[0].foto
            );
            setJabatanwakilketua(result.data.wakil[0].jabatan_nama);
          }else if(result.data.ketua.length > 0 && result.data.wakil.length === 0){
            setNamaketua(result.data.ketua[0].nama_lengkap);
            setTlketua(result.data.ketua[0].tahun_lantik);
            setTaketua(result.data.ketua[0].tahun_akhir);
            setFotoketua(
              result.data.ketua[0].foto ==
                "https://storage.googleapis.com/otonometer-bucket/"
                ? iconuser
                : result.data.ketua[0].foto
            );
            setJabatanketua(result.data.ketua[0].jabatan_nama);
            setJabatanwakilketua("Wakil " + result.data.ketua[0].jabatan_nama);
            setFotowakilketua(iconuser)
            setNamawakil(null);
            setTlwakilketua(null);
            setTawakilketua(null);
          }
        }
        else if(result.success === false){
          setNamaketua("Data tidak tersedia");
          setTlketua(null);
          setTaketua(null);
          setFotoketua(null);
          setJabatanketua(null);
          setJabatanwakilketua(null);
          setFotowakilketua(null)
          setNamawakil("Data tidak tersedia");
          setTlwakilketua(null);
          setTawakilketua(null);
        }
      });
  }

  useEffect(() => {
    if (sessionStorage.getItem("idkota") !== null) {
      wilayah = sessionStorage.getItem("idkota");
      updatePejabat(
        sessionStorage.getItem("idkota"),
        sessionStorage.getItem("yearss")
      );
      setWilayahID(sessionStorage.getItem("idkota"));
      if (sessionStorage.getItem("idprovinsi") !== null) {
        provinsi = sessionStorage.getItem("idprovinsi");
        setGetInfoProvinsi(sessionStorage.getItem("idprovinsi"));
        console.log("idprovinsi = " + getInfoProvinsi);
        console.log(
          "idprovinsisession = " + sessionStorage.getItem("idprovinsi")
        );
        console.log("provinsi = " + provinsi);
        sessionStorage.setItem(
          "Berkacaprofil_provinsi",
          sessionStorage.getItem("idprovinsi")
        );
      }
    }
  }, [namaketua,namawakil,tlketua,taketua,fotoketua,jabatanketua,tlwakilketua,tawakilketua,fotowakilketua,jabatanwakilketua]);


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
  const [fotopartaiwakilketuadprd, setFotopartaiwakilketuadprd] =
    useState(null);

    function updateDPRD(wilayah_id, tahun) {
      fetch(
        process.env.REACT_APP_URL_API+"/dewan?wilayah_id=" +
          wilayah_id +
          "&tahun=" +
          tahun
      )
        .then((response) => response.json())
        .then((result) => {
          if(result.success === true){
            if (result.data !== null && result.data.ketua && result.data.ketua.length > 0) {
              setKetuadprd(result.data.ketua[0].nama_lengkap);
              setTlketuadprd(result.data.ketua[0].tahun_lantik);
              setTaketuadprd(result.data.ketua[0].tahun_akhir);
              setFotoketuadprd(
                result.data.ketua[0].foto ==
                  "https://storage.googleapis.com/otonometer-bucket/"
                  ? iconuser
                  : result.data.ketua[0].foto
              );
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
          }else if(result.success === false){
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
        updateDPRD(
          sessionStorage.getItem("idkota"),
          sessionStorage.getItem("yearss")
        );
        setWilayahID(sessionStorage.getItem("idkota"));
      }
    }, [ketuadprd,wakildprd,tlketuadprd,taketuadprd,fotoketuadprd,jabatanketuadprd,fotopartaiketuadprd,tlwakilketuadprd,tawakilketuadprd,fotowakilketuadprd,jabatanwakilketuadprd,fotopartaiwakilketuadprd,sessionStorage.getItem("idkota"),sessionStorage.getItem("yearss"),sessionStorage.getItem("idprovinsi")]);
    if(jumlahpenduduk!=null){
      var convertStringtoInt = jumlahpenduduk.replaceAll(".","")
      var data_Penduduk = parseInt(convertStringtoInt) / 1000;
    }
  return (
    <div className="flex flex-col mb-[150px] justify-center items-center mt-[125px]">
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
      {/* <div className="flex bg-none w-[167px] h-[41px] rounded-[10px] text-secondary border-2 border-secondary text-[14px] font-semibold items-center justify-center">
        BERKACA
      </div> */}
      <h1 className="text-center flex justify-center items-center text-secondary text-[24px] md:text-[34px] font-bold mt-[24px]">
        Bandingkan Daerah Pilihanmu!
      </h1>
      {/* DROPDOWN */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-[40px] gap-y-[10px] mt-[20px]">
        {/* FETCHING PROVINSI */}
        <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
          <div
            onClick={() => setOpenProvinsi(!openProvinsi)}
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
                  provinces?.nama?.toLowerCase() === selected?.toLowerCase() &&
                  "bg-secondary text-white"
                }
                ${
                  provinces?.nama?.toLowerCase().startsWith(inputValue)
                    ? "block"
                    : "hidden"
                }`}
                onClick={() => {
                  updateKota(provinces?.nama, selected, provinces.id);
                  setWilayahID(provinces.id);
                  setGetInfoProvinsi(provinces.id);
                  setInfoDaerah("Semua");
                  setSelectedCity("Semua");
                  setDataranicon("Semua");
                  askIsProvince(true);
                  provinsi = provinces.id;
                  wilayah = provinces.id;
                  updatePeta(provinces.id);
                  sessionStorage.setItem(
                    "Berkacaprofil_provinsi",
                    provinces.id
                  );
                  updatePejabat(
                    sessionStorage.getItem("Berkacaprofil_provinsi"),
                    selectedYears
                  );
                  updateDPRD(
                    sessionStorage.getItem("Berkacaprofil_provinsi"),
                    selectedYears
                  );
                  sessionStorage.setItem("idprovinsi", provinces.id);
                  sessionStorage.setItem("namaprovinsi", provinces.nama);
                  sessionStorage.setItem("namawilayah", "Semua");
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
            onClick={() => setOpenCity(!openCity)}
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
                setSelectedYears(sessionStorage.getItem("yearss"));
                updatePeta(sessionStorage.getItem("Berkacaprofil_provinsi"));
                setOpenCity(false);
                askIsProvince(true);
                updatePejabat(
                  sessionStorage.getItem("Berkacaprofil_provinsi"),
                  selectedYears
                );
                updateDPRD(
                  sessionStorage.getItem("Berkacaprofil_provinsi"),
                  selectedYears
                );
                sessionStorage.getItem("Berkacaprofil_provinsi");
                sessionStorage.setItem("namawilayah", "Semua");
                sessionStorage.setItem(
                  "idkota",
                  sessionStorage.getItem("idprovinsi")
                );
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
                    setSelectedCity(regencies?.nama);
                    setOpenCity(false);
                    setInputValueofCity("");
                    updatePeta(wilayah);
                    updatePejabat(wilayah, selectedYears);
                    updateDPRD(wilayah, selectedYears);
                    setWilayahID(wilayah);
                    sessionStorage.setItem("namawilayah", regencies.nama);
                    sessionStorage.setItem("idkota", regencies.id);
                    sessionStorage.setItem("namakota", regencies.nama);
                  }
                }}
              >
                {regencies?.nama}
              </li>
            ))}
          </ul>
        </div>

        {/* FETCHING TAHUN */}
        <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
          <div
            onClick={() => setOpenYears(!openYears)}
            className="bg-[#ebebeb] w-full p-2 flex items-center justify-center rounded-[10px]"
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
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-auto 
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
                    tahunn?.tahun?.toLowerCase() !== selectedYears.toLowerCase()
                  ) {
                    setSelectedYears(tahunn?.tahun);
                    setOpenYears(false);
                    setInputValueofYears("");
                    // sessionStorage.setItem("yearss", tahunn?.tahun);
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

      <img
        src={peta}
        alt=""
        className="flex items-center w-[250px] lg:w-80 mb-[40px] mt-[20px]"
      />

      <div className="flex justify-between items-center gap-x-[40px]">
        <img src={pinMap} alt="" className="flex w-6" />
        <div className="text-secondary">
          <h1 className="text-[20px] lg:text-[24px] font-bold">{infoDaerah}</h1>
          <p className="font-semibold text-[16px] lg:text-[20px]">
            {koordinatLokasi}
          </p>
        </div>
      </div>

      <div className="flex gap-[20px] mt-[40px] mb-[20px] ml-[10px] lg:gap-[50px] lg:ml-[40px]">
        <div className="text-[18px] text-secondary mt-[5px] lg:text-[20px]">
          <p className="font-bold">
          {luaswilayah}
          </p>
          <p className="font-regular">km²</p>
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
          <a href="/Berkaca-Main">
            <img
              src={LandingPage}
              alt=""
              className="w-[70px] lg:w-[95px] object-contain hover:scale-110 transform transition duration-300 lg:mt-[-10px]"
            />
          </a>
          <div className="hover-container">
            <img src={sektoricon} alt="" className="w-[60px] lg:w-20" />
            <span className="hover-text w-[200%] mb-[10px]">
              <p>{nilaisektor}</p>
              <p>{sektornama}</p>
            </span>
          </div>
        </div>
        <div className="text-[18px] text-secondary mt-[5px] lg:text-[20px]">
          <p className="font-bold">
            {Math.round(data_Penduduk).toLocaleString().replace(/,/g, ".")}
          </p>
          <p className="font-regular">10³ Jiwa</p>
        </div>
      </div>
      {/* SWITCH */}
      <div className="flex gap-[50px] items-center justify-center font-semibold text-secondary mt-[48px] text-[16px] md:text-[20px]">
        <p className={activeTab === "dprd" ? "inactive-text" : ""}>Pemda</p>
        <SwitchBtn selected={activeTab} onSelect={toggleTab} />
        <p className={activeTab === "pemda" ? "inactive-text" : ""}>DPRD</p>
      </div>
      {/* TEXT */}
      <div className="text-secondary text-center mt-[48px]">
        <p className="text-[20px] md:text-[32px] font-extrabold">
          Pemerintah {namawilayah}
        </p>
      </div>

      {/* DATA */}
      {activeTab === "pemda" && (
        <div class="flex mt-[50px] gap-x-[20px] md:gap-x-[100px] justify-center items-start w-[400px] md:w-[600px] lg:w-[900px]">
          <div class="flex flex-col items-center justify-start w-[50%]">
            <div class="w-[150px] h-[200px] md:w-[200px] md:h-[300px] overflow-hidden rounded-full bg-white">
              <img src={fotoketua} alt="" class="object-cover h-full w-full" />
            </div>

            <p className="text-center mt-[20px] text-[16px] md:text-[30px] text-[#064878] font-bold">
              {jabatanketua}
            </p>
            <p className="text-center md:mt-[15px] text-[14px] md:text-[25px] text-[#064878] font-semibold">
              {namaketua}
            </p>
            <p className="text-center md:mt-[10px] text-[14px] md:text-[25px] text-[#064878] font-semibold">
              ({tlketua}-{taketua})
            </p>
          </div>

          <div class="flex flex-col items-center justify-start w-[50%]">
            <div class="w-[150px] h-[200px] md:w-[200px] md:h-[300px] overflow-hidden rounded-full">
              <img
                src={fotowakilketua}
                alt=""
                class="object-cover h-full w-full bg-white with-stroke"
              />
            </div>
            <p className="text-center mt-[20px] text-[16px] md:text-[30px] text-[#064878] font-bold">
              {jabatanwakilketua}
            </p>
            <p className="text-center md:mt-[15px] text-[14px] md:text-[25px] text-[#064878] font-semibold">
              {namawakil}
            </p>
            <p className="text-center md:mt-[10px] text-[14px] md:text-[25px] text-[#064878] font-semibold">
              ({tlwakilketua}-{tawakilketua})
            </p>
          </div>
        </div>
      )}

      {activeTab === "dprd" && (
        <div className="flex justify-center md:mb-[100px] w-full h-auto">
          <div className="flex flex-col mt-[50px]">
            <div className="flex flex-col justify-center items-center">
              <div class="w-[200px] h-[300px] overflow-hidden rounded-full">
                <img
                  src={fotoketuadprd}
                  alt=""
                  class="object-cover h-full w-full"
                />
              </div>
              <img
                src={fotopartaiketuadprd}
                alt="Logo Partai"
                className="flex items-center justify-center w-[100px] h-[100px] translate-y-[-40px] rounded-lg"
              />
            </div>
            <p className="text-center md:mt-[40px] text-[14px] md:text-[25px] text-[#064878] font-semibold translate-y-[-20px]">
              {ketuadprd}
            </p>
            <p className="text-center md:mt-[10px] text-[14px] md:text-[25px] text-[#064878] font-semibold translate-y-[-20px]">
              ({tlketuadprd}-{taketuadprd})
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BerkacaprofileD1;
