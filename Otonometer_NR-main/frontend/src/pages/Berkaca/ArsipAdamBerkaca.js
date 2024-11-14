import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import geometry from "../../assets/6.svg";
import "../../style/Components.css";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const ArsipAdam = () => {
  ///DROPDOWN PROVINSI D1
  const [provincessDaerah1, setProvincesDaerah1] = useState(null);
  const [inputValueDaerah1, setInputValueDaerah1] = useState("");
  const [selectedDaerah1, setSelectedDaerah1] = useState("");
  const [openProvinsiDaerah1, setOpenProvinsiDaerah1] = useState(false);
  const [getInfoProvinsiDaerah1, setGetInfoProvinsiDaerah1] = useState(null);
  const [wilayahIDDaerah1, setWilayahIDDaerah1] = useState(null);
  const [isProvinceDaerah1, setIsProvinceDaerah1] = useState(true);
  useEffect(() => {
    fetch("https://api.otonometer.neracaruang.com/api/provinces")
      .then((response) => response.json())
      .then((data) => {
        setProvincesDaerah1(data.data);
      });
  }, []);

  ///DROPDOWN PROVINSI D2
  const [provincessDaerah2, setProvincesDaerah2] = useState(null);
  const [inputValueDaerah2, setInputValueDaerah2] = useState("");
  const [selectedDaerah2, setSelectedDaerah2] = useState("");
  const [openProvinsiDaerah2, setOpenProvinsiDaerah2] = useState(false);
  const [getInfoProvinsiDaerah2, setGetInfoProvinsiDaerah2] = useState(null);
  const [wilayahIDDaerah2, setWilayahIDDaerah2] = useState(null);
  const [isProvinceDaerah2, setIsProvinceDaerah2] = useState(true);
  useEffect(() => {
    fetch("https://api.otonometer.neracaruang.com/api/provinces")
      .then((response) => response.json())
      .then((data) => {
        setProvincesDaerah2(data.data);
      });
  }, []);

  ///DROPDOWN KOTA
  const [citiesDaerah1, setCityDaerah1] = useState(null);
  const [inputValueofCityDaerah1, setInputValueofCityDaerah1] = useState("");
  const [selectedCityDaerah1, setSelectedCityDaerah1] = useState("");
  const [openCityDaerah1, setOpenCityDaerah1] = useState(false);

  ///UPDATE DATA KOTA BERDASARKAN DATA PROVINSI
  function updateKotaDaerah1(item, choosed, id) {
    if (item.toLowerCase() !== choosed.toLowerCase()) {
      setSelectedDaerah1(item);
      setOpenProvinsiDaerah1(false);
      setInputValueDaerah1("");
      fetch(
        "https://api.otonometer.neracaruang.com/api/cities?province_id=" + id
      )
        .then((response) => response.json())
        .then((data) => {
          setCityDaerah1(data.data);
        });
    }
  }

  ///DROPDOWN KOTA2
  const [citiesDaerah2, setCityDaerah2] = useState(null);
  const [inputValueofCityDaerah2, setInputValueofCityDaerah2] = useState("");
  const [selectedCityDaerah2, setSelectedCityDaerah2] = useState("");
  const [openCityDaerah2, setOpenCityDaerah2] = useState(false);

  ///UPDATE DATA KOTA BERDASARKAN DATA PROVINSI
  function updateKotaDaerah2(item, choosed, id) {
    if (item.toLowerCase() !== choosed.toLowerCase()) {
      setSelectedDaerah2(item);
      setOpenProvinsiDaerah2(false);
      setInputValueDaerah2("");
      fetch(
        "https://api.otonometer.neracaruang.com/api/cities?province_id=" + id
      )
        .then((response) => response.json())
        .then((data) => {
          setCityDaerah2(data.data);
        });
    }
  }

  ///UNTUK FILTER MINIMUM TAHUN DAERAH 1
  const [openYearsTSDaerah1, setOpenYearsTSDaerah1] = useState(false);
  const [yearsTSDaerah1, setYearsTSDaerah1] = useState("");
  const [selectedYearsTSDaerah1, setSelectedYearsTSDaerah1] = useState("");
  ///UNTUK FILTER MAKSIMUM TAHUN DAERAH 1
  const [openYearsTS2Daerah1, setOpenYearsTS2Daerah1] = useState(false);
  const [yearsTS2Daerah1, setYearsTS2Daerah1] = useState("");
  const [selectedYearsTS2Daerah1, setSelectedYearsTS2Daerah1] = useState("");
  const [infoDaerah1, setInfoDaerah1] = useState(null);

  ///UNTUK FILTER MINIMUM TAHUN DAERAH 2
  const [openYearsTSDaerah2, setOpenYearsTSDaerah2] = useState(false);
  const [yearsTSDaerah2, setYearsTSDaerah2] = useState("");
  const [selectedYearsTSDaerah2, setSelectedYearsTSDaerah2] = useState("");
  ///UNTUK FILTER MAKSIMUM TAHUN DAERAH 2
  const [openYearsTS2Daerah2, setOpenYearsTS2Daerah2] = useState(false);
  const [yearsTS2Daerah2, setYearsTS2Daerah2] = useState("");
  const [selectedYearsTS2Daerah2, setSelectedYearsTS2Daerah2] = useState("");
  const [infoDaerah2, setInfoDaerah2] = useState(null);

  // useEffect(() => {
  //   if (selectedYearsTS === "") {
  //     setYearsTS("2022");
  //   } else {
  //     setYearsTS(selectedYearsTS);
  //   }
  // }, [yearsTS, selectedYearsTS]);
  // useEffect(() => {
  //   if (selectedYearsTS2 === "") {
  //     setYearsTS2("2022");
  //   } else {
  //     setYearsTS2(selectedYearsTS2);
  //   }
  // }, [yearsTS2, selectedYearsTS2]);
  // const [dataChart, setDataChart] = useState([]);
  // const [dataChart2, setDataChart2] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     "https://api.otonometer.neracaruang.com/api/utak-atik?tahun=semua&wilayah=1&parent_id_1=4&dataset_1=[7, 21, 52, 69, 120]&parent_id_2=4&dataset_2=[5, 69, 119]",
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       var datasheet1 = [];
  //       var tahun = [];
  //       var datasheet2 = [];
  //       var tahun2 = [];
  //       var minimumTahun = 2018;
  //       var maksimumTahun = yearsTS;
  //       var minimumTahun2 = 2018;
  //       var maksimumTahun2 = yearsTS2;
  //       Object.keys(data.data.dataset_1).forEach((item) => {
  //         data.data.dataset_1[item].forEach((list) => {
  //           // console.log()
  //           if (tahun["" + list.label] === null) {
  //             var lokalData = list;
  //             lokalData[LabelnyaTimeseries_1[list.id_bidang]] = lokalData.value;
  //             console.log();
  //             tahun["" + list.label] = lokalData;
  //           } else {
  //             var lokalData = tahun["" + list.label];
  //             lokalData[LabelnyaTimeseries_1[list.id_bidang]] = list.value;
  //             tahun["" + list.label] = lokalData;
  //           }
  //         });
  //       });
  //       Object.keys(tahun).forEach((item) => {
  //         if (item >= minimumTahun && item <= maksimumTahun) {
  //           datasheet1.push(tahun[item]);
  //         }
  //       });
  //       Object.keys(data.data.dataset_2).forEach((item) => {
  //         data.data.dataset_2[item].forEach((list) => {
  //           if (tahun2["" + list.label] === null) {
  //             var lokalData = list;
  //             lokalData[LabelnyaTimeseries_2[list.id_bidang]] = lokalData.value;
  //             tahun2["" + list.label] = lokalData;
  //           } else {
  //             var lokalData = tahun2["" + list.label];
  //             lokalData[LabelnyaTimeseries_2[list.id_bidang]] = list.value;
  //             tahun2["" + list.label] = lokalData;
  //           }
  //         });
  //       });
  //       Object.keys(tahun2).forEach((item) => {
  //         if (item >= minimumTahun2 && item <= maksimumTahun2) {
  //           datasheet2.push(tahun2[item]);
  //         }
  //       });
  //       if (datasheet1.length && datasheet2.length > 0) {
  //         setDataChart(datasheet1);
  //         setDataChart2(datasheet2);
  //         // setSumbernya(data.sumber);
  //         console.log("dataset1", datasheet1);
  //         console.log("dataset2", datasheet2);
  //       }
  //     });
  // }, [yearsTS, wilayahID, yearsTS2]);

  // const selectedData = JSON.parse(sessionStorage.getItem("selectedData"));
  // const {
  //   parent_id_1,
  //   dataset_1,
  //   parent_id_2,
  //   dataset_2,
  //   LabelnyaTimeseries_1,
  //   LabelnyaTimeseries_2,
  // } = selectedData;

  // function GrafikDAERAH1() {
  //   const TSCOLOR = [
  //     "#94DEFF",
  //     "#41B8D5",
  //     "#2D8BBA",
  //     "#2F5F98",
  //     "#31356E",
  //     "#5E3967",
  //     "#895273",
  //     "#B97286",
  //     "#E28385",
  //     "#FE9273",
  //     "#D8E3EB",
  //   ];
  //   const TSCOLOR2 = [
  //     "#DF7200",
  //     "#FF8D16",
  //     "#FFD04C",
  //     "#86C81A",
  //     "#299B68",
  //     "#740589",
  //     "#4AB887",
  //     "#398B90",
  //     "#2B6D6D",
  //     "#28577D",
  //     "#487FAC",
  //     "#6E5BAD",
  //     "#9674C2",
  //     "#7D6284",
  //     "#545674",
  //     "#4B3657",
  //     "#3B2723",
  //     "#623626",
  //     "#894A33",
  //     "#A84520",
  //     "#D15737",
  //     "#FF6C35",
  //     "#FE9273",
  //     "#B97286",
  //     "#895273",
  //     "#545674",
  //     "#2F5F98",
  //     "#2D8BBA",
  //     "#41B8D5",
  //     "#94DEFF",
  //   ];
  //   var lebarnyaGrafik;
  //   if (yearsTS === "2019" || yearsTS === "2020" || yearsTS === "2021") {
  //     lebarnyaGrafik = 600;
  //   } else if (yearsTS === "2022") {
  //     lebarnyaGrafik = 800;
  //   }
  //   var lebarnyaGrafik2;
  //   if (yearsTS2 === "2019" || yearsTS2 === "2020" || yearsTS2 === "2021") {
  //     lebarnyaGrafik2 = 600;
  //   } else if (yearsTS2 === "2022") {
  //     lebarnyaGrafik2 = 800;
  //   }
  //   return (
  //     <section className="w-full gap-x-[30px] mt-[40px] h-auto">
  //       <div className="flex gap-x-[30px] h-[550px]">
  //         <div className="flex bg-white w-full h-auto text-secondary rounded-[10px] drop-shadow-lg">
  //           <div className="w-[600px] h-auto mt-[20px] mx-[20px] overflow-x-scroll mini-scrollbar">
  //             {dataChart && dataChart.length > 0 && (
  //               <LineChart data={dataChart} width={lebarnyaGrafik} height={450}>
  //                 <XAxis dataKey="label" tick={{ fontSize: 12 }} />
  //                 <YAxis />
  //                 <CartesianGrid strokeDasharray="0" />
  //                 <Tooltip />
  //                 {LabelnyaTimeseries_1.filter(
  //                   (grafiknya) => grafiknya !== null,
  //                 ).map((grafiknya, index) => (
  //                   <Line
  //                     strokeWidth={3}
  //                     type="monotone"
  //                     dataKey={grafiknya}
  //                     stroke={TSCOLOR[index]}
  //                     fillOpacity={1}
  //                     fill={TSCOLOR[index]}
  //                     layout="vertical"
  //                     dot={{ r: 3 }}
  //                   />
  //                 ))}
  //                 <Legend
  //                   iconType="circle"
  //                   layout="horizontal"
  //                   iconSize={10}
  //                   wrapperStyle={{
  //                     fontSize: "14px",
  //                   }}
  //                 />
  //               </LineChart>
  //             )}
  //           </div>
  //         </div>
  //         <div className="flex bg-white w-full h-auto text-secondary rounded-[10px] drop-shadow-lg">
  //           <div className="w-[600px] h-auto mt-[20px] mx-[20px] overflow-x-scroll mini-scrollbar">
  //             {dataChart2 && dataChart2.length > 0 && (
  //               <LineChart
  //                 data={dataChart2}
  //                 width={lebarnyaGrafik2}
  //                 height={450}
  //               >
  //                 <XAxis dataKey="label" tick={{ fontSize: 12 }} />
  //                 <YAxis />
  //                 <CartesianGrid strokeDasharray="0" />
  //                 <Tooltip />
  //                 {LabelnyaTimeseries_2.filter(
  //                   (grafiknya) => grafiknya !== null,
  //                 ).map((grafiknya, index) => (
  //                   <Line
  //                     strokeWidth={3}
  //                     type="monotone"
  //                     dataKey={grafiknya}
  //                     stroke={TSCOLOR2[index]}
  //                     fillOpacity={1}
  //                     fill={TSCOLOR2[index]}
  //                     layout="vertical"
  //                     dot={{ r: 3 }}
  //                   />
  //                 ))}
  //                 <Legend
  //                   iconType="circle"
  //                   layout="horizontal"
  //                   iconSize={10}
  //                   wrapperStyle={{
  //                     fontSize: "14px",
  //                   }}
  //                 />
  //               </LineChart>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //       <div className="text-center italic mt-[30px] text-secondary">
  //         <span>Sumber: </span>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <div className="flex flex-col mt-[125px] mb-[150px] justify-center items-center">
      <img
        src={geometry}
        alt=""
        className="fixed w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10 opacity-5"
      />
      <div className="flex bg-none w-[167px] h-[41px] rounded-[10px] text-secondary border-2 border-secondary text-[14px] font-semibold items-center justify-center">
        BERKACA
      </div>
      <h1 className="flex justify-center items-center text-secondary text-[34px] font-bold mt-[24px]">
        Bandingkan Daerah Pilihanmu!
      </h1>

      <div className="flex flex-col gap-x-[190px] mt-[20px] w-[1200px] justify-center items-center">
        <div className="flex flex-row justify-between items-center w-full">
          <p className="font-bold text-secondary">Daerah 1</p>
          <p className="font-bold text-secondary">Daerah 2</p>
        </div>
        <div className="flex flex-row justify-between w-full">
          {/* DAERAH 1 */}
          <div className="flex flex-row gap-x-[20px] mt-[10px]">
            {/* PROVINSI PERTAMA */}
            <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
              <div
                onClick={() => setOpenProvinsiDaerah1(!openProvinsiDaerah1)}
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
                  className={`ml-[20px] w-[10px] h-[20px] ${
                    openProvinsiDaerah1 && "rotate-180"
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
                    ${
                      provinces?.nama?.toLowerCase() ===
                        selectedDaerah1?.toLowerCase() &&
                      "bg-secondary text-white"
                    }
                    ${
                      provinces?.nama
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
                      sessionStorage.setItem(
                        "idprovinsiBerkacaD1",
                        provinces.id
                      );
                      sessionStorage.setItem(
                        "namaprovinsiBerkacaD1",
                        provinces.nama
                      );
                      sessionStorage.setItem("idprovinsiBerkacaD1", "Semua");
                      setInfoDaerah1("Semua");
                      setSelectedCityDaerah1("Semua");
                      setGetInfoProvinsiDaerah1(provinces.id);
                      setWilayahIDDaerah1(provinces.id);
                      setIsProvinceDaerah1(true);
                    }}
                  >
                    {provinces?.nama}
                  </li>
                ))}
              </ul>
            </div>
            {/* KOTA PERTAMA */}
            <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
              <div
                onClick={() => {
                  setOpenCityDaerah1(!openCityDaerah1);
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
                  className={`ml-[20px] w-[10px] h-[20px] ${
                    openCityDaerah1 && "rotate-180"
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
                    ${
                      "semua" === selectedCityDaerah1?.toLowerCase() &&
                      "bg-secondary text-white"
                    }
                    `}
                  onClick={() => {
                    sessionStorage.setItem("namawilayahBerkacaD1", "Semua");
                    setSelectedCityDaerah1("Semua");
                    setWilayahIDDaerah1(getInfoProvinsiDaerah1);
                    sessionStorage.setItem(
                      "idwilayahBerkacaD1",
                      getInfoProvinsiDaerah1
                    );
                    setOpenCityDaerah1(false);
                    setIsProvinceDaerah1(true);
                  }}
                >
                  Semua
                </li>
                {citiesDaerah1?.map((regencies) => (
                  <li
                    key={regencies?.nama}
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${
                      regencies?.nama?.toLowerCase() ===
                        selectedCityDaerah1?.toLowerCase() &&
                      "bg-secondary text-white"
                    }
                    ${
                      regencies?.nama
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
                        sessionStorage.setItem("namawilayah", regencies.nama);
                        sessionStorage.setItem(
                          "namawilayah_utak",
                          regencies.nama
                        );
                        setSelectedCityDaerah1(regencies?.nama);
                        sessionStorage.setItem("idkotaBerkacaD1", regencies.id);
                        sessionStorage.setItem(
                          "namakotaBerkacaD1",
                          regencies.nama
                        );
                        setOpenCityDaerah1(false);
                        setInputValueofCityDaerah1("");
                        setWilayahIDDaerah1(regencies.id);
                        sessionStorage.setItem(
                          "idwilayahBerkacaD1",
                          regencies.id
                        );
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

          {/* DAERAH 2 */}
          <div className="flex flex-row gap-x-[20px] mt-[10px]">
            {/* PROVINSI KEDUA */}
            <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
              <div
                onClick={() => setOpenProvinsiDaerah2(!openProvinsiDaerah2)}
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
                  className={`ml-[20px] w-[10px] h-[20px] ${
                    openProvinsiDaerah2 && "rotate-180"
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
                {provincessDaerah2?.map((provincesD2) => (
                  <li
                    key={provincesD2?.nama}
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${
                      provincesD2?.nama?.toLowerCase() ===
                        selectedDaerah2?.toLowerCase() &&
                      "bg-secondary text-white"
                    }
                    ${
                      provincesD2?.nama
                        ?.toLowerCase()
                        .startsWith(inputValueDaerah2)
                        ? "block"
                        : "hidden"
                    }`}
                    onClick={() => {
                      updateKotaDaerah2(
                        provincesD2?.nama,
                        selectedDaerah2,
                        provincesD2.id
                      );
                      sessionStorage.setItem(
                        "idprovinsiBerkacaD2",
                        provincesD2.id
                      );
                      sessionStorage.setItem(
                        "namaprovinsiBerkacaD2",
                        provincesD2.nama
                      );
                      sessionStorage.setItem("idprovinsiBerkacaD2", "Semua");
                      setInfoDaerah2("Semua");
                      setSelectedCityDaerah2("Semua");
                      setGetInfoProvinsiDaerah2(provincesD2.id);
                      setWilayahIDDaerah1(provincesD2.id);
                      setIsProvinceDaerah2(true);
                    }}
                  >
                    {provincesD2?.nama}
                  </li>
                ))}
              </ul>
            </div>
            {/* KOTA KEDUA */}
            <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
              <div
                onClick={() => {
                  setOpenCityDaerah2(!openCityDaerah2);
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
                  className={`ml-[20px] w-[10px] h-[20px] ${
                    openCityDaerah2 && "rotate-180"
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
                <li
                  className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary
                    ${
                      "semua" === selectedCityDaerah2?.toLowerCase() &&
                      "bg-secondary text-white"
                    }
                    `}
                  onClick={() => {
                    sessionStorage.setItem("namawilayahBerkacaD2", "Semua");
                    setSelectedCityDaerah2("Semua");
                    setWilayahIDDaerah2(getInfoProvinsiDaerah2);
                    sessionStorage.setItem(
                      "idwilayahBerkacaD2",
                      getInfoProvinsiDaerah2
                    );
                    setOpenCityDaerah2(false);
                    setIsProvinceDaerah2(true);
                  }}
                >
                  Semua
                </li>
                {citiesDaerah2?.map((regenciesD2) => (
                  <li
                    key={regenciesD2?.nama}
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                    ${
                        regenciesD2?.nama?.toLowerCase() ===
                        selectedCityDaerah2?.toLowerCase() &&
                      "bg-secondary text-white"
                    }
                    ${
                        regenciesD2?.nama
                        ?.toLowerCase()
                        .startsWith(inputValueofCityDaerah2)
                        ? "block"
                        : "hidden"
                    }`}
                    onClick={() => {
                      if (
                        regenciesD2?.nama?.toLowerCase() !==
                        selectedCityDaerah2.toLowerCase()
                      ) {
                        sessionStorage.setItem("namawilayahD2", regenciesD2.nama);
                        sessionStorage.setItem(
                          "namawilayah_utak",
                          regenciesD2.nama
                        );
                        setSelectedCityDaerah2(regenciesD2?.nama);
                        sessionStorage.setItem("idkotaBerkacaD2", regenciesD2.id);
                        sessionStorage.setItem(
                          "namakotaBerkacaD1",
                          regenciesD2.nama
                        );
                        setOpenCityDaerah2(false);
                        setInputValueofCityDaerah2("");
                        setWilayahIDDaerah2(regenciesD2.id);
                        sessionStorage.setItem(
                          "idwilayahBerkacaD2",
                          regenciesD2.id
                        );
                        setIsProvinceDaerah2(false);
                      }
                    }}
                  >
                    {regenciesD2?.nama}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="timeseriesnyaaaaaaa">
        {/* <div className="flex justify-center items-center gap-x-[40px]">
          <div className="relative cursor-pointer w-[120px] font-medium text-[14px] text-secondary mt-[40px]">
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
              <div className="absolute z-10 bg-[#ebebeb] mt-2 rounded-md shadow-lg w-full">
                <ul
                  className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-auto 
                            ${openYearsTS ? "max-h-[240px]" : "max-h-[0]"}`}
                >
                  <li
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]
                            `}
                    onClick={() => {
                      setSelectedYearsTS("2019");
                      setOpenYearsTS(false);
                      setYearsTS(selectedYearsTS);
                    }}
                  >
                    2019
                  </li>
                  <li
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]`}
                    onClick={() => {
                      setSelectedYearsTS("2020");
                      setOpenYearsTS(false);
                      setYearsTS(selectedYearsTS);
                    }}
                  >
                    2020
                  </li>
                  <li
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]
                            `}
                    onClick={() => {
                      setSelectedYearsTS("2021");
                      setOpenYearsTS(false);
                      setYearsTS(selectedYearsTS);
                    }}
                  >
                    2021
                  </li>
                  <li
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]`}
                    onClick={() => {
                      setSelectedYearsTS("2022");
                      setOpenYearsTS(false);
                      setYearsTS(selectedYearsTS);
                    }}
                  >
                    2022
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative cursor-pointer w-[120px] font-medium text-[14px] text-secondary mt-[40px]">
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
              <div className="absolute z-10 bg-[#ebebeb] mt-2 rounded-md shadow-lg w-full">
                <ul
                  className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-auto 
                            ${openYearsTS2 ? "max-h-[240px]" : "max-h-[0]"}`}
                >
                  <li
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]
                            `}
                    onClick={() => {
                      setSelectedYearsTS2("2019");
                      setOpenYearsTS2(false);
                      setYearsTS2(selectedYearsTS2);
                    }}
                  >
                    2019
                  </li>
                  <li
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]`}
                    onClick={() => {
                      setSelectedYearsTS2("2020");
                      setOpenYearsTS2(false);
                      setYearsTS2(selectedYearsTS2);
                    }}
                  >
                    2020
                  </li>
                  <li
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]
                            `}
                    onClick={() => {
                      setSelectedYearsTS2("2021");
                      setOpenYearsTS2(false);
                      setYearsTS2(selectedYearsTS2);
                    }}
                  >
                    2021
                  </li>
                  <li
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]`}
                    onClick={() => {
                      setSelectedYearsTS2("2022");
                      setOpenYearsTS2(false);
                      setYearsTS2(selectedYearsTS2);
                    }}
                  >
                    2022
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div> */}
        {/* {GrafikD1()}
        {GrafikD1()} */}
        {/* <div className="flex gap-[50px] mt-[50px] justify-center items-center w-full">
          <div className="w-[600px]"></div>
        </div> */}
      </div>
    </div>
  );
};

export default ArsipAdam;
