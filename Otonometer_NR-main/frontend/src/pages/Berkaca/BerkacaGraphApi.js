import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import { faBookBookmark,
  faChevronDown,
  faDownload,
  faEye,
  faSearch,
  faSearchLocation,
  faFilePdf,
  faShare,  } from "@fortawesome/free-solid-svg-icons";
import "../../style/Switchbtn.css";
import Chart from "chart.js/auto";
import "../../style/Components.css";
import arrowl from "../../assets/icons/arrowl.png";
import arrowr from "../../assets/icons/arrowr.png";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import back from "../../assets/back.svg";

// Komponen card baru
const Card = ({ chartRef, note, legendData }) => {
  const [expand, setExpand] = useState(false);
  const maxLegendsToShow = 2;

  const toggleExpand = () => {
    setExpand(!expand);
  };
  let noteItems = [];

  // Ubah note menjadi array jika tipe datanya bukan array atau string
  if (typeof note === "object" && note !== null) {
    noteItems = Object.values(note);
  }

  return (
    <div className="flex flex-col bg-white w-[300px]  xl:w-[500px] lg:w-[400px] h-[auto] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg cursor-pointer">
      <div className="flex flex-col items-center justify-center lg:h-full md:h-full">
        <canvas
          ref={chartRef}
          className="lg:h-[260px] md:h-[260px] h-[180px]"
        ></canvas>
      </div>
      <p className="text-center mt-2 text-[12px] lg:text-[14px] text-[#064878] italic">
        {noteItems.map((item, index) => (
          <p
            key={index}
            className="text-center mt-2 text-[12px] lg:text-[14px] text-[#064878] italic"
          >
            {item}
          </p>
        ))}
      </p>
      <div className="legend-container">
        {legendData
          .slice(0, expand ? legendData.length : maxLegendsToShow)
          .map((legend, index) => (
            <div key={index} className="legend-row">
              <div className="legend-item flex w-[180px] gap-x-[20px] mx-[20px] ml-[40px]">
                <div
                  className="legend-color"
                  style={{ backgroundColor: legend.color }}
                ></div>
                <p className="legend-label">{legend.label}</p>
              </div>
            </div>
          ))}
        {!expand && legendData.length > maxLegendsToShow && (
          <div className="flex justify-center text-center items-center mt-[10px] ml-[100px] lg:ml-[185px]">
            <button
              className="text-[#064878] hover:text-[#0B578E] focus:outline-none text-[13px] lg:text-[15px]"
              onClick={toggleExpand}
            >
              Tampilkan Legenda
            </button>
          </div>
        )}
      </div>
      {/* Button Hide Legends dipisahkan ke dalam div baru */}
      {expand && (
        <div className="flex justify-center items-center mb-[20px]">
          <button
            className="text-[#064878] hover:text-[#0B578E] focus:outline-none text-[13px] lg:text-[15px]"
            onClick={toggleExpand}
          >
            Sembunyikan Legenda
          </button>
        </div>
      )}
    </div>
  );
};

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


