import React, { useState, useEffect, useRef } from "react";
import map from "../../assets/icons/peta.png";
import people from "../../assets/icons/people.png";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import jelajahTandaTanya from "../../assets/jelajahtandatanya.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faBookBookmark,
  faChevronDown,
  faDownload,
  faEye,
  faFilePdf,
  faSearch,
  faSearchLocation,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import bulat from "../../assets/circ.svg";
import "../../style/Switchbtn.css";
import "../../style/Components.css";
import Swal from "sweetalert2";
const Jelajahmain = () => {
  const [idMember, setIdMember] = useState(null);
  const [tokenUser, setTokenUser] = useState(sessionStorage.getItem("token"));

  // const [totalDownload, setTotalDownload] = useState();
  // const [totalShare, setTotalShare] = useState();
  // const [totalSave, setTotalSave] = useState();

  ///GET INFO PROFILE USER

  useEffect(() => {
    const xhr_profile = new XMLHttpRequest();
    if (tokenUser !== null) {
      xhr_profile.onload = function () {
        const data_profile = JSON.parse(xhr_profile.responseText).data;
        setIdMember(data_profile.id)
      };
    }
    xhr_profile.open("GET", process.env.REACT_APP_URL_API + "/profile", true);
    xhr_profile.setRequestHeader("Authorization", "Bearer " + tokenUser);
    xhr_profile.send();
  }, [tokenUser]);


  const [activeTab, setActiveTab] = useState("provinsi");


  const toggleTab = () => {
    setActiveTab((prevTab) => (prevTab === "provinsi" ? "nasional" : "provinsi"));
  };

  const SwitchBtn = ({ switcher, setSwitcher }) => (
    <div id="switchernya" className="switch">
      <input
        type="checkbox"
        id="toggle"
        checked={switcher === "provinsi"}
        onChange={()=>{setSwitcher()
          if(sessionStorage.getItem("historyTipePeringkat") !== null){
            sessionStorage.removeItem("historyTipePeringkat");
          }
        }}
      />
      <label htmlFor="toggle" className="slider"></label>
    </div>
  );

  const [years, setYears] = useState([]);
  const [inputValueofYears, setInputValueofYears] = useState("");
  const [selectedYears, setSelectedYears] = useState("");
  const [openYears, setOpenYears] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API + "/year")
      .then((response) => response.json())
      .then((data) => {
        if (sessionStorage.getItem("yearss") === null) {
          sessionStorage.setItem("yearss", data.data[1].tahun);
        }
        setYears(data.data);
      });
  }, [sessionStorage.getItem("yearss")]);

  useEffect(() => {
    const selectedYear = sessionStorage.getItem("yearss");
    if (selectedYear) {
      setSelectedYears(selectedYear);
    }
  }, [sessionStorage.getItem("yearss")]);
  const [selectedButton, setSelectedButton] = useState(null);

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
    fetch(process.env.REACT_APP_URL_API + "/provinces")
      .then((response) => response.json())
      .then((data) => {
        if (sessionStorage.getItem("idprovinsi") === null && sessionStorage.getItem("namaprovinsi") === null) {
          setProvinces(data.data);
          document.getElementById("kondisiLogin").classList.add("hidden")
          document.getElementById("kondisiNonLogin").classList.remove("hidden")
        } else {
          setProvinces(data.data);
          updateSektor();
          document.getElementById("kondisiLogin").classList.remove("hidden")
          document.getElementById("kondisiNonLogin").classList.add("hidden")
        }
      });
  }, []);
  
  useEffect(()=>{
    if(sessionStorage.getItem("historyTipePeringkat") !== null && is_province == false){
      if(sessionStorage.getItem("historyTipePeringkat") == "NASIONAL"){
        setActiveTab("nasional")
      }else{
        setActiveTab("provinsi")
      }
    }
  },[activeTab, is_province])

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
        process.env.REACT_APP_URL_API + "/cities?province_id=" +
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
        process.env.REACT_APP_URL_API + "/cities?province_id=" + id
      )
        .then((response) => response.json())
        .then((data) => {
          setCity(data.data);
        });
    }
  }


  //   useEffect(() => {
  //   fetch(process.env.REACT_APP_URL_API+"/api/v1/provinces")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProvinces(data.data);
  //       if(sessionStorage.getItem("idprovinsi")){
  //         setWilayahID(sessionStorage.getItem("idprovinsi"));
  //         updateKota(sessionStorage.getItem("namaprovinsi"), selected ,sessionStorage.getItem("idprovinsi"))
  //         updatePeta(sessionStorage.getItem("idprovinsi"));
  //         askIsProvince(true)
  //         setActiveTab("provinsi");
  //         // document.getElementById("peringkatnyadaerah").classList.remove("hidden")
  //         // document.getElementById("switchernya").classList.add("hidden")
  //         // document.getElementById("dropdownDataset").classList.remove("invisible")
  //         // document.getElementById("informasiDaerahnya").classList.remove("invisible")
  //       }
  //     });
  // }, []);

  //   useEffect(() => {
  //   fetch(process.env.REACT_APP_URL_API+"/api/v1/cities?province_id=" + sessionStorage.getItem("idkota"))
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCity(data.data);
  //       if(sessionStorage.getItem("idkota")!==null){
  //         setSelectedCity(sessionStorage.getItem("namakota"));
  //         setWilayahID(sessionStorage.getItem("idkota"));
  //         updatePeta(sessionStorage.getItem("idkota"));
  //         askIsProvince(false);
  //         // document.getElementById("peringkatnyadaerah").classList.remove("hidden")
  //         // document.getElementById("switchernya").classList.remove("hidden")
  //         // document.getElementById("dropdownDataset").classList.remove("invisible")
  //         // document.getElementById("informasiDaerahnya").classList.remove("invisible")
  //       }
  //     });
  // }, []);
  // useEffect(() => {
  //   if (sessionStorage.getItem("idprovinsi") !== null) {
  //     fetch(
  //       process.env.REACT_APP_URL_API+"/api/v1/cities?province_id=" +
  //         sessionStorage.getItem("idprovinsi")
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setCity(data.data);
  //       });
  //   }
  // }, [sessionStorage.getItem("idprovinsi")]);

  // useEffect(() => {
  //   fetch(process.env.REACT_APP_URL_API+"/api/v1/year")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setYears(data.data);
  //     });
  // }, []);

  ///FETCHING DROPDOWN TAHUN

  // useEffect(() => {
  //   if (sessionStorage.getItem("idkota") !== null) {
  //     updatePeta(sessionStorage.getItem("idkota"));
  //     updateSektor();
  //   }
  // }, []);

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

  // useEffect(() => {
  //   fetch(process.env.REACT_APP_URL_API+"/api/v1/provinces")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProvinces(data.data);
  //       if(sessionStorage.getItem("idprovinsi")){
  //         setWilayahID(sessionStorage.getItem("idprovinsi"));
  //         updateKota(sessionStorage.getItem("namaprovinsi"), selected ,sessionStorage.getItem("idprovinsi"))
  //         updatePeta(sessionStorage.getItem("idprovinsi"));
  //         askIsProvince(true)
  //         setActiveTab("provinsi");
  //         document.getElementById("peringkatnyadaerah").classList.remove("hidden")
  //         document.getElementById("switchernya").classList.add("hidden")
  //         document.getElementById("dropdownDataset").classList.remove("invisible")
  //         document.getElementById("informasiDaerahnya").classList.remove("invisible")
  //       }
  //     });
  // }, []);
  // useEffect(() => {
  //   if (sessionStorage.getItem("idkota") !== null) {
  //     updatePeta(sessionStorage.getItem("idkota"));
  //   }
  // }, []);
  // useEffect(() => {
  //   fetch(process.env.REACT_APP_URL_API+"/api/v1/cities?province_id=" + sessionStorage.getItem("idkota"))
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCity(data.data);
  //       if(sessionStorage.getItem("idkota")!==null){
  //         setSelectedCity(sessionStorage.getItem("namakota"));
  //         setWilayahID(sessionStorage.getItem("idkota"));
  //         updatePeta(sessionStorage.getItem("idkota"));
  //         askIsProvince(false);
  //         document.getElementById("peringkatnyadaerah").classList.remove("hidden")
  //         document.getElementById("switchernya").classList.remove("hidden")
  //         document.getElementById("dropdownDataset").classList.remove("invisible")
  //         document.getElementById("informasiDaerahnya").classList.remove("invisible")
  //       }
  //     });
  // }, []);

  // useEffect(() => {
  //   if(sessionStorage.getItem("idkota")){}
  //   fetch(process.env.REACT_APP_URL_API+"/api/v1/cities?province_id=" + sessionStorage.getItem("idkota"))
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setCity(data.data);
  //       });
  // }, []);

  var wilayah = "";
  var provinsi = "";

  useEffect(() => {
    if (sessionStorage.getItem("idkota") !== null) {
      wilayah = sessionStorage.getItem("idkota");
      updatePeta(
        sessionStorage.getItem("idkota"),
        sessionStorage.getItem("yearss")
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
      process.env.REACT_APP_URL_API + "/wilayah-info?lang=id&wilayah_id=" +
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

  const [showKeuanganDropdown, setShowKeuanganDropdown] = useState(false);
  const [showKeuanganAnakan1, setshowKeuanganAnakan1] = useState(false);
  const [showKeuanganOption2, setshowKeuanganOption2] = useState(false);

  const toggleKeuanganDropdown = () => {
    setShowKeuanganDropdown(!showKeuanganDropdown);
    setOpenSektor(!openSektor);
  };

  const toggleKeuanganAnakan1 = () => {
    setshowKeuanganAnakan1(!showKeuanganAnakan1);
    setOpenAnakan(!openAnakan);
  };

  const toggleKeuanganAnakan2 = () => {
    setshowKeuanganOption2(!showKeuanganOption2);
    setOpenAnakan1(!openAnakan1);
  };

  ///FETCHING DROPDOWN PARENT
  const [sektor, setSektor] = useState([]);
  // Const Parent
  const [openSektor, setOpenSektor] = useState(false);
  const [inputValueSektor, setInputValueSektor] = useState("");
  // Const Anakan
  const [openAnakan, setOpenAnakan] = useState(false);
  const [inputValueAnakan, setInputValueAnakan] = useState("");
  // Const Anakan1
  const [openAnakan1, setOpenAnakan1] = useState(false);
  const [inputValueAnakan1, setInputValueAnakan1] = useState("");

  const [dropdown, setDropdown] = useState([]);

  const [listkey, setListkey] = useState({});

  const [countSektor, setCountSektor] = useState(0);
  function updateSektor() {
    fetch(process.env.REACT_APP_URL_API + "/sektor/" + sessionStorage.getItem("yearss"))
      .then((response) => response.json())
      .then((result) => {
        var data = [];
        result.data.forEach((item) => {
          if (item.flagging == "all") {
            data.push(item);
          }
          if (item.flagging == "province") {
            if (is_province) {
              data.push(item);
            }
          }
          if (item.flagging == "city") {
            if (!is_province) {
              data.push(item);
            }
          }
        });
        setSektor(data);
        setInputValueSektor("");
        setInputValueAnakan("");
        setInputValueAnakan1("");
      });
  }
  useEffect(() => {
    if (sessionStorage.getItem("namakota") === "Semua") {
      askIsProvince(true);
    } else {
      askIsProvince(false);
    }
  });

  useEffect(() => {
    if (
      sessionStorage.getItem("idprovinsi") !== null &&
      sessionStorage.getItem("namaprovinsi") !== null &&
      sessionStorage.getItem("idkota") !== null &&
      sessionStorage.getItem("namakota") !== null &&
      sessionStorage.getItem("yearss") !== null &&
      sessionStorage.getItem("namawilayah") !== null
    ) {
      updateSektor();
      if (is_province === true) {
        document.getElementById("switchernya").classList.add("hidden");
      } else if (is_province === false) {
        document.getElementById("switchernya").classList.remove("hidden");
      }
    }
  }, [is_province]);

  var localstate = listkey;
  const popUpRetribusi = () => {
    Swal.fire({
      title: "Perhatian!",
      text: "Klasifikasi retribusi disesuaikan dengan PP. Nomor 66 Tahun 2001. Untuk Retribusi diluar klasifikasi, akan dikelompokkan pada retribusi lainnya.",
      confirmButtonText: "Tutup",
      confirmButtonColor: "#24445a",
      customClass: {
        title: "title-icon-errorr",
        text: "text-icon",
        confirmButton: "confirm-icon",
      },
    });
  }
  function setcontentdropdwon(index, id, data) {
    data.forEach((element) => {
      if (element.id === id) {
        if (element.id === 24) {
          popUpRetribusi();
        }
        // if(element.id === 440){
        //   popUpASN();
        // }
        var list = [];
        for (var i = 0; i < dropdown.length; i++) {
          if (i < index) {
            list.push(dropdown[i]);
          }
        }
        localstate["setOpenSektor_" + element.id] = false;
        localstate["selectedKeuanganOption_" + element.id] = null;
        localstate["searchSektor_" + element.id] = "";
        localstate["selectedSektor_" + element.id] = "";
        setListkey(localstate);
        listkey["selectedKeuanganOption_" + element.id] = element.nama;
        //get list children
        var listdropdown = [];
        var listItemDropDown = [];
        element.children.forEach((sector) => {
          if (sector.flagging == "all") {
            listItemDropDown.push(sector);
          }
          if (sector.flagging == "province") {
            if (is_province) {
              listItemDropDown.push(sector);
              // listdropdown.push(
              //   <li
              //     key={sector?.nama}
              //     className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]
              //     ${
              //       sector?.nama?.toLowerCase() ===
              //         listkey["selectedSektor_" + element.id].toLowerCase() &&
              //       "bg-secondary text-white"
              //     }
              //     ${
              //       sector?.nama
              //         ?.toLowerCase()
              //         .includes(listkey["searchSektor_" + element.id])
              //         ? "block"
              //         : "hidden"
              //     }`}
              //     onClick={() => {}}
              //   >
              //     {sector?.nama}
              //   </li>
              // );
            }
          }
          if (sector.flagging == "city") {
            if (!is_province) {
              listItemDropDown.push(sector);
              // listdropdown.push(
              //   <li
              //     key={sector?.nama}
              //     className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]
              //     ${
              //       sector?.nama?.toLowerCase() ===
              //         listkey["selectedSektor_" + element.id].toLowerCase() &&
              //       "bg-secondary text-white"
              //     }
              //     ${
              //       sector?.nama
              //         ?.toLowerCase()
              //         .includes(listkey["searchSektor_" + element.id])
              //         ? "block"
              //         : "hidden"
              //     }`}
              //     onClick={() => {}}
              //   >
              //     {sector?.nama}
              //   </li>
              //   // </React.Fragment>
              // );
            }

          }
        });
        if (listItemDropDown.length > 0) {
          list[index] = {
            element: element,
            sector: listItemDropDown,
            index: index + 1,
          };
          setDropdown(list);
        }
        else {
          setDropdown(list);
        }
      }
    });

  }

  const [selecteditems, setSelectedItems] = useState("");

  function clickBySystem(target) {
    try {
      document.getElementById(target).click();
    } catch (error) {
      setTimeout(clickBySystem(target), 1000)
      // clickBySystem(target)
    }
  }
  function Labelsnama({ data }) {
    const [openitems, setOpenItems] = useState(false);
    const [inputvalueitems, setInputValueItems] = useState("");
    const [items, setItems] = useState(data.sector);
    var historyArray = JSON.parse(sessionStorage.getItem("historyChildDatasetArray")) || [];
    function handleClick(data, label) {
      setcontentdropdwon(data.index, label.id, data.element.children);
      setSelectedItems(label.nama);
    }
    // useEffect(()=>{
    //   if(sessionStorage.getItem("historyChildDatasetArray") != null && countSektor == 0){
    //     var historyDataset = JSON.parse(sessionStorage.getItem("historyChildDatasetArray"))
    //     // var historyDatasetNonArray = parseInt((sessionStorage.getItem("historyChildDataset")))
    //     if(historyDataset.length >= 1){
    //       items.forEach(item=>{
    //         if(historyDataset.indexOf(item.id) >= 0){
    //           document.getElementById(`children_${item.id}`).click()
    //           console.log("HAI",document.getElementById(`children_${item.id}`))
    //           console.log("HAI",item.id)
    //           console.log("HAI",historyDataset)
    //         }
    //       })
    //       // try {
    //       //   document.getElementById(`children_${historyDataset[0]}`).click()
    //       // } catch (error) {
    //       //   console.log("ERROR LOOP",error)
    //       // }
    //       // console.log("HALO",document.getElementById(`children_${historyDatasetNonArray}`))
    //       // // console.log(item.id)
    //       // console.log("HALO",historyDatasetNonArray)
    //     }else{
    //       document.getElementById(`children_${historyDataset[0]}`).click()
    //     }
    //   }
    // },[])

    //   useEffect(() => {
    //     const historyParentDataset = sessionStorage.getItem("historyParentDataset");
    //     const historyChildDatasetArray = JSON.parse(sessionStorage.getItem("historyChildDatasetArray"));

    //     if (historyParentDataset != null && historyChildDatasetArray != null) {
    //         let parentFound = false;

    //         for (const item of items) {
    //             if (historyChildDatasetArray.includes(item.id)) {
    //                 Setselecteddropdown(data.index - 1, item.nama, selecteditems);
    //                 handleClick(data, item);
    //                 setBidang(item.id);
    //                 parentFound = true;
    //                 break;
    //             }
    //         }

    //         if (!parentFound && items.length > 0) {
    //             const parentId = items[0].id_parent;
    //             if (parentId && historyChildDatasetArray.includes(parentId)) {
    //                 // Handle the scenario where the parent is found but children are not
    //                 // Avoid calling setState here to prevent infinite loop
    //             }
    //         }
    //     }
    // }, [items, data.index, selecteditems]);


    return (
      <div>
        <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
          <div
            onClick={() => setOpenItems(!openitems)}
            className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px]"
          >
            <p id={`label_sektor_${data.element.id}`}>
              {data.select ?? "Pilih"}
            </p>
            <FontAwesomeIcon
              icon={faChevronDown}
              color="#24445A"
              className={`ml-[20px] w-[10px] h-[20px] ${openitems && "rotate-180"
                }`}
            />
          </div>
          <ul
            className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar mb-[10px]
              ${openitems ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {items?.map((label) => (
              <li
                id={`children_${label.id}`}
                key={label?.nama}
                className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                ${label?.nama?.toLowerCase() === selecteditems?.toLowerCase() &&
                  "bg-secondary text-white"
                  }
                ${label?.nama?.toLowerCase().includes(inputvalueitems)
                    ? "block"
                    : "hidden"
                  }`}
                onClick={() => {
                  Setselecteddropdown(
                    data.index - 1,
                    label.nama,
                    selecteditems
                  );
                  handleClick(data, label);
                  setBidang(label.id);
                  // historyArray.push(label.id);
                  // sessionStorage.setItem("historyChildDatasetArray", JSON.stringify(historyArray));
                  setTestHandlePeringkatnya(true);
                  setSelectedSort("Urutan")
                }}
              >
                {label?.nama}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  function Setselecteddropdown(index, value) {
    var data = dropdown;
    data[index].select = value;
    setDropdown(data);
  }

  ///FETCHING PERINGKAT JELAJAH
  const [bidang, setBidang] = useState(null);
  const [rankData, setRankData] = useState(null);
  const [dataChart, setDataChart] = useState("");
  const [dataChartNasional, setDataChartNasional] = useState("");
  const [dataChartSelected, setDataChartSelected] = useState("");
  const [angkaTertinggi, setAngkaTertinggi] = useState(0);
  var timer;
  useEffect(() => {
    if (
      bidang !== null &&
      bidang !== 290 &&
      bidang !== 291 &&
      bidang !== 346 &&
      bidang !== 351 &&
      bidang !== 391 &&
      bidang !== 440
    ) {
      Kategori();
      clearTimeout(timer);
      timer = setTimeout(function () {
        kategoriRecord();
        timer = null;
      }, 10000);
      document.getElementById("JudulPeringkat").classList.remove("hidden");
      document.getElementById("Peringkatnya").classList.remove("hidden");
    } else if (
      bidang === 290 ||
      bidang === 291 ||
      bidang === 346 ||
      bidang === 351 ||
      bidang === 391 ||
      bidang === 1 ||
      bidang === 2 ||
      bidang === 3
    ) {
      document.getElementById("JudulPeringkat").classList.add("hidden");
      document.getElementById("Peringkatnya").classList.add("hidden");
    }
    return () => {
      clearTimeout(timer);
    };
  }, [bidang, activeTab, wilayahID, selectedYears]);
  // useEffect(() => {
  //   if (sessionStorage.getItem("historyChildDataset") !== null) {
  //     setBidang(sessionStorage.getItem("historyChildDataset"));
  //   }
  // },[bidang]);
  // const handleButtonClickDropdown = (id) => {
  //   updateSektor();
  //   setSelectedButton(id);
  //   toggleKeuanganDropdown();
  //   toggleKeuanganAnakan1();
  //   toggleKeuanganAnakan2();
  //   setShowKeuanganDropdown(true);
  //   setcontentdropdwon(0, id, sektor);
  //   document.getElementById("JudulPeringkat").classList.add("hidden");
  //   document.getElementById("Peringkatnya").classList.add("hidden");
  // };

  function clickHistoryDataset(dataset) {
    if (dataset.length > 0) {
      console.log("iniChildren ID", document.getElementById(`children_${dataset[0]}`))

      if (document.getElementById(`children_${dataset[0]}`) != null) {
        // document.getElementById(`children_${dataset[0]}`).click()
        // var sisaDataset = []
        // for(var i = 1; i < dataset.length; i++){
        //   sisaDataset.push(
        //     dataset[i]
        //   )
        // }
        // clickHistoryDataset(sisaDataset)
        console.log("ini IF")
      } else {
        setTimeout(clickHistoryDataset(dataset), 1000);
        // console.log("ini ELSE")
      }
    }

  }

  useEffect(() => {
    if (sektor.length > 0 && countSektor == 0) {
      if (sessionStorage.getItem("historyParentDataset") !== null) {
        var historyParentDataset = sessionStorage.getItem("historyParentDataset")
        document.getElementById(`sektor_${historyParentDataset}`).click();
        var counter = countSektor + 1
        setCountSektor(counter)
      }
    }
  },[sektor])
  const clickedIds = useRef(new Set());

  //punya mandar
  useEffect(() => {
    if (!dropdown || dropdown.length === 0) return;

    const historyParentDataset = sessionStorage.getItem("historyParentDataset");
    const historyChildDatasetArray = JSON.parse(sessionStorage.getItem("historyChildDatasetArray"));

    if (historyParentDataset && historyChildDatasetArray) {
      dropdown.forEach(items => {
        items.sector.forEach(item => {
          if (historyChildDatasetArray.includes(item.id) && !clickedIds.current.has(item.id)) {
            console.log("id ditemukan", item.id);
            const childElement = document.getElementById(`children_${item.id}`);
            if (childElement) {
              childElement.click();
              clickedIds.current.add(item.id);
              setBidang(item.id)
            }
          }
        });
      });
    }
  }, [dropdown, selectedButton]);

  //punya rasuk
  // useEffect(() => {
  //   if (dropdown.length > 0) {
  //     const historyParentDataset = sessionStorage.getItem("historyParentDataset");
  //     const historyChildDatasetArray = JSON.parse(sessionStorage.getItem("historyChildDatasetArray"));
  //     if (historyParentDataset != null && historyChildDatasetArray != null) {
  //       console.log("last array => ", dropdown[dropdown.length - 1])
  //       for (const item of dropdown[dropdown.length - 1].sector) {
  //         if (historyChildDatasetArray.includes(item.id)) {
  //           //menghapus data history jika sudah ditemukan
  //           var indexData = historyChildDatasetArray.indexOf(item.id);
  //           historyChildDatasetArray.splice(indexData, 1);
  //           sessionStorage.setItem("historyChildDatasetArray", JSON.stringify(historyChildDatasetArray))

  //           //mengclick data
  //           document.getElementById(`children_${item.id}`).click()
  //           break;
  //         }
  //       }
  //     }
  //   }
  // }, [dropdown])

  // useEffect(() => {
  //   const historyParentDataset = parseInt(sessionStorage.getItem("historyParentDataset"));
  //   const historyChildDataset = parseInt(sessionStorage.getItem("historyChildDataset"));
  //   if (sessionStorage.getItem("historyParentDataset") !== null && sessionStorage.getItem("historyChildDataset") !== null && countSektor == 0) {
  //     updateSektor();
  //     setSelectedButton(historyParentDataset);
  //     toggleKeuanganDropdown();
  //     toggleKeuanganAnakan1();
  //     toggleKeuanganAnakan2();
  //     setShowKeuanganDropdown(true);
  //     setcontentdropdwon(0, historyChildDataset, sektor);
  //     document.getElementById("JudulPeringkat").classList.remove("hidden");
  //     document.getElementById("Peringkatnya").classList.remove("hidden");
  //     setBidang(historyChildDataset);
  //     setTestHandlePeringkatnya(true);
  //     var counter = countSektor+1
  //     setCountSektor(counter)
  //   }
  // },[sessionStorage.getItem("historyParentDataset"), sessionStorage.getItem("historyChildDataset"), sektor]);

  const [sumbernya, setSumber] = useState("");
  const [elementChart, setElementChart] = useState([]);
  const [infoPageView, setInfoPageView] = useState();
  const [infoPageSave, setinfoPageSave] = useState();
  const [infoKodePage, setinfoKodePage] = useState();
  const [halamanTipe, setHalamanTipe] = useState();

  function kategoriRecord() {
    var params = new URLSearchParams();
    const myHeaders = new Headers();
    if (sessionStorage.getItem("token") !== null) {
      myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
    }
    const requestnya = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    params.append("tahun", selectedYears);
    params.append("id_wilayah", wilayahID);
    params.append("bidang", bidang);
    params.append("is_province", is_province);
    params.append("province_rank", activeTab === "nasional" ? true : false);
    params.append("perkapita", true);
    if (sessionStorage.getItem("token") !== null) {
      params.append("record", true);
    }
    fetch(
      process.env.REACT_APP_URL_API + "/jelajah?" + params.toString(),
      requestnya
    )
      .then((response) => response.json())
      .then((result) => {
      });
  }
  function Kategori() {
    var params = new URLSearchParams();
    params.append("tahun", selectedYears);
    params.append("id_wilayah", wilayahID);
    params.append("bidang", bidang);
    params.append("is_province", is_province);
    params.append("province_rank", activeTab === "nasional" ? true : false);
    params.append("perkapita", true);
    fetch(
      process.env.REACT_APP_URL_API + "/jelajah?" + params.toString(), requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        var tempElementChart = [];
        if (bidang === 0) {
          setDataChartSelected(null)
          setDataChartNasional(null)
          setAngkaTertinggi(null)
          setElementChart(tempElementChart);
          document.getElementById("JudulPeringkat").classList.add("hidden")
          document.getElementById("sumbernya").classList.add("hidden");
          document.getElementById("sortnya").classList.add("hidden");
        } else if (result.success === false) {
          tempElementChart.push(
            <section>
              <p className="font-bold text-secondary text-[16px] md:text-[24px] mt-[40px]">Data belum tersedia</p>
            </section>
          )
          setDataChartSelected(null)
          setDataChartNasional(null)
          setAngkaTertinggi(null)
          setElementChart(tempElementChart);
          document.getElementById("JudulPeringkat").classList.add("hidden")
          document.getElementById("sumbernya").classList.add("hidden");
          document.getElementById("sortnya").classList.add("hidden");
        } else if (result.success === true) {
          var data = result.data.rank;
          var dataNilaiTertinggi = data[0].nilai
          var convertString = dataNilaiTertinggi.replaceAll(".", "")
          var highestValue = parseInt(convertString);

          setAngkaTertinggi(highestValue);
          var nasionalisme = result.data.avg;
          setDataChartNasional(nasionalisme);
          var wilayahTerpilih = result.data.selected;
          setDataChartSelected(wilayahTerpilih);
          var sumber = result.data.sumber;
          var view = result.data.info.view;
          var save = result.data.info.simpan;
          var kodePage = result.data.info.kode;
          var tipeHalaman = result.data.info.halaman_tipe;
          setSatuan(result.data.satuan);
          for (var i = 0; i < data.length; i++) {
            var nilaidariGraph = data[i].nilai;
            var convertnya = nilaidariGraph.replaceAll(".", "");
            data[i].persentase = (convertnya / highestValue) * 100;
            var angka
            if (highestValue == 0) {
              angka = 0
            } else {
              angka = data[i].persentase
            }
            tempElementChart.push(
              <section key={i}>
                <div className="hidden md:hidden xl:block">
                  <div className="flex mt-[20px] w-full items-center justify-center px-[30px]">
                    <div className="w-[300px] text-left">
                      <p className="font-bold text-[#247DBD] text-[24px] uppercase">
                        {data[i].nama}
                      </p>
                    </div>

                    <div className="w-[660px] border-solid border-[1px] rounded-full border-secondary p-[1px]">
                      <div
                        className={`bg-[#CDDBE3] rounded-full border-1 ${Math.round(angka) === 0 ? "" : "bg-none border-none"
                          }`}
                        style={{
                          width: Math.round(angka) <= 5 && Math.round(angka) >= 1 ? "5%" : Math.round(angka) + "%",
                        }}
                      >
                        <p className="px-2 font-bold text-[20px] text-secondary ml-[20px]">
                          {data[i].nilai}
                        </p>
                      </div>
                    </div>

                    <p className="w-[100px] text-right font-bold text-[#247DBD] text-[24px]">
                      #{data[i].rank}
                    </p>
                  </div>
                </div>

                {/* Rest of your JSX */}
                <div className="hidden md:block xl:hidden">
                  <div className="flex w-[700px] items-center justify-between px-[30px] mt-[20px]">
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <p className="font-bold text-[#247DBD] text-[24px] uppercase">
                          {data[i].nama}
                        </p>
                        <p className="text-right font-bold text-[#CDDBE3] text-[24px]">
                          #{data[i].rank}
                        </p>
                      </div>
                      <div className="w-[660px] border-solid border-2 rounded-full border-secondary">
                        <div
                          className={`bg-[#CDDBE3] rounded-full border-1 ${Math.round(angka) === 0 ? "" : "bg-none border-none"
                            }`}
                          style={{ width: Math.round(angka) <= 5 && Math.round(angka) >= 1 ? "5%" : Math.round(angka) + "%" }}
                        >
                          <p className="px-2 font-bold text-[20px] text-secondary ml-[20px]">
                            {data[i].nilai}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:hidden">
                  <div className="flex w-screen items-center justify-between px-[30px] mt-[20px]">
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <p className="font-bold text-[#247DBD] text-[16px] uppercase">
                          {data[i].nama}
                        </p>
                        <p className="text-right font-bold text-[#CDDBE3] text-[16px]">
                          #{data[i].rank}
                        </p>
                      </div>
                      <div className="w-full border-solid border-2 rounded-full border-secondary">
                        <div
                          className={`bg-[#CDDBE3] rounded-full border-1 ${Math.round(angka) === 0 ? "" : "bg-none border-none"
                            }`}
                          style={{ width: Math.round(angka) <= 5 && Math.round(angka) >= 1 ? "5%" : Math.round(angka) + "%" }}
                        >
                          <p className="px-2 font-bold text-[14px] text-secondary ml-[20px]">
                            {(data[i].nilai)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }
          setElementChart(tempElementChart);
          setRankData(data);
          setSumber(sumber);
          setInfoPageView(view);
          setinfoPageSave(save);
          setinfoKodePage(kodePage);
          setHalamanTipe(tipeHalaman);
          document.getElementById("JudulPeringkat").classList.remove("hidden")
          document.getElementById("sumbernya").classList.remove("hidden");
          document.getElementById("sortnya").classList.remove("hidden");
        }

      });
  }

  const [selectedSort, setSelectedSort] = useState("");
  const [openSort, setOpenSort] = useState(false);

  function sortDesc() {
    const sortedChart = [...elementChart].sort((a, b) => {
      const valueA = parseFloat(a.key);
      const valueB = parseFloat(b.key);
      return valueB - valueA;
    });
    setElementChart(sortedChart);
  }
  function sortAsc() {
    const sortedChart = [...elementChart].sort((a, b) => {
      const valueA = parseFloat(a.key);
      const valueB = parseFloat(b.key);
      return valueA - valueB;
    });
    setElementChart(sortedChart);
  }
  const Nasional = (nasionalisme, highestValue) => {
    if (nasionalisme != null && highestValue != null) {
      if (nasionalisme.nilai != null) {
        var nilaiNasional = nasionalisme.nilai
        var convertLagi = nilaiNasional.replaceAll(".", "")
        var angkaNasional = (parseInt(convertLagi) / highestValue) * 100;
        var convertAngkaNasional;
        if (highestValue == 0) {
          convertAngkaNasional = 0
        } else {
          convertAngkaNasional = angkaNasional
        }
        return (
          <section>
            <div className="hidden md:hidden xl:block">
              <div className="flex mt-[20px] w-full items-center justify-center px-[30px]">
                <div className="flex flex-col w-[300px] text-left">
                  <p className="font-bold text-[#247DBD] text-[24px] uppercase">
                    {nasionalisme.nama}
                  </p>
                  <p className="font-semibold text-[#247DBD] text-[14px] uppercase">
                    (rata-rata)
                  </p>
                </div>

                <div className="w-[660px] border-solid border-[1px] rounded-full border-secondary">
                  <div
                    className={`bg-secondary rounded-full border-[1px] ${Math.round(convertAngkaNasional) ? 0 : "bg-none border-none"
                      }`}
                    style={{ width: Math.round(convertAngkaNasional) <= 5 && Math.round(convertAngkaNasional) >= 1 ? "5%" : Math.round(convertAngkaNasional) + "%", }}
                  >
                    <p className="px-2 font-bold text-[20px] text-white ml-[20px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      {(nasionalisme.nilai)}
                    </p>
                  </div>
                </div>
                <p className="w-[100px] text-right font-bold text-third text-[24px]">
                  {" "}
                </p>
              </div>
            </div>

            <div className="hidden md:block xl:hidden">
              <div className="flex w-[700px] items-center justify-between px-[30px] mt-[20px]">
                <div className="w-full">
                  <div className="flex flex-col justify-between w-full">
                    <p className="font-bold text-[#247DBD] text-[24px] uppercase">
                      {nasionalisme.nama}
                    </p>
                    <p className="font-semibold text-[#247DBD] text-[14px] uppercase">
                      (rata-rata)
                    </p>
                    <p className="text-right font-bold text-third text-[24px]"> </p>
                  </div>
                  <div className="w-[660px] border-solid border-2 rounded-full border-secondary">
                    <div
                      className={`bg-secondary rounded-full border-[1px] ${Math.round(convertAngkaNasional) ? 0 : "bg-none border-none"
                        }`}
                      style={{ width: Math.round(convertAngkaNasional) <= 5 && Math.round(convertAngkaNasional) >= 1 ? "5%" : Math.round(convertAngkaNasional) + "%", }}
                    >
                      <p className="px-2 font-bold text-[20px] text-white ml-[20px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        {(nasionalisme.nilai)}

                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:hidden">
              <div className="flex w-screen items-center justify-between px-[30px] mt-[20px]">
                <div className="w-full">
                  <div className="flex flex-col justify-between w-full">
                    <p className="font-bold text-[#247DBD] text-[16px] uppercase">
                      {nasionalisme.nama}
                    </p>
                    <p className="font-semibold text-[#247DBD] text-[12px] uppercase">
                      (rata-rata)
                    </p>
                    <p className="text-right font-bold text-third text-[16px]"> </p>
                  </div>
                  <div className="w-full border-solid border-2 rounded-full border-secondary ">
                    <div
                      className={`bg-secondary rounded-full border-[1px] ${Math.round(convertAngkaNasional) ? 0 : "bg-none border-none"
                        }`}
                      style={{ width: Math.round(convertAngkaNasional) <= 5 && Math.round(convertAngkaNasional) >= 1 ? "5%" : Math.round(convertAngkaNasional) + "%", }}
                    >
                      <p className="px-2 font-bold text-[14px] text-white ml-[20px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        {(nasionalisme.nilai)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }
    }
  };
  const Provinsi = (wilayahTerpilih, highestValue) => {
    if (wilayahTerpilih !== null && highestValue !== null) {
      if (wilayahTerpilih.nilai != null) {
        var nilaiWilayahTerpilih = wilayahTerpilih.nilai
        var convertLagiWilayah = nilaiWilayahTerpilih.replaceAll(".", "")
        var angkaProvinsi = (convertLagiWilayah / highestValue) * 100;
        var convertAngkaProvinsi;
        if (highestValue == 0) {
          convertAngkaProvinsi = 0
        } else {
          convertAngkaProvinsi = angkaProvinsi
        }
        return (
          <section className="mb-[50px]">
            <div className="hidden md:hidden xl:block">
              <div className="flex mt-[20px] w-full items-center justify-center px-[30px]">
                <div className="w-[300px] text-left">
                  <p className="font-bold text-[#247DBD] text-[24px] uppercase">
                    {wilayahTerpilih.nama}
                  </p>
                </div>

                <div className="w-[660px] border-solid border-[1px] rounded-full border-secondary">
                  <div
                    className={`bg-third rounded-full border-[1px] ${Math.round(convertAngkaProvinsi) ? 0 : "bg-none border-none"
                      }`}
                    style={{ width: Math.round(convertAngkaProvinsi) <= 5 && Math.round(convertAngkaProvinsi) >= 1 ? "5%" : Math.round(convertAngkaProvinsi) + "%", }}
                  >
                    <p className="px-2 font-bold text-[20px] text-secondary ml-[20px]">
                      {(wilayahTerpilih.nilai)}
                    </p>
                  </div>
                </div>
                <p className="w-[100px] text-right font-bold text-third text-[24px]">
                  #{wilayahTerpilih.rank}
                </p>
              </div>
            </div>

            <div className="hidden md:block xl:hidden">
              <div className="flex w-[700px] items-center justify-between px-[30px] mt-[20px]">
                <div className="w-full">
                  <div className="flex justify-between w-full">
                    <p className="font-bold text-[#247DBD] text-[24px] uppercase">
                      {wilayahTerpilih.nama}
                    </p>
                    <p className="text-right font-bold text-[#77C2F8] text-[24px]">
                      #{wilayahTerpilih.rank}
                    </p>
                  </div>
                  <div className="w-[660px] border-solid border-2 rounded-full border-secondary">
                    <div
                      className={`bg-third rounded-full border-[1px] ${Math.round(convertAngkaProvinsi) ? 0 : "bg-none border-none"
                        }`}
                      style={{ width: Math.round(convertAngkaProvinsi) <= 5 && Math.round(convertAngkaProvinsi) >= 1 ? "5%" : Math.round(convertAngkaProvinsi) + "%", }}
                    >
                      <p className="px-2 font-bold text-[20px] text-secondary ml-[20px]">
                        {(wilayahTerpilih.nilai)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:hidden">
              <div className="flex w-screen items-center justify-between px-[30px] mt-[20px]">
                <div className="w-full">
                  <div className="flex justify-between w-full">
                    <p className="font-bold text-secondary text-[16px] uppercase">
                      {wilayahTerpilih.nama}
                    </p>
                    <p className="text-right font-bold text-third text-[16px]">
                      #{wilayahTerpilih.rank}
                    </p>
                  </div>
                  <div className="w-full border-solid border-2 rounded-full border-secondary">
                    <div
                      className={`bg-third rounded-full border-[1px] ${Math.round(convertAngkaProvinsi) ? 0 : "bg-none border-none"
                        }`}
                      style={{ width: Math.round(convertAngkaProvinsi) <= 5 && Math.round(convertAngkaProvinsi) >= 1 ? "5%" : Math.round(convertAngkaProvinsi) + "%", }}
                    >
                      <p className="px-2 font-bold text-[14px] text-secondary ml-[20px]">
                        {(wilayahTerpilih.nilai)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }
    }
  };

  if (jumlahpenduduk != null) {
    var convertStringtoInt = jumlahpenduduk.replaceAll(".", "")
    var data_Penduduk = parseInt(convertStringtoInt) / 1000;
  }
  const [testHandlePeringkatnya, setTestHandlePeringkatnya] = useState(false);
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

  const handlePopup = () => {
    Swal.fire({
      title: "Perhatian!",
      text: "Silakan memilih provinsi terlebih dahulu.",
      confirmButtonText: "Tutup",
      confirmButtonColor: "#24445a",
      customClass: {
        title: "title-icon-errorr",
        text: "text-icon",
        confirmButton: "confirm-icon",
      },
    });
  };

  const shareBtn = (halaman) => {
    var query = new URLSearchParams();
    query.append("halaman", halaman);
    query.append("id_member", idMember);

    var xhr = new XMLHttpRequest();
    xhr.onload = async function () {
      var response = JSON.parse(this.responseText);
      if (response.success) {
        var share_data = {
          title: "Data Peringkat",
          text: "Yuk cek halaman ini, dan dapatkan insight", //kalimat
          url: response.data.url //url yang ingin dibagikan
        }
        //proses share data
        try {
          await navigator.share(share_data);

        } catch (err) {//jika eror

        }
      } else { //jika gagal
        Swal.fire({
          title: "Gagal!",
          text: "Terdapat kesalahan, Silakan coba lagi nanti.",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#24445a",
          customClass: {
            title: "title-icon-errorr",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
        });
      }
    }
    xhr.open("GET", process.env.REACT_APP_URL_API + "/share-pdf?" + query.toString(), true);
    xhr.send();
  }

  return (
    <section>
      <div id="kondisiLogin">
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
                    src={`https://docs.google.com/viewer?url=https://api.otonometer.neracaruang.com/api/v1/info/download/${selectedFile}&embedded=true`}
                    className="w-full h-full"
                  />
                </div>
                <div className="flex gap-x-[10px] items-center justify-center">
                  <button className="flex bg-[#24445A] hover:bg-[#86BBD8] w-[105px] h-[39px] rounded-[10px] text-white items-center justify-center text-[14px]">
                    <a
                      href={process.env.REACT_APP_URL_API + `/info/download/${selectedFile}`}
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
        <div className="flex flex-col mt-[125px] mb-[150px] justify-center items-center">
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
            Jelajahi Data Wilayah!
          </h1>

          {/* DROPDOWN */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-[40px] gap-y-[10px] mt-[20px]">
            {/* FETCHING PROVINSI */}
            <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
              <div
                onClick={() => {
                  setOpenProvinsi(!openProvinsi)
                  if (openCity) {
                    setOpenCity(!openCity)
                  }
                  if (openYears) {
                    setOpenYears(!openYears)
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
                  className={`ml-[20px] w-[10px] h-[20px] ${openProvinsi && "rotate-180"
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
                    ${provinces?.nama?.toLowerCase() ===
                      selected?.toLowerCase() && "bg-secondary text-white"
                      }
                    ${provinces?.nama?.toLowerCase().includes(inputValue)
                        ? "block"
                        : "hidden"
                      }`}
                    onClick={() => {
                      if (!is_province) {
                        if (sessionStorage.getItem("historyParentDataset") !== null) {
                          var historyParentDataset = sessionStorage.getItem("historyParentDataset")
                          document.getElementById(`sektor_${historyParentDataset}`).click();
                        }
                        setShowKeuanganDropdown(true);
                        setBidang(0)
                      }
                      setSelectedSort("Urutkan");
                      updateKota(provinces?.nama, selected, provinces.id);
                      sessionStorage.setItem("idprovinsi", provinces.id);
                      sessionStorage.setItem("namaprovinsi", provinces.nama);
                      setGetInfoProvinsi(provinces.id);
                      setWilayahID(provinces.id);
                      sessionStorage.setItem("namawilayah", "Semua");
                      setInfoDaerah("Semua");
                      setSelectedCity("Semua");
                      setDataranicon("Semua");
                      setSelectedYears(sessionStorage.getItem("yearss"));
                      updatePeta(provinces.id);
                      askIsProvince(true);
                      updateSektor();
                      provinsi = provinces.id;
                      wilayah = provinces.id;
                      setActiveTab("provinsi");
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
                  if (openProvinsi) {
                    setOpenProvinsi(!openProvinsi)
                  }
                  if (openYears) {
                    setOpenYears(!openYears)
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
                  className={`ml-[20px] w-[10px] h-[20px] ${openCity && "rotate-180"
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
                    ${"semua" === selectedCity?.toLowerCase() &&
                    "bg-secondary text-white"
                    }
                    `}
                  onClick={() => {
                    setSelectedSort("Urutkan");
                    if (!is_province) {
                      if (sessionStorage.getItem("historyParentDataset") !== null) {
                        var historyParentDataset = sessionStorage.getItem("historyParentDataset")
                        document.getElementById(`sektor_${historyParentDataset}`).click();
                      }
                      setShowKeuanganDropdown(true);
                      setBidang(0)
                    }
                    wilayah = provinsi;
                    setInfoDaerah("Semua");
                    setSelectedCity("Semua");
                    setDataranicon("Semua");
                    setWilayahID(getInfoProvinsi);
                    setSelectedYears(sessionStorage.getItem("yearss"));
                    updatePeta(getInfoProvinsi);
                    setOpenCity(false);
                    askIsProvince(true);
                    setActiveTab("provinsi");
                    updateSektor();
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
                    ${regencies?.nama?.toLowerCase() ===
                      selectedCity?.toLowerCase() && "bg-secondary text-white"
                      }
                    ${regencies?.nama?.toLowerCase().includes(inputValueofCity)
                        ? "block"
                        : "hidden"
                      }`}
                    onClick={() => {
                      setSelectedSort("Urutkan");
                      if (is_province) {
                        if (sessionStorage.getItem("historyParentDataset") !== null) {
                          var historyParentDataset = sessionStorage.getItem("historyParentDataset")
                          document.getElementById(`sektor_${historyParentDataset}`).click();
                        }
                        setShowKeuanganDropdown(true);
                        setBidang(0)
                      }
                      if (
                        regencies?.nama?.toLowerCase() !==
                        selectedCity.toLowerCase()
                      ) {
                        wilayah = regencies.id;
                        sessionStorage.setItem("namawilayah", regencies.nama);
                        setSelectedCity(regencies?.nama);
                        sessionStorage.setItem("idkota", regencies.id);
                        sessionStorage.setItem("namakota", regencies.nama);
                        setOpenCity(false);
                        setInputValueofCity("");
                        updatePeta(regencies.id);
                        setWilayahID(regencies.id);
                        setSelectedYears(sessionStorage.getItem("yearss"));
                        askIsProvince(false);
                        setActiveTab("provinsi");
                        updateSektor();
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
                onClick={() => {
                  setOpenYears(!openYears)
                  if (openProvinsi) {
                    setOpenProvinsi(!openProvinsi)
                  }
                  if (openCity) {
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
                  className={`ml-[120px] w-[10px] h-[20px] ${openYears && "rotate-180"
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
                    ${tahunn?.tahun?.toLowerCase() ===
                      selectedYears?.toLowerCase() && "bg-secondary text-white"
                      }

                    ${tahunn?.tahun?.toLowerCase().includes(inputValueofYears)
                        ? "block"
                        : "hidden"
                      }`}
                    onClick={() => {
                      setSelectedSort("Urutkan");
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
            </div>
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
              <a href="/Jelajah-Profil">
                <img
                  src={people}
                  alt=""
                  className="w-[70px] lg:w-[95px] object-contain hover:scale-110 transform transition duration-300 lg:mt-[-10px]"
                />
              </a>
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

          {/* OPSI */}
          <div
            id="dropdownDataset"
            className="flex mt-[24px] gap-[20px] md:gap-[60px] justify-center items-center"
          >
            {sektor.map((items) => (
              <button
                id={`sektor_${items.id}`}
                key={items.id}  // Ensure each button has a unique key
                className={`flex w-[100px] md:w-[167px] h-[40px] rounded-full border border-[f1f1f1] text-[14px] font-bold items-center justify-center ${items.id === selectedButton
                    ? "bg-secondary text-white"
                    : "bg-third text-secondary"
                  }`}
                onClick={() => {
                  updateSektor();
                  setSelectedButton(items.id);
                  toggleKeuanganDropdown();
                  toggleKeuanganAnakan1();
                  toggleKeuanganAnakan2();
                  setShowKeuanganDropdown(true);
                  setcontentdropdwon(0, items.id, sektor);
                  sessionStorage.setItem("historyParentDataset", items.id)
                }}
              >
                {items.nama}
              </button>
            ))}
          </div>

          {/* DROPDOWN "KEUANGAN" */}
          <div className="flex mt-[30px]">
            {/* Dropdown 1 */}
            {showKeuanganDropdown &&
              dropdown.some((item) => item.sector.length > 0) && (
                <div className="lg:flex flex-wrap space-x-0 lg:flex-nowrap lg:space-x-4 justify-center">
                  {dropdown.map((item) => (
                    <Labelsnama data={item} />
                  ))}
                </div>
              )}
          </div>

          {/* SWITCH */}
          <div
            id="switchernya"
            className="flex gap-[50px] items-center justify-center font-semibold text-secondary mt-[48px] text-[16px] md:text-[20px]"
          >
            <p className={activeTab === "provinsi" ? "inactive-text" : ""}>
              PROVINSI
            </p>

            <SwitchBtn
              id="switchernya"
              switcher={activeTab}
              setSwitcher={toggleTab}
            />
            <p className={activeTab === "nasional" ? "inactive-text" : ""}>
              NASIONAL
            </p>
          </div>
          {/* PERINGKAT DAERAH */}
          <div
            id="JudulPeringkat"
            className="hidden text-secondary text-center mt-[48px]"
          >
            <p className="text-[20px] md:text-[32px] font-extrabold text-secondary uppercase">
              PERINGKAT {infoDaerah}
            </p>
            <p className="text-[16px] md:text-[24px] font-regular italic">
              &#40;{satuan}&#41;
            </p>
          </div>
          {/* DATA */}
          <div
            id="Peringkatnya"
            className={`hidden flex flex-col items-center justify-center ${testHandlePeringkatnya ? "false" : "hidden"
              }`}
          >
            {activeTab === "provinsi" && (
              <>
                {Nasional(dataChartNasional, angkaTertinggi)}
                {Provinsi(dataChartSelected, angkaTertinggi)}
                <div id="sortnya" className="hidden flex justify-end w-full px-[30px] gap-x-[20px]">
                  {/* FILTER */}
                  <div className="w-[150px] text-secondary font-medium text-[14px] cursor-pointer">
                    <div
                      onClick={() => setOpenSort(!openSort)}
                      className="bg-[#ebebeb] gap-x-[8px] w-full p-2 flex items-center justify-center rounded-[10px]"
                    >
                      {selectedSort ? selectedSort : "Urutkan"}
                      <FontAwesomeIcon
                        icon={faArrowDownShortWide}
                        color="#24445A"
                        className={`w-[15px] h-[15px] ${selectedSort === "Teratas" && "rotate-180"
                          }`}
                      />
                    </div>
                    <ul
                      className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-auto 
                          ${openSort ? "max-h-[240px]" : "max-h-[0]"}`}
                    >
                      <li
                        className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]
                        `}
                        onClick={() => {
                          setSelectedSort("Teratas");
                          setOpenSort(false);
                          sortAsc();
                        }}
                      >
                        Teratas
                      </li>
                      <li
                        className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]`}
                        onClick={() => {
                          setSelectedSort("Terbawah");
                          setOpenSort(false);
                          sortDesc();
                        }}
                      >
                        Terbawah
                      </li>
                    </ul>
                  </div>
                </div>
                {elementChart}
                <div id="sumbernya" className="text-center mt-[20px] text-secondary italic">
                  <div className="flex w-full h-[50px] items-center justify-center gap-[10px] md:gap-[20px] ">
                    <div className="flex items-center gap-[10px]">
                      <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-md bg-primary drop-shadow-lg flex justify-center items-center ">
                        <FontAwesomeIcon
                          icon={faEye}
                          color="#24445A"
                          className=""
                        />
                      </div>
                      <p className="text-[12px] md:text-[16px]">{infoPageView} Lihat</p>
                    </div>
                    {/* <div className="flex items-center gap-[10px]">
                      <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-md bg-primary drop-shadow-lg flex justify-center items-center hover:bg-third cursor-pointer"
                        onClick={() => {
                          if(tokenUser == null){
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
                                sessionStorage.setItem("redirectPath", window.location.pathname);
                                window.location.href = "/Masuk";
                              },
                            });
                          }else{
                            // window.open(process.env.REACT_APP_URL_API+`/api/v1/download-pdf?halaman=${infoKodePage}&id_member=${idMember}`);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faBookBookmark}
                          color="#24445A"
                        />
                      </div>
                      <p className="text-[12px] md:text-[16px]">{infoPageSave} Simpan</p>
                    </div> */}

                    <button className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]  rounded-md bg-primary drop-shadow-lg flex justify-center items-center hover:bg-third cursor-pointer"
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
                              sessionStorage.setItem("redirectPath", window.location.pathname);
                              window.location.href = "/Masuk";
                            },
                          });
                        } else {
                          window.open(process.env.REACT_APP_URL_API + `/download-pdf?halaman=${infoKodePage}&id_member=${idMember}`);
                        }
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faDownload}
                        color="#24445A"
                      />
                    </button>
                    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]  rounded-md bg-primary drop-shadow-lg flex justify-center items-center hover:bg-third cursor-pointer" onClick={() => shareBtn(infoKodePage)}>
                      <FontAwesomeIcon
                        icon={faShare}
                        color="#24445A"
                      />
                    </div>

                    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-md bg-primary drop-shadow-lg flex justify-center items-center opacity-60">
                      <FontAwesomeIcon
                        icon={faSearchLocation}
                        color="#24445A"
                      />
                    </div>
                  </div>
                  <p className="mt-[10px]">
                    Sumber: <span>{sumbernya}</span>
                  </p>
                </div>
              </>
            )}
            {activeTab === "nasional" && (
              <>
                {Nasional(dataChartNasional, angkaTertinggi)}
                {Provinsi(dataChartSelected, angkaTertinggi)}
                <div id="sortnya" className="hidden flex justify-end w-full px-[30px] gap-x-[20px]">
                  {/* FILTER */}
                  <div className="w-[150px] text-secondary font-medium text-[14px] cursor-pointer">
                    <div
                      onClick={() => setOpenSort(!openSort)}
                      className="bg-[#ebebeb] gap-x-[8px] w-full p-2 flex items-center justify-center rounded-[10px]"
                    >
                      {selectedSort ? selectedSort : "Urutkan"}
                      <FontAwesomeIcon
                        icon={faArrowDownShortWide}
                        color="#24445A"
                        className={`w-[15px] h-[15px] ${selectedSort === "Teratas" && "rotate-180"
                          }`}
                      />
                    </div>
                    <ul
                      className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-auto 
                          ${openSort ? "max-h-[240px]" : "max-h-[0]"}`}
                    >
                      <li
                        className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]
                        `}
                        onClick={() => {
                          setSelectedSort("Teratas");
                          setOpenSort(false);
                          sortAsc();
                        }}
                      >
                        Teratas
                      </li>
                      {/* <li className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]
                        ${
                          selectedSort === "Terbawah" && "bg-secondary text-white"
                        }
                        `} */}
                      <li
                        className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px]`}
                        onClick={() => {
                          setSelectedSort("Terbawah");
                          setOpenSort(false);
                          sortDesc();
                        }}
                      >
                        Terbawah
                      </li>
                    </ul>
                  </div>
                </div>
                {elementChart}
                <div id="sumbernya" className="text-center mt-[20px] text-secondary italic">
                  <div className="flex w-full h-[50px] items-center justify-center gap-[10px] md:gap-[20px] ">
                    <div className="flex items-center gap-[10px]">
                      <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-md bg-primary drop-shadow-lg flex justify-center items-center ">
                        <FontAwesomeIcon
                          icon={faEye}
                          color="#24445A"
                          className=""
                        />
                      </div>
                      <p className="text-[12px] md:text-[16px]">{infoPageView} Lihat</p>
                    </div>

                    {/*<div className="flex items-center gap-[10px]">
                      <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-md bg-primary drop-shadow-lg flex justify-center items-center hover:bg-third cursor-pointer">
                        <FontAwesomeIcon
                          icon={faBookBookmark}
                          color="#24445A"
                        />
                      </div>
                      <p className="text-[12px] md:text-[16px]">{infoPageSave} Simpan</p>
                    </div>*/}

                    <button className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]  rounded-md bg-primary drop-shadow-lg flex justify-center items-center hover:bg-third cursor-pointer"
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
                              sessionStorage.setItem("redirectPath", window.location.pathname);
                              window.location.href = "/Masuk";
                            },
                          });
                        } else {
                          window.open(process.env.REACT_APP_URL_API + `/download-pdf?halaman=${infoKodePage}&id_member=${idMember}`);
                        }
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faDownload}
                        color="#24445A"
                      />
                    </button>
                    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]  rounded-md bg-primary drop-shadow-lg flex justify-center items-center hover:bg-third cursor-pointer" onClick={() => shareBtn(infoKodePage)}>
                      <FontAwesomeIcon
                        icon={faShare}
                        color="#24445A"
                      />
                    </div>

                    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-md bg-primary drop-shadow-lg flex justify-center items-center opacity-60">
                      <FontAwesomeIcon
                        icon={faSearchLocation}
                        color="#24445A"
                      />
                    </div>
                  </div>
                  <p className="mt-[10px]">
                    Sumber: <span>{sumbernya}</span>
                  </p>
                </div>
                {/* <Pagination/> */}
              </>
            )}
          </div>
        </div>
      </div>

      <div id="kondisiNonLogin" className="hidden">
        <div className="flex flex-col mt-[125px] mb-[150px] justify-center items-center">
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
            Mau Jelajahi <br /> daerah apa hari ini?
          </h1>
          <p className="mt-[20px] text-secondary font-semibold">Tenang, tinggal pilih dibawah!</p>
          {/* DROPDOWN */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-[40px] gap-y-[10px] mt-[20px]">
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
                  className={`ml-[20px] w-[10px] h-[20px] ${openProvinsi && "rotate-180"
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
                      ${provinces?.nama?.toLowerCase() ===
                      selected?.toLowerCase() && "bg-secondary text-white"
                      }
                      ${provinces?.nama?.toLowerCase().includes(inputValue)
                        ? "block"
                        : "hidden"
                      }`}
                    onClick={() => {
                      updateKota(provinces?.nama, selected, provinces.id);
                      sessionStorage.setItem("idprovinsi", provinces.id);
                      sessionStorage.setItem("namaprovinsi", provinces.nama);
                      setGetInfoProvinsi(provinces.id);
                      setWilayahID(provinces.id);
                      sessionStorage.setItem("namawilayah", "Semua");
                      setInfoDaerah("Semua");
                      setSelectedCity("Semua");
                      setDataranicon("Semua");
                      setSelectedYears(sessionStorage.getItem("yearss"));
                      updatePeta(provinces.id);
                      askIsProvince(true);
                      updateSektor();
                      provinsi = provinces.id;
                      wilayah = provinces.id;
                      setActiveTab("provinsi");
                      sessionStorage.setItem("namakota", "Semua");
                      sessionStorage.setItem("idkota", provinces.id);
                      document.getElementById("kondisiLogin").classList.remove("hidden")
                      document.getElementById("kondisiNonLogin").classList.add("hidden")
                    }}
                  >
                    {provinces?.nama}
                  </li>
                ))}
              </ul>
            </div>

            {/* FETCHING KOTA */}
            <div className="w-[250px] h-auto text-secondary font-medium text-[14px]">
              <div className="bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px] cursor-pointer"
                onClick={() => {
                  setOpenProvinsi(prevState => !prevState);
                  handlePopup();
                }}
              >
                {"Kota/Kabupaten"}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  color="#24445A"
                  className={`ml-[20px] w-[10px] h-[20px]`}
                />
              </div>
            </div>

            {/* FETCHING TAHUN */}
            <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
              <div
                onClick={() => setOpenYears(!openYears)}
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
                  className={`ml-[120px] w-[10px] h-[20px] ${openYears && "rotate-180"
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
                      ${tahunn?.tahun?.toLowerCase() ===
                      selectedYears?.toLowerCase() && "bg-secondary text-white"
                      }

                      ${tahunn?.tahun?.toLowerCase().includes(inputValueofYears)
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
            </div>
          </div>
          <img
            src={jelajahTandaTanya}
            alt=""
            className="w-[350px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Jelajahmain;
