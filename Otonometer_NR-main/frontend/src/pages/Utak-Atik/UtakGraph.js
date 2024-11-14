import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bulat from "../../assets/bulat.svg";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import back from "../../assets/back.svg";
import "../../style/Switchbtn.css";
import "../../style/Components.css";
import arrowl from "../../assets/icons/arrowl.png";
import arrowr from "../../assets/icons/arrowr.png";
import Cookies from "js-cookie";
import {
  faBookBookmark,
  faChevronDown,
  faDownload,
  faEye,
  faSearch,
  faSearchLocation,
  faShare,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import Swal from "sweetalert2";
import { text } from "@fortawesome/fontawesome-svg-core";
import { timers } from "jquery";
import { func } from "prop-types";
import axios from "axios";

// Komponen card baru
const Card = ({ chartRef, note, legendData }) => {
  const [expand, setExpand] = useState(false);
  const maxLegendsToShow = 2;

  const toggleExpand = () => {
    setExpand(!expand);
  };
  let noteItems = [];

  if (typeof note === "object" && note !== null) {
    noteItems = Object.values(note);
  }

  return (
    <div className="flex flex-col bg-white sm:w-[280px] w-[300px] xl:w-[500px] lg:w-[400px] h-[auto] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg cursor-pointer">
      <div className="flex flex-col items-center justify-center lg:h-full md:h-full mt-[30px]">
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
          <div className="flex justify-center text-center items-center mt-[10px] ml-[100px] xl:ml-[185px] lg:ml-[130px] sm:ml-[70px]">
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

const UtakGraph = () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const tokenUser = sessionStorage.getItem("token");
  const [userAge, setUserAge] = useState(null);
  const [userGender, setUserGender] = useState(null);
  useEffect(() => {
    if (tokenUser !== null) {
      axios.get(`${process.env.REACT_APP_URL_API}/profile`, {
        headers: {
          'Authorization': `Bearer ${tokenUser}`
        }
      })
      .then((response) => {
        const data_profile = response.data.data;
        setUserAge(data_profile.tanggal_lahir)
        setUserGender(data_profile.title)
        
      })
      .catch((error) => {
      });
    }
  }, [tokenUser]);
  useEffect(() => {
    if (
      sessionStorage.getItem("token") == null ||
      sessionStorage.getItem("token") == ""
    ) {
      return (window.location.href = "/");
    }
  }, [sessionStorage.getItem("token")]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (window.location.hash === "#scroll") {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 908;
  const marginBottom = isMobile ? 5 : 0;
  const marginTop = isMobile ? 0 : 0;
  const fontSize = isMobile ? 10 : 11;

  ///FETCHING DROPDOWN PROVINSI
  const [provincess, setProvinces] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(
    sessionStorage.getItem("namaprovinsi")
  );
  const [openProvinsi, setOpenProvinsi] = useState(false);
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
      fetch(
        process.env.REACT_APP_URL_API +
          "/cities?province_id=" +
          sessionStorage.getItem("idprovinsi")
      )
        .then((response) => response.json())
        .then((data) => {
          setCity(data.data);
        });
    }
  }, [sessionStorage.getItem("idprovinsi")]);

  ///VARIABLE DROPDOWN TAHUN
  const [years, setYears] = useState([]);
  const [inputValueofYears, setInputValueofYears] = useState("");

  const [selectedYears, setSelectedYears] = useState("");
  const [openYears, setOpenYears] = useState(false);

  const [openYearsTS, setOpenYearsTS] = useState(false);
  const [yearsTS, setYearsTS] = useState("");
  const [selectedYearsTS, setSelectedYearsTS] = useState("");

  const [openYearsTS2, setOpenYearsTS2] = useState(false);
  const [yearsTS2, setYearsTS2] = useState("");
  const [selectedYearsTS2, setSelectedYearsTS2] = useState("");

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
  // Card Persentase
  const [nilaipie1persentase, setNilaiPie1Persentase] = useState([]);
  const [labelpie1persentase, setLabelPie1Persentase] = useState([]);
  const [nilaipie2persentase, setNilaiPie2Persentase] = useState([]);
  const [labelpie2persentase, setLabelPie2Persentase] = useState([]);
  // TIMESERIES D1
  const [nilaiTimeseries1, setNilaiTimeseries1] = useState([]);
  const [labelTimeseries1, setLabelTimeseries1] = useState([]);
  // TIMESERIES D2
  const [nilaiTimeseries2, setNilaiTimeseries2] = useState([]);
  const [labelTimeseries2, setLabelTimeseries2] = useState([]);
  // CHART TIMESERIES
  const chartReftimeSeriesnya1 = useRef(null);
  const chartReftimeSeriesnya2 = useRef(null);
  // Chart Nominal
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  // Chart Persentase
  const chartRef1Persentase = useRef(null);
  const chartRef2Persentase = useRef(null);
  // Lainnya
  const [kapitaset1, setKapitaset1] = useState(null);
  const [kapitaset2, setKapitaset2] = useState(null);
  const [penduduk, setPenduduk] = useState("");
  const [sumber, setSumber] = useState("");
  // const [sumber2, setSumber2] = useState("");
  const [notes, setNotes] = useState("");
  const [notes_1, setNotes1] = useState("");
  const [notes_2, setNotes2] = useState("");
  const [notest_1, setNotest1] = useState("");
  const [notest_2, setNotest2] = useState("");
  // Chart Nominal
  const [showAllLegends1, setShowAllLegends1] = useState(false);
  const [showAllLegends2, setShowAllLegends2] = useState(false);
  const [legendData1, setLegendData1] = useState([]);
  const [legendData2, setLegendData2] = useState([]);
  // TIMESERIES
  const [showAllLegendsTS1, setShowAllLegendsTS1] = useState(false);
  const [showAllLegendsTS2, setShowAllLegendsTS2] = useState(false);
  const [legendDataTS1, setLegendDataTS1] = useState([]);
  const [legendDataTS2, setLegendDataTS2] = useState([]);
  // Chart Persentase
  const [showAllLegends1Persentase, setShowAllLegends1Persentase] =
    useState(false);
  const [showAllLegends2Persentase, setShowAllLegends2Persentase] =
    useState(false);
  const [legendData1Persentase, setLegendData1Persentase] = useState([]);
  const [legendData2Persentase, setLegendData2Persentase] = useState([]);
  const [namaparent, setNamaParent] = useState(
    sessionStorage.getItem("namaParent")
  );

  const splitTextIntoChunks = (text, chunkSize) => {
    const chunks = [];
    let startIndex = 0;

    while (startIndex < text.length) {
      let endIndex = startIndex + chunkSize;
      if (endIndex < text.length) {
        const lastSpaceIndex = text.lastIndexOf(" ", endIndex);
        if (lastSpaceIndex > startIndex) {
          endIndex = lastSpaceIndex;
        }
      }
      chunks.push(text.substring(startIndex, endIndex).trim());
      startIndex = endIndex;
    }

    return chunks;
  };

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

  // TIMESERIES
  const handleExpandCardTS1 = () => {
    setShowAllLegendsTS1(!showAllLegendsTS1);
  };
  const handleExpandCardTS2 = () => {
    setShowAllLegendsTS2(!showAllLegendsTS2);
  };
  const handleCloseLegendsTS1 = () => {
    setShowAllLegendsTS1(false);
  };
  const handleCloseLegendsTS2 = () => {
    setShowAllLegendsTS2(false);
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

  //variabel info timeseries
  const [halaman_timeseries, setHalaman_timeseries] = useState("");
  const [view_info_halaman_timeseries, setView_info_halaman_timeseries] =
    useState(0);
  const [like_info_halaman_timeseries, setLike_info_halaman_timeseries] =
    useState(0);
  const [simpan_info_halaman_timeseries, setSimpan_info_halaman_timeseries] =
    useState(0);

  //variabel info chart
  const [halaman_chart, setHalaman_chart] = useState("");
  const [view_info_halaman_chart, setView_info_halaman_chart] = useState(0);
  const [like_info_halaman_chart, setLike_info_halaman_chart] = useState(0);
  const [simpan_info_halaman_chart, setSimpan_info_halaman_chart] = useState(0);
  const [isCountIncremented, setIsCountIncremented] = useState(false);
  const [isCountIncrementedTS, setIsCountIncrementedTS] = useState(false);
  const [processedPages, setProcessedPages] = useState({});
  const [processedPagesTS, setProcessedPagesTS] = useState({});

  const incrementCount = (kodeHalaman) => {
    setSimpan_info_halaman_chart((prev) => prev + 1);
    setProcessedPages((prev) => ({
      ...prev,
      [kodeHalaman]: true,
    }));
  };

  const incrementCountTS = (kodeHalaman) => {
    setSimpan_info_halaman_timeseries((prev) => prev + 1);
    setProcessedPagesTS((prev) => ({
      ...prev,
      [kodeHalaman]: true,
    }));
  };

  const [activeTab, setActiveTab] = useState("nominal");

  const toggleTab = () => {
    setActiveTab(activeTab === "nominal" ? "persentase" : "nominal");
  };

  var timerTS;

  const selectedData = JSON.parse(sessionStorage.getItem("selectedData"));
  const {
    parent_id_1,
    dataset_1,
    parent_id_2,
    dataset_2,
    LabelnyaTimeseries_1,
    LabelnyaTimeseries_2,
  } = selectedData;

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

  useEffect(() => {
    if (
      dataset_1.length !== 0 &&
      dataset_2.length !== 0 &&
      wilayahID !== null
    ) {
      var urls =
        process.env.REACT_APP_URL_API +
        "/utak-atik?tahun=semua&wilayah=" +
        wilayahID;
      if (typeof dataset_1 !== "string") {
        urls +=
          "&parent_id_1=" + parent_id_1 + "&dataset_1=[" + dataset_1 + "]";
      } else {
        urls += "&parent_id_1=" + parent_id_1 + "&dataset_1=" + dataset_1;
      }
      if (typeof dataset_2 !== "string") {
        urls +=
          "&parent_id_2=" + parent_id_2 + "&dataset_2=[" + dataset_2 + "]";
      } else {
        urls += "&parent_id_2=" + parent_id_2 + "&dataset_2=" + dataset_2;
      }
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
            return parseFloat(str.replace(/\./g, ""));
          };

          Object.keys(data.data.dataset_1).forEach((item) => {
            data.data.dataset_1[item].forEach((list) => {
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
            });
          });

          Object.keys(tahun).forEach((item) => {
            if (item >= minimumTahun && item <= maksimumTahun) {
              datasheet1.push(tahun[item]);
            }
          });

          Object.keys(data.data.dataset_2).forEach((item) => {
            data.data.dataset_2[item].forEach((list) => {
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
            });
          });

          Object.keys(tahun2).forEach((item) => {
            if (item >= minimumTahun2 && item <= maksimumTahun2) {
              datasheet2.push(tahun2[item]);
            }
          });

          if (datasheet1.length && datasheet2.length > 0) {
            setDataChart(datasheet1);
            setDataChart2(datasheet2);
            setSumbernya(data.sumber);
            setNotest1(data.notes_1);
            setNotest2(data.notes_2);
          }
          clearTimeout(timerTS);
          timerTS = setTimeout(function () {
            kategoriRecordTS();
            timerTS = null;
          }, 7000);
        });
    } else {
      return null;
    }
  }, [wilayahID]);

  useEffect(() => {
    if (
      dataset_1.length !== 0 &&
      dataset_2.length !== 0 &&
      wilayahID !== null
    ) {
      var urls =
        process.env.REACT_APP_URL_API +
        "/utak-atik?tahun=semua&wilayah=" +
        wilayahID;
      if (typeof dataset_1 !== "string") {
        urls +=
          "&parent_id_1=" + parent_id_1 + "&dataset_1=[" + dataset_1 + "]";
      } else {
        urls += "&parent_id_1=" + parent_id_1 + "&dataset_1=" + dataset_1;
      }
      if (typeof dataset_2 !== "string") {
        urls +=
          "&parent_id_2=" + parent_id_2 + "&dataset_2=[" + dataset_2 + "]";
      } else {
        urls += "&parent_id_2=" + parent_id_2 + "&dataset_2=" + dataset_2;
      }
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
            return parseFloat(str.replace(/\./g, ""));
          };

          Object.keys(data.data.dataset_1).forEach((item) => {
            data.data.dataset_1[item].forEach((list) => {
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
            });
          });

          Object.keys(tahun).forEach((item) => {
            if (item >= minimumTahun && item <= maksimumTahun) {
              datasheet1.push(tahun[item]);
            }
          });

          Object.keys(data.data.dataset_2).forEach((item) => {
            data.data.dataset_2[item].forEach((list) => {
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
            });
          });

          Object.keys(tahun2).forEach((item) => {
            if (item >= minimumTahun2 && item <= maksimumTahun2) {
              datasheet2.push(tahun2[item]);
            }
          });

          if (datasheet1.length && datasheet2.length > 0) {
            setDataChart(datasheet1);
            setDataChart2(datasheet2);
            setSumbernya(data.sumber);
            setNotest1(data.notes_1);
            setNotest2(data.notes_2);
          }
        });
    } else {
      return null;
    }
  }, [yearsTS, yearsTS2]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p className="label">{`${label}`}</p>
          <ul>
            {payload.map((entry, index) => (
              <li key={`item-${index}`} style={{ color: entry.color }}>
                {`${entry.name}: ${Math.round(entry.value)
                  .toLocaleString()
                  .replace(/,/g, ".")}`}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  function Timeseries2() {
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

    return (
      <section>
        <div className="grid flex grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-4 sm:gap-y-4 md:gap-x-8 md:gap-y-8 xl:gap-x-8 xl:gap-y-8 lg:gap-x-8 lg:gap-y-8 mt-8 lg:mt-16 mt-[50px]">
          <div className="flex flex-col bg-white w-[auto] xl:w-[650px] lg:w-[460px] md:w-[350px] sm:w-[400px] lg:ml-[0px] md:ml-[0px] xl:ml-[0px] sm:ml-[30px] ml-[0px] h-[auto] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg mb-[20px]">
            <div className="flex flex-col items-center justify-center lg:h-full lg:mt-[10px] md:mt-[20px] mt-[20px]">
              <div className="w-[380px] xl:w-[600px] lg:w-[400px] md:w-[340px] sm:w-[400px] h-auto lg:mt-[20px] mx-4 lg:mx-[20px] overflow-x-scroll mini-scrollbar">
                {dataChart && dataChart.length > 0 && (
                  <LineChart
                    data={dataChart}
                    width={lebarnyaGrafik}
                    height={isMobile ? 350 : 450}
                    margin={{ bottom: marginBottom, top: marginTop }}
                  >
                    <XAxis dataKey="label" tick={{ fontSize: fontSize }} />
                    <YAxis tick={{ fontSize: fontSize }} />
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
            <div
              className={`grid ${
                LabelnyaTimeseries_1.filter((grafiknya) => grafiknya !== null)
                  .length === 1
                  ? "grid-cols-1 gap-x-[0px] max-w-[500px] justify-center items-center lg:mt-[30px]"
                  : LabelnyaTimeseries_1.filter(
                      (grafiknya) => grafiknya !== null
                    ).length === 2
                  ? "grid-cols-2 gap-x-[10px] ml-[30px] mt-[30px]"
                  : LabelnyaTimeseries_1.filter(
                      (grafiknya) => grafiknya !== null
                    ).length > 3
                  ? "grid-cols-2 md:w-[300px] xl:w-[500px] lg:w-[300px] sm:w-[290px] w-[320px] justify-center items-center mt-[30px] gap-x-[6px]"
                  : ""
              }`}
            >
              {LabelnyaTimeseries_1.filter((grafiknya) => grafiknya !== null)
                .slice(
                  null,
                  lihatLegend ? LabelnyaTimeseries_1.length : maksimalTampil
                )
                .map((grafiknya, index) => (
                  <div className="flex items-center gap-x-2 w-auto" key={index}>
                    <div
                      className="w-[16px] h-[13px] rounded-full"
                      style={{
                        backgroundColor: TSCOLOR[index % TSCOLOR.length],
                      }}
                    ></div>
                    <p className="lg:text-[14px] text-[12px] sm:text-[12px] w-full">
                      {grafiknya}
                    </p>
                  </div>
                ))}
              <div className="flex justify-center text-center items-start lg:mt-[10px] md:mt-[10px] mt-[10px] bg-white lg:h-[60px] h-[auto] col-span-3 lg:text-[14px] text-[12px] lg:mb-[0px] mb-[20px]">
                {!lihatLegend &&
                  LabelnyaTimeseries_1.filter((grafiknya) => grafiknya !== null)
                    .length > 3 && (
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
              <div className="flex justify-center text-center items-start lg:mt-[0px] md:mt-[0px] mt-[0px] bg-white lg:h-[60px] h-[auto] col-span-3 lg:text-[14px] text-[12px] lg:mb-[0px] mb-[20px]">
                <button
                  className="text-[#064878] hover:text-[#0B578E] focus:outline-none cursor-pointer"
                  onClick={toggleLihatLengkap}
                >
                  Sembunyikan
                </button>
              </div>
            )}
          </div>
          <div className="justify-center text-center text-[11px] font-medium text-[#86BBD8] lg:hidden md:hidden sm:block xl:hidden ml-[0px] sm:ml-[0px]">
            {/* <br></br> */}
            {notest_1 &&
              typeof notest_1 === "object" &&
              Object.values(notest_1).map((note, index) => (
                <div key={index}>
                  {note.length > 50
                    ? splitTextIntoChunks(note, 50).map((chunk, chunkIndex) => (
                        <span key={chunkIndex}>
                          {chunk}
                          <br />
                        </span>
                      ))
                    : note}
                </div>
              ))}
          </div>
          <div className="text-center flex justify-center md:hidden xl:hidden sm:block">
            <p className="text-center font-extrabold text-[20px] text-[#064878] lg:mt-[0px] lg:hidden xl:hidden block mt-[15px] md:hidden mb-[-15px]">
              {" "}
              {sessionStorage.getItem("namaFilter2")}
            </p>
          </div>
          <div className="text-center flex justify-center md:hidden xl:hidden sm:block italic">
            <p className="text-center text-[14px] lg:hidden block sm:mb-[10px] md:hidden">
              {kapitaset2}
            </p>
          </div>
          <div className="flex flex-col bg-white w-[auto] xl:w-[650px] lg:w-[460px] md:w-[350px] sm:w-[400px] h-[auto] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg mb-[20px] sm:ml-[30px] xl:ml-[0px] lg:ml-[0px] md:ml-[0px]">
            <div className="flex flex-col items-center justify-center lg:h-full lg:mt-[0px] md:mt-[30px] mt-[20px] sm:ml-[0px] lg:ml-[0px] md:ml-[0px]">
              <div className="w-[380px] xl:w-[600px] lg:w-[400px] md:w-[340px] sm:w-[400px] h-auto lg:mt-[20px] mx-4 lg:mx-[20px] overflow-x-scroll mini-scrollbar">
                {dataChart2 && dataChart2.length > 0 && (
                  <LineChart
                    data={dataChart2}
                    width={lebarnyaGrafik}
                    height={isMobile ? 350 : 450}
                    margin={{ bottom: marginBottom, top: marginTop }}
                  >
                    <XAxis dataKey="label" tick={{ fontSize: fontSize }} />
                    <YAxis tick={{ fontSize: fontSize }} />
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
              className={`grid ${
                LabelnyaTimeseries_2.filter((grafiknya) => grafiknya !== null)
                  .length === 1
                  ? "grid-cols-1 gap-x-[0px] max-w-[500px] justify-center items-center lg:mt-[30px] md:mt-[28px] mt-[20px]"
                  : LabelnyaTimeseries_2.filter(
                      (grafiknya) => grafiknya !== null
                    ).length === 2
                  ? "grid-cols-2 gap-x-[10px] ml-[30px] mt-[30px]"
                  : LabelnyaTimeseries_2.filter(
                      (grafiknya) => grafiknya !== null
                    ).length > 3
                  ? "grid-cols-2 md:w-[300px] xl:w-[500px] lg:w-[300px] sm:w-[290px] w-[320px] justify-center items-center mt-[30px] gap-x-[6px]"
                  : ""
              }`}
            >
              {LabelnyaTimeseries_2.filter((grafiknya) => grafiknya !== null)
                .slice(
                  null,
                  lihatLegend2 ? LabelnyaTimeseries_2.length : maksimalTampil
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
              <div className="flex justify-center text-center items-start lg:mt-[10px] md:mt-[10px] mt-[10px] bg-white lg:h-[60px] h-[auto] col-span-3 lg:text-[14px] text-[12px] lg:mb-[0px] md:mb-[20px] mb-[20px]">
                {!lihatLegend2 &&
                  LabelnyaTimeseries_2.filter((grafiknya) => grafiknya !== null)
                    .length > 3 && (
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
              <div className="flex justify-center text-center items-center lg:mt-[0px] md:mt-[0px] mt-[0px] mb-[20px] lg:text-[14px] text-[12px]">
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
        {/* <div className="text-center lg:mb-[10px] lg:mt-[30px] md:text-[12px] lg:text-[16px] font-medium text-[#24445A] lg:block hidden md:block lg:mr-[670px] md:mr-[380px]">
          <br></br>
          {notest_1 &&
            typeof notest_1 === "object" &&
            Object.values(notest_1).map((note, index) => (
              <div key={index}>- {note}</div>
            ))}
        </div>
        <div className="text-center lg:mb-[10px] lg:mt-[-154px] md:mt-[-110px] md:text-[12px] lg:text-[16px] text-[#24445A] font-medium lg:block hidden md:block md:ml-[400px] lg:ml-[690px]">
          <br></br>
          {notest_2 &&
            typeof notest_2 === "object" &&
            Object.values(notest_2).map((note, index) => (
              <div key={index}>- {note}</div>
            ))}
        </div> */}

        <div className="justify-center text-center text-[11px] font-medium text-[#86BBD8] lg:hidden md:hidden sm:block xl:hidden ml-[0px] sm:ml-[0px]">
          <br></br>
          {notest_2 &&
            typeof notest_2 === "object" &&
            Object.values(notest_2).map((note, index) => (
              <div key={index}>
                {note.length > 50
                  ? splitTextIntoChunks(note, 50).map((chunk, chunkIndex) => (
                      <span key={chunkIndex}>
                        {chunk}
                        <br />
                      </span>
                    ))
                  : note}
              </div>
            ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-x-[1px] gap-y-[1px] mt-[5px] xl:ml-[50px] lg:ml-[60px] md:ml-[40px]">
          <div
            className={`justify-center text-center xl:text-[14px] lg:text-[14px] md:text-[12px] sm:text-[12px] font-medium text-[#86BBD8] pr-[40px] hidden md:block ${
              !notest_2 ? "md:col-span-2" : ""
            }`}
          >
            <br />
            {notest_1 &&
              typeof notest_1 === "object" &&
              Object.values(notest_1).map((note, index) => (
                <div
                  key={index}
                  className="hidden xl:block lg:block md:block xl:w-[500px] lg:w-[400px]"
                >
                  {note.length > 50
                    ? splitTextIntoChunks(note, 50).map((chunk, chunkIndex) => (
                        <span key={chunkIndex}>
                          {chunk}
                          <br />
                        </span>
                      ))
                    : note}
                </div>
              ))}
          </div>
          {notest_2 && (
            <div className="justify-center text-center xl:text-[14px] lg:text-[14px] md:text-[12px] font-medium text-[#86BBD8] pr-[40px] hidden md:block">
              <br />
              {typeof notest_2 === "object" &&
                Object.values(notest_2).map((note, index) => (
                  <div
                    key={index}
                    className="hidden xl:block lg:block md:block xl:w-[500px] lg:w-[400px]"
                  >
                    {note.length > 50
                      ? splitTextIntoChunks(note, 50).map(
                          (chunk, chunkIndex) => (
                            <span key={chunkIndex}>
                              {chunk}
                              <br />
                            </span>
                          )
                        )
                      : note}
                  </div>
                ))}
            </div>
          )}
        </div>

        <br className="hidden xl:block lg:block md:block"></br>

        {/* Lihat */}
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
                if (akunPrem === "N") {
                  togglePopupSimpanTS();
                } else {
                  SimpanHalamanSemuaTS(halaman_timeseries);
                }
              }}
            >
              <FontAwesomeIcon icon={faBookBookmark} color="#24445A" />
            </div>
            <p className="text-[12px] md:text-[16px]">
              {simpan_info_halaman_timeseries} Simpan
            </p>
          </div>

          {showPopupSimpanTS && (
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
                      SimpanHalamanSemuaTS(halaman_timeseries);
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
                        SimpanHalamanKoleksiTS(
                          halaman_timeseries,
                          collectionUser.id
                        );
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
                    onClick={togglePopupKoleksiTS}
                  >
                    Tambah Koleksi
                  </button>
                  <button
                    className="button focus:outline-none focus:shadow-outline w-full bg-[#CD3838] hover:bg-[#E54747] font-medium mt-[10px]"
                    type="button"
                    onClick={togglePopupSimpanTS}
                  >
                    Batalkan
                  </button>
                </div>
              </div>
            </div>
          )}

          {showPopupKoleksiTS && (
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
                    onClick={addNewCollectionTS}
                  >
                    Simpan
                  </button>
                  <button
                    className="button focus:outline-none focus:shadow-outline w-full bg-[#CD3838] hover:bg-[#E54747] font-medium mt-[10px]"
                    type="button"
                    onClick={togglePopupKoleksiTS}
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

        <div className="text-center mt-[20px] text-[12px] lg:text-[16px] xl:text-[16px] md:text-[16px] sm:text-[14px] italic text-[#919BA2]">
          {notes && notes.length > 0 && (
            <p className="mb-[20px]">
              <span className="font-extrabold text-secondary text-secondary">
                Catatan:
              </span>{" "}
              <br />
              <span className="text-third">{notes}</span>
            </p>
          )}
          <span>Sumber: </span> <br></br>
          {/* {sumbernya.length === 2 ? sumbernya.join(" & ") : sumbernya} */}
          {sumbernyaText}
        </div>
      </section>
    );
  }

  var timer;

  function Charts() {
    var urls =
      process.env.REACT_APP_URL_API +
      "/utak-atik?tahun=" +
      selectedYears +
      "&wilayah=" +
      wilayahID;
    if (typeof dataset_1 !== "string") {
      urls += "&parent_id_1=" + parent_id_1 + "&dataset_1=[" + dataset_1 + "]";
    } else {
      urls += "&parent_id_1=" + parent_id_1 + "&dataset_1=" + dataset_1;
    }
    if (typeof dataset_2 !== "string") {
      urls += "&parent_id_2=" + parent_id_2 + "&dataset_2=[" + dataset_2 + "]";
    } else {
      urls += "&parent_id_2=" + parent_id_2 + "&dataset_2=" + dataset_2;
    }
    urls += "&record=false";
    fetch(urls)
      .then((response) => response.json())
      .then((result) => {
        setHalaman_chart(result?.info?.kode);
        setView_info_halaman_chart(result?.info?.view);
        setSimpan_info_halaman_chart(result?.info?.simpan);
        setNamaParent(result?.judul);
        setKapitaset1(result?.satuan?.dataset_1);
        setKapitaset2(result?.satuan?.dataset_2);
        setPenduduk(result?.jumlah_penduduk);
        setSumber(result?.sumber);
        setNotes(result?.notes?.[0]);
        setNotes1(result?.notes_1);
        setNotes2(result?.notes_2);
        if (
          result.data &&
          result.data.nominal &&
          result.data.nominal.dataset_1 &&
          result.data.nominal.dataset_1.length > 0
        ) {
          setNilaiPie1(result.data.nominal.dataset_1);
          setLabelPie1(result.data.nominal.dataset_1);
        }
        if (
          result.data &&
          result.data.nominal &&
          result.data.nominal.dataset_2 &&
          result.data.nominal.dataset_2.length > 0
        ) {
          setNilaiPie2(result.data.nominal.dataset_2);
          setLabelPie2(result.data.nominal.dataset_2);
        }
        if (
          result.data &&
          result.data.percentage &&
          result.data.percentage.dataset_1 &&
          result.data.percentage.dataset_1.length > 0
        ) {
          setNilaiPie1Persentase(result.data.percentage.dataset_1);
          setLabelPie1Persentase(result.data.percentage.dataset_1);
        }
        if (
          result.data &&
          result.data.percentage &&
          result.data.percentage.dataset_2 &&
          result.data.percentage.dataset_2.length > 0
        ) {
          setNilaiPie2Persentase(result.data.percentage.dataset_2);
          setLabelPie2Persentase(result.data.percentage.dataset_2);
        }
        clearTimeout(timer);
        timer = setTimeout(function () {
          kategoriRecord();
          timer = null;
        }, 7000);
      });
  }

  useEffect(() => {
    if (selectedYears && wilayahID && userAge && userGender) {
      Charts();
      DataStatistik();
      clearTimeout(timer);
    }
  }, [selectedYears, wilayahID, activeTab, userAge, userGender]);

  // Chart Nominal
  useEffect(() => {
    if (activeTab === "nominal") {
      const data1 = nilaipie1.map((item) => item.nilai);
      const data2 = nilaipie2.map((item) => item.nilai);

      var totaln1 = 0;
      var totaln2 = 0;
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var result = JSON.parse(this.responseText);
        var totalparent = 0;
        var totalparent2 = 0;
        if (
          result.data &&
          result.data.nominal &&
          result.data.nominal.dataset_1 &&
          result.data.nominal.dataset_1.length > 0
        ) {
          totalparent = result.data.nominal.dataset_1[0].nilai;
        }
        if (
          result.data &&
          result.data.nominal &&
          result.data.nominal.dataset_2 &&
          result.data.nominal.dataset_2.length > 0
        ) {
          totalparent2 = result.data.nominal.dataset_2[0].nilai;
        }
      //   data1.map((item) => {
      //     totalparent -= item;
      //   });
      //   data2.map((item) => {
      //     totalparent2 -= item;
      //   });
      //   totaln1 = totalparent;
      //   totaln2 = totalparent2;
      //   data1.push(totaln1);
      //   data2.push(totaln2);
      // };
      if (selectedYears === "2023") {
        totalparent = 100 - data1.reduce((sum, val) => sum + val, 0);
        totalparent2 = 100 - data2.reduce((sum, val) => sum + val, 0);
      } else {
        data1.forEach((item) => {
          totalparent -= item;
        });
        data2.forEach((item) => {
          totalparent2 -= item;
        });
      }

      totaln1 = totalparent;
      totaln2 = totalparent2;

      if (totaln1 < 0) totaln1 = 0;
      if (totaln2 < 0) totaln2 = 0;

      data1.push(totaln1);
      data2.push(totaln2);
    };
      var params = new URLSearchParams();

      params.append("tahun", selectedYears);
      params.append("wilayah", wilayahID);
      params.append("parent_id_1", parent_id_1);
      params.append("dataset_1", sessionStorage.getItem("all_ds_1"));
      params.append("dataset_2", sessionStorage.getItem("all_ds_2"));
      params.append("parent_id_2", parent_id_2);
      // if (typeof dataset_1 !== "string") {
      //   params.append("dataset_1","[" + dataset_1 + "]");
      // } else {
      //   params.append("dataset_1", dataset_1);
      // }

      // if (typeof dataset_2 !== "string") {
      //   params.append("dataset_2","[" + dataset_2 + "]");
      // } else {
      //   params.append("dataset_2", dataset_2);
      // }

      xhr.open(
        "GET",
        process.env.REACT_APP_URL_API + "/utak-atik?" + params.toString(),
        // "/utak-atik?tahun=" +
        // selectedYears +
        // "&wilayah=" +
        // wilayahID +
        // "&parent_id_1=" +
        // parent_id_1 +
        // "&dataset_1=[" +
        // dataset_1+"]" +
        // "&parent_id_2=" +
        // parent_id_2 +
        // "&dataset_2=[" +
        // dataset_2+"]",
        false
      );
      xhr.send();

      var labels1 = labelpie1.map((item) => {
        const labelSet1 = JSON.parse(sessionStorage.getItem("selectedData"))
          .labelset1[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet1}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({item.label})</span>
        );
        return (
          <span className="text-[12px] lg:text-[14px]">
            {coloredLabelSet} - {coloredItemLabel}
          </span>
        );
      });

      var backgroundColor1 = [
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

      // Draw pie chart for Card 1
      const ctx1 = chartRef1.current.getContext("2d");
      const transformedData1 = labelpie1.map((item) => {
        const labelSet1 = JSON.parse(sessionStorage.getItem("selectedData"))
          .labelset1[item.id_bidang];
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
              borderWidth: 0,
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
                    console.error(
                      `Item at index ${index} is undefined. labelpie1:`,
                      labelpie1
                    );
                    return "";
                  }

                  const labelSet1 = selectedData.labelset1
                    ? selectedData.labelset1[item.id_bidang]
                    : "";
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
        const labelSet2 = JSON.parse(sessionStorage.getItem("selectedData"))
          .labelset2[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet2}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({item.label})</span>
        );
        return (
          <span className="text-[12px] lg:text-[14px]">
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
        const labelSet2 = JSON.parse(sessionStorage.getItem("selectedData"))
          .labelset2[item.id_bidang];
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
              borderWidth: 0,
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
                    console.error(
                      `Item at index ${index} is undefined. labelpie1:`,
                      labelpie2
                    );
                    return "";
                  }

                  const labelSet2 = selectedData.labelset2
                    ? selectedData.labelset2[item.id_bidang]
                    : "";
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
        chart1.destroy();
        chart2.destroy();
      };
    }
  }, [activeTab, nilaipie1, labelpie1, nilaipie2, labelpie2]);

  // Chart Persentase
  useEffect(() => {
    if (activeTab === "persentase") {
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
          totalparentp1 = result.data.percentage.dataset_1[0].nilai;
        }
        if (
          result.data &&
          result.data.percentage &&
          result.data.percentage.dataset_2 &&
          result.data.percentage.dataset_2.length > 0
        ) {
          totalparentp2 = result.data.percentage.dataset_2[0].nilai;
        }
      //   data1persentase.map((item) => {
      //     totalparentp1 -= item;
      //   });
      //   data2persentase.map((item) => {
      //     totalparentp2 -= item;
      //   });
      //   totalp1 = totalparentp1;
      //   totalp2 = totalparentp2;
      //   data1persentase.push(totalp1);
      //   data2persentase.push(totalp2);
      // };
      if (selectedYears === "2023") {
        totalparentp1 = 100 - data1persentase.reduce((sum, val) => sum + val, 0);
        totalparentp2 = 100 - data2persentase.reduce((sum, val) => sum + val, 0);
      } else {
        data1persentase.forEach((item) => {
          totalparentp1 -= item;
        });
        data2persentase.forEach((item) => {
          totalparentp2 -= item;
        });
      }

      totalp1 = totalparentp1;
      totalp2 = totalparentp2;

      if (totalp1 < 0) totalp1 = 0;
      if (totalp2 < 0) totalp2 = 0;

      data1persentase.push(totalp1);
      data2persentase.push(totalp2);
    };
      var params = new URLSearchParams();

      params.append("tahun", selectedYears);
      params.append("wilayah", wilayahID);
      params.append("parent_id_1", parent_id_1);
      params.append("dataset_1", sessionStorage.getItem("all_ds_1"));
      params.append("dataset_2", sessionStorage.getItem("all_ds_2"));
      params.append("parent_id_2", parent_id_2);

      xhr.open(
        "GET",
        process.env.REACT_APP_URL_API + "/utak-atik?" + params.toString(),
        false
      );
      xhr.send();

      const labels1persentase = labelpie1persentase.map((item) => {
        const labelSet1Persentase = JSON.parse(
          sessionStorage.getItem("selectedData")
        ).labelset1[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet1Persentase}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({`${item.label}%`})</span>
        );
        return (
          <span className="text-[12px] lg:text-[14px]">
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
          sessionStorage.getItem("selectedData")
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
              borderWidth: 0,
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
                    console.error(
                      `Item at index ${index} is undefined. labelpie1:`,
                      labelpie1persentase
                    );
                    return "";
                  }

                  const labelSet1Persentase = selectedData.labelset1
                    ? selectedData.labelset1[item.id_bidang]
                    : "";
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
          sessionStorage.getItem("selectedData")
        ).labelset2[item.id_bidang];
        const coloredLabelSet = (
          <span style={{ color: "#24445A" }}>{labelSet2Persentase}</span>
        );
        const coloredItemLabel = (
          <span style={{ color: "#24445A" }}>({`${item.label}%`})</span>
        );
        return (
          <span className="text-[12px] lg:text-[14px]">
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
          sessionStorage.getItem("selectedData")
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
              borderWidth: 0,
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
                    console.error(
                      `Item at index ${index} is undefined. labelpie1:`,
                      labelpie2persentase
                    );
                    return "";
                  }

                  const labelSet2Persentase = selectedData.labelset2
                    ? selectedData.labelset2[item.id_bidang]
                    : "";
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
        chart1persentase.destroy();
        chart2persentase.destroy();
      };
    }
  }, [
    activeTab,
    nilaipie1persentase,
    labelpie1persentase,
    nilaipie2persentase,
    labelpie2persentase,
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

  const [dropdownProvinsi, setDropdownProvinsi] = useState(false);
  const [dropdownKota, setDropdownKota] = useState(false);
  const [dropdownTahunKiri, setDropdownTahunKiri] = useState(false);
  const [dropdownTahunKanan, setDropdownTahunKanan] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Jawa Barat");
  const [selectedKota, setSelectedKota] = useState("Kota Bandung");
  const [selectedYear, setSelectedYear] = useState("");

  const handleDropdownTahunKiri = () => {
    setDropdownTahunKiri(!dropdownTahunKiri);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownProvinsi(false);
  };

  const handleOptionKota = (option) => {
    setSelectedKota(option);
    setDropdownKota(false);
  };

  const handleOptionYear = (year) => {
    setSelectedYear(year);
    setDropdownTahunKiri(false);
    setDropdownTahunKanan(false);
  };
  const handleOptionYears = (year) => {
    setSelectedYears(year);
    setDropdownTahunKiri(false);
    setDropdownTahunKanan(false);
  };

  const renderDropdownYear = () => {
    const years = ["", "2022", "2023", "2024"];

    return years.map((year, index) => (
      <div
        key={index}
        onClick={() => handleOptionYear(year)}
        className="flex w-[167px] h-[41px] rounded-[10px] text-secondary border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg cursor-pointer mr-4"
      >
        <p>{year ? year : "-"}</p>
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
  const [dataChart, setDataChart] = useState([]);
  const [dataChart2, setDataChart2] = useState([]);
  ///TIME SERIES
  const [sumbernya, setSumbernya] = useState("");
  const sumberArray = Array.isArray(sumber) ? sumber : [sumber];
  const sumberText = sumberArray.length === 2 
    ? sumberArray.join(" & ") 
    : sumberArray.join(", ").replace(/, ([^,]*)$/, " & $1");

    const sumbernyaArray = Array.isArray(sumbernya) ? sumbernya : [sumbernya];
    const sumbernyaText = sumbernyaArray.length === 2 
      ? sumbernyaArray.join(" & ") 
      : sumbernyaArray.join(", ").replace(/, ([^,]*)$/, " & $1");
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

  const [showPopupSimpanTS, setShowPopupSimpanTS] = useState(false);
  const [showPopupKoleksiTS, setShowPopupKoleksiTS] = useState(false);

  const [akunPrem, setAkunPrem] = useState("Y");
  const [akunPremTS, setAkunPremTS] = useState("Y");

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

  const togglePopupSimpanTS = () => {
    setShowPopupSimpanTS(!showPopupSimpanTS);
  };

  const [KoleksiUser, setKoleksiUser] = useState([]);
  const togglePopupKoleksi = () => {
    setShowPopupKoleksi(!showPopupKoleksi);
    setShowPopupSimpan(!showPopupSimpan);
  };

  const togglePopupKoleksiTS = () => {
    setShowPopupKoleksiTS(!showPopupKoleksiTS);
    setShowPopupSimpanTS(!showPopupSimpanTS);
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

  const addNewCollectionTS = async (e) => {
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
              togglePopupKoleksiTS();
              togglePopupSimpanTS();
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
    ListKategori();
  }, [tokenUser]);

  function ListKategori() {
    if (tokenUser !== null) {
      const xhr_CollectionUser = new XMLHttpRequest();
      xhr_CollectionUser.onload = function () {
        const data_Koleksi = JSON.parse(xhr_CollectionUser.responseText).data;
        setKoleksiUser(data_Koleksi);
      };
      xhr_CollectionUser.open(
        "GET",
        process.env.REACT_APP_URL_API + "/get-collection",
        false
      );
      xhr_CollectionUser.setRequestHeader("Accept", "application/json");
      xhr_CollectionUser.setRequestHeader(
        "Authorization",
        "Bearer " + tokenUser
      );
      xhr_CollectionUser.send();
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
              // UNTUK PREM
              if (akunPrem == "N") {
                togglePopupSimpan();
              } else {
              }
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Halaman sudah tersimpan.",
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

  const SimpanHalamanSemuaTS = async (halaman) => {
    try {
      var dataSimpan = new URLSearchParams();
      dataSimpan.append("kodeHalaman", halaman);
      var xhr_newSave = new XMLHttpRequest();
      xhr_newSave.onload = function () {
        var response = JSON.parse(this.responseText);
        console.log(response);
        if (response.success === true) {
          if (!processedPagesTS[halaman]) {
            incrementCountTS(halaman);
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
              // UNTUK PREM
              if (akunPrem == "N") {
                togglePopupSimpanTS();
              } else {
              }
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Halaman sudah tersimpan.",
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

  const SimpanHalamanKoleksiTS = async (halaman, idKoleksi) => {
    try {
      var dataSimpan = new URLSearchParams();
      dataSimpan.append("kodeHalaman", halaman);
      dataSimpan.append("koleksi", idKoleksi);
      var xhr_newSave = new XMLHttpRequest();
      xhr_newSave.onload = function () {
        var response = JSON.parse(this.responseText);
        console.log(response);
        if (response.success === true) {
          if (!processedPagesTS[halaman]) {
            incrementCountTS(halaman);
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
              togglePopupSimpanTS();
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
    if (
      showPopupSimpan ||
      showPopupKoleksi ||
      selectedFile ||
      showPopupSimpanTS ||
      showPopupKoleksiTS
    ) {
      document.body.classList.add("lock-scroll");
    } else {
      document.body.classList.remove("lock-scroll");
    }
    return () => {
      document.body.classList.remove("lock-scroll");
    };
  }, [
    showPopupSimpan,
    showPopupKoleksi,
    selectedFile,
    showPopupSimpanTS,
    showPopupKoleksiTS,
  ]);

  function kategoriRecord() {
    var params = new URLSearchParams();
    const myHeaders = new Headers();
    if (sessionStorage.getItem("token") !== null) {
      myHeaders.append(
        "Authorization",
        `Bearer ${sessionStorage.getItem("token")}`
      );
    }
    const requestnya = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    params.append("tahun", selectedYears);
    params.append("wilayah", wilayahID);
    params.append("parent_id_1", parent_id_1);
    if (typeof dataset_1 !== "string") {
      params.append("dataset_1", "[" + dataset_1 + "]");
    } else {
      params.append("dataset_1", dataset_1);
    }

    params.append("parent_id_2", parent_id_2);

    if (typeof dataset_2 !== "string") {
      params.append("dataset_2", "[" + dataset_2 + "]");
    } else {
      params.append("dataset_2", dataset_2);
    }

    if (sessionStorage.getItem("token") !== null) {
      params.append("record", true);
    }

    fetch(
      process.env.REACT_APP_URL_API + "/utak-atik?" + params.toString(),
      requestnya
    )
      .then((response) => response.json())
      .then((result) => {
        setView_info_halaman_chart(result.info.view);
      });
  }

  function kategoriRecordTS() {
    var params = new URLSearchParams();
    const myHeaders = new Headers();
    if (sessionStorage.getItem("token") !== null) {
      myHeaders.append(
        "Authorization",
        `Bearer ${sessionStorage.getItem("token")}`
      );
    }
    const requestnya = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    params.append("tahun", "semua");
    params.append("wilayah", wilayahID);
    params.append("parent_id_1", parent_id_1);
    if (typeof dataset_1 !== "string") {
      params.append("dataset_1", "[" + dataset_1 + "]");
    } else {
      params.append("dataset_1", dataset_1);
    }

    params.append("parent_id_2", parent_id_2);

    if (typeof dataset_2 !== "string") {
      params.append("dataset_2", "[" + dataset_2 + "]");
    } else {
      params.append("dataset_2", dataset_2);
    }

    if (sessionStorage.getItem("token") !== null) {
      params.append("record", true);
    }

    fetch(
      process.env.REACT_APP_URL_API + "/utak-atik?" + params.toString(),
      requestnya
    )
      .then((response) => response.json())
      .then((result) => {
        setView_info_halaman_timeseries(result.info.view);
      });
  }

  function kategoriSimpanP() {
    var params = new URLSearchParams();
    const myHeaders = new Headers();
    if (sessionStorage.getItem("token") !== null) {
      myHeaders.append(
        "Authorization",
        `Bearer ${sessionStorage.getItem("token")}`
      );
    }
    const requestnya = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    params.append("tahun", selectedYears);
    params.append("wilayah", wilayahID);
    params.append("parent_id_1", parent_id_1);
    if (typeof dataset_1 !== "string") {
      params.append("dataset_1", "[" + dataset_1 + "]");
    } else {
      params.append("dataset_1", dataset_1);
    }

    params.append("parent_id_2", parent_id_2);

    if (typeof dataset_2 !== "string") {
      params.append("dataset_2", "[" + dataset_2 + "]");
    } else {
      params.append("dataset_2", dataset_2);
    }

    if (sessionStorage.getItem("token") !== null) {
      params.append("record", true);
    }

    fetch(
      process.env.REACT_APP_URL_API + "/utak-atik?" + params.toString(),
      requestnya
    )
      .then((response) => response.json())
      .then((result) => {
        setSimpan_info_halaman_chart(result.info.view);
      });
  }

  function kategoriSimpanTS() {
    var params = new URLSearchParams();
    const myHeaders = new Headers();
    if (sessionStorage.getItem("token") !== null) {
      myHeaders.append(
        "Authorization",
        `Bearer ${sessionStorage.getItem("token")}`
      );
    }
    const requestnya = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    params.append("tahun", "semua");
    params.append("wilayah", wilayahID);
    params.append("parent_id_1", parent_id_1);
    if (typeof dataset_1 !== "string") {
      params.append("dataset_1", "[" + dataset_1 + "]");
    } else {
      params.append("dataset_1", dataset_1);
    }

    params.append("parent_id_2", parent_id_2);

    if (typeof dataset_2 !== "string") {
      params.append("dataset_2", "[" + dataset_2 + "]");
    } else {
      params.append("dataset_2", dataset_2);
    }

    if (sessionStorage.getItem("token") !== null) {
      params.append("record", true);
    }

    fetch(
      process.env.REACT_APP_URL_API + "/utak-atik?" + params.toString(),
      requestnya
    )
      .then((response) => response.json())
      .then((result) => {
        setSimpan_info_halaman_timeseries(result.info.view);
      });
  }

  function previous() {
    if (selectedYears > years[years.length - 1].tahun) {
      setSelectedYears(Number(selectedYears) - 1);
      sessionStorage.setItem("yearss", Number(selectedYears) - 1);
      // updatePeta(wilayahID);
      document.getElementById("animasiTahun").classList.remove("invisible")
      document.getElementById("animasiTahun").classList.add("fade-in-out")
      setTimeout(function(){
        document.getElementById("animasiTahun").classList.add("invisible")
      },800)
    }
  }

  function next() {
    if (selectedYears < years[0].tahun) {
      setSelectedYears(Number(selectedYears) + 1);
      sessionStorage.setItem("yearss", Number(selectedYears) + 1);
      // updatePeta(wilayahID);
      document.getElementById("animasiTahun").classList.remove("invisible")
      document.getElementById("animasiTahun").classList.add("fade-in-out")
      setTimeout(function(){
        document.getElementById("animasiTahun").classList.add("invisible")
      },800)
    }
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert = "Geolocation tidak support pada browser ini.";
    }
  }
  const [Latitude, setLatitude] = useState(null);
  const [Longitude, setLongitude] = useState(null);

  function showPosition(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  useEffect(() => {
    getLocation();
  }, [navigator.geolocation]);
  
  function DataStatistik() {
    const calculateAge = (dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--; 
      }
      return age;
    };
    let gender;
    if (userGender === "Nn" || userGender === "Ny") {
      gender = "female";
    } else {
      gender = "male";
    }
    const formdata = new FormData();
    const selectedData = JSON.parse(sessionStorage.getItem("selectedData") || "{}");
    let labelSet1 = selectedData.labelset1.filter(Boolean);
    let labelSet2 = selectedData.labelset2.filter(Boolean);

    let formatLabel1 = labelSet1.map((item) => `${item}`);
    let formatLabel2 = labelSet2.map((item) => `${item}`);

    if (labelSet1.length === 1 && sessionStorage.getItem("namaFilter1") === labelSet1[0]) {
      formatLabel1 = ["semua"];
    }
    if (labelSet2.length === 1 && sessionStorage.getItem("namaFilter2") === labelSet2[0]) {
      formatLabel2 = ["semua"];
    }
  
    var statusLogin = tokenUser !== null ? "1" : "0";
    var NamaDaerah1 = selectedCity !== "Semua" ? sessionStorage.getItem("namakota") : sessionStorage.getItem("namaprovinsi");
  
    formdata.append("guest", Cookies.get("id_guest"));
    formdata.append("status", statusLogin);
    formdata.append("halaman", "2");
    formdata.append("lat", sessionStorage.getItem("latitudeUser") !== '' ? sessionStorage.getItem("latitudeUser") : "");
    formdata.append("long", sessionStorage.getItem("longitudeUser") !== '' ? sessionStorage.getItem("longitudeUser") : "");
    formdata.append("parent_dataset_1", sessionStorage.getItem("namaFilter1"));
    formdata.append("dataset_1", JSON.stringify(formatLabel1));

    // if (sessionStorage.getItem("all_ds_1") === "semua") {
    //   formdata.append("dataset_1", "semua");
    // } else {
    //   formdata.append("dataset_2", JSON.stringify(labelSet1));
    // }

    formdata.append("parent_dataset_2", sessionStorage.getItem("namaFilter2"));
    formdata.append("dataset_2", JSON.stringify(formatLabel2));

    // if (sessionStorage.getItem("all_ds_2") === "semua") {
    //   formdata.append("dataset_2", "semua");
    // } else {
    //   formdata.append("dataset_2", JSON.stringify(labelSet2));
    // }

    formdata.append("daerah_1", NamaDaerah1);
    formdata.append('email', sessionStorage.getItem("emailUser"));
    formdata.append('website_akses', '1');
    formdata.append("gender", tokenUser !== null ? gender : '');
    formdata.append("age", tokenUser !== null ? calculateAge(userAge) : '');
  
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
  
    fetch("https://development.otonometer.com:8000/api/visitor/add", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }

  return (
    <div>
            <div id="animasiTahun" className="invisible fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[45%] w-full md:w-screen h-[93vh] p-5 rounded-[10px] bg-secondary bg-opacity-75 z-30 flex items-center justify-center">
        <div className=" text-white text-[96px] font-extrabold text-center align-middle">
          {selectedYears}
        </div>
      </div>
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
        <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center gap-x-2 mt-2 md:mt-5 lg:mt-[50px]">
          <a
            href="/Utak-Atik-Main"
            className="mr-4 md:mr-4 md:mt-0 md:mt-2 lg:mb-7 relative"
          >
            <img
              src={back}
              alt=""
              className="w-[30px] md:w-[30px] lg:w-auto transition-transform duration-300 transform hover:scale-110"
            />
          </a>
          <h1 className="text-secondary text-2xl text-center mt-5 mb-2 font-bold lg:text-4xl lg:mt-0 lg:mb-5 lg:mr-10">
            Utak-Atik Menyajikan Insight Tanpa Batas!
          </h1>
          <h1 className="hidden lg:block text-secondary text-2xl text-center mt-5 mb-2 font-bold lg:text-4xl lg:mt-0 lg:mb-5"></h1>
        </div>

        {/* DROPDOWN */}
        {/* FETCHING PROVINSI */}
        <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-x-[80px] gap-y-[10px] mt-[20px]">
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
                    setIsProvince(true);
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
                  setSelectedCity("Semua");
                  setWilayahID(getInfoProvinsi);
                  setSelectedYears(sessionStorage.getItem("yearss"));
                  setOpenCity(false);
                  sessionStorage.getItem("Utakprofil_provinsi");
                  sessionStorage.setItem("namawilayah", "Semua");
                  setIsProvince(true);
                  sessionStorage.setItem(
                    "idwilayah",
                    sessionStorage.getItem("idprovinsi")
                  );
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
                      setWilayahID(wilayah);
                      sessionStorage.setItem("namawilayah", regencies.nama);
                      sessionStorage.setItem("idkota", regencies.id);
                      sessionStorage.setItem("idwilayah", regencies.id);
                      sessionStorage.setItem("namakota", regencies.nama);
                      setIsProvince(false);
                    }
                  }}
                >
                  {regencies?.nama}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center lg:mt-[30px] xl:mt-[20px] lg:mt-[10px] mt-[10px] sm:mt-[10px] md:mt-[20px] mb-[-10px]">
          <p className="lg:text-[20px] xl:text-[20px] md:text-[17px] text-[15px] text-secondary">Penduduk</p>
          <p className="text-[20px] font-bold text-secondary lg:text-[24px] xl:text-[24px] md:text-[20px]">
            {penduduk} Jiwa
          </p>
        </div>

        {/* <div className="flex items-center justify-center font-semibold text-secondary mt-[48px] text-[20px] gap-x-[20px]">
        <p className={activeTab === "persentase" ? "inactive-text" : ""}>
          Nominal
        </p>
        <SwitchBtn selected={activeTab} onSelect={toggleTab} />
        <p className={activeTab === "nominal" ? "inactive-text" : ""}>
          Persentase
        </p>
      </div> */}

        <div className="relative cursor-pointer w-[120px] font-medium text-[14px] text-secondary mt-[40px]">
          <div
            onClick={() => setOpenYears(!openYears)}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            {selectedYears ? selectedYears : "Tahun"}
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-auto w-[10px] h-[20px] ${
                openYears && "rotate-180"
              }`}
            />
          </div>
          {openYears && (
            <div className="absolute z-10 bg-[#ebebeb] mt-2 rounded-md shadow-lg w-full">
              <ul>
                {years?.map((tahunn) => (
                  <li
                    key={tahunn?.tahun}
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] ${
                      tahunn?.tahun === selectedYears &&
                      "bg-secondary text-white"
                    }`}
                    onClick={() => {
                      if (
                        tahunn?.tahun?.toLowerCase() !==
                        String(selectedYears).toLowerCase()
                      ) {
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

        <p className="text-center font-extrabold text-[20px] text-[#064878] lg:mt-[0px] lg:hidden block md:hidden mt-[20px]">
          {" "}
          {sessionStorage.getItem("namaFilter1")}
        </p>
        <p className="text-[14px] italic lg:hidden md:hidden block mb-[-20px]">
          {kapitaset1}
        </p>

        <div className="flex items-center justify-center font-semibold text-secondary mt-[48px] text-[17px] lg:text-[20px] gap-x-[20px] md:mt-[30px]">
          <p className={activeTab === "persentase" ? "inactive-text" : ""}>
            Nominal
          </p>
          <SwitchBtn selected={activeTab} onSelect={toggleTab} />
          <p className={activeTab === "nominal" ? "inactive-text" : ""}>
            Persentase
          </p>
        </div>

        <div className="flex justify-center items-center text-secondary lg:mt-5 mt-0 xl:gap-x-[400px] lg:gap-x-[230px] lg:mb-[-30px] mb-0">
          <div className="text-center">
            <>
              <p className="text-center font-extrabold text-[#064878] lg:text-[26px] xl:text-[26px] lg:mt-[0px] hidden md:hidden lg:block xl:block">
                {sessionStorage.getItem("namaFilter1")}
              </p>
              <p className="lg:text-[18px] xl:text-[18px] hidden md:hidden lg:block xl:block italic">
                {kapitaset1}
              </p>
            </>
          </div>

          <div className="text-center ml-[-10px]">
            <p className="text-center font-extrabold text-[20px] text-[#064878] lg:text-[26px] xl:text-[26px] lg:mt-[0px] hidden md:hidden lg:block xl:block">
              {sessionStorage.getItem("namaFilter2")}
            </p>
            <p className="lg:text-[18px] xl:text-[18px] hidden md:hidden lg:block xl:block italic">
              {kapitaset2}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center text-secondary mt-4 gap-x-[200px] lg:mb-[0px] md:mb-[-30px] lg:mb-[0px] md:mt-[20px]">
          <div className="text-center">
            <>
              <p className="text-center font-extrabold text-[23px] text-[#064878] lg:mt-[0px] lg:hidden hidden md:block sm:hidden xl:hidden">
                {sessionStorage.getItem("namaFilter1")}
              </p>
              <p className="text-[15px] lg:hidden hidden md:block sm:hidden italic">
                {kapitaset1}
              </p>
            </>
          </div>

          <div className="text-center ml-[-10px]">
            <p className="text-center font-extrabold text-[23px] text-[#064878] lg:mt-[0px] lg:hidden hidden md:block sm:hidden xl:hidden">
              {sessionStorage.getItem("namaFilter2")}
            </p>
            <p className="text-[15px] lg:hidden hidden md:block sm:hidden italic">
              {kapitaset2}
            </p>
          </div>
        </div>

        <div className="flex">
        <button onClick={()=>{previous()}}>
            <img
              src={arrowl}
              alt="Gambar Kiri"
              className="w-5 h-5 lg:w-8 lg:h-8 lg:mt-[23%] mr-[32px] md:ml-[20px] ml-[5px] lg:mr-[65px] hidden sm:hidden xl:block lg:block md:block"
            />
          </button>

          <div className={activeTab === "nominal" ? "" : "hidden"}>
            <div class="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2 sm:gap-x-4 sm:gap-y-2 md:gap-x-8 md:gap-y-8 lg:ml-[0px] md:ml-[0px] sm:ml-[20px] ml-[20px] xl:mt-12 md:mt-12 lg:mt-12 sm:mt-[10px]">
              <div className="lg:ml-[0px] md:ml-[10px] xl:ml-[0px] ml-[9px]">
                <Card
                  chartRef={chartRef1}
                  // note={notes_1}
                  legendData={legendData1}
                  expand={showAllLegends1}
                  onExpand={handleExpandCard1}
                  onHide={handleCloseLegends1}
                />
              </div>

              <div className="justify-center text-center text-[11px] font-medium text-[#86BBD8] lg:hidden block md:hidden sm:block pr-[30px]">
                <br></br>
                {notes_1 &&
                  typeof notes_1 === "object" &&
                  Object.values(notes_1).map((note, index) => (
                    <div key={index}>
                      {note.length > 50
                        ? splitTextIntoChunks(note, 50).map(
                            (chunk, chunkIndex) => (
                              <span key={chunkIndex}>
                                {chunk}
                                <br />
                              </span>
                            )
                          )
                        : note}
                    </div>
                  ))}
              </div>

              <div className="flex gap-x-[90px] sm:gap-x-[80px] item-center sm:mr-[30px] mr-[30px] mt-[40px] sm:mt-[40px] lg:hidden md:hidden block">
                <div>
                <button onClick={()=>{previous()}}>
                    <img
                      src={arrowl}
                      alt="Gambar Kiri"
                      className="w-5 h-5 block lg:hidden md:hidden"
                    />
                  </button>
                </div>
                <div className=" mt-[-10px] mb-[20px]">
                  <p class="text-center font-extrabold text-[20px] text-[#064878] lg:text-[24px] lg:hidden md:hidden block">
                    {" "}
                    {sessionStorage.getItem("namaFilter2")}
                  </p>
                  <p class="text-center text-[14px] lg:hidden md:hidden block italic">
                    {kapitaset2}
                  </p>
                </div>
                <div>
                <button onClick={()=>{next()}}>
                    <img
                      src={arrowr}
                      alt="Gambar Kanan"
                      className="w-5 h-5 block lg:hidden md:hidden"
                    />
                  </button>
                </div>
              </div>

              <div className="lg:ml-[0px] md:ml-[13px] mr-[0px] lg:mr-[0px] ml-[9px]">
                <Card
                  chartRef={chartRef2}
                  // note={notes_2}
                  legendData={legendData2}
                  expand={showAllLegends2}
                  onExpand={handleExpandCard2}
                  onHide={handleCloseLegends2}
                />
              </div>

              <div className="justify-center text-center text-[11px] font-medium text-[#86BBD8] xl:hidden lg:hidden md:hidden sm:block block pr-[40px] sm:pr-[10px]">
                <br></br>
                {notes_2 &&
                  typeof notes_2 === "object" &&
                  Object.values(notes_2).map((note, index) => (
                    <div key={index}>
                      {note.length > 50
                        ? splitTextIntoChunks(note, 50).map(
                            (chunk, chunkIndex) => (
                              <span key={chunkIndex}>
                                {chunk}
                                <br />
                              </span>
                            )
                          )
                        : note}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className={activeTab === "persentase" ? "" : "hidden"}>
            <div class="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2 sm:gap-x-4 sm:gap-y-2 md:gap-x-8 md:gap-y-8 lg:ml-[0px] md:ml-[0px] sm:ml-[20px] ml-[20px] xl:mt-16 md:mt-16 lg:mt-16 sm:mt-[10px]">
              <div className="lg:ml-[0px] md:ml-[10px] xl:ml-[0px] ml-[9px]">
                <Card
                  chartRef={chartRef1Persentase}
                  // note={notes_1}
                  legendData={legendData1Persentase}
                  expand={showAllLegends1Persentase}
                  onExpand={handleExpandCard1Persentase}
                  onHide={handleCloseLegends1Persentase}
                />
              </div>

              <div className="justify-center text-center text-[11px] font-medium text-[#86BBD8] lg:hidden block md:hidden sm:block pr-[30px]">
                <br></br>
                {notes_1 &&
                  typeof notes_1 === "object" &&
                  Object.values(notes_1).map((note, index) => (
                    <div key={index}>
                      {note.length > 50
                        ? splitTextIntoChunks(note, 50).map(
                            (chunk, chunkIndex) => (
                              <span key={chunkIndex}>
                                {chunk}
                                <br />
                              </span>
                            )
                          )
                        : note}
                    </div>
                  ))}
              </div>

              <div className="flex gap-x-[90px] sm:gap-x-[80px] item-center sm:mr-[30px] mr-[30px] mt-[40px] sm:mt-[40px] lg:hidden md:hidden block">
                <div>
                <button onClick={()=>{previous()}}>
                    <img
                      src={arrowl}
                      alt="Gambar Kiri"
                      className="w-5 h-5 block lg:hidden md:hidden"
                    />
                  </button>
                </div>
                <div className=" mt-[-10px] mb-[20px]">
                  <p class="text-center font-extrabold text-[20px] text-[#064878] lg:hidden md:hidden block">
                    {" "}
                    {sessionStorage.getItem("namaFilter2")}
                  </p>
                  <p class="text-center text-[14px] lg:hidden md:hidden block italic">
                    {kapitaset2}
                  </p>
                </div>
                <div>
                <button onClick={()=>{next()}}>
                    <img
                      src={arrowr}
                      alt="Gambar Kanan"
                      className="w-5 h-5 block lg:hidden md:hidden"
                    />
                  </button>
                </div>
              </div>

              <div className="lg:ml-[0px] md:ml-[13px] mr-[0px] lg:mr-[0px] ml-[9px]">
                <Card
                  chartRef={chartRef2Persentase}
                  // note={notes_2}
                  legendData={legendData2Persentase}
                  expand={showAllLegends2Persentase}
                  onExpand={handleExpandCard2Persentase}
                  onHide={handleCloseLegends2Persentase}
                />
              </div>

              <div className="justify-center text-center text-[11px] font-medium text-[#86BBD8] xl:hidden lg:hidden md:hidden sm:block block pr-[40px] sm:pr-[10px]">
                <br></br>
                {notes_2 &&
                  typeof notes_2 === "object" &&
                  Object.values(notes_2).map((note, index) => (
                    <div key={index}>
                      {note.length > 50
                        ? splitTextIntoChunks(note, 50).map(
                            (chunk, chunkIndex) => (
                              <span key={chunkIndex}>
                                {chunk}
                                <br />
                              </span>
                            )
                          )
                        : note}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <button onClick={()=>{next()}}>
            <img
              src={arrowr}
              alt="Gambar Kanan"
              className="w-5 h-5 lg:w-8 lg:h-8 lg:mt-[20%] ml-[40px] mr-[20px] lg:ml-[65px] hidden lg:block xl:block md:block sm:hidden"
            />
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-x-[1px] gap-y-[1px] mt-[5px] xl:ml-[50px] lg:ml-[60px] md:ml-[40px]">
          <div
            className={`justify-center text-center xl:text-[14px] lg:text-[14px] md:text-[12px] font-medium text-[#86BBD8] pr-[40px] hidden md:block ${
              !notes_2 ? "md:col-span-2" : ""
            }`}
          >
            <br />
            {notes_1 &&
              typeof notes_1 === "object" &&
              Object.values(notes_1).map((note, index) => (
                <div
                  key={index}
                  className="hidden xl:block lg:block md:block xl:w-[500px] lg:w-[400px]"
                >
                  {note.length > 50
                    ? splitTextIntoChunks(note, 50).map((chunk, chunkIndex) => (
                        <span key={chunkIndex}>
                          {chunk}
                          <br />
                        </span>
                      ))
                    : note}
                </div>
              ))}
          </div>
          {notes_2 && (
            <div className="justify-center text-center xl:text-[14px] lg:text-[14px] md:text-[12px] font-medium text-[#86BBD8] pr-[40px] hidden md:block">
              <br />
              {typeof notes_2 === "object" &&
                Object.values(notes_2).map((note, index) => (
                  <div
                    key={index}
                    className="hidden xl:block lg:block md:block xl:w-[500px] lg:w-[400px]"
                  >
                    {note.length > 50
                      ? splitTextIntoChunks(note, 50).map(
                          (chunk, chunkIndex) => (
                            <span key={chunkIndex}>
                              {chunk}
                              <br />
                            </span>
                          )
                        )
                      : note}
                  </div>
                ))}
            </div>
          )}
        </div>

        <br className="hidden xl:block lg:block md:block"></br>

        {/* Lihat */}
        <div className="flex w-full h-[50px] items-center justify-center gap-[10px] md:gap-[20px] text-secondary">
          <div className="flex items-center gap-[10px]">
            <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-md bg-primary drop-shadow-lg flex justify-center items-center">
              <FontAwesomeIcon icon={faEye} color="#24445A" className="" />
            </div>
            <p className="text-[12px] md:text-[16px]">
              {view_info_halaman_chart} Lihat
            </p>
          </div>

          {/* Simpan */}
          <div className="flex items-center gap-[10px]">
            <div
              className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-md bg-primary drop-shadow-lg flex justify-center items-center hover:bg-third cursor-pointer"
              onClick={() => {
                if (akunPrem === "N") {
                  togglePopupSimpan();
                } else {
                  SimpanHalamanSemua(halaman_chart);
                }
              }}
            >
              <FontAwesomeIcon icon={faBookBookmark} color="#24445A" />
            </div>
            <p className="text-[12px] md:text-[16px]">
              {simpan_info_halaman_chart} Simpan
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
                      SimpanHalamanSemua(halaman_chart);
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
                        SimpanHalamanKoleksi(halaman_chart, collectionUser.id);
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

          {/* Download */}
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

        {/* INI RASUK */}
        <div className="lg:mt-[20px] text-center text-[12px] lg:text-[16px] xl:text-[16px] md:text-[16px] sm:text-[14px] italic">
          {/* <p className="mb-[20px] mt-[70px] text-third"> {notes}</p> */}
          {notes && notes.length > 0 && (
            <p className="mb-[20px]">
              <span className="font-extrabold text-secondary text-secondary">
                Catatan:
              </span>{" "}
              <br />
              <span className="text-third">{notes}</span>
            </p>
          )}

          <p className="italic text-[#919BA2]">
            Sumber: <br></br>{" "}
            {/* {sumber.length === 2 ? sumber.join(" & ") : sumber} */}
            {sumberText}
          </p>
        </div>

        <div class="border-b-2 border-[#DADADA] w-[400px] xl:w-[1190px] lg:w-[900px] md:w-[700px] sm:w-[500px] mt-[50px] mb-[30px] relative"></div>

        <div className="flex justify-center items-center">
          <>
            <div className="relative cursor-pointer w-[120px] font-medium text-[14px] text-secondary">
              <div
                onClick={() => setOpenYearsTS(!openYearsTS)}
                className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
              >
                {selectedYearsTS ? selectedYearsTS : "Tahun"}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color="#24445A"
                  className={`ml-auto w-[10px] h-[20px] ${
                    openYearsTS && "rotate-180"
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
                        className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] ${
                          disableYear2(yearData.tahun)
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
            <p className="text-secondary mx-[20px] text-[15px] lg:text-[18px]">
              s/d
            </p>
            <div className="relative cursor-pointer w-[120px] font-medium text-[14px] text-secondary">
              <div
                onClick={() => setOpenYearsTS2(!openYearsTS2)}
                className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
              >
                {selectedYearsTS2 ? selectedYearsTS2 : "Tahun"}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color="#24445A"
                  className={`ml-auto w-[10px] h-[20px] ${
                    openYearsTS2 && "rotate-180"
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
                        className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] ${
                          disableYear(yearData.tahun)
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`}
                        onClick={() => {
                          if (!disableYear(yearData.tahun)) {
                            setSelectedYearsTS2(yearData.tahun);
                            setOpenYearsTS2(false);
                            setYearsTS2(selectedYearsTS2);
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
          </>
        </div>
        <div className="text-center flex justify-center">
          <p className="text-center font-extrabold text-[20px] text-[#064878] lg:mt-[0px] xl:hidden lg:hidden block mt-[20px] md:hidden sm:block">
            {" "}
            {sessionStorage.getItem("namaFilter1")}
          </p>
        </div>
        <div className="text-center flex justify-center italic">
          <p className="text-center text-[14px] lg:hidden block mb-[-50px] md:hidden sm:block xl:hidden">
            {kapitaset1}
          </p>
        </div>

        <div className="flex justify-center items-center text-secondary mt-4 gap-x-[230px] lg:mb-[0px] md:mb-[-30px] lg:mb-[0px] md:mt-[20px]">
          <div className="text-center">
            <>
              <p className="text-center font-extrabold text-[23px] text-[#064878] lg:mt-[0px] lg:hidden hidden md:block sm:hidden">
                {sessionStorage.getItem("namaFilter1")}
              </p>
              <p className="text-[15px] lg:hidden hidden md:block sm:hidden italic">
                {kapitaset1}
              </p>
            </>
          </div>

          <div className="text-center">
            <p className="text-center font-extrabold text-[23px] text-[#064878] lg:mt-[0px] lg:hidden hidden md:block sm:hidden">
              {sessionStorage.getItem("namaFilter2")}
            </p>
            <p className="text-[15px] lg:hidden hidden md:block sm:hidden italic">
              {kapitaset2}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center text-secondary lg:mt-5 mt-0 xl:gap-x-[500px] lg:gap-x-[300px] lg:mb-[-30px] mb-0">
          <div className="text-center">
            <>
              <p className="text-center font-extrabold lg:text-[26px] xl:text-[26px] text-[#064878] lg:mt-[0px] hidden md:hidden lg:block xl:block">
                {sessionStorage.getItem("namaFilter1")}
              </p>
              <p className="lg:text-[18px] xl:text-[18px] hidden md:hidden lg:block xl:block italic">
                {kapitaset1}
              </p>
            </>
          </div>

          <div className="text-center">
            <p className="text-center font-extrabold text-[#064878] lg:text-[26px] xl:text-[26px] lg:mt-[0px] hidden md:hidden lg:block xl:block">
              {sessionStorage.getItem("namaFilter2")}
            </p>
            <p className="lg:text-[18px] xl:text-[18px] hidden md:hidden lg:block xl:block italic">
              {kapitaset2}
            </p>
          </div>
        </div>
        {Timeseries2()}
        <div className="flex gap-[50px] mt-[50px] justify-center items-center w-full">
          <div className="w-[600px]"></div>
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
    </div>
  );
};

export default UtakGraph;
