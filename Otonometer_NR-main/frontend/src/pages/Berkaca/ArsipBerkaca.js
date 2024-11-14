import React, { useState, useEffect } from "react";
import map from "../../assets/icons/peta.png";
import people from "../../assets/icons/people.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../style/Components.css";
import geometry from "../../assets/6.svg";
import { element, object } from "prop-types";
// import geometry from "../../assets/5180059 (1).jpg";
const Arsipberkaca = () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  ///DROPDOWN PROVINSI D1
  const [provincess, setProvinces] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [openProvinsi, setOpenProvinsi] = useState(false);
  const [getInfoProvinsi, setGetInfoProvinsi] = useState(null);
  const [wilayahID, setWilayahID] = useState(null);
  const [isProvince, setIsProvince] = useState(true);
  useEffect(() => {
    fetch("https://api.otonometer.neracaruang.com/api/provinces")
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data.data);
      });
  }, []);

  ///DROPDOWN PROVINSI D2
  const [provincess2, setProvinces2] = useState(null);
  const [inputValue2, setInputValue2] = useState("");
  const [selected2, setSelected2] = useState("");
  const [openProvinsi2, setOpenProvinsi2] = useState(false);
  const [getInfoProvinsi2, setGetInfoProvinsi2] = useState(null);
  const [wilayahID2, setWilayahID2] = useState(null);
  const [isProvince2, setIsProvince2] = useState(true);
  useEffect(() => {
    fetch("https://api.otonometer.neracaruang.com/api/provinces")
      .then((response) => response.json())
      .then((data) => {
        setProvinces2(data.data);
      });
  }, []);

  ///DROPDOWN KOTA
  const [cities, setCity] = useState(null);
  const [inputValueofCity, setInputValueofCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [openCity, setOpenCity] = useState(false);

  ///DROPDOWN KOTA D2
  const [cities2, setCity2] = useState(null);
  const [inputValueofCity2, setInputValueofCity2] = useState("");
  const [selectedCity2, setSelectedCity2] = useState("");
  const [openCity2, setOpenCity2] = useState(false);

  ///UPDATE DATA KOTA BERDASARKAN DATA PROVINSI
  function updateKota(item, choosed, id) {
    if (item.toLowerCase() !== choosed.toLowerCase()) {
      setSelected(item);
      setOpenProvinsi(false);
      setInputValue("");
      fetch(
        "https://api.otonometer.neracaruang.com/api/cities?province_id=" + id,
      )
        .then((response) => response.json())
        .then((data) => {
          setCity(data.data);
        });
    }
  }

  //UPDATE DATA KOTA BERDASARKAN DATA PROVINSI D2
  function updateKota2(item, choosed, id) {
    if (item.toLowerCase() !== choosed.toLowerCase()) {
      setSelected2(item);
      setOpenProvinsi2(false);
      setInputValue2("");
      fetch(
        "https://api.otonometer.neracaruang.com/api/cities?province_id=" + id,
      )
        .then((response) => response.json())
        .then((data) => {
          setCity2(data.data);
        });
    }
  }

  ///UPDATE DATA LOKASI
  const [peta, setPeta] = useState(null);
  const [koordinatLokasi, setKoordinatLokasi] = useState(null);
  const [infoDaerah, setInfoDaerah] = useState(null);
  const [pinMap, setPinMap] = useState(null);
  const [dataranicon, setDataranicon] = useState(null);
  const [sektoricon, setSektoricon] = useState(null);
  const [datarannama, setDatarannama] = useState(null);
  const [sektornama, setSektornama] = useState(null);
  const [luaswilayah, setLuaswilayah] = useState(null);
  const [jumlahpenduduk, setJumlahpenduduk] = useState(null);
  ///UPDATE DATA LOKASI D2
  const [peta2, setPeta2] = useState(null);
  const [koordinatLokasi2, setKoordinatLokasi2] = useState(null);
  const [infoDaerah2, setInfoDaerah2] = useState(null);
  const [pinMap2, setPinMap2] = useState(null);
  const [dataranicon2, setDataranicon2] = useState(null);
  const [sektoricon2, setSektoricon2] = useState(null);
  const [datarannama2, setDatarannama2] = useState(null);
  const [sektornama2, setSektornama2] = useState(null);
  const [luaswilayah2, setLuaswilayah2] = useState(null);
  const [jumlahpenduduk2, setJumlahpenduduk2] = useState(null);

  var data_Penduduk = jumlahpenduduk / 1000;

  function updatePeta(wilayah_id) {
    fetch(
      "https://api.otonometer.neracaruang.com/api/wilayah-info?lang=en&wilayah_id=" +
        wilayah_id +
        "&tahun=" +
        sessionStorage.getItem("yearss"),
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        setPeta(result.data.peta);
        if (sessionStorage.getItem("namawilayah") === "Semua") {
          setDataranicon(
            "https://storage.googleapis.com/otonometer-bucket/infografis/655fb32670807.icon_geo_dattinggi.png",
          );
        } else {
          setDataranicon(result.data.dataran_icon);
        }
        setInfoDaerah(result.data.nama);
        setSektoricon(result.data.wilayah_info.sektor_icon);
        setKoordinatLokasi(result.data.longitude + ", " + result.data.latitude);
        setDatarannama(result.data.dataran_nama);
        setSektornama(result.data.wilayah_info.sektor_nama);
        setLuaswilayah(result.data.wilayah_info.luas_wilayah);
        setJumlahpenduduk(result.data.wilayah_info.jumlah_penduduk);
        setPinMap(map);
        // console.log(infoDaerah);
        // console.log(datarannama);
      });
  }
  function updatePeta2(wilayah_id) {
    fetch(
      "https://api.otonometer.neracaruang.com/api/wilayah-info?lang=en&wilayah_id=" +
        wilayah_id +
        "&tahun=" +
        sessionStorage.getItem("yearss"),
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        setPeta2(result.data.peta);
        if (sessionStorage.getItem("namawilayah2") === "Semua") {
          setDataranicon2(
            "https://storage.googleapis.com/otonometer-bucket/infografis/655fb32670807.icon_geo_dattinggi.png",
          );
        } else {
          setDataranicon2(result.data.dataran_icon);
        }
        setInfoDaerah2(result.data.nama);
        setSektoricon2(result.data.wilayah_info.sektor_icon);
        setKoordinatLokasi2(
          result.data.longitude + ", " + result.data.latitude,
        );
        setDatarannama2(result.data.dataran_nama);
        setSektornama2(result.data.wilayah_info.sektor_nama);
        setLuaswilayah2(result.data.wilayah_info.luas_wilayah);
        setJumlahpenduduk2(result.data.wilayah_info.jumlah_penduduk);
        setPinMap2(map);
        console.log(infoDaerah2);
        console.log(datarannama2);
      });
  }

  ///VARIABLE DROPDOWN TAHUN
  const [years, setYears] = useState([]);
  const [inputValueofYears, setInputValueofYears] = useState("");
  const [selectedYears, setSelectedYears] = useState("");
  const [openYears, setOpenYears] = useState(false);

  useEffect(() => {
    fetch("https://api.otonometer.neracaruang.com/api/year")
      .then((response) => response.json())
      .then((data) => {
        setYears(data.data);
        sessionStorage.setItem("yearss", data.data[1].tahun);
        sessionStorage.setItem("yearss_utak", data.data[0].tahun);
      });
  }, []);

  ///DATASET1
  const [idParent, setIdParent] = useState();
  const [parents, setParents] = useState(null);
  const [openParents, setOpenParents] = useState(false);
  const [selectedParents, setSelectedParents] = useState("");
  useEffect(() => {
    fetch("https://api.otonometer.neracaruang.com/api/filter-parent?lang=en")
      .then((response) => response.json())
      .then((data) => {
        setParents(data.data);
      });
  }, []);

  const [selectFilter, setSelectFilter] = useState(null);
  const [openSelectFilter, setOpenSelectFilter] = useState(false);
  const [selectedSelectFilter, setSelectedSelectFilter] = useState("");
  function updateParents(item, choosed, id) {
    setSelectedParents(item);
    setOpenParents(false);
    fetch(
      "https://api.otonometer.neracaruang.com/api/filter-select?parent_id=" +
        id +
        "&lang=en",
    )
      .then((response) => response.json())
      .then((data) => {
        setSelectFilter(data.data);
        // console.log("Pasti kamu memilih " + item)
        setLabelSet1([]);
      });
  }

  const [childFilter, setChildFilter] = useState("");
  const [IDchildFilter, setIDChildFilter] = useState("");

  function updateSelectFilter(item, choosed, idanak, idbunda) {
    setSelectedSelectFilter(item);
    setOpenSelectFilter(false);
    fetch(
      "https://api.otonometer.neracaruang.com/api/filter-child?satuan_id=" +
        idanak +
        "&lang=en&parent_id=" +
        idbunda,
    )
      .then((response) => response.json())
      .then((data) => {
        setChildFilter(data.data);
      });
  }
  ///DATASET2
  const [dataSet1, setDataSet1] = useState([]);
  const [labelSet1, setLabelSet1] = useState([]);
  const [labelSet2, setLabelSet2] = useState([]);
  useEffect(() => {
    console.log(dataSet1);
  }, [dataSet1]);

  useEffect(() => {
    console.log("label set 1", labelSet1);
  }, [labelSet1]);
  useEffect(() => {
    console.log("label set 2", labelSet2);
  }, [labelSet2]);

  function getDataSet1() {
    var dataset = [];
    var labels = [];
    var list = document
      .getElementById("dataset1")
      .getElementsByClassName("isSet");
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      dataset.push(item.getAttribute("value"));
      labels[item.getAttribute("value")] = item.getAttribute("labelData");
      var index = dataset.indexOf(item.getAttribute("parent"));
      if (index >= 0) {
        dataset.splice(index, 1);
        delete labels[item.getAttribute("parent")];
      }
    }
    setDataSet1(dataset);
    setLabelSet1(labels);
  }

  const [idParent2, setIdParent2] = useState();
  const [parents2, setParents2] = useState(null);
  const [openParents2, setOpenParents2] = useState(false);
  const [selectedParents2, setSelectedParents2] = useState("");
  useEffect(() => {
    fetch("https://api.otonometer.neracaruang.com/api/filter-parent?lang=en")
      .then((response) => response.json())
      .then((data) => {
        setParents2(data.data);
      });
  }, []);

  const [selectFilter2, setSelectFilter2] = useState(null);
  const [openSelectFilter2, setOpenSelectFilter2] = useState(false);
  const [selectedSelectFilter2, setSelectedSelectFilter2] = useState("");
  function updateParents2(item, choosed, id) {
    setSelectedParents2(item);
    setOpenParents2(false);
    fetch(
      "https://api.otonometer.neracaruang.com/api/filter-select?parent_id=" +
        id +
        "&lang=en",
    )
      .then((response) => response.json())
      .then((data) => {
        setSelectFilter2(data.data);
        // console.log("Pasti kamu memilih " + item)
      });
  }

  const [childFilter2, setChildFilter2] = useState("");
  const [IDchildFilter2, setIDChildFilter2] = useState("");
  function updateSelectFilter2(item, choosed, idanak, idbunda) {
    setSelectedSelectFilter2(item);
    setOpenSelectFilter2(false);
    fetch(
      "https://api.otonometer.neracaruang.com/api/filter-child?satuan_id=" +
        idanak +
        "&lang=en&parent_id=" +
        idbunda,
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("Pasti kamu memilih " + item)
        setChildFilter2(data.data);
        // console.log(data.data)
      });
  }
  const [dataChart, setDataChart] = useState([]);
  const [dataSet2, setDataSet2] = useState([]);
  var allOptions = [4, 132, 196, 214];
  useEffect(() => {
    console.log(dataSet2);
  }, [dataSet2]);

  function getDataSet2() {
    var dataset = [];
    var labels = [];
    var list = document
      .getElementById("dataset2")
      .getElementsByClassName("isSet");

    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      dataset.push(item.getAttribute("value"));
      labels[item.getAttribute("value")] = item.getAttribute("labelData");
      var index = dataset.indexOf(item.getAttribute("parent"));
      if (index >= 0) {
        dataset.splice(index, 1);
        delete labels[item.getAttribute("parent")];
      }
    }
    setDataSet2(dataset);
    setLabelSet2(labels);
    sessionStorage.setItem(
      "selectedDataBerkaca",
      JSON.stringify({
        parent_id_1Berkaca: IDchildFilter,
        dataset_1Berkaca: dataSet1,
        parent_id_2Berkaca: IDchildFilter2,
        dataset_2Berkaca: dataset,
        labelset1Berkaca: labelSet1,
        labelset2Berkaca: labels,
        namachildBerkaca: selectedSelectFilter,
        grafikTimeseriesBerkaca: dataChart,
        grafikTimeseries2Berkaca: dataChart2,
        // sumberTimeSeries: sumbernya,
        LabelnyaTimeseries_1Berkaca: labelSet1,
        LabelnyaTimeseries_2Berkaca: labels,
        // parent_id_1Berkaca2: IDchildFilter,
        // dataset_1Berkaca2: dataSet1,
        // parent_id_2Berkaca2: IDchildFilter2,
        // dataset_2Berkaca2: dataset,
        // labelset1Berkaca2: labelSet1,
        // labelset2Berkaca2: labels,
        // namachildBerkaca2: selectedSelectFilter,
        // grafikTimeseriesBerkaca2: dataChart,
        // grafikTimeseries2Berkaca2: dataChart2,
        // // sumberTimeSeries: sumbernya,
        // LabelnyaTimeseries_1Berkaca2: labelSet1,
        // LabelnyaTimeseries_2Berkaca: labels,
      }),
    );
  }

  const [dataChart2, setDataChart2] = useState([]);

  function ItemDropdown({ anaknyafilter, dropside, indexed = -1 }) {
    const [children, setChildrend] = useState([]);
    const [viewChildren, setViewChildren] = useState(false);
    // const [menu, setMenu] = useState([]);

    var menu = [];
    switch (anaknyafilter.id) {
      case 62: //transfer
        menu = [[69, 119], false, [65]];
        break;
      case 65: //lain transfer
        menu = [[69, 119], false, [62]];
        break;
      case 69: //perimbangan
        menu = [[62, 65], false, [119]];
        break;
      case 119: //lain imbang
        menu = [[62, 65], false, [69]];
        break;
      case 133: //operasi
        menu = [[151, 161], false, [140, 147, 148]];
        break;
      case 140: //modal
        menu = [[151, 161], false, [133, 147, 148]];
        break;
      case 147: //tak terduga
        menu = [[151, 161], false, [133, 140, 148]];
        break;
      case 148: //belanja trf
        menu = [[151, 161], false, [140, 147, 133]];
        break;
      case 151: //b.tidak langsung
        menu = [[133, 140, 147, 148], false, [161]];
        break;
      case 161: //b. langsung
        menu = [[133, 140, 147, 148], false, [151]];
        break;
      case 166:
        menu = [[173], false, [166]];
        break;
      case 173:
        menu = [[166], false, [173]];
        break;
      case 233:
        menu = [[250, 267], false, [233]];
        break;
      case 250:
        menu = [[233], false, [267]];
        break;
      case 267:
        menu = [[233], false, [250]];
        break;
      //disable operasi, modal, tak terduga, belanja TRF
      //disable b. tidak langsung b. lansung
      //disable penerimaan
      //disable pengeluaran
      //pembiayaan sama statistik tidak pake semua
      //disable semua umur ketika dipilih laki laki / perempuan
    }
    useEffect(() => {
      fetch(
        `https://api.otonometer.neracaruang.com/api/filter-child?satuan_id=1&lang=en&parent_id=${anaknyafilter.id}`,
      )
        .then((response) => response.json())
        .then((result) => {
          // console.log("is province :"+isProvince)
          var list = [];
          result.data.map((item) => {
            if (item.flagging == "all") {
              list.push(item);
            }
            if (item.flagging == "province") {
              if (isProvince) {
                list.push(item);
              }
            }
          });
          setChildrend(list);
        });
    }, []);

    function showChildren(elm, target, id, menu = []) {
      console.log(elm.checked);
      console.log(id);
      if (elm.checked) {
        setViewChildren(true);
        if (menu.length > 0) {
          menu[0].forEach((item) => {
            document.getElementById(`${dropside}_checkbox_${item}`).checked =
              menu[1];
            document.getElementById(`${dropside}_checkbox_${item}`).disabled =
              true;
          });
        }
      } else {
        setViewChildren(false);
        if (menu.length > 0) {
          menu[0].forEach((item) => {
            var status = false;
            var index = 0;
            while (!status && index < menu[2].length) {
              status = document.getElementById(
                `${dropside}_checkbox_${menu[2][index]}`,
              ).checked;
              index++;
            }

            if (status) {
              document.getElementById(`${dropside}_checkbox_${item}`).checked =
                menu[1];
              document.getElementById(`${dropside}_checkbox_${item}`).disabled =
                true;
            } else {
              document.getElementById(`${dropside}_checkbox_${item}`).checked =
                menu[1];
              document.getElementById(`${dropside}_checkbox_${item}`).disabled =
                false;
            }
          });
        }
      }
    }
    return (
      <>
        <div className="flex justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`${dropside}_checkbox_${anaknyafilter?.id}`}
              name={anaknyafilter?.nama}
              labelData={anaknyafilter?.nama}
              class={viewChildren ? "isSet anakan" : "anakan"}
              value={anaknyafilter?.id}
              parent={anaknyafilter?.id_parent}
              onChange={(e) =>
                showChildren(
                  e.target,
                  `children_${anaknyafilter?.id}`,
                  anaknyafilter?.id,
                  menu,
                )
              }
            />
            <label htmlFor={anaknyafilter?.id} className="ml-[5px]">
              {anaknyafilter?.nama}
            </label>
          </div>
          {children.length > 0 && (
            <div>
              <FontAwesomeIcon
                icon={faChevronDown}
                color="white"
                className={`text-right ml-[20px] w-[10px] h-[20px] ${
                  viewChildren && "rotate-180"
                }`}
              />
            </div>
          )}
        </div>
        {viewChildren && (
          <div className="flex flex-col" id={`children_${anaknyafilter?.id}`}>
            {children.map((child) => (
              <div className="ms-2">
                <ItemDropdown anaknyafilter={child} dropside={dropside} />
              </div>
            ))}
          </div>
        )}
      </>
    );
  }
  function allCondition(elm, type, targetElm = "") {
    var target = document.getElementById(targetElm);

    //jika terpilih semua
    if (target.checked) {
      if (type == 1) {
        // dataset 1
        //untuk unchecklist anakan yang udah terpilih
        var element = document
          .getElementById("dataset1")
          .getElementsByClassName("isSet");
        for (var i = 0; i < element.length; i++) {
          element[i].click();
        }

        //untuk mendisable seluruh anakan
        var targetDisable = document
          .getElementById("dataset1")
          .getElementsByClassName("anakan");
        for (var i = 0; i < targetDisable.length; i++) {
          targetDisable[i].checked = false;
          targetDisable[i].disabled = true;
        }
      } else {
        //dataset 2
        //untuk unchecklist anakan yang udah terpilih
        var element = document
          .getElementById("dataset2")
          .getElementsByClassName("isSet");
        for (var i = 0; i < element.length; i++) {
          element[i].click();
        }

        //untuk mendisable seluruh anakan
        var targetDisable = document
          .getElementById("dataset2")
          .getElementsByClassName("anakan");
        for (var i = 0; i < targetDisable.length; i++) {
          targetDisable[i].checked = false;
          targetDisable[i].disabled = true;
        }
      }
    } else {
      if (type == 1) {
        //dataset 1
        var element = document
          .getElementById("dataset1")
          .getElementsByClassName("anakan");
        console.log(element);
        for (var i = 0; i < element.length; i++) {
          element[i].checked = false;
          element[i].disabled = false;
        }
      } else {
        //dataset 2
        var element = document
          .getElementById("dataset2")
          .getElementsByClassName("anakan");
        console.log(element);
        for (var i = 0; i < element.length; i++) {
          element[i].checked = false;
          element[i].disabled = false;
        }
      }
    }
  }
  return (
    <div className="flex flex-col mb-[150px] justify-start items-center max-lg:[1920px] mt-[130px]">
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
      {/* FETCHING TAHUN */}
      <div className="w-[140px] h-auto text-secondary font-medium text-[14px] cursor-pointer mt-[40px]">
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
            className={`ml-[40px] w-[10px] h-[20px] ${
              openYears && "rotate-180"
            }`}
          />
        </div>
        <img
          src={geometry}
          alt=""
          className="fixed w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10 opacity-5"
        />
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
                  tahunn?.tahun?.toLowerCase().startsWith(inputValueofYears)
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
                  sessionStorage.setItem("yearss", tahunn?.tahun);
                  sessionStorage.setItem("yearss_utak", tahunn?.tahun);
                  updatePeta(wilayahID);
                }
              }}
            >
              {tahunn?.tahun}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-x-[190px] mt-[20px]">
        <div className="flex flex-col">
          {/* PROVINSI PERTAMA */}
          <p className="font-bold text-center text-secondary">Daerah 1</p>
          <div className="flex flex-col mt-[20px]">
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
                      sessionStorage.setItem("idprovinsi", provinces.id);
                      sessionStorage.setItem("idprovinsi_utak", provinces.id);
                      sessionStorage.setItem("namaprovinsi", provinces.nama);
                      sessionStorage.setItem(
                        "namaprovinsi_utak",
                        provinces.nama,
                      );
                      setGetInfoProvinsi(provinces.id);
                      setWilayahID(provinces.id);
                      sessionStorage.setItem("idwilayah", provinces.id);
                      sessionStorage.setItem("idwilayah_utak", provinces.id);
                      sessionStorage.setItem("namawilayah", "Semua");
                      sessionStorage.setItem("namawilayah_utak", "Semua");
                      setInfoDaerah("Semua");
                      setSelectedCity("Semua");
                      setDataranicon("Semua");
                      setSelectedYears(sessionStorage.getItem("yearss"));
                      updatePeta(provinces.id);
                      setIsProvince(true);
                    }}
                  >
                    {provinces?.nama}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* KOTA PERTAMA */}
          <div className="flex flex-col justify-end items-end">
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
                    sessionStorage.setItem("namawilayah", "Semua");
                    sessionStorage.setItem("namawilayah_utak", "Semua");
                    setInfoDaerah("Semua");
                    // console.log(infoDaerah);
                    setSelectedCity("Semua");
                    setDataranicon("Semua");
                    setWilayahID(getInfoProvinsi);
                    sessionStorage.setItem("idwilayah", getInfoProvinsi);
                    setSelectedYears(sessionStorage.getItem("yearss"));
                    updatePeta(getInfoProvinsi);
                    setOpenCity(false);
                    setIsProvince(true);
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
                  regencies?.nama?.toLowerCase().startsWith(inputValueofCity)
                    ? "block"
                    : "hidden"
                }`}
                    onClick={() => {
                      if (
                        regencies?.nama?.toLowerCase() !==
                        selectedCity.toLowerCase()
                      ) {
                        sessionStorage.setItem("namawilayah", regencies.nama);
                        sessionStorage.setItem(
                          "namawilayah_utak",
                          regencies.nama,
                        );
                        setSelectedCity(regencies?.nama);
                        sessionStorage.setItem("idkota", regencies.id);
                        sessionStorage.setItem("idkota_utak", regencies.id);
                        sessionStorage.setItem("namakota", regencies.nama);
                        sessionStorage.setItem("namakota_utak", regencies.nama);
                        setOpenCity(false);
                        setInputValueofCity("");
                        updatePeta(regencies.id);
                        setWilayahID(regencies.id);
                        sessionStorage.setItem("idwilayah", regencies.id);
                        setSelectedYears(sessionStorage.getItem("yearss"));
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
        </div>

        <div className="flex flex-col">
          {/* PROVINSI KEDUA */}
          <p className="font-bold text-center text-secondary">Daerah 2</p>
          <div className="flex flex-col mt-[20px]">
            <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
              <div
                onClick={() => setOpenProvinsi2(!openProvinsi2)}
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
                  provinces2?.nama?.toLowerCase() === selected2?.toLowerCase() &&
                  "bg-secondary text-white"
                }
                ${
                  provinces2?.nama?.toLowerCase().startsWith(inputValue2)
                    ? "block"
                    : "hidden"
                }`}
                    onClick={() => {
                      updateKota2(provinces2?.nama, selected2, provinces2.id);
                      sessionStorage.setItem("idprovinsi2", provinces2.id);
                      sessionStorage.setItem("idprovinsi_utak2", provinces2.id);
                      sessionStorage.setItem("namaprovinsi2", provinces2.nama);
                      sessionStorage.setItem(
                        "namaprovinsi_utak2",
                        provinces2.nama,
                      );
                      setGetInfoProvinsi2(provinces2.id);
                      setWilayahID2(provinces2.id);
                      sessionStorage.setItem("idwilayah2", provinces2.id);
                      sessionStorage.setItem("idwilayah_utak2", provinces2.id);
                      sessionStorage.setItem("namawilayah2", "Semua");
                      sessionStorage.setItem("namawilayah_utak2", "Semua");
                      setInfoDaerah2("Semua");
                      setSelectedCity2("Semua");
                      setDataranicon2("Semua");
                      setSelectedYears(sessionStorage.getItem("yearss"));
                      updatePeta2(provinces2.id);
                      setIsProvince2(true);
                    }}
                  >
                    {provinces2?.nama}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* KOTA KEDUA */}
          <div className="flex flex-col justify-end items-end">
            <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
              <div
                onClick={() => {
                  setOpenCity2(!openCity2);
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
                <li
                  className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary
                ${
                  "semua" === selectedCity2?.toLowerCase() &&
                  "bg-secondary text-white"
                }
                `}
                  onClick={() => {
                    sessionStorage.setItem("namawilayah2", "Semua");
                    sessionStorage.setItem("namawilayah_utak2", "Semua");
                    setInfoDaerah2("Semua");
                    // console.log(infoDaerah);
                    setSelectedCity2("Semua");
                    setDataranicon2("Semua");
                    setWilayahID2(getInfoProvinsi2);
                    sessionStorage.setItem("idwilayah2", getInfoProvinsi2);
                    setSelectedYears(sessionStorage.getItem("yearss"));
                    updatePeta2(getInfoProvinsi2);
                    setOpenCity2(false);
                    setIsProvince2(true);
                  }}
                >
                  Semua
                </li>
                {cities2?.map((regencies2) => (
                  <li
                    key={regencies2?.nama}
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                ${
                  regencies2?.nama?.toLowerCase() ===
                    selectedCity2?.toLowerCase() && "bg-secondary text-white"
                }
                ${
                  regencies2?.nama?.toLowerCase().startsWith(inputValueofCity2)
                    ? "block"
                    : "hidden"
                }`}
                    onClick={() => {
                      if (
                        regencies2?.nama?.toLowerCase() !==
                        selectedCity2.toLowerCase()
                      ) {
                        sessionStorage.setItem("namawilayah2", regencies2.nama);
                        sessionStorage.setItem(
                          "namawilayah_utak2",
                          regencies2.nama,
                        );
                        setSelectedCity2(regencies2?.nama);
                        sessionStorage.setItem("idkota2", regencies2.id);
                        sessionStorage.setItem("idkota_utak2", regencies2.id);
                        sessionStorage.setItem("namakota2", regencies2.nama);
                        sessionStorage.setItem(
                          "namakota_utak2",
                          regencies2.nama,
                        );
                        setOpenCity2(false);
                        setInputValueofCity2("");
                        updatePeta2(regencies2.id);
                        setWilayahID2(regencies2.id);
                        sessionStorage.setItem("idwilayah2", regencies2.id);
                        // setSelectedYears(sessionStorage.getItem("yearss"));
                        setIsProvince2(false);
                      }
                    }}
                  >
                    {regencies2?.nama}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden xl:block">
        <div className="flex gap-x-[80px] my-[20px]">
          {/* DAERAH1 */}
          <div className="flex flex-col items-center justify-center">
            <img
              src={peta}
              alt=""
              className="flex items-center w-80 mb-[40px] mt-[20px]"
            />
            <div className="flex justify-center items-center gap-x-[20px]">
              <img src={pinMap} alt="" className="flex w-6" />
              <div className="text-secondary">
                <h1 className="text-[16px] font-bold">{infoDaerah}</h1>
                <p className="font-semibold text-[14px]">{koordinatLokasi}</p>
              </div>
            </div>
            <div className="flex gap-[40px] mt-[40px] mb-[20px] ml-[40px]">
              <div className="text-[16px] text-secondary mt-[5px]">
                <p className="font-bold">
                  {Math.round(luaswilayah).toLocaleString().replace(/,/g, ".")}
                </p>
                <p className="font-regular">km²</p>
              </div>
              <div className="flex gap-[10px]">
                <div className="hover-container">
                  <img src={dataranicon} alt="" className="w-[60px]" />
                  <span className="hover-text w-[150%] mb-[10px]">
                    {datarannama}
                  </span>
                </div>
                <a href="/Utak-Atik-Profil">
                  <img src={people} alt="" className="w-[60px]" />
                </a>
                <div className="hover-container">
                  <img src={sektoricon} alt="" className="w-[60px]" />
                  <span className="hover-text w-[150%] mb-[10px]">
                    {sektornama}
                  </span>
                </div>
              </div>
              <div className="text-[16px] text-secondary mt-[5px]">
                <p className="font-bold">
                  {Math.round(data_Penduduk)
                    .toLocaleString()
                    .replace(/,/g, ".")}
                </p>
                <p className="font-regular">10³ Jiwa</p>
              </div>
            </div>
          </div>
          {/* DAERAH2 */}
          <div className="flex flex-col items-center justify-center">
            <img
              src={peta2}
              alt=""
              className="flex items-center w-80 mb-[40px] mt-[20px]"
            />
            <div className="flex justify-center items-center gap-x-[20px]">
              <img src={pinMap2} alt="" className="flex w-6" />
              <div className="text-secondary">
                <h1 className="text-[16px] font-bold">{infoDaerah2}</h1>
                <p className="font-semibold text-[14px]">{koordinatLokasi2}</p>
              </div>
            </div>
            <div className="flex gap-[40px] mt-[40px] mb-[20px] ml-[40px]">
              <div className="text-[16px] text-secondary mt-[5px]">
                <p className="font-bold">
                  {Math.round(luaswilayah2).toLocaleString().replace(/,/g, ".")}
                </p>
                <p className="font-regular">km²</p>
              </div>
              <div className="flex gap-[10px]">
                <div className="hover-container">
                  <img src={dataranicon2} alt="" className="w-[60px]" />
                  <span className="hover-text w-[150%] mb-[10px]">
                    {datarannama2}
                  </span>
                </div>
                <a href="/Utak-Atik-Profil">
                  <img src={people} alt="" className="w-[60px]" />
                </a>
                <div className="hover-container">
                  <img src={sektoricon2} alt="" className="w-[60px]" />
                  <span className="hover-text w-[150%] mb-[10px]">
                    {sektornama2}
                  </span>
                </div>
              </div>
              <div className="text-[16px] text-secondary mt-[5px]">
                <p className="font-bold">
                  {Math.round(data_Penduduk)
                    .toLocaleString()
                    .replace(/,/g, ".")}
                </p>
                <p className="font-regular">10³ Jiwa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {/* DROPDOWN DATASET 1 */}
        <div id="dataset1" className="gap-[100px] mt-[40px] h-auto">
          <h1 className="text-secondary text-[14px] font-semibold ml-[45px]">
            DATASET 1
          </h1>
          <div className="flex gap-x-[20px]">
            <div className="w-[167px] h-auto rounded-[10px] text-white border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg mt-[10px] mb-[10px] cursor-pointer">
              <div
                onClick={() => setOpenParents(!openParents)}
                className="bg-secondary w-full p-2 px-[20px] flex items-center justify-between rounded-[10px]"
              >
                {selectedParents
                  ? selectedParents?.length > 20
                    ? selectedParents?.substring(0, 20) + "..."
                    : selectedParents
                  : "Pilih"}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color="white"
                  className={`ml-[20px] w-[10px] h-[20px] ${
                    openParents && "rotate-180"
                  }`}
                />
              </div>
              <ul
                className={`bg-secondary mt-2 rounded-[10px] max-h-60 overflow-y-auto
                    ${openParents ? "max-h-[240px]" : "max-h-[0]"}`}
              >
                <li
                  className="p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-center"
                  onClick={() => {
                    updateParents(null, null, null);
                    setIdParent(null);
                    document
                      .getElementById("anakanparent")
                      .classList.add("hidden");
                    document
                      .getElementById("anakanfilter")
                      .classList.add("hidden");
                  }}
                >
                  Pilih
                </li>
                {parents?.map((parentnya) => (
                  <li
                    key={parentnya?.id}
                    className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-center`}
                    onClick={() => {
                      updateParents(
                        parentnya.nama,
                        selectedParents,
                        parentnya.id,
                      );
                      sessionStorage.setItem("idParent", parentnya.id);
                      sessionStorage.setItem("namaParent", parentnya.nama);
                      sessionStorage.setItem("namaParent1", parentnya.nama);
                      setIdParent(parentnya.id);
                      if (parentnya.id !== null) {
                        document
                          .getElementById("anakanparent")
                          .classList.remove("hidden");
                      }
                      // console.log(parentnya.id);
                    }}
                  >
                    {parentnya?.nama}
                  </li>
                ))}
              </ul>
              {/* DROPDOWN ANAKAN PARENT */}
              <div
                id="anakanparent"
                className="hidden w-[167px] h-auto rounded-[10px] text-white border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg mt-[10px] mb-[10px] cursor-pointer"
              >
                <div
                  onClick={() => {
                    setOpenSelectFilter(!openSelectFilter);
                    //untuk unchecklist pilihan semua
                    var targetSemua = document
                      .getElementById("dataset1")
                      .getElementsByClassName("semuaDataSet");
                    for (var i = 0; i < targetSemua.length; i++) {
                      targetSemua[i].checked = false;
                    }
                  }}
                  className="bg-third w-full p-2 px-[20px] flex items-center justify-between rounded-[10px]"
                >
                  {selectedSelectFilter
                    ? selectedSelectFilter?.length > 20
                      ? selectedSelectFilter?.substring(0, 20) + "..."
                      : selectedSelectFilter
                    : "Pilih"}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    color="white"
                    className={`ml-[20px] w-[10px] h-[20px] ${
                      openSelectFilter && "rotate-180"
                    }`}
                  />
                </div>
                <ul
                  className={`bg-third mt-2 rounded-[10px] max-h-60 overflow-y-auto
                      ${openSelectFilter ? "max-h-[240px]" : "max-h-[0]"}`}
                >
                  <li
                    className="p-2 text-[12px] hover:bg-[#a4b6b9] hover:text-secondary rounded-[10px] text-center"
                    onClick={() => {
                      updateParents(null, null, null);
                      document
                        .getElementById("anakanparent")
                        .classList.add("hidden");
                      document
                        .getElementById("anakanfilter")
                        .classList.add("hidden");
                    }}
                  >
                    Pilih
                  </li>
                  {selectFilter?.map((filternya) => (
                    <li
                      key={filternya?.id}
                      className={`p-2 text-[12px] hover:bg-[#a4b6b9] hover:text-secondary rounded-[10px] text-center`}
                      onClick={() => {
                        updateSelectFilter(
                          filternya.nama,
                          selectedSelectFilter,
                          idParent,
                          filternya.id,
                        );
                        // setIdParent2(filternya.id);
                        // console.log(filternya.id);
                        setIDChildFilter(filternya.id);
                        var label = [];
                        label[filternya.id] = filternya.nama;
                        setLabelSet1(label);
                        if (filternya.id !== null) {
                          document
                            .getElementById("anakanfilter")
                            .classList.remove("hidden");
                        }

                        //untuk unchecklist pilihan semua
                        var targetSemua = document
                          .getElementById("dataset1")
                          .getElementsByClassName("semuaDataSet");
                        for (var i = 0; i < targetSemua.length; i++) {
                          targetSemua[i].checked = false;
                        }
                      }}
                    >
                      {filternya?.nama}
                    </li>
                  ))}
                </ul>
              </div>
              <div id="anakanfilter" className="hidden w-auto mt-[10px]">
                <div className="bg-secondary p-[10px] rounded-[10px] text-white max-h-[250px] overflow-y-scroll mini-scrollbar">
                  {Array.isArray(childFilter) && childFilter.length > 0 ? (
                    childFilter.map((anaknyafilter, index) =>
                      index == 0 &&
                      allOptions.indexOf(anaknyafilter.id_parent) >= 0 ? (
                        <>
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id={`ds1_all_${anaknyafilter.id_parent}`}
                                class="semuaDataSet"
                                onClick={(e) =>
                                  allCondition(
                                    e.target,
                                    1,
                                    `ds1_all_${anaknyafilter.id_parent}`,
                                  )
                                }
                              />
                              <label className="ml-[5px]">Semua</label>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <ItemDropdown
                              anaknyafilter={anaknyafilter}
                              dropside={1}
                              indexed={index}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col">
                          <ItemDropdown
                            anaknyafilter={anaknyafilter}
                            dropside={1}
                            indexed={index}
                          />
                        </div>
                      ),
                    )
                  ) : (
                    <p>No child filters available</p>
                  )}
                  <div>
                    <button
                      onClick={() => {
                        document
                          .getElementById("dataset1")
                          .classList.add("hidden");
                        document
                          .getElementById("dataset2")
                          .classList.remove("hidden");
                        if (
                          document.getElementById(
                            `ds1_all_${IDchildFilter}`,
                          ) !== null
                        ) {
                          if (
                            !document.getElementById(`ds1_all_${IDchildFilter}`)
                              .checked
                          ) {
                            getDataSet1();
                          } else {
                            setDataSet1("semua");
                          }
                        } else {
                          getDataSet1();
                        }
                      }}
                      className="
                        mt-[25px]
                        flex 
                        bg-[#24445A] 
                        border-third
                        border-2
                        hover:bg-[#86BBD8] 
                        w-[105px] h-[39px] 
                        rounded-[10px] 
                        text-white 
                        items-center justify-center mx-auto"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* DROPDOWN DATASET 2 */}
        <div id="dataset2" className="hidden gap-[100px] mt-[40px] h-auto">
          <div>
            <h1 className="text-secondary text-[14px] font-semibold ml-[45px]">
              DATASET 2
            </h1>
            <div className="flex gap-x-[20px]">
              <div className="w-[167px] h-auto rounded-[10px] text-white border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg mt-[10px] mb-[10px] cursor-pointer">
                <div
                  onClick={() => setOpenParents2(!openParents2)}
                  className="bg-secondary w-full p-2 px-[20px] flex items-center justify-between rounded-[10px]"
                >
                  {selectedParents2
                    ? selectedParents2?.length > 20
                      ? selectedParents2?.substring(0, 20) + "..."
                      : selectedParents2
                    : "Pilih"}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    color="white"
                    className={`ml-[20px] w-[10px] h-[20px] ${
                      openParents2 && "rotate-180"
                    }`}
                  />
                </div>
                <ul
                  className={`bg-secondary mt-2 rounded-[10px] max-h-60 overflow-y-auto
                  ${openParents2 ? "max-h-[240px]" : "max-h-[0]"}`}
                >
                  <li
                    className="p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-center"
                    onClick={() => {
                      updateParents2(null, null, null);
                      setIdParent2(null);
                      document
                        .getElementById("anakanparent2")
                        .classList.add("hidden");
                      document
                        .getElementById("anakanfilter2")
                        .classList.add("hidden");
                    }}
                  >
                    Pilih
                  </li>
                  {parents2?.map((parentnya) => (
                    <li
                      key={parentnya?.id}
                      className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-center`}
                      onClick={() => {
                        updateParents2(
                          parentnya.nama,
                          selectedParents2,
                          parentnya.id,
                        );
                        sessionStorage.setItem("idParent", parentnya.id);
                        sessionStorage.setItem("namaParent", parentnya.nama);
                        sessionStorage.setItem("namaParent2", parentnya.nama);
                        setIdParent2(parentnya.id);
                        if (parentnya.id !== null) {
                          document
                            .getElementById("anakanparent2")
                            .classList.remove("hidden");
                        }
                        // console.log(parentnya.id);
                      }}
                    >
                      {parentnya?.nama}
                    </li>
                  ))}
                </ul>
                {/* DROPDOWN ANAKAN PARENT */}
                <div
                  id="anakanparent2"
                  className="hidden w-[167px] h-auto rounded-[10px] text-white border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg mt-[10px] mb-[10px] cursor-pointer"
                >
                  <div
                    onClick={() => {
                      setOpenSelectFilter2(!openSelectFilter2);
                      //untuk unchecklist pilihan semua
                      var targetSemua = document
                        .getElementById("dataset2")
                        .getElementsByClassName("semuaDataSet");
                      for (var i = 0; i < targetSemua.length; i++) {
                        targetSemua[i].checked = false;
                      }
                    }}
                    className="bg-third w-full p-2 px-[20px] flex items-center justify-between rounded-[10px]"
                  >
                    {selectedSelectFilter2
                      ? selectedSelectFilter2?.length > 20
                        ? selectedSelectFilter2?.substring(0, 20) + "..."
                        : selectedSelectFilter2
                      : "Pilih"}
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      color="white"
                      className={`ml-[20px] w-[10px] h-[20px] ${
                        openSelectFilter2 && "rotate-180"
                      }`}
                    />
                  </div>
                  <ul
                    className={`bg-third mt-2 rounded-[10px] max-h-60 overflow-y-auto
                      ${openSelectFilter2 ? "max-h-[240px]" : "max-h-[0]"}`}
                  >
                    <li
                      className="p-2 text-[12px] hover:bg-[#a4b6b9] hover:text-secondary rounded-[10px] text-center"
                      onClick={() => {
                        updateParents2(null, null, null);
                        setIdParent2(null);
                        document
                          .getElementById("anakanparent2")
                          .classList.add("hidden");
                        document
                          .getElementById("anakanfilter2")
                          .classList.add("hidden");
                      }}
                    >
                      Pilih
                    </li>
                    {selectFilter2?.map((filternya) => (
                      <li
                        key={filternya?.id}
                        className={`p-2 text-[12px] hover:bg-[#a4b6b9] hover:text-secondary rounded-[10px] text-center`}
                        onClick={() => {
                          updateSelectFilter2(
                            filternya.nama,
                            selectedSelectFilter2,
                            idParent2,
                            filternya.id,
                          );
                          setIDChildFilter2(filternya.id);
                          var label = [];
                          label[filternya.id] = filternya.nama;
                          setLabelSet2(label);
                          // console.log(filternya.id);
                          if (filternya.id !== null) {
                            document
                              .getElementById("anakanfilter2")
                              .classList.remove("hidden");
                          }

                          //untuk unchecklist pilihan semua
                          var targetSemua = document
                            .getElementById("dataset2")
                            .getElementsByClassName("semuaDataSet");
                          for (var i = 0; i < targetSemua.length; i++) {
                            targetSemua[i].checked = false;
                          }
                        }}
                      >
                        {filternya?.nama}
                      </li>
                    ))}
                  </ul>
                </div>
                <div id="anakanfilter2" className="hidden w-auto mt-[10px]">
                  <div className="bg-secondary p-[10px] rounded-[10px] text-white max-h-[250px] overflow-y-scroll mini-scrollbar">
                    {Array.isArray(childFilter2) && childFilter2.length > 0 ? (
                      childFilter2.map((anaknyafilter2, index) =>
                        index == 0 &&
                        allOptions.indexOf(anaknyafilter2.id_parent) >= 0 ? (
                          <>
                            <div className="flex justify-between">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`ds2_all_${anaknyafilter2.id_parent}`}
                                  class="semuaDataSet"
                                  onClick={(e) =>
                                    allCondition(
                                      e.target,
                                      2,
                                      `ds2_all_${anaknyafilter2.id_parent}`,
                                    )
                                  }
                                />
                                <label className="ml-[5px]">Semua</label>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <ItemDropdown
                                anaknyafilter={anaknyafilter2}
                                dropside={1}
                                indexed={index}
                              />
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col">
                            <ItemDropdown
                              anaknyafilter={anaknyafilter2}
                              dropside={1}
                              indexed={index}
                            />
                          </div>
                        ),
                      )
                    ) : (
                      <p>No child filters available</p>
                    )}
                    <div>
                      <button
                        onClick={() => {
                          document
                            .getElementById("dataset2")
                            .classList.add("hidden");

                          if (
                            document.getElementById(
                              `ds2_all_${IDchildFilter}`,
                            ) !== null
                          ) {
                            if (
                              !document.getElementById(
                                `ds2_all_${IDchildFilter}`,
                              ).checked
                            ) {
                              getDataSet2();
                            } else {
                              setDataSet2("semua");
                            }
                          } else {
                            getDataSet2();
                          }
                          window.location.href = "/Berkacatimeseries";
                        }}
                        className="
                        mt-[25px]
                        flex 
                        bg-[#24445A] 
                        border-third
                        border-2
                        hover:bg-[#86BBD8] 
                        w-[105px] h-[39px] 
                        rounded-[10px] 
                        text-white 
                        items-center justify-center mx-auto"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arsipberkaca;
