import React, { useState, useEffect, useRef } from "react";
import map from "../../assets/icons/peta.png";
import people from "../../assets/icons/people.png";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import arrowl from "../../assets/icons/arrowl.png";
import arrowr from "../../assets/icons/arrowr.png";
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
import Cookies from 'js-cookie';
import axios from "axios";
const Jelajahmain = () => {
  const [idMember, setIdMember] = useState(null);
  const [tokenUser, setTokenUser] = useState(sessionStorage.getItem("token"));
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      alert("Geolocation tidak support pada browser ini.")
    }
  }
  const [LatitudeUser, setLatitudeUser] = useState(null);
  const [Longitude, setLongitude] = useState(null);
  const [ParentDataset, setParentDataset] = useState(null);
  const [datasetTerpilih, setDatasetTerpilih] = useState([]);
  const [emailUser, setEmailUser] = useState("");
  function showPosition(position) {
    setLatitudeUser(position.coords.latitude)
    setLongitude(position.coords.longitude)
  }
  useEffect(() => {
    getLocation();
  },[navigator.geolocation]);

  ///GET INFO PROFILE USER
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
        setIdMember(data_profile.id);
        setEmailUser(data_profile.email);
        setUserAge(data_profile.tanggal_lahir)
        setUserGender(data_profile.title)
        
      })
      .catch((error) => {
        setEmailUser("");
      });
    }
  }, [tokenUser]);


  const [activeTab, setActiveTab] = useState("provinsi");

  const toggleTab = () => {
    setActiveTab(activeTab === "provinsi" ? "nasional" : "provinsi", () => {});
  };

  const SwitchBtn = ({ switcher, setSwitcher }) => (
    <div id="switchernyaa" className="switch">
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
    fetch(process.env.REACT_APP_URL_API+"/year")
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
    fetch(process.env.REACT_APP_URL_API+"/provinces")
      .then((response) => response.json())
      .then((data) => {
        if (sessionStorage.getItem("idprovinsi") === null && sessionStorage.getItem("namaprovinsi") === null){
          setProvinces(data.data);
          document.getElementById("kondisiLogin").classList.add("hidden")
          document.getElementById("kondisiNonLogin").classList.remove("hidden")
        }else{
          setProvinces(data.data);
          updateSektor();
          document.getElementById("kondisiLogin").classList.remove("hidden")
          document.getElementById("kondisiNonLogin").classList.add("hidden")
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
    fetch(process.env.REACT_APP_URL_API+"/sektor/"+sessionStorage.getItem("yearss"))
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
            if(!is_province){
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

  // function clickElement(target){
  //   try {
  //     document.getElementById(target).click()
  //   } catch (error) {
  //     clickElement(target)
  //     // setTimeout(clickElement(target),100);
  //   }
  // }
  // useEffect(()=>{
  //   if(sektor.length > 0 && countSektor == 0){
  //     if(sessionStorage.getItem("historyParentDataset") !== null){
  //       var historyParentDataset = sessionStorage.getItem("historyParentDataset")
  //       document.getElementById(`sektor_${historyParentDataset}`).click();
  //       var counter = countSektor+1
  //       setCountSektor(counter)
  //       var historyDataset = JSON.parse(sessionStorage.getItem("historyChildDatasetArray"))
  //       if(historyDataset.length == 1){
  //         // clickElement(`children_${historyDataset[0]}`)
  //         // document.getElementById(`children_${historyDataset[0]}`).click()
  //       }
  //     }
  //   }
  // },[sektor])

  useEffect(() => {
    if (sessionStorage.getItem("namakota") === "Semua") {
      askIsProvince(true);
    } else {
      askIsProvince(false);
    }
  });
  
  
  
  var localstate = listkey;
  const popUpRetribusi = () =>{
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
  // const popUpASN = () =>{
  //   Swal.fire({
  //     title: "Perhatian!",
  //     text: "Jumlah ASN/PNS berdasarkan jabatan disesuaikan dengan Peraturan Menteri (Permen) PANRB Nomor 28 Tahun 2019 tentang Penyetaraan Jabatan Administrasi Ke Dalam Jabatan Fungsional.",
  //     confirmButtonText: "Tutup",
  //     confirmButtonColor: "#24445a",
  //     customClass: {
  //       title: "title-icon-errorr",
  //       text: "text-icon",
  //       confirmButton: "confirm-icon",
  //     },
  //   });
  // }
  function setcontentdropdwon(index, id, data) {
    data.forEach((element) => {
      if (element.id === id) {
        if(element.id === 24){
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
            if(!is_province){
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
        else{
          setDropdown(list);
        }
      }
    });

  }

  const [selecteditems, setSelectedItems] = useState("");

  function Labelsnama({ data }) {
    const [openitems, setOpenItems] = useState(false);
    const [inputvalueitems, setInputValueItems] = useState("");
    const [items, setItems] = useState(data.sector);
    // var historyArray = JSON.parse(sessionStorage.getItem("historyChildDatasetArray")) || [];
    function handleClick(data, label) {
      setcontentdropdwon(data.index, label.id, data.element.children);
      setSelectedItems(label.nama);
    }
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
              className={`ml-[20px] w-[10px] h-[20px] ${
                openitems && "rotate-180"
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
                ${
                  label?.nama?.toLowerCase() === selecteditems?.toLowerCase() &&
                  "bg-secondary text-white"
                }
                ${
                  label?.nama?.toLowerCase().includes(inputvalueitems)
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
                  setDatasetTerpilih((prevDatasetTerpilih) => [
                    ...prevDatasetTerpilih,
                    label.nama,
                  ]);
                  setContainData(label.contain_data)
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
  const [containData, setContainData] = useState("");
  const [rankData, setRankData] = useState(null);
  const [dataChart, setDataChart] = useState("");
  const [dataChartNasional, setDataChartNasional] = useState("");
  const [dataChartSelected, setDataChartSelected] = useState("");
  const [angkaTertinggi, setAngkaTertinggi] = useState(0);
  var timer;
  useEffect(() => {
    if (bidang !== null && containData !== "n") {
      Kategori();
      dataStatsUser()
      clearTimeout(timer);
      timer = setTimeout(function(){
        kategoriRecord();
        timer = null;
      }, 7000);
      document.getElementById("JudulPeringkat").classList.remove("hidden");
      document.getElementById("arrowww").classList.remove("invisible");
      document.getElementById("Peringkatnya").classList.remove("hidden");
    } else {
      document.getElementById("JudulPeringkat").classList.add("hidden");
      document.getElementById("arrowww").classList.add("invisible");
      document.getElementById("Peringkatnya").classList.add("hidden");
    }
    return () => {
      clearTimeout(timer);
    };
  }, [bidang, activeTab, wilayahID, selectedYears, containData]);

  useEffect(() => {
    if (
      sessionStorage.getItem("idprovinsi") !== null &&
      sessionStorage.getItem("idkota") !== null
    ) {
      updateSektor();
      if (is_province === true) {
        document.getElementById("switchernyaa").classList.add("hidden");
      } else if (is_province === false) {
        if(bidang !== null && containData !== "n"){
          document.getElementById("switchernyaa").classList.remove("hidden");
        }
      }
    }
  }, [is_province, bidang, containData]);

  const [sumbernya, setSumber] = useState("");
  const [typeAVG, setTypeAVG] = useState("");
  const [elementChart, setElementChart] = useState([]);
  const [infoPageView, setInfoPageView] = useState();
  const [infoPageSave, setinfoPageSave] = useState();
  const [infoKodePage, setinfoKodePage] = useState();
  const [infoIDPage, setinfoIDPage] = useState();
  const [halamanTipe, setHalamanTipe] = useState();
  const [notes, setNotes] = useState([]);

  function kategoriRecord(){
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
    params.append("tahun", selectedYears);
    params.append("id_wilayah", wilayahID);
    params.append("bidang", bidang);
    params.append("is_province", is_province);
    params.append("province_rank", activeTab === "nasional" ? true : false);
    params.append("perkapita", true);
    if(sessionStorage.getItem("token") !== null){
      params.append("record", true);
    }
    fetch(
      process.env.REACT_APP_URL_API+"/jelajah?" + params.toString(),
      requestnya
    )
      .then((response) => response.json())
      .then((result) => {
        if(result.success === false){
          setInfoPageView(null)
        }else{
          setInfoPageView(result.data.info.view)
        }
        
      });
  }
  const [loading, setLoading] = useState(false);

  function Kategori() {
    var params = new URLSearchParams();
    params.append("tahun", selectedYears);
    params.append("id_wilayah", wilayahID);
    params.append("bidang", bidang);
    params.append("is_province", is_province);
    params.append("province_rank", activeTab === "nasional" ? true : false);
    params.append("perkapita", true);
  
    // Set loading to true before the fetch request
    setLoading(true);
  
    fetch(
      process.env.REACT_APP_URL_API + "/jelajah?" + params.toString(), 
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        var tempElementChart = [];
        if (result.success === true) {
          var data = result.data.rank;
          var dataNilaiTertinggi = data[0].nilai;
          var convertString = dataNilaiTertinggi.replaceAll(".", "");
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
          var idPage = result.data.info.id;
          var tipeHalaman = result.data.info.halaman_tipe;
          var type = result.data.avg.type
          setSatuan(result.data.satuan);
          setNotes(result.data.notes.length > 0 ? result.data.notes : []);

          for (var i = 0; i < data.length; i++) {
            var nilaidariGraph = data[i].nilai;
            var convertnya = nilaidariGraph.replaceAll(".", "");
            data[i].persentase = (convertnya / highestValue) * 100;
            var angka = highestValue === 0 ? 0 : data[i].persentase;
            tempElementChart.push(
              <section key={i}>
                <div className="hidden md:hidden xl:block">
                  <div className="flex mt-[20px] w-full items-center justify-center px-[30px]">
                    <div className="w-[300px] text-left">
                      <p className="font-bold text-[#247DBD] text-[24px] uppercase">
                        {data[i].nama}
                      </p>
                    </div>

                    <div className="w-[660px] border-solid border-[1px] rounded-full border-secondary relative overflow-hidden">
                      <div
                        className="bg-[#CDDBE3] h-full rounded-full"
                        style={{
                          width: angka <= 0 ? '0%' : `${angka}%`
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
                      
                      <div className="w-[660px] border-solid border-[1px] rounded-full border-secondary relative overflow-hidden">
                        <div
                          className="bg-[#CDDBE3] h-full rounded-full"
                          
                          style={{
                            width: angka <= 0 ? '0%' : `${angka}%`
                          }}
                          
                        >
                          <p className="px-2 font-bold text-[20px] text-secondary ml-[20px]">
                            {data[i].nilai}
                          </p>
                        </div>
                      </div>
                      {/* <div className="w-[660px] border-solid border-2 rounded-full border-secondary">
                        <div
                          className={`bg-[#CDDBE3] rounded-full border-1`}
                          style={{
                            width: (() => {
                              if (Math.round(angka) >= 1 && Math.round(angka) <= 5) {
                                return '5%';
                              } else if (Math.round(angka) >= 5) {
                                return Math.round(angka) + '%';
                              } else if (Math.round(angka) <= 0) {
                                return '0%';
                              }
                            })()
                          }}
                        >
                          <p className="px-2 font-bold text-[20px] text-secondary ml-[20px]">
                            {data[i].nilai}
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="md:hidden">
                  <div className="flex w-screen items-center justify-between px-[60px] mt-[20px]">
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <p className="font-bold text-[#247DBD] text-[16px] uppercase">
                          {data[i].nama}
                        </p>
                        <p className="text-right font-bold text-[#CDDBE3] text-[16px]">
                          #{data[i].rank}
                        </p>
                      </div>
                      <div className="w-full border-solid border-[2px] rounded-full border-secondary relative overflow-hidden">
                        <div
                          className="bg-[#CDDBE3] h-full rounded-full"
                          style={{
                            width: angka <= 0 ? '0%' : `${angka}%`
                          }}
                        >
                          <p className="px-2 font-bold text-[14px] text-secondary ml-[20px]">
                            {data[i].nilai}
                          </p>
                        </div>
                      </div>
                      {/* <div className="w-full border-solid border-2 rounded-full border-secondary">
                        <div
                          className={`bg-[#CDDBE3] rounded-full border-1`}
                          style={{
                            width: (() => {
                              if (Math.round(angka) >= 1 && Math.round(angka) <= 5) {
                                return '5%';
                              } else if (Math.round(angka) >= 5) {
                                return Math.round(angka) + '%';
                              } else if (Math.round(angka) <= 0) {
                                return '0%';
                              }
                            })()
                          }}
                        >
                          <p className="px-2 font-bold text-[14px] text-secondary ml-[20px]">
                          {(data[i].nilai)}
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </section>
            );
          }
          setTypeAVG(type)
          setElementChart(tempElementChart);
          setRankData(data);
          setSumber(sumber);
          setInfoPageView(view);
          setinfoPageSave(save);
          setinfoKodePage(kodePage);
          setinfoIDPage(idPage);
          setHalamanTipe(tipeHalaman);
          document.getElementById("JudulPeringkat").classList.remove("hidden");
          document.getElementById("arrowww").classList.remove("invisible");
          document.getElementById("sumbernya").classList.remove("hidden");
          document.getElementById("sortnya").classList.remove("hidden");
        }else if(containData !== "n"){
          var tempElementChart = [];
          if (containData !== "n") {
            tempElementChart.push(
              <section>
                <p className="font-bold text-secondary text-[16px] md:text-[24px] mt-[40px]">Data belum tersedia</p>
              </section>
            );
          }
          setDataChartSelected(null);
          setDataChartNasional(null);
          setAngkaTertinggi(null);
          setElementChart(tempElementChart);
          setNotes([]);
          setSatuan(null);
          setTypeAVG(null)
          document.getElementById("JudulPeringkat").classList.add("hidden");
          document.getElementById("sumbernya").classList.add("hidden");
          document.getElementById("sortnya").classList.add("hidden");
        }
      })
      .catch((error) => {
        
      })
      .finally(() => {
        setLoading(false);
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
    if(nasionalisme != null && highestValue != null){
      if(nasionalisme.nilai != null){
      var nilaiNasional = nasionalisme.nilai
      var convertLagi = nilaiNasional.replaceAll(".","")
      var angkaNasional = (parseInt(convertLagi) / highestValue) * 100;
      var convertAngkaNasional;
      if (highestValue == 0){
        convertAngkaNasional = 0
      }else{
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
                  &#40;{typeAVG}&#41;
                </p>
              </div>
              <div className="w-[660px] border-solid border-[1px] rounded-full border-secondary relative overflow-hidden">
                <div
                  className="bg-secondary h-full rounded-full border-[1px]"
                  style={{
                    width: convertAngkaNasional <= 0 ? '0%' : `${convertAngkaNasional}%`
                  }}
                >
                  <p className="px-2 font-bold text-[20px] text-white ml-[20px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {nasionalisme.nilai}
                  </p>
                </div>
              </div>

              {/* <div className="w-[660px] border-solid border-[1px] rounded-full border-secondary">
                <div
                  className={`bg-secondary rounded-full border-[1px]`}
                  style={{
                    width: (() => {
                      if (Math.round(convertAngkaNasional) >= 1 && Math.round(convertAngkaNasional) <= 5) {
                        return '5%';
                      } else if (Math.round(convertAngkaNasional) >= 5) {
                        return Math.round(convertAngkaNasional) + '%';
                      } else if (Math.round(convertAngkaNasional) <= 0) {
                        return '0%';
                      }
                    })()
                  }}
                >
                  <p className="px-2 font-bold text-[20px] text-white ml-[20px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {(nasionalisme.nilai)}
                  </p>
                </div>
              </div> */}
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
                    &#40;{typeAVG}&#41;
                  </p>
                  <p className="text-right font-bold text-third text-[24px]"> </p>
                </div>
                <div className="w-[660px] border-solid border-[1px] rounded-full border-secondary relative overflow-hidden">
                  <div
                    className="bg-secondary h-full rounded-full border-[1px]"
                    style={{
                      width: convertAngkaNasional <= 0 ? '0%' : `${convertAngkaNasional}%`
                    }}
                  >
                    <p className="px-2 font-bold text-[20px] text-white ml-[20px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      {nasionalisme.nilai}
                    </p>
                  </div>
                </div>
                {/* <div className="w-[660px] border-solid border-[2px] rounded-full border-secondary">
                  <div
                    className={`bg-secondary rounded-full border-[1px] `}
                    style={{
                      width: (() => {
                        if (Math.round(convertAngkaNasional) >= 1 && Math.round(convertAngkaNasional) <= 5) {
                          return '5%';
                        } else if (Math.round(convertAngkaNasional) >= 5) {
                          return Math.round(convertAngkaNasional) + '%';
                        } else if (Math.round(convertAngkaNasional) <= 0) {
                          return '0%';
                        }
                      })()
                    }}
                  >
                    <p className="px-2 font-bold text-[20px] text-white ml-[20px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      {(nasionalisme.nilai)}

                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <div className="flex w-screen items-center justify-between px-[60px] mt-[20px]">
              <div className="w-full">
                <div className="flex flex-col justify-between w-full">
                  <p className="font-bold text-[#247DBD] text-[16px] uppercase">
                    {nasionalisme.nama}
                  </p>
                  <p className="font-semibold text-[#247DBD] text-[12px] uppercase">
                  &#40;{typeAVG}&#41;
                  </p>
                  <p className="text-right font-bold text-third text-[16px]"> </p>
                </div>
                <div className="w-full border-solid border-2 rounded-full border-secondary relative overflow-hidden">
                  <div
                    className="bg-secondary h-full rounded-full border-[1px]"
                    style={{
                      width: convertAngkaNasional <= 0 ? '0%' : `${convertAngkaNasional}%`
                    }}
                  >
                    <p className="px-2 font-bold text-[14px] text-white ml-[20px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      {nasionalisme.nilai}
                    </p>
                  </div>
                </div>
                {/* <div className="w-full border-solid border-2 rounded-full border-secondary ">
                  <div
                    className={`bg-secondary rounded-full border-[1px]`}
                    style={{
                      width: (() => {
                        if (Math.round(convertAngkaNasional) >= 1 && Math.round(convertAngkaNasional) <= 5) {
                          return '5%';
                        } else if (Math.round(convertAngkaNasional) >= 5) {
                          return Math.round(convertAngkaNasional) + '%';
                        } else if (Math.round(convertAngkaNasional) <= 0) {
                          return '0%';
                        }
                      })()
                    }}
                  >
                    <p className="px-2 font-bold text-[14px] text-white ml-[20px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      {(nasionalisme.nilai)}
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      );
      }
    }
  };
  const Provinsi = (wilayahTerpilih, highestValue) => {
    if(wilayahTerpilih !== null && highestValue !== null){
      if(wilayahTerpilih.nilai != null){
        var nilaiWilayahTerpilih = wilayahTerpilih.nilai
        var convertLagiWilayah = nilaiWilayahTerpilih.replaceAll(".","")
        var angkaProvinsi = (convertLagiWilayah / highestValue) * 100;
        var convertAngkaProvinsi;
        if (highestValue == 0){
          convertAngkaProvinsi = 0
        }else{
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
                <div className="w-[660px] border-solid border-[1px] rounded-full border-secondary relative overflow-hidden">
                  <div
                    className="bg-third h-full rounded-full"
                    style={{
                      width: convertAngkaProvinsi <= 0 ? '0%' : `${convertAngkaProvinsi}%`
                    }}
                  >
                    <p className="px-2 font-bold text-[20px] text-secondary ml-[20px]">
                      {wilayahTerpilih.nilai}
                    </p>
                  </div>
                </div>
                {/* <div className="w-[660px] border-solid border-[1px] rounded-full border-secondary">
                  <div
                    className={`bg-third rounded-full`}
                    style={{
                      width: (() => {
                        if (Math.round(convertAngkaProvinsi) >= 1 && Math.round(convertAngkaProvinsi) <= 5) {
                          return '5%';
                        } else if (Math.round(convertAngkaProvinsi) >= 5) {
                          return Math.round(convertAngkaProvinsi) + '%';
                        } else if (Math.round(convertAngkaProvinsi) <= 0) {
                          return '0%';
                        }
                      })()
                    }}
                  >
                    <p className="px-2 font-bold text-[20px] text-secondary ml-[20px]">
                      {(wilayahTerpilih.nilai)}
                    </p>
                  </div>
                </div> */}
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
                  <div className="w-[660px] border-solid border-[1px] rounded-full border-secondary relative overflow-hidden">
                    <div
                      className="bg-third h-full rounded-full"
                      style={{
                        width: convertAngkaProvinsi <= 0 ? '0%' : `${convertAngkaProvinsi}%`
                      }}
                    >
                      <p className="px-2 font-bold text-[20px] text-secondary ml-[20px]">
                        {wilayahTerpilih.nilai}
                      </p>
                    </div>
                  </div>
                  {/* <div className="w-[660px] border-solid border-2 rounded-full border-secondary">
                    <div
                      className={`bg-third rounded-full border-[1px]`}
                      style={{
                        width: (() => {
                          if (Math.round(convertAngkaProvinsi) >= 1 && Math.round(convertAngkaProvinsi) <= 5) {
                            return '5%';
                          } else if (Math.round(convertAngkaProvinsi) >= 5) {
                            return Math.round(convertAngkaProvinsi) + '%';
                          } else if (Math.round(convertAngkaProvinsi) <= 0) {
                            return '0%';
                          }
                        })()
                      }}
                    >
                      <p className="px-2 font-bold text-[20px] text-secondary ml-[20px]">
                        {(wilayahTerpilih.nilai)}
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
    
            <div className="md:hidden">
              <div className="flex w-screen items-center justify-between px-[60px] mt-[20px]">
                <div className="w-full">
                  <div className="flex justify-between w-full">
                    <p className="font-bold text-secondary text-[16px] uppercase">
                      {wilayahTerpilih.nama}
                    </p>
                    <p className="text-right font-bold text-third text-[16px]">
                      #{wilayahTerpilih.rank}
                    </p>
                  </div>
                  <div className="w-full border-solid border-[2px] rounded-full border-secondary relative overflow-hidden">
                    <div
                      className="bg-third h-full rounded-full"
                      style={{
                        width: convertAngkaProvinsi <= 0 ? '0%' : `${convertAngkaProvinsi}%`
                      }}
                    >
                      <p className="px-2 font-bold text-[14px] text-secondary ml-[20px]">
                        {wilayahTerpilih.nilai}
                      </p>
                    </div>
                  </div>
                  {/* <div className="w-full border-solid border-2 rounded-full border-secondary">
                    <div
                      className={`bg-third rounded-full border-[1px]`}
                      style={{
                        width: (() => {
                          if (Math.round(convertAngkaProvinsi) >= 1 && Math.round(convertAngkaProvinsi) <= 5) {
                            return '5%';
                          } else if (Math.round(convertAngkaProvinsi) >= 5) {
                            return Math.round(convertAngkaProvinsi) + '%';
                          } else if (Math.round(convertAngkaProvinsi) <= 0) {
                            return '0%';
                          }
                        })()
                      }}
                    >
                      <p className="px-2 font-bold text-[14px] text-secondary ml-[20px]">
                        {(wilayahTerpilih.nilai)}
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </section>
        );
      }
    }
  };
  
  if(jumlahpenduduk!=null){
    var convertStringtoInt = jumlahpenduduk.replaceAll(".","")
    var data_Penduduk = parseInt(convertStringtoInt) / 1000;
  }
  const [testHandlePeringkatnya, setTestHandlePeringkatnya] = useState(false);
  const [glosarium, setGlosarium] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchGlosarium = async () => {
    const response = await fetch(
      process.env.REACT_APP_URL_API+"/info/list?parent=[1,2,3]",
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

  const shareBtn = async (halaman) => {
    const query = new URLSearchParams();
    query.append("halaman", halaman);
    query.append("id_member", idMember);
  
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL_API}/share-pdf?${query.toString()}`);
      
      if (response.data.success) {
        const share_data = {
          title: "Data Peringkat",
          text: "Yuk cek halaman ini, dan dapatkan insight", //kalimat
          url: response.data.data.url, //url yang ingin dibagikan
        };
  
        // Proses share data
        try {
          await navigator.share(share_data);
        } catch (err) {
          console.error('Sharing failed', err);
        }
      } else {
        // Jika gagal
        Swal.fire({
          title: "Gagal!",
          text: "Terdapat kesalahan, Silakan coba lagi nanti.",
          confirmButtonText: "Tutup",
          confirmButtonColor: "#24445a",
          customClass: {
            title: "title-icon-error",
            text: "text-icon",
            confirmButton: "confirm-icon",
          },
        });
      }
    } catch (error) {
      console.error('Error fetching the share data:', error);
      Swal.fire({
        title: "Gagal!",
        text: "Terdapat kesalahan, Silakan coba lagi nanti.",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#24445a",
        customClass: {
          title: "title-icon-error",
          text: "text-icon",
          confirmButton: "confirm-icon",
        },
      });
    }
  };

  ///AKTIVITAS
  useEffect(()=>{
    if(sessionStorage.getItem("historyTipePeringkat") !== null && is_province == false){
      if(sessionStorage.getItem("historyTipePeringkat") == "NASIONAL"){
        setActiveTab("provinsi");
        console.log(activeTab)
      }else if(sessionStorage.getItem("historyTipePeringkat") == "PROVINSI"){
        setActiveTab("nasional");
        console.log(activeTab)
      }
    }
  },[activeTab, is_province])
  useEffect(()=>{
    if(sektor.length > 0 && countSektor == 0){
      if(sessionStorage.getItem("historyParentDataset") !== null){
        var historyParentDataset = sessionStorage.getItem("historyParentDataset")
        document.getElementById(`sektor_${historyParentDataset}`).click();
        var counter = countSektor+1
        setCountSektor(counter)
      }
    }
  },[sektor])
  const clickedIds = useRef(new Set());

  useEffect(() => {
    if (!dropdown || dropdown.length === 0) return;

    const historyParentDataset = sessionStorage.getItem("historyParentDataset");
    const historyChildDatasetArray = JSON.parse(sessionStorage.getItem("historyChildDatasetArray"));

    if (historyParentDataset && historyChildDatasetArray) {
      dropdown.forEach(items => {
        items.sector.forEach(item => {
          if (historyChildDatasetArray.includes(item.id) && !clickedIds.current.has(item.id)) {
            const childElement = document.getElementById(`children_${item.id}`);
            if (childElement) {
              childElement.click();
              clickedIds.current.add(item.id);
              setBidang(item.id)
              setDatasetTerpilih(prevDatasetTerpilih => [
                ...prevDatasetTerpilih,
                item.nama,
              ]);
              setContainData(item.contain_data)
            }
          }
        });
      });
    }
  }, [dropdown, selectedButton]);

  ///BUTTON SIMPAN
  
  const [showPopupSimpan, setShowPopupSimpan] = useState(false);
  const [showPopupKoleksi, setShowPopupKoleksi] = useState(false);
  const [formCollection, setFormCollection] = useState({
    namaKoleksi: "",
  });
  const { namaKoleksi } = formCollection;
  const [KoleksiUser, setKoleksiUser] = useState([]);

  const [akunPrem, setAkunPrem] = useState("N")
  const handleNewCollection = (e) => {
    const { value } = e.target;
    setFormCollection((prevState) => ({
      ...prevState,
      namaKoleksi: value,
    }));
  };

  const addNewCollection = async (e) => {
    e.preventDefault();
  
    if (formCollection.namaKoleksi.trim() !== "") {
      const dataSimpan = new URLSearchParams();
      dataSimpan.append("name", namaKoleksi);
  
      try {
        const response = await axios.post(`${process.env.REACT_APP_URL_API}/make-collection`, dataSimpan, {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        });
  
        if (response.data.success === true) {
          ListKategori(); // Call function to refresh category list
          Swal.fire({
            iconHtml: '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
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
            icon: 'error',
            title: 'Gagal!',
            text: response.data.error,
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
        console.error("Error creating collection:", error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
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
  

  const togglePopupSimpan = () => {
    setShowPopupSimpan(!showPopupSimpan);
  };
  const togglePopupKoleksi = () => {
    setShowPopupKoleksi(!showPopupKoleksi);
    setShowPopupSimpan(!showPopupSimpan);
  };
  useEffect(() => {
    ListKategori()
  }, [tokenUser]);
  function ListKategori() {
    if (tokenUser !== null) {
      axios.get(`${process.env.REACT_APP_URL_API}/get-collection`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${tokenUser}`
        }
      })
      .then((response) => {
        const data_Koleksi = response.data.data;
        setKoleksiUser(data_Koleksi);
      })
      .catch((error) => {
        console.error('Error fetching collections:', error);
      });
    }
  }

  const SimpanHalamanKoleksi = async (halaman, idKoleksi) => {
    try {
      const dataSimpan = new URLSearchParams();
      dataSimpan.append("kodeHalaman", halaman);
      dataSimpan.append("koleksi", idKoleksi);
  
      const response = await axios.post(`${process.env.REACT_APP_URL_API}/save`, dataSimpan.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${tokenUser}`,
        },
      });
  
      console.log(response.data);
  
      if (response.data.success === true) {
        Kategori(); // Refresh the list of categories
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
            togglePopupSimpan();
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: response.data.error,
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
      console.error("Error saving page:", error);
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
  ///UNTUK GRATISAN
  const SimpanHalamanSemua = async (halaman) => {
    try {
      const dataSimpan = new URLSearchParams();
      dataSimpan.append("kodeHalaman", halaman);
  
      const response = await axios.post(`${process.env.REACT_APP_URL_API}/save`, dataSimpan.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${tokenUser}`,
        },
      });
  
      console.log(response.data);
  
      if (response.data.success === true) {
        Kategori(); // Refresh the list of categories
  
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
            if (akunPrem === "Y") {
              togglePopupSimpan();
            } else {
              // Handle non-premium account behavior here if necessary
            }
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: response.data.error,
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
      console.error("Error saving page:", error);
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

  // const SimpanHalamanKoleksi = async (idPage, idKoleksi) => {
  //   try{
  //     var dataSimpan = new URLSearchParams();
  //     dataSimpan.append("id", "[" + idPage + "]");
  //     var xhr_newSave = new XMLHttpRequest();
  //     xhr_newSave.onload = function () {
  //       var response = JSON.parse(this.responseText);
  //       console.log(response)
  //       if (response.success == true) {
  //         Swal.fire({
  //           iconHtml:
  //             '<img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" class="custom-icon" />',
  //           title: "Berhasil!",
  //           text: "Berhasil menyimpan halaman.",
  //           confirmButtonText: "Lanjutkan",
  //           confirmButtonColor: "#27AE60",
  //           customClass: {
  //             icon:"no-border",
  //             title: "title-icon",
  //             text: "text-icon",
  //             confirmButton: "confirm-icon",
  //           },
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             togglePopupSimpan()
  //           }
  //         });
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Gagal!',
  //           text: 'Halaman sudah tersimpan.',
  //           confirmButtonText: "Tutup",
  //           confirmButtonColor: "#CD3838",
  //           customClass: {
  //             title: "title-icon-error",
  //             text: "text-icon",
  //             confirmButton: "confirm-icon",
  //           },
  //         });
  //       }
  //     };
  //     xhr_newSave.open("POST", process.env.REACT_APP_URL_API+"/add-to-collection/"+idKoleksi);
  //     xhr_newSave.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  //     xhr_newSave.setRequestHeader("Authorization", `Bearer ${tokenUser}`);
  //     xhr_newSave.send(dataSimpan.toString());
  //   }
  //   catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Gagal!',
  //       text: 'Terdapat kesalahan. Silakan coba lagi nanti.',
  //       confirmButtonText: "Tutup",
  //       confirmButtonColor: "#CD3838",
  //       customClass: {
  //         title: "title-icon-error",
  //         text: "text-icon",
  //         confirmButton: "confirm-icon",
  //       },
  //     });
  //   }
  // };

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


  function previous() {
    if (selectedYears > years[years.length - 1].tahun) {
      setSelectedYears(Number(selectedYears) - 1);
      sessionStorage.setItem("yearss", Number(selectedYears) - 1);
      updatePeta(wilayahID);
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
      updatePeta(wilayahID);
      document.getElementById("animasiTahun").classList.remove("invisible")
      document.getElementById("animasiTahun").classList.add("fade-in-out")
      setTimeout(function(){
        document.getElementById("animasiTahun").classList.add("invisible")
      },800)
    }
  }
  function dataStatsUser(){
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
    formdata.append("guest", Cookies.get('id_guest'));
    formdata.append("status", tokenUser !== null ? 1 : 0);
    formdata.append("halaman", 1);
    formdata.append("lat", sessionStorage.getItem("latitudeUser") !== '' ? sessionStorage.getItem("latitudeUser") : "");
    formdata.append("long", sessionStorage.getItem("longitudeUser") !== '' ? sessionStorage.getItem("longitudeUser") : "");
    formdata.append("parent_dataset_1", ParentDataset);
    formdata.append("dataset_1",JSON.stringify(datasetTerpilih));
    formdata.append("parent_dataset_2", "");
    formdata.append("dataset_2", "");
    formdata.append("daerah_1", infoDaerah);
    formdata.append("daerah_2", "");
    formdata.append('email', emailUser ? emailUser : '');
    formdata.append('website_akses', '1');
    formdata.append("gender", tokenUser !== null ? gender : '');
    formdata.append("age", tokenUser !== null ? calculateAge(userAge) : '');
    const requestSystem = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

  fetch("https://development.otonometer.com:8000/api/visitor/add", requestSystem)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  }
  return (
    <div className="min-h-screen">
      <div id="animasiTahun" className="invisible fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[45%] w-full md:w-screen h-[93vh] p-5 rounded-[10px] bg-secondary bg-opacity-75 z-30 flex items-center justify-center">
        <div className=" text-white text-[96px] font-extrabold text-center align-middle">
          {selectedYears}
        </div>
      </div>

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
                      href={process.env.REACT_APP_URL_API+`/info/download/${selectedFile}`}
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
                onClick={() => {setOpenProvinsi(!openProvinsi)
                  if (openCity){
                    setOpenCity(!openCity)
                  }
                  if (openYears){
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
                      if(!is_province){
                        if(sessionStorage.getItem("historyParentDataset") !== null){
                          var historyParentDataset = sessionStorage.getItem("historyParentDataset")
                          document.getElementById(`sektor_${historyParentDataset}`).click();
                          var counter = countSektor+1
                          setCountSektor(counter)
                          setSelectedItems(null)
                          setBidang(null)
                          setContainData("")
                          setSelectedButton(historyParentDataset);
                          toggleKeuanganDropdown();
                          toggleKeuanganAnakan1();
                          toggleKeuanganAnakan2();
                        }
                        setShowKeuanganDropdown(false);
                      }
                      setSelectedSort("Urutkan");
                      updateKota(provinces?.nama, selected, provinces.id);
                      sessionStorage.setItem("idprovinsi", provinces.id);
                      sessionStorage.setItem("namaprovinsi", provinces.nama);
                      sessionStorage.setItem("idwilayah", provinces.id);
                      setGetInfoProvinsi(provinces.id);
                      setWilayahID(provinces.id);
                      sessionStorage.setItem("namawilayah", "Semua");
                      setInfoDaerah(provinces.nama);
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
                      // ReactGA.event({
                      //   category: 'User',
                      //   action: 'Daerah Populer',
                      //   label: 'Daerah Populer',
                      //   nama_daerah: provinces.nama
                      // });
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
                  if (openYears){
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
                    setSelectedSort("Urutkan");
                    if(!is_province){
                      if(sessionStorage.getItem("historyParentDataset") !== null){
                        var historyParentDataset = sessionStorage.getItem("historyParentDataset")
                        document.getElementById(`sektor_${historyParentDataset}`).click();
                        var counter = countSektor+1
                        setCountSektor(counter)
                        setSelectedItems(null)
                        setBidang(null)
                        setContainData("")
                        setSelectedButton(historyParentDataset);
                        toggleKeuanganDropdown();
                        toggleKeuanganAnakan1();
                        toggleKeuanganAnakan2();
                      }
                      setShowKeuanganDropdown(false);
                    }
                    wilayah = provinsi;
                    setInfoDaerah("Semua");
                    setSelectedCity("Semua");
                    setDataranicon("Semua");
                    setWilayahID(getInfoProvinsi);
                    setSelectedYears(sessionStorage.getItem("yearss"));
                    sessionStorage.setItem("idwilayah", getInfoProvinsi);
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
                      setSelectedSort("Urutkan");
                      if(is_province){
                        if(sessionStorage.getItem("historyParentDataset") !== null){
                          var historyParentDataset = sessionStorage.getItem("historyParentDataset")
                          document.getElementById(`sektor_${historyParentDataset}`).click();
                          var counter = countSektor+1
                          setCountSektor(counter)
                          setBidang(null)
                          setContainData("")
                          setSelectedItems(null)
                          setSelectedButton(historyParentDataset);
                          toggleKeuanganDropdown();
                          toggleKeuanganAnakan1();
                          toggleKeuanganAnakan2();
                        }
                        setShowKeuanganDropdown(false);
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
                        sessionStorage.setItem("idwilayah", regencies.id);
                        setOpenCity(false);
                        setInputValueofCity("");
                        updatePeta(regencies.id);
                        setWilayahID(regencies.id);
                        setSelectedYears(sessionStorage.getItem("yearss"));
                        askIsProvince(false);
                        setActiveTab("provinsi");
                        updateSektor();
                        // ReactGA.event({
                        //   category: 'User',
                        //   action: 'Daerah Populer',
                        //   label: 'Daerah Populer',
                        //   nama_daerah: regencies.nama
                        // });
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
                      tahunn?.tahun ===
                        selectedYears && "bg-secondary text-white"
                    }
                    `}
                    onClick={() => {
                      setSelectedSort("Urutkan");
                      if (
                        tahunn?.tahun !==
                        selectedYears
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
            <div className="text-[18px] text-secondary mt-[5px] lg:text-[20px]">
              <p className="font-bold text-right">
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
              <a href="/Jelajah-Profil">
                <img
                  src={people}
                  alt=""
                  className="w-[60px] lg:w-20 object-contain hover:scale-110 transform transition duration-300"
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
            <div className="ext-[18px] text-secondary mt-[5px] lg:text-[20px]">
              <p className="font-bold text-left">
                {Math.round(data_Penduduk).toLocaleString().replaceAll(/,/g, ".")}
              </p>
              <p className="font-regular">10³ Jiwa</p>
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
                className={`flex w-[100px] md:w-[167px] h-[40px] rounded-full border border-[f1f1f1] text-[14px] font-bold items-center justify-center ${
                  items.id === selectedButton
                    ? "bg-secondary text-white"
                    : "bg-third text-secondary"
                }`}
                onClick={() => {
                  updateSektor();
                  setParentDataset(items.nama)
                  setSelectedButton(items.id);
                  toggleKeuanganDropdown();
                  setSelectedItems(null)
                  toggleKeuanganAnakan1();
                  toggleKeuanganAnakan2();
                  setShowKeuanganDropdown(true);
                  setcontentdropdwon(0, items.id, sektor);
                  setBidang(null);
                  sessionStorage.removeItem("historyParentDataset");
                  sessionStorage.removeItem("historyChildDataset");
                  sessionStorage.removeItem("historyChildDatasetArray");
                  sessionStorage.removeItem("historyTipePeringkat");
                  setDatasetTerpilih([])
                  document.getElementById("switchernyaa").classList.add("hidden");
                  document.getElementById("JudulPeringkat").classList.add("hidden");
                  document.getElementById("arrowww").classList.add("invisible");
                  document.getElementById("Peringkatnya").classList.add("hidden");
                  sessionStorage.setItem("historyParentDataset",items.id)
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
            id="switchernyaa"
            className="hidden flex gap-[50px] items-center justify-center font-semibold text-secondary mt-[48px] text-[16px] md:text-[20px]"
          >
            <p className={activeTab === "provinsi" ? "inactive-text" : ""}>
              PROVINSI
            </p>
            <SwitchBtn
              id="switchernyaa"
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
            className="hidden text-secondary text-center mt-[48px] mb-[30px]"
          >
            <p className="text-[20px] md:text-[32px] font-extrabold text-secondary uppercase">
              PERINGKAT {infoDaerah}
            </p>
            <p className="text-[16px] md:text-[24px] font-regular italic">
              {satuan}
            </p>
          </div>
          <div id="arrowww" className="invisble sticky w-full px-[15px] md:px-[30px] top-[50%] z-50">
            <div className="flex justify-between">
              <button onClick={()=>{previous()}}>
                  <img
                    src={arrowl}
                    alt="Gambar Kiri"
                    className="w-[25px] h-[25px] md:w-8 md:h-8"
                  />
                </button>

                <button onClick={()=>{next()}}>
                  <img
                    src={arrowr}
                    alt="Gambar Kanan"
                    className="w-[25px] h-[25px] md:w-8 md:h-8"
                  />
                </button>
            </div>
            
          </div>
          {/* DATA */}
          <div
            id="Peringkatnya"
            className={`hidden flex flex-col items-center justify-center ${
              testHandlePeringkatnya ? "false" : "hidden"
            }`}
          >
            {activeTab === "provinsi" && (
              <>
              {loading ? (
                // Loader component or JSX
                <div className="text-secondary">memuat data...</div>
              ) : (
                <div>
                  {Nasional(dataChartNasional, angkaTertinggi)}
                  {Provinsi(dataChartSelected, angkaTertinggi)}
                </div>
              )}
                
                <div id="sortnya" className="hidden flex justify-end w-full px-[60px] md:px-[30px] gap-x-[20px]">
                  {/* FILTER */}
                  {loading ? (
                // Loader component or JSX
                <></>
                ) : (
                  <div className="w-[150px] text-secondary font-medium text-[14px] cursor-pointer">
                    <div
                      onClick={() => setOpenSort(!openSort)}
                      className="bg-[#ebebeb] gap-x-[8px] w-full p-2 flex items-center justify-center rounded-[10px]"
                    >
                      {selectedSort ? selectedSort : "Urutkan"}
                      <FontAwesomeIcon
                        icon={faArrowDownShortWide}
                        color="#24445A"
                        className={`w-[15px] h-[15px] ${
                          selectedSort === "Teratas" && "rotate-180"
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
                )}
                  
                </div>
                {loading ? (
                // Loader component or JSX
                <></>
                ) : (
                  <div>
                    {elementChart}
                  </div>
                )}
                <div id="sumbernya" className="text-center mt-[20px] text-secondary">
                  {loading ? (
                  // Loader component or JSX
                  <></>
                  ) : (
                    <>
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
                    {/* SIMPAN */}
                    <div className="flex items-center gap-[10px]">
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
                            ///UNTUK PREMIUM
                            if(akunPrem == "Y"){
                              togglePopupSimpan()
                            }else{
                              SimpanHalamanSemua(infoKodePage)
                            }
                            ///GRATIS
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faBookBookmark}
                          color="#24445A"
                        />
                      </div>
                      <p className="text-[12px] md:text-[16px]">{infoPageSave} Simpan</p>
                    </div>

                    {showPopupSimpan && (
                      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
                        <div className="flex flex-col bg-white rounded-[25px] justify-evenly items-center w-[700px] h-[450px] md:h-[600px] mx-[40px] px-[20px]">
                          <h1 className="text-[24px] md:text-[34px] font-bold text-secondary text-center">Simpan Halaman</h1>
                          {/* BUTTON COLLECTION */}
                          <div className="flex flex-col w-[320px] max-h-[200px] overflow-y-scroll mini-scrollbar cursor-pointer">
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
                          <h1 className="text-[24px] md:text-[34px] font-bold text-secondary text-center">Buat Koleksi</h1>
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

                    <button className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]  rounded-md bg-primary drop-shadow-lg flex justify-center items-center hover:bg-third cursor-pointer" 
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
                            window.open(process.env.REACT_APP_URL_API+`/download-pdf?halaman=${infoKodePage}&id_member=${idMember}`);
                          }
                      }}
                      >
                      <FontAwesomeIcon
                        icon={faDownload}
                        color="#24445A"
                      />
                    </button>
                    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]  rounded-md bg-primary drop-shadow-lg flex justify-center items-center hover:bg-third cursor-pointer" 
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
                        shareBtn(infoKodePage)
                      }
                    }}>
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
                  {
                    notes?.map((notes)=>(
                      <div className="mt-[10px]">
                        {notes}
                      </div>
                    ))
                  }
                    </>
                  )}
                  
                </div>
              </>
            )}
            {activeTab === "nasional" && (
              <>
                {loading ? (
                // Loader component or JSX
                <div className="text-secondary">memuat data...</div>
              ) : (
                <div>
                  {Nasional(dataChartNasional, angkaTertinggi)}
                  {Provinsi(dataChartSelected, angkaTertinggi)}
                </div>
              )}
                <div id="sortnya" className="hidden flex justify-end w-full px-[30px] gap-x-[20px]">
                  {loading ? (
                  // Loader component or JSX
                  <></>
                  ) : (
                    <div className="w-[150px] text-secondary font-medium text-[14px] cursor-pointer">
                    <div
                      onClick={() => setOpenSort(!openSort)}
                      className="bg-[#ebebeb] gap-x-[8px] w-full p-2 flex items-center justify-center rounded-[10px]"
                    >
                      {selectedSort ? selectedSort : "Urutkan"}
                      <FontAwesomeIcon
                        icon={faArrowDownShortWide}
                        color="#24445A"
                        className={`w-[15px] h-[15px] ${
                          selectedSort === "Teratas" && "rotate-180"
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
                  )}
                </div>
                {loading ? (
                // Loader component or JSX
                <></>
                ) : (
                  <div>
                    {elementChart}
                  </div>
                )}
                
                <div id="sumbernya" className="text-center mt-[20px] text-secondary">
                  {loading ? (
                  // Loader component or JSX
                  <></>
                  ) : (
                    <>
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

                    <div className="flex items-center gap-[10px]">
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
                            ///UNTUK PREMIUM
                            if(akunPrem == "Y"){
                              togglePopupSimpan()
                            }else{
                              SimpanHalamanSemua(infoKodePage)
                            }
                            ///GRATIS
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faBookBookmark}
                          color="#24445A"
                        />
                      </div>
                      <p className="text-[12px] md:text-[16px]">{infoPageSave} Simpan</p>
                    </div>

                    {showPopupSimpan && (
                      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
                        <div className="flex flex-col bg-white rounded-[25px] justify-evenly items-center w-[700px] h-[450px] md:h-[600px] mx-[40px] px-[20px]">
                          <h1 className="text-[24px] md:text-[34px] font-bold text-secondary text-center">Simpan Halaman</h1>
                          {/* BUTTON COLLECTION */}
                          <div className="flex flex-col w-[320px] max-h-[200px] overflow-y-scroll mini-scrollbar cursor-pointer">
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
                          <h1 className="text-[24px] md:text-[34px] font-bold text-secondary text-center">Buat Koleksi</h1>
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

                    <button className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]  rounded-md bg-primary drop-shadow-lg flex justify-center items-center hover:bg-third cursor-pointer" 
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
                            window.open(process.env.REACT_APP_URL_API+`/download-pdf?halaman=${infoKodePage}&id_member=${idMember}`);
                          }
                      }}
                      >
                      <FontAwesomeIcon
                        icon={faDownload}
                        color="#24445A"
                      />
                    </button>
                    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]  rounded-md bg-primary drop-shadow-lg flex justify-center items-center hover:bg-third cursor-pointer" 
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
                        shareBtn(infoKodePage)
                      }
                    }}>
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
                  {
                    notes?.map((notes)=>(
                      <div className="mt-[10px]">
                        {notes}
                      </div>
                    ))
                  }
                    </>
                  )}
                  
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
              Mau Jelajahi <br/> daerah apa hari ini?
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
                        setGetInfoProvinsi(provinces.id);
                        setWilayahID(provinces.id);
                        sessionStorage.setItem("namawilayah", "Semua");
                        setInfoDaerah(provinces.nama);
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
                    setOpenProvinsi(true);
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
                        tahunn?.tahun ===
                          selectedYears && "bg-secondary text-white"
                      }
                      `}
                      onClick={() => {
                        if (
                          tahunn?.tahun !==
                          selectedYears
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
    </div>
  );
};

export default Jelajahmain;