const BerkacaGraph = () => {
  const tokenUser = sessionStorage.getItem("token");
  useEffect(() => {
    if (
      sessionStorage.getItem("token") == null ||
      sessionStorage.getItem("token") == ""
    ) {
      return (window.location.href = "/");
    }
  }, [sessionStorage.getItem("token")]);

  const [selectedProvinsiKiri, setSelectedProvinsiKiri] =
    useState("Pilih Provinsi 1");
  const [dropdownProvinsiKiri, setDropdownProvinsiKiri] = useState(false);

  const [selectedProvinsiKanan, setSelectedProvinsiKanan] =
    useState("Pilih Provinsi 2");
  const [dropdownProvinsiKanan, setDropdownProvinsiKanan] = useState(false);

  const [selectedKotaKiri, setSelectedKotaKiri] = useState("Kota 1");
  const [dropdownKotaKiri, setDropdownKotaKiri] = useState(false);

  const [selectedKotaKanan, setSelectedKotaKanan] = useState("Kota 2");
  const [dropdownKotaKanan, setDropdownKotaKanan] = useState(false);

  const [selectedTahunKiri, setSelectedTahunKiri] = useState("Tahun");
  const [dropdownTahunKiri, setDropdownTahunKiri] = useState(false);

  const [selectedTahunKanan, setSelectedTahunKanan] = useState("Tahun");
  const [dropdownTahunKanan, setDropdownTahunKanan] = useState(false);

  ///FETCHING DROPDOWN PROVINSI
  const [provincess, setProvinces] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(
    sessionStorage.getItem("namaprovinsi")
  );
  const [openProvinsi, setOpenProvinsi] = useState(false);
  const [openProvinsiModal, setOpenProvinsiModal] = useState(false);
  const [wilayahID, setWilayahID] = useState(
    sessionStorage.getItem("idwilayah")
  );
  const [getInfoProvinsi, setGetInfoProvinsi] = useState(
    sessionStorage.getItem("idprovinsi")
  );
  const [isProvince, setIsProvince] = useState(true);

  var wilayah = "";
  var provinsi = "";

  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API + "/provinces")
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
  const [openCityModal, setOpenCityModal] = useState(false);

  ///UPDATE DATA KOTA BERDASARKAN DATA PROVINSI
  function updateKota(item, choosed, id) {
    if (item.toLowerCase() !== choosed.toLowerCase()) {
      setSelected(item);
      setOpenProvinsi(false);
      setInputValue("");
      fetch(
        process.env.REACT_APP_URL_API + "/cities?province_id=" + id
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
        process.env.REACT_APP_URL_API + "/cities?province_id=" +
          sessionStorage.getItem("idprovinsi")
      )
        .then((response) => response.json())
        .then((data) => {
          setCity(data.data);
        });
    }
  }, [sessionStorage.getItem("idprovinsi")]);

  ///FETCHING DROPDOWN PROVINSI2
  const [provincess2, setProvinces2] = useState(null);
  const [inputValue2, setInputValue2] = useState("");
  const [selected2, setSelected2] = useState(
    sessionStorage.getItem("namaprovinsi_berkaca2")
  );
  const [openProvinsi2, setOpenProvinsi2] = useState(false);
  const [openProvinsi2Modal, setOpenProvinsi2Modal] = useState(false);
  const [wilayahID2, setWilayahID2] = useState(
    sessionStorage.getItem("idwilayah_berkaca2")
  );
  const [getInfoProvinsi2, setGetInfoProvinsi2] = useState(
    sessionStorage.getItem("idprovinsi_berkaca2")
  );
  const [is_province2, askIsProvince2] = useState();
  var wilayah2 = "";
  var provinsi2 = "";

  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API + "/provinces")
      .then((response) => response.json())
      .then((data) => {
        setProvinces2(data.data);
      });
  }, []);

  ///FETCHING DROPDOWN KOTA2
  const [cities2, setCity2] = useState(null);
  const [inputValueofCity2, setInputValueofCity2] = useState("");
  const [selectedCity2, setSelectedCity2] = useState(
    sessionStorage.getItem("namakota_berkaca2")
  );
  const [openCity2, setOpenCity2] = useState(false);
  const [openCity2Modal, setOpenCity2Modal] = useState(false);

  ///UPDATE DATA KOTA2 BERDASARKAN DATA PROVINSI2
  function updateKota2(item, choosed, id) {
    if (item.toLowerCase() !== choosed.toLowerCase()) {
      setSelected2(item);
      setOpenProvinsi2(false);
      setInputValue2("");
      fetch(
        process.env.REACT_APP_URL_API + "/cities?province_id=" + id
      )
        .then((response) => response.json())
        .then((data) => {
          setCity2(data.data);
        });
    }
  }
  useEffect(() => {
    if (sessionStorage.getItem("idprovinsi_berkaca2") !== null) {
      fetch(
        process.env.REACT_APP_URL_API + "/cities?province_id=" +
          sessionStorage.getItem("idprovinsi_berkaca2")
      )
        .then((response) => response.json())
        .then((data) => {
          setCity2(data.data);
        });
    }
  }, [sessionStorage.getItem("idprovinsi_berkaca2")]);

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
        sessionStorage.setItem("yearss", data.data[1].tahun);
      });
  }, []);
  useEffect(() => {
    const selectedYear = sessionStorage.getItem("yearss");
    if (selectedYear) {
      setSelectedYears(selectedYear);
    }
  }, []);

  // Card Nominal
  const [nilaipie1, setNilaiPie1] = useState([]);
  const [labelpie1, setLabelPie1] = useState([]);
  const [nilaipie2, setNilaiPie2] = useState([]);
  const [labelpie2, setLabelPie2] = useState([]);
  const [nilaipie3, setNilaiPie3] = useState([]);
  const [labelpie3, setLabelPie3] = useState([]);
  const [nilaipie4, setNilaiPie4] = useState([]);
  const [labelpie4, setLabelPie4] = useState([]);

  const [nilaipie1mobile, setNilaiPie1mobile] = useState([]);
  const [labelpie1mobile, setLabelPie1mobile] = useState([]);
  const [nilaipie2mobile, setNilaiPie2mobile] = useState([]);
  const [labelpiemobile2, setLabelPie2mobile] = useState([]);
  const [nilaipie3mobile, setNilaiPie3mobile] = useState([]);
  const [labelpie3mobile, setLabelPie3mobile] = useState([]);
  const [nilaipie4mobile, setNilaiPie4mobile] = useState([]);
  const [labelpie4mobile, setLabelPie4mobile] = useState([]);

  // Card Persentase
  const [nilaipie1persentase, setNilaiPie1Persentase] = useState([]);
  const [labelpie1persentase, setLabelPie1Persentase] = useState([]);
  const [nilaipie2persentase, setNilaiPie2Persentase] = useState([]);
  const [labelpie2persentase, setLabelPie2Persentase] = useState([]);
  const [nilaipie3persentase, setNilaiPie3Persentase] = useState([]);
  const [labelpie3persentase, setLabelPie3Persentase] = useState([]);
  const [nilaipie4persentase, setNilaiPie4Persentase] = useState([]);
  const [labelpie4persentase, setLabelPie4Persentase] = useState([]);

  const [nilaipie1persentasemobile, setNilaiPie1Persentasemobile] = useState(
    []
  );
  const [labelpie1persentasemobile, setLabelPie1Persentasemobile] = useState(
    []
  );
  const [nilaipie2persentasemobile, setNilaiPie2Persentasemobile] = useState(
    []
  );
  const [labelpie2persentasemobile, setLabelPie2Persentasemobile] = useState(
    []
  );
  const [nilaipie3persentasemobile, setNilaiPie3Persentasemobile] = useState(
    []
  );
  const [labelpie3persentasemobile, setLabelPie3Persentasemobile] = useState(
    []
  );
  const [nilaipie4persentasemobile, setNilaiPie4Persentasemobile] = useState(
    []
  );
  const [labelpie4persentasemobile, setLabelPie4Persentasemobile] = useState(
    []
  );

  // Chart Persentase
  const chartRef1Persentase = useRef(null);
  const chartRef2Persentase = useRef(null);
  const chartRef3Persentase = useRef(null);
  const chartRef4Persentase = useRef(null);
  const chartRef1Persentasemobile = useRef(null);
  const chartRef2Persentasemobile = useRef(null);
  const chartRef3Persentasemobile = useRef(null);
  const chartRef4Persentasemobile = useRef(null);

  // Lainnya
  const [kapitaset1, setKapitaset1] = useState("");
  const [kapitaset2, setKapitaset2] = useState("");
  const [penduduk, setPenduduk] = useState("");
  const [penduduk2, setPenduduk2] = useState("");
  const [sumber, setSumber] = useState("");
  const [notes, setNotes] = useState("");
  const [sumber2, setSumber2] = useState("");
  const [notes2, setNotesDua] = useState("");
  const [notes_1, setNotes1] = useState("");
  const [notes_2, setNotes2] = useState("");
  const [notes_1_2, setNotes1_2] = useState("");
  const [notes_2_2, setNotes2_2] = useState("");

  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const chartRef4 = useRef(null);
  const chartRef1mobile = useRef(null);
  const chartRef2mobile = useRef(null);
  const chartRef3mobile = useRef(null);
  const chartRef4mobile = useRef(null);
  const [showAllLegends1, setShowAllLegends1] = useState(false);
  const [showAllLegends2, setShowAllLegends2] = useState(false);
  const [showAllLegends3, setShowAllLegends3] = useState(false);
  const [showAllLegends4, setShowAllLegends4] = useState(false);
  const [legendData1, setLegendData1] = useState([]);
  const [legendData2, setLegendData2] = useState([]);
  const [legendData3, setLegendData3] = useState([]);
  const [legendData4, setLegendData4] = useState([]);
  const [showAllLegends1mobile, setShowAllLegends1mobile] = useState(false);
  const [showAllLegends2mobile, setShowAllLegends2mobile] = useState(false);
  const [showAllLegends3mobile, setShowAllLegends3mobile] = useState(false);
  const [showAllLegends4mobile, setShowAllLegends4mobile] = useState(false);
  const [legendData1mobile, setLegendData1mobile] = useState([]);
  const [legendData2mobile, setLegendData2mobile] = useState([]);
  const [legendData3mobile, setLegendData3mobile] = useState([]);
  const [legendData4mobile, setLegendData4mobile] = useState([]);

  // Chart Persentase
  const [showAllLegends1Persentase, setShowAllLegends1Persentase] =
    useState(false);
  const [showAllLegends2Persentase, setShowAllLegends2Persentase] =
    useState(false);
  const [legendData1Persentase, setLegendData1Persentase] = useState([]);
  const [legendData2Persentase, setLegendData2Persentase] = useState([]);
  const [showAllLegends3Persentase, setShowAllLegends3Persentase] =
    useState(false);
  const [showAllLegends4Persentase, setShowAllLegends4Persentase] =
    useState(false);
  const [legendData3Persentase, setLegendData3Persentase] = useState([]);
  const [legendData4Persentase, setLegendData4Persentase] = useState([]);
  const [namaparent, setNamaParent] = useState(
    sessionStorage.getItem("namaParent")
  );

  // Chart Nominal
  const handleExpandCard1 = () => {
    setShowAllLegends1(!showAllLegends1);
  };

  const handleExpandCard2 = () => {
    setShowAllLegends2(!showAllLegends2);
  };
  const handleCloseLegends1 = () => {
    setShowAllLegends1(false);
  };

  const handleCloseLegends2 = () => {
    setShowAllLegends2(false);
  };
  const handleExpandCard3 = () => {
    setShowAllLegends3(!showAllLegends3);
  };

  const handleExpandCard4 = () => {
    setShowAllLegends4(!showAllLegends4);
  };
  const handleCloseLegends3 = () => {
    setShowAllLegends3(false);
  };

  const handleCloseLegends4 = () => {
    setShowAllLegends4(false);
  };

  // Chart Persentase
  const handleExpandCard1Persentase = () => {
    setShowAllLegends1Persentase(!showAllLegends1Persentase);
  };

  const handleExpandCard2Persentase = () => {
    setShowAllLegends2Persentase(!showAllLegends2Persentase);
  };

  const handleCloseLegends1Persentase = () => {
    setShowAllLegends1Persentase(false);
  };

  const handleCloseLegends2Persentase = () => {
    setShowAllLegends2Persentase(false);
  };
  const handleExpandCard3Persentase = () => {
    setShowAllLegends3Persentase(!showAllLegends3Persentase);
  };

  const handleExpandCard4Persentase = () => {
    setShowAllLegends4Persentase(!showAllLegends4Persentase);
  };
  const handleCloseLegends3Persentase = () => {
    setShowAllLegends3Persentase(false);
  };

  const handleCloseLegends4Persentase = () => {
    setShowAllLegends4Persentase(false);
  };
  //variabel info chart
  const [halaman_chart, setHalaman_chart] = useState("");
  const [view_info_halaman_chart, setView_info_halaman_chart] = useState(0);
  const [like_info_halaman_chart, setLike_info_halaman_chart] = useState(0);
  const [simpan_info_halaman_chart, setSimpan_info_halaman_chart] = useState(0);

  const [activeTab, setActiveTab] = useState("nominal");
  const toggleTab = () => {
    setActiveTab(activeTab === "nominal" ? "persentase" : "nominal");
  };

  const [activeTabMobile, setActiveTabMobile] = useState("nominalmobile");
  const toggleTabMobile = () => {
    setActiveTabMobile(
      activeTabMobile === "nominalmobile" ? "persentasemobile" : "nominalmobile"
    );
  };

  const [activeTabMobile2, setActiveTabMobile2] = useState("nominalmobile2");
  const toggleTabMobile2 = () => {
    setActiveTabMobile2(
      activeTabMobile2 === "nominalmobile2"
        ? "persentasemobile2"
        : "nominalmobile2"
    );
  };

  const [activeTabMobileDataset, setActiveTabMobileDataset] =
    useState("dataset1");

  const toggleTabMobileDataset = () => {
    setActiveTabMobileDataset(
      activeTabMobileDataset === "dataset1" ? "dataset2" : "dataset1"
    );
    setActiveTabMobile(
      activeTabMobileDataset === "dataset1"
        ? "nominalmobile"
        : "persentasemobile"
    );
  };

  useEffect(() => {
    // Setelah perubahan activeTabMobileDataset, pastikan untuk memperbarui activeTabMobile
    setActiveTabMobile(
      activeTabMobileDataset === "dataset1"
        ? "nominalmobile"
        : "persentasemobile"
    );
  }, [activeTabMobileDataset]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  
  
  const closeModal = () => {
    setSelectedFile(null);
  };
  const isOkeButtonDisabled = selectedCity !== "Semua" && selectedCity2 === "Semua" || selectedCity === "Semua" && selectedCity2 !== "Semua" ;
  const isOkeButtonDisabled2 = selectedCity !== "Semua" && selectedCity2 === "Semua" || selectedCity === "Semua" && selectedCity2 !== "Semua" ;
  
  const [prevSelectedCity, setPrevSelectedCity] = useState(selectedCity);
  const [prevSelectedProvince, setPrevSelectedProvince] = useState(selected);

  const [prevSelectedCity2, setPrevSelectedCity2] = useState(selectedCity2);
  const [prevSelectedProvince2, setPrevSelectedProvince2] = useState(selected2);

  useEffect(() => {
    setPrevSelectedCity(selectedCity);
  }, [selectedCity]);
  
  useEffect(() => {
    setPrevSelectedProvince(selected);
  }, [selected]);

  useEffect(() => {
    setPrevSelectedCity2(selectedCity2);
  }, [selectedCity2]);
  
  useEffect(() => {
    setPrevSelectedProvince2(selected2);
  }, [selected2]);

  useEffect(() => {
    if (
      (selectedCity !== "Semua" && selectedCity2 === "Semua") ||
      (selectedCity === "Semua" && selectedCity2 !== "Semua")
    ) {
      if (selected !== prevSelectedProvince || selectedCity !== prevSelectedCity) {
        if (!isModalOpen2) {
          setIsModalOpen(true);
        } 
      } 
    }
  }, [selectedCity, selectedCity2, selected, prevSelectedProvince, prevSelectedCity]);
  
  useEffect(() => {
    if (
      (selectedCity !== "Semua" && selectedCity2 === "Semua") ||
      (selectedCity === "Semua" && selectedCity2 !== "Semua")
    ) {
      if (selected2 !== prevSelectedProvince2 || selectedCity2 !== prevSelectedCity2) {
        // Pastikan Modal tidak terbuka sebelum membuka Modal 2
        if (!isModalOpen) {
          setIsModalOpen2(true);
        } 
      }
    }
  }, [selectedCity, selectedCity2, selected2, prevSelectedProvince2, prevSelectedCity2, isModalOpen]);

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

  const selectedDataBerkaca = JSON.parse(
    sessionStorage.getItem("selectedDataBerkaca")
  );
  const {
    parent_id_1Berkaca,
    dataset_1Berkaca,
    parent_id_2Berkaca,
    dataset_2Berkaca,
  } = selectedDataBerkaca;

  function Charts() {
    let urls =
      process.env.REACT_APP_URL_API +
      "/berkaca?tahun=" +
      selectedYears +
      "&wilayah=[" +
      wilayahID +
      "," +
      wilayahID2 +
      "]";
    // Add dataset_1 and parent_id_1 to the API URL
    if (typeof dataset_1Berkaca !== "string") {
      urls +=
        "&dataset_1=[" +
        dataset_1Berkaca +
        "]&parent_id_1=" +
        parent_id_1Berkaca;
    } else {
      urls += "&dataset_1=" + dataset_1Berkaca + "&parent_id_1=" + parent_id_1Berkaca;
    }
    // Add dataset_2 and parent_id_2 to the API URL
    if (typeof dataset_2Berkaca !== "string") {
      urls +=
        "&dataset_2=[" +
        dataset_2Berkaca +
        "]&parent_id_2=" +
        parent_id_2Berkaca;
    } else {
      urls += "&dataset_2=" + dataset_2Berkaca + "&parent_id_2=" + parent_id_2Berkaca;
    }
    // Add other parameters to the URL if available
    urls += "&record=true";
  
    fetch(urls)
      .then((response) => response.json())
      .then((result) => {
        var dataset1Wilayah1 = []
        var dataset2Wilayah1 = []
        var dataset1Wilayah2 = []
        var dataset2Wilayah2 = []
        result.data.nominal.dataset_1.forEach(item =>{
          if(item.id_wilayah == wilayahID){
            dataset1Wilayah1.push(item)
          }
          if(item.id_wilayah == wilayahID2){
            dataset1Wilayah2.push(item)
          }
        })
        console.log(dataset1Wilayah1)
        console.log(dataset1Wilayah2)
        result.data.nominal.dataset_2.forEach(item =>{
          if(item.id_wilayah == wilayahID){
            dataset2Wilayah1.push(item)
          }
          if(item.id_wilayah == wilayahID2){
            dataset2Wilayah2.push(item)
          }
        })
        console.log(dataset2Wilayah1)
        console.log(dataset2Wilayah2)
        
       
        // Handle common results
        setHalaman_chart(result.info.kode);
        setView_info_halaman_chart(result.info.view);
        setSimpan_info_halaman_chart(result.info.simpan);
        setNamaParent(result.judul);
        setKapitaset1(result.satuan.dataset_1);
        setKapitaset2(result.satuan.dataset_2);
        setPenduduk(result.jumlah_penduduk_1);
        setPenduduk2(result.jumlah_penduduk_2);
        setSumber(result.sumber1[0]);
        setSumber2(result.sumber2[0]);
        setNotes(result.notes1[0]);
        setNotesDua(result.notes2[0]);
        setNotes1(result.notes_1_wilayah_1);
        setNotes2(result.notes_2_wilayah_1);
        setNotes1_2(result.notes_1_wilayah_2);
        setNotes2_2(result.notes_2_wilayah_2);
  
        // Handle dataset_1 results
        if (
          result.data &&
          result.data.nominal &&
          result.data.nominal.dataset_1 &&
          result.data.nominal.dataset_1.length > 0
        ) {
          var Pie1 = []
          var Pie3 = []
          result.data.nominal.dataset_1.forEach(item =>{
            if(item.id_wilayah == wilayahID){
              Pie1.push(item)
            }
            if(item.id_wilayah == wilayahID2){
              Pie3.push(item)
            }
          })
          setNilaiPie1(Pie1);
          setLabelPie1(Pie1);
          setNilaiPie3(Pie3);
          setLabelPie3(Pie3);
        }
        if (
          result.data &&
          result.data.percentage &&
          result.data.percentage.dataset_1 &&
          result.data.percentage.dataset_1.length > 0
        ) { 
          var PieP1 = []
          var PieP3 = []
          result.data.percentage.dataset_1.forEach(item =>{
            if(item.id_wilayah == wilayahID){
              PieP1.push(item)
            }
            if(item.id_wilayah == wilayahID2){
              PieP3.push(item)
            }
          })
          setNilaiPie1Persentase(PieP1);
          setLabelPie1Persentase(PieP1);
          setNilaiPie3Persentase(PieP3);
          setLabelPie3Persentase(PieP3);
        }
  
        // Handle dataset_2 results
        if (
          result.data &&
          result.data.nominal &&
          result.data.nominal.dataset_2 &&
          result.data.nominal.dataset_2.length > 0
        ) {
          var Pie2 = []
          var Pie4 = []
          result.data.nominal.dataset_2.forEach(item =>{
            if(item.id_wilayah == wilayahID){
              Pie2.push(item)
            }
            if(item.id_wilayah == wilayahID2){
              Pie4.push(item)
            }
          })
          setNilaiPie2(Pie2);
          setLabelPie2(Pie2);
          setNilaiPie4(Pie4);
          setLabelPie4(Pie4);
        }
        if (
          result.data &&
          result.data.percentage &&
          result.data.percentage.dataset_2 &&
          result.data.percentage.dataset_2.length > 0
        ) {
          var PieP2 = []
          var PieP4 = []
          result.data.percentage.dataset_2.forEach(item =>{
            if(item.id_wilayah == wilayahID){
              PieP2.push(item)
            }
            if(item.id_wilayah == wilayahID2){
              PieP4.push(item)
            }
          })
          setNilaiPie2Persentase(PieP2);
          setLabelPie2Persentase(PieP2);
          setNilaiPie4Persentase(PieP4);
          setLabelPie4Persentase(PieP4);
        }
      });
  }
  
  useEffect(() => {
    // Check if either selectedCity or selectedCity2 is "Semua"
    const condition1 = selectedCity !== "Semua" && selectedCity2 === "Semua";
    const condition2 = selectedCity === "Semua" && selectedCity2 !== "Semua";
  
    // Only call Charts() if none of the conditions are met and both modals are closed
    if (selectedYears && wilayahID && wilayahID2 && !condition1 && !condition2 && !isModalOpen && !isModalOpen2) {
      Charts();
    }
  }, [selectedYears, wilayahID, wilayahID2, selectedCity, selectedCity2, isModalOpen, isModalOpen2]);
  
  useEffect(() => {
    if (activeTab === "nominal") {
      const data1 = nilaipie1.map((item) => item.nilai);
      const data2 = nilaipie2.map((item) => item.nilai);
      const data3 = nilaipie3.map((item) => item.nilai);
      const data4 = nilaipie4.map((item) => item.nilai);

      let totaln1 = 0;
      let totaln2 = 0;
      let totaln3 = 0;
      let totaln4 = 0;
  
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const result = JSON.parse(this.responseText);
        let totalparent1 = 0;
        let totalparent2 = 0;
        let totalparent3 = 0;
        let totalparent4 = 0;
  
        if (
          result.data &&
          result.data.nominal &&
          result.data.nominal.dataset_1 &&
          result.data.nominal.dataset_1.length > 0
        ) {
          result.data.nominal.dataset_1.forEach(item =>{
            if(item.id_wilayah == wilayahID){
              totalparent1 = item.nilai
            }
            if(item.id_wilayah == wilayahID2){
              totalparent3 = item.nilai
            }
          })
        }
        if (
          result.data &&
          result.data.nominal &&
          result.data.nominal.dataset_2 &&
          result.data.nominal.dataset_2.length > 0
        ) {
          result.data.nominal.dataset_2.forEach(item =>{
            if(item.id_wilayah == wilayahID){
              totalparent2 = item.nilai
            }
            if(item.id_wilayah == wilayahID2){
              totalparent4 = item.nilai
            }
          })
        }
        
        data1.forEach((item) => {
            totalparent1 -= item;
        });
        data3.forEach((item) => {
            totalparent3 -= item;
        });
        data2.forEach((item) => {
            totalparent2 -= item;        
        });
        data4.forEach((item) => {
            totalparent4 -= item;
     
        });
        totaln1 = totalparent1;
        totaln2 = totalparent2;
        totaln3 = totalparent3;
        totaln4 = totalparent4;
        data1.push(totaln1);
        data2.push(totaln2);
        data3.push(totaln3);
        data4.push(totaln4);
      };
  
      xhr.open(
        "GET",
        process.env.REACT_APP_URL_API +
          "/berkaca?tahun=" +
          selectedYears +
          "&wilayah=[" +
          wilayahID +
          "," +
          wilayahID2 +
          "]" +
          "&parent_id_1=" +
          parent_id_1Berkaca +
          "&dataset_1=" +
          sessionStorage.getItem("all_ds_1") +
          "&parent_id_2=" +
          parent_id_2Berkaca +
          "&dataset_2=" +
          sessionStorage.getItem("all_ds_2"),
        false
      );
      xhr.send();
      
      var labels1 = labelpie1.map((item) => {
        const labelSet1 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet1}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({item.label})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      const backgroundColor1 = [
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
  
      var tampbgColor1 = [];
      labels1.map((label, index) => {
        tampbgColor1.push(backgroundColor1[index]);
      });
      tampbgColor1.push("#FFFFFF");

      var legendData1 = labels1.map((label, index) => {
        return {
          label,
          color: backgroundColor1[index],
        };
      });

      const ctx1 = chartRef1.current.getContext("2d");
      const transformedData1 = labelpie1.map((item) => {
        const labelSet1 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = `${labelSet1}`;
        return {
          label: coloredLabelSet,
          value: item.value,
        };
      });
  
      const chart1 = new Chart(ctx1, {
        type: "doughnut",
        data: {
          labels: transformedData1.map((item) => item.label),
          datasets: [
            {
              data: data1,
              backgroundColor: tampbgColor1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie1[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie1);
                    return '';
                  }

                  const labelSet1 = selectedDataBerkaca.labelset1 ? selectedDataBerkaca.labelset1[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}`;
                },
              },
            },
          },
        },
      });
  
      const labels2 = labelpie2.map((item) => {
        const labelSet2 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet2}</span>
        );
        const roundedItemLabel =
          typeof item.label === "number"
            ? Math.round(item.label).toLocaleString().replace(/,/g, ".")
            : item.label;
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({roundedItemLabel})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      const backgroundColor2 = [
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

      var tampbgColor2 = [];
      labels2.map((label, index) => {
        tampbgColor2.push(backgroundColor2[index]);
      });
      tampbgColor2.push("#FFFFFF");

      var legendData2 = labels2.map((label, index) => {
        return {
          label,
          color: backgroundColor2[index],
        };
      });

      // Draw pie chart for Card 2
      const ctx2 = chartRef2.current.getContext("2d");
      const transformedData2 = labelpie2.map((item) => {
        const labelSet2 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet2 = `${labelSet2}`;
        return {
          label: coloredLabelSet2,
          value: item.value,
        };
      });
      const chart2 = new Chart(ctx2, {
        type: "doughnut",
        data: {
          labels: transformedData2.map((item) => item.label),
          datasets: [
            {
              data: data2,
              backgroundColor: tampbgColor2,
              legend: data2,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie2[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie2);
                    return '';
                  }

                  const labelSet2 = selectedDataBerkaca.labelset2 ? selectedDataBerkaca.labelset2[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}`;
                },
              },
            },
          },
        },
      });

      var labels3 = labelpie3.map((item) => {
        const labelSet1 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet1}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({item.label})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      var backgroundColor3 = [
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

      var tampbgColor3 = [];
      labels3.map((label, index) => {
        tampbgColor3.push(backgroundColor3[index]);
      });
      tampbgColor3.push("#FFFFFF");

      var legendData3 = labels3.map((label, index) => {
        return {
          label,
          color: backgroundColor3[index],
        };
      });

      // Draw pie chart for Card 1
      const ctx3 = chartRef3.current.getContext("2d");
      const transformedData3 = labelpie3.map((item) => {
        const labelSet1 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = `${labelSet1}`;
        return {
          label: coloredLabelSet,
          value: item.value,
        };
      });
      const chart3 = new Chart(ctx3, {
        type: "doughnut",
        data: {
          labels: transformedData3.map((item) => item.label),
          datasets: [
            {
              data: data3,
              backgroundColor: tampbgColor3,
              legend: data3,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie3[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie3);
                    return '';
                  }

                  const labelSet1 = selectedDataBerkaca.labelset1 ? selectedDataBerkaca.labelset1[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}`;
                },
              },
            },
          },
        },
      });

      const labels4 = labelpie4.map((item) => {
        const labelSet2 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet2}</span>
        );
        const roundedItemLabel =
          typeof item.label === "number"
            ? Math.round(item.label).toLocaleString().replace(/,/g, ".")
            : item.label;
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({roundedItemLabel})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      const backgroundColor4 = [
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

      var tampbgColor4 = [];
      labels4.map((label, index) => {
        tampbgColor4.push(backgroundColor4[index]);
      });
      tampbgColor4.push("#FFFFFF");

      var legendData4 = labels4.map((label, index) => {
        return {
          label,
          color: backgroundColor4[index],
        };
      });

      // Draw pie chart for Card 2
      const ctx4 = chartRef4.current.getContext("2d");
      const transformedData4 = labelpie4.map((item) => {
        const labelSet2 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet2 = `${labelSet2}`;
        return {
          label: coloredLabelSet2,
          value: item.value,
        };
      });
      const chart4 = new Chart(ctx4, {
        type: "doughnut",
        data: {
          labels: transformedData4.map((item) => item.label),
          datasets: [
            {
              data: data4,
              backgroundColor: tampbgColor4,
              legend: data4,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie4[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie4);
                    return '';
                  }

                  const labelSet2 = selectedDataBerkaca.labelset2 ? selectedDataBerkaca.labelset2[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}`;
                },
              },
            },
          },
        },
      });


      // Set legend data
      setLegendData1(legendData1);
      setLegendData2(legendData2);
      setLegendData3(legendData3);
      setLegendData4(legendData4);
      // Cleanup
      return () => {
        chart1.destroy();
        chart2.destroy();
        chart3.destroy();
        chart4.destroy();
      };
    }
  }, [activeTab, nilaipie1, labelpie1, nilaipie2, labelpie2,nilaipie3, labelpie3,nilaipie4, labelpie4]);

  useEffect(() => {
    if (activeTab === "persentase") {
      const data1persentase = nilaipie1persentase.map((item) => item.nilai);
      const data2persentase = nilaipie2persentase.map((item) => item.nilai);
      const data3persentase = nilaipie3persentase.map((item) => item.nilai);
      const data4persentase = nilaipie4persentase.map((item) => item.nilai);

      var totalp1 = 0;
      var totalp2 = 0;
      var totalp3 = 0;
      var totalp4 = 0;
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var result = JSON.parse(this.responseText);
        var totalparentp1 = 0;
        var totalparentp2 = 0;
        var totalparentp3 = 0;
        var totalparentp4 = 0;
        if (
          result.data &&
          result.data.percentage &&
          result.data.percentage.dataset_1 &&
          result.data.percentage.dataset_1.length > 0
        ) {
          result.data.percentage.dataset_1.forEach(item => {
            if(item.id_wilayah == wilayahID){
              totalparentp1 = item.nilai
            }
            if(item.id_wilayah == wilayahID2){
              totalparentp3 = item.nilai
            }
          })
        }
        if (
          result.data &&
          result.data.percentage &&
          result.data.percentage.dataset_2 &&
          result.data.percentage.dataset_2.length > 0
        ) {
          result.data.percentage.dataset_2.forEach(item =>{
            if(item.id_wilayah == wilayahID){
              totalparentp2 = item.nilai
            }
            if(item.id_wilayah == wilayahID2){
              totalparentp4 = item.nilai
            }
          })
        }
        data1persentase.map((item) => {
          totalparentp1 -= item;
        });
        data3persentase.map((item) => {
          totalparentp3 -= item;
        });
        data2persentase.map((item) => {
          totalparentp2 -= item;
        });
        data4persentase.map((item) => {
          totalparentp4 -= item;
        });
        totalp1 = totalparentp1;
        totalp2 = totalparentp2;
        totalp3 = totalparentp3;
        totalp4 = totalparentp4;
        data1persentase.push(totalp1);
        data2persentase.push(totalp2);
        data3persentase.push(totalp3);
        data4persentase.push(totalp4);
      };
      xhr.open(
        "GET",
        process.env.REACT_APP_URL_API +
          "/berkaca?tahun=" +
          selectedYears +
          "&wilayah=[" +
          wilayahID +
          "," +
          wilayahID2 +
          "]" +
          "&parent_id_1=" +
          parent_id_1Berkaca +
          "&dataset_1=" +
          sessionStorage.getItem("all_ds_1") +
          "&parent_id_2=" +
          parent_id_2Berkaca +
          "&dataset_2=" +
          sessionStorage.getItem("all_ds_2"),
        false
      );
      xhr.send();

      const labels1persentase = labelpie1persentase.map((item) => {
        const labelSet1Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet1Persentase}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({`${item.label}%`})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      const backgroundColor1persentase = [
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

      var tampbgColor1Persentase = [];
      labels1persentase.map((label, index) => {
        tampbgColor1Persentase.push(backgroundColor1persentase[index]);
      });
      tampbgColor1Persentase.push("#FFFFFF");

      var legendData1persentase = labels1persentase.map((label, index) => {
        return {
          label,
          color: backgroundColor1persentase[index],
        };
      });

      // Draw pie chart for Card 1 Persentase
      const ctx1persentase = chartRef1Persentase.current.getContext("2d");
      const transformedData1P = labelpie1persentase.map((item) => {
        const labelSet1Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = `${labelSet1Persentase}`;
        return {
          label: coloredLabelSet,
          value: item.value,
        };
      });
      const chart1persentase = new Chart(ctx1persentase, {
        type: "doughnut",
        data: {
          labels: transformedData1P.map((item) => item.label),
          datasets: [
            {
              data: data1persentase,
              backgroundColor: tampbgColor1Persentase,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie1persentase[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie1persentase);
                    return '';
                  }

                  const labelSet1Persentase = selectedDataBerkaca.labelset1 ? selectedDataBerkaca.labelset1[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}%`;
                },
              },
            },
          },
        },
      });

      const labels2persentase = labelpie2persentase.map((item) => {
        const labelSet2Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet2Persentase}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({`${item.label}%`})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      const backgroundColor2persentase = [
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

      var tampbgColor2Persentase = [];
      labels2persentase.map((label, index) => {
        tampbgColor2Persentase.push(backgroundColor2persentase[index]);
      });
      tampbgColor2Persentase.push("#FFFFFF");

      var legendData2persentase = labels2persentase.map((label, index) => {
        return {
          label,
          color: backgroundColor2persentase[index],
        };
      });

      // Draw pie chart for Card 2 Persentase
      const ctx2persentase = chartRef2Persentase.current.getContext("2d");
      const transformedData2P = labelpie2persentase.map((item) => {
        const labelSet2Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet = `${labelSet2Persentase}`;
        return {
          label: coloredLabelSet,
          value: item.value,
        };
      });
      const chart2persentase = new Chart(ctx2persentase, {
        type: "doughnut",
        data: {
          labels: transformedData2P.map((item) => item.label),
          datasets: [
            {
              data: data2persentase,
              backgroundColor: tampbgColor2Persentase,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie2persentase[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie2persentase);
                    return '';
                  }

                  const labelSet2Persentase = selectedDataBerkaca.labelset2 ? selectedDataBerkaca.labelset2[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}%`; 
                },
              },
            },
          },
        },
      });
      const labels3persentase = labelpie3persentase.map((item) => {
        const labelSet1Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet1Persentase}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({`${item.label}%`})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      const backgroundColor3persentase = [
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

      var tampbgColor3Persentase = [];
      labels3persentase.map((label, index) => {
        tampbgColor3Persentase.push(backgroundColor3persentase[index]);
      });
      tampbgColor3Persentase.push("#FFFFFF");

      var legendData3persentase = labels3persentase.map((label, index) => {
        return {
          label,
          color: backgroundColor3persentase[index],
        };
      });

      // Draw pie chart for Card 1
      const ctx3persentase = chartRef3Persentase.current.getContext("2d");
      const transformedData3P = labelpie3persentase.map((item) => {
        const labelSet1Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = `${labelSet1Persentase}`;
        return {
          label: coloredLabelSet,
          value: item.value,
        };
      });
      const chart3persentase = new Chart(ctx3persentase, {
        type: "doughnut",
        data: {
          labels: transformedData3P.map((item) => item.label),
          datasets: [
            {
              data: data3persentase,
              backgroundColor: tampbgColor3Persentase,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie3persentase[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie3persentase);
                    return '';
                  }

                  const labelSet1Persentase = selectedDataBerkaca.labelset1 ? selectedDataBerkaca.labelset1[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}%`;
                },
              },
            },
          },
        },
      });

      const labels4persentase = labelpie4persentase.map((item) => {
        const labelSet2Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet2Persentase}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({`${item.label}%`})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      const backgroundColor4persentase = [
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

      var tampbgColor4Persentase = [];
      labels4persentase.map((label, index) => {
        tampbgColor4Persentase.push(backgroundColor4persentase[index]);
      });
      tampbgColor4Persentase.push("#FFFFFF");

      var legendData4persentase = labels4persentase.map((label, index) => {
        return {
          label,
          color: backgroundColor4persentase[index],
        };
      });

      // Draw pie chart for Card 2
      const ctx4persentase = chartRef4Persentase.current.getContext("2d");
      const transformedData4P = labelpie4persentase.map((item) => {
        const labelSet2Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet = `${labelSet2Persentase}`;
        return {
          label: coloredLabelSet,
          value: item.value,
        };
      });
      const chart4persentase = new Chart(ctx4persentase, {
        type: "doughnut",
        data: {
          labels: transformedData4P.map((item) => item.label),
          datasets: [
            {
              data: data4persentase,
              backgroundColor: tampbgColor4Persentase,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie4persentase[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie4persentase);
                    return '';
                  }

                  const labelSet2Persentase = selectedDataBerkaca.labelset2 ? selectedDataBerkaca.labelset2[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}%`;
                },
              },
            },
          },
        },
      });

      // Set legend data Persentase
      setLegendData1Persentase(legendData1persentase);
      setLegendData2Persentase(legendData2persentase);
      setLegendData3Persentase(legendData3persentase);
      setLegendData4Persentase(legendData4persentase);

      // Cleanup
      return () => {
        chart1persentase.destroy();
        chart2persentase.destroy();
        chart3persentase.destroy();
        chart4persentase.destroy();
      };
    }
  }, [
    activeTab,
    nilaipie1persentase,
    labelpie1persentase,
    nilaipie2persentase,
    labelpie2persentase,
    nilaipie3persentase,
    labelpie3persentase,
    nilaipie4persentase,
    labelpie4persentase,
  ]);

  useEffect(() => {
    if (activeTabMobile === "nominalmobile") {
      const data1 = nilaipie1.map((item) => item.nilai);
      const data2 = nilaipie2.map((item) => item.nilai);

      let totaln1 = 0;
      let totaln2 = 0;
  
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const result = JSON.parse(this.responseText);
        let totalparent1 = 0;
        let totalparent2 = 0;
  
        if (
          result.data &&
          result.data.nominal &&
          result.data.nominal.dataset_1 &&
          result.data.nominal.dataset_1.length > 0
        ) {
          result.data.nominal.dataset_1.forEach(item =>{
            if(item.id_wilayah == wilayahID){
              totalparent1 = item.nilai
            }
          })
        }
        if (
          result.data &&
          result.data.nominal &&
          result.data.nominal.dataset_2 &&
          result.data.nominal.dataset_2.length > 0
        ) {
          result.data.nominal.dataset_2.forEach(item =>{
            if(item.id_wilayah == wilayahID){
              totalparent2 = item.nilai
            }
          })
        }
        
        data1.forEach((item) => {
            totalparent1 -= item;
        });
        data2.forEach((item) => {
            totalparent2 -= item;        
        });
        totaln1 = totalparent1;
        totaln2 = totalparent2;
    
        data1.push(totaln1);
        data2.push(totaln2);
        
      };
  
      xhr.open(
        "GET",
        process.env.REACT_APP_URL_API +
          "/berkaca?tahun=" +
          selectedYears +
          "&wilayah=[" +
          wilayahID +
          "," +
          wilayahID2 +
          "]" +
          "&parent_id_1=" +
          parent_id_1Berkaca +
          "&dataset_1=" +
          sessionStorage.getItem("all_ds_1") +
          "&parent_id_2=" +
          parent_id_2Berkaca +
          "&dataset_2=" +
          sessionStorage.getItem("all_ds_2"),
        false
      );
      xhr.send();
      
      var labels1 = labelpie1.map((item) => {
        const labelSet1 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet1}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({item.label})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      const backgroundColor1 = [
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
  
      var tampbgColor1 = [];
      labels1.map((label, index) => {
        tampbgColor1.push(backgroundColor1[index]);
      });
      tampbgColor1.push("#FFFFFF");

      var legendData1 = labels1.map((label, index) => {
        return {
          label,
          color: backgroundColor1[index],
        };
      });

      const ctx1 = chartRef1mobile.current.getContext("2d");
      const transformedData1 = labelpie1.map((item) => {
        const labelSet1 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = `${labelSet1}`;
        return {
          label: coloredLabelSet,
          value: item.value,
        };
      });
  
      const chart1mobile = new Chart(ctx1, {
        type: "doughnut",
        data: {
          labels: transformedData1.map((item) => item.label),
          datasets: [
            {
              data: data1,
              backgroundColor: tampbgColor1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie1[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie1);
                    return '';
                  }

                  const labelSet1 = selectedDataBerkaca.labelset1 ? selectedDataBerkaca.labelset1[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}`;
                },
              },
            },
          },
        },
      });
  
      const labels2 = labelpie2.map((item) => {
        const labelSet2 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet2}</span>
        );
        const roundedItemLabel =
          typeof item.label === "number"
            ? Math.round(item.label).toLocaleString().replace(/,/g, ".")
            : item.label;
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({roundedItemLabel})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      const backgroundColor2 = [
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

      var tampbgColor2 = [];
      labels2.map((label, index) => {
        tampbgColor2.push(backgroundColor2[index]);
      });
      tampbgColor2.push("#FFFFFF");

      var legendData2 = labels2.map((label, index) => {
        return {
          label,
          color: backgroundColor2[index],
        };
      });

      // Draw pie chart for Card 2
      const ctx2 = chartRef2mobile.current.getContext("2d");
      const transformedData2 = labelpie2.map((item) => {
        const labelSet2 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet2 = `${labelSet2}`;
        return {
          label: coloredLabelSet2,
          value: item.value,
        };
      });
      const chart2mobile = new Chart(ctx2, {
        type: "doughnut",
        data: {
          labels: transformedData2.map((item) => item.label),
          datasets: [
            {
              data: data2,
              backgroundColor: tampbgColor2,
              legend: data2,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie2[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie2);
                    return '';
                  }

                  const labelSet2 = selectedDataBerkaca.labelset2 ? selectedDataBerkaca.labelset2[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}`;
                },
              },
            },
          },
        },
      });

      // Set legend data
      setLegendData1(legendData1);
      setLegendData2(legendData2);
      // Cleanup
      return () => {
        chart1mobile.destroy();
        chart2mobile.destroy();
      };
    }
  }, [activeTabMobile, nilaipie1, labelpie1, nilaipie2, labelpie2,nilaipie3, labelpie3,nilaipie4, labelpie4]);
  
  useEffect(() => {
    if (activeTabMobile2 === "nominalmobile2") {
      const data3 = nilaipie3.map((item) => item.nilai);
      const data4 = nilaipie4.map((item) => item.nilai);

      let totaln3 = 0;
      let totaln4 = 0;
  
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const result = JSON.parse(this.responseText);
        let totalparent3 = 0;
        let totalparent4 = 0;
  
        if (
          result.data &&
          result.data.nominal &&
          result.data.nominal.dataset_1 &&
          result.data.nominal.dataset_1.length > 0
        ) {
          result.data.nominal.dataset_1.forEach(item =>{
            if(item.id_wilayah == wilayahID2){
              totalparent3 = item.nilai
            }
          })
        }
        if (
          result.data &&
          result.data.nominal &&
          result.data.nominal.dataset_2 &&
          result.data.nominal.dataset_2.length > 0
        ) {
          result.data.nominal.dataset_2.forEach(item =>{
            if(item.id_wilayah == wilayahID2){
              totalparent4 = item.nilai
            }
          })
        }
        
        data3.forEach((item) => {
            totalparent3 -= item;
        });
        data4.forEach((item) => {
            totalparent4 -= item;
     
        });
        totaln3 = totalparent3;
        totaln4 = totalparent4;
        data3.push(totaln3);
        data4.push(totaln4);
      };
  
      xhr.open(
        "GET",
        process.env.REACT_APP_URL_API +
          "/berkaca?tahun=" +
          selectedYears +
          "&wilayah=[" +
          wilayahID +
          "," +
          wilayahID2 +
          "]" +
          "&parent_id_1=" +
          parent_id_1Berkaca +
          "&dataset_1=" +
          sessionStorage.getItem("all_ds_1") +
          "&parent_id_2=" +
          parent_id_2Berkaca +
          "&dataset_2=" +
          sessionStorage.getItem("all_ds_2"),
        false
      );
      xhr.send();

      var labels3 = labelpie3.map((item) => {
        const labelSet1 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet1}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({item.label})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      var backgroundColor3 = [
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

      var tampbgColor3 = [];
      labels3.map((label, index) => {
        tampbgColor3.push(backgroundColor3[index]);
      });
      tampbgColor3.push("#FFFFFF");

      var legendData3 = labels3.map((label, index) => {
        return {
          label,
          color: backgroundColor3[index],
        };
      });

      // Draw pie chart for Card 1
      const ctx3 = chartRef3mobile.current.getContext("2d");
      const transformedData3 = labelpie3.map((item) => {
        const labelSet1 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = `${labelSet1}`;
        return {
          label: coloredLabelSet,
          value: item.value,
        };
      });
      const chart3mobile = new Chart(ctx3, {
        type: "doughnut",
        data: {
          labels: transformedData3.map((item) => item.label),
          datasets: [
            {
              data: data3,
              backgroundColor: tampbgColor3,
              legend: data3,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie3[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie3);
                    return '';
                  }

                  const labelSet1 = selectedDataBerkaca.labelset1 ? selectedDataBerkaca.labelset1[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}`;
                },
              },
            },
          },
        },
      });

      const labels4 = labelpie4.map((item) => {
        const labelSet2 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet2}</span>
        );
        const roundedItemLabel =
          typeof item.label === "number"
            ? Math.round(item.label).toLocaleString().replace(/,/g, ".")
            : item.label;
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({roundedItemLabel})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      const backgroundColor4 = [
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

      var tampbgColor4 = [];
      labels4.map((label, index) => {
        tampbgColor4.push(backgroundColor4[index]);
      });
      tampbgColor4.push("#FFFFFF");

      var legendData4 = labels4.map((label, index) => {
        return {
          label,
          color: backgroundColor4[index],
        };
      });

      // Draw pie chart for Card 2
      const ctx4 = chartRef4mobile.current.getContext("2d");
      const transformedData4 = labelpie4.map((item) => {
        const labelSet2 = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet2 = `${labelSet2}`;
        return {
          label: coloredLabelSet2,
          value: item.value,
        };
      });
      const chart4mobile = new Chart(ctx4, {
        type: "doughnut",
        data: {
          labels: transformedData4.map((item) => item.label),
          datasets: [
            {
              data: data4,
              backgroundColor: tampbgColor4,
              legend: data4,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie4[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie4);
                    return '';
                  }

                  const labelSet2 = selectedDataBerkaca.labelset2 ? selectedDataBerkaca.labelset2[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}`;
                },
              },
            },
          },
        },
      });


      // Set legend data
      setLegendData3(legendData3);
      setLegendData4(legendData4);
      // Cleanup
      return () => {
        chart3mobile.destroy();
        chart4mobile.destroy();
      };
    }
  }, [activeTabMobile2, nilaipie3, labelpie3,nilaipie4, labelpie4]);

  useEffect(() => {
    if (activeTabMobile === "persentasemobile") {
      const data1persentase = nilaipie1persentase.map((item) => item.nilai);
      const data2persentase = nilaipie2persentase.map((item) => item.nilai);
      
      var totalp1 = 0;
      var totalp2 = 0;
      
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var result = JSON.parse(this.responseText);
        var totalparentp1 = 0;
        var totalparentp2 = 0;
        if (
          result.data &&
          result.data.percentage &&
          result.data.percentage.dataset_1 &&
          result.data.percentage.dataset_1.length > 0
        ) {
          result.data.percentage.dataset_1.forEach(item => {
            if(item.id_wilayah == wilayahID){
              totalparentp1 = item.nilai
            }
          })
        }
        if (
          result.data &&
          result.data.percentage &&
          result.data.percentage.dataset_2 &&
          result.data.percentage.dataset_2.length > 0
        ) {
          result.data.percentage.dataset_2.forEach(item =>{
            if(item.id_wilayah == wilayahID){
              totalparentp2 = item.nilai
            }
          })
        }
        data1persentase.map((item) => {
          totalparentp1 -= item;
        });
       
        data2persentase.map((item) => {
          totalparentp2 -= item;
        });
       
        totalp1 = totalparentp1;
        totalp2 = totalparentp2;
        data1persentase.push(totalp1);
        data2persentase.push(totalp2);
        
      };
      xhr.open(
        "GET",
        process.env.REACT_APP_URL_API +
          "/berkaca?tahun=" +
          selectedYears +
          "&wilayah=[" +
          wilayahID +
          "," +
          wilayahID2 +
          "]" +
          "&parent_id_1=" +
          parent_id_1Berkaca +
          "&dataset_1=" +
          sessionStorage.getItem("all_ds_1") +
          "&parent_id_2=" +
          parent_id_2Berkaca +
          "&dataset_2=" +
          sessionStorage.getItem("all_ds_2"),
        false
      );
      xhr.send();

      const labels1persentase = labelpie1persentase.map((item) => {
        const labelSet1Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet1Persentase}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({`${item.label}%`})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      const backgroundColor1persentase = [
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

      var tampbgColor1Persentase = [];
      labels1persentase.map((label, index) => {
        tampbgColor1Persentase.push(backgroundColor1persentase[index]);
      });
      tampbgColor1Persentase.push("#FFFFFF");

      var legendData1persentase = labels1persentase.map((label, index) => {
        return {
          label,
          color: backgroundColor1persentase[index],
        };
      });

      // Draw pie chart for Card 1 Persentase
      const ctx1persentase = chartRef1Persentasemobile.current.getContext("2d");
      const transformedData1P = labelpie1persentase.map((item) => {
        const labelSet1Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = `${labelSet1Persentase}`;
        return {
          label: coloredLabelSet,
          value: item.value,
        };
      });
      const chart1persentasemobile = new Chart(ctx1persentase, {
        type: "doughnut",
        data: {
          labels: transformedData1P.map((item) => item.label),
          datasets: [
            {
              data: data1persentase,
              backgroundColor: tampbgColor1Persentase,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie1persentase[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie1persentase);
                    return '';
                  }

                  const labelSet1Persentase = selectedDataBerkaca.labelset1 ? selectedDataBerkaca.labelset1[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}%`;
                },
              },
            },
          },
        },
      });

      const labels2persentase = labelpie2persentase.map((item) => {
        const labelSet2Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet2Persentase}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({`${item.label}%`})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      const backgroundColor2persentase = [
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

      var tampbgColor2Persentase = [];
      labels2persentase.map((label, index) => {
        tampbgColor2Persentase.push(backgroundColor2persentase[index]);
      });
      tampbgColor2Persentase.push("#FFFFFF");

      var legendData2persentase = labels2persentase.map((label, index) => {
        return {
          label,
          color: backgroundColor2persentase[index],
        };
      });

      // Draw pie chart for Card 2 Persentase
      const ctx2persentase = chartRef2Persentasemobile.current.getContext("2d");
      const transformedData2P = labelpie2persentase.map((item) => {
        const labelSet2Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet = `${labelSet2Persentase}`;
        return {
          label: coloredLabelSet,
          value: item.value,
        };
      });
      const chart2persentasemobile = new Chart(ctx2persentase, {
        type: "doughnut",
        data: {
          labels: transformedData2P.map((item) => item.label),
          datasets: [
            {
              data: data2persentase,
              backgroundColor: tampbgColor2Persentase,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie2persentase[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie2persentase);
                    return '';
                  }

                  const labelSet2Persentase = selectedDataBerkaca.labelset2 ? selectedDataBerkaca.labelset2[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}%`; 
                },
              },
            },
          },
        },
      });

      // Set legend data Persentase
      setLegendData1Persentase(legendData1persentase);
      setLegendData2Persentase(legendData2persentase);

      // Cleanup
      return () => {
        chart1persentasemobile.destroy();
        chart2persentasemobile.destroy();
      };
    }
  }, [
    activeTabMobile,
    nilaipie1persentase,
    labelpie1persentase,
    nilaipie2persentase,
    labelpie2persentase,
  ]);

  useEffect(() => {
    if (activeTabMobile2 === "persentasemobile2") {
      const data3persentase = nilaipie3persentase.map((item) => item.nilai);
      const data4persentase = nilaipie4persentase.map((item) => item.nilai);

      var totalp3 = 0;
      var totalp4 = 0;
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var result = JSON.parse(this.responseText);
        var totalparentp1 = 0;
        var totalparentp2 = 0;
        var totalparentp3 = 0;
        var totalparentp4 = 0;
        if (
          result.data &&
          result.data.percentage &&
          result.data.percentage.dataset_1 &&
          result.data.percentage.dataset_1.length > 0
        ) {
          result.data.percentage.dataset_1.forEach(item => {
            if(item.id_wilayah == wilayahID2){
              totalparentp3 = item.nilai
            }
          })
        }
        if (
          result.data &&
          result.data.percentage &&
          result.data.percentage.dataset_2 &&
          result.data.percentage.dataset_2.length > 0
        ) {
          result.data.percentage.dataset_2.forEach(item =>{
            if(item.id_wilayah == wilayahID2){
              totalparentp4 = item.nilai
            }
          })
        }
       
        data3persentase.map((item) => {
          totalparentp3 -= item;
        });
        
        data4persentase.map((item) => {
          totalparentp4 -= item;
        });
       
        totalp3 = totalparentp3;
        totalp4 = totalparentp4;
        
        data3persentase.push(totalp3);
        data4persentase.push(totalp4);
      };
      xhr.open(
        "GET",
        process.env.REACT_APP_URL_API +
          "/berkaca?tahun=" +
          selectedYears +
          "&wilayah=[" +
          wilayahID +
          "," +
          wilayahID2 +
          "]" +
          "&parent_id_1=" +
          parent_id_1Berkaca +
          "&dataset_1=" +
          sessionStorage.getItem("all_ds_1") +
          "&parent_id_2=" +
          parent_id_2Berkaca +
          "&dataset_2=" +
          sessionStorage.getItem("all_ds_2"),
        false
      );
      xhr.send();

      
      const labels3persentase = labelpie3persentase.map((item) => {
        const labelSet1Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet1Persentase}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({`${item.label}%`})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      const backgroundColor3persentase = [
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

      var tampbgColor3Persentase = [];
      labels3persentase.map((label, index) => {
        tampbgColor3Persentase.push(backgroundColor3persentase[index]);
      });
      tampbgColor3Persentase.push("#FFFFFF");

      var legendData3persentase = labels3persentase.map((label, index) => {
        return {
          label,
          color: backgroundColor3persentase[index],
        };
      });

      // Draw pie chart for Card 1
      const ctx3persentase = chartRef3Persentasemobile.current.getContext("2d");
      const transformedData3P = labelpie3persentase.map((item) => {
        const labelSet1Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = `${labelSet1Persentase}`;
        return {
          label: coloredLabelSet,
          value: item.value,
        };
      });
      const chart3persentasemobile = new Chart(ctx3persentase, {
        type: "doughnut",
        data: {
          labels: transformedData3P.map((item) => item.label),
          datasets: [
            {
              data: data3persentase,
              backgroundColor: tampbgColor3Persentase,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie3persentase[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie3persentase);
                    return '';
                  }

                  const labelSet1Persentase = selectedDataBerkaca.labelset1 ? selectedDataBerkaca.labelset1[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}%`;
                },
              },
            },
          },
        },
      });

      const labels4persentase = labelpie4persentase.map((item) => {
        const labelSet2Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet2Persentase}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({`${item.label}%`})</span>
        );
        return (
          <span>
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      const backgroundColor4persentase = [
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

      var tampbgColor4Persentase = [];
      labels4persentase.map((label, index) => {
        tampbgColor4Persentase.push(backgroundColor4persentase[index]);
      });
      tampbgColor4Persentase.push("#FFFFFF");

      var legendData4persentase = labels4persentase.map((label, index) => {
        return {
          label,
          color: backgroundColor4persentase[index],
        };
      });

      // Draw pie chart for Card 2
      const ctx4persentase = chartRef4Persentasemobile.current.getContext("2d");
      const transformedData4P = labelpie4persentase.map((item) => {
        const labelSet2Persentase = JSON.parse(
          sessionStorage.getItem("selectedDataBerkaca")
        ).labelset2[item.id_bidang];
        const coloredLabelSet = `${labelSet2Persentase}`;
        return {
          label: coloredLabelSet,
          value: item.value,
        };
      });
      const chart4persentasemobile = new Chart(ctx4persentase, {
        type: "doughnut",
        data: {
          labels: transformedData4P.map((item) => item.label),
          datasets: [
            {
              data: data4persentase,
              backgroundColor: tampbgColor4Persentase,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const item = labelpie4persentase[index];

                  if (!item) {
                    console.error(`Item at index ${index} is undefined. labelpie1:`, labelpie4persentase);
                    return '';
                  }

                  const labelSet2Persentase = selectedDataBerkaca.labelset2 ? selectedDataBerkaca.labelset2[item.id_bidang] : '';
                  const label = `${item.label}`;
                  const value = context.raw || 0;
                  return `${label}%`;
                },
              },
            },
          },
        },
      });

      // Set legend data Persentase
      setLegendData3Persentase(legendData3persentase);
      setLegendData4Persentase(legendData4persentase);

      // Cleanup
      return () => {
        chart3persentasemobile.destroy();
        chart4persentasemobile.destroy();
      };
    }
  }, [
    activeTabMobile2,
    nilaipie3persentase,
    labelpie3persentase,
    nilaipie4persentase,
    labelpie4persentase,
  ]);
  
  

 

  

  

  

  

  

  

  function previous() {
    if (selectedYears > years[years.length - 1].tahun) {
      setSelectedYears(Number(selectedYears) - 1);
    }
  }

  function next() {
    if (selectedYears < years[0].tahun) {
      setSelectedYears(Number(selectedYears) + 1);
    }
  }

  const handleClickMore = () => {
    setShowAllLegends1(!showAllLegends1);
    setShowAllLegends2(!showAllLegends2);
    setShowAllLegends3(!showAllLegends3);
    setShowAllLegends4(!showAllLegends4);
  };

  const handleDropdownProvinsiKiri = () => {
    setDropdownProvinsiKiri(!dropdownProvinsiKiri);
  };

  const handleDropdownProvinsiKanan = () => {
    setDropdownProvinsiKanan(!dropdownProvinsiKanan);
  };

  const handleDropdownKotaKiri = () => {
    setDropdownKotaKiri(!dropdownKotaKiri);
  };

  const handleDropdownKotaKanan = () => {
    setDropdownKotaKanan(!dropdownKotaKanan);
  };

  const handleDropdownTahunKiri = () => {
    setDropdownTahunKiri(!dropdownTahunKiri);
  };
  const handleDropdownTahunKanan = () => {
    setDropdownTahunKanan(!dropdownTahunKanan);
  };

  const handleOptionProvinsiKanan = (option) => {
    setSelectedProvinsiKanan(option);
    setDropdownProvinsiKanan(false);
  };

  const handleOptionProvinsiKiri = (option) => {
    setSelectedProvinsiKiri(option);
    setDropdownProvinsiKiri(false);
  };

  const handleOptionKotaKiri = (option) => {
    setSelectedKotaKiri(option);
    setDropdownKotaKiri(false);
  };

  const handleOptionKotaKanan = (option) => {
    setSelectedKotaKanan(option);
    setDropdownKotaKanan(false);
  };

  const renderDropdownProvinsiKanan = () => {
    const options = ["Jawa Barat", "Jawa Tengah", "Jawa Timur"];

    return options.map((option, index) => (
      <div
        key={index}
        onClick={() => handleOptionProvinsiKanan(option)}
        className="flex  w-[167px] h-[41px] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg cursor-pointer"
      >
        <p>{option}</p>
      </div>
    ));
  };

  const renderDropdownProvinsiKiri = () => {
    const options = ["Jawa Barat", "Jawa Tengah", "Jawa Timur"];

    return options.map((option, index) => (
      <div
        key={index}
        onClick={() => handleOptionProvinsiKiri(option)}
        className="flex  w-[167px] h-[41px] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg cursor-pointer"
      >
        <p>{option}</p>
      </div>
    ));
  };

  const renderDropdownKotaKiri = () => {
    const options = ["Kota Bandung", "Kota Cirebon", "Kota Bekasi"];

    return options.map((option, index) => (
      <div
        key={index}
        onClick={() => handleOptionKotaKiri(option)}
        className="flex w-[167px] h-[41px] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg cursor-pointer"
      >
        <p>{option}</p>
      </div>
    ));
  };

  const renderDropdownKotaKanan = () => {
    const options = ["Kota Bandung", "Kota Cirebon", "Kota Bekasi"];

    return options.map((option, index) => (
      <div
        key={index}
        onClick={() => handleOptionKotaKanan(option)}
        className="flex w-[167px] h-[41px] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg cursor-pointer"
      >
        <p>{option}</p>
      </div>
    ));
  };

  const renderDropdownTahunKiri = () => {
    const options = ["2022", "2021", "2020"];

    return options.map((option, index) => (
      <div
        key={index}
        onClick={() => handleDropdownTahunKiri(option)}
        className="flex w-[167px] h-[41px] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg cursor-pointer"
      >
        <p>{option}</p>
      </div>
    ));
  };

  const renderDropdownTahunKanan = () => {
    const options = ["2022", "2021", "2020"];

    return options.map((option, index) => (
      <div
        key={index}
        onClick={() => handleDropdownTahunKanan(option)}
        className="flex w-[167px] h-[41px] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg cursor-pointer"
      >
        <p>{option}</p>
      </div>
    ));
  };

  const SwitchBtn = ({ selected, onSelect }) => (
    <div className="switch" onClick={onSelect}>
      <input
        type="checkbox"
        id="toggle"
        checked={selected === "persentase"}
        readOnly
      />
      <label htmlFor="toggle" className="slider"></label>
    </div>
  );

  const SwitchBtnMobile = ({ selected, onSelect }) => (
    <div className="switch" onClick={onSelect}>
      <input
        type="checkbox"
        id="toggle"
        checked={selected === "persentasemobile"}
        readOnly
      />
      <label htmlFor="toggle" className="slider"></label>
    </div>
  );

  const SwitchBtnMobile2 = ({ selected, onSelect }) => (
    <div className="switch" onClick={onSelect}>
      <input
        type="checkbox"
        id="toggle"
        checked={selected === "persentasemobile2"}
        readOnly
      />
      <label htmlFor="toggle" className="slider"></label>
    </div>
  );

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

  const [dataChart, setDataChart] = useState([]);
  const [dataChart2, setDataChart2] = useState([]);
  const [showCards, setShowCards] = useState(true);

  // useEffect(() => {
  //   // Pengecekan apakah kota pertama tidak lagi dipilih "Semua" dan kota kedua masih dipilih "Semua"
  //   if (selectedCity !== "Semua" && selectedCity2 === "Semua") {
  //     Swal.fire({
  //       title: "Perhatian!",
  //       text: "Silakan pilih Kab/Kota pada Wilayah 2 karena tidak memungkinkan perbandingan antara Provinsi dan Kab/Kota",
  //       confirmButtonText: "Tutup",
  //       confirmButtonColor: "#24445A",
  //       customClass: {
  //         icon: "no-border",
  //         title: "title-icon-errorr",
  //         text: "text-icon",
  //         confirmButton: "confirm-icon",
  //         cancelButton: "cancel-icon",
  //       },
  //     });
  //   } else if (selectedCity === "Semua" && selectedCity2 !== "Semua") {
  //     Swal.fire({
  //       title: "Perhatian!",
  //       text: "Silakan pilih Provinsi pada Wilayah 2 karena tidak memungkinkan perbandingan antara Kab/Kota dan Provinsi",
  //       confirmButtonText: "Tutup",
  //       confirmButtonColor: "#24445A",
  //       customClass: {
  //         icon: "no-border",
  //         title: "title-icon-errorr",
  //         text: "text-icon",
  //         confirmButton: "confirm-icon",
  //         cancelButton: "cancel-icon",
  //       },
  //     });
  //   }
  // }, [selectedCity, selectedCity2]);

  // useEffect(() => {
  //   if (selectedCity !== "Semua" && selectedCity2 === "Semua") {
  //     setShowCards(false);
  //     } else if (selectedCity === "Semua" && selectedCity2 !== "Semua") {
  //     setShowCards(false);
  //   } else {
  //     setShowCards(true);
  //   }
  // }, [selectedCity, selectedCity2]);

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
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
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
  
  

  return (
    <div>
    <div className="flex flex-col mt-[100px] mb-[15px] justify-center items-center">
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
          href="/Berkaca-RILL-API"
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

      {/* MOBILE */}
      <div className="flex gap-x-[40px] gap-y-[10px] mt-[5px] mb-[15px] lg:hidden md:hidden">
        {/* Button ke timeseries */}
        <div className="relative mt-2">
          <NavLink
            to={"/Berkaca-Grafik-Timeseries"}
            className="flex bg-secondary text-white w-[115px] h-[41px] rounded-[10px] border-1 border-[f1f1f1] text-[12px] font-medium items-center justify-center cursor-pointer hover:bg-third 
            hover:text-white"
            onClick={(e) => {
              if (
                selectedCity.toLowerCase() !== "semua" &&
                selectedCity2.toLowerCase() === "semua"
              ) {
                Swal.fire({
                  title: "Perhatian!",
                  text: "Silakan pilih Kab/Kota pada Wilayah 2 karena tidak memungkinkan perbandingan antara Provinsi dan Kab/Kota",
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
            <p className="text-secondary text-[14px]"></p>
            Semua Tahun
          </NavLink>
        </div>
        {/* Dropdown tahun kanan */}
        <div className="relative mt-2">
          <div
            onClick={() => setOpenYears(!openYears)}
            className="bg-[#ebebeb] w-full p-2 px-[30px] h-[41px] cursor-pointer text-secondary gap-[5px] text-[12px] flex items-center justify-between rounded-[10px]"
          >
            {selectedYears
              ? selectedYears?.length > 12
                ? selectedYears?.substring(0, 12) + "..."
                : selectedYears
              : "Tahun"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-auto w-[10px] h-[20px] ${
                openYears && "rotate-180"
              }`}
            />
          </div>
          {openYears && (
            <div className="absolute z-10 bg-[#ebebeb] mt-2 rounded-md shadow-lg">
              <div className="flex items-center px-2">
                <FontAwesomeIcon
                  icon={faSearch}
                  color="#24445A"
                  style={{ opacity: "40%", marginRight: "8px" }}
                  className="w-[10px] h-[20px] opacity-75"
                />
                <input
                  type="text"
                  value={inputValueofYears}
                  onChange={(e) =>
                    setInputValueofYears(e.target.value.toLowerCase())
                  }
                  placeholder="Cari Tahun"
                  className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[10px] font-medium bg-[#ebebeb]"
                />
              </div>
              <ul className="max-h-60 overflow-y-scroll mini-scrollbar">
                {years?.map((tahunn) => (
                  <li
                    key={tahunn?.tahun}
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] ${
                      tahunn?.tahun === selectedYears &&
                      "bg-secondary text-white"
                    } ${
                      tahunn?.tahun?.toLowerCase().includes(inputValueofYears)
                        ? "block"
                        : "hidden"
                    }`}
                    onClick={() => {
                      if (tahunn?.tahun !== selectedYears) {
                        setSelectedYears(tahunn?.tahun);
                        setOpenYears(false);
                        setInputValueofYears("");
                        sessionStorage.setItem("yearss", tahunn?.tahun);
                      }
                    }}
                  >
                    {tahunn?.tahun}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div class="flex items-center justify-center font-semibold text-secondary mt-[10px] text-[10px] text-[20px] gap-x-[20px] md:hidden lg:hidden">
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

      {/* Dataset 1 */}
      <div className={activeTabMobileDataset === "dataset1" ? "" : "hidden"}>
        <div className="relative mt-4 lg:hidden md:hidden">
          <p className="text-center text-[20px] font-bold text-secondary mt-4 lg:hidden md:hidden">
            {sessionStorage.getItem("namaFilter1")}
          </p>
          <p className="text-center lg:text-[16px] text-[13px] text-secondary lg:hidden md:hidden font-bold">
            &#40;{kapitaset1}&#41;
          </p>
        </div>
      </div>
      {/* Dataset 2 */}
      <div className={activeTabMobileDataset === "dataset2" ? "" : "hidden"}>
        <div className="relative mt-4 lg:hidden md:hidden">
          <p className="text-center text-[20px] font-bold text-secondary mt-4 lg:hidden md:hidden">
            {sessionStorage.getItem("namaFilter2")}
          </p>
          <p className="text-center lg:text-[16px] text-[13px] text-secondary lg:hidden md:hidden font-bold">
            &#40;{kapitaset2}&#41;
          </p>
        </div>
      </div>

      <div className="flex gap-x-[20px] gap-y-[10px] mt-[20px] lg:hidden md:hidden">
        {/* Dropdown Provinsi 1 Mobile */}
        <div className="relative w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:hidden md:hidden">
          <div
            onClick={() => {
              setOpenProvinsi(!openProvinsi);
              if (openCity) {
                setOpenCity(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] text-[12px] flex items-center justify-between rounded-[10px]"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span
              style={{ maxWidth: "calc(100% - 20px)", display: "inline-block" }}
            >
              {selected
                ? selected?.length > 10
                  ? selected?.substring(0, 10) + "..."
                  : selected
                : "Provinsi"}
            </span>

            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`absolute right-2 top-2 w-[10px] h-[20px] ${
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
                      setWilayahID(provinces.id);
                      setGetInfoProvinsi(provinces.id);
                      setSelectedCity("Semua");
                      provinsi = provinces.id;
                      wilayah = provinces.id;
                      sessionStorage.setItem("idprovinsi", provinces.id);
                      sessionStorage.setItem("namaprovinsi", provinces.nama);
                      sessionStorage.setItem("namawilayah", "Semua");
                      sessionStorage.setItem("namakota", "Semua");
                      sessionStorage.setItem("idkota", provinces.id);
                      sessionStorage.setItem("idwilayah", provinces.id);
                    }}
              >
                {provinces?.nama}
              </li>
            ))}
          </ul>
        </div>
        {/* Dropdown Kota 1 Mobile */}
        <div className="relative w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:hidden md:hidden ">
          <div
            onClick={() => {
              setOpenCity(!openCity);
              if (openProvinsi) {
                setOpenProvinsi(false);
              }
            }}
            className="bg-[#ebebeb] w-full text-[12px] p-2 px-[30px]  flex items-center justify-between rounded-[10px]"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span
              style={{ maxWidth: "calc(100% - 20px)", display: "inline-block" }}
            >
              {selectedCity
                ? selectedCity?.length > 10
                  ? selectedCity?.substring(0, 10) + "..."
                  : selectedCity
                : "Kota/Kabupaten"}
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`absolute right-2 top-2 w-[10px] h-[20px] ${
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
                      setSelectedCity("Semua");
                      setWilayahID(getInfoProvinsi);
                      setSelectedYears(sessionStorage.getItem("yearss"));
                      setOpenCity(false);
                      setSelectedCity2("Semua");
                      setWilayahID2(getInfoProvinsi2);
                      sessionStorage.setItem("selectedCity2", "Semua"); // Corrected line
                      sessionStorage.setItem("infoProvinsi2", getInfoProvinsi2);
                      // setSelectedYears(sessionStorage.getItem("yearss"));
                      // setOpenCity2(false);
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
                      regencies?.nama
                        ?.toLowerCase()
                        .includes(inputValueofCity)
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
                        setWilayahID(wilayah);
                        sessionStorage.setItem("namawilayah", regencies.nama);
                        sessionStorage.setItem("idkota", regencies.id);
                        sessionStorage.setItem("namakota", regencies.nama);
                        sessionStorage.setItem("idwilayah", regencies.id);
                      }
                    }}
              >
                {regencies?.nama}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Penduduk Mobile D1 */}
      <p className="text-center text-[17px] text-secondary mt-[5px] lg:hidden md:hidden block">
        Penduduk
      </p>
      <p className="text-center font-bold text-[18px] text-secondary mt-[-5px] mb-[15px] lg:hidden md:hidden block">
        {penduduk} Jiwa
      </p>
      {/* Switch Tab Mobile */}
      <div class="flex items-center justify-center font-semibold text-secondary mt-[10px] text-[10px] text-[15px] gap-x-[20px] md:hidden lg:hidden">
        <p
          className={
            activeTabMobile === "persentasemobile" ? "inactive-text" : ""
          }
        >
          Nominal
        </p>
        <SwitchBtnMobile
          selected={activeTabMobile}
          onSelect={toggleTabMobile}
        />
        <p
          className={activeTabMobile === "nominalmobile" ? "inactive-text" : ""}
        >
          Persentase
        </p>
      </div>

      {/* Chart Daerah 1 Mobile */}
      <div className={activeTabMobileDataset === "dataset1" ? "" : "hidden"}>
        <div className={activeTabMobile === "nominalmobile" ? "" : "hidden"}>
          <div className="flex justify-center items-center mt-[50px] lg:ml-[5px] ml-[5px]">
            <div className="card-container lg:hidden md:hidden">
              {/* Konten Card pertama */}
              <Card
                chartRef={chartRef1mobile}
                legendData={legendData1}
                expand={showAllLegends1}
                onExpand={handleExpandCard1}
                onHide={handleCloseLegends1}
                activeTabMobile={activeTabMobile}
              />
            </div>
          </div>
        </div>
        <div className={activeTabMobile === "persentasemobile" ? "" : "hidden"}>
          <div className="flex justify-center items-center mt-[50px] lg:ml-[5px] ml-[5px]">
            <div className="card-container lg:hidden md:hidden">
              {/* Konten Card pertama */}
              <Card
                chartRef={chartRef1Persentasemobile}
                legendData={legendData1Persentase}
                expand={showAllLegends1Persentase}
                onExpand={handleExpandCard1Persentase}
                onHide={handleCloseLegends1Persentase}
                activeTabMobile={activeTabMobile}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Chart Daerah 2 Mobile */}
      <div className={activeTabMobileDataset === "dataset2" ? "" : "hidden"}>
        <div className={activeTabMobile === "nominalmobile" ? "" : "hidden"}>
          <div className="flex justify-center items-center mt-[50px] lg:ml-[5px] ml-[5px]">
            <div className="card-container lg:hidden md:hidden">
              {/* Konten Card pertama */}
              <Card
                chartRef={chartRef2mobile}
                legendData={legendData2}
                expand={showAllLegends2}
                onExpand={handleExpandCard2}
                onHide={handleCloseLegends2}
                activeTabMobile={activeTabMobile}
              />
            </div>
          </div>
        </div>
        <div className={activeTabMobile === "persentasemobile" ? "" : "hidden"}>
        <div className="flex justify-center items-center mt-[50px] lg:ml-[5px] ml-[5px]">
            <div className="card-container lg:hidden md:hidden">
              {/* Konten Card pertama */}
              <Card
                chartRef={chartRef2Persentasemobile}
                legendData={legendData2Persentase}
                expand={showAllLegends2Persentase}
                onExpand={handleExpandCard2Persentase}
                onHide={handleCloseLegends2Persentase}
                activeTabMobile={activeTabMobile}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={activeTabMobileDataset === "dataset1" ? "" : "hidden"}>
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:hidden  md:hidden ">
              <br></br>
              {notes_1 &&
                typeof notes_1 === "object" &&
                Object.values(notes_1).map((note, index) => (
                  <div key={index}>- {note}</div>
                ))}
            </div>
      </div>
      <div className={activeTabMobileDataset === "dataset2" ? "" : "hidden"}>
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:hidden  md:hidden">
              <br></br>
              {notes_2_2 &&
                typeof notes_2_2 === "object" &&
                Object.values(notes_2_2).map((note, index) => (
                  <div key={index}>- {note}</div>
                ))}
            </div>
      </div>

      <div className="flex gap-x-[20px] gap-y-[10px] mt-[15px] lg:hidden md:hidden">
        {/* Provinsi 2 Mobile */}
        <div className="relative w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:hidden md:hidden">
          <div
            onClick={() => {
              setOpenProvinsi2(!openProvinsi2);
              if (openCity2) {
                setOpenCity2(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2  text-[12px] px-[30px] flex items-center justify-between rounded-[10px]"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span
              style={{ maxWidth: "calc(100% - 20px)", display: "inline-block" }}
            >
              {selected2
                ? selected2?.length > 10
                  ? selected2?.substring(0, 10) + "..."
                  : selected2
                : "Provinsi"}
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`absolute right-2 top-2 w-[10px] h-[20px] ${
                openProvinsi2 && "rotate-180"
              }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
              ${openProvinsi2 ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValue2}
              onChange={(e) => setInputValue2(e.target.value.toLowerCase())}
              placeholder="Cari Provinsi"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>
          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                  ${openProvinsi2 ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {provincess2?.map((provinces2) => (
              <li
                key={provinces2?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${
                      provinces2?.nama?.toLowerCase() ===
                        selected2?.toLowerCase() && "bg-secondary text-white"
                    }
                    ${
                      provinces2?.nama?.toLowerCase().includes(inputValue2)
                        ? "block"
                        : "hidden"
                    }`}
                onClick={() => {
                  updateKota2(provinces2?.nama, selected2, provinces2.id);
                  setWilayahID2(provinces2.id);
                  setGetInfoProvinsi2(provinces2.id);
                  setSelectedCity2("Semua");
                  provinsi2 = provinces2.id;
                  wilayah2 = provinces2.id;
                  sessionStorage.setItem("idprovinsi_berkaca2", provinces2.id);
                  sessionStorage.setItem(
                    "namaprovinsi_berkaca2",
                    provinces2.nama
                  );
                  sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                  sessionStorage.setItem("namakota_berkaca2", "Semua");
                  sessionStorage.setItem("idkota_berkaca2", provinces2.id);
                  sessionStorage.setItem("idwilayah_berkaca2", provinces2.id);
                }}
                
              >
                {provinces2?.nama}
              </li>
            ))}
          </ul>
        </div>
        {/* Kota 2 Mobile */}
        <div className="relative w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:hidden md:hidden ">
          <div
            onClick={() => {
              setOpenCity2(!openCity2);
              if (openProvinsi2) {
                setOpenProvinsi2(false);
              }
            }}
            className="bg-[#ebebeb] w-full text-[12px] p-2 px-[30px] flex items-center justify-between rounded-[10px]"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span
              style={{ maxWidth: "calc(100% - 20px)", display: "inline-block" }}
            >
              {selectedCity2
                ? selectedCity2?.length > 20
                  ? selectedCity2?.substring(0, 20) + "..."
                  : selectedCity2
                : "Kota/Kabupaten"}
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`absolute right-2 top-2 w-[10px] h-[20px] ${
                openCity2 && "rotate-180"
              }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
              ${openCity2 ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValueofCity2}
              onChange={(e) =>
                setInputValueofCity2(e.target.value.toLowerCase())
              }
              placeholder="Cari Kota/Kabupaten"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>
          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                  ${openCity2 ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {selectedCity === "Semua" ? (
              <li
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary
                      ${
                        "Semua" === selectedCity2?.toLowerCase() &&
                        "bg-secondary text-white"
                      }
                    `}
                    onClick={() => {
                      setSelectedCity2("Semua");
                      wilayah2 = provinsi2;
                      sessionStorage.setItem("namawilayah2", "Semua");
                      //     setInfoDaerah("Semua");
                      setSelectedCity2("Semua");
                      setWilayahID2(getInfoProvinsi2);
                      setSelectedYears(sessionStorage.getItem("yearss"));
                      setOpenCity2(false);
                      sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                      sessionStorage.setItem(
                        "idkota_berkaca2",
                        sessionStorage.getItem("idprovinsi_berkaca2")
                      );
                      sessionStorage.setItem("namakota_berkaca2", "Semua");
                      sessionStorage.setItem("idwilayah_berkaca2", 
                        sessionStorage.getItem("idprovinsi_berkaca2")
                      );
                    }}
                  >
                Semua
              </li>
            ) : (
              <li className="p-2 text-[12px] text-gray-400">
                Pilih "Semua" di Daerah 1 untuk mengakses Provinsi
              </li>
            )}
            {cities2?.map((regencies2) => (
             <li
             key={regencies2?.nama}
             className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                 ${
                   regencies2?.nama?.toLowerCase() ===
                     selectedCity2?.toLowerCase() &&
                   "bg-secondary text-white"
                 }
                 ${
                   regencies2?.nama
                     ?.toLowerCase()
                     .includes(inputValueofCity2)
                     ? "block"
                     : "hidden"
                 }`}
             onClick={() => {
               if (
                 regencies2?.nama?.toLowerCase() !==
                 selectedCity2.toLowerCase()
               ) {
                 wilayah2 = regencies2.id;
                 setSelectedCity2(regencies2?.nama);
                 setOpenCity2(false);
                 setInputValueofCity2("");
                 setWilayahID2(wilayah2);
                 sessionStorage.setItem(
                   "namawilayah_berkaca2",
                   regencies2.nama
                 );
                 sessionStorage.setItem("idwilayah_berkaca2", regencies2.id);
                 sessionStorage.setItem("idkota_berkaca2", regencies2.id);
                 sessionStorage.setItem(
                   "namakota_berkaca2",
                   regencies2.nama
                 );
               }
             }}
             style={{
               color:
                 selectedCity === "Semua" && regencies2?.nama !== "Semua"
                   ? "gray"
                   : null,
             }}
             disabled={selectedCity === "Semua"}
           >
             {regencies2?.nama}
           </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Penduduk Mobile D2 */}
      <p className="text-center text-[17px] text-secondary mt-[5px] lg:hidden md:hidden block">
        Penduduk
      </p>
      <p className={`text-center font-bold text-[18px] text-secondary mt-[-5px] mb-[15px] lg:hidden md:hidden block ${!showCards ? "hidden" : ""}`}>
        {penduduk2} Jiwa
      </p>
      {/* Switch Tab Mobile */}
      <div class="flex items-center justify-center font-semibold text-secondary mt-[10px] text-[10px] text-[15px] gap-x-[20px] md:hidden lg:hidden">
        <p
          className={
            activeTabMobile2 === "persentasemobile2" ? "inactive-text" : ""
          }
        >
          Nominal
        </p>
        <SwitchBtnMobile2
          selected={activeTabMobile2}
          onSelect={toggleTabMobile2}
        />
        <p
          className={
            activeTabMobile2 === "nominalmobile2" ? "inactive-text" : ""
          }
        >
          Persentase
        </p>
      </div>

      <div className={activeTabMobileDataset === "dataset1" ? "" : "hidden"}>
        <div className={activeTabMobile2 === "nominalmobile2" ? "" : "hidden"}>
            <div className="flex justify-center items-center mt-[50px] lg:ml-[5px] ml-[5px]">
          <div className={`card-container lg:hidden md:hidden ${showCards ? "" : "hidden"}`}>
              {/* Konten Card pertama */}
              <Card
                chartRef={chartRef3mobile}
                legendData={legendData3}
                expand={showAllLegends3}
                onExpand={handleExpandCard3}
                onHide={handleCloseLegends3}
                activeTabMobile={activeTabMobile}
              />
            </div>
          </div>
        </div>

        <div
          className={activeTabMobile2 === "persentasemobile2" ? "" : "hidden"}
        >
          <div className="flex justify-center items-center mt-[50px] lg:ml-[5px] ml-[5px]">
          <div className={`card-container lg:hidden md:hidden ${showCards ? "" : "hidden"}`}>
              {/* Konten Card pertama */}
              <Card
                chartRef={chartRef3Persentasemobile}
                legendData={legendData3Persentase}
                expand={showAllLegends3Persentase}
                onExpand={handleExpandCard3Persentase}
                onHide={handleCloseLegends3Persentase}
                activeTabMobile={activeTabMobile}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={activeTabMobileDataset === "dataset2" ? "" : "hidden"}>
        <div className={activeTabMobile2 === "nominalmobile2" ? "" : "hidden"}>
          <div className="flex justify-center items-center mt-[50px] lg:ml-[5px] ml-[5px]">
          <div className={`card-container lg:hidden md:hidden ${showCards ? "" : "hidden"}`}>
              {/* Konten Card pertama */}
              <Card
                chartRef={chartRef4mobile}
                legendData={legendData4}
                expand={showAllLegends4}
                onExpand={handleExpandCard4}
                onHide={handleCloseLegends4}
                activeTabMobile={activeTabMobile}
              />
            </div>
          </div>
        </div>

        <div
          className={activeTabMobile2 === "persentasemobile2" ? "" : "hidden"}
        >
          <div className="flex justify-center items-center mt-[50px] lg:ml-[5px] ml-[5px]">
          <div className={`card-container lg:hidden md:hidden ${showCards ? "" : "hidden"}`}>
              {/* Konten Card pertama */}
              <Card
                chartRef={chartRef4Persentasemobile}
                legendData={legendData4Persentase}
                expand={showAllLegends4Persentase}
                onExpand={handleExpandCard4Persentase}
                onHide={handleCloseLegends4Persentase}
                activeTabMobile={activeTabMobile}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={activeTabMobileDataset === "dataset1" ? "" : "hidden"}>
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:hidden  md:hidden ">
              <br></br>
              {notes_1 &&
                typeof notes_1 === "object" &&
                Object.values(notes_1).map((note, index) => (
                  <div key={index}>- {note}</div>
                ))}
            </div>
      </div>
      <div className={activeTabMobileDataset === "dataset2" ? "" : "hidden"}>
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:hidden  md:hidden">
              <br></br>
              {notes_2_2 &&
                typeof notes_2_2 === "object" &&
                Object.values(notes_2_2).map((note, index) => (
                  <div key={index}>- {note}</div>
                ))}
            </div>
      </div>
      
      <div className={activeTabMobileDataset === "dataset1" ? "" : "hidden"}>
        <div className="text-center text-[14px] lg:text-[16px] lg:hidden md:hidden">
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
            {sumber.length === 2 ? sumber.join(" & ") : sumber}
          </p>
        </div>
      </div>
      <div className={activeTabMobileDataset === "dataset2" ? "" : "hidden"}>
        <div className=" text-center text-[14px] lg:text-[16px]  lg:hidden md:hidden">
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
            {sumber2.length === 2 ? sumber2.join(" & ") : sumber2}
          </p>
        </div>
      </div>

      {/* Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-4 lg:gap-x-[100px] lg:gap-y-[10px] md:gap-x-[50px] md:gap-y-[10px]">
        {/* Dropdown Provinsi Kiri */}
        <div className="relative lg:w-[250px] md:w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:block md:block hidden">
          <div
            onClick={() => {
              setOpenProvinsi(!openProvinsi);
              if (openCity) {
                setOpenCity(false);
              }
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
                  setWilayahID(provinces.id);
                  setGetInfoProvinsi(provinces.id);
                  setSelectedCity("Semua");
                  provinsi = provinces.id;
                  wilayah = provinces.id;
                  sessionStorage.setItem("idprovinsi", provinces.id);
                  sessionStorage.setItem("idwilayah", provinces.id);
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
        {/* Dropdown Kota Kiri */}
        <div className="relative lg:w-[250px] md:w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:block md:block hidden">
          <div
            onClick={() => {
              setOpenCity(!openCity);
              if (openProvinsi) {
                setOpenProvinsi(false);
              }
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
                sessionStorage.setItem("namawilayah", "Semua");
                sessionStorage.setItem(
                  "idwilayah",
                  sessionStorage.getItem("idprovinsi")
                );
                sessionStorage.setItem(
                  "idkota",
                  sessionStorage.getItem("idprovinsi")
                );
                sessionStorage.setItem("namakota", "Semua");
                setSelectedCity("Semua");
                setWilayahID(getInfoProvinsi);
                setSelectedYears(sessionStorage.getItem("yearss"));
                setOpenCity(false);
                setSelectedCity2("Semua");
                setWilayahID2(getInfoProvinsi2);
                sessionStorage.setItem("selectedCity2", "Semua"); // Corrected line
                sessionStorage.setItem("infoProvinsi2", getInfoProvinsi2);
                // setSelectedYears(sessionStorage.getItem("yearss"));
                // setOpenCity2(false);
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
                      regencies?.nama
                        ?.toLowerCase()
                        .includes(inputValueofCity)
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
                    setWilayahID(wilayah);
                    sessionStorage.setItem("namawilayah", regencies.nama);
                    sessionStorage.setItem("idkota", regencies.id);
                    sessionStorage.setItem("idwilayah", regencies.id);
                    sessionStorage.setItem("namakota", regencies.nama);
                  }
                }}
              >
                {regencies?.nama}
              </li>
            ))}
          </ul>
        </div>
        {/* Dropdown Provinsi Kanan */}
        <div className="relative lg:w-[250px] md:w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:block md:block hidden">
          <div
            onClick={() => {
              setOpenProvinsi2(!openProvinsi2);
              if (openCity2) {
                setOpenCity2(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selected2
              ? selected2?.length > 20
                ? selected2?.substring(0, 20) + "..."
                : selected2
              : "Provinsi"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${
                openProvinsi2 && "rotate-180"
              }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
              ${openProvinsi2 ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValue2}
              onChange={(e) => setInputValue2(e.target.value.toLowerCase())}
              placeholder="Cari Provinsi"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>
          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                  ${openProvinsi2 ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {provincess2?.map((provinces2) => (
              <li
                key={provinces2?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${
                      provinces2?.nama?.toLowerCase() ===
                        selected2?.toLowerCase() && "bg-secondary text-white"
                    }
                    ${
                      provinces2?.nama?.toLowerCase().includes(inputValue2)
                        ? "block"
                        : "hidden"
                    }`}
                onClick={() => {
                  updateKota2(provinces2?.nama, selected2, provinces2.id);
                  setWilayahID2(provinces2.id);
                  setGetInfoProvinsi2(provinces2.id);
                  setSelectedCity2("Semua");
                  provinsi2 = provinces2.id;
                  wilayah2 = provinces2.id;
                  sessionStorage.setItem("idprovinsi_berkaca2", provinces2.id);
                  sessionStorage.setItem("idwilayah_berkaca2", provinces2.id);
                  sessionStorage.setItem(
                    "namaprovinsi_berkaca2",
                    provinces2.nama
                  );
                  sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                  sessionStorage.setItem("namakota_berkaca2", "Semua");
                  sessionStorage.setItem("idkota_berkaca2", provinces2.id);
                }}
              >
                {provinces2?.nama}
              </li>
            ))}
          </ul>
        </div>
        {/* Dropdown Kota Kanan */}
        <div className="relative lg:w-[250px] md:w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer lg:block md:block hidden">
          <div
            onClick={() => {
              setOpenCity2(!openCity2);
              if (openProvinsi2) {
                setOpenProvinsi2(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedCity2
              ? selectedCity2?.length > 20
                ? selectedCity2?.substring(0, 20) + "..."
                : selectedCity2
              : "Kota/Kabupaten"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${
                openCity2 && "rotate-180"
              }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
              ${openCity2 ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValueofCity2}
              onChange={(e) =>
                setInputValueofCity2(e.target.value.toLowerCase())
              }
              placeholder="Cari Kota/Kabupaten"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>
          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                  ${openCity2 ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {selectedCity === "Semua" ? (
              <li
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary
                      ${
                        "Semua" === selectedCity2?.toLowerCase() &&
                        "bg-secondary text-white"
                      }
                    `}
                onClick={() => {
                  setSelectedCity2("Semua");
                  wilayah2 = provinsi2;
                  sessionStorage.setItem("namawilayah2", "Semua");
                  //     setInfoDaerah("Semua");
                  setSelectedCity2("Semua");
                  setWilayahID2(getInfoProvinsi2);
                  setSelectedYears(sessionStorage.getItem("yearss"));
                  setOpenCity2(false);
                  sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                  sessionStorage.setItem(
                    "idkota_berkaca2",
                    sessionStorage.getItem("idprovinsi_berkaca2")
                  );
                  sessionStorage.setItem(
                    "idwilayah_berkaca2",
                    sessionStorage.getItem("idprovinsi_berkaca2")
                  );
                  sessionStorage.setItem("namakota_berkaca2", "Semua");
                }}
              >
                Semua
              </li>
            ) : (
              <li className="p-2 text-[12px] text-gray-400">
                Pilih "Semua" di Daerah 1 untuk mengakses Provinsi
              </li>
            )}
            {cities2?.map((regencies2) => (
              <li
                key={regencies2?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${
                      regencies2?.nama?.toLowerCase() ===
                        selectedCity2?.toLowerCase() &&
                      "bg-secondary text-white"
                    }
                    ${
                      regencies2?.nama
                        ?.toLowerCase()
                        .includes(inputValueofCity2)
                        ? "block"
                        : "hidden"
                    }`}
                onClick={() => {
                  if (
                    regencies2?.nama?.toLowerCase() !==
                    selectedCity2.toLowerCase()
                  ) {
                    wilayah2 = regencies2.id;
                    setSelectedCity2(regencies2?.nama);
                    setOpenCity2(false);
                    setInputValueofCity2("");
                    setWilayahID2(wilayah2);
                    sessionStorage.setItem(
                      "namawilayah_berkaca2",
                      regencies2.nama
                    );
                    sessionStorage.setItem("idkota_berkaca2", regencies2.id);
                    sessionStorage.setItem("idwilayah_berkaca2", regencies2.id);
                    sessionStorage.setItem(
                      "namakota_berkaca2",
                      regencies2.nama
                    );
                  }
                }}
                style={{
                  color:
                    selectedCity === "Semua" && regencies2?.nama !== "Semua"
                      ? "gray"
                      : null,
                }}
                disabled={selectedCity === "Semua"}
              >
                {regencies2?.nama}
              </li>
            ))}
          </ul>
        </div>
        <Modal isOpen={isModalOpen}>
        <div className="text-sm text-secondary text-center font-bold mb-4">
          Silakan pilih Kab/Kota pada Wilayah 2 karena tidak memungkinkan perbandingan antara Provinsi dan Kab/Kota
        </div>
        <div className="flex flex-row justify-between items-center xl:gap-[20px]">
        <div className="relative xl:w-[300px] lg:w-[200px] md:w-[200px] w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
          <div
            onClick={() => {
              setOpenProvinsi2Modal(!openProvinsi2Modal);
              if (openCity2Modal) {
                setOpenCity2Modal(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selected2
              ? selected2?.length > 20
                ? selected2?.substring(0, 20) + "..."
                : selected2
              : "Provinsi"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${
                openProvinsi2Modal && "rotate-180"
              }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
              ${openProvinsi2Modal ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValue2}
              onChange={(e) => setInputValue2(e.target.value.toLowerCase())}
              placeholder="Cari Provinsi"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>
          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                  ${openProvinsi2Modal ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {provincess2?.map((provinces2) => (
              <li
                key={provinces2?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${
                      provinces2?.nama?.toLowerCase() ===
                        selected2?.toLowerCase() && "bg-secondary text-white"
                    }
                    ${
                      provinces2?.nama?.toLowerCase().includes(inputValue2)
                        ? "block"
                        : "hidden"
                    }`}
                onClick={() => {
                  updateKota2(provinces2?.nama, selected2, provinces2.id);
                  // setWilayahID2(provinces2.id);
                  setGetInfoProvinsi2(provinces2.id);
                  setSelectedCity2("Semua");
                  sessionStorage.setItem("idprovinsi_berkaca2", provinces2.id);
                  sessionStorage.setItem("idwilayah_berkaca2", provinces2.id);
                  sessionStorage.setItem(
                    "namaprovinsi_berkaca2",
                    provinces2.nama
                  );
                  sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                  sessionStorage.setItem("namakota_berkaca2", "Semua");
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
              setOpenCity2Modal(!openCity2Modal);
              if (openProvinsi2Modal) {
                setOpenProvinsi2Modal(false);
              }
            }}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedCity2
              ? selectedCity2?.length > 20
                ? selectedCity2?.substring(0, 20) + "..."
                : selectedCity2
              : "Kota"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${
                openCity2 && "rotate-180"
              }`}
            />
          </div>
          <div
            className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
              ${openCity2Modal ? "max-h-auto" : "hidden"}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              color="#24445A"
              style={{ opacity: "40%" }}
              className="w-[10px] h-[20px] opacity-75"
            />
            <input
              type="text"
              value={inputValueofCity2}
              onChange={(e) => setInputValueofCity2(e.target.value.toLowerCase())}
              placeholder="Cari Kota/Kabupaten"
              className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
            />
          </div>
          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
                  ${openCity2Modal ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {selectedCity === "Semua" ? (
              <li
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary
                      ${
                        "Semua" === selectedCity2?.toLowerCase() &&
                        "bg-secondary text-white"
                      }
                    `}
                onClick={() => {
                  setSelectedCity2("Semua");
                  wilayah2 = provinsi2;
                  sessionStorage.setItem("namawilayah2", "Semua");
                  //     setInfoDaerah("Semua");
                  setSelectedCity2("Semua");
                  // setWilayahID2(getInfoProvinsi2);
                  setSelectedYears(sessionStorage.getItem("yearss"));
                  setOpenCity2(false);
                  sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                  sessionStorage.setItem(
                    "idkota_berkaca2",
                    sessionStorage.getItem("idprovinsi_berkaca2")
                  );
                  sessionStorage.setItem(
                    "idwilayah_berkaca2",
                    sessionStorage.getItem("idprovinsi_berkaca2")
                  );
                  sessionStorage.setItem("namakota_berkaca2", "Semua");
                }}
              >
                Semua
              </li>
            ) : (
              <li className="p-2 text-[12px] text-gray-400">
                Pilih "Semua" di Daerah 1 untuk mengakses Provinsi
              </li>
            )}
            {cities2?.map((regencies2) => (
              <li
                key={regencies2?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${
                      regencies2?.nama?.toLowerCase() ===
                        selectedCity2?.toLowerCase() &&
                      "bg-secondary text-white"
                    }
                    ${
                      regencies2?.nama
                        ?.toLowerCase()
                        .includes(inputValueofCity2)
                        ? "block"
                        : "hidden"
                    }`}
                onClick={() => {
                  if (
                    regencies2?.nama?.toLowerCase() !==
                    selectedCity2.toLowerCase()
                  ) {
                    wilayah2 = regencies2.id;
                    setSelectedCity2(regencies2?.nama);
                    setOpenCity2Modal(false);
                    setInputValueofCity2("");
                    sessionStorage.setItem(
                      "namawilayah_berkaca2",
                      regencies2.nama
                    );
                    sessionStorage.setItem("idkota_berkaca2", regencies2.id);
                    sessionStorage.setItem("idwilayah_berkaca2", regencies2.id);
                    sessionStorage.setItem(
                      "namakota_berkaca2",
                      regencies2.nama
                    );
                  }
                }}
                style={{
                  color:
                    (selectedCity === "Semua" && regencies2?.nama !== "Semua") || regencies2?.nama === "Semua"
                      ? "gray"
                      : null,
                }}
                disabled={(selectedCity === "Semua" && regencies2?.nama !== "Semua") || regencies2?.nama === "Semua"}
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
              if (selectedCity2.toLowerCase() === "semua") {
                setWilayahID2(getInfoProvinsi2);
              } else {
                const selectedRegency2 = cities2.find(regency => regency.nama.toLowerCase() === selectedCity2.toLowerCase());
                if (selectedRegency2) {
                  setWilayahID2(selectedRegency2.id);
                }
              }
              if (selectedCity2.toLowerCase() === "semua" && selected2) {
                const selectedProvince2 = provincess2.find(province => province.nama.toLowerCase() === selected2.toLowerCase());
                if (selectedProvince2) {
                  setWilayahID2(selectedProvince2.id);
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

      </Modal>
      <Modal2 isOpen2={isModalOpen2}>
        <div className="text-sm text-secondary text-center font-bold mb-4">
          Silakan pilih Kab/Kota pada Wilayah 1 karena tidak memungkinkan perbandingan antara Provinsi dan Kab/Kota
        </div>
        <div className="flex flex-row justify-between items-center xl:gap-[20px]">
          {/* Provinsi */}
          <div className="relative xl:w-[300px] lg:w-[200px] md:w-[200px] w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
          <div
            onClick={() => {
              setOpenProvinsiModal(!openProvinsiModal);
              if (openCityModal) {
                setOpenCityModal(false);
              }
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
              ${openProvinsiModal ? "max-h-auto" : "hidden"}`}
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
                  ${openProvinsiModal ? "max-h-[240px]" : "max-h-[0]"}`}
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
                  // setWilayahID(provinces.id);
                  setGetInfoProvinsi(provinces.id);
                  setSelectedCity("Semua");
                  provinsi = provinces.id;
                  wilayah = provinces.id;
                  sessionStorage.setItem("idprovinsi", provinces.id);
                  sessionStorage.setItem("idwilayah", provinces.id);
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
          {/* Kota */}
          <div className="relative xl:w-[300px] lg:w-[200px] md:w-[200px] w-[150px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
          <div
            onClick={() => {
              setOpenCityModal(!openCityModal);
              if (openProvinsiModal) {
                setOpenProvinsiModal(false);
              }
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
              ${openCityModal ? "max-h-auto" : "hidden"}`}
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
                  ${openCityModal ? "max-h-[240px]" : "max-h-[0]"}`}
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
                sessionStorage.setItem("namawilayah", "Semua");
                sessionStorage.setItem(
                  "idwilayah",
                  sessionStorage.getItem("idprovinsi")
                );
                sessionStorage.setItem(
                  "idkota",
                  sessionStorage.getItem("idprovinsi")
                );
                sessionStorage.setItem("namakota", "Semua");
                setSelectedCity("Semua");
                // setWilayahID(getInfoProvinsi);
                setSelectedYears(sessionStorage.getItem("yearss"));
                setOpenCity(false);
                setSelectedCity2("Semua");
                setWilayahID2(getInfoProvinsi2);
                sessionStorage.setItem("selectedCity2", "Semua"); // Corrected line
                sessionStorage.setItem("infoProvinsi2", getInfoProvinsi2);
                // setSelectedYears(sessionStorage.getItem("yearss"));
                // setOpenCity2(false);
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
                      regencies?.nama
                        ?.toLowerCase()
                        .includes(inputValueofCity)
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
                    // setWilayahID(wilayah);
                    sessionStorage.setItem("namawilayah", regencies.nama);
                    sessionStorage.setItem("idkota", regencies.id);
                    sessionStorage.setItem("idwilayah", regencies.id);
                    sessionStorage.setItem("namakota", regencies.nama);
                  }
                }}
                style={{
                  color:
                    (selectedCity2 === "Semua" && regencies?.nama !== "Semua") || regencies?.nama === "Semua"
                      ? "gray"
                      : null,
                }}
                disabled={(selectedCity2 === "Semua" && regencies?.nama !== "Semua") || regencies?.nama === "Semua"}
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
            if (selectedCity.toLowerCase() === "semua") {
              setWilayahID(getInfoProvinsi);
            } else {
              const selectedRegency = cities.find(regency => regency.nama.toLowerCase() === selectedCity.toLowerCase());
              if (selectedRegency) {
                setWilayahID(selectedRegency.id);
              }
            }
            if (selectedCity.toLowerCase() === "semua" && selected) {
              const selectedProvince = provincess.find(province => province.nama.toLowerCase() === selected.toLowerCase());
              if (selectedProvince) {
                setWilayahID(selectedProvince.id);
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
      </div>
      {/* Penduduk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[400px] gap-y-[10px] mt-[20px]">
        {/* Penduduk Daerah Kiri*/}
        <div className="relative">
          <p className="text-center text-[24px] text-secondary mt-4 hidden md:block">
            Penduduk
          </p>
          <p className="text-center font-bold text-[24px] text-secondary hidden md:block">
            {penduduk} Jiwa
          </p>
        </div>
        {/* Penduduk Daerah Kanan*/}
        <div className="relative">
          <p className="text-center text-[24px] text-secondary mt-4 hidden md:block">
            Penduduk
          </p>
          <p className={`text-center font-bold text-[24px] text-secondary ${!showCards ? "hidden lg:hidden" : "hidden md:block"}`}>
            {penduduk2} Jiwa
          </p>
        </div>
      </div>
      {/* Dropdown untuk tahun */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[80px] gap-y-[10px] mt-[20px] lg:block md:block hidden">
        {/* Button ke timeseries */}
        <div className="relative mt-[-20px] lg:mt-[15px] md:mt-[0px]">
          <NavLink
            to={"/Berkaca-Grafik-Timeseries"}
            className="flex bg-secondary text-white w-[195px] h-[41px] rounded-[10px] border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center cursor-pointer hover:bg-third 
            hover:text-white"
            onClick={(e) => {
              if (
                selectedCity.toLowerCase() !== "semua" &&
                selectedCity2.toLowerCase() === "semua"
              ) {
                Swal.fire({
                  title: "Perhatian!",
                  text: "Silakan pilih Kab/Kota pada Wilayah 2 karena tidak memungkinkan perbandingan antara Provinsi dan Kab/Kota",
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
            <p className="text-secondary text-[14px]"></p>
            Data Semua Tahun
          </NavLink>
        </div>
        {/* Dropdown tahun kanan */}
        <div className="relative mt-4">
          <div
            onClick={() => setOpenYears(!openYears)}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center cursor-pointer text-secondary justify-between rounded-[10px]"
          >
            {selectedYears
              ? selectedYears?.length > 12
                ? selectedYears?.substring(0, 12) + "..."
                : selectedYears
              : "Tahun"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-auto w-[10px] h-[20px] ${
                openYears && "rotate-180"
              }`}
            />
          </div>
          {openYears && (
            <div className="absolute z-10 bg-[#ebebeb] mt-2 rounded-md shadow-lg">
              <div className="flex items-center px-2">
                <FontAwesomeIcon
                  icon={faSearch}
                  color="#24445A"
                  style={{ opacity: "40%", marginRight: "8px" }}
                  className="w-[10px] h-[20px] opacity-75"
                />
                <input
                  type="text"
                  value={inputValueofYears}
                  onChange={(e) =>
                    setInputValueofYears(e.target.value.toLowerCase())
                  }
                  placeholder="Cari Tahun"
                  className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
                />
              </div>
              <ul className="max-h-60 overflow-y-scroll mini-scrollbar">
                {years?.map((tahunn) => (
                  <li
                    key={tahunn?.tahun}
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] ${
                      tahunn?.tahun === selectedYears &&
                      "bg-secondary text-white"
                    } ${
                      tahunn?.tahun?.toLowerCase().includes(inputValueofYears)
                        ? "block"
                        : "hidden"
                    }`}
                    onClick={() => {
                      if (tahunn?.tahun !== selectedYears) {
                        setSelectedYears(tahunn?.tahun);
                        setOpenYears(false);
                        setInputValueofYears("");
                        sessionStorage.setItem("yearss", tahunn?.tahun);
                      }
                    }}
                  >
                    {tahunn?.tahun}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Switch Button */}
      <div class="flex items-center justify-center font-semibold text-secondary mt-[48px] text-[17px] text-[20px] gap-x-[20px] hidden md:flex">
        <p className={activeTab === "persentase" ? "inactive-text" : ""}>
          Nominal
        </p>
        <SwitchBtn selected={activeTab} onSelect={toggleTab} />
        <p className={activeTab === "nominal" ? "inactive-text" : ""}>
          Persentase
        </p>
      </div>

      <div className="relative mt-8">
        <p className="text-center lg:text-[24px] text-[20px] font-bold text-secondary mt-4 lg:block md:block hidden">
          {sessionStorage.getItem("namaFilter1")}
        </p>
        <p className="text-center lg:text-[16px] text-[13px] text-secondary lg:block md:block hidden font-bold">
          &#40;{kapitaset1}&#41;
        </p>
      </div>

      <div className={activeTab === "nominal" ? "" : "hidden"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[80px] gap-y-[10px] mt-[50px] lg:ml-[5px] ml-[40px] ">
          <div className="card-container lg:block md:block hidden">
            {/* Konten Card pertama */}
            <Card
              chartRef={chartRef1}
              legendData={legendData1}
              expand={showAllLegends1}
              onExpand={handleExpandCard1}
              onHide={handleCloseLegends1}
            />
            
          </div>

          {/* Container untuk card kedua */}
          <div className={`card-container lg:block md:block hidden ${showCards ? "" : "lg:hidden md:hidden "}`}>
            {/* Konten Card kedua */}
            <Card
              chartRef={chartRef3}
              legendData={legendData3}
              expand={showAllLegends3}
              onExpand={handleExpandCard3}
              onHide={handleCloseLegends3}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[80px] gap-y-[10px] mt-[5px] lg:ml-[5px] ml-[40px]">
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:block md:block hidden pr-[40px]">
            <br />
            {notes_1 &&
              typeof notes_1 === "object" &&
              Object.values(notes_1).map((note, index) => (
                <div key={index}>
                  {note.length > 50 ? (
                    <>
                      {note.substring(0, 30)}
                      <br />
                      {note.substring(30, 70)}
                      <br />
                      {note.substring(70)}
                    </>
                  ) : (
                    note
                  )}
                </div>
              ))}
          </div>
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:block md:block hidden pr-[40px]">
            <br />
            {notes_1_2 &&
              typeof notes_1_2 === "object" &&
              Object.values(notes_1_2).map((note, index) => (
                <div key={index}>
                  {note.length > 50 ? (
                    <>
                     {note.substring(0, 30)}
                      <br />
                      {note.substring(30, 70)}
                      <br />
                      {note.substring(70)}
                    </>
                  ) : (
                    note
                  )}
                </div>
              ))}
          </div>
        </div>

        
        <div className="mt-[10px] text-center text-[14px] lg:text-[16px]">
          {notes && notes.length > 0 && (
            <p className="mb-[20px]">
              <span className="font-extrabold text-secondary text-secondary  lg:block md:block hidden">Catatan:</span> <br />
              <span className="text-third  lg:block md:block hidden">
                {notes}
              </span>
            </p>
          )}
          <p className="italic text-[#919BA2] lg:block md:block hidden">
            Sumber: {sumber.length === 2 ? sumber.join(" & ") : sumber}
          </p>
        </div>

        <div className="flex lg:gap-[100px] gap-[20px] md:gap-[0px] justify-center">
          <div className="flex lg:mr-[220px] lg:ml-[20px] ml-[20px] mr-[95px] lg:block md:block hidden">
            <button onClick={previous}>
              <img
                src={arrowl}
                alt="Gambar Kiri"
                className="w-5 h-5 lg:w-8 lg:h-8 mt-[23%] lg:mr-[65px] block lg:block md:block"
              />
            </button>
          </div>
          <div className="relative mt-8">
            <p className="text-center lg:text-[24px] text-[20px] lg:mt-[0px] font-bold text-secondary mt-[-10px] lg:mb-[0px] lg:block md:block hidden">
              {sessionStorage.getItem("namaFilter2")}
            </p>
            <p className="text-center lg:text-[16px] lg:mb-[0px] mb-[10px] lg:mt-[0px] text-[13px] text-secondary lg:block md:block hidden font-bold">
            &#40;{kapitaset2}&#41;
            </p>
          </div>
          <div className="flex lg:ml-[250px] ml-[85px] mr-[10px] lg:block md:block hidden">
            <button onClick={next}>
              <img
                src={arrowr}
                alt="Gambar Kanan"
                className="w-5 h-5 lg:w-8 lg:h-8 mt-[20%] lg:ml-[65px] block lg:block md:block"
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[80px] gap-y-[10px] lg:mt-[50px] mt-[20px] lg:ml-[5px] ml-[40px]">
          <div className="card-container lg:block md:block hidden">
            {/* Konten Card pertama */}
            <Card
              chartRef={chartRef2}
              
              // note="Catatan: Data Kendaraan dan BBNKB tidak tersedia dalam skala kabupaten/kota"
              legendData={legendData2}
              expand={showAllLegends2}
              onExpand={handleExpandCard2}
              onHide={handleCloseLegends2}
            />
          </div>

          {/* Container untuk card kedua */}
          <div className={`card-container lg:block md:block hidden ${showCards ? "" : "lg:hidden md:hidden"}`}>
            {/* Konten Card kedua */}
            <Card
              chartRef={chartRef4}
              
              // note="Catatan: Data Kendaraan dan BBNKB tidak tersedia dalam skala kabupaten/kota"
              legendData={legendData4}
              expand={showAllLegends4}
              onExpand={handleExpandCard4}
              onHide={handleCloseLegends4}
            />
           
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[80px] gap-y-[10px] mt-[5px] lg:ml-[5px] ml-[40px]">
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:block md:block hidden pr-[40px]">
            <br />
            {notes_2_2 &&
              typeof notes_2_2 === "object" &&
              Object.values(notes_2_2).map((note, index) => (
                <div key={index}>
                  {note.length > 50 ? (
                    <>
                      {note.substring(0, 30)}
                      <br />
                      {note.substring(30, 70)}
                      <br />
                      {note.substring(70)}
                    </>
                  ) : (
                    note
                  )}
                </div>
              ))}
          </div>
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:block md:block hidden pr-[40px]">
            <br />
            {notes_2_2 &&
              typeof notes_2_2 === "object" &&
              Object.values(notes_2_2).map((note, index) => (
                <div key={index}>
                  {note.length > 50 ? (
                    <>
                     {note.substring(0, 30)}
                      <br />
                      {note.substring(30, 70)}
                      <br />
                      {note.substring(70)}
                    </>
                  ) : (
                    note
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className={activeTab === "persentase" ? "" : "hidden"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[80px] gap-y-[10px] mt-[50px] lg:ml-[5px] ml-[40px] ">
          <div className="card-container lg:block md:block hidden">
            {/* Konten Card pertama */}
            <Card
              chartRef={chartRef1Persentase}
              // note="Catatan: Data Kendaraan dan BBNKB tidak tersedia dalam skala kabupaten/kota"
              legendData={legendData1Persentase}
              expand={showAllLegends1Persentase}
              onExpand={handleExpandCard1Persentase}
              onHide={handleCloseLegends1Persentase}
            />
          </div>

          {/* Container untuk card kedua */}
          <div className={`card-container lg:block md:block hidden ${showCards ? "" : "lg:hidden md:hidden"}`}>
            {/* Konten Card kedua */}
            <Card
              chartRef={chartRef3Persentase}
              // note="Catatan: Data Kendaraan dan BBNKB tidak tersedia dalam skala kabupaten/kota"
              legendData={legendData3Persentase}
              expand={showAllLegends3Persentase}
              onExpand={handleExpandCard3Persentase}
              onHide={handleCloseLegends3Persentase}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[80px] gap-y-[10px] mt-[5px] lg:ml-[5px] ml-[40px] ">
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:block  md:block hidden pr-[40px]">
              <br></br>
            {notes_1 &&
              typeof notes_1 === "object" &&
              Object.values(notes_1).map((note, index) => (
                <div key={index}>- {note}</div>
              ))}
          </div>
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:block  md:block hidden pr-[40px]">
              <br></br>
             {notes_1_2 &&
              typeof notes_1_2 === "object" &&
              Object.values(notes_1_2).map((note, index) => (
                <div key={index}>- {note}</div>
              ))}
          </div>
        </div>
        <div className="mt-[10px] text-center text-[14px] lg:text-[16px]">
          <p className="mb-[20px] mt-[30px] text-third hidden md:block ">
            {" "}
            {notes}
          </p>
          <p className="italic text-[#919BA2] lg:block md:block hidden">
            Sumber: {sumber.length === 2 ? sumber.join(" & ") : sumber}
          </p>
        </div>

        <div className="flex lg:gap-[100px] gap-[20px] md:gap-[0px] justify-center">
          <div className="flex lg:mr-[220px] lg:ml-[20px] ml-[20px] mr-[95px] lg:block md:block hidden">
            <button onClick={previous}>
              <img
                src={arrowl}
                alt="Gambar Kiri"
                className="w-5 h-5 lg:w-8 lg:h-8 mt-[23%] lg:mr-[65px] block lg:block md:block"
              />
            </button>
          </div>
          <div className="relative mt-8">
            <p className="text-center lg:text-[24px] text-[20px] lg:mt-[0px] font-bold text-secondary mt-[-10px] lg:mb-[0px] lg:block md:block hidden">
              {sessionStorage.getItem("namaFilter2")}
            </p>
            <p className="text-center lg:text-[16px] lg:mb-[0px] mb-[10px] lg:mt-[0px] text-[13px] text-secondary lg:block md:block hidden font-bold">
            &#40;{kapitaset2}&#41;
            </p>
          </div>
          <div className="flex lg:ml-[250px] ml-[85px] mr-[10px] lg:block md:block hidden">
            <button onClick={next}>
              <img
                src={arrowr}
                alt="Gambar Kanan"
                className="w-5 h-5 lg:w-8 lg:h-8 mt-[20%] lg:ml-[65px] block lg:block md:block"
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[80px] gap-y-[10px] mt-[50px] lg:ml-[5px] ml-[40px] ">
          <div className="card-container lg:block md:block hidden">
            {/* Konten Card pertama */}
            <Card
              chartRef={chartRef2Persentase}
              // note="Catatan: Data Kendaraan dan BBNKB tidak tersedia dalam skala kabupaten/kota"
              legendData={legendData2Persentase}
              expand={showAllLegends2Persentase}
              onExpand={handleExpandCard2Persentase}
              onHide={handleCloseLegends2Persentase}
            />
          </div>

          {/* Container untuk card kedua */}
          <div className={`card-container lg:block md:block hidden ${showCards ? "" : "lg:hidden md:hidden"}`}>
            {/* Konten Card kedua */}
            <Card
              chartRef={chartRef4Persentase}
              // note="Catatan: Data Kendaraan dan BBNKB tidak tersedia dalam skala kabupaten/kota"
              legendData={legendData4Persentase}
              expand={showAllLegends4Persentase}
              onExpand={handleExpandCard4Persentase}
              onHide={handleCloseLegends4Persentase}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[80px] gap-y-[10px] mt-[5px] lg:ml-[5px] ml-[40px] ">
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:block  md:block hidden pr-[40px]">
              <br></br>
            {notes_2_2 &&
              typeof notes_2_2 === "object" &&
              Object.values(notes_2_2).map((note, index) => (
                <div key={index}>- {note}</div>
              ))}
          </div>
          <div className="justify-center text-center text-[14px] font-medium text-[#86BBD8] lg:block  md:block hidden pr-[40px]">
              <br></br>
            {notes_2_2 &&
              typeof notes_2_2 === "object" &&
              Object.values(notes_2_2).map((note, index) => (
                <div key={index}>- {note}</div>
              ))}
          </div>
        </div>
      </div>

      

      <div className="mt-[10px] text-center">
      {notes2 && notes2.length > 0 && (
            <p className="mb-[20px]">
              <span className="font-extrabold text-secondary text-secondary  lg:block md:block hidden">Catatan:</span> <br />
              <span className="text-third  lg:block md:block hidden">
                {notes2}
              </span>
            </p>
          )}
        <p className="italic text-[#919BA2] lg:block md:block hidden">
          Sumber: {sumber2}
        </p>
      </div>

      <div className="flex w-full h-[50px] items-center justify-center gap-[10px] md:gap-[20px] text-secondary italic mb-[10px] mt-[10px]">
        <div className="flex items-center gap-[10px]">
          <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-md bg-primary drop-shadow-lg flex justify-center items-center ">
            <FontAwesomeIcon icon={faEye} color="#24445A" className="" />
          </div>
          <p className="text-[12px] md:text-[16px]">
            {view_info_halaman_chart} Lihat
          </p>
        </div>
        {/* <div className="flex items-center gap-[10px]">
          <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-md bg-primary drop-shadow-lg flex justify-center items-center hover:bg-third cursor-pointer">
            <FontAwesomeIcon icon={faBookBookmark} color="#24445A" />
          </div>
          <p className="text-[12px] md:text-[16px]">
            {simpan_info_halaman_chart} Simpan
          </p>
        </div> */}
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
                  `/download-pdf?halaman=${halaman_chart}&id_member=${sessionStorage.getItem(
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
          onClick={() => shareBtn(halaman_chart)}
        >
          <FontAwesomeIcon icon={faShare} color="#24445A" />
        </div>
        <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-md bg-primary drop-shadow-lg flex justify-center items-center opacity-60">
          <FontAwesomeIcon icon={faSearchLocation} color="#24445A" />
        </div>
      </div>
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

export default BerkacaGraph;
