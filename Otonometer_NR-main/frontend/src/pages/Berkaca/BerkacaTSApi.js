import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import "../../style/Components.css";
import geometryss from "../../assets/9.svg";
import {  faChevronDown,
  faDownload,
  faEye,
  faSearch,
  faSearchLocation,
  faFilePdf,
  faShare,
  faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import back from "../../assets/back.svg";
import { timers } from "jquery";
import axios from 'axios';


const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white p-4 rounded-lg shadow-lg xl:[600px] w-[350px] lg:w-[480px] md:w-[450px] relative" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const Modal2 = ({ isOpen2, children, onClose2 }) => {
  if (!isOpen2) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={onClose2}>
      <div className="bg-white p-4 rounded-lg shadow-lg xl:[600px] w-[350px] lg:w-[480px] md:w-[450px] relative" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const Modal3 = ({ isOpen3, children, onClose3 }) => {
  if (!isOpen3) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={onClose3}>
      <div className="bg-white p-4 rounded-lg shadow-lg xl:[600px] w-[350px] lg:w-[480px] md:w-[450px] relative" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const Modal4 = ({ isOpen4, children, onClose4 }) => {
  if (!isOpen4) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={onClose4}>
      <div className="bg-white p-4 rounded-lg shadow-lg xl:[600px] w-[350px] lg:w-[480px] md:w-[450px] relative" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};


const BerkacaTimeseries = () => {
  const tokenUser = sessionStorage.getItem("token");
  var navigate = useNavigate();

  useEffect(() => {
    if (
      sessionStorage.getItem("token") == null ||
      sessionStorage.getItem("token") == ""
    ) {
      // window.location.href = "/"
      navigate('/')
    }
  }, [sessionStorage.getItem("token")]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // return () => {
      // window.removeEventListener("resize", handleResize);
    // };
  }, []);

  const isMobile = windowWidth <= 908;
  const marginBottom = isMobile ? 5 : 0;
  const marginTop = isMobile ? 0 : 0;
  const fontSize = isMobile ? 10 : 11;

  ///DROPDOWN PROVINSI D1
  const [provincessDaerah1, setProvincesDaerah1] = useState(null);
  const [inputValueDaerah1, setInputValueDaerah1] = useState("");
  const [selectedDaerah1, setSelectedDaerah1] = useState(
    sessionStorage.getItem("namaprovinsi")
  );
  const [openProvinsiDaerah1, setOpenProvinsiDaerah1] = useState(false);
  const [openProvinsiDaerah1Modal, setOpenProvinsiDaerah1Modal] = useState(false);
  const [getInfoProvinsiDaerah1, setGetInfoProvinsiDaerah1] = useState(
    sessionStorage.getItem("idprovinsi")
  );
  const [wilayahIDDaerah1, setWilayahIDDaerah1] = useState(
    sessionStorage.getItem("idwilayah")
  );
  const [wilayahIDDerahSATU, setWilayahIDDaerahSATU] = useState();
  // const [wilayahIDDerahDUA, setWilayahIDDaerahDUA] = useState();
  const [isProvinceDaerah1, setIsProvinceDaerah1] = useState(true);
  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API +
      "/provinces")
      .then((response) => response.json())
      .then((data) => {
        setProvincesDaerah1(data.data);
      });
  }, []);

  ///DROPDOWN PROVINSI D2
  const [provincessDaerah2, setProvincesDaerah2] = useState(null);
  const [inputValueDaerah2, setInputValueDaerah2] = useState("");
  const [selectedDaerah2, setSelectedDaerah2] = useState(
    sessionStorage.getItem("namaprovinsi_berkaca2")
  );
  const [openProvinsiDaerah2, setOpenProvinsiDaerah2] = useState(false);
  const [openProvinsiDaerah2Modal, setOpenProvinsiDaerah2Modal] = useState(false);
  const [getInfoProvinsiDaerah2, setGetInfoProvinsiDaerah2] = useState(
    sessionStorage.getItem("idprovinsi_berkaca2")
  );
  const [wilayahIDDaerah2, setWilayahIDDaerah2] = useState(
    sessionStorage.getItem("idwilayah_berkaca2")
  );
  const [isProvinceDaerah2, setIsProvinceDaerah2] = useState(true);
  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API +
      "/provinces")
      .then((response) => response.json())
      .then((data) => {
        setProvincesDaerah2(data.data);
      });
  }, []);

  ///DROPDOWN KOTA
  const [citiesDaerah1, setCityDaerah1] = useState(null);
  const [inputValueofCityDaerah1, setInputValueofCityDaerah1] = useState("");
  const [selectedCityDaerah1, setSelectedCityDaerah1] = useState(
    sessionStorage.getItem("namakota")
  );
  const [openCityDaerah1, setOpenCityDaerah1] = useState(false);
  const [openCityDaerah1Modal, setOpenCityDaerah1Modal] = useState(false);

  ///DROPDOWN KOTA2
  const [citiesDaerah2, setCityDaerah2] = useState(null);
  const [inputValueofCityDaerah2, setInputValueofCityDaerah2] = useState("");
  const [selectedCityDaerah2, setSelectedCityDaerah2] = useState(
    sessionStorage.getItem("namakota_berkaca2")
  );
  const [openCityDaerah2, setOpenCityDaerah2] = useState(false);
  const [openCityDaerah2Modal, setOpenCityDaerah2Modal] = useState(false);
  const [penduduk, setPenduduk] = useState("");
  const [penduduk2, setPenduduk2] = useState("");

  ///UPDATE DATA KOTA BERDASARKAN DATA PROVINSI
  function updateKotaDaerah1(item, choosed, id) {
    if (item.toLowerCase() !== choosed.toLowerCase()) {
      setSelectedDaerah1(item);
      setOpenProvinsiDaerah1(false);
      setInputValueDaerah1("");
      fetch(
        process.env.REACT_APP_URL_API +
        "/cities?province_id=" + id
      )
        .then((response) => response.json())
        .then((data) => {
          setCityDaerah1(data.data);
        });
    }
  }

  ///UPDATE DATA KOTA BERDASARKAN DATA PROVINSI
  function updateKotaDaerah2(item, choosed, id) {
    if (item.toLowerCase() !== choosed.toLowerCase()) {
      setSelectedDaerah2(item);
      setOpenProvinsiDaerah2(false);
      setInputValueDaerah2("");
      fetch(
        process.env.REACT_APP_URL_API +
        "/cities?province_id=" + id
      )
        .then((response) => response.json())
        .then((data) => {
          setCityDaerah2(data.data);
        });
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("idprovinsi") !== null) {
      fetch(
        process.env.REACT_APP_URL_API +
        "/cities?province_id=" +
        sessionStorage.getItem("idprovinsi")
      )
        .then((response) => response.json())
        .then((data) => {
          setCityDaerah1(data.data);
        });
    }
  }, [sessionStorage.getItem("idprovinsi")]);

  useEffect(() => {
    if (sessionStorage.getItem("idprovinsi_berkaca2") !== null) {
      fetch(
        process.env.REACT_APP_URL_API +
        "/cities?province_id=" +
        sessionStorage.getItem("idprovinsi_berkaca2")
      )
        .then((response) => response.json())
        .then((data) => {
          setCityDaerah2(data.data);
        });
    }
  }, [sessionStorage.getItem("idprovinsi_berkaca2")]);

  const [years, setYears] = useState([]);
  const [inputValueofYears, setInputValueofYears] = useState("");
  const [selectedYears, setSelectedYears] = useState("");
  const [openYears, setOpenYears] = useState(false);
  const [notes, setNotes] = useState("");
  const [notes2, setNotesDua] = useState("");
  const [notes_1, setNotes1] = useState("");
  const [notes_2, setNotes2] = useState("");
  const [notes_1_2, setNotes1_2] = useState("");
  const [notes_2_2, setNotes2_2] = useState("");

  ///UNTUK FILTER MINIMUM TAHUN DAERAH 1
  const [openYearsTS, setOpenYearsTS] = useState(false);
  const [yearsTS, setYearsTS] = useState("");
  const [selectedYearsTS, setSelectedYearsTS] = useState("");
  ///UNTUK FILTER MAKSIMUM TAHUN DAERAH 1
  const [openYearsTS2, setOpenYearsTS2] = useState(false);
  const [yearsTS2, setYearsTS2] = useState("");
  const [selectedYearsTS2, setSelectedYearsTS2] = useState("");
  const [infoDaerah1, setInfoDaerah1] = useState(null);

  ///UNTUK FILTER MINIMUM TAHUN DAERAH 2
  const [openYearsTSD2, setOpenYearsTSD2] = useState(false);
  const [yearsTSD2, setYearsTSD2] = useState("");
  const [selectedYearsTSD2, setSelectedYearsTSD2] = useState("");
  ///UNTUK FILTER MAKSIMUM TAHUN DAERAH 2
  const [openYearsTS2D2, setOpenYearsTS2D2] = useState(false);
  const [yearsTS2D2, setYearsTS2D2] = useState("");
  const [selectedYearsTS2D2, setSelectedYearsTS2D2] = useState("");
  const [infoDaerah2, setInfoDaerah2] = useState(null);

  const [kapitaset1, setKapitaset1] = useState("");
  const [kapitaset2, setKapitaset2] = useState("");

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API +
      "/year")
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

  function updateDaerah1(wilayah_id) {
    fetch(
      process.env.REACT_APP_URL_API +
      "/wilayah-info?lang=en&wilayah_id=" +
      wilayah_id +
      "&tahun=" +
      sessionStorage.getItem("yearss"),
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (sessionStorage.getItem("namawilayah") === "Semua") {
        }
        setInfoDaerah1(result.data.nama);
      });
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [triggerModal, setTriggerModal] = useState(null)

  const isOkeButtonDisabled = selectedCityDaerah1 !== "Semua" && selectedCityDaerah2 === "Semua" || selectedCityDaerah1 === "Semua" && selectedCityDaerah2 !== "Semua" ;
  const isOkeButtonDisabled2 = selectedCityDaerah1 !== "Semua" && selectedCityDaerah2 === "Semua" || selectedCityDaerah1 === "Semua" && selectedCityDaerah2 !== "Semua" ;

  const [prevSelectedCity, setPrevSelectedCity] = useState(selectedCityDaerah1);
  const [prevSelectedProvince, setPrevSelectedProvince] = useState(selectedDaerah1);

  const [prevSelectedCity2, setPrevSelectedCity2] = useState(selectedCityDaerah2);
  const [prevSelectedProvince2, setPrevSelectedProvince2] = useState(selectedDaerah2);

  useEffect(() => {
    setPrevSelectedCity(selectedCityDaerah1);
  }, [selectedCityDaerah1]);
  
  useEffect(() => {
    setPrevSelectedProvince(selectedDaerah1);
  }, [selectedDaerah1]);

  useEffect(() => {
    setPrevSelectedCity2(selectedCityDaerah2);
  }, [selectedCityDaerah2]);
  
  useEffect(() => {
    setPrevSelectedProvince2(selectedDaerah2);
  }, [selectedDaerah2]);

  useEffect(() => {
    if (
      (selectedCityDaerah1 !== "Semua" && selectedCityDaerah2 === "Semua") ||
      (selectedCityDaerah1 === "Semua" && selectedCityDaerah2 !== "Semua")
    ) {
      if (selectedDaerah1 !== prevSelectedProvince || selectedCityDaerah1 !== prevSelectedCity) {
        if (!isModalOpen3 && !isModalOpen2 && !isModalOpen) {
          setIsModalOpen4(true);
        } 
      } 
    }
  }, [selectedCityDaerah1, selectedCityDaerah2, selectedDaerah1, prevSelectedProvince, prevSelectedCity,isModalOpen4]);

  useEffect(() => {
    if (
      (selectedCityDaerah1 !== "Semua" && selectedCityDaerah2 === "Semua") ||
      (selectedCityDaerah1 === "Semua" && selectedCityDaerah2 !== "Semua")
    ) {
      if (selectedDaerah2 !== prevSelectedProvince2 || selectedCityDaerah2 !== prevSelectedCity2) {
        // Pastikan Modal tidak terbuka sebelum membuka Modal 2
        if (!isModalOpen3 && !isModalOpen2 && !isModalOpen4) {
          setIsModalOpen(true);
        } 
      }
    }
  }, [selectedCityDaerah1, selectedCityDaerah2, selectedDaerah2, prevSelectedProvince2, prevSelectedCity2, isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen2) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen2]);

  useEffect(() => {
    if (isModalOpen3) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen3]);

  useEffect(() => {
    if (isModalOpen4) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen4]);

  const [wasTerapkanClickedWhileModalOpen, setWasTerapkanClickedWhileModalOpen] = useState(false);
  const [wasTerapkanClickedWhileModalOpen2, setWasTerapkanClickedWhileModalOpen2] = useState(false);
  const [wasTerapkanClickedWhileModalOpen3, setWasTerapkanClickedWhileModalOpen3] = useState(false);
  const [wasTerapkanClickedWhileModalOpen4, setWasTerapkanClickedWhileModalOpen4] = useState(false);

  useEffect(() => {
    if (wasTerapkanClickedWhileModalOpen) {
      setIsModalOpen2(true);
      setWasTerapkanClickedWhileModalOpen(false);
    }
  }, [wasTerapkanClickedWhileModalOpen]);

  useEffect(() => {
    if (wasTerapkanClickedWhileModalOpen4) {
      setIsModalOpen3(true);
      setWasTerapkanClickedWhileModalOpen4(false);
    }
  }, [wasTerapkanClickedWhileModalOpen4]);
  
  var timerTS;

  const selectedDataBerkaca = JSON.parse(
    sessionStorage.getItem("selectedDataBerkaca")
  );
  const {
    parent_id_1Berkaca,
    dataset_1Berkaca,
    parent_id_2Berkaca,
    dataset_2Berkaca,
    LabelnyaTimeseries_1,
    LabelnyaTimeseries_2,
  } = selectedDataBerkaca;

  const [dataChart, setDataChart] = useState([]);
  const [dataChart2, setDataChart2] = useState([]);

  const [dataChartd2, setDataChartD2] = useState([]);
  const [dataChart2d2, setDataChart2D2] = useState([]);

  const [activeTabMobileDataset, setActiveTabMobileDataset] =
    useState("dataset1");

  const toggleTabMobileDataset = () => {
    setActiveTabMobileDataset(
      activeTabMobileDataset === "dataset1" ? "dataset2" : "dataset1"
    );
  };

  const SwitchBtnDataset = ({ selected, onSelect }) => (
    <div className="switch" onClick={onSelect}>
      <input
        type="checkbox"
        id="toggle"
        checked={selected === "dataset2"}
        readOnly
      />
      <label htmlFor="toggle" className="slider"></label>
    </div>
  );
  const [halaman_timeseries, setHalaman_timeseries] = useState("");
  const [view_info_halaman_timeseries, setView_info_halaman_timeseries] =
    useState(0);
  const [like_info_halaman_timeseries, setLike_info_halaman_timeseries] =
    useState(0);
  const [simpan_info_halaman_timeseries, setSimpan_info_halaman_timeseries] =
    useState(0);
    const [isCountIncrementedTS, setIsCountIncrementedTS] = useState(false);

    const [processedPages, setProcessedPages] = useState({});

    const incrementCount = (kodeHalaman) => {
      setSimpan_info_halaman_timeseries((prev) => prev + 1);
      setProcessedPages((prev) => ({
        ...prev,
        [kodeHalaman]: true,
      }));
    }
  ///TIME SERIES
  const [sumbernya1, setSumbernya1] = useState("");
  const [sumbernya2, setSumbernya2] = useState("");

  useEffect(() => {
    if (selectedYearsTS === "") {
      setYearsTS("2013");
    } else {
      setYearsTS(selectedYearsTS);
    }
  }, [yearsTS, selectedYearsTS]);

  useEffect(() => {
    if (selectedYearsTS2 === "") {
      setYearsTS2("2022");
    } else {
      setYearsTS2(selectedYearsTS2);
    }
  }, [yearsTS2, selectedYearsTS2]);

  // function fetchingTS1(){
  //   if (
  //     dataset_1Berkaca.length !== 0 &&
  //     dataset_2Berkaca.length !== 0 &&
  //     wilayahIDDaerah1 !== null &&
  //     !isModalOpen
      
  //   ) {
  //     var urls =
  //       process.env.REACT_APP_URL_API +
  //       "/berkaca?tahun=semua&&wilayah=[" +
  //       wilayahIDDaerah1 +
  //       "," +
  //       wilayahIDDaerah2 +
  //       "]";
  //     if (typeof dataset_1Berkaca !== "string") {
  //       urls +=
  //         "&dataset_1=[" +
  //         dataset_1Berkaca +
  //         "]&parent_id_1=" +
  //         parent_id_1Berkaca;
  //     } else {
  //       urls += "&dataset_1=" + dataset_1Berkaca + "&parent_id_1=" + parent_id_1Berkaca;
  //     }
  //     // Tambahkan dataset_2 dan parent_id_2 ke URL API
  //     if (typeof dataset_2Berkaca !== "string") {
  //       urls +=
  //         "&dataset_2=[" +
  //         dataset_2Berkaca +
  //         "]&parent_id_2=" +
  //         parent_id_2Berkaca;
  //     } else {
  //       urls += "&dataset_2=" + dataset_2Berkaca + "&parent_id_2=" + parent_id_2Berkaca;
  //     }
  //     // Tambahkan parameter lainnya ke URL jika ada
  //     urls += "&record=false";

  //     fetch(urls)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("HTTP error " + response.status);
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setHalaman_timeseries(data.info.kode);
  //         setView_info_halaman_timeseries(data.info.view);
  //         setLike_info_halaman_timeseries(data.info.like);
  //         setSimpan_info_halaman_timeseries(data.info.simpan);
  //         var datasheet1 = [];
  //         var tahun = [];
  //         var datasheet2 = [];
  //         var tahun2 = [];
  //         var minimumTahun = yearsTS == "" ? 2013 : yearsTS;
  //         var maksimumTahun = yearsTS2 == "" ? 2022 : yearsTS2;
  //         var minimumTahun2 = yearsTS == "" ? 2013 : yearsTS;
  //         var maksimumTahun2 = yearsTS2 == "" ? 2022 : yearsTS2;

  //         const convertToNumber = (str) => {
  //           return parseFloat(str.replace(/\./g, ''));
  //         };

  //         Object.keys(data.data.dataset_1).forEach((item) => {
  //           data.data.dataset_1[item].forEach((list) => {
  //             if (list.id_wilayah == wilayahIDDaerah1) {
  //               if (tahun["" + list.label] == null) {
  //                 var lokalData = list;
  //                 lokalData[LabelnyaTimeseries_1[list.id_bidang]] =
  //                   convertToNumber(lokalData.label_nilai);
  //                 tahun["" + list.label] = lokalData;
  //               } else {
  //                 var lokalData = tahun["" + list.label];
  //                 lokalData[LabelnyaTimeseries_1[list.id_bidang]] =
  //                  convertToNumber(list.label_nilai);
  //                 tahun["" + list.label] = lokalData;
  //               }
  //             }
  //           });
  //         });
  //         Object.keys(tahun).forEach((item) => {
  //           if (item >= minimumTahun && item <= maksimumTahun) {
  //             datasheet1.push(tahun[item]);
  //           }
  //         });
  //         Object.keys(data.data.dataset_2).forEach((item) => {
  //           data.data.dataset_2[item].forEach((list) => {
  //             if (list.id_wilayah == wilayahIDDaerah1) {
  //               if (tahun2["" + list.label] == null) {
  //                 var lokalData = list;
  //                 lokalData[LabelnyaTimeseries_2[list.id_bidang]] =
  //                 convertToNumber(lokalData.label_nilai);
  //                 tahun2["" + list.label] = lokalData;
  //               } else {
  //                 var lokalData = tahun2["" + list.label];
  //                 lokalData[LabelnyaTimeseries_2[list.id_bidang]] =
  //                   convertToNumber(list.label_nilai);
  //                 tahun2["" + list.label] = lokalData;
  //               }
  //             }
  //           });
  //         });
  //         Object.keys(tahun2).forEach((item) => {
  //           if (item >= minimumTahun2 && item <= maksimumTahun2) {
  //             datasheet2.push(tahun2[item]);
  //           }
  //         });
  //         if (datasheet1.length && datasheet2.length > 0) {
  //           setPenduduk(data.jumlah_penduduk);
  //           setDataChart(datasheet1);
  //           setDataChart2(datasheet2);
  //           setSumbernya1(data.sumber1[0]);
  //           setKapitaset1(data.satuan.dataset_1);
  //           setKapitaset2(data.satuan.dataset_2);
  //           setNotes(data.notes1[0]);
  //           setNotesDua(data.notes2[0]);
  //           setNotes1(data.notes_1_wilayah_1);
  //           setNotes2(data.notes_2_wilayah_1);
  //           console.log("datasheet 1 => ", datasheet1);
  //           console.log("datasheet 2 => ", datasheet2);
  //         }
  //         clearTimeout(timerTS);
  //         timerTS = setTimeout(function(){
  //           kategoriRecordTS();
  //           timerTS = null;
  //         }, 7000);
  //       });
  //   } else {
  //     return null;
  //   }
  // }
  // function fetchingTS2(){
  //   if (
  //     dataset_1Berkaca.length !== 0 &&
  //     dataset_2Berkaca.length !== 0 &&
  //     wilayahIDDaerah1 !== null &&
  //     !isModalOpen
      
  //   ) {
  //     var urls =
  //       process.env.REACT_APP_URL_API +
  //       "/berkaca?tahun=semua&&wilayah=[" +
  //       wilayahIDDaerah1 +
  //       "," +
  //       wilayahIDDaerah2 +
  //       "]";
  //     if (typeof dataset_1Berkaca !== "string") {
  //       urls +=
  //         "&dataset_1=[" +
  //         dataset_1Berkaca +
  //         "]&parent_id_1=" +
  //         parent_id_1Berkaca;
  //     } else {
  //       urls += "&dataset_1=" + dataset_1Berkaca + "&parent_id_1=" + parent_id_1Berkaca;
  //     }
  //     // Tambahkan dataset_2 dan parent_id_2 ke URL API
  //     if (typeof dataset_2Berkaca !== "string") {
  //       urls +=
  //         "&dataset_2=[" +
  //         dataset_2Berkaca +
  //         "]&parent_id_2=" +
  //         parent_id_2Berkaca;
  //     } else {
  //       urls += "&dataset_2=" + dataset_2Berkaca + "&parent_id_2=" + parent_id_2Berkaca;
  //     }
  //     // Tambahkan parameter lainnya ke URL jika ada
  //     urls += "&record=false";

  //     fetch(urls)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("HTTP error " + response.status);
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setHalaman_timeseries(data.info.kode);
  //         setView_info_halaman_timeseries(data.info.view);
  //         setLike_info_halaman_timeseries(data.info.like);
  //         setSimpan_info_halaman_timeseries(data.info.simpan);
  //         var datasheet1 = [];
  //         var tahun = [];
  //         var datasheet2 = [];
  //         var tahun2 = [];
  //         var minimumTahun = yearsTS == "" ? 2013 : yearsTS;
  //         var maksimumTahun = yearsTS2 == "" ? 2022 : yearsTS2;
  //         var minimumTahun2 = yearsTS == "" ? 2013 : yearsTS;
  //         var maksimumTahun2 = yearsTS2 == "" ? 2022 : yearsTS2;

  //         const convertToNumber = (str) => {
  //           return parseFloat(str.replace(/\./g, ''));
  //         };

  //         Object.keys(data.data.dataset_1).forEach((item) => {
  //           data.data.dataset_1[item].forEach((list) => {
  //             if (list.id_wilayah == wilayahIDDaerah1) {
  //               if (tahun["" + list.label] == null) {
  //                 var lokalData = list;
  //                 lokalData[LabelnyaTimeseries_1[list.id_bidang]] =
  //                   convertToNumber(lokalData.label_nilai);
  //                 tahun["" + list.label] = lokalData;
  //               } else {
  //                 var lokalData = tahun["" + list.label];
  //                 lokalData[LabelnyaTimeseries_1[list.id_bidang]] =
  //                  convertToNumber(list.label_nilai);
  //                 tahun["" + list.label] = lokalData;
  //               }
  //             }
  //           });
  //         });
  //         Object.keys(tahun).forEach((item) => {
  //           if (item >= minimumTahun && item <= maksimumTahun) {
  //             datasheet1.push(tahun[item]);
  //           }
  //         });
  //         Object.keys(data.data.dataset_2).forEach((item) => {
  //           data.data.dataset_2[item].forEach((list) => {
  //             if (list.id_wilayah == wilayahIDDaerah1) {
  //               if (tahun2["" + list.label] == null) {
  //                 var lokalData = list;
  //                 lokalData[LabelnyaTimeseries_2[list.id_bidang]] =
  //                 convertToNumber(lokalData.label_nilai);
  //                 tahun2["" + list.label] = lokalData;
  //               } else {
  //                 var lokalData = tahun2["" + list.label];
  //                 lokalData[LabelnyaTimeseries_2[list.id_bidang]] =
  //                   convertToNumber(list.label_nilai);
  //                 tahun2["" + list.label] = lokalData;
  //               }
  //             }
  //           });
  //         });
  //         Object.keys(tahun2).forEach((item) => {
  //           if (item >= minimumTahun2 && item <= maksimumTahun2) {
  //             datasheet2.push(tahun2[item]);
  //           }
  //         });
  //         if (datasheet1.length && datasheet2.length > 0) {
  //           setPenduduk(data.jumlah_penduduk);
  //           setDataChart(datasheet1);
  //           setDataChart2(datasheet2);
  //           setSumbernya1(data.sumber1[0]);
  //           setKapitaset1(data.satuan.dataset_1);
  //           setKapitaset2(data.satuan.dataset_2);
  //           setNotes(data.notes1[0]);
  //           setNotesDua(data.notes2[0]);
  //           setNotes1(data.notes_1_wilayah_1);
  //           setNotes2(data.notes_2_wilayah_1);
  //           console.log("datasheet 1 => ", datasheet1);
  //           console.log("datasheet 2 => ", datasheet2);
  //         }
  //       });
  //   } else {
  //     return null;
  //   }
  // }

  // function fetchingTS3(){
  //   if (
  //     dataset_1Berkaca.length !== 0 &&
  //     dataset_2Berkaca.length !== 0 &&
  //     wilayahIDDaerah2 !== null &&
  //     !isModalOpen2
  //   ) {
  //     var urls =
  //       process.env.REACT_APP_URL_API +
  //       "/berkaca?tahun=semua&&wilayah=[" +
  //       wilayahIDDaerah1 +
  //       "," +
  //       wilayahIDDaerah2 +
  //       "]";
  //     if (typeof dataset_1Berkaca !== "string") {
  //       urls +=
  //         "&dataset_1=[" +
  //         dataset_1Berkaca +
  //         "]&parent_id_1=" +
  //         parent_id_1Berkaca;
  //     } else {
  //       urls += "&dataset_1=" + dataset_1Berkaca + "&parent_id_1=" + parent_id_1Berkaca;
  //     }
  //     // Tambahkan dataset_2 dan parent_id_2 ke URL API
  //     if (typeof dataset_2Berkaca !== "string") {
  //       urls +=
  //         "&dataset_2=[" +
  //         dataset_2Berkaca +
  //         "]&parent_id_2=" +
  //         parent_id_2Berkaca;
  //     } else {
  //       urls += "&dataset_2=" + dataset_2Berkaca + "&parent_id_2=" + parent_id_2Berkaca;
  //     }
  //     // Tambahkan parameter lainnya ke URL jika ada
  //     urls += "&record=false";
  //     fetch(urls)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("HTTP error " + response.status);
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setHalaman_timeseries(data.info.kode);
  //         setView_info_halaman_timeseries(data.info.view);
  //         setLike_info_halaman_timeseries(data.info.like);
  //         setSimpan_info_halaman_timeseries(data.info.simpan);
  //         var datasheet1D2 = [];
  //         var tahunD2 = [];
  //         var datasheet2D2 = [];
  //         var tahun2D2 = [];
  //         var minimumTahunD2 = yearsTS == "" ? 2013 : yearsTS;
  //         var maksimumTahunD2 = yearsTS2 == "" ? 2022 : yearsTS2;

  //         const convertToNumber = (str) => {
  //           return parseFloat(str.replace(/\./g, ''));
  //         };
          
  //         Object.keys(data.data.dataset_1).forEach((item) => {
  //           data.data.dataset_1[item].forEach((list) => {
  //             if (list.id_wilayah == wilayahIDDaerah2) {
  //               if (tahunD2["" + list.label] == null) {
  //                 var lokalDataD2 = list;
  //                 lokalDataD2[LabelnyaTimeseries_1[list.id_bidang]] =
  //                   convertToNumber(lokalDataD2.label_nilai);
  //                 tahunD2["" + list.label] = lokalDataD2;
  //               } else {
  //                 var lokalDataD2 = tahunD2["" + list.label];
  //                 lokalDataD2[LabelnyaTimeseries_1[list.id_bidang]] =
  //                   convertToNumber(list.label_nilai);
  //                 tahunD2["" + list.label] = lokalDataD2;
  //               }
  //             }
  //           });
  //         });
  //         Object.keys(tahunD2).forEach((item) => {
  //           if (item >= minimumTahunD2 && item <= maksimumTahunD2) {
  //             datasheet1D2.push(tahunD2[item]);
  //           }
  //         });
  //         Object.keys(data.data.dataset_2).forEach((item) => {
  //           data.data.dataset_2[item].forEach((list) => {
  //             if (list.id_wilayah == wilayahIDDaerah2) {
  //               if (tahun2D2["" + list.label] == null) {
  //                 var lokalDataD2 = list;
  //                 lokalDataD2[LabelnyaTimeseries_2[list.id_bidang]] =
  //                   convertToNumber(lokalDataD2.label_nilai);
  //                 tahun2D2["" + list.label] = lokalDataD2;
  //               } else {
  //                 var lokalDataD2 = tahun2D2["" + list.label];
  //                 lokalDataD2[LabelnyaTimeseries_2[list.id_bidang]] =
  //                   convertToNumber(list.label_nilai);
  //                 tahun2D2["" + list.label] = lokalDataD2;
  //               }
  //             }
  //           });
  //         });
  //         Object.keys(tahun2D2).forEach((item) => {
  //           if (item >= minimumTahunD2 && item <= maksimumTahunD2) {
  //             datasheet2D2.push(tahun2D2[item]);
  //           }
  //         });
  //         if (datasheet1D2.length && datasheet2D2.length > 0) {
  //           setPenduduk2(data.jumlah_penduduk);
  //           setDataChartD2(datasheet1D2);
  //           setDataChart2D2(datasheet2D2);
  //           setSumbernya2(data.sumber2[0]);
  //           setNotes1_2(data.notes_1_wilayah_2);
  //           setNotes2_2(data.notes_2_wilayah_2);

  //         }
  //         clearTimeout(timerTS);
  //         timerTS = setTimeout(function(){
  //           kategoriRecordTS();
  //           timerTS = null;
  //         }, 7000);
  //       });
  //   } else {
  //     return null;
  //   }
  // }
  // function fetchingTS4(){
  //   if (
  //     dataset_1Berkaca.length !== 0 &&
  //     dataset_2Berkaca.length !== 0 &&
  //     wilayahIDDaerah2 !== null &&
  //     !isModalOpen2
  //   ) {
  //     var urls =
  //       process.env.REACT_APP_URL_API +
  //       "/berkaca?tahun=semua&&wilayah=[" +
  //       wilayahIDDaerah1 +
  //       "," +
  //       wilayahIDDaerah2 +
  //       "]";
  //     if (typeof dataset_1Berkaca !== "string") {
  //       urls +=
  //         "&dataset_1=[" +
  //         dataset_1Berkaca +
  //         "]&parent_id_1=" +
  //         parent_id_1Berkaca;
  //     } else {
  //       urls += "&dataset_1=" + dataset_1Berkaca + "&parent_id_1=" + parent_id_1Berkaca;
  //     }
  //     // Tambahkan dataset_2 dan parent_id_2 ke URL API
  //     if (typeof dataset_2Berkaca !== "string") {
  //       urls +=
  //         "&dataset_2=[" +
  //         dataset_2Berkaca +
  //         "]&parent_id_2=" +
  //         parent_id_2Berkaca;
  //     } else {
  //       urls += "&dataset_2=" + dataset_2Berkaca + "&parent_id_2=" + parent_id_2Berkaca;
  //     }
  //     // Tambahkan parameter lainnya ke URL jika ada
  //     urls += "&record=false";
  //     fetch(urls)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("HTTP error " + response.status);
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setHalaman_timeseries(data.info.kode);
  //         setView_info_halaman_timeseries(data.info.view);
  //         setLike_info_halaman_timeseries(data.info.like);
  //         setSimpan_info_halaman_timeseries(data.info.simpan);
  //         var datasheet1D2 = [];
  //         var tahunD2 = [];
  //         var datasheet2D2 = [];
  //         var tahun2D2 = [];
  //         var minimumTahunD2 = yearsTS == "" ? 2013 : yearsTS;
  //         var maksimumTahunD2 = yearsTS2 == "" ? 2022 : yearsTS2;

  //         const convertToNumber = (str) => {
  //           return parseFloat(str.replace(/\./g, ''));
  //         };
          
  //         Object.keys(data.data.dataset_1).forEach((item) => {
  //           data.data.dataset_1[item].forEach((list) => {
  //             if (list.id_wilayah == wilayahIDDaerah2) {
  //               if (tahunD2["" + list.label] == null) {
  //                 var lokalDataD2 = list;
  //                 lokalDataD2[LabelnyaTimeseries_1[list.id_bidang]] =
  //                   convertToNumber(lokalDataD2.label_nilai);
  //                 tahunD2["" + list.label] = lokalDataD2;
  //               } else {
  //                 var lokalDataD2 = tahunD2["" + list.label];
  //                 lokalDataD2[LabelnyaTimeseries_1[list.id_bidang]] =
  //                   convertToNumber(list.label_nilai);
  //                 tahunD2["" + list.label] = lokalDataD2;
  //               }
  //             }
  //           });
  //         });
  //         Object.keys(tahunD2).forEach((item) => {
  //           if (item >= minimumTahunD2 && item <= maksimumTahunD2) {
  //             datasheet1D2.push(tahunD2[item]);
  //           }
  //         });
  //         Object.keys(data.data.dataset_2).forEach((item) => {
  //           data.data.dataset_2[item].forEach((list) => {
  //             if (list.id_wilayah == wilayahIDDaerah2) {
  //               if (tahun2D2["" + list.label] == null) {
  //                 var lokalDataD2 = list;
  //                 lokalDataD2[LabelnyaTimeseries_2[list.id_bidang]] =
  //                   convertToNumber(lokalDataD2.label_nilai);
  //                 tahun2D2["" + list.label] = lokalDataD2;
  //               } else {
  //                 var lokalDataD2 = tahun2D2["" + list.label];
  //                 lokalDataD2[LabelnyaTimeseries_2[list.id_bidang]] =
  //                   convertToNumber(list.label_nilai);
  //                 tahun2D2["" + list.label] = lokalDataD2;
  //               }
  //             }
  //           });
  //         });
  //         Object.keys(tahun2D2).forEach((item) => {
  //           if (item >= minimumTahunD2 && item <= maksimumTahunD2) {
  //             datasheet2D2.push(tahun2D2[item]);
  //           }
  //         });
  //         if (datasheet1D2.length && datasheet2D2.length > 0) {
  //           setPenduduk2(data.jumlah_penduduk);
  //           setDataChartD2(datasheet1D2);
  //           setDataChart2D2(datasheet2D2);
  //           setSumbernya2(data.sumber2[0]);
  //           setNotes1_2(data.notes_1_wilayah_2);
  //           setNotes2_2(data.notes_2_wilayah_2);

  //         }
  //       });
  //   } else {
  //     return null;
  //   }
  // }

  // useEffect(()=>{
  //   if ((selectedCityDaerah1 == "Semua" && selectedCityDaerah2 == "Semua") || (selectedCityDaerah1 == "Semua" && selectedCityDaerah2 == "Semua")){
  //     fetchingTS1();
  //     fetchingTS2();
  //     fetchingTS3();
  //     fetchingTS4();
  //   }
  // },[selectedCityDaerah1, selectedCityDaerah2])
  
  useEffect(() => {
    if (
      dataset_1Berkaca.length !== 0 &&
      dataset_2Berkaca.length !== 0 &&
      wilayahIDDaerah1 !== null &&
      !isModalOpen && !isModalOpen3
      
    ) {
      if (wilayahIDDerahSATU == "Semua" && selectedCityDaerah2 != "Semua" ){
        // return;
      }
      else if (wilayahIDDerahSATU != "Semua" && selectedCityDaerah2 == "Semua"){
        // return;
      } else {
        var urls =
          process.env.REACT_APP_URL_API +
          "/berkaca?tahun=semua&&wilayah=[" +
          wilayahIDDaerah1 +
          "," +
          wilayahIDDaerah2 +
          "]";
        if (typeof dataset_1Berkaca !== "string") {
          urls +=
            "&dataset_1=[" +
            dataset_1Berkaca +
            "]&parent_id_1=" +
            parent_id_1Berkaca;
        } else {
          urls += "&dataset_1=" + dataset_1Berkaca + "&parent_id_1=" + parent_id_1Berkaca;
        }
        // Tambahkan dataset_2 dan parent_id_2 ke URL API
        if (typeof dataset_2Berkaca !== "string") {
          urls +=
            "&dataset_2=[" +
            dataset_2Berkaca +
            "]&parent_id_2=" +
            parent_id_2Berkaca;
        } else {
          urls += "&dataset_2=" + dataset_2Berkaca + "&parent_id_2=" + parent_id_2Berkaca;
        }
        // Tambahkan parameter lainnya ke URL jika ada
        urls += "&record=false";

        fetch(urls)
          .then((response) => {
            if (!response.ok) {
              throw new Error("HTTP error " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            setHalaman_timeseries(data.info.kode);
            setView_info_halaman_timeseries(data.info.view);
            setLike_info_halaman_timeseries(data.info.like);
            setSimpan_info_halaman_timeseries(data.info.simpan);
            var datasheet1 = [];
            var tahun = [];
            var datasheet2 = [];
            var tahun2 = [];
            var minimumTahun = yearsTS == "" ? 2013 : yearsTS;
            var maksimumTahun = yearsTS2 == "" ? 2022 : yearsTS2;
            var minimumTahun2 = yearsTS == "" ? 2013 : yearsTS;
            var maksimumTahun2 = yearsTS2 == "" ? 2022 : yearsTS2;

            const convertToNumber = (str) => {
              return parseFloat(str.replace(/\./g, ''));
            };

            Object.keys(data.data.dataset_1).forEach((item) => {
              data.data.dataset_1[item].forEach((list) => {
                if (list.id_wilayah == wilayahIDDaerah1) {
                  if (tahun["" + list.label] == null) {
                    var lokalData = list;
                    lokalData[LabelnyaTimeseries_1[list.id_bidang]] =
                      convertToNumber(lokalData.label_nilai);
                    tahun["" + list.label] = lokalData;
                  } else {
                    var lokalData = tahun["" + list.label];
                    lokalData[LabelnyaTimeseries_1[list.id_bidang]] =
                    convertToNumber(list.label_nilai);
                    tahun["" + list.label] = lokalData;
                  }
                }
              });
            });
            Object.keys(tahun).forEach((item) => {
              if (item >= minimumTahun && item <= maksimumTahun) {
                datasheet1.push(tahun[item]);
              }
            });
            Object.keys(data.data.dataset_2).forEach((item) => {
              data.data.dataset_2[item].forEach((list) => {
                if (list.id_wilayah == wilayahIDDaerah1) {
                  if (tahun2["" + list.label] == null) {
                    var lokalData = list;
                    lokalData[LabelnyaTimeseries_2[list.id_bidang]] =
                    convertToNumber(lokalData.label_nilai);
                    tahun2["" + list.label] = lokalData;
                  } else {
                    var lokalData = tahun2["" + list.label];
                    lokalData[LabelnyaTimeseries_2[list.id_bidang]] =
                      convertToNumber(list.label_nilai);
                    tahun2["" + list.label] = lokalData;
                  }
                }
              });
            });
            Object.keys(tahun2).forEach((item) => {
              if (item >= minimumTahun2 && item <= maksimumTahun2) {
                datasheet2.push(tahun2[item]);
              }
            });
            if (datasheet1.length && datasheet2.length > 0) {
              setPenduduk(data.jumlah_penduduk);
              setDataChart(datasheet1);
              setDataChart2(datasheet2);
              setSumbernya1(data.sumber1[0]);
              setKapitaset1(data.satuan.dataset_1);
              setKapitaset2(data.satuan.dataset_2);
              setNotes(data.notes1[0]);
              setNotesDua(data.notes2[0]);
              setNotes1(data.notes_1_wilayah_1);
              setNotes2(data.notes_2_wilayah_1);
              console.log("datasheet 1 => ", datasheet1);
              console.log("datasheet 2 => ", datasheet2);
            }
            clearTimeout(timerTS);
            timerTS = setTimeout(function(){
              kategoriRecordTS();
              timerTS = null;
            }, 7000);
          });
      }
      
    } else {
      // return null;
    }
  }, [wilayahIDDaerah1,wilayahIDDaerah2,wilayahIDDerahSATU]);

  useEffect(() => {
    if (
      dataset_1Berkaca.length !== 0 &&
      dataset_2Berkaca.length !== 0 &&
      wilayahIDDaerah1 !== null &&
      !isModalOpen && !isModalOpen3
      
    ) {
      var urls =
        process.env.REACT_APP_URL_API +
        "/berkaca?tahun=semua&&wilayah=[" +
        wilayahIDDaerah1 +
        "," +
        wilayahIDDaerah2 +
        "]";
      if (typeof dataset_1Berkaca !== "string") {
        urls +=
          "&dataset_1=[" +
          dataset_1Berkaca +
          "]&parent_id_1=" +
          parent_id_1Berkaca;
      } else {
        urls += "&dataset_1=" + dataset_1Berkaca + "&parent_id_1=" + parent_id_1Berkaca;
      }
      // Tambahkan dataset_2 dan parent_id_2 ke URL API
      if (typeof dataset_2Berkaca !== "string") {
        urls +=
          "&dataset_2=[" +
          dataset_2Berkaca +
          "]&parent_id_2=" +
          parent_id_2Berkaca;
      } else {
        urls += "&dataset_2=" + dataset_2Berkaca + "&parent_id_2=" + parent_id_2Berkaca;
      }
      // Tambahkan parameter lainnya ke URL jika ada
      urls += "&record=false";

      fetch(urls)
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          setHalaman_timeseries(data.info.kode);
          setView_info_halaman_timeseries(data.info.view);
          setLike_info_halaman_timeseries(data.info.like);
          setSimpan_info_halaman_timeseries(data.info.simpan);
          var datasheet1 = [];
          var tahun = [];
          var datasheet2 = [];
          var tahun2 = [];
          var minimumTahun = yearsTS == "" ? 2013 : yearsTS;
          var maksimumTahun = yearsTS2 == "" ? 2022 : yearsTS2;
          var minimumTahun2 = yearsTS == "" ? 2013 : yearsTS;
          var maksimumTahun2 = yearsTS2 == "" ? 2022 : yearsTS2;

          const convertToNumber = (str) => {
            return parseFloat(str.replace(/\./g, ''));
          };

          Object.keys(data.data.dataset_1).forEach((item) => {
            data.data.dataset_1[item].forEach((list) => {
              if (list.id_wilayah == wilayahIDDaerah1) {
                if (tahun["" + list.label] == null) {
                  var lokalData = list;
                  lokalData[LabelnyaTimeseries_1[list.id_bidang]] =
                    convertToNumber(lokalData.label_nilai);
                  tahun["" + list.label] = lokalData;
                } else {
                  var lokalData = tahun["" + list.label];
                  lokalData[LabelnyaTimeseries_1[list.id_bidang]] =
                   convertToNumber(list.label_nilai);
                  tahun["" + list.label] = lokalData;
                }
              }
            });
          });
          Object.keys(tahun).forEach((item) => {
            if (item >= minimumTahun && item <= maksimumTahun) {
              datasheet1.push(tahun[item]);
            }
          });
          Object.keys(data.data.dataset_2).forEach((item) => {
            data.data.dataset_2[item].forEach((list) => {
              if (list.id_wilayah == wilayahIDDaerah1) {
                if (tahun2["" + list.label] == null) {
                  var lokalData = list;
                  lokalData[LabelnyaTimeseries_2[list.id_bidang]] =
                  convertToNumber(lokalData.label_nilai);
                  tahun2["" + list.label] = lokalData;
                } else {
                  var lokalData = tahun2["" + list.label];
                  lokalData[LabelnyaTimeseries_2[list.id_bidang]] =
                    convertToNumber(list.label_nilai);
                  tahun2["" + list.label] = lokalData;
                }
              }
            });
          });
          Object.keys(tahun2).forEach((item) => {
            if (item >= minimumTahun2 && item <= maksimumTahun2) {
              datasheet2.push(tahun2[item]);
            }
          });
          if (datasheet1.length && datasheet2.length > 0) {
            setPenduduk(data.jumlah_penduduk);
            setDataChart(datasheet1);
            setDataChart2(datasheet2);
            setSumbernya1(data.sumber1[0]);
            setKapitaset1(data.satuan.dataset_1);
            setKapitaset2(data.satuan.dataset_2);
            setNotes(data.notes1[0]);
            setNotesDua(data.notes2[0]);
            setNotes1(data.notes_1_wilayah_1);
            setNotes2(data.notes_2_wilayah_1);
            console.log("datasheet 1 => ", datasheet1);
            console.log("datasheet 2 => ", datasheet2);
          }
        });
    } else {
      // return null;
    }
  }, [yearsTS, yearsTS2]);

  useEffect(() => {
    if (
      dataset_1Berkaca.length !== 0 &&
      dataset_2Berkaca.length !== 0 &&
      wilayahIDDaerah2 !== null &&
      !isModalOpen2 && !isModalOpen4
    ) {
      
      var urls =
        process.env.REACT_APP_URL_API +
        "/berkaca?tahun=semua&&wilayah=[" +
        wilayahIDDaerah1 +
        "," +
        wilayahIDDaerah2 +
        "]";
      if (typeof dataset_1Berkaca !== "string") {
        urls +=
          "&dataset_1=[" +
          dataset_1Berkaca +
          "]&parent_id_1=" +
          parent_id_1Berkaca;
      } else {
        urls += "&dataset_1=" + dataset_1Berkaca + "&parent_id_1=" + parent_id_1Berkaca;
      }
      // Tambahkan dataset_2 dan parent_id_2 ke URL API
      if (typeof dataset_2Berkaca !== "string") {
        urls +=
          "&dataset_2=[" +
          dataset_2Berkaca +
          "]&parent_id_2=" +
          parent_id_2Berkaca;
      } else {
        urls += "&dataset_2=" + dataset_2Berkaca + "&parent_id_2=" + parent_id_2Berkaca;
      }
      // Tambahkan parameter lainnya ke URL jika ada
      urls += "&record=false";
      fetch(urls)
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          setHalaman_timeseries(data.info.kode);
          setView_info_halaman_timeseries(data.info.view);
          setLike_info_halaman_timeseries(data.info.like);
          setSimpan_info_halaman_timeseries(data.info.simpan);
          var datasheet1D2 = [];
          var tahunD2 = [];
          var datasheet2D2 = [];
          var tahun2D2 = [];
          var minimumTahunD2 = yearsTS == "" ? 2013 : yearsTS;
          var maksimumTahunD2 = yearsTS2 == "" ? 2022 : yearsTS2;

          const convertToNumber = (str) => {
            return parseFloat(str.replace(/\./g, ''));
          };
          
          Object.keys(data.data.dataset_1).forEach((item) => {
            data.data.dataset_1[item].forEach((list) => {
              if (list.id_wilayah == wilayahIDDaerah2) {
                if (tahunD2["" + list.label] == null) {
                  var lokalDataD2 = list;
                  lokalDataD2[LabelnyaTimeseries_1[list.id_bidang]] =
                    convertToNumber(lokalDataD2.label_nilai);
                  tahunD2["" + list.label] = lokalDataD2;
                } else {
                  var lokalDataD2 = tahunD2["" + list.label];
                  lokalDataD2[LabelnyaTimeseries_1[list.id_bidang]] =
                    convertToNumber(list.label_nilai);
                  tahunD2["" + list.label] = lokalDataD2;
                }
              }
            });
          });
          Object.keys(tahunD2).forEach((item) => {
            if (item >= minimumTahunD2 && item <= maksimumTahunD2) {
              datasheet1D2.push(tahunD2[item]);
            }
          });
          Object.keys(data.data.dataset_2).forEach((item) => {
            data.data.dataset_2[item].forEach((list) => {
              if (list.id_wilayah == wilayahIDDaerah2) {
                if (tahun2D2["" + list.label] == null) {
                  var lokalDataD2 = list;
                  lokalDataD2[LabelnyaTimeseries_2[list.id_bidang]] =
                    convertToNumber(lokalDataD2.label_nilai);
                  tahun2D2["" + list.label] = lokalDataD2;
                } else {
                  var lokalDataD2 = tahun2D2["" + list.label];
                  lokalDataD2[LabelnyaTimeseries_2[list.id_bidang]] =
                    convertToNumber(list.label_nilai);
                  tahun2D2["" + list.label] = lokalDataD2;
                }
              }
            });
          });
          Object.keys(tahun2D2).forEach((item) => {
            if (item >= minimumTahunD2 && item <= maksimumTahunD2) {
              datasheet2D2.push(tahun2D2[item]);
            }
          });
          if (datasheet1D2.length && datasheet2D2.length > 0) {
            setPenduduk2(data.jumlah_penduduk);
            setDataChartD2(datasheet1D2);
            setDataChart2D2(datasheet2D2);
            setSumbernya2(data.sumber2[0]);
            setNotes1_2(data.notes_1_wilayah_2);
            setNotes2_2(data.notes_2_wilayah_2);

          }
          clearTimeout(timerTS);
          timerTS = setTimeout(function(){
            kategoriRecordTS();
            timerTS = null;
          }, 7000);
        });
    } else {
      // return null;
    }
  }, [wilayahIDDaerah1,wilayahIDDaerah2,wilayahIDDerahSATU]);

  useEffect(() => {
    if (
      dataset_1Berkaca.length !== 0 &&
      dataset_2Berkaca.length !== 0 &&
      wilayahIDDaerah2 !== null &&
      !isModalOpen2 && !isModalOpen4
    ) {
      var urls =
        process.env.REACT_APP_URL_API +
        "/berkaca?tahun=semua&&wilayah=[" +
        wilayahIDDaerah1 +
        "," +
        wilayahIDDaerah2 +
        "]";
      if (typeof dataset_1Berkaca !== "string") {
        urls +=
          "&dataset_1=[" +
          dataset_1Berkaca +
          "]&parent_id_1=" +
          parent_id_1Berkaca;
      } else {
        urls += "&dataset_1=" + dataset_1Berkaca + "&parent_id_1=" + parent_id_1Berkaca;
      }
      // Tambahkan dataset_2 dan parent_id_2 ke URL API
      if (typeof dataset_2Berkaca !== "string") {
        urls +=
          "&dataset_2=[" +
          dataset_2Berkaca +
          "]&parent_id_2=" +
          parent_id_2Berkaca;
      } else {
        urls += "&dataset_2=" + dataset_2Berkaca + "&parent_id_2=" + parent_id_2Berkaca;
      }
      // Tambahkan parameter lainnya ke URL jika ada
      urls += "&record=false";
      fetch(urls)
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          setHalaman_timeseries(data.info.kode);
          setView_info_halaman_timeseries(data.info.view);
          setLike_info_halaman_timeseries(data.info.like);
          setSimpan_info_halaman_timeseries(data.info.simpan);
          var datasheet1D2 = [];
          var tahunD2 = [];
          var datasheet2D2 = [];
          var tahun2D2 = [];
          var minimumTahunD2 = yearsTS == "" ? 2013 : yearsTS;
          var maksimumTahunD2 = yearsTS2 == "" ? 2022 : yearsTS2;

          const convertToNumber = (str) => {
            return parseFloat(str.replace(/\./g, ''));
          };
          
          Object.keys(data.data.dataset_1).forEach((item) => {
            data.data.dataset_1[item].forEach((list) => {
              if (list.id_wilayah == wilayahIDDaerah2) {
                if (tahunD2["" + list.label] == null) {
                  var lokalDataD2 = list;
                  lokalDataD2[LabelnyaTimeseries_1[list.id_bidang]] =
                    convertToNumber(lokalDataD2.label_nilai);
                  tahunD2["" + list.label] = lokalDataD2;
                } else {
                  var lokalDataD2 = tahunD2["" + list.label];
                  lokalDataD2[LabelnyaTimeseries_1[list.id_bidang]] =
                    convertToNumber(list.label_nilai);
                  tahunD2["" + list.label] = lokalDataD2;
                }
              }
            });
          });
          Object.keys(tahunD2).forEach((item) => {
            if (item >= minimumTahunD2 && item <= maksimumTahunD2) {
              datasheet1D2.push(tahunD2[item]);
            }
          });
          Object.keys(data.data.dataset_2).forEach((item) => {
            data.data.dataset_2[item].forEach((list) => {
              if (list.id_wilayah == wilayahIDDaerah2) {
                if (tahun2D2["" + list.label] == null) {
                  var lokalDataD2 = list;
                  lokalDataD2[LabelnyaTimeseries_2[list.id_bidang]] =
                    convertToNumber(lokalDataD2.label_nilai);
                  tahun2D2["" + list.label] = lokalDataD2;
                } else {
                  var lokalDataD2 = tahun2D2["" + list.label];
                  lokalDataD2[LabelnyaTimeseries_2[list.id_bidang]] =
                    convertToNumber(list.label_nilai);
                  tahun2D2["" + list.label] = lokalDataD2;
                }
              }
            });
          });
          Object.keys(tahun2D2).forEach((item) => {
            if (item >= minimumTahunD2 && item <= maksimumTahunD2) {
              datasheet2D2.push(tahun2D2[item]);
            }
          });
          if (datasheet1D2.length && datasheet2D2.length > 0) {
            setPenduduk2(data.jumlah_penduduk);
            setDataChartD2(datasheet1D2);
            setDataChart2D2(datasheet2D2);
            setSumbernya2(data.sumber2[0]);
            setNotes1_2(data.notes_1_wilayah_2);
            setNotes2_2(data.notes_2_wilayah_2);

          }
        });
    } else {
      return null;
    }
  }, [yearsTS, yearsTS2]);

  function kategoriRecordTS(){
    var params = new URLSearchParams();
    const myHeaders = new Headers();
    if(sessionStorage.getItem("token") !== null){
      myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
    }
    const requestnya = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    params.append("tahun", "semua");
    let wilayahArray = [wilayahIDDaerah1, wilayahIDDaerah2];
    // Menggabungkan array menjadi string untuk dikirim dalam parameter URL
    params.append("wilayah", JSON.stringify(wilayahArray));
    params.append("parent_id_1", parent_id_1Berkaca);
    if (typeof dataset_1Berkaca !== "string") {
      params.append("dataset_1","[" + dataset_1Berkaca + "]");
    } else {
      params.append("dataset_1", dataset_1Berkaca);
    }

    params.append("parent_id_2", parent_id_2Berkaca);

    if (typeof dataset_2Berkaca !== "string") {
      params.append("dataset_2","[" + dataset_2Berkaca + "]");  
    } else {
      params.append("dataset_2", dataset_2Berkaca);  
    }
    
    if(sessionStorage.getItem("token") !== null){
      params.append("record", true);
    }
    
    fetch(
      process.env.REACT_APP_URL_API+"/berkaca?" + params.toString(),
      requestnya
    )
      .then((response) => response.json())
      .then((result) => {
        setView_info_halaman_timeseries(result.info.view);
      });
  }

  function kategoriSimpanTS(){
    var params = new URLSearchParams();
    const myHeaders = new Headers();
    if(sessionStorage.getItem("token") !== null){
      myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
    }
    const requestnya = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    params.append("tahun", "semua");
    let wilayahArray = [wilayahIDDaerah1, wilayahIDDaerah2];
    // Menggabungkan array menjadi string untuk dikirim dalam parameter URL
    params.append("wilayah", JSON.stringify(wilayahArray));
    params.append("parent_id_1", parent_id_1Berkaca);
    if (typeof dataset_1Berkaca !== "string") {
      params.append("dataset_1","[" + dataset_1Berkaca + "]");
    } else {
      params.append("dataset_1", dataset_1Berkaca);
    }

    params.append("parent_id_2", parent_id_2Berkaca);

    if (typeof dataset_2Berkaca !== "string") {
      params.append("dataset_2","[" + dataset_2Berkaca + "]");  
    } else {
      params.append("dataset_2", dataset_2Berkaca);  
    }
    
    if(sessionStorage.getItem("token") !== null){
      params.append("record", true);
    }
    
    fetch(
      process.env.REACT_APP_URL_API+"/berkaca?" + params.toString(),
      requestnya
    )
      .then((response) => response.json())
      .then((result) => {
        setSimpan_info_halaman_timeseries(result.info.view);
      });
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            borderRadius: '8px',
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p className="label">{`${label}`}</p>
          <ul>
            {payload.map((entry, index) => (
              <li key={`item-${index}`} style={{ color: entry.color }}>
                {`${entry.name}: ${Math.round(entry.value).toLocaleString().replace(/,/g, '.')}`}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  function GrafikD1() {
    const [lihatLegend, setLihatLegend] = useState(false);
    const maksimalTampil = 3;
    const toggleLihatLengkap = () => {
      setLihatLegend(!lihatLegend);
    };
    const [lihatLegend2, setLihatLegend2] = useState(false);
    const toggleLihatLengkap2 = () => {
      setLihatLegend2(!lihatLegend2);
    };
    const TSCOLOR = [
      "#94DEFF",
      "#41B8D5",
      "#2D8BBA",
      "#2F5F98",
      "#545674",
      "#895273",
      "#B97286",
      "#FE9273",
      "#FF6C35",
      "#D15737",
      "#A84520",
      "#894A33",
      "#623626",
      "#3B2723",
      "#4B3657",
      "#545674",
      "#7D6284",
      "#9674C2",
      "#6E5BAD",
      "#487FAC",
      "#28577D",
      "#2B6D6D",
      "#398B90",
      "#4AB887",
      "#740589",
      "#299B68",
      "#86C81A",
      "#FFD04C",
      "#FF8D16",
      "#DF7200",

      "#94DEFF",
      "#41B8D5",
      "#2D8BBA",
      "#2F5F98",
      "#545674",
      "#895273",
      "#B97286",
      "#FE9273",
      "#FF6C35",
      "#D15737",
      "#A84520",
      "#894A33",
      "#623626",
      "#3B2723",
      "#4B3657",
      "#545674",
      "#7D6284",
      "#9674C2",
      "#6E5BAD",
      "#487FAC",
      "#28577D",
      "#2B6D6D",
      "#398B90",
      "#4AB887",
      "#740589",
      "#299B68",
      "#86C81A",
      "#FFD04C",
      "#FF8D16",
      "#DF7200",
    ];
    const TSCOLOR2 = [
      "#DF7200",
      "#FF8D16",
      "#FFD04C",
      "#86C81A",
      "#299B68",
      "#740589",
      "#4AB887",
      "#398B90",
      "#2B6D6D",
      "#28577D",
      "#487FAC",
      "#6E5BAD",
      "#9674C2",
      "#7D6284",
      "#545674",
      "#4B3657",
      "#3B2723",
      "#623626",
      "#894A33",
      "#A84520",
      "#D15737",
      "#FF6C35",
      "#FE9273",
      "#B97286",
      "#895273",
      "#545674",
      "#2F5F98",
      "#2D8BBA",
      "#41B8D5",
      "#94DEFF",

      "#DF7200",
      "#FF8D16",
      "#FFD04C",
      "#86C81A",
      "#299B68",
      "#740589",
      "#4AB887",
      "#398B90",
      "#2B6D6D",
      "#28577D",
      "#487FAC",
      "#6E5BAD",
      "#9674C2",
      "#7D6284",
      "#545674",
      "#4B3657",
      "#3B2723",
      "#623626",
      "#894A33",
      "#A84520",
      "#D15737",
      "#FF6C35",
      "#FE9273",
      "#B97286",
      "#895273",
      "#545674",
      "#2F5F98",
      "#2D8BBA",
      "#41B8D5",
      "#94DEFF",
    ];

    const disableYear = (year) => {
      return year < parseInt(selectedYearsTS)
        ? "cursor-not-allowed opacity-50"
        : "";
    };
    const disableYear2 = (year) => {
      return year > parseInt(selectedYearsTS2)
        ? "cursor-not-allowed opacity-50"
        : "";
    };
    var lebarnyaGrafik;
    if (yearsTS === "2013" && yearsTS2 === "2022") {
      lebarnyaGrafik = 800;
    } else {
      lebarnyaGrafik = 600;
    }

    ///DAERAH 2
    const [lihatLegendD2, setLihatLegendD2] = useState(false);
    const maksimalTampilD2 = 3;
    const toggleLihatLengkapD2 = () => {
      setLihatLegendD2(!lihatLegendD2);
    };
    const [lihatLegend2D2, setLihatLegend2D2] = useState(false);
    const toggleLihatLengkap2D2 = () => {
      setLihatLegend2D2(!lihatLegend2D2);
    };


    return (
      <section>
        <div className="flex mt-[30px] mx-auto items-center justify-center">
          <div className="relative cursor-pointer w-[120px] font-medium text-[14px] text-secondary">
            <div
              onClick={() => setOpenYearsTS(!openYearsTS)}
              className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
            >
              {selectedYearsTS ? selectedYearsTS : "Tahun"}
              <FontAwesomeIcon
                icon={faChevronDown}
                color="#24445A"
                className={`ml-auto w-[10px] h-[20px] ${openYearsTS && "rotate-180"
                  }`}
              />
            </div>
            {openYearsTS && (
              <div className="absolute z-10 bg-[#ebebeb] rounded-md shadow-lg w-full top-[45px] text-center">
                <ul
                  className={`bg-[#ebebeb] rounded-[10px] max-h-60 overflow-y-auto 
                ${openYearsTS ? "max-h-[240px]" : "max-h-[0]"}`}
                >
                  {years.map((yearData) => (
                    <li
                      key={yearData.tahun}
                      className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] ${disableYear2(yearData.tahun)
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                        }`}
                      onClick={() => {
                        if (!disableYear2(yearData.tahun)) {
                          setSelectedYearsTS(yearData.tahun);
                          setOpenYearsTS(false);
                          setYearsTS(selectedYearsTS);
                          // sessionStorage.setItem("yearss", yearData.tahun);
                        }
                      }}
                    >
                      {yearData.tahun}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <p className="text-secondary mx-[20px]">s/d</p>
          <div className="relative cursor-pointer w-[120px] font-medium text-[14px] text-secondary">
            <div
              onClick={() => setOpenYearsTS2(!openYearsTS2)}
              className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
            >
              {selectedYearsTS2 ? selectedYearsTS2 : "Tahun"}
              <FontAwesomeIcon
                icon={faChevronDown}
                color="#24445A"
                className={`ml-auto w-[10px] h-[20px] ${openYearsTS2 && "rotate-180"
                  }`}
              />
            </div>
            {openYearsTS2 && (
              <div className="absolute z-10 bg-[#ebebeb] rounded-md shadow-lg w-full top-[45px] text-center">
                <ul
                  className={`bg-[#ebebeb] rounded-[10px] max-h-60 overflow-y-auto 
                ${openYearsTS2 ? "max-h-[240px]" : "max-h-[0]"}`}
                >
                  {years.map((yearData) => (
                    <li
                      key={yearData.tahun}
                      className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] ${disableYear(yearData.tahun)
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                        }`}
                      onClick={() => {
                        if (!disableYear(yearData.tahun)) {
                          setSelectedYearsTS2(yearData.tahun);
                          setOpenYearsTS2(false);
                          setYearsTS2(selectedYearsTS2);
                          // sessionStorage.setItem("yearss", yearData.tahun);
                        }
                      }}
                    >
                      {yearData.tahun}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center text-secondary text-[14px] font-bold mt-4 gap-x-[80px]">
          <div className="text-center mt-[10px]">
            <>
              <p className="text-center font-extrabold text-[24px] text-secondary  lg:block md:block hidden">
                {sessionStorage.getItem("namaFilter1")}
              </p>
              <p className="text-sm  lg:block md:block hidden font-bold">
                &#40;{kapitaset1}&#41;
              </p>
            </>
          </div>
        </div>
        <div className="grid flex grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 md:gap-x-8 md:gap-y-8 mt-8 sm:mt-16 mt-[50px] sm:ml-4">
          {/* DATASET1 DAERAH 1 */}
          <div className="flex flex-col bg-white w-[350px] xl:w-[650px] lg:w-[460px] lg:ml-[0px] ml-[2px] lg:h-[auto] h-[400px] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg md:ml-[5px]">
            <div className="flex flex-col items-center justify-center lg:h-full">
              <div className="w-[340px] xl:w-[600px] lg:w-[400px] lg:h-auto h-[300px] mt-2 lg:mt-[20px] mx-4 lg:mx-[20px] overflow-x-scroll mini-scrollbar mb-[0px]">
                {dataChart && dataChart.length > 0 && (
                  <LineChart
                    data={dataChart}
                    width={lebarnyaGrafik}
                    height={isMobile ? 350 : 450}
                    margin={{ bottom: marginBottom, top: marginTop }}
                  >
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <CartesianGrid strokeDasharray="0" />
                    <Tooltip content={<CustomTooltip />} />
                    {LabelnyaTimeseries_1.filter(
                      (grafiknya) => grafiknya !== null
                    ).map((grafiknya, index) => (
                      <Line
                        strokeWidth={3}
                        type="monotone"
                        dataKey={grafiknya}
                        stroke={TSCOLOR[index]}
                        fillOpacity={1}
                        fill={TSCOLOR[index]}
                        layout="vertical"
                        dot={{ r: 3 }}
                      />
                    ))}

                    <Legend
                      iconType="circle"
                      layout="horizontal"
                      iconSize={10}
                      wrapperStyle={{
                        fontSize: "14px",
                        display: "none",
                      }}
                    />
                  </LineChart>
                )}
              </div>
            </div>
            {/* <p className="text-center mt-2 text-sm text-[#064878] italic">TESSS</p> */}
            <div
              className={`grid ${LabelnyaTimeseries_1.filter(
                (grafiknya) => grafiknya !== null
              ).length === 1
                ? "grid-cols-1 gap-x-[0px] max-w-[500px] justify-center items-center lg:mt-[30px] mt-[20px]"
                : LabelnyaTimeseries_1.filter(
                  (grafiknya) => grafiknya !== null
                ).length === 2
                  ? "grid-cols-2 gap-x-[10px] ml-[30px] mt-[30px]"
                  : LabelnyaTimeseries_1.filter(
                    (grafiknya) => grafiknya !== null
                  ).length > 3
                    ? "grid-cols-3 w-auto justify-center items-center mt-[30px] gap-x-[65px]"
                    : ""
                }`}
            >
              {LabelnyaTimeseries_1.filter(
                (grafiknya) => grafiknya !== null
              )
                .slice(
                  null,
                  lihatLegend
                    ? LabelnyaTimeseries_1.length
                    : maksimalTampil
                )
                .map((grafiknya, index) => (
                  <div className="flex items-center gap-x-2 w-auto" key={index}>
                    <div
                      className="w-[13px] h-[13px] rounded-full"
                      style={{
                        backgroundColor: TSCOLOR[index % TSCOLOR.length],
                      }}
                    ></div>
                    <p className="lg:text-[14px] text-[12px] w-full">
                      {grafiknya}
                    </p>
                  </div>
                ))}
              <div className="flex justify-center text-center items-start mt-[10px] bg-white lg:h-[60px] h-[0px] col-span-3 lg:text-[14px] text-[12px]">
                {!lihatLegend &&
                  LabelnyaTimeseries_1.filter(
                    (grafiknya) => grafiknya !== null
                  ).length > 3 && (
                    <button
                      className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                      onClick={toggleLihatLengkap}
                    >
                      Tampilkan Semua Legenda
                    </button>
                  )}
              </div>
            </div>
            {/* Button Hide Legends dipisahkan ke dalam div baru */}
            {lihatLegend && (
              <div className="flex justify-center text-center items-center mt-[10px] mb-[20px] lg:text-[14px] text-[12px]">
                <button
                  className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                  onClick={toggleLihatLengkap}
                >
                  Sembunyikan
                </button>
              </div>
            )}
          </div>

          {/* DATASET1 DAERAH 2 */}
          <div className={`flex flex-col bg-white w-[350px] xl:w-[650px] lg:w-[460px] lg:ml-[0px] ml-[2px] lg:h-[auto] h-[400px] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg md:ml-[5px] ${!showCards ? "hidden" : ""}`}>
            <div className="flex flex-col items-center justify-center lg:h-full">
              <div className="w-[340px] xl:w-[600px] lg:w-[400px] lg:h-auto h-[290px] mt-2 lg:mt-[20px] mx-4 lg:mx-[20px] overflow-x-scroll mini-scrollbar mb-[0px]">
                {dataChartd2 && dataChartd2.length > 0 && (
                  <LineChart
                    data={dataChartd2}
                    width={lebarnyaGrafik}
                    height={isMobile ? 350 : 450}
                    margin={{ bottom: marginBottom, top: marginTop }}
                  >
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <CartesianGrid strokeDasharray="0" />
                    <Tooltip content={<CustomTooltip />} />
                    {LabelnyaTimeseries_1.filter(
                      (grafiknyaD2) => grafiknyaD2 !== null
                    ).map((grafiknyaD2, index) => (
                      <Line
                        strokeWidth={3}
                        type="monotone"
                        dataKey={grafiknyaD2}
                        stroke={TSCOLOR[index]}
                        fillOpacity={1}
                        fill={TSCOLOR[index]}
                        layout="vertical"
                        dot={{ r: 3 }}
                      />
                    ))}

                    <Legend
                      iconType="circle"
                      layout="horizontal"
                      iconSize={10}
                      wrapperStyle={{
                        fontSize: "14px",
                        display: "none",
                      }}
                    />
                  </LineChart>
                )}
              </div>
            </div>
            {/* <p className="text-center mt-2 text-sm text-[#064878] italic">TESSS</p> */}
            <div
              className={`grid ${LabelnyaTimeseries_1.filter(
                (grafiknyaD2) => grafiknyaD2 !== null
              ).length === 1
                ? "grid-cols-1 gap-x-[0px] max-w-[500px] justify-center items-center lg:mt-[30px] mt-[20px]"
                : LabelnyaTimeseries_1.filter(
                  (grafiknyaD2) => grafiknyaD2 !== null
                ).length === 2
                  ? "grid-cols-2 gap-x-[10px] ml-[30px] mt-[30px]"
                  : LabelnyaTimeseries_1.filter(
                    (grafiknyaD2) => grafiknyaD2 !== null
                  ).length > 3
                    ? "grid-cols-3 w-auto justify-center items-center mt-[30px] gap-x-[65px]"
                    : ""
                }`}
            >
              {LabelnyaTimeseries_1.filter(
                (grafiknyaD2) => grafiknyaD2 !== null
              )
                .slice(
                  null,
                  lihatLegendD2
                    ? LabelnyaTimeseries_1.length
                    : maksimalTampilD2
                )
                .map((grafiknyaD2, index) => (
                  <div className="flex items-center gap-x-2 w-auto" key={index}>
                    <div
                      className="w-[13px] h-[13px] rounded-full"
                      style={{
                        backgroundColor: TSCOLOR[index % TSCOLOR.length],
                      }}
                    ></div>
                    <p className="lg:text-[14px] text-[12px] w-full">
                      {grafiknyaD2}
                    </p>
                  </div>
                ))}
              <div className="flex justify-center text-center items-start mt-[10px] lg:h-[60px] h-[0px] col-span-3 lg:text-[14px] text-[12px]">
                {!lihatLegendD2 &&
                  LabelnyaTimeseries_1.filter(
                    (grafiknyaD2) => grafiknyaD2 !== null
                  ).length > 3 && (
                    <button
                      className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                      onClick={toggleLihatLengkapD2}
                    >
                      Tampilkan Semua Legenda
                    </button>
                  )}
              </div>
            </div>
            {/* Button Hide Legends dipisahkan ke dalam div baru */}
            {lihatLegendD2 && (
              <div className="flex justify-center text-center items-center mt-[10px] mb-[20px]">
                <button
                  className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                  onClick={toggleLihatLengkapD2}
                >
                  Sembunyikan
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[100px] gap-y-[10px] mt-[5px] lg:ml-[55px] ml-[40px]">
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:block md:block hidden pr-[40px]">
            <br />
            {notes_1 &&
              typeof notes_1 === "object" &&
              Object.values(notes_1).map((note, index) => (
                <div key={index} className="w-[300px] xl:w-[500px] lg:w-[400px]">
                  {note}
                </div>
              ))}
          </div>
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:block md:block hidden pr-[40px]">
            <br />
            {notes_1 &&
              typeof notes_1 === "object" &&
              Object.values(notes_1).map((note, index) => (
                <div key={index} className="w-[300px] xl:w-[500px] lg:w-[400px]">
                  {note}
                </div>
              ))}
          </div>
        </div>
        <div className="mt-[30px] text-center italic text-[#919BA2] text-[13px] lg:text-[16px]  lg:block md:block hidden">
          {notes && notes.length > 0 && (
              <p className="mb-[20px]">
                <span className="font-extrabold text-secondary text-secondary">Catatan:</span> <br />
                <span className="text-third">
                  {notes}
                </span>
              </p>
            )}
          <span>Sumber: </span>
          <br></br>
          {sumbernya1.length === 2 ? sumbernya1.join(" & ") : sumbernya1}
        </div>
        <div className="text-center mt-[40px]">
          <>
            <p className="text-center font-extrabold text-[24px] text-secondary  lg:block md:block hidden">
              {sessionStorage.getItem("namaFilter2")}
            </p>
            <p className="text-sm text-secondary font-bold  lg:block md:block hidden">
            &#40;{kapitaset2}&#41;
            </p>
          </>
        </div>

        <div className="grid flex grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 md:gap-x-8 md:gap-y-8 mt-8 sm:mt-16 mt-[50px] sm:ml-4">
          {/* DATASET2 DAERAH 1 */}
          <div className="flex flex-col bg-white w-[350px] xl:w-[650px] lg:w-[460px] lg:ml-[0px] ml-[2px] lg:h-[auto] h-[400px] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg md:ml-[5px]">
            <div className="flex flex-col items-center justify-center lg:h-full">
              <div className="w-[340px] xl:w-[600px] lg:w-[400px] lg:h-auto h-[300px] mt-2 lg:mt-[20px] mx-4 lg:mx-[20px] overflow-x-scroll mini-scrollbar mb-[0px]">
                {dataChart2 && dataChart2.length > 0 && (
                  <LineChart
                    data={dataChart2}
                    width={lebarnyaGrafik}
                    height={isMobile ? 350 : 450}
                    margin={{ bottom: marginBottom, top: marginTop }}
                  >
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <CartesianGrid strokeDasharray="0" />
                    <Tooltip content={<CustomTooltip />} />
                    {LabelnyaTimeseries_2.filter(
                      (grafiknya) => grafiknya !== null
                    ).map((grafiknya, index) => (
                      <Line
                        strokeWidth={3}
                        type="monotone"
                        dataKey={grafiknya}
                        stroke={TSCOLOR2[index]}
                        fillOpacity={1}
                        fill={TSCOLOR2[index]}
                        layout="vertical"
                        dot={{ r: 3 }}
                      />
                    ))}
                    <Legend
                      iconType="circle"
                      layout="horizontal"
                      iconSize={10}
                      wrapperStyle={{
                        fontSize: "14px",
                        display: "none",
                      }}
                    />
                  </LineChart>
                )}
              </div>
            </div>
            {/* <p className="text-center mt-2 text-sm text-[#064878] italic">TESSS</p> */}
            <div
              className={`grid ${LabelnyaTimeseries_2.filter(
                (grafiknya) => grafiknya !== null
              ).length === 1
                ? "grid-cols-1 gap-x-[0px] max-w-[500px] justify-center items-center lg:mt-[30px] mt-[20px]"
                : LabelnyaTimeseries_2.filter(
                  (grafiknya) => grafiknya !== null
                ).length === 2
                  ? "grid-cols-2 gap-x-[10px] ml-[30px] mt-[30px]"
                  : LabelnyaTimeseries_2.filter(
                    (grafiknya) => grafiknya !== null
                  ).length > 3
                    ? "grid-cols-3 w-auto justify-center items-center mt-[30px] gap-x-[65px]"
                    : ""
                }`}
            >
              {LabelnyaTimeseries_2.filter(
                (grafiknya) => grafiknya !== null
              )
                .slice(
                  null,
                  lihatLegend2
                    ? LabelnyaTimeseries_2.length
                    : maksimalTampil
                )
                .map((grafiknya, index) => (
                  <div className="flex items-center gap-x-2 w-auto" key={index}>
                    <div
                      className="w-[13px] h-[13px] rounded-full"
                      style={{
                        backgroundColor: TSCOLOR2[index % TSCOLOR2.length],
                      }}
                    ></div>
                    <p className="lg:text-[14px] text-[12px] w-full">
                      {grafiknya}
                    </p>
                  </div>
                ))}
              <div className="flex justify-center text-center items-start mt-[10px] bg-white lg:h-[60px] h-[0px] col-span-3 lg:text-[14px] text-[12px]">
                {!lihatLegend2 &&
                  LabelnyaTimeseries_2.filter(
                    (grafiknya) => grafiknya !== null
                  ).length > 3 && (
                    <button
                      className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                      onClick={toggleLihatLengkap2}
                    >
                      Tampilkan Semua Legenda
                    </button>
                  )}
              </div>
            </div>
            {/* Button Hide Legends dipisahkan ke dalam div baru */}
            {lihatLegend2 && (
              <div className="flex justify-center text-center items-center mt-[10px] mb-[20px] lg:text-[14px] text-[12px]">
                <button
                  className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                  onClick={toggleLihatLengkap2}
                >
                  Sembunyikan
                </button>
              </div>
            )}
          </div>
          {/* DATASET2 DAERAH 2 */}
          <div className={`flex flex-col bg-white w-[350px]  xl:w-[650px] lg:w-[460px] lg:ml-[0px] ml-[2px] lg:h-[auto] h-[400px] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg md:ml-[5px] ${!showCards ? "hidden" : ""}`}>
            <div className="flex flex-col items-center justify-center lg:h-full">
              <div className="w-[340px] xl:w-[600px] lg:w-[400px] lg:h-auto h-[290px] mt-2 lg:mt-[20px] mx-4 lg:mx-[20px] overflow-x-scroll mini-scrollbar mb-[0px]">
                {dataChart2 && dataChart2d2.length > 0 && (
                  <LineChart
                    data={dataChart2d2}
                    width={lebarnyaGrafik}
                    height={isMobile ? 350 : 450}
                    margin={{ bottom: marginBottom, top: marginTop }}
                  >
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <CartesianGrid strokeDasharray="0" />
                    <Tooltip content={<CustomTooltip />} />
                    {LabelnyaTimeseries_2.filter(
                      (grafiknyaD2) => grafiknyaD2 !== null
                    ).map((grafiknyaD2, index) => (
                      <Line
                        strokeWidth={3}
                        type="monotone"
                        dataKey={grafiknyaD2}
                        stroke={TSCOLOR2[index]}
                        fillOpacity={1}
                        fill={TSCOLOR2[index]}
                        layout="vertical"
                        dot={{ r: 3 }}
                      />
                    ))}
                    <Legend
                      iconType="circle"
                      layout="horizontal"
                      iconSize={10}
                      wrapperStyle={{
                        fontSize: "14px",
                        display: "none",
                      }}
                    />
                  </LineChart>
                )}
              </div>
            </div>
            {/* <p className="text-center mt-2 text-sm text-[#064878] italic">TESSS</p> */}
            <div
              className={`grid ${LabelnyaTimeseries_2.filter(
                (grafiknyaD2) => grafiknyaD2 !== null
              ).length === 1
                ? "grid-cols-1 gap-x-[0px] max-w-[500px] justify-center items-center lg:mt-[30px] mt-[20px]"
                : LabelnyaTimeseries_2.filter(
                  (grafiknyaD2) => grafiknyaD2 !== null
                ).length === 2
                  ? "grid-cols-2 gap-x-[10px] ml-[30px] mt-[30px]"
                  : LabelnyaTimeseries_2.filter(
                    (grafiknyaD2) => grafiknyaD2 !== null
                  ).length > 3
                    ? "grid-cols-3 w-auto justify-center items-center mt-[30px] gap-x-[65px]"
                    : ""
                }`}
            >
              {LabelnyaTimeseries_2.filter(
                (grafiknyaD2) => grafiknyaD2 !== null
              )
                .slice(
                  null,
                  lihatLegend2D2
                    ? LabelnyaTimeseries_2.length
                    : maksimalTampilD2
                )
                .map((grafiknyaD2, index) => (
                  <div className="flex items-center gap-x-2 w-auto" key={index}>
                    <div
                      className="w-[13px] h-[13px] rounded-full"
                      style={{
                        backgroundColor: TSCOLOR2[index % TSCOLOR2.length],
                      }}
                    ></div>
                    <p className="lg:text-[14px] text-[12px] w-full">
                      {grafiknyaD2}
                    </p>
                  </div>
                ))}
              <div className="flex justify-center text-center items-start mt-[10px] lg:h-[60px] h-[0px] col-span-3 lg:text-[14px] text-[12px]">
                {!lihatLegend2D2 &&
                  LabelnyaTimeseries_2.filter(
                    (grafiknyaD2) => grafiknyaD2 !== null
                  ).length > 3 && (
                    <button
                      className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                      onClick={toggleLihatLengkap2D2}
                    >
                      Tampilkan Semua Legenda
                    </button>
                  )}
              </div>
            </div>
            {/* Button Hide Legends dipisahkan ke dalam div baru */}
            {lihatLegend2D2 && (
              <div className="flex justify-center text-center items-center mt-[10px] mb-[20px]">
                <button
                  className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                  onClick={toggleLihatLengkap2D2}
                >
                  Sembunyikan
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[100px] gap-y-[10px] mt-[5px] lg:ml-[55px] ml-[40px]">
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:block md:block hidden pr-[40px]">
            <br />
            {notes_2 &&
              typeof notes_2 === "object" &&
              Object.values(notes_2).map((note, index) => (
                <div key={index} className="w-[300px] xl:w-[500px] lg:w-[400px]">
                  {note}
                </div>
              ))}
          </div>
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:block md:block hidden pr-[40px]">
            <br />
            {notes_2_2 &&
              typeof notes_2_2 === "object" &&
              Object.values(notes_2_2).map((note, index) => (
                <div key={index} className="w-[300px] xl:w-[500px] lg:w-[400px]">
                  {note}
                </div>
              ))}
          </div>
        </div>
        <div className="mt-[30px] text-center italic text-[#919BA2] text-[13px] lg:text-[16px]  lg:block md:block hidden">
        {notes2 && notes2.length > 0 && (
            <p className="mb-[20px]">
              <span className="font-extrabold text-secondary text-secondary">Catatan:</span> <br />
              <span className="text-third">
                {notes2}
              </span>
            </p>
          )}
          <span>Sumber: </span>
          <br></br>
          {sumbernya2.length === 2 ? sumbernya2.join(" & ") : sumbernya2}
        </div>
      </section>
    );
  }
  const disableYear = (year) => {
    return year < parseInt(selectedYearsTS)
      ? "cursor-not-allowed opacity-50"
      : "";
  };
  const disableYear2 = (year) => {
    return year > parseInt(selectedYearsTS2)
      ? "cursor-not-allowed opacity-50"
      : "";
  };
  function GrafikD2() {
    const [lihatLegend, setLihatLegend] = useState(false);
    const maksimalTampil = 3;
    const toggleLihatLengkap = () => {
      setLihatLegend(!lihatLegend);
    };
    const [lihatLegend2, setLihatLegend2] = useState(false);
    const toggleLihatLengkap2 = () => {
      setLihatLegend2(!lihatLegend2);
    };
    const TSCOLOR = [
      "#94DEFF",
      "#41B8D5",
      "#2D8BBA",
      "#2F5F98",
      "#545674",
      "#895273",
      "#B97286",
      "#FE9273",
      "#FF6C35",
      "#D15737",
      "#A84520",
      "#894A33",
      "#623626",
      "#3B2723",
      "#4B3657",
      "#545674",
      "#7D6284",
      "#9674C2",
      "#6E5BAD",
      "#487FAC",
      "#28577D",
      "#2B6D6D",
      "#398B90",
      "#4AB887",
      "#740589",
      "#299B68",
      "#86C81A",
      "#FFD04C",
      "#FF8D16",
      "#DF7200",

      "#94DEFF",
      "#41B8D5",
      "#2D8BBA",
      "#2F5F98",
      "#545674",
      "#895273",
      "#B97286",
      "#FE9273",
      "#FF6C35",
      "#D15737",
      "#A84520",
      "#894A33",
      "#623626",
      "#3B2723",
      "#4B3657",
      "#545674",
      "#7D6284",
      "#9674C2",
      "#6E5BAD",
      "#487FAC",
      "#28577D",
      "#2B6D6D",
      "#398B90",
      "#4AB887",
      "#740589",
      "#299B68",
      "#86C81A",
      "#FFD04C",
      "#FF8D16",
      "#DF7200",
    ];
    const TSCOLOR2 = [
      "#DF7200",
      "#FF8D16",
      "#FFD04C",
      "#86C81A",
      "#299B68",
      "#740589",
      "#4AB887",
      "#398B90",
      "#2B6D6D",
      "#28577D",
      "#487FAC",
      "#6E5BAD",
      "#9674C2",
      "#7D6284",
      "#545674",
      "#4B3657",
      "#3B2723",
      "#623626",
      "#894A33",
      "#A84520",
      "#D15737",
      "#FF6C35",
      "#FE9273",
      "#B97286",
      "#895273",
      "#545674",
      "#2F5F98",
      "#2D8BBA",
      "#41B8D5",
      "#94DEFF",

      "#DF7200",
      "#FF8D16",
      "#FFD04C",
      "#86C81A",
      "#299B68",
      "#740589",
      "#4AB887",
      "#398B90",
      "#2B6D6D",
      "#28577D",
      "#487FAC",
      "#6E5BAD",
      "#9674C2",
      "#7D6284",
      "#545674",
      "#4B3657",
      "#3B2723",
      "#623626",
      "#894A33",
      "#A84520",
      "#D15737",
      "#FF6C35",
      "#FE9273",
      "#B97286",
      "#895273",
      "#545674",
      "#2F5F98",
      "#2D8BBA",
      "#41B8D5",
      "#94DEFF",
    ];

    var lebarnyaGrafik;
    if (yearsTS === "2013" && yearsTS2 === "2022") {
      lebarnyaGrafik = 800;
    } else {
      lebarnyaGrafik = 600;
    }

    ///DAERAH 2
    const [lihatLegendD2, setLihatLegendD2] = useState(false);
    const maksimalTampilD2 = 3;
    const toggleLihatLengkapD2 = () => {
      setLihatLegendD2(!lihatLegendD2);
    };
    const [lihatLegend2D2, setLihatLegend2D2] = useState(false);
    const toggleLihatLengkap2D2 = () => {
      setLihatLegend2D2(!lihatLegend2D2);
    };

    return (
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 md:gap-x-8 md:gap-y-8 mt-8 sm:mt-16 mt-[50px] sm:ml-[190px] mx-auto">
          {/* DATASET1 DAERAH 1 */}
          <div
            className={activeTabMobileDataset === "dataset1" ? "" : "hidden"}
          >
            <div className="flex flex-col bg-white w-[350px] lg:w-[650px] lg:ml-[0px] ml-[2px] lg:h-[auto] h-[auto] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg md:ml-[5px] mx-auto my-auto">
              <div className="flex flex-col items-center justify-center lg:h-full">
                <div className="w-[340px] lg:w-[600px] lg:h-auto h-[auto] mt-2 lg:mt-[20px] mx-4 lg:mx-[20px] overflow-x-scroll mini-scrollbar mb-[0px]">
                  {dataChart && dataChart.length > 0 && (
                    <LineChart
                      data={dataChart}
                      width={lebarnyaGrafik}
                      height={isMobile ? 350 : 450}
                      margin={{ bottom: marginBottom, top: marginTop }}
                    >
                      <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <CartesianGrid strokeDasharray="0" />
                      <Tooltip content={<CustomTooltip />} />
                      {LabelnyaTimeseries_1.filter(
                        (grafiknya) => grafiknya !== null
                      ).map((grafiknya, index) => (
                        <Line
                          strokeWidth={3}
                          type="monotone"
                          dataKey={grafiknya}
                          stroke={TSCOLOR[index]}
                          fillOpacity={1}
                          fill={TSCOLOR[index]}
                          layout="vertical"
                          dot={{ r: 3 }}
                        />
                      ))}
                      <Legend
                        iconType="circle"
                        layout="horizontal"
                        iconSize={10}
                        wrapperStyle={{
                          fontSize: "14px",
                          display: "none",
                        }}
                      />
                    </LineChart>
                  )}
                </div>
              </div>
              {/* <p className="text-center mt-2 text-sm text-[#064878] italic">TESSS</p> */}
              <div
                className={`grid ${LabelnyaTimeseries_1.filter(
                  (grafiknya) => grafiknya !== null
                ).length === 1
                  ? "grid-cols-1 gap-x-[0px] max-w-[500px] justify-center items-center lg:mt-[30px] mt-[20px]"
                  : LabelnyaTimeseries_1.filter(
                    (grafiknya) => grafiknya !== null
                  ).length === 2
                    ? "grid-cols-2 gap-x-[10px] ml-[30px] mt-[30px]"
                    : LabelnyaTimeseries_1.filter(
                      (grafiknya) => grafiknya !== null
                    ).length > 3
                      ? "grid-cols-2 w-[320px] justify-center items-center mt-[30px] gap-x-[20px]"
                      : ""
                  }`}
              >
                {LabelnyaTimeseries_1.filter(
                  (grafiknya) => grafiknya !== null
                )
                  .slice(
                    null,
                    lihatLegend
                      ? LabelnyaTimeseries_1.length
                      : maksimalTampil
                  )
                  .map((grafiknya, index) => (
                    <div
                      className="flex items-center gap-x-2 w-auto"
                      key={index}
                    >
                      <div
                        className="w-[13px] h-[13px] rounded-full"
                        style={{
                          backgroundColor: TSCOLOR[index % TSCOLOR.length],
                        }}
                      ></div>
                      <p className="lg:text-[14px] text-[12px] w-full">
                        {grafiknya}
                      </p>
                    </div>
                  ))}
                <div className="flex justify-center text-center items-start lg:mt-[10px] md:mt-[10px] mt-[10px] bg-white lg:h-[60px] h-[auto] col-span-2 lg:text-[14px] text-[12px] lg:mb-[0px] mb-[20px]">
                  {!lihatLegend &&
                    LabelnyaTimeseries_1.filter(
                      (grafiknya) => grafiknya !== null
                    ).length > 3 && (
                      <button
                        className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                        onClick={toggleLihatLengkap}
                      >
                        Tampilkan Semua Legenda
                      </button>
                    )}
                </div>
              </div>
              {/* Button Hide Legends dipisahkan ke dalam div baru */}
              {lihatLegend && (
                <div className="flex justify-center text-center items-start lg:mt-[0px] md:mt-[0px] mt-[0px] bg-white lg:h-[60px] h-[auto] col-span-4 lg:text-[14px] text-[12px] lg:mb-[0px] mb-[20px]">
                  <button
                    className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                    onClick={toggleLihatLengkap}
                  >
                    Sembunyikan
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* DATASET2 DAERAH 1 */}
          <div
            className={activeTabMobileDataset === "dataset2" ? "" : "hidden"}
          >
            <div className="flex flex-col bg-white w-[350px] lg:w-[650px] lg:ml-[0px] ml-[2px] lg:h-[auto] h-[auto] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg md:ml-[5px]">
              <div className="flex flex-col items-center justify-center lg:h-full">
                <div className="w-[340px] lg:w-[600px] lg:h-auto h-[300px] mt-2 lg:mt-[20px] mx-4 lg:mx-[20px] overflow-x-scroll mini-scrollbar mb-[0px]">
                  {dataChart2 && dataChart2.length > 0 && (
                    <LineChart
                      data={dataChart2}
                      width={lebarnyaGrafik}
                      height={isMobile ? 350 : 450}
                      margin={{ bottom: marginBottom, top: marginTop }}
                    >
                      <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <CartesianGrid strokeDasharray="0" />
                      <Tooltip content={<CustomTooltip />} />
                      {LabelnyaTimeseries_2.filter(
                        (grafiknya) => grafiknya !== null
                      ).map((grafiknya, index) => (
                        <Line
                          strokeWidth={3}
                          type="monotone"
                          dataKey={grafiknya}
                          stroke={TSCOLOR2[index]}
                          fillOpacity={1}
                          fill={TSCOLOR2[index]}
                          layout="vertical"
                          dot={{ r: 3 }}
                        />
                      ))}
                      <Legend
                        iconType="circle"
                        layout="horizontal"
                        iconSize={10}
                        wrapperStyle={{
                          fontSize: "14px",
                          display: "none",
                        }}
                      />
                    </LineChart>
                  )}
                </div>
              </div>

              <div
                className={`grid ${LabelnyaTimeseries_2.filter(
                  (grafiknya) => grafiknya !== null
                ).length === 1
                  ? "grid-cols-1 gap-x-[0px] max-w-[500px] justify-center items-center lg:mt-[30px] mt-[20px]"
                  : LabelnyaTimeseries_2.filter(
                    (grafiknya) => grafiknya !== null
                  ).length === 2
                    ? "grid-cols-2 gap-x-[10px] ml-[30px] mt-[30px]"
                    : LabelnyaTimeseries_2.filter(
                      (grafiknya) => grafiknya !== null
                    ).length > 3
                      ? "grid-cols-2 w-[320px] justify-center items-center mt-[30px] gap-x-[20px]"
                      : ""
                  }`}
              >
                {LabelnyaTimeseries_2.filter(
                  (grafiknya) => grafiknya !== null
                )
                  .slice(
                    null,
                    lihatLegend2
                      ? LabelnyaTimeseries_2.length
                      : maksimalTampil
                  )
                  .map((grafiknya, index) => (
                    <div
                      className="flex items-center gap-x-2 w-auto"
                      key={index}
                    >
                      <div
                        className="w-[13px] h-[13px] rounded-full"
                        style={{
                          backgroundColor: TSCOLOR2[index % TSCOLOR2.length],
                        }}
                      ></div>
                      <p className="lg:text-[14px] text-[12px] w-full">
                        {grafiknya}
                      </p>
                    </div>
                  ))}
                <div className="flex justify-center text-center items-start lg:mt-[10px] md:mt-[10px] mt-[10px] bg-white lg:h-[60px] h-[auto] col-span-2 lg:text-[14px] text-[12px] lg:mb-[0px] mb-[20px]">
                  {!lihatLegend2 &&
                    LabelnyaTimeseries_2.filter(
                      (grafiknya) => grafiknya !== null
                    ).length > 3 && (
                      <button
                        className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                        onClick={toggleLihatLengkap2}
                      >
                        Tampilkan Semua Legenda
                      </button>
                    )}
                </div>
              </div>

              {lihatLegend2 && (
                <div className="flex justify-center text-center items-start lg:mt-[0px] md:mt-[0px] mt-[0px] bg-white lg:h-[60px] h-[auto] col-span-4 lg:text-[14px] text-[12px] lg:mb-[0px] mb-[20px]">
                  <button
                    className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                    onClick={toggleLihatLengkap2}
                  >
                    Sembunyikan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
  function GrafikD3() {
    const [lihatLegend, setLihatLegend] = useState(false);
    const maksimalTampil = 3;
    const toggleLihatLengkap = () => {
      setLihatLegend(!lihatLegend);
    };
    const [lihatLegend2, setLihatLegend2] = useState(false);
    const toggleLihatLengkap2 = () => {
      setLihatLegend2(!lihatLegend2);
    };
    const TSCOLOR = [
      "#94DEFF",
      "#41B8D5",
      "#2D8BBA",
      "#2F5F98",
      "#545674",
      "#895273",
      "#B97286",
      "#FE9273",
      "#FF6C35",
      "#D15737",
      "#A84520",
      "#894A33",
      "#623626",
      "#3B2723",
      "#4B3657",
      "#545674",
      "#7D6284",
      "#9674C2",
      "#6E5BAD",
      "#487FAC",
      "#28577D",
      "#2B6D6D",
      "#398B90",
      "#4AB887",
      "#740589",
      "#299B68",
      "#86C81A",
      "#FFD04C",
      "#FF8D16",
      "#DF7200",

      "#94DEFF",
      "#41B8D5",
      "#2D8BBA",
      "#2F5F98",
      "#545674",
      "#895273",
      "#B97286",
      "#FE9273",
      "#FF6C35",
      "#D15737",
      "#A84520",
      "#894A33",
      "#623626",
      "#3B2723",
      "#4B3657",
      "#545674",
      "#7D6284",
      "#9674C2",
      "#6E5BAD",
      "#487FAC",
      "#28577D",
      "#2B6D6D",
      "#398B90",
      "#4AB887",
      "#740589",
      "#299B68",
      "#86C81A",
      "#FFD04C",
      "#FF8D16",
      "#DF7200",
    ];
    const TSCOLOR2 = [
      "#DF7200",
      "#FF8D16",
      "#FFD04C",
      "#86C81A",
      "#299B68",
      "#740589",
      "#4AB887",
      "#398B90",
      "#2B6D6D",
      "#28577D",
      "#487FAC",
      "#6E5BAD",
      "#9674C2",
      "#7D6284",
      "#545674",
      "#4B3657",
      "#3B2723",
      "#623626",
      "#894A33",
      "#A84520",
      "#D15737",
      "#FF6C35",
      "#FE9273",
      "#B97286",
      "#895273",
      "#545674",
      "#2F5F98",
      "#2D8BBA",
      "#41B8D5",
      "#94DEFF",

      "#DF7200",
      "#FF8D16",
      "#FFD04C",
      "#86C81A",
      "#299B68",
      "#740589",
      "#4AB887",
      "#398B90",
      "#2B6D6D",
      "#28577D",
      "#487FAC",
      "#6E5BAD",
      "#9674C2",
      "#7D6284",
      "#545674",
      "#4B3657",
      "#3B2723",
      "#623626",
      "#894A33",
      "#A84520",
      "#D15737",
      "#FF6C35",
      "#FE9273",
      "#B97286",
      "#895273",
      "#545674",
      "#2F5F98",
      "#2D8BBA",
      "#41B8D5",
      "#94DEFF",
    ];

    var lebarnyaGrafik;
    if (yearsTS === "2013" && yearsTS2 === "2022") {
      lebarnyaGrafik = 800;
    } else {
      lebarnyaGrafik = 600;
    }

    ///DAERAH 2
    const [lihatLegendD2, setLihatLegendD2] = useState(false);
    const maksimalTampilD2 = 3;
    const toggleLihatLengkapD2 = () => {
      setLihatLegendD2(!lihatLegendD2);
    };
    const [lihatLegend2D2, setLihatLegend2D2] = useState(false);
    const toggleLihatLengkap2D2 = () => {
      setLihatLegend2D2(!lihatLegend2D2);
    };

    return (
      <section>
        <div className="grid flex grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 md:gap-x-8 md:gap-y-8 mt-8 sm:mt-16 mt-[50px] sm:ml-[190px]">
          <div
            className={activeTabMobileDataset === "dataset1" ? "" : "hidden"}
          >
            <div className={`flex flex-col bg-white w-[350px] lg:w-[650px] lg:ml-[0px] ml-[2px] lg:h-[auto] h-[auto] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg md:ml-[5px] ${!showCards ? "hidden" : ""}`}>
              <div className="flex flex-col items-center justify-center lg:h-full">
                <div className="w-[340px] lg:w-[600px] lg:h-auto h-[auto] mt-2 lg:mt-[20px] mx-4 lg:mx-[20px] overflow-x-scroll mini-scrollbar mb-[0px]">
                  {dataChartd2 && dataChartd2.length > 0 && (
                    <LineChart
                      data={dataChartd2}
                      width={lebarnyaGrafik}
                      height={isMobile ? 350 : 450}
                      margin={{ bottom: marginBottom, top: marginTop }}
                    >
                      <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <CartesianGrid strokeDasharray="0" />
                      <Tooltip content={<CustomTooltip />} />
                      {LabelnyaTimeseries_1.filter(
                        (grafiknyaD2) => grafiknyaD2 !== null
                      ).map((grafiknyaD2, index) => (
                        <Line
                          strokeWidth={3}
                          type="monotone"
                          dataKey={grafiknyaD2}
                          stroke={TSCOLOR[index]}
                          fillOpacity={1}
                          fill={TSCOLOR[index]}
                          layout="vertical"
                          dot={{ r: 3 }}
                        />
                      ))}
                      <Legend
                        iconType="circle"
                        layout="horizontal"
                        iconSize={10}
                        wrapperStyle={{
                          fontSize: "14px",
                          display: "none",
                        }}
                      />
                    </LineChart>
                  )}
                </div>
              </div>

              <div
                className={`grid ${LabelnyaTimeseries_1.filter(
                  (grafiknyaD2) => grafiknyaD2 !== null
                ).length === 1
                  ? "grid-cols-1 gap-x-[0px] max-w-[500px] justify-center items-center lg:mt-[30px] mt-[20px]"
                  : LabelnyaTimeseries_1.filter(
                    (grafiknyaD2) => grafiknyaD2 !== null
                  ).length === 2
                    ? "grid-cols-2 gap-x-[10px] ml-[30px] mt-[30px]"
                    : LabelnyaTimeseries_1.filter(
                      (grafiknyaD2) => grafiknyaD2 !== null
                    ).length > 3
                      ? "grid-cols-2 w-[320px] justify-center items-center mt-[30px] gap-x-[20px]"
                      : ""
                  }`}
              >
                {LabelnyaTimeseries_1.filter(
                  (grafiknyaD2) => grafiknyaD2 !== null
                )
                  .slice(
                    null,
                    lihatLegendD2
                      ? LabelnyaTimeseries_1.length
                      : maksimalTampilD2
                  )
                  .map((grafiknyaD2, index) => (
                    <div
                      className="flex items-center gap-x-2 w-auto"
                      key={index}
                    >
                      <div
                        className="w-[13px] h-[13px] rounded-full"
                        style={{
                          backgroundColor: TSCOLOR[index % TSCOLOR.length],
                        }}
                      ></div>
                      <p className="lg:text-[14px] text-[12px] w-full">
                        {grafiknyaD2}
                      </p>
                    </div>
                  ))}
                <div className="flex justify-center text-center items-start lg:mt-[10px] md:mt-[10px] mt-[10px] bg-white lg:h-[60px] h-[auto] col-span-2 lg:text-[14px] text-[12px] lg:mb-[0px] mb-[20px]">
                  {!lihatLegendD2 &&
                    LabelnyaTimeseries_1.filter(
                      (grafiknyaD2) => grafiknyaD2 !== null
                    ).length > 3 && (
                      <button
                        className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                        onClick={toggleLihatLengkapD2}
                      >
                        Tampilkan Semua Legenda
                      </button>
                    )}
                </div>
              </div>

              {lihatLegendD2 && (
                <div className="flex justify-center text-center items-start lg:mt-[0px] md:mt-[0px] mt-[0px] bg-white lg:h-[60px] h-[auto] col-span-4 lg:text-[14px] text-[12px] lg:mb-[0px] mb-[20px]">
                  <button
                    className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                    onClick={toggleLihatLengkapD2}
                  >
                    Sembunyikan
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            className={activeTabMobileDataset === "dataset2" ? "" : "hidden"}
          >
            <div className={`flex flex-col bg-white w-[350px] lg:w-[650px] lg:ml-[0px] ml-[2px] lg:h-[auto] h-[auto] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg md:ml-[5px] ${!showCards ? "hidden" : ""}`}>
              <div className="flex flex-col items-center justify-center lg:h-full">
                <div className="w-[340px] lg:w-[600px] lg:h-auto h-[auto] mt-2 lg:mt-[20px] mx-4 lg:mx-[20px] overflow-x-scroll mini-scrollbar mb-[0px]">
                  {dataChart2 && dataChart2d2.length > 0 && (
                    <LineChart
                      data={dataChart2d2}
                      width={lebarnyaGrafik}
                      height={isMobile ? 350 : 450}
                      margin={{ bottom: marginBottom, top: marginTop }}
                    >
                      <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <CartesianGrid strokeDasharray="0" />
                      <Tooltip content={<CustomTooltip />} />
                      {LabelnyaTimeseries_2.filter(
                        (grafiknyaD2) => grafiknyaD2 !== null
                      ).map((grafiknyaD2, index) => (
                        <Line
                          strokeWidth={3}
                          type="monotone"
                          dataKey={grafiknyaD2}
                          stroke={TSCOLOR2[index]}
                          fillOpacity={1}
                          fill={TSCOLOR2[index]}
                          layout="vertical"
                          dot={{ r: 3 }}
                        />
                      ))}
                      <Legend
                        iconType="circle"
                        layout="horizontal"
                        iconSize={10}
                        wrapperStyle={{
                          fontSize: "14px",
                          display: "none",
                        }}
                      />
                    </LineChart>
                  )}
                </div>
              </div>

              <div
                className={`grid ${LabelnyaTimeseries_2.filter(
                  (grafiknyaD2) => grafiknyaD2 !== null
                ).length === 1
                  ? "grid-cols-1 gap-x-[0px] max-w-[500px] justify-center items-center lg:mt-[30px] mt-[20px]"
                  : LabelnyaTimeseries_2.filter(
                    (grafiknyaD2) => grafiknyaD2 !== null
                  ).length === 2
                    ? "grid-cols-2 gap-x-[10px] ml-[30px] mt-[30px]"
                    : LabelnyaTimeseries_2.filter(
                      (grafiknyaD2) => grafiknyaD2 !== null
                    ).length > 3
                      ? "grid-cols-2 w-[320px] justify-center items-center mt-[30px] gap-x-[20px]"
                      : ""
                  }`}
              >
                {LabelnyaTimeseries_2.filter(
                  (grafiknyaD2) => grafiknyaD2 !== null
                )
                  .slice(
                    null,
                    lihatLegend2D2
                      ? LabelnyaTimeseries_2.length
                      : maksimalTampilD2
                  )
                  .map((grafiknyaD2, index) => (
                    <div
                      className="flex items-center gap-x-2 w-auto"
                      key={index}
                    >
                      <div
                        className="w-[13px] h-[13px] rounded-full"
                        style={{
                          backgroundColor: TSCOLOR2[index % TSCOLOR2.length],
                        }}
                      ></div>
                      <p className="lg:text-[14px] text-[12px] w-full">
                        {grafiknyaD2}
                      </p>
                    </div>
                  ))}
                <div className="flex justify-center text-center items-start lg:mt-[10px] md:mt-[10px] mt-[10px] bg-white lg:h-[60px] h-[auto] col-span-2 lg:text-[14px] text-[12px] lg:mb-[0px] mb-[20px]">
                  {!lihatLegend2D2 &&
                    LabelnyaTimeseries_2.filter(
                      (grafiknyaD2) => grafiknyaD2 !== null
                    ).length > 3 && (
                      <button
                        className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                        onClick={toggleLihatLengkap2D2}
                      >
                        Tampilkan Semua Legenda
                      </button>
                    )}
                </div>
              </div>

              {lihatLegend2D2 && (
                <div className="flex justify-center text-center items-start lg:mt-[0px] md:mt-[0px] mt-[0px] bg-white lg:h-[60px] h-[auto] col-span-4 lg:text-[14px] text-[12px] lg:mb-[0px] mb-[20px]">
                  <button
                    className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                    onClick={toggleLihatLengkap2D2}
                  >
                    Sembunyikan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
  // useEffect(() => {
  //   if (selectedYearsTS2D2 === "") {
  //     setYearsTSD2("2018");
  //   } else {
  //     setYearsTSD2(selectedYearsTSD2);
  //   }
  // }, [yearsTSD2, selectedYearsTSD2]);
  // useEffect(() => {
  //   if (selectedYearsTS2D2 === "") {
  //     setYearsTS2D2("2022");
  //   } else {
  //     setYearsTS2D2(selectedYearsTS2D2);
  //   }
  // }, [yearsTS2D2, selectedYearsTS2D2]);

  

  const [showCards, setShowCards] = useState(true);

 

  const shareBtn = (halaman) => {
    var query = new URLSearchParams();
    query.append("halaman", halaman);
    query.append("id_member", sessionStorage.getItem("member"));

    var xhr = new XMLHttpRequest();
    xhr.onload = async function () {
      var response = JSON.parse(this.responseText);
      if (response.success) {
        var share_data = {
          title: "Timeseries",
          text: "Yuk cek laman ini, dan dapatkan insight", //isi kalimat sendiri
          url: response.data.url, //url yang ingin dibagikan
        };

        //proses share data
        try {
          await navigator.share(share_data);
        } catch (err) {
          //jika eror
        }
      } else {
        //jika gagal
      }
    };
    xhr.open(
      "GET",
      process.env.REACT_APP_URL_API + "/share-pdf?" + query.toString(),
      true
    );
    xhr.send();
  };

  const [glosarium, setGlosarium] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchGlosarium = async () => {
    const response = await fetch(
      process.env.REACT_APP_URL_API + "/info/list?parent=[1,2,3]",
      requestOptions
    );
    const data = await response.json();
    setGlosarium(data.data);
    setPopupOpen(true);
  };

  const handleDownload = (file) => {
    setSelectedFile(file);
    setPopupOpen(true);
  };

  const closeModal = () => {
    setSelectedFile(null);
    setPopupOpen(false);
  };

  const [showPopupSimpan, setShowPopupSimpan] = useState(false);
  const [showPopupKoleksi, setShowPopupKoleksi] = useState(false);
  const [akunPrem, setAkunPrem] = useState("Y");
  const [formCollection, setFormCollection] = useState({
    namaKoleksi: "",
  });
  const { namaKoleksi } = formCollection;
  const handleNewCollection = (e) => {
    const { value } = e.target;
    setFormCollection((prevState) => ({
      ...prevState,
      namaKoleksi: value,
    }));
  };
  const togglePopupSimpan = () => {
    setShowPopupSimpan(!showPopupSimpan);
  };
  const [KoleksiUser, setKoleksiUser] = useState([]);
  const togglePopupKoleksi = () => {
    setShowPopupKoleksi(!showPopupKoleksi);
    setShowPopupSimpan(!showPopupSimpan);
  };

  const addNewCollection = async (e) => {
    e.preventDefault();
    if (formCollection.namaKoleksi.trim() !== "") {
      var dataSimpan = new URLSearchParams();
      dataSimpan.append("name", namaKoleksi);
      var xhr_newSave = new XMLHttpRequest();
      xhr_newSave.onload = function () {
        var response = JSON.parse(this.responseText);
        if (response.success === true) {
          ListKategori();
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
          }).then((result) => {
            if (result.isConfirmed) {
              togglePopupKoleksi();
              togglePopupSimpan();
            }
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
      };
      xhr_newSave.open(
        "POST",
        process.env.REACT_APP_URL_API + "/make-collection"
      );
      xhr_newSave.setRequestHeader("Authorization", `Bearer ${tokenUser}`);
      xhr_newSave.send(dataSimpan);
    } else {
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
    setFormCollection({ namaKoleksi: "" });
  };

  useEffect(() => {
    ListKategori()
  }, [tokenUser]);

  async function ListKategori() {
    if (tokenUser !== null) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL_API}/get-collection`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenUser}`
          }
        });
        const data_Koleksi = response.data.data;
        setKoleksiUser(data_Koleksi);
      } catch (error) {
        console.error('Error fetching collection:', error);
      }
    }
  }

  const SimpanHalamanSemua = async (halaman) => {
    try {
      var dataSimpan = new URLSearchParams();
      dataSimpan.append("kodeHalaman", halaman);
      var xhr_newSave = new XMLHttpRequest();
      xhr_newSave.onload = function () {
        var response = JSON.parse(this.responseText);
        console.log(response);
        if (response.success === true) {
          if (!processedPages[halaman]) {
            incrementCount(halaman);
          }
          Swal.fire({
            iconHtml: '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
            title: "Berhasil!",
            text: "Berhasil menyimpan halaman.",
            confirmButtonText: "Lanjutkan",
            confirmButtonColor: "#27AE60",
            customClass: {
              icon: "no-border",
              title: "title-icon",
              text: "text-icon",
              confirmButton: "confirm-icon",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              // UNTUK PREM
              if(akunPrem == "Y"){
                togglePopupSimpan();
              }else{
              }
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Halaman sudah tersimpan.',
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
      xhr_newSave.open("POST", process.env.REACT_APP_URL_API + "/save");
      xhr_newSave.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr_newSave.setRequestHeader("Authorization", `Bearer ${tokenUser}`);
      xhr_newSave.send(dataSimpan.toString());
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Terdapat kesalahan. Silakan coba lagi nanti.',
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

  const SimpanHalamanKoleksi = async (halaman, idKoleksi) => {
    try {
      var dataSimpan = new URLSearchParams();
      dataSimpan.append("kodeHalaman", halaman);
      dataSimpan.append("koleksi", idKoleksi);
      var xhr_newSave = new XMLHttpRequest();
      xhr_newSave.onload = function () {
        var response = JSON.parse(this.responseText);
        console.log(response);
        if (response.success === true) {
          if (!processedPages[halaman]) {
            incrementCount(halaman);
          }
          Swal.fire({
            iconHtml:
              '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
            title: "Berhasil!",
            text: "Berhasil menyimpan halaman.",
            confirmButtonText: "Lanjutkan",
            confirmButtonColor: "#27AE60",
            customClass: {
              icon: "no-border",
              title: "title-icon",
              text: "text-icon",
              confirmButton: "confirm-icon",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              togglePopupSimpan();
            }
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
      };
      xhr_newSave.open("POST", process.env.REACT_APP_URL_API + "/save");
      xhr_newSave.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      xhr_newSave.setRequestHeader("Authorization", `Bearer ${tokenUser}`);
      xhr_newSave.send(dataSimpan.toString());
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

  useEffect(() => {
    if (showPopupSimpan || showPopupKoleksi || selectedFile) {
      document.body.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
    }
    return () => {
      document.body.classList.remove('lock-scroll');
    };
  }, [showPopupSimpan,showPopupKoleksi, selectedFile]);
  

  return (
    <div>
      
    <div className="flex flex-col mt-[100px] mb-[150px] justify-center items-center">
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
      <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center gap-x-2 mt-2 md:mt-5 lg:mt-[50px]">
        <a
          href="/Berkaca-Main"
          className="mr-4 md:mr-4 md:mt-0 md:mt-2 lg:mb-7 relative"
        >
          <img
            src={back}
            alt=""
            className="w-[30px] md:w-[30px] lg:w-auto transition-transform duration-300 transform hover:scale-110"
          />
        </a>
        <h1 className="text-secondary text-2xl text-center mt-5 mb-2 font-bold lg:text-4xl lg:mt-0 lg:mb-5 lg:mr-10">
          Bandingkan Daerah Pilihanmu!
        </h1>
        <h1 className="hidden lg:block text-secondary text-2xl text-center mt-5 mb-2 font-bold lg:text-4xl lg:mt-0 lg:mb-5"></h1>
      </div>

     
      {/* Desktop */}
      {/* <div className="flex justify-center lg:gap-x-[625px] md:gap-x-[325px] mb-2">
        <p className="font-bold text-center text-secondary lg:block md:block hidden">Daerah 1</p>
        <p className="font-bold text-center text-secondary lg:block md:block hidden ">Daerah 2</p>
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-4 lg:gap-x-[100px] lg:gap-y-[10px] md:gap-x-[50px] md:gap-y-[10px]">
        {/* DAERAH 1 */}

        {/* PROVINSI PERTAMA */}
        <div className="relative lg:w-[250px] md:w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:block md:block hidden">
          <div
            onClick={() => {
              setOpenProvinsiDaerah1(!openProvinsiDaerah1);
              if (openCityDaerah1){
                setOpenCityDaerah1(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedDaerah1
              ? selectedDaerah1?.length > 20
                ? selectedDaerah1?.substring(0, 20) + "..."
                : selectedDaerah1
              : "Provinsi"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${openProvinsiDaerah1 && "rotate-180"
                }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
                ${openProvinsiDaerah1 ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValueDaerah1}
              onChange={(e) =>
                setInputValueDaerah1(e.target.value.toLowerCase())
              }
              placeholder="Cari Provinsi"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>

          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openProvinsiDaerah1 ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {provincessDaerah1?.map((provinces) => (
              <li
                key={provinces?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${provinces?.nama?.toLowerCase() ===
                  selectedDaerah1?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                    ${provinces?.nama
                    ?.toLowerCase()
                    .includes(inputValueDaerah1)
                    ? "block"
                    : "hidden"
                  }`}
                onClick={() => {
                  updateKotaDaerah1(
                    provinces?.nama,
                    selectedDaerah1,
                    provinces.id
                  );
                  sessionStorage.setItem("idprovinsi", provinces.id);
                  sessionStorage.setItem("idwilayah", provinces.id);
                  sessionStorage.setItem("namaprovinsi", provinces.nama);
                  sessionStorage.setItem("namawilayah", "Semua");
                  sessionStorage.setItem("namakota", "Semua");
                  sessionStorage.setItem("idkota", provinces.id);
                  setInfoDaerah1("Semua");
                  setSelectedCityDaerah1("Semua");
                  updateDaerah1(provinces.id);
                  setGetInfoProvinsiDaerah1(provinces.id);
                  setWilayahIDDaerah1(provinces.id);
                  setIsProvinceDaerah1(true);
                  setWilayahIDDaerahSATU("Semua");
                }}
              >
                {provinces?.nama}
              </li>
            ))}
          </ul>
        </div>
        {/* KOTA PERTAMA */}
        <div className="relative lg:w-[250px] md:w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:block md:block hidden">
          <div
            onClick={() => {
              setOpenCityDaerah1(!openCityDaerah1);
              if (openProvinsiDaerah1) {
                setOpenProvinsiDaerah1(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedCityDaerah1
              ? selectedCityDaerah1?.length > 20
                ? selectedCityDaerah1?.substring(0, 20) + "..."
                : selectedCityDaerah1
              : "Kota/Kabupaten"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${openCityDaerah1 && "rotate-180"
                }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
            ${openCityDaerah1 ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValueofCityDaerah1}
              onChange={(e) =>
                setInputValueofCityDaerah1(e.target.value.toLowerCase())
              }
              placeholder="Cari Kota/Kabupaten"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>
          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openCityDaerah1 ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            <li
              className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary
                    ${"semua" === selectedCityDaerah1?.toLowerCase() &&
                "bg-secondary text-white"
                }
                    `}
              onClick={() => {
                setWilayahIDDaerahSATU("Semua");
                sessionStorage.setItem("namawilayah", "Semua");
                sessionStorage.setItem(
                  "idkota",
                  sessionStorage.getItem("idprovinsi")
                );
                sessionStorage.setItem(
                  "idwilayah",
                  sessionStorage.getItem("idprovinsi")
                );
                sessionStorage.setItem("namakota", "Semua");
                setSelectedCityDaerah1("Semua");
                setWilayahIDDaerah1(getInfoProvinsiDaerah1);
                // sessionStorage.setItem("idwilayah", getInfoProvinsiDaerah1);
                setOpenCityDaerah1(false);
                setIsProvinceDaerah1(true);
                setInfoDaerah1("Semua");
                updateDaerah1(getInfoProvinsiDaerah1);
                setSelectedCityDaerah2("Semua");
                setWilayahIDDaerah2(getInfoProvinsiDaerah2);
                // setWilayahIDDaerahDUA(getInfoProvinsiDaerah2);
                // setWilayahIDDaerahDUA("Semua");
                setOpenCityDaerah2(false);
                setIsProvinceDaerah2(true);
              }}
            >
              Semua
            </li>
            {citiesDaerah1?.map((regencies) => (
              <li
                key={regencies?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${regencies?.nama?.toLowerCase() ===
                  selectedCityDaerah1?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                    ${regencies?.nama
                    ?.toLowerCase()
                    .includes(inputValueofCityDaerah1)
                    ? "block"
                    : "hidden"
                  }`}
                onClick={() => {
                  if (
                    regencies?.nama?.toLowerCase() !==
                    selectedCityDaerah1.toLowerCase()
                  ) {
                    setWilayahIDDaerahSATU(regencies.id)
                    sessionStorage.setItem("namawilayah", regencies.nama);
                    // sessionStorage.setItem(
                    // "namawilayah_utak",
                    // regencies.nama,
                    // );
                    updateDaerah1(regencies.id);
                    setSelectedCityDaerah1(regencies?.nama);
                    sessionStorage.setItem("idkota", regencies.id);
                    sessionStorage.setItem("idwilayah", regencies.id);
                    sessionStorage.setItem("namakota", regencies.nama);
                    setOpenCityDaerah1(false);
                    setInputValueofCityDaerah1("");
                    setWilayahIDDaerah1(regencies.id);
                    sessionStorage.setItem("idwilayah", regencies.id);
                    setIsProvinceDaerah1(false);
                  }
                }}
              >
                {regencies?.nama}
              </li>
            ))}
          </ul>
        </div>
        {/* <p className="text-center text-[17px] text-secondary mt-[5px] lg:hidden md:hidden block">
              Penduduk
            </p>
            <p className="text-center font-bold text-[18px] text-secondary mt-[-5px] mb-[15px] lg:hidden md:hidden block">
              {Math.round(penduduk).toLocaleString().replace(/,/g, ".")} Jiwa
            </p> */}

        {/* DAERAH 2 */}

        {/* PROVINSI KEDUA */}
        <div className="relative lg:w-[250px] md:w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:block md:block hidden">
          <div
            onClick={() => {
              setOpenProvinsiDaerah2(!openProvinsiDaerah2);
              if (openCityDaerah2){
                setOpenCityDaerah2(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedDaerah2
              ? selectedDaerah2?.length > 20
                ? selectedDaerah2?.substring(0, 20) + "..."
                : selectedDaerah2
              : "Provinsi"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${openProvinsiDaerah2 && "rotate-180"
                }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
                ${openProvinsiDaerah2 ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValueDaerah2}
              onChange={(e) =>
                setInputValueDaerah2(e.target.value.toLowerCase())
              }
              placeholder="Cari Provinsi"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>

          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openProvinsiDaerah2 ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {provincessDaerah2?.map((provinces2) => (
              <li
                key={provinces2?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${provinces2?.nama?.toLowerCase() ===
                  selectedDaerah2?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                    ${provinces2?.nama
                    ?.toLowerCase()
                    .includes(inputValueDaerah2)
                    ? "block"
                    : "hidden"
                  }`}
                onClick={() => {
                  updateKotaDaerah2(
                    provinces2?.nama,
                    selectedDaerah2,
                    provinces2.id
                  );
                  sessionStorage.setItem("idprovinsi_berkaca2", provinces2.id);
                  sessionStorage.setItem(
                    "namaprovinsi_berkaca2",
                    provinces2.nama
                  );
                  sessionStorage.setItem("idprovinsi_berkaca2", provinces2.id);
                  sessionStorage.setItem(
			            "namaprovinsi_berkaca2",
                    provinces2.nama
                  );
                  sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                  sessionStorage.setItem("idwilayah_berkaca2", provinces2.id);
                  sessionStorage.setItem("namakota_berkaca2", "Semua");
                  sessionStorage.setItem("idkota_berkaca2", provinces2.id);
                  setInfoDaerah2("Semua");
                  setSelectedCityDaerah2("Semua");
                  setGetInfoProvinsiDaerah2(provinces2.id);
                  setWilayahIDDaerah2(provinces2.id);
                  setIsProvinceDaerah2(true);
                  // setWilayahIDDaerahDUA("Semua");
                }}
              >
                {provinces2?.nama}
              </li>
            ))}
          </ul>
        </div>
        {/* KOTA KEDUA */}
        <div className="relative lg:w-[250px] md:w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:block md:block hidden">
          <div
             onClick={() => {
              setOpenCityDaerah2(!openCityDaerah2);
              if (openProvinsiDaerah2) {
                setOpenProvinsiDaerah2(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedCityDaerah2
              ? selectedCityDaerah2?.length > 20
                ? selectedCityDaerah2?.substring(0, 20) + "..."
                : selectedCityDaerah2
              : "Kota/Kabupaten"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${openCityDaerah2 && "rotate-180"
                }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
            ${openCityDaerah2 ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValueofCityDaerah2}
              onChange={(e) =>
                setInputValueofCityDaerah2(e.target.value.toLowerCase())
              }
              placeholder="Cari Kota/Kabupaten"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>
          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openCityDaerah2 ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {selectedCityDaerah1 === "Semua" ? (
              <>
              <li className="p-2 text-[12px] text-gray-400">
                Pilih tingkat Kab/Kota di Daerah 1 untuk mengakses Kab/Kota
              </li>
              <li
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary
                    ${"semua" === selectedCityDaerah2?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                    `}
                onClick={() => {
                  // setWilayahIDDaerahDUA("Semua");
                  setSelectedCityDaerah2("Semua");
                  sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                  setSelectedCityDaerah2("Semua");
                  setWilayahIDDaerah2(getInfoProvinsiDaerah2);
                  sessionStorage.setItem(
                    "idkota_berkaca2",
                    sessionStorage.getItem("idprovinsi_berkaca2")
                  );
                  sessionStorage.setItem("idwilayah_berkaca2", 
                  sessionStorage.getItem("idprovinsi_berkaca2")
                );
                  sessionStorage.setItem("namakota_berkaca2", "Semua");
                  setOpenCityDaerah2(false);
                  setIsProvinceDaerah2(true);
                  sessionStorage.setItem("selectedCity2", "Semua"); // Corrected line
                  sessionStorage.setItem(
                    "infoProvinsi2",
                    getInfoProvinsiDaerah2
                  );
                }}
              >
                Semua
              </li>
              </>
            ) : (
              <li className="p-2 text-[12px] text-gray-400">
                Pilih "Semua" di Daerah 1 untuk mengakses Provinsi
              </li>
            )}
            {citiesDaerah2?.map((regencies2) => (
              <li
                key={regencies2?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${regencies2?.nama?.toLowerCase() ===
                  selectedCityDaerah2?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                    ${regencies2?.nama
                    ?.toLowerCase()
                    .includes(inputValueofCityDaerah2)
                    ? "block"
                    : "hidden"
                  }`}
                onClick={() => {
                  if (selectedCityDaerah1 === "Semua") {
                    setSelectedCityDaerah2("Semua");
                    return;
                  }
                  if (
                    regencies2?.nama?.toLowerCase() !==
                    selectedCityDaerah2.toLowerCase()
                  ) {
                    // setWilayahIDDaerahDUA(regencies2.id)
                    sessionStorage.setItem(
                      "namawilayah_berkaca2",
                      regencies2.nama
                    );
                    sessionStorage.setItem(
                      "namawilayah_berkaca2",
                      regencies2.nama
                    );
                    setSelectedCityDaerah2(regencies2?.nama);
                    sessionStorage.setItem("idkota_berkaca2", regencies2.id);
                    sessionStorage.setItem(
                      "namakota_berkaca2",
                      regencies2.nama
                    );
                    sessionStorage.setItem("idwilayah_berkaca2", regencies2.id);
                    setOpenCityDaerah2(false);
                    setInputValueofCityDaerah2("");
                    setWilayahIDDaerah2(regencies2.id);
                    setIsProvinceDaerah2(false);
                  }
                }}
                style={{
                  color:
                    selectedCityDaerah1 === "Semua" &&
                      regencies2?.nama !== "Semua"
                      ? "gray"
                      : null,
                }}
                disabled={selectedCityDaerah1 === "Semua"}
              >
                {regencies2?.nama}
              </li>
            ))}
          </ul>
        </div>
        {/* <p className="text-center text-[17px] text-secondary mt-[5px] lg:hidden md:hidden block">
              Penduduk
            </p> */}
        {/* <p className="text-center font-bold text-[18px] text-secondary mt-[-5px] lg:hidden md:hidden block">
              {Math.round(penduduk2).toLocaleString().replace(/,/g, ".")} Jiwa
            </p> */}
      </div>
     

      <div id="timeseriesnyaaaaaaa">
        <div className="flex flex-col justify-center items-center  ">
          <div className="relative mt-4 lg:block md:block hidden">
            <NavLink
              to={"/Berkaca-Grafik-PieChart"}
              className="flex bg-secondary text-white w-[167px] h-[41px] rounded-[10px] border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center cursor-pointer hover:bg-third 
                hover:text-white"
              onClick={(e) => {
                if (
                  selectedCityDaerah1.toLowerCase() !== "semua" &&
                  selectedCityDaerah2.toLowerCase() === "semua"
                ) {
                  Swal.fire({
                    title: "Perhatian!",
                    text: "Silahkan pilih Kab/Kota pada Daerah 2 karena tidak memungkinkan perbandingan antara Provinsi dan Kab/Kota",
                    confirmButtonText: "Tutup",
                    confirmButtonColor: "#24445A",
                    customClass: {
                      icon: "no-border",
                      title: "title-icon-errorr",
                      text: "text-icon",
                      confirmButton: "confirm-icon",
                      cancelButton: "cancel-icon",
                    },
                  });
                  e.preventDefault();
                }
              }}
            >
              <p className="text-secondary text-[14px] lg:block md:block hidden"></p>
              Data Pertahun
            </NavLink>
          </div>
          <div className="lg:block md:block hidden">{GrafikD1()}</div>

        </div>
      </div>

      <div id="timeseriesnyaaaaaaa2">
        <div className="flex flex-col justify-center items-center  ">
          <div className="relative mt-4 lg:hidden md:hidden">
            <NavLink
              to={"/Berkaca-Grafik-PieChart"}
              className="flex bg-secondary text-white  text-[12px] w-[115px] h-[41px] rounded-[10px] border-1 border-[f1f1f1]  font-medium items-center justify-center cursor-pointer hover:bg-third 
                hover:text-white"
              onClick={(e) => {
                if (
                  selectedCityDaerah1.toLowerCase() !== "semua" &&
                  selectedCityDaerah2.toLowerCase() === "semua"
                ) {
                  Swal.fire({
                    title: "Perhatian!",
                    text: "Silahkan pilih Kab/Kota pada Daerah 2 karena tidak memungkinkan perbandingan antara Provinsi dan Kab/Kota",
                    confirmButtonText: "Tutup",
                    confirmButtonColor: "#24445A",
                    customClass: {
                      icon: "no-border",
                      title: "title-icon-errorr",
                      text: "text-icon",
                      confirmButton: "confirm-icon",
                      cancelButton: "cancel-icon",
                    },
                  });
                  e.preventDefault();
                }
              }}
            >
              <p className="text-secondary text-[14px] lg:hidden md:hidden"></p>
              Data Pertahun
            </NavLink>
          </div>
          <div className="flex mt-[30px] mx-auto items-center justify-center lg:hidden md:hidden">
            <div className="relative cursor-pointer w-[120px] font-medium text-[14px] text-secondary ">
              <div
                onClick={() => setOpenYearsTS(!openYearsTS)}
                className="bg-[#ebebeb] w-full h-[41px] text-[12px] p-2 px-[30px] flex items-center justify-between rounded-[10px]"
              >
                {selectedYearsTS ? selectedYearsTS : "Tahun"}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color="#24445A"
                  className={`ml-auto w-[10px] h-[20px] ${openYearsTS && "rotate-180"
                    }`}
                />
              </div>
              {openYearsTS && (
                <div className="absolute z-10 bg-[#ebebeb] rounded-md shadow-lg w-full top-[45px] text-center">
                  <ul
                    className={`bg-[#ebebeb] rounded-[10px] max-h-60 overflow-y-auto 
                ${openYearsTS ? "max-h-[240px]" : "max-h-[0]"}`}
                  >
                    {years.map((yearData) => (
                      <li
                        key={yearData.tahun}
                        className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] ${disableYear2(yearData.tahun)
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                          }`}
                        onClick={() => {
                          if (!disableYear2(yearData.tahun)) {
                            setSelectedYearsTS(yearData.tahun);
                            setOpenYearsTS(false);
                            setYearsTS(selectedYearsTS);
                            // sessionStorage.setItem("yearss", yearData.tahun);
                          }
                        }}
                      >
                        {yearData.tahun}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <p className="text-secondary mx-[20px]">s/d</p>
            <div className="relative cursor-pointer w-[120px] font-medium text-[14px] text-secondary">
              <div
                onClick={() => setOpenYearsTS2(!openYearsTS2)}
                className="bg-[#ebebeb] w-full h-[41px] text-[12px] p-2 px-[30px] flex items-center justify-between rounded-[10px]"
              >
                {selectedYearsTS2 ? selectedYearsTS2 : "Tahun"}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color="#24445A"
                  className={`ml-auto w-[10px] h-[20px] ${openYearsTS2 && "rotate-180"
                    }`}
                />
              </div>
              {openYearsTS2 && (
                <div className="absolute z-10 bg-[#ebebeb] rounded-md shadow-lg w-full top-[45px] text-center">
                  <ul
                    className={`bg-[#ebebeb] rounded-[10px] max-h-60 overflow-y-auto 
                ${openYearsTS2 ? "max-h-[240px]" : "max-h-[0]"}`}
                  >
                    {years.map((yearData) => (
                      <li
                        key={yearData.tahun}
                        className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] ${disableYear(yearData.tahun)
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                          }`}
                        onClick={() => {
                          if (!disableYear(yearData.tahun)) {
                            setSelectedYearsTS2(yearData.tahun);
                            setOpenYearsTS2(false);
                            setYearsTS2(selectedYearsTS2);
                            // sessionStorage.setItem("yearss", yearData.tahun);
                          }
                        }}
                      >
                        {yearData.tahun}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div class="flex items-center justify-center font-semibold text-secondary mt-[15px] text-[10px] text-[20px] gap-x-[20px] md:hidden lg:hidden">
            <p
              className={
                activeTabMobileDataset === "dataset2" ? "inactive-text" : ""
              }
            >
              Dataset 1
            </p>
            <SwitchBtnDataset
              selected={activeTabMobileDataset}
              onSelect={toggleTabMobileDataset}
            />
            <p
              className={
                activeTabMobileDataset === "dataset1" ? "inactive-text" : ""
              }
            >
              Dataset 2
            </p>
          </div>
          <div
            className={activeTabMobileDataset === "dataset1" ? "" : "hidden"}
          >
            <div className="flex justify-center items-center text-secondary text-[14px] font-bold mt-4 gap-x-[80px]">
              <div className="text-center mt-[10px]">
                <>
                  <p className="text-center font-extrabold text-[24px] text-secondary lg:hidden md:hidden ">
                    {sessionStorage.getItem("namaFilter1")}
                  </p>
                  <p className="text-sm lg:hidden md:hidden font-bold">
                    &#40;{kapitaset1}&#41;
                  </p>
                </>
              </div>
            </div>
          </div>
          <div
            className={activeTabMobileDataset === "dataset2" ? "" : "hidden"}
          >
            <div className="flex justify-center items-center text-secondary text-[14px] font-bold mt-4 gap-x-[80px]">
              <div className="text-center mt-[10px]">
                <>
                  <p className="text-center font-extrabold text-[24px] text-secondary ">
                    {sessionStorage.getItem("namaFilter2")}
                  </p>
                  <p className="text-sm font-bold">
                    &#40;{kapitaset2}&#41;
                  </p>
                </>
              </div>
            </div>
          </div>

          <div className="flex gap-x-[20px] gap-y-[10px] mt-[50px] lg:hidden md:hidden">
            <div className="relative w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:hidden md:hidden">
              <div
                onClick={() => {
                  setOpenProvinsiDaerah1(!openProvinsiDaerah1);
                  if (openCityDaerah1){
                    setOpenCityDaerah1(false);
                  }
                }}
                className="bg-[#ebebeb]  text-[12px] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span
                  style={{
                    maxWidth: "calc(100% - 20px)",
                    display: "inline-block",
                  }}
                >
                  {selectedDaerah1
                    ? selectedDaerah1?.length > 10
                      ? selectedDaerah1?.substring(0, 10) + "..."
                      : selectedDaerah1
                    : "Provinsi"}
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color="#24445A"
                  className={`absolute right-2 top-2 w-[10px] h-[20px] ${openProvinsiDaerah1 && "rotate-180"
                    }`}
                />
              </div>
              <div
                className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
                ${openProvinsiDaerah1 ? "max-h-auto" : "hidden"}`}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  color="#24445A"
                  style={{ opacity: "40%" }}
                  className="w-[10px] h-[20px] opacity-75"
                />
                <input
                  type="text"
                  value={inputValueDaerah1}
                  onChange={(e) =>
                    setInputValueDaerah1(e.target.value.toLowerCase())
                  }
                  placeholder="Cari Provinsi"
                  className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
                />
              </div>

              <ul
                className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openProvinsiDaerah1 ? "max-h-[240px]" : "max-h-[0]"}`}
              >
                {provincessDaerah1?.map((provinces) => (
                  <li
                    key={provinces?.nama}
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${provinces?.nama?.toLowerCase() ===
                      selectedDaerah1?.toLowerCase() &&
                      "bg-secondary text-white"
                      }
                    ${provinces?.nama
                        ?.toLowerCase()
                        .includes(inputValueDaerah1)
                        ? "block"
                        : "hidden"
                      }`}
                    onClick={() => {
                      updateKotaDaerah1(
                        provinces?.nama,
                        selectedDaerah1,
                        provinces.id
                      );
                      sessionStorage.setItem("idprovinsi", provinces.id);
                      sessionStorage.setItem("idwilayah", provinces.id);
                      sessionStorage.setItem("namaprovinsi", provinces.nama);
                      sessionStorage.setItem("namawilayah", "Semua");
                      sessionStorage.setItem("namakota", "Semua");
                      sessionStorage.setItem("idkota", provinces.id);
                      setInfoDaerah1("Semua");
                      setSelectedCityDaerah1("Semua");
                      updateDaerah1(provinces.id);
                      setGetInfoProvinsiDaerah1(provinces.id);
                      setWilayahIDDaerah1(provinces.id);
                      setIsProvinceDaerah1(true);
                      setWilayahIDDaerahSATU("Semua");
                    }}
                  >
                    {provinces?.nama}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:hidden md:hidden">
              <div
                 onClick={() => {
                  setOpenCityDaerah1(!openCityDaerah1);
                  if (openProvinsiDaerah1) {
                    setOpenProvinsiDaerah1(false);
                  }
                }}
                className="bg-[#ebebeb]  text-[12px] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span
                  style={{
                    maxWidth: "calc(100% - 20px)",
                    display: "inline-block",
                  }}
                >
                  {selectedCityDaerah1
                    ? selectedCityDaerah1?.length > 10
                      ? selectedCityDaerah1?.substring(0, 10) + "..."
                      : selectedCityDaerah1
                    : "Kota/Kabupaten"}
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color="#24445A"
                  className={`absolute right-2 top-2 w-[10px] h-[20px] ${openCityDaerah1 && "rotate-180"
                    }`}
                />
              </div>
              <div
                className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
            ${openCityDaerah1 ? "max-h-auto" : "hidden"}`}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  color="#24445A"
                  style={{ opacity: "40%" }}
                  className="w-[10px] h-[20px] opacity-75"
                />
                <input
                  type="text"
                  value={inputValueofCityDaerah1}
                  onChange={(e) =>
                    setInputValueofCityDaerah1(e.target.value.toLowerCase())
                  }
                  placeholder="Cari Kota/Kabupaten"
                  className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
                />
              </div>
              <ul
                className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openCityDaerah1 ? "max-h-[240px]" : "max-h-[0]"}`}
              >
                <li
                  className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary
                    ${"semua" === selectedCityDaerah1?.toLowerCase() &&
                    "bg-secondary text-white"
                    }
                    `}
                  onClick={() => {
                    setWilayahIDDaerahSATU("Semua");
                    sessionStorage.setItem("namawilayah", "Semua");
                    sessionStorage.setItem(
                      "idkota",
                      sessionStorage.getItem("idprovinsi")
                    );
                    sessionStorage.setItem(
                      "idwilayah",
                      sessionStorage.getItem("idprovinsi")
                    );
                    sessionStorage.setItem("namakota", "Semua");
                    setSelectedCityDaerah1("Semua");
                    setWilayahIDDaerah1(getInfoProvinsiDaerah1);
                    // sessionStorage.setItem("idwilayah", getInfoProvinsiDaerah1);
                    setOpenCityDaerah1(false);
                    setIsProvinceDaerah1(true);
                    setInfoDaerah1("Semua");
                    updateDaerah1(getInfoProvinsiDaerah1);
                    setSelectedCityDaerah2("Semua");
                    setWilayahIDDaerah2(getInfoProvinsiDaerah2);
                    setOpenCityDaerah2(false);
                    setIsProvinceDaerah2(true);
                  }}
                >
                  Semua
                </li>
                {citiesDaerah1?.map((regencies) => (
                  <li
                    key={regencies?.nama}
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${regencies?.nama?.toLowerCase() ===
                      selectedCityDaerah1?.toLowerCase() &&
                      "bg-secondary text-white"
                      }
                    ${regencies?.nama
                        ?.toLowerCase()
                        .includes(inputValueofCityDaerah1)
                        ? "block"
                        : "hidden"
                      }`}
                    onClick={() => {
                      if (
                        regencies?.nama?.toLowerCase() !==
                        selectedCityDaerah1.toLowerCase()
                      ) {
                        setWilayahIDDaerahSATU(regencies.id)
                        sessionStorage.setItem("namawilayah", regencies.nama);
                        // sessionStorage.setItem(
                        // "namawilayah_utak",
                        // regencies.nama,
                        // );
                        updateDaerah1(regencies.id);
                        setSelectedCityDaerah1(regencies?.nama);
                        sessionStorage.setItem("idkota", regencies.id);
                        sessionStorage.setItem("idwilayah", regencies.id);
                        sessionStorage.setItem("namakota", regencies.nama);
                        setOpenCityDaerah1(false);
                        setInputValueofCityDaerah1("");
                        setWilayahIDDaerah1(regencies.id);
                        sessionStorage.setItem("idwilayah", regencies.id);
                        setIsProvinceDaerah1(false);
                      }
                    }}
                  >
                    {regencies?.nama}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="xl:hidden lg:hidden md:hidden">{GrafikD2()}</div>
          <div
            className={activeTabMobileDataset === "dataset1" ? "" : "hidden"}
          >
            <div className="text-center text-[14px] lg:text-[16px] mt-[10px] lg:hidden md:hidden">
              <div className=" text-center mb-[20px] mt-[20px] text-[12px] italic text-[#86BBD8] lg:hidden md:hidden">
                <br></br>
                {notes_1 &&
                  typeof notes_1 === "object" &&
                  Object.values(notes_1).map((note, index) => (
                    <div key={index}>- {note}</div>
                  ))}
              </div>
            </div>
          </div>
          <div
            className={activeTabMobileDataset === "dataset2" ? "" : "hidden"}
          >
            <div className=" text-center mb-[20px] mt-[20px] text-[12px] italic text-[#86BBD8] lg:hidden md:hidden">
              <br></br>
              {notes_2_2 &&
                typeof notes_2_2 === "object" &&
                Object.values(notes_2_2).map((note, index) => (
                  <div key={index}>- {note}</div>
                ))}
            </div>
            <div className=" text-center text-[14px] lg:text-[16px] mt-[10px] lg:hidden md:hidden">
            </div>
          </div>
          <div className="flex gap-x-[20px] gap-y-[10px] mt-[50px] lg:hidden md:hidden">
            <div className="relative w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:hidden md:hidden">
              <div
                onClick={() => {
                  setOpenProvinsiDaerah2(!openProvinsiDaerah2);
                  if (openCityDaerah2){
                    setOpenCityDaerah2(false);
                  }
                }}
                className="bg-[#ebebeb]  text-[12px] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span
                  style={{
                    maxWidth: "calc(100% - 20px)",
                    display: "inline-block",
                  }}
                >
                  {selectedDaerah2
                    ? selectedDaerah2?.length > 10
                      ? selectedDaerah2?.substring(0, 10) + "..."
                      : selectedDaerah2
                    : "Provinsi"}
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color="#24445A"
                  className={`absolute right-2 top-2 w-[10px] h-[20px] ${openProvinsiDaerah2 && "rotate-180"
                    }`}
                />
              </div>
              <div
                className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
                ${openProvinsiDaerah2 ? "max-h-auto" : "hidden"}`}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  color="#24445A"
                  style={{ opacity: "40%" }}
                  className="w-[10px] h-[20px] opacity-75"
                />
                <input
                  type="text"
                  value={inputValueDaerah2}
                  onChange={(e) =>
                    setInputValueDaerah2(e.target.value.toLowerCase())
                  }
                  placeholder="Cari Provinsi"
                  className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
                />
              </div>

              <ul
                className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openProvinsiDaerah2 ? "max-h-[240px]" : "max-h-[0]"}`}
              >
                {provincessDaerah2?.map((provinces2) => (
                  <li
                    key={provinces2?.nama}
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${provinces2?.nama?.toLowerCase() ===
                      selectedDaerah2?.toLowerCase() &&
                      "bg-secondary text-white"
                      }
                    ${provinces2?.nama
                        ?.toLowerCase()
                        .includes(inputValueDaerah2)
                        ? "block"
                        : "hidden"
                      }`}
                    onClick={() => {
                      updateKotaDaerah2(
                        provinces2?.nama,
                        selectedDaerah2,
                        provinces2.id
                      );
                      sessionStorage.setItem("idprovinsi_berkaca2", provinces2.id);
                      sessionStorage.setItem(
                        "namaprovinsi_berkaca2",
                        provinces2.nama
                      );
                      sessionStorage.setItem("idprovinsi_berkaca2", provinces2.id);
                      sessionStorage.setItem(
          "namaprovinsi_berkaca2",
                        provinces2.nama
                      );
                      sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                      sessionStorage.setItem("idwilayah_berkaca2", provinces2.id);
                      sessionStorage.setItem("namakota_berkaca2", "Semua");
                      sessionStorage.setItem("idkota_berkaca2", provinces2.id);
                      setInfoDaerah2("Semua");
                      setSelectedCityDaerah2("Semua");
                      setGetInfoProvinsiDaerah2(provinces2.id);
                      setWilayahIDDaerah2(provinces2.id);
                      setIsProvinceDaerah2(true);
                    }}
                  >
                    {provinces2?.nama}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:hidden md:hidden">
              <div
                 onClick={() => {
                  setOpenCityDaerah2(!openCityDaerah2);
                  if (openProvinsiDaerah2) {
                    setOpenProvinsiDaerah2(false);
                  }
                }}
                className="bg-[#ebebeb]  text-[12px] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span
                  style={{
                    maxWidth: "calc(100% - 20px)",
                    display: "inline-block",
                  }}
                >
                  {selectedCityDaerah2
                    ? selectedCityDaerah2?.length > 10
                      ? selectedCityDaerah2?.substring(0, 10) + "..."
                      : selectedCityDaerah2
                    : "Kota/Kabupaten"}
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color="#24445A"
                  className={`absolute right-2 top-2 w-[10px] h-[20px] ${openCityDaerah2 && "rotate-180"
                    }`}
                />
              </div>
              <div
                className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
            ${openCityDaerah2 ? "max-h-auto" : "hidden"}`}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  color="#24445A"
                  style={{ opacity: "40%" }}
                  className="w-[10px] h-[20px] opacity-75"
                />
                <input
                  type="text"
                  value={inputValueofCityDaerah2}
                  onChange={(e) =>
                    setInputValueofCityDaerah2(e.target.value.toLowerCase())
                  }
                  placeholder="Cari Kota/Kabupaten"
                  className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
                />
              </div>
              <ul
                className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openCityDaerah2 ? "max-h-[240px]" : "max-h-[0]"}`}
              >
                {selectedCityDaerah1 === "Semua" ? (
                  <>
                  <li className="p-2 text-[12px] text-gray-400">
                    Pilih tingkat Kab/Kota di Daerah 1 untuk mengakses Kab/Kota
                  </li>
                  <li
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary
                    ${"semua" === selectedCityDaerah2?.toLowerCase() &&
                      "bg-secondary text-white"
                      }
                    `}
                    onClick={() => {
                      // setWilayahIDDaerahDUA("Semua");
                      setSelectedCityDaerah2("Semua");
                      sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                      setSelectedCityDaerah2("Semua");
                      setWilayahIDDaerah2(getInfoProvinsiDaerah2);
                      sessionStorage.setItem(
                        "idkota_berkaca2",
                        sessionStorage.getItem("idprovinsi_berkaca2")
                      );
                      sessionStorage.setItem("idwilayah_berkaca2", 
                      sessionStorage.getItem("idprovinsi_berkaca2")
                    );
                      sessionStorage.setItem("namakota_berkaca2", "Semua");
                      setOpenCityDaerah2(false);
                      setIsProvinceDaerah2(true);
                      sessionStorage.setItem("selectedCity2", "Semua"); // Corrected line
                      sessionStorage.setItem(
                        "infoProvinsi2",
                        getInfoProvinsiDaerah2
                      );
                }}
                  >
                    Semua
                  </li>
                  </>
                ) : (
                  <li className="p-2 text-[12px] text-gray-400">
                    Pilih "Semua" di Daerah 1 untuk mengakses Provinsi
                  </li>
                )}
                {citiesDaerah2?.map((regencies2) => (
                  <li
                    key={regencies2?.nama}
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${regencies2?.nama?.toLowerCase() ===
                      selectedCityDaerah2?.toLowerCase() &&
                      "bg-secondary text-white"
                      }
                    ${regencies2?.nama
                        ?.toLowerCase()
                        .includes(inputValueofCityDaerah2)
                        ? "block"
                        : "hidden"
                      }`}
                    onClick={() => {
                      if (selectedCityDaerah1 === "Semua") {
                        setSelectedCityDaerah2("Semua");
                        return;
                      }
                      if (
                        regencies2?.nama?.toLowerCase() !==
                        selectedCityDaerah2.toLowerCase()
                      ) {
                        // setWilayahIDDaerahDUA(regencies2.id)
                        sessionStorage.setItem(
                          "namawilayah_berkaca2",
                          regencies2.nama
                        );
                        sessionStorage.setItem(
                          "namawilayah_berkaca2",
                          regencies2.nama
                        );
                        setSelectedCityDaerah2(regencies2?.nama);
                        sessionStorage.setItem("idkota_berkaca2", regencies2.id);
                        sessionStorage.setItem(
                          "namakota_berkaca2",
                          regencies2.nama
                        );
                        sessionStorage.setItem("idwilayah_berkaca2", regencies2.id);
                        setOpenCityDaerah2(false);
                        setInputValueofCityDaerah2("");
                        setWilayahIDDaerah2(regencies2.id);
                        setIsProvinceDaerah2(false);
                      }
                    }}
                    style={{
                      color:
                        selectedCityDaerah1 === "Semua" &&
                          regencies2?.nama !== "Semua"
                          ? "gray"
                          : null,
                    }}
                    disabled={selectedCityDaerah1 === "Semua"}
                  >
                    {regencies2?.nama}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:hidden md:hidden">{GrafikD3()}</div>
          <div
            className={activeTabMobileDataset === "dataset1" ? "" : "hidden"}
          >
            <div className="text-center text-[14px] lg:text-[16px] mt-[10px] lg:hidden md:hidden">
              <div className=" text-center mb-[20px] mt-[20px] text-[12px] italic text-[#86BBD8] lg:hidden md:hidden">
                <br></br>
                {notes_1 &&
                  typeof notes_1 === "object" &&
                  Object.values(notes_1).map((note, index) => (
                    <div key={index}>- {note}</div>
                  ))}
              </div>
              {notes && notes.length > 0 && (
                <p className="mb-[20px]">
                  <span className="font-extrabold text-secondary text-secondary">Catatan:</span> <br />
                  <span className="text-third">
                    {notes}
                  </span>
                </p>
              )}
              <p className="italic text-[#919BA2]">
                Sumber: <br></br>{" "}
                {sumbernya1.length === 2 ? sumbernya1.join(" & ") : sumbernya1}
              </p>
            </div>
          </div>
          <div
            className={activeTabMobileDataset === "dataset2" ? "" : "hidden"}
          >
            <div className=" text-center mb-[20px] mt-[20px] text-[12px] italic text-[#86BBD8] lg:hidden md:hidden">
              <br></br>
              {notes_2_2 &&
                typeof notes_2_2 === "object" &&
                Object.values(notes_2_2).map((note, index) => (
                  <div key={index}>- {note}</div>
                ))}
            </div>
            <div className=" text-center text-[14px] lg:text-[16px] mt-[10px] lg:hidden md:hidden">
                {notes2 && notes2.length > 0 && (
                <p className="mb-[20px]">
                  <span className="font-extrabold text-secondary text-secondary">Catatan:</span> <br />
                  <span className="text-third">
                    {notes2}
                  </span>
                </p>
              )}
              <p className="italic text-[#919BA2]">
                Sumber: <br></br>{" "}
                {sumbernya2.length === 2 ? sumbernya2.join(" & ") : sumbernya2}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full h-[50px] items-center justify-center gap-[10px] md:gap-[20px] text-secondary">
          <div className="flex items-center gap-[10px]">
            <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-md bg-primary drop-shadow-lg flex justify-center items-center ">
              <FontAwesomeIcon icon={faEye} color="#24445A" className="" />
            </div>
            <p className="text-[12px] md:text-[16px]">
              {view_info_halaman_timeseries} Lihat
            </p>
          </div>

          {/* Simpan */}
          <div className="flex items-center gap-[10px]">
            <div
              className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-md bg-primary drop-shadow-lg flex justify-center items-center hover:bg-third cursor-pointer"
              onClick={() => {
                if (akunPrem === "Y") {
                  togglePopupSimpan();
                } else {
                  SimpanHalamanSemua(halaman_timeseries);
                }
              }}
            >
              <FontAwesomeIcon icon={faBookBookmark} color="#24445A" />
            </div>
            <p className="text-[12px] md:text-[16px]">
              {simpan_info_halaman_timeseries} Simpan
            </p>
          </div>

          {showPopupSimpan && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
              <div className="flex flex-col bg-white rounded-[25px] justify-evenly items-center w-[700px] h-[450px] md:h-[600px] mx-[40px] px-[20px]">
                <h1 className="text-[24px] md:text-[34px] font-bold text-secondary text-center">
                  Simpan Halaman
                </h1>
                {/* BUTTON COLLECTION */}
                <div className="flex flex-col w-[320px] max-h-[200px] overflow-y-scroll mini-scrollbar cursor-pointer">
                  <div
                    className="flex"
                    onClick={() => {
                      SimpanHalamanSemua(halaman_timeseries);
                    }}
                  >
                    <div className="button w-full bg-[#ebebeb] text-secondary hover:bg-third hover:text-white font-medium mt-[10px]">
                      <p className="text-sm font-medium ">Semua</p>
                    </div>
                  </div>
                  {KoleksiUser?.map((collectionUser) => (
                    <div
                      className="flex"
                      onClick={() => {
                        SimpanHalamanKoleksi(halaman_timeseries, collectionUser.id);
                      }}
                    >
                      <div className="button w-full bg-[#ebebeb] text-secondary hover:bg-third hover:text-white font-medium mt-[10px]">
                        <p className="text-sm font-medium ">
                          {collectionUser.nama}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* BUTTON ACTION */}
                <div className="flex flex-col w-[320px]">
                  <button
                    className="button focus:outline-none focus:shadow-outline w-full bg-secondary hover:bg-third font-medium mt-[20px]"
                    type="button"
                    onClick={togglePopupKoleksi}
                  >
                    Tambah Koleksi
                  </button>
                  <button
                    className="button focus:outline-none focus:shadow-outline w-full bg-[#CD3838] hover:bg-[#E54747] font-medium mt-[10px]"
                    type="button"
                    onClick={togglePopupSimpan}
                  >
                    Batalkan
                  </button>
                </div>
              </div>
            </div>
          )}

          {showPopupKoleksi && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
              <div className="flex flex-col bg-white rounded-[25px] justify-evenly items-center w-[700px] h-[450px] md:h-[600px] mx-[40px] px-[20px]">
                <h1 className="text-[24px] md:text-[34px] font-bold text-secondary text-center">
                  Buat Koleksi
                </h1>
                {/* FORM */}
                {/* <div className="flex flex-col w-[320px] max-h-[200px] overflow-y-scroll mini-scrollbar cursor-pointer">
                            <div className="flex" onClick={() => {SimpanHalamanSemua(infoKodePage)}}>
                              <div className="button w-full bg-[#ebebeb] text-secondary hover:bg-third hover:text-white font-medium mt-[10px]">
                                <p className="text-sm font-medium ">Semua</p>
                              </div>
                            </div>
                            {KoleksiUser?.map((collectionUser) => (
                              <div className="flex" onClick={() => {SimpanHalamanKoleksi(infoKodePage, collectionUser.id)}}>
                                <div className="button w-full bg-[#ebebeb] text-secondary hover:bg-third hover:text-white font-medium mt-[10px]">
                                  <p className="text-sm font-medium ">{collectionUser.nama}</p>
                                </div>
                              </div>
                            ))}
                          </div> */}
                <div className="flex w-[320px] h-[40px] border rounded-[8px] text-secondary py-2 px-3 text-[14px] items-center">
                  <input
                    className="focus:outline-none focus:shadow-outline font-regular w-full"
                    id="namaKoleksi"
                    type="text"
                    name="namaKoleksi"
                    placeholder="Nama Koleksi"
                    value={formCollection.namaKoleksi}
                    onChange={handleNewCollection}
                  />
                </div>
                {/* BUTTON ACTION */}
                <div className="flex flex-col w-[320px]">
                  <button
                    className="button focus:outline-none focus:shadow-outline w-full bg-secondary hover:bg-third font-medium mt-[20px]"
                    type="button"
                    onClick={addNewCollection}
                  >
                    Simpan
                  </button>
                  <button
                    className="button focus:outline-none focus:shadow-outline w-full bg-[#CD3838] hover:bg-[#E54747] font-medium mt-[10px]"
                    type="button"
                    onClick={togglePopupKoleksi}
                  >
                    Batalkan
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]  rounded-md bg-primary drop-shadow-lg flex justify-center items-center hover:bg-third cursor-pointer"
            onClick={() => {
              if (tokenUser == null) {
                Swal.fire({
                  title: "Perhatian!",
                  text: "Untuk mengakses fitur ini, Anda perlu masuk menggunakan Akun anda terlebih dahulu.",
                  confirmButtonText: "Masuk",
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
                    sessionStorage.setItem(
                      "redirectPath",
                      window.location.pathname
                    );
                    window.location.href = "/Masuk";
                  },
                });
              } else {
                window.open(
                  process.env.REACT_APP_URL_API +
                    `/download-pdf?halaman=${halaman_timeseries}&id_member=${sessionStorage.getItem(
                      "member"
                    )}`
                );
              }
            }}
          >
            <FontAwesomeIcon icon={faDownload} color="#24445A" />
          </button>
          <div
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]  rounded-md bg-primary drop-shadow-lg flex justify-center items-center hover:bg-third cursor-pointer"
            onClick={() => shareBtn(halaman_timeseries)}
          >
            <FontAwesomeIcon icon={faShare} color="#24445A" />
          </div>
          <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-md bg-primary drop-shadow-lg flex justify-center items-center opacity-60">
            <FontAwesomeIcon icon={faSearchLocation} color="#24445A" />
          </div>
        </div>
      </div>
       {/* {handle daerah 1} */}
      {/* Popup untuk ubah daerah 2  */}
      <Modal isOpen={isModalOpen}>
        <div className="text-[14px] text-secondary text-center mb-4 font-medium">
          Silakan pilih Kab/Kota pada <span className="font-bold text-secondary" style={{ backgroundColor: '#24445A', color: 'white', padding: '0 4px', borderRadius: '4px' }}> DAERAH 2</span> karena tidak memungkinkan perbandingan antara Provinsi dan Kab/Kota
        </div>
        <div className="flex flex-row justify-between items-center xl:gap-[20px]">
        <div className="relative xl:w-[300px] lg:w-[200px] md:w-[200px] w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
          <div
            onClick={() => {
              setOpenProvinsiDaerah2Modal(!openProvinsiDaerah2Modal);
              if (openCityDaerah2Modal) {
                setOpenCityDaerah2Modal(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedDaerah2
              ? selectedDaerah2?.length > 20
                ? selectedDaerah2?.substring(0, 20) + "..."
                : selectedDaerah2
              : "Provinsi"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${openProvinsiDaerah2Modal && "rotate-180"
                }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
                ${openProvinsiDaerah2Modal ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValueDaerah2}
              onChange={(e) =>
                setInputValueDaerah2(e.target.value.toLowerCase())
              }
              placeholder="Cari Provinsi"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>

          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openProvinsiDaerah2Modal ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {provincessDaerah2?.map((provinces2) => (
              <li
                key={provinces2?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${provinces2?.nama?.toLowerCase() ===
                  selectedDaerah2?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                    ${provinces2?.nama
                    ?.toLowerCase()
                    .includes(inputValueDaerah2)
                    ? "block"
                    : "hidden"
                  }`}
                onClick={() => {
                  updateKotaDaerah2(
                    provinces2?.nama,
                    selectedDaerah2,
                    provinces2.id
                  );
                  sessionStorage.setItem("idprovinsi_berkaca2", provinces2.id);
                  sessionStorage.setItem(
                    "namaprovinsi_berkaca2",
                    provinces2.nama
                  );
                  sessionStorage.setItem("idprovinsi_berkaca2", provinces2.id);
                  sessionStorage.setItem(
                    "namaprovinsi_berkaca2",
                    provinces2.nama
                  );
                  sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                  sessionStorage.setItem("idwilayah_berkaca2", provinces2.id);
                  sessionStorage.setItem("namakota_berkaca2", "Semua");
                  sessionStorage.setItem("idkota_berkaca2", provinces2.id);
                  setInfoDaerah2("Semua");
                  setSelectedCityDaerah2("Semua");
                  setGetInfoProvinsiDaerah2(provinces2.id);
                  // setWilayahIDDaerah2(provinces2.id);
                  setIsProvinceDaerah2(true);
                  // setWilayahIDDaerahDUA("Semua");
                }}
              >
                {provinces2?.nama}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative xl:w-[300px] lg:w-[200px] md:w-[200px] w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
          <div
            onClick={() => {
              setOpenCityDaerah2Modal(!openCityDaerah2Modal);
              if (openProvinsiDaerah2Modal) {
                setOpenProvinsiDaerah2Modal(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedCityDaerah2
              ? selectedCityDaerah2?.length > 20
                ? selectedCityDaerah2?.substring(0, 20) + "..."
                : selectedCityDaerah2
              : "Kota/Kabupaten"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${openCityDaerah2Modal && "rotate-180"
                }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
            ${openCityDaerah2Modal ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValueofCityDaerah2}
              onChange={(e) =>
                setInputValueofCityDaerah2(e.target.value.toLowerCase())
              }
              placeholder="Cari Kota/Kabupaten"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>
          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openCityDaerah2Modal ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {selectedCityDaerah1 === "Semua" ? (
              <>
              <li className="p-2 text-[12px] text-gray-400">
                Pilih tingkat Kab/Kota di Daerah 1 untuk mengakses Kab/Kota
              </li>
              <li
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary
                    ${"semua" === selectedCityDaerah2?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                    `}
                onClick={() => {
                  // setWilayahIDDaerahDUA("Semua");
                  setSelectedCityDaerah2("Semua");

                  sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                  setSelectedCityDaerah2("Semua");
                  // setWilayahIDDaerah2(getInfoProvinsiDaerah2);
                  sessionStorage.setItem(
                    "idkota_berkaca2",
                    sessionStorage.getItem("idprovinsi_berkaca2")
                  );
                  sessionStorage.setItem("idwilayah_berkaca2", 
                  sessionStorage.getItem("idprovinsi_berkaca2")
                );
                  sessionStorage.setItem("namakota_berkaca2", "Semua");
                  setOpenCityDaerah2(false);
                  setIsProvinceDaerah2(true);
                  sessionStorage.setItem("selectedCity2", "Semua"); // Corrected line
                  sessionStorage.setItem(
                    "infoProvinsi2",
                    getInfoProvinsiDaerah2
                  );
                }}
              >
                Semua
              </li>
              </>
            ) : (
              <li >
              </li>
            )}
            {citiesDaerah2?.map((regencies2) => (
              <li
                key={regencies2?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${regencies2?.nama?.toLowerCase() ===
                  selectedCityDaerah2?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                    ${regencies2?.nama
                    ?.toLowerCase()
                    .includes(inputValueofCityDaerah2)
                    ? "block"
                    : "hidden"
                  }`}
                onClick={() => {
                  // if (selectedCityDaerah1 === "Semua") {
                  //   setSelectedCityDaerah2("Semua");
                  //   return;
                  // }
                  if (
                    regencies2?.nama?.toLowerCase() !==
                    selectedCityDaerah2.toLowerCase()
                  ) {
                    // setWilayahIDDaerahDUA(regencies2.id)
                    sessionStorage.setItem(
                      "namawilayah_berkaca2",
                      regencies2.nama
                    );
                    sessionStorage.setItem(
                      "namawilayah_berkaca2",
                      regencies2.nama
                    );
                    setSelectedCityDaerah2(regencies2?.nama);
                    sessionStorage.setItem("idkota_berkaca2", regencies2.id);
                    sessionStorage.setItem(
                      "namakota_berkaca2",
                      regencies2.nama
                    );
                    sessionStorage.setItem("idwilayah_berkaca2", regencies2.id);
                    setOpenCityDaerah2(false);
                    setInputValueofCityDaerah2("");
                    // setWilayahIDDaerah2(regencies2.id);
                    setIsProvinceDaerah2(false);
                  }
                }}
              >
                {regencies2?.nama}
              </li>
            ))}
          </ul>
        </div>
        </div>
        <div className="text-center mt-4">
          <button
            onClick={() => {
              setIsModalOpen(false);
              setWasTerapkanClickedWhileModalOpen(true);
              if (selectedCityDaerah2.toLowerCase() === "semua") {
                setWilayahIDDaerah2(getInfoProvinsiDaerah2);
              } else {
                const selectedRegency2 = citiesDaerah2.find(regency => regency.nama.toLowerCase() === selectedCityDaerah2.toLowerCase());
                if (selectedRegency2) {
                  setWilayahIDDaerah2(selectedRegency2.id);
                }
              }
              if (selectedCityDaerah2.toLowerCase() === "semua" && selectedDaerah2) {
                const selectedProvince2 = provincessDaerah2.find(province => province.nama.toLowerCase() === selectedDaerah2.toLowerCase());
                if (selectedProvince2) {
                  setWilayahIDDaerah2(selectedProvince2.id);
                }
              }
            }}
            className={"bg-secondary text-white px-4 py-2 rounded "}
          >
            Terapkan
          </button>
        </div>

      </Modal>
      {/* Popup untuk ubah daerah 1  */}
      <Modal2 isOpen2={isModalOpen2}>
        <div className="text-[14px] text-secondary text-center mb-4 font-medium">
          Silakan pilih Kab/Kota pada <span className="font-bold text-secondary" style={{ backgroundColor: '#24445A', color: 'white', padding: '0 4px', borderRadius: '4px' }}> DAERAH 1</span> karena tidak memungkinkan perbandingan antara Provinsi dan Kab/Kota
        </div>
        <div className="flex flex-row justify-between items-center xl:gap-[20px]">
          {/* Provinsi */}
          <div className="relative xl:w-[300px] lg:w-[200px] md:w-[200px] w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
          <div
            onClick={() => {
              setOpenProvinsiDaerah1Modal(!openProvinsiDaerah1Modal);
              if (openCityDaerah1Modal) {
                setOpenCityDaerah1Modal(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedDaerah1
              ? selectedDaerah1?.length > 20
                ? selectedDaerah1?.substring(0, 20) + "..."
                : selectedDaerah1
              : "Provinsi"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${openProvinsiDaerah1Modal && "rotate-180"
                }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
                ${openProvinsiDaerah1Modal ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValueDaerah1}
              onChange={(e) =>
                setInputValueDaerah1(e.target.value.toLowerCase())
              }
              placeholder="Cari Provinsi"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>

          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openProvinsiDaerah1Modal ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {provincessDaerah1?.map((provinces) => (
              <li
                key={provinces?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${provinces?.nama?.toLowerCase() ===
                  selectedDaerah1?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                    ${provinces?.nama
                    ?.toLowerCase()
                    .includes(inputValueDaerah1)
                    ? "block"
                    : "hidden"
                  }`}
                onClick={() => {
                  updateKotaDaerah1(
                    provinces?.nama,
                    selectedDaerah1,
                    provinces.id
                  );
                  sessionStorage.setItem("idprovinsi", provinces.id);
                  sessionStorage.setItem("idwilayah", provinces.id);
                  sessionStorage.setItem("namaprovinsi", provinces.nama);
                  sessionStorage.setItem("namawilayah", "Semua");
                  sessionStorage.setItem("namakota", "Semua");
                  sessionStorage.setItem("idkota", provinces.id);
                  setInfoDaerah1("Semua");
                  setSelectedCityDaerah1("Semua");
                  updateDaerah1(provinces.id);
                  setGetInfoProvinsiDaerah1(provinces.id);
                  // setWilayahIDDaerah1(provinces.id);
                  setIsProvinceDaerah1(true);
                }}
              >
                {provinces?.nama}
              </li>
            ))}
          </ul>
        </div>
          {/* Kota */}
          <div className="relative xl:w-[300px] lg:w-[200px] md:w-[200px] w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
          <div
            onClick={() => {
              setOpenCityDaerah1Modal(!openCityDaerah1Modal);
              if (openProvinsiDaerah1Modal) {
                setOpenProvinsiDaerah1Modal(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedCityDaerah1
              ? selectedCityDaerah1?.length > 20
                ? selectedCityDaerah1?.substring(0, 20) + "..."
                : selectedCityDaerah1
              : "Kota/Kabupaten"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${openCityDaerah1Modal && "rotate-180"
                }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
            ${openCityDaerah1Modal ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValueofCityDaerah1}
              onChange={(e) =>
                setInputValueofCityDaerah1(e.target.value.toLowerCase())
              }
              placeholder="Cari Kota/Kabupaten"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>
          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openCityDaerah1Modal ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {selectedCityDaerah2 === "Semua" && (
            <li
              className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary
                    ${"semua" === selectedCityDaerah1?.toLowerCase() &&
                "bg-secondary text-white"
                }
                    `}
              onClick={() => {
                sessionStorage.setItem("namawilayah", "Semua");
                sessionStorage.setItem(
                  "idkota",
                  sessionStorage.getItem("idprovinsi")
                );
                sessionStorage.setItem(
                  "idwilayah",
                  sessionStorage.getItem("idprovinsi")
                );
                sessionStorage.setItem("namakota", "Semua");
                setSelectedCityDaerah1("Semua");
                setWilayahIDDaerah1(getInfoProvinsiDaerah1);
                // sessionStorage.setItem("idwilayah", getInfoProvinsiDaerah1);
                setOpenCityDaerah1(false);
                setIsProvinceDaerah1(true);
                setInfoDaerah1("Semua");
                updateDaerah1(getInfoProvinsiDaerah1);
                // setSelectedCityDaerah2("Semua");
                // setSelectedCityDaerah2("Semua");
                // // setWilayahIDDaerah2(getInfoProvinsiDaerah2);
                // setOpenCityDaerah2(false);
                // setIsProvinceDaerah2(true);
              }}
            >
              Semua
            </li>
             )}
            {citiesDaerah1?.map((regencies) => (
              <li
                key={regencies?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${regencies?.nama?.toLowerCase() ===
                  selectedCityDaerah1?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                    ${regencies?.nama
                    ?.toLowerCase()
                    .includes(inputValueofCityDaerah1)
                    ? "block"
                    : "hidden"
                  }`}
                onClick={() => {
                  if (
                    regencies?.nama?.toLowerCase() !==
                    selectedCityDaerah1.toLowerCase()
                  ) {
                    sessionStorage.setItem("namawilayah", regencies.nama);
                    // sessionStorage.setItem(
                    // "namawilayah_utak",
                    // regencies.nama,
                    // );
                    updateDaerah1(regencies.id);
                    setSelectedCityDaerah1(regencies?.nama);
                    sessionStorage.setItem("idkota", regencies.id);
                    sessionStorage.setItem("idwilayah", regencies.id);
                    sessionStorage.setItem("namakota", regencies.nama);
                    setOpenCityDaerah1(false);
                    setInputValueofCityDaerah1("");
                    // setWilayahIDDaerah1(regencies.id);
                    sessionStorage.setItem("idwilayah", regencies.id);
                    setIsProvinceDaerah1(false);
                  }
                }}
                style={{
                  color:
                    (selectedCityDaerah2 === "Semua" && regencies?.nama !== "Semua") || regencies?.nama === "Semua"
                      ? "gray"
                      : null,
                }}
                disabled={(selectedCityDaerah2 === "Semua" && regencies?.nama !== "Semua") || regencies?.nama === "Semua"}
              >
                {regencies?.nama}
              </li>
            ))}
          </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <button
           onClick={() => {
            setIsModalOpen2(false);
            setWasTerapkanClickedWhileModalOpen2(true);
            if (selectedCityDaerah1.toLowerCase() === "semua") {
              setWilayahIDDaerah1(getInfoProvinsiDaerah1);
            } else {
              const selectedRegency = citiesDaerah1.find(regency => regency.nama.toLowerCase() === selectedCityDaerah1.toLowerCase());
              if (selectedRegency) {
                setWilayahIDDaerah1(selectedRegency.id);
              }
            }
            if (selectedCityDaerah1.toLowerCase() === "semua" && selectedDaerah1) {
              const selectedProvince = provincessDaerah1.find(province => province.nama.toLowerCase() === selectedDaerah1.toLowerCase());
              if (selectedProvince) {
                setWilayahIDDaerah1(selectedProvince.id);
                sessionStorage.setItem("idkota",selectedProvince.id);
                sessionStorage.setItem("idwilayah",selectedProvince.id);
              }
            }
          }}
            disabled={isOkeButtonDisabled2}
            className={`bg-secondary text-white px-4 py-2 rounded ${
              isOkeButtonDisabled2 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Terapkan
          </button>
        </div>
      </Modal2>
      {/* {handle daerah 1} */}
      {/* Popup untuk ubah daerah 2  */}
      <Modal3 isOpen3={isModalOpen3}>
        <div className="text-[14px] text-secondary text-center mb-4 font-medium">
          Silakan pilih Kab/Kota pada <span className="font-bold text-secondary" style={{ backgroundColor: '#24445A', color: 'white', padding: '0 4px', borderRadius: '4px' }}> DAERAH 2</span> karena tidak memungkinkan perbandingan antara Provinsi dan Kab/Kota
        </div>
        <div className="flex justify-center mb-2">
          <p className="font-bold text-center text-secondary">Daerah 2</p>
        </div>
        <div className="flex flex-row justify-between items-center xl:gap-[20px]">
        <div className="relative xl:w-[300px] lg:w-[200px] md:w-[200px] w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
          <div
            onClick={() => {
              setOpenProvinsiDaerah2Modal(!openProvinsiDaerah2Modal);
              if (openCityDaerah2Modal) {
                setOpenCityDaerah2Modal(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedDaerah2
              ? selectedDaerah2?.length > 20
                ? selectedDaerah2?.substring(0, 20) + "..."
                : selectedDaerah2
              : "Provinsi"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${openProvinsiDaerah2Modal && "rotate-180"
                }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
                ${openProvinsiDaerah2Modal ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValueDaerah2}
              onChange={(e) =>
                setInputValueDaerah2(e.target.value.toLowerCase())
              }
              placeholder="Cari Provinsi"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>

          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openProvinsiDaerah2Modal ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {provincessDaerah2?.map((provinces2) => (
              <li
                key={provinces2?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${provinces2?.nama?.toLowerCase() ===
                  selectedDaerah2?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                    ${provinces2?.nama
                    ?.toLowerCase()
                    .startsWith(inputValueDaerah2)
                    ? "block"
                    : "hidden"
                  }`}
                onClick={() => {
                  updateKotaDaerah2(
                    provinces2?.nama,
                    selectedDaerah2,
                    provinces2.id
                  );
                  sessionStorage.setItem("idprovinsi_berkaca2", provinces2.id);
                  sessionStorage.setItem(
                    "namaprovinsi_berkaca2",
                    provinces2.nama
                  );
                  sessionStorage.setItem("idprovinsi_berkaca2", provinces2.id);
                  sessionStorage.setItem(
                    "namaprovinsi_berkaca2",
                    provinces2.nama
                  );
                  sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                  sessionStorage.setItem("idwilayah_berkaca2", provinces2.id);
                  sessionStorage.setItem("namakota_berkaca2", "Semua");
                  sessionStorage.setItem("idkota_berkaca2", provinces2.id);
                  setInfoDaerah2("Semua");
                  setSelectedCityDaerah2("Semua");
                  setGetInfoProvinsiDaerah2(provinces2.id);
                  // setWilayahIDDaerah2(provinces2.id);
                  setIsProvinceDaerah2(true);
                }}
              >
                {provinces2?.nama}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative xl:w-[300px] lg:w-[200px] md:w-[200px] w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
          <div
            onClick={() => {
              setOpenCityDaerah2Modal(!openCityDaerah2Modal);
              if (openProvinsiDaerah2Modal) {
                setOpenProvinsiDaerah2Modal(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedCityDaerah2
              ? selectedCityDaerah2?.length > 20
                ? selectedCityDaerah2?.substring(0, 20) + "..."
                : selectedCityDaerah2
              : "Kota/Kabupaten"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${openCityDaerah2Modal && "rotate-180"
                }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
            ${openCityDaerah2Modal ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValueofCityDaerah2}
              onChange={(e) =>
                setInputValueofCityDaerah2(e.target.value.toLowerCase())
              }
              placeholder="Cari Kota/Kabupaten"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>
          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openCityDaerah2Modal ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {selectedCityDaerah1 === "Semua" ? (
              <>
              <li className="p-2 text-[12px] text-gray-400">
                Pilih tingkat Kab/Kota di Daerah 1 untuk mengakses Kab/Kota
              </li>
              <li
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary
                    ${"semua" === selectedCityDaerah2?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                    `}
                onClick={() => {
                  setSelectedCityDaerah2("Semua");

                  sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                  setSelectedCityDaerah2("Semua");
                  // setWilayahIDDaerah2(getInfoProvinsiDaerah2);
                  sessionStorage.setItem(
                    "idkota_berkaca2",
                    sessionStorage.getItem("idprovinsi_berkaca2")
                  );
                  sessionStorage.setItem("idwilayah_berkaca2", 
                  sessionStorage.getItem("idprovinsi_berkaca2")
                );
                  sessionStorage.setItem("namakota_berkaca2", "Semua");
                  setOpenCityDaerah2(false);
                  setIsProvinceDaerah2(true);
                  sessionStorage.setItem("selectedCity2", "Semua"); // Corrected line
                  sessionStorage.setItem(
                    "infoProvinsi2",
                    getInfoProvinsiDaerah2
                  );
                }}
              >
                Semua
              </li>
              </>
            ) : (
              <li>
              </li>
            )}
            {citiesDaerah2?.map((regencies2) => (
              <li
                key={regencies2?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${regencies2?.nama?.toLowerCase() ===
                  selectedCityDaerah2?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                    ${regencies2?.nama
                    ?.toLowerCase()
                    .startsWith(inputValueofCityDaerah2)
                    ? "block"
                    : "hidden"
                  }`}
                onClick={() => {
                  // if (selectedCityDaerah1 === "Semua") {
                  //   setSelectedCityDaerah2("Semua");
                  //   return;
                  // }
                  if (
                    regencies2?.nama?.toLowerCase() !==
                    selectedCityDaerah2.toLowerCase()
                  ) {
                    sessionStorage.setItem(
                      "namawilayah_berkaca2",
                      regencies2.nama
                    );
                    sessionStorage.setItem(
                      "namawilayah_berkaca2",
                      regencies2.nama
                    );
                    setSelectedCityDaerah2(regencies2?.nama);
                    sessionStorage.setItem("idkota_berkaca2", regencies2.id);
                    sessionStorage.setItem(
                      "namakota_berkaca2",
                      regencies2.nama
                    );
                    sessionStorage.setItem("idwilayah_berkaca2", regencies2.id);
                    setOpenCityDaerah2(false);
                    setInputValueofCityDaerah2("");
                    // setWilayahIDDaerah2(regencies2.id);
                    setIsProvinceDaerah2(false);
                  }
                }}
                style={{
                  color:
                    (selectedCityDaerah1 === "Semua" && regencies2?.nama !== "Semua") || regencies2?.nama === "Semua"
                      ? "gray"
                      : null,
                }}
                disabled={(selectedCityDaerah1 === "Semua" && regencies2?.nama !== "Semua") || regencies2?.nama === "Semua"}
              >
                {regencies2?.nama}
              </li>
            ))}
          </ul>
        </div>
        </div>
        <div className="text-center mt-4">
          <button
            onClick={() => {
              setIsModalOpen3(false);
              setWasTerapkanClickedWhileModalOpen3(true);
              if (selectedCityDaerah2.toLowerCase() === "semua") {
                setWilayahIDDaerah2(getInfoProvinsiDaerah2);
              } else {
                const selectedRegency2 = citiesDaerah2.find(regency => regency.nama.toLowerCase() === selectedCityDaerah2.toLowerCase());
                if (selectedRegency2) {
                  setWilayahIDDaerah2(selectedRegency2.id);
                }
              }
              if (selectedCityDaerah2.toLowerCase() === "semua" && selectedDaerah2) {
                const selectedProvince2 = provincessDaerah2.find(province => province.nama.toLowerCase() === selectedDaerah2.toLowerCase());
                if (selectedProvince2) {
                  setWilayahIDDaerah2(selectedProvince2.id);
                }
              }
            }}
            disabled={isOkeButtonDisabled}
            className={`bg-secondary text-white px-4 py-2 rounded ${
              isOkeButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Terapkan
          </button>
        </div>

      </Modal3>
       {/* Popup untuk ubah daerah 1  */}
      <Modal4 isOpen4={isModalOpen4}>
        <div className="text-[14px] text-secondary text-center mb-4 font-medium">
          Silakan pilih Kab/Kota pada <span className="font-bold text-secondary" style={{ backgroundColor: '#24445A', color: 'white', padding: '0 4px', borderRadius: '4px' }}> DAERAH 1</span> karena tidak memungkinkan perbandingan antara Provinsi dan Kab/Kota
        </div>
        <div className="flex flex-row justify-between items-center xl:gap-[20px]">
        
          <div className="relative xl:w-[300px] lg:w-[200px] md:w-[200px] w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
          <div
            onClick={() => {
              setOpenProvinsiDaerah1Modal(!openProvinsiDaerah1Modal);
              if (openCityDaerah1Modal) {
                setOpenCityDaerah1Modal(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedDaerah1
              ? selectedDaerah1?.length > 20
                ? selectedDaerah1?.substring(0, 20) + "..."
                : selectedDaerah1
              : "Provinsi"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${openProvinsiDaerah1Modal && "rotate-180"
                }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
                ${openProvinsiDaerah1Modal ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValueDaerah1}
              onChange={(e) =>
                setInputValueDaerah1(e.target.value.toLowerCase())
              }
              placeholder="Cari Provinsi"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>

          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openProvinsiDaerah1Modal ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {provincessDaerah1?.map((provinces) => (
              <li
                key={provinces?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${provinces?.nama?.toLowerCase() ===
                  selectedDaerah1?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                    ${provinces?.nama
                    ?.toLowerCase()
                    .startsWith(inputValueDaerah1)
                    ? "block"
                    : "hidden"
                  }`}
                onClick={() => {
                  updateKotaDaerah1(
                    provinces?.nama,
                    selectedDaerah1,
                    provinces.id
                  );
                  sessionStorage.setItem("idprovinsi", provinces.id);
                  sessionStorage.setItem("idwilayah", provinces.id);
                  sessionStorage.setItem("namaprovinsi", provinces.nama);
                  sessionStorage.setItem("namawilayah", "Semua");
                  sessionStorage.setItem("namakota", "Semua");
                  sessionStorage.setItem("idkota", provinces.id);
                  setInfoDaerah1("Semua");
                  setSelectedCityDaerah1("Semua");
                  updateDaerah1(provinces.id);
                  setGetInfoProvinsiDaerah1(provinces.id);
                  // setWilayahIDDaerah1(provinces.id);
                  setIsProvinceDaerah1(true);
                }}
              >
                {provinces?.nama}
              </li>
            ))}
          </ul>
        </div>
          <div className="relative xl:w-[300px] lg:w-[200px] md:w-[200px] w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
          <div
            onClick={() => {
              setOpenCityDaerah1Modal(!openCityDaerah1Modal);
              if (openProvinsiDaerah1Modal) {
                setOpenProvinsiDaerah1Modal(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedCityDaerah1
              ? selectedCityDaerah1?.length > 20
                ? selectedCityDaerah1?.substring(0, 20) + "..."
                : selectedCityDaerah1
              : "Kota/Kabupaten"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${openCityDaerah1Modal && "rotate-180"
                }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
            ${openCityDaerah1Modal ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValueofCityDaerah1}
              onChange={(e) =>
                setInputValueofCityDaerah1(e.target.value.toLowerCase())
              }
              placeholder="Cari Kota/Kabupaten"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>
          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                ${openCityDaerah1Modal ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            <li
              className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary
                    ${"semua" === selectedCityDaerah1?.toLowerCase() &&
                "bg-secondary text-white"
                }
                    `}
              onClick={() => {
                setWilayahIDDaerahSATU("Semua");
                sessionStorage.setItem("namawilayah", "Semua");
                sessionStorage.setItem(
                  "idkota",
                  sessionStorage.getItem("idprovinsi")
                );
                sessionStorage.setItem(
                  "idwilayah",
                  sessionStorage.getItem("idprovinsi")
                );
                sessionStorage.setItem("namakota", "Semua");
                setSelectedCityDaerah1("Semua");
                setWilayahIDDaerah1(getInfoProvinsiDaerah1);
                // sessionStorage.setItem("idwilayah", getInfoProvinsiDaerah1);
                setOpenCityDaerah1(false);
                setIsProvinceDaerah1(true);
                setInfoDaerah1("Semua");
                updateDaerah1(getInfoProvinsiDaerah1);
                // setSelectedCityDaerah2("Semua");
                // setWilayahIDDaerah2(getInfoProvinsiDaerah2);
                // setOpenCityDaerah2(false);
                // setIsProvinceDaerah2(true);
              }}
            >
              Semua
            </li>
            {citiesDaerah1?.map((regencies) => (
              <li
                key={regencies?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${regencies?.nama?.toLowerCase() ===
                  selectedCityDaerah1?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                    ${regencies?.nama
                    ?.toLowerCase()
                    .startsWith(inputValueofCityDaerah1)
                    ? "block"
                    : "hidden"
                  }`}
                onClick={() => {
                  if (
                    regencies?.nama?.toLowerCase() !==
                    selectedCityDaerah1.toLowerCase()
                  ) {
                    
                    setWilayahIDDaerahSATU(regencies.id)
                    sessionStorage.setItem("namawilayah", regencies.nama);
                    // sessionStorage.setItem(
                    // "namawilayah_utak",
                    // regencies.nama,
                    // );
                    updateDaerah1(regencies.id);
                    setSelectedCityDaerah1(regencies?.nama);
                    sessionStorage.setItem("idkota", regencies.id);
                    sessionStorage.setItem("idwilayah", regencies.id);
                    sessionStorage.setItem("namakota", regencies.nama);
                    setOpenCityDaerah1(false);
                    setInputValueofCityDaerah1("");
                    setWilayahIDDaerah1(regencies.id);
                    sessionStorage.setItem("idwilayah", regencies.id);
                    setIsProvinceDaerah1(false);
                  }
                }}
              >
                {regencies?.nama}
              </li>
            ))}
          </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <button
           onClick={() => {
            setIsModalOpen4(false);
            setWasTerapkanClickedWhileModalOpen4(true);
            if (selectedCityDaerah1.toLowerCase() === "semua") {
              setWilayahIDDaerah1(getInfoProvinsiDaerah1);
            } else {
              const selectedRegency = citiesDaerah1.find(regency => regency.nama.toLowerCase() === selectedCityDaerah1.toLowerCase());
              if (selectedRegency) {
                setWilayahIDDaerah1(selectedRegency.id);
              }
            }
            if (selectedCityDaerah1.toLowerCase() === "semua" && selectedDaerah1) {
              const selectedProvince = provincessDaerah1.find(province => province.nama.toLowerCase() === selectedDaerah1.toLowerCase());
              if (selectedProvince) {
                setWilayahIDDaerah1(selectedProvince.id);
                sessionStorage.setItem("idkota",selectedProvince.id);
                sessionStorage.setItem("idwilayah",selectedProvince.id);
              }
            }
          }}
            className={"bg-secondary text-white px-4 py-2 rounded "}
          >
            Terapkan
          </button>
        </div>
      </Modal4>
      </div>
      <section>
        <button
          className="fixed bottom-5 right-5 bg-secondary w-[60px] h-[60px] rounded-full shadow-lg"
          onClick={fetchGlosarium}
        >
          <p className="oleo-script-regular text-white text-center text-[24px]">
            i
          </p>
        </button>
        {isPopupOpen && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[400px] bg-[#BDD6E4] z-10 p-5 rounded-[10px]">
            <h1 className="text-center text-secondary font-bold text-[16px] mb-5">
              GLOSARIUM
            </h1>
            <ul>
              {glosarium
                .slice()
                .reverse()
                .map((item) => (
                  <li key={item.id} className="text-secondary">
                    <div className="flex justify-between mt-[10px] bg-white rounded-[10px] h-[40px] px-[7px] items-center">
                      <div className="flex justify-between gap-x-[10px]">
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          color="#24445A"
                          className="my-auto"
                        />
                        <p className="font-bold text-[14px]">
                          {item.nama_file}
                        </p>
                      </div>
                      <button
                        className="flex bg-[#24445A] hover:bg-[#86BBD8] w-auto rounded-[5px] text-white items-center justify-center text-[12px] p-[5px]"
                        onClick={() => handleDownload(item.file)}
                      >
                        Buka
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
            <button
              className="flex bg-[#24445A] hover:bg-[#86BBD8] mt-[140px] w-[105px] h-[39px] rounded-[10px] text-white items-center justify-center mx-auto text-[14px]"
              onClick={() => setPopupOpen(false)}
            >
              Tutup
            </button>
          </div>
        )}
        {selectedFile && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[45%] w-full md:w-screen h-[93vh] p-5 rounded-[10px] md:bg-gray-500 md:bg-opacity-75 z-30 flex items-center justify-center">
            <div className="flex flex-col p-[20px] bg-white rounded-lg w-full md:w-full h-full mx-auto shadow-lg md:shadow-none">
              <div className="holds-the-iframe flex items-center justify-center mx-auto w-full md:w-full h-full rounded-lg mb-[20px]">
                <iframe
                  src={`https://docs.google.com/viewer?url=https://api.otonometer.neracaruang.com/api/info/download/${selectedFile}&embedded=true`}
                  className="w-full h-full"
                />
              </div>
              <div className="flex gap-x-[10px] items-center justify-center">
                <button className="flex bg-[#24445A] hover:bg-[#86BBD8] w-[105px] h-[39px] rounded-[10px] text-white items-center justify-center text-[14px]">
                  <a
                    href={`https://api.otonometer.neracaruang.com/api/info/download/${selectedFile}`}
                    target="_blank"
                  >
                    Download
                  </a>
                </button>
                <button
                  className="flex bg-[#24445A] hover:bg-[#86BBD8] w-[105px] h-[39px] rounded-[10px] text-white items-center justify-center text-[14px]"
                  onClick={closeModal}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default BerkacaTimeseries;
