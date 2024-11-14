import React, { useState, useEffect } from "react";
import map from "../../assets/icons/peta.png";
import people from "../../assets/icons/people.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSearch, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import "../../style/Components.css";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import back from "../../assets/back.svg";
import Swal from "sweetalert2";
import { func } from "prop-types";
// import ReactGA from "react-ga4";

const Berkacamain = () => {
  // useEffect(()=>{
  //   ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Berkaca" });
  // },[])
  const handlePopupDropdownKota = () => {
    Swal.fire({
      title: "Perhatian!",
      text: "Silakan memilih provinsi pada daerah 2 terlebih dahulu.",
      confirmButtonText: "Tutup",
      confirmButtonColor: "#24445a",
      customClass: {
        title: "title-icon-errorr",
        text: "text-icon",
        confirmButton: "confirm-icon",
      },
    });
  };
  const tokenUser = sessionStorage.getItem("token");
  useEffect(() => {
    if (sessionStorage.getItem("token") == null || sessionStorage.getItem("token") == "") {
      return (window.location.href = "/");
    }
  }, [sessionStorage.getItem("token")]);

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  ///DROPDOWN PROVINSI D1
  const [provincess, setProvinces] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(sessionStorage.getItem("namaprovinsi"));
  const [openProvinsi, setOpenProvinsi] = useState(false);
  const [getInfoProvinsi, setGetInfoProvinsi] = useState(null);
  const [wilayahID, setWilayahID] = useState(null);
  const [isProvince, setIsProvince] = useState();
  // const [is_province, setIsProvince] = useState(true);
  var wilayah = "";
  var provinsi = "";
  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API + "/provinces")
      .then((response) => response.json())
      .then((data) => {
        if (sessionStorage.getItem("idprovinsi") === null && sessionStorage.getItem("namaprovinsi") === null) {
          sessionStorage.setItem("idwilayah", data.data[0].id);
          setProvinces(data.data);
          sessionStorage.setItem("idprovinsi", data.data[0].id);
          sessionStorage.setItem("namaprovinsi", data.data[0].nama);
          updateKota(sessionStorage.getItem("namaprovinsi"), selected, sessionStorage.getItem("idprovinsi"));
          updatePeta(sessionStorage.getItem("idprovinsi"));
          sessionStorage.setItem("namawilayah", "Semua");
          setInfoDaerah("Semua");
          setSelectedCity("Semua");
          setDataranicon("Semua");
          setDataranicon2("Semua");
          setIsProvince(true);

          sessionStorage.setItem("namakota", "Semua");
          sessionStorage.setItem("idkota", sessionStorage.getItem("idprovinsi"));
          setGetInfoProvinsi(sessionStorage.getItem("idprovinsi"));
          setWilayahID(sessionStorage.getItem("idprovinsi"));
          provinsi = sessionStorage.getItem("idprovinsi");
          wilayah = sessionStorage.getItem("idprovinsi");
          setSelectedYears(sessionStorage.getItem("yearss"));
        } else {
          setProvinces(data.data);
        }
      });
  }, []);
  ///DROPDOWN PROVINSI D2
  const [provincess2, setProvinces2] = useState(null);
  const [inputValue2, setInputValue2] = useState("");
  const [selected2, setSelected2] = useState(sessionStorage.getItem("namaprovinsi_berkaca2"));
  const [openProvinsi2, setOpenProvinsi2] = useState(false);
  const [getInfoProvinsi2, setGetInfoProvinsi2] = useState(null);
  const [wilayahID2, setWilayahID2] = useState(null);
  const [provinsiSelected, setProvinsiSelected] = useState(sessionStorage.getItem("namaprovinsi_berkaca2"));
  const [isProvince2, setIsProvince2] = useState(true);
  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API + "/provinces")
      .then((response) => response.json())
      .then((data) => {
        setProvinces2(data.data);
        setDataranicon2("Semua");
      });
  }, []);

  ///DROPDOWN KOTA
  const [cities, setCity] = useState(null);
  const [inputValueofCity, setInputValueofCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(sessionStorage.getItem("namakota"));
  const [openCity, setOpenCity] = useState(false);

  ///DROPDOWN KOTA D2
  const [cities2, setCity2] = useState(null);
  const [inputValueofCity2, setInputValueofCity2] = useState("");
  const [selectedCity2, setSelectedCity2] = useState(sessionStorage.getItem("namakota_berkaca2"));
  const [openCity2, setOpenCity2] = useState(false);

  ///UPDATE DATA KOTA BERDASARKAN DATA PROVINSI
  function updateKota(item, choosed, id) {
    setSelected(item);
    setOpenProvinsi(false);
    setInputValue("");
    if (item && choosed && item.toLowerCase() !== choosed.toLowerCase()) {
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

  useEffect(() => {
    if (sessionStorage.getItem("namakota") === "Semua") {
      setIsProvince(true);
    } else {
      setIsProvince(false);
    }
  });

  useEffect(() => {
    if (sessionStorage.getItem("idkota") !== null) {
      wilayah = sessionStorage.getItem("idkota");
      updatePeta(sessionStorage.getItem("idkota"), sessionStorage.getItem("yearss"));
      setWilayahID(sessionStorage.getItem("idkota"));
      if (sessionStorage.getItem("idprovinsi") !== null) {
        provinsi = sessionStorage.getItem("idprovinsi");
        setGetInfoProvinsi(sessionStorage.getItem("idprovinsi"));
      }
    }
  }, []);

  //UPDATE DATA KOTA BERDASARKAN DATA PROVINSI D2
  function updateKota2(item, choosed, id) {
    setSelected2(item);
    setOpenProvinsi2(false);
    setInputValue2("");
    if (item && choosed && item.toLowerCase() !== choosed.toLowerCase()) {
      fetch(process.env.REACT_APP_URL_API + "/cities?province_id=" + id)
        .then((response) => response.json())
        .then((data) => {
          setCity2(data.data);
        });
    }
  }
  useEffect(() => {
    if (sessionStorage.getItem("idprovinsi_berkaca2") !== null) {
      fetch(process.env.REACT_APP_URL_API + "/cities?province_id=" + sessionStorage.getItem("idprovinsi_berkaca2"))
        .then((response) => response.json())
        .then((data) => {
          setCity2(data.data);
        });
    }
  }, [sessionStorage.getItem("idprovinsi_berkaca2")]);

  useEffect(() => {
    if (sessionStorage.getItem("namakota_berkaca2") === "Semua") {
      setIsProvince2(true);
    } else {
      setIsProvince2(false);
    }
  });

  useEffect(() => {
    if (sessionStorage.getItem("idkota_berkaca2") !== null) {
      updatePeta2(sessionStorage.getItem("idkota_berkaca2"));
    }
  }, []);

  ///UPDATE DATA LOKASI
  const [peta, setPeta] = useState(null);
  const [koordinatLokasi, setKoordinatLokasi] = useState(null);
  const [infoDaerah, setInfoDaerah] = useState(null);
  const [pinMap, setPinMap] = useState(null);
  const [dataranicon, setDataranicon] = useState(null);
  const [sektoricon, setSektoricon] = useState(null);
  const [datarannama, setDatarannama] = useState(null);
  const [sektornama, setSektornama] = useState(null);
  const [nilaisektor, setNilaisektor] = useState(null);
  const [mdpl, setMdpl] = useState(null);
  const [luaswilayah, setLuaswilayah] = useState(null);
  const [jumlahpenduduk, setJumlahpenduduk] = useState(null);
  const [satuan, setSatuan] = useState(null);

  var wilayah = "";
  var provinsi = "";

  useEffect(() => {
    if (sessionStorage.getItem("idkota") !== null) {
      wilayah = sessionStorage.getItem("idkota");
      updatePeta(sessionStorage.getItem("idkota"), sessionStorage.getItem("yearss"));
      setWilayahID(sessionStorage.getItem("idkota"));
      if (sessionStorage.getItem("idprovinsi") !== null) {
        provinsi = sessionStorage.getItem("idprovinsi");
        setGetInfoProvinsi(sessionStorage.getItem("idprovinsi"));
      }
    }
  }, []);

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
        setInfoDaerah(result.data.nama);
        setSektoricon(result.data.wilayah_info.sektor_icon);
        setKoordinatLokasi(result.data.longitude + ", " + result.data.latitude);
        setDatarannama(result.data.dataran_nama);
        setSektornama(result.data.wilayah_info.sektor_nama);
        setNilaisektor(result.data.wilayah_info.nilai_sektor);
        setMdpl(result.data.wilayah_info.ketinggian);
        setLuaswilayah(result.data.wilayah_info.luas_wilayah);
        setJumlahpenduduk(result.data.wilayah_info.jumlah_penduduk);
        setPinMap(map);
      });
  }
  ///UPDATE DATA LOKASI D2
  const [peta2, setPeta2] = useState(null);
  const [koordinatLokasi2, setKoordinatLokasi2] = useState(null);
  const [infoDaerah2, setInfoDaerah2] = useState(null);
  const [pinMap2, setPinMap2] = useState(null);
  const [dataranicon2, setDataranicon2] = useState(null);
  const [sektoricon2, setSektoricon2] = useState(null);
  const [datarannama2, setDatarannama2] = useState(null);
  const [nilaisektor2, setNilaisektor2] = useState(null);
  const [sektornama2, setSektornama2] = useState(null);
  const [mdpl2, setMdpl2] = useState(null);
  const [luaswilayah2, setLuaswilayah2] = useState(null);
  const [jumlahpenduduk2, setJumlahpenduduk2] = useState(null);

  var wilayah2 = "";
  var provinsi2 = "";

  useEffect(() => {
    if (sessionStorage.getItem("idkota_berkaca2") !== null) {
      wilayah2 = sessionStorage.getItem("idkota_berkaca2");
      updatePeta2(sessionStorage.getItem("idkota_berkaca2"), sessionStorage.getItem("yearss"));
      setWilayahID2(sessionStorage.getItem("idkota_berkaca2"));
      if (sessionStorage.getItem("idprovinsi_berkaca2") !== null) {
        provinsi2 = sessionStorage.getItem("idprovinsi_berkaca2");
        setGetInfoProvinsi2(sessionStorage.getItem("idprovinsi_berkaca2"));
      }
    }
  }, []);

  function updatePeta2(wilayah_id) {
    fetch(process.env.REACT_APP_URL_API + "/wilayah-info?lang=id&wilayah_id=" + wilayah_id + "&tahun=" + sessionStorage.getItem("yearss"), requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPeta2(result.data.peta);
        if (sessionStorage.getItem("namawilayah_berkaca2") === "Semua") {
          setDataranicon2("https://storage.googleapis.com/otonometer-bucket/infografis/664c63abef1c7.tidak_identifikasi_LIGHT.png");
        } else {
          setDataranicon2(result.data.dataran_icon);
        }
        setInfoDaerah2(result.data.nama);
        setSektoricon2(result.data.wilayah_info.sektor_icon);
        setKoordinatLokasi2(result.data.longitude + ", " + result.data.latitude);
        setInfoDaerah2(result.data.nama);
        setSektoricon2(result.data.wilayah_info.sektor_icon);
        setKoordinatLokasi2(result.data.longitude + ", " + result.data.latitude);
        setDatarannama2(result.data.dataran_nama);
        setSektornama2(result.data.wilayah_info.sektor_nama);
        setNilaisektor2(result.data.wilayah_info.nilai_sektor);
        setMdpl2(result.data.wilayah_info.ketinggian);
        setLuaswilayah2(result.data.wilayah_info.luas_wilayah);
        setJumlahpenduduk2(result.data.wilayah_info.jumlah_penduduk);
        setPinMap2(map);
      });
  }

  useEffect(() => {
    if (sessionStorage.getItem("idkota") !== null) {
      wilayah = sessionStorage.getItem("idkota");
      updatePeta(sessionStorage.getItem("idkota"), sessionStorage.getItem("yearss"));
      setWilayahID(sessionStorage.getItem("idkota"));
      if (sessionStorage.getItem("idprovinsi") !== null) {
        provinsi = sessionStorage.getItem("idprovinsi");
        setGetInfoProvinsi(sessionStorage.getItem("idprovinsi"));
      }
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("idkota_berkaca2") !== null) {
      wilayah2 = sessionStorage.getItem("idkota_berkaca2");
      updatePeta2(sessionStorage.getItem("idkota_berkaca2"), sessionStorage.getItem("yearss"));
      setWilayahID2(sessionStorage.getItem("idkota_berkaca2"));
      if (sessionStorage.getItem("idprovinsi_berkaca2") !== null) {
        provinsi2 = sessionStorage.getItem("idprovinsi_berkaca2");
        setGetInfoProvinsi2(sessionStorage.getItem("idprovinsi_berkaca2"));
      }
    }
  }, []);

  ///VARIABLE DROPDOWN TAHUN
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

  ///DATASET1
  const [idParent, setIdParent] = useState();
  const [parents, setParents] = useState(null);
  const [openParents, setOpenParents] = useState(false);
  const [selectedParents, setSelectedParents] = useState("");

  function clickElement(target, retryCount = 0) {
    const maxRetries = 15;
    const element = document.getElementById(target);
    if (element) {
      element.click();
    } else if (retryCount < maxRetries) {
      setTimeout(() => clickElement(target, retryCount + 1), 100);
    } else {
      console.error(`Element with id ${target} not found after ${maxRetries} attempts.`);
    }
  }

  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API + "/filter-parent?lang=en")
      .then((response) => response.json())
      .then((data) => {
        setParents(data.data);
        // if (sessionStorage.getItem("selectedDataBerkaca") != null) {
        //   console.log("data terload");
        //   var live_data = JSON.parse(sessionStorage.getItem("selectedDataBerkaca"));
        //   // data.data.forEach((item) => {
        //   //   if (item.id == live_data.ds1_parent) {
        //   //     console.log(
        //   //       document.getElementById("ds1_parent_" + live_data.ds1_parent)
        //   //     );
        //   //     // updateParents(item.nama, selectedParents, item.id, isProvince);
        //   //     document
        //   //       .getElementById("anakanparent")
        //   //       .classList.remove("hidden");
        //   //     //click child
        //   //     // clickElement("ds1_child_" + live_data.ds1_child)
        //   //     // try {
        //   //     //   document
        //   //     //     .getElementById("ds1_child_" + live_data.ds1_child)
        //   //     //     .click();
        //   //     //   clickElement(document.getElementById("ds1_child_" + live_data.ds1_child))
        //   //     // } catch (error) {
        //   //     //   console.log("error ds 1:", error.message);
        //   //     // }
        //   //   }
        //   // });
        // } else {
        //   console.log("data tidak terload atau tidak ada");
        // }
      });
  }, []);

  useEffect(() => {
    if (parents != null && parents != "") {
      if (parents.length > 0) {
        if (sessionStorage.getItem("selectedDataBerkaca") != null) {
          var live_data = JSON.parse(sessionStorage.getItem("selectedDataBerkaca"));
          parents.forEach((item) => {
            if (item.id == live_data.ds1_parent) {
              clickElement("ds1_parent_" + live_data.ds1_parent);
            }
          });
        }
      }
    }
  }, [parents]);

  const [selectFilter, setSelectFilter] = useState(null);
  const [openSelectFilter, setOpenSelectFilter] = useState(false);
  const [selectedSelectFilter, setSelectedSelectFilter] = useState("");
  function updateParents(item, choosed, id, is_province) {
    setSelectedParents(item);
    setOpenParents(false);

    fetch(process.env.REACT_APP_URL_API + "/filter-select?parent_id=" + id + "&lang=en")
      .then((response) => response.json())
      .then((result) => {
        var data = [];
        result.data.forEach((item) => {
          if (item.flagging === "all") {
            data.push(item);
          }
          if (item.flagging === "province") {
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
        setSelectFilter(data);
        setLabelSet1([]);
      });
  }
  useEffect(() => {
    if (selectFilter != null && selectFilter != "") {
      if (selectFilter.length > 0) {
        if (sessionStorage.getItem("selectedDataBerkaca") != null) {
          var live_data = JSON.parse(sessionStorage.getItem("selectedDataBerkaca"));
          selectFilter.forEach((item) => {
            if (item.id == live_data.ds1_child) {
              clickElement("ds1_child_" + live_data.ds1_child);
            }
          });
        }
      }
    }
  }, [selectFilter]);

  const [childFilter, setChildFilter] = useState("");
  const [IDchildFilter, setIDChildFilter] = useState("");

  function updateSelectFilter(item, choosed, idanak, idbunda) {
    setSelectedSelectFilter(item);
    setOpenSelectFilter(false);

    fetch(process.env.REACT_APP_URL_API + "/filter-child?satuan_id=" + idanak + "&lang=en&parent_id=" + idbunda)
      .then((response) => response.json())
      .then((data) => {
        var list = [];
        data.data.forEach((item) => {
          if (item.flagging === "all") {
            list.push(item);
          }
          if (item.flagging === "province") {
            if (isProvince) {
              list.push(item);
            }
          }
          if (item.flagging == "city") {
            if (!isProvince) {
              list.push(item);
            }
          }
        });
        setChildFilter(list);
      });
  }

  ///DATASET2
  const [dataSet1, setDataSet1] = useState([]);
  const [labelSet1, setLabelSet1] = useState([]);
  const [labelSet2, setLabelSet2] = useState([]);
  useEffect(() => {}, [dataSet1]);

  useEffect(() => {}, [labelSet1]);
  useEffect(() => {}, [labelSet2]);
  const [ds1_set, setds1_set] = useState([]);

  function getDataSet1() {
    var dataset = [];
    var labels = [];
    var all_ds1 = [];
    var list = document.getElementById("dataset1").getElementsByClassName("isSet");
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      dataset.push(item.getAttribute("value"));
      all_ds1.push(item.getAttribute("value"));
      labels[item.getAttribute("value")] = item.getAttribute("labelData");
      var index = dataset.indexOf(item.getAttribute("parent"));
      if (index >= 0) {
        dataset.splice(index, 1);
        delete labels[item.getAttribute("parent")];
      }
    }

    var checkbox_semua = document.getElementById(`ds1_all_${IDchildFilter}`);
    if (checkbox_semua != null) {
      sessionStorage.setItem("all_ds_1", "semua");
    } else {
      sessionStorage.setItem("all_ds_1", `[${list[0].getAttribute("value")}]`);
    }
    setDataSet1(dataset);
    setLabelSet1(labels);
    setds1_set(all_ds1);
  }

  const [idParent2, setIdParent2] = useState();
  const [parents2, setParents2] = useState(null);
  const [openParents2, setOpenParents2] = useState(false);
  const [selectedParents2, setSelectedParents2] = useState("");
  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API + "/filter-parent?lang=en")
      .then((response) => response.json())
      .then((data) => {
        setParents2(data.data);
      });
  }, []);

  useEffect(() => {
    if (parents2 != null && parents2 != "") {
      if (parents2.length > 0) {
        if (sessionStorage.getItem("selectedDataBerkaca") != null) {
          var live_data = JSON.parse(sessionStorage.getItem("selectedDataBerkaca"));
          parents2.forEach((item) => {
            if (item.id == live_data.ds2_parent) {
              clickElement("ds2_parent_" + live_data.ds2_parent);
            }
          });
          document.getElementById("dataset1").classList.add("hidden");
          document.getElementById("dataset2").classList.remove("hidden");
        }
      }
    }
  }, [parents2]);

  const [selectFilter2, setSelectFilter2] = useState(null);
  const [openSelectFilter2, setOpenSelectFilter2] = useState(false);
  const [selectedSelectFilter2, setSelectedSelectFilter2] = useState("");
  function updateParents2(item, choosed, id, is_province) {
    setSelectedParents2(item);
    setOpenParents2(false);

    fetch(process.env.REACT_APP_URL_API + "/filter-select?parent_id=" + id + "&lang=en")
      .then((response) => response.json())
      .then((result) => {
        var data = [];
        result.data.forEach((item) => {
          if (item.flagging === "all") {
            data.push(item);
          }
          if (item.flagging === "province") {
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
        setSelectFilter2(data);
      });
  }

  useEffect(() => {
    if (selectFilter2 != null && selectFilter2 != "") {
      if (selectFilter2.length > 0) {
        if (sessionStorage.getItem("selectedDataBerkaca") != null) {
          var live_data = JSON.parse(sessionStorage.getItem("selectedDataBerkaca"));
          selectFilter2.forEach((item) => {
            if (item.id == live_data.ds2_child) {
              clickElement("ds2_child_" + live_data.ds2_child);
            }
          });
        }
      }
    }
  }, [selectFilter2]);

  const [childFilter2, setChildFilter2] = useState("");
  const [IDchildFilter2, setIDChildFilter2] = useState("");
  function updateSelectFilter2(item, choosed, idanak, idbunda) {
    setSelectedSelectFilter2(item);
    setOpenSelectFilter2(false);
    fetch(process.env.REACT_APP_URL_API + "/filter-child?satuan_id=" + idanak + "&lang=en&parent_id=" + idbunda)
      .then((response) => response.json())
      .then((data) => {
        var list = [];
        data.data.forEach((item) => {
          if (item.flagging === "all") {
            list.push(item);
          }
          if (item.flagging === "province") {
            if (isProvince) {
              list.push(item);
            }
          }
          if (item.flagging == "city") {
            if (!isProvince) {
              list.push(item);
            }
          }
        });
        setChildFilter2(list);
      });
  }

  function disableByHistory(num) {
    var targetDisable = document.getElementById("dataset" + num).getElementsByClassName("anakan");
    if (targetDisable.length == 0 || targetDisable == null) {
      disableByHistory(num);
    } else {
      console.log("target disable => ", targetDisable);
      for (var i = 0; i < targetDisable.length; i++) {
        targetDisable[i].checked = false;
        targetDisable[i].disabled = true;
      }
      //pastikan terdisable
      var target = document.getElementById("dataset" + num).getElementsByClassName("anakan");
      if (!target[0].disabled) {
        disableByHistory(num);
      }
    }
  }

  function loadHistoryDataset1() {
    if (sessionStorage.getItem("selectedDataBerkaca") != null) {
      var live_data = JSON.parse(sessionStorage.getItem("selectedDataBerkaca"));
      if (idParent == live_data.ds1_parent) {
        if (live_data.dataset_1Berkaca == "semua") {
          //saran menggunakan animasi loading (kondisi menampilkan loading)
          // (isi kode animasi disini)
          try {
            document.getElementById("ds1_all_" + live_data.ds1_child).checked = true;

            setTimeout(() => {
              disableByHistory(1);
              //saran menggunakan animasi loading (kondisi menutup loading)
              // (isi kode animasi disini)
            }, 1000);
          } catch (error) {
            console.log("apalah2", error);
          }
        }
      }
    } else {
      if (dataSet1 == "semua") {
        //saran menggunakan animasi loading (kondisi menampilkan loading)
        // (isi kode animasi disini)
        try {
          document.getElementById("ds1_all_" + IDchildFilter).checked = true;

          setTimeout(() => {
            disableByHistory(1);
            //saran menggunakan animasi loading (kondisi menutup loading)
            // document.getElementById("dataset1").classList.remove("hidden");
          }, 1000);
        } catch (error) {
          console.log("apalah2", error);
        }
      } else {
        //saran menggunakan animasi loading (kondisi menampilkan loading)
        // (isi kode animasi disini)
        ds1_set.forEach((item) => {
          clickElement("1_checkbox_" + item);
        });
        //saran menggunakan animasi loading (kondisi menutup loading)
        // document.getElementById("dataset1").classList.remove("hidden");
      }
    }
  }
  useEffect(() => {
    console.log("idparent => ", idParent);
    loadHistoryDataset1();
  }, [childFilter]);

  useEffect(() => {
    console.log("idparent2 => ", idParent2);
    if (sessionStorage.getItem("selectedDataBerkaca") != null) {
      var live_data = JSON.parse(sessionStorage.getItem("selectedDataBerkaca"));
      if (idParent2 == live_data.ds2_parent) {
        if (live_data.dataset_2Berkaca == "semua") {
          //saran menggunakan animasi loading (kondisi menampilkan loading)
          // (isi kode animasi disini)
          try {
            document.getElementById("ds2_all_" + live_data.ds2_child).checked = true;
            // disableByHistory(2);
            setTimeout(() => {
              disableByHistory(2);
              //saran menggunakan animasi loading (kondisi menutup loading)
              // (isi kode animasi disini)
            }, 1000);
          } catch (error) {
            console.log("apalah2", error);
          }
        }
      }
    }
  }, [childFilter2]);

  const [dataChart, setDataChart] = useState([]);
  const [dataSet2, setDataSet2] = useState([]);
  var allOptions = [4, 132, 196, 214];
  useEffect(() => {}, [dataSet2]);

  const popUpCheckbox = (pesan) => {
    Swal.fire({
      title: "Perhatian!",
      text: pesan,
      confirmButtonText: "Tutup",
      confirmButtonColor: "#24445a",
      customClass: {
        title: "title-icon-errorr",
        text: "text-icon",
        confirmButton: "confirm-icon",
      },
    });
  };
  function getDataSet2() {
    var dataset = [];
    var all_ds2 = [];
    var labels = [];
    var list = document.getElementById("dataset2").getElementsByClassName("isSet");

    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      dataset.push(item.getAttribute("value"));
      all_ds2.push(item.getAttribute("value"));
      labels[item.getAttribute("value")] = item.getAttribute("labelData");
      var index = dataset.indexOf(item.getAttribute("parent"));
      if (index >= 0) {
        dataset.splice(index, 1);
        delete labels[item.getAttribute("parent")];
      }
    }

    var checkbox_semua = document.getElementById(`ds2_all_${IDchildFilter2}`);
    if (checkbox_semua != null) {
      sessionStorage.setItem("all_ds_2", "semua");
    } else {
      sessionStorage.setItem("all_ds_2", `[${list[0].getAttribute("value")}]`);
    }

    setDataSet2(dataset);
    setLabelSet2(labels);
    var live_data = JSON.parse(sessionStorage.getItem("selectedDataBerkaca"));
    sessionStorage.setItem(
      "selectedDataBerkaca",
      JSON.stringify({
        ds1_parent: idParent,
        ds1_child: IDchildFilter,
        parent_id_1Berkaca: IDchildFilter,
        dataset_1Berkaca: dataSet1.length === 0 ? live_data?.dataset_1Berkaca || [] : dataSet1,
        all_ds1_set: ds1_set.length === 0 ? live_data?.all_ds1_set || [] : ds1_set,
        ds2_parent: idParent2,
        ds2_child: IDchildFilter2,
        parent_id_2Berkaca: IDchildFilter2,
        dataset_2Berkaca: dataset,
        all_ds2_set: all_ds2,
        labelset1: labelSet1.length === 0 ? live_data?.labelset1 || [] : labelSet1,
        labelset2: labels,
        namachild: selectedSelectFilter,
        grafikTimeseries: dataChart,
        grafikTimeseries2: dataChart2,
        LabelnyaTimeseries_1: labelSet1.length === 0 ? live_data?.LabelnyaTimeseries_1 || [] : labelSet1,
        LabelnyaTimeseries_2: labels,
      })
    );
  }

  const [dataChart2, setDataChart2] = useState([]);

  function ItemDropdown({ anaknyafilter, dropside, indexed = -1 }) {
    const [children, setChildrend] = useState([]);
    const [viewChildren, setViewChildren] = useState(false);
    // const [menu, setMenu] = useState([]);
    // pake api production
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
      case 232:
        menu = [[350], false, [232]];
        break;
      case 350:
        menu = [[232], false, [350]];
        break;

      case 392:
        menu = [[393], false, [392]];
        break;
      case 393:
        menu = [[392], false, [393]];
        break;

      case 352:
        menu = [[353, 354], false, [352]];
        break;
      case 353:
        menu = [[352, 354], false, [353]];
        break;
      case 354:
        menu = [[353, 352], false, [354]];
        break;

      case 335:
        menu = [[336], false, [335]];
        break;
      case 336:
        menu = [[335], false, [336]];
        break;

      // Angkatan Kerja
      case 406:
        menu = [[396, 397, 398, 399, 400, 436], false, [406]];
        break;

      case 396:
        menu = [[406, 407], false, [397]];
        break;

      case 397:
        menu = [[406, 407], false, [396]];
        break;

      // Bukan Angkatan Kerja
      case 407:
        menu = [[398, 399, 400, 436, 396, 397], false, [407]];
        break;

      case 398:
        menu = [[406, 407], false, [399, 400, 436]];
        break;

      case 399:
        menu = [[406, 407], false, [398, 400, 436]];
        break;

      case 400:
        menu = [[406, 407], false, [398, 399, 436]];
        break;

      case 436:
        menu = [[406, 407], false, [398, 399, 400]];
        break;

      // ASN Daerah
      case 448:
        menu = [[450, 452, 460], false, [449]];
        break;

      case 449:
        menu = [[450, 452, 460], false, [448]];
        break;

      case 450:
        menu = [[449, 452, 460, 448], false, [450]];
        break;

      case 452:
        menu = [[449, 450, 460, 448], false, [452]];
        break;

      case 460:
        menu = [[449, 450, 452, 448], false, [460]];
        break;

      // ASN
      case 441:
        menu = [[442, 443], false, [441]];
        break;

      case 442:
        menu = [[441, 443], false, [442]];
        break;

      case 443:
        menu = [[441, 442], false, [443]];
        break;
    }
    // [pake api stagging]
    //   var menu = [];
    // switch (anaknyafilter.id) {
    //   case 62: //transfer
    //     menu = [[69, 119], false, [65]];
    //     break;
    //   case 65: //lain transfer
    //     menu = [[69, 119], false, [62]];
    //     break;
    //   case 69: //perimbangan
    //     menu = [[62, 65], false, [119]];
    //     break;
    //   case 119: //lain imbang
    //     menu = [[62, 65], false, [69]];
    //     break;
    //   case 133: //operasi
    //     menu = [[151, 161], false, [140, 147, 148]];
    //     break;
    //   case 140: //modal
    //     menu = [[151, 161], false, [133, 147, 148]];
    //     break;
    //   case 147: //tak terduga
    //     menu = [[151, 161], false, [133, 140, 148]];
    //     break;
    //   case 148: //belanja trf
    //     menu = [[151, 161], false, [140, 147, 133]];
    //     break;
    //   case 151: //b.tidak langsung
    //     menu = [[133, 140, 147, 148], false, [161]];
    //     break;
    //   case 161: //b. langsung
    //     menu = [[133, 140, 147, 148], false, [151]];
    //     break;
    //   case 166:
    //     menu = [[173], false, [166]];
    //     break;
    //   case 173:
    //     menu = [[166], false, [173]];
    //     break;
    //   case 233:
    //     menu = [[250, 267], false, [233]];
    //     break;
    //   case 250:
    //     menu = [[233], false, [267]];
    //     break;
    //   case 267:
    //     menu = [[233], false, [250]];
    //     break;
    //   case 232:
    //     menu = [[350], false, [232]];
    //     break;
    //   case 350:
    //     menu = [[232], false, [350]];
    //     break;

    //   case 392:
    //     menu = [[393], false, [392]];
    //     break;
    //   case 393:
    //     menu = [[392], false, [393]];
    //     break;

    //   case 352:
    //     menu = [[353, 354], false, [352]];
    //     break;
    //   case 353:
    //     menu = [[352, 354], false, [353]];
    //     break;
    //   case 354:
    //     menu = [[353, 352], false, [354]];
    //     break;

    //   case 335:
    //     menu = [[336], false, [335]];
    //     break;
    //   case 336:
    //     menu = [[335], false, [336]];
    //     break;

    //   // Angkatan Kerja
    //   case 406:
    //     menu = [[396, 397,398,399,400,436], false, [406]];
    //     break;

    //   case 396:
    //     menu = [[406,407], false, [397]];
    //     break;

    //   case 397:
    //     menu = [[406,407], false, [396]];
    //   break;

    //   // Bukan Angkatan Kerja
    //   case 407:
    //     menu = [[398, 399, 400, 436, 396, 397], false, [407]];
    //   break;

    //   case 398:
    //     menu = [[406,407], false, [399, 400, 436]];
    //   break;

    //   case 399:
    //     menu = [[406,407], false, [398, 400, 436]];
    //   break;

    //   case 400:
    //     menu = [[406,407], false, [398, 399, 436]];
    //   break;

    //   case 436:
    //     menu = [[406,407], false, [398, 399, 400]];
    //   break;

    //   // ASN Daerah
    //   case 445:
    //     menu = [[449, 451, 452], false, [446]];
    //   break;

    //   case 446:
    //     menu = [[449, 451, 452], false, [445]];
    //   break;

    //   case 448:
    //     menu = [[449, 451, 452], false, [450]];
    //   break;

    //   case 450:
    //     menu = [[449, 451, 452], false, [448]];
    //   break;

    //   case 449:
    //     menu = [[446, 451, 452, 445, 448, 450], false, [449]];
    //   break;

    //   case 451:
    //     menu = [[446, 449, 452, 445, 448, 450], false, [451]];
    //   break;

    //   case 452:
    //     menu = [[446, 449, 451, 445, 448, 450], false, [452]];
    //   break;

    //   // ASN
    //   case 441:
    //     menu = [[442, 443], false, [441]];
    //   break;

    //   case 442:
    //     menu = [[441,443], false, [442]];
    //   break;

    //   case 443:
    //     menu = [[441,442], false, [443]];
    //   break;
    //   }
    useEffect(() => {
      fetch(process.env.REACT_APP_URL_API + `/filter-child?satuan_id=1&lang=en&parent_id=${anaknyafilter.id}`)
        .then((response) => response.json())
        .then((result) => {
          var list = [];
          result.data.forEach((item) => {
            if (item.flagging === "all") {
              list.push(item);
            }
            if (item.flagging === "province") {
              if (isProvince) {
                list.push(item);
              }
            }
            if (item.flagging == "city") {
              if (!isProvince) {
                list.push(item);
              }
            }
          });
          setChildrend(list);
        });
    }, []);

    useEffect(() => {
      if (sessionStorage.getItem("selectedDataBerkaca") != null) {
        var live_data = JSON.parse(sessionStorage.getItem("selectedDataBerkaca"));
        if (dropside == 1) {
          if (live_data.dataset_1Berkaca == "semua") {
            // try {
            //   document.getElementById("ds1_all_" + live_data.ds1_child).checked = true;
            //   document.getElementById(
            //     "1_checkbox_" + anaknyafilter.id
            //   ).checked = false;
            //   document.getElementById(
            //     "1_checkbox_" + anaknyafilter.id
            //   ).disabled = true;
            // } catch (error) {
            //   console.log("apalah", error)
            // }
          } else {
            //${dropside}_checkbox_${anaknyafilter?.id}
            var found = live_data.all_ds1_set.indexOf("" + anaknyafilter.id);
            if (found >= 0) {
              document.getElementById("1_checkbox_" + anaknyafilter.id).checked = true;
              showChildren(document.getElementById("1_checkbox_" + anaknyafilter.id), `children_${anaknyafilter?.id}`, anaknyafilter?.id, menu);
              var label = labelSet1;
              label[anaknyafilter?.id] = anaknyafilter?.nama;
              // var index = label.indexOf(anaknyafilter?.id_parent);
              if (label[anaknyafilter?.id_parent] != null) {
                delete label[anaknyafilter?.id_parent];
              }
              // var index = label.indexOf(anaknyafilter?.id_parent);
              // console.log("idparentditemukan "+anaknyafilter?.id_parent, label[anaknyafilter?.id_parent])
              // console.log("testdata", label[10] == null)
              // console.log("labelllll",label)
              setLabelSet1(label);
            }
          }
        }
        if (dropside == 2) {
          console.log("dataset2 load semua");
          if (live_data.dataset_2Berkaca == "semua") {
            // try {
            //   document.getElementById("ds2_all_" + live_data.ds2_child).checked = true;
            //   document.getElementById(
            //     "2_checkbox_" + anaknyafilter.id
            //   ).checked = false;
            //   document.getElementById(
            //     "2_checkbox_" + anaknyafilter.id
            //   ).disabled = true;
            // } catch (error) {
            //   console.log("apalah2", error)
            // }
            // console.log("dataset2 semua");
          } else {
            console.log("dataset2 tidak semua");
            var found = live_data.all_ds2_set.indexOf("" + anaknyafilter.id);
            if (found >= 0) {
              document.getElementById("2_checkbox_" + anaknyafilter.id).checked = true;
              showChildren(document.getElementById("2_checkbox_" + anaknyafilter.id), `children_${anaknyafilter?.id}`, anaknyafilter?.id, menu);
            }
          }
        }
      }
    }, []);

    function showChildren(elm, target, id, menu = [], content = null) {
      if (elm.checked) {
        console.log(elm.id);
        setViewChildren(true);
        if (content != null) {
          if (content.contain_alert != null) {
            if (content.contain_alert != null && content.contain_alert == "y") {
              popUpCheckbox(content.content_alert);
            }
          }
        }

        if (menu.length > 0) {
          menu[0].forEach((item) => {
            let checkbox = document.getElementById(`${dropside}_checkbox_${item}`);
            if (checkbox) {
              checkbox.checked = menu[1];
              checkbox.disabled = true;
            }
          });
        }
      } else {
        setViewChildren(false);
        if (menu.length > 0) {
          menu[0].forEach((item) => {
            let checkbox = document.getElementById(`${dropside}_checkbox_${item}`);
            if (checkbox) {
              var status = false;
              var index = 0;
              while (!status && index < menu[2].length) {
                let relatedCheckbox = document.getElementById(`${dropside}_checkbox_${menu[2][index]}`);
                if (relatedCheckbox) {
                  status = relatedCheckbox.checked;
                }
                index++;
              }

              if (status) {
                checkbox.checked = menu[1];
                checkbox.disabled = true;
              } else {
                checkbox.checked = menu[1];
                checkbox.disabled = false;
              }
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
              onChange={(e) => showChildren(e.target, `children_${anaknyafilter?.id}`, anaknyafilter?.id, menu, anaknyafilter)}
            />
            <label htmlFor={anaknyafilter?.id} className="ml-[5px]">
              {anaknyafilter?.nama}
            </label>
          </div>
          {children.length > 0 && (
            <div>
              <FontAwesomeIcon icon={faChevronDown} color="white" className={`text-right ml-[20px] w-[10px] h-[20px] ${viewChildren && "rotate-180"}`} />
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
        var element = document.getElementById("dataset1").getElementsByClassName("isSet");
        for (var i = 0; i < element.length; i++) {
          element[i].click();
        }

        //untuk mendisable seluruh anakan
        var targetDisable = document.getElementById("dataset1").getElementsByClassName("anakan");
        for (var i = 0; i < targetDisable.length; i++) {
          targetDisable[i].checked = false;
          targetDisable[i].disabled = true;
        }
      } else {
        //dataset 2
        //untuk unchecklist anakan yang udah terpilih
        var element = document.getElementById("dataset2").getElementsByClassName("isSet");
        for (var i = 0; i < element.length; i++) {
          element[i].click();
        }

        //untuk mendisable seluruh anakan
        var targetDisable = document.getElementById("dataset2").getElementsByClassName("anakan");
        for (var i = 0; i < targetDisable.length; i++) {
          targetDisable[i].checked = false;
          targetDisable[i].disabled = true;
        }
      }
    } else {
      if (type == 1) {
        //dataset 1
        var element = document.getElementById("dataset1").getElementsByClassName("anakan");
        for (var i = 0; i < element.length; i++) {
          element[i].checked = false;
          element[i].disabled = false;
        }
      } else {
        //dataset 2
        var element = document.getElementById("dataset2").getElementsByClassName("anakan");
        for (var i = 0; i < element.length; i++) {
          element[i].checked = false;
          element[i].disabled = false;
        }
      }
    }
  }

  const [sumbernya, setSumbernya] = useState("");

  const [glosarium, setGlosarium] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchGlosarium = async () => {
    const response = await fetch(process.env.REACT_APP_URL_API + "/info/list?parent=[1,2,3]", requestOptions);
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

  const [selectAllCities, setSelectAllCities] = useState(false);

  // if(jumlahpenduduk!=null){
  //   var convertStringtoInt = jumlahpenduduk.replaceAll(".","")
  //   var data_Penduduk = parseInt(convertStringtoInt) / 1000;
  // }
  // if(jumlahpenduduk2!=null){
  //   var convertStringtoInt = jumlahpenduduk2.replaceAll(".","")
  //   var data_Penduduk2 = parseInt(convertStringtoInt) / 1000;
  // }

  // var data_Penduduk2 = jumlahpenduduk2 / 1000;
  // var data_Penduduk = jumlahpenduduk / 1000;

  if (jumlahpenduduk != null) {
    var convertStringtoInt = jumlahpenduduk.replaceAll(".", "");
    var data_Penduduk = parseInt(convertStringtoInt) / 1000;
  }

  if (jumlahpenduduk2 != null) {
    var convertStringtoInt = jumlahpenduduk2.replaceAll(".", "");
    var data_Penduduk2 = parseInt(convertStringtoInt) / 1000;
  }

  const handleParentClick = () => {
    setOpenParents(!openParents);
    setOpenSelectFilter(false);
    setSelectedParents(null);
    document.getElementById("anakanparent").classList.add("hidden");
    document.getElementById("anakanfilter").classList.add("hidden");
  };

  const handleDataProvin = () => {
    setOpenParents(null);
    setOpenSelectFilter(false);
    setSelectedParents(null);
    const element = document.getElementById("anakanparent");
    if (element) {
      element.classList.add("hidden");
    }
    const filterElement = document.getElementById("anakanfilter");
    if (filterElement) {
      filterElement.classList.add("hidden");
    }
  };

  const handleParentClick2 = () => {
    setOpenParents2(!openParents2);
    setOpenSelectFilter2(false);
    setSelectedParents2(null);
    document.getElementById("anakanparent2").classList.add("hidden");
    document.getElementById("anakanfilter2").classList.add("hidden");
  };

  const handleDataProvin2 = () => {
    setOpenParents2(null);
    setOpenSelectFilter2(false);
    setSelectedParents2(null);
    document.getElementById("anakanparent2").classList.add("hidden");
    document.getElementById("anakanfilter2").classList.add("hidden");
  };

  const resetSelectFilter = () => {
    setSelectedSelectFilter(null);
    const anakanparentLabel = document.getElementById("anakanparent-label");
    if (anakanparentLabel) {
      anakanparentLabel.innerText = "Pilih";
    } else {
      console.error("Elemen anakanparent-label tidak ditemukan.");
    }
  };

  const resetSelectFilter2 = () => {
    setSelectedSelectFilter2(null);
    const anakanparentLabel2 = document.getElementById("anakanparent-label2");
    if (anakanparentLabel2) {
      anakanparentLabel2.innerText = "Pilih";
    } else {
      console.error("Elemen anakanparent-label2 tidak ditemukan.");
    }
  };

  const [data, setData] = useState({});
  const [isDataset1Visible, setIsDataset1Visible] = useState(false);

  useEffect(() => {
    const liveData = JSON.parse(sessionStorage.getItem("selectedDataBerkaca")) || {};
    setData(liveData);
  }, []);

  const handleClick = () => {
    const live_data = JSON.parse(sessionStorage.getItem("selectedDataBerkaca"));

    sessionStorage.setItem("all_ds_2", "semua");

    var dataset = [];
    var all_ds2 = [];
    var labels = [];
    var list = document.getElementById("dataset2").getElementsByClassName("isSet");

    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      if (item) {
        // Check if item is defined
        var value = item.getAttribute("value");
        var labelData = item.getAttribute("labelData");
        var parent = item.getAttribute("parent");

        if (value) {
          // Check if value is defined
          dataset.push(value);
          all_ds2.push(value);
          labels[value] = labelData;

          var index = dataset.indexOf(parent);
          if (index >= 0) {
            dataset.splice(index, 1);
            delete labels[parent];
          }
        }
      }
    }

    var checkbox_semua = document.getElementById(`ds2_all_${IDchildFilter2}`);
    if (checkbox_semua != null) {
      sessionStorage.setItem("all_ds_2", "semua");
    } else {
      sessionStorage.setItem("all_ds_2", `[${list[0]?.getAttribute("value")}]`);
    }

    setDataSet2(dataset);
    setLabelSet2(labels);

    const updatedData = {
      ds1_parent: idParent,
      ds1_child: IDchildFilter,
      parent_id_1Berkaca: IDchildFilter,
      dataset_1Berkaca: dataSet1.length === 0 || dataSet1 == "semua" ? live_data?.dataset_1Berkaca || [] : dataSet1,
      all_ds1_set: ds1_set.length === 0 ? live_data?.all_ds1_set || [] : ds1_set,
      ds2_parent: idParent2,
      ds2_child: IDchildFilter2,
      parent_id_2Berkaca: IDchildFilter2,
      dataset_2Berkaca: dataSet2.length === 0 || dataSet2 == "semua" ? live_data?.dataset_2Berkaca || [] : dataSet2,
      labelset1: labelSet1.length === 0 ? live_data?.labelset1 || [] : labelSet1,
      labelset2: labelSet2,
      namachild: selectedSelectFilter,
      grafikTimeseries: dataChart,
      grafikTimeseries2: dataChart2,
      LabelnyaTimeseries_1: labelSet1.length === 0 ? live_data?.LabelnyaTimeseries_1 || [] : labelSet1,
      LabelnyaTimeseries_2: labelSet2,
    };

    sessionStorage.setItem("selectedDataBerkaca", JSON.stringify(updatedData));
    setData(updatedData);
    setIsDataset1Visible(true);
  };

  function TampilanDataSet1() {
    useEffect(() => {
      if (sessionStorage.getItem("selectedDataBerkaca") != null) {
        var live_data = JSON.parse(sessionStorage.getItem("selectedDataBerkaca"));
        if (live_data.dataset_1Berkaca == "semua") {
          try {
            document.getElementById("ds1_all_" + live_data.ds1_child).checked = false;
            document.getElementById("ds1_all_" + live_data.ds1_child).click();
            // allCondition(
            //   document.getElementById("ds2_all_" + live_data.ds2_child),
            //   2,
            //   `ds2_all_${live_data.ds2_parent}`
            // )
          } catch (error) {
            console.log("apalah2", error);
          }
        }
      }
    }, []);

    return (
      <div>
        {Array.isArray(childFilter) && childFilter.length > 0 ? (
          childFilter.map((anaknyafilter, index) =>
            index == 0 && allOptions.indexOf(anaknyafilter.id_parent) >= 0 ? (
              <>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <input type="checkbox" id={`ds1_all_${anaknyafilter.id_parent}`} class="semuaDataSet" onClick={(e) => allCondition(e.target, 1, `ds1_all_${anaknyafilter.id_parent}`)} />
                    <label className="ml-[5px]">Semua</label>
                  </div>
                </div>
                <div className="flex flex-col">
                  <ItemDropdown anaknyafilter={anaknyafilter} dropside={1} indexed={index} />
                </div>
              </>
            ) : (
              <div className="flex flex-col">
                <ItemDropdown anaknyafilter={anaknyafilter} dropside={1} indexed={index} />
              </div>
            )
          )
        ) : (
          <p>Data sedang di proses</p>
        )}
      </div>
    );
  }

  function TampilanDataSet2() {
    useEffect(() => {
      if (sessionStorage.getItem("selectedDataBerkaca") != null) {
        var live_data = JSON.parse(sessionStorage.getItem("selectedDataBerkaca"));
        if (live_data.dataset_2Berkaca == "semua") {
          try {
            document.getElementById("ds2_all_" + live_data.ds2_child).checked = true;
            // document.getElementById("ds2_all_" + live_data.ds2_child).click();
            // allCondition(
            //   document.getElementById("ds2_all_" + live_data.ds2_child),
            //   2,
            //   `ds2_all_${live_data.ds2_parent}`
            // )
          } catch (error) {
            console.log("apalah2", error);
          }
        }
      }
    }, []);

    return (
      <div>
        {Array.isArray(childFilter2) && childFilter2.length > 0 ? (
          childFilter2.map((anaknyafilter2, index) =>
            index == 0 && allOptions.indexOf(anaknyafilter2.id_parent) >= 0 ? (
              <>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <input type="checkbox" id={`ds2_all_${anaknyafilter2.id_parent}`} class="semuaDataSet" onClick={(e) => allCondition(e.target, 2, `ds2_all_${anaknyafilter2.id_parent}`)} />
                    <label className="ml-[5px]">Semua</label>
                  </div>
                </div>
                <div className="flex flex-col">
                  <ItemDropdown anaknyafilter={anaknyafilter2} dropside={2} indexed={index} />
                </div>
              </>
            ) : (
              <div className="flex flex-col">
                <ItemDropdown anaknyafilter={anaknyafilter2} dropside={2} indexed={index} />
              </div>
            )
          )
        ) : (
          <p>Data sedang di proses</p>
        )}
      </div>
    );
  }

  const [isDataset2Clicked, setIsDataset2Clicked] = useState(false);
  const [isCityDropdownActive, setIsCityDropdownActive] = useState(true);

  return (
    <div>
      <section>
        <button className="fixed bottom-5 right-5 bg-secondary w-[60px] h-[60px] rounded-full shadow-lg" onClick={fetchGlosarium}>
          <p className="oleo-script-regular text-white text-center text-[24px]">i</p>
        </button>
        {isPopupOpen && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[400px] bg-[#BDD6E4] z-10 p-5 rounded-[10px]">
            <h1 className="text-center text-secondary font-bold text-[16px] mb-5">GLOSARIUM</h1>
            <ul>
              {glosarium
                .slice()
                .reverse()
                .map((item) => (
                  <li key={item.id} className="text-secondary">
                    <div className="flex justify-between mt-[10px] bg-white rounded-[10px] h-[40px] px-[7px] items-center">
                      <div className="flex justify-between gap-x-[10px]">
                        <FontAwesomeIcon icon={faFilePdf} color="#24445A" className="my-auto" />
                        <p className="font-bold text-[14px]">{item.nama_file}</p>
                      </div>
                      <button className="flex bg-[#24445A] hover:bg-[#86BBD8] w-auto rounded-[5px] text-white items-center justify-center text-[12px] p-[5px]" onClick={() => handleDownload(item.file)}>
                        Buka
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
            <button className="flex bg-[#24445A] hover:bg-[#86BBD8] mt-[140px] w-[105px] h-[39px] rounded-[10px] text-white items-center justify-center mx-auto text-[14px]" onClick={() => setPopupOpen(false)}>
              Tutup
            </button>
          </div>
        )}
        {selectedFile && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[45%] w-full md:w-screen h-[93vh] p-5 rounded-[10px] md:bg-gray-500 md:bg-opacity-75 z-30 flex items-center justify-center">
            <div className="flex flex-col p-[20px] bg-white rounded-lg w-full md:w-full h-full mx-auto shadow-lg md:shadow-none">
              <div className="holds-the-iframe flex items-center justify-center mx-auto w-full md:w-full h-full rounded-lg mb-[20px]">
                <iframe src={`https://docs.google.com/viewer?url=https://api.otonometer.neracaruang.com/api/info/download/${selectedFile}&embedded=true`} className="w-full h-full" />
              </div>
              <div className="flex gap-x-[10px] items-center justify-center">
                <button className="flex bg-[#24445A] hover:bg-[#86BBD8] w-[105px] h-[39px] rounded-[10px] text-white items-center justify-center text-[14px]">
                  <a href={`https://api.otonometer.neracaruang.com/api/info/download/${selectedFile}`} target="_blank">
                    Download
                  </a>
                </button>
                <button className="flex bg-[#24445A] hover:bg-[#86BBD8] w-[105px] h-[39px] rounded-[10px] text-white items-center justify-center text-[14px]" onClick={closeModal}>
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      <div className="flex flex-col mt-[125px] mb-[20px] justify-center items-center">
        <img src={geometry} alt="" className="md:hidden lg:block hidden fixed w-full top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10 opacity-10 object-cover" />
        <img src={geometrys} alt="" className="hidden md:block lg:hidden fixed w-full top-[40%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover" />
        <img src={geometryss} alt="" className="block md:hidden lg:hidden fixed w-full top-[5%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover" />
        {/* <div className="flex bg-none w-[167px] h-[41px] rounded-[10px] text-secondary border-2 border-secondary text-[14px] font-semibold items-center justify-center">
        BERKACA
      </div> */}
        <h1 className="text-center flex justify-center items-center text-secondary text-[24px] md:text-[34px] font-bold mt-[24px] mb-[20px]">Bandingkan Daerah Pilihanmu!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[200px] gap-y-[10px] mt-[50px]">
          <div className="flex flex-col">
            {/* PROVINSI PERTAMA */}
            <p className="font-bold text-center text-secondary">Daerah 1</p>
            <div className="flex flex-col mt-[20px]">
              <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
                <div
                  onClick={() => {
                    if (selectedCity !== "Semua" && selectedCity2 !== "Semua" && isDataset2Clicked) return;
                    setOpenProvinsi(!openProvinsi);
                    if (openCity) {
                      setOpenCity(false);
                    }
                  }}
                  className={`bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px] ${selectedCity !== "Semua" && selectedCity2 !== "Semua" && isDataset2Clicked ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  {selected ? (selected?.length > 20 ? selected?.substring(0, 20) + "..." : selected) : "Provinsi"}
                  <FontAwesomeIcon icon={faChevronDown} color="#24445A" className={`ml-[20px] w-[10px] h-[20px] ${openProvinsi && "rotate-180"}`} />
                </div>
                <div
                  className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
            ${openProvinsi ? "max-h-auto" : "hidden"}`}
                >
                  <FontAwesomeIcon icon={faSearch} color="#24445A" style={{ opacity: "40%" }} className="w-[10px] h-[20px] opacity-75" />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                    placeholder="Cari Provinsi"
                    className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
                  />
                </div>
                <ul
                  className={`bg-[#ebebeb] mt-2 mb-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
              ${openProvinsi ? "max-h-[240px]" : "max-h-[0]"}`}
                >
                  {provincess?.map((provinces) => (
                    <li
                      key={provinces?.nama}
                      className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                ${provinces?.nama?.toLowerCase() === selected?.toLowerCase() && "bg-secondary text-white"}
                ${provinces?.nama?.toLowerCase().includes(inputValue) ? "block" : "hidden"}`}
                      onClick={() => {
                        handleDataProvin();
                        handleDataProvin2();
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
                        setIsProvince(true);
                        provinsi = provinces.id;
                        wilayah = provinces.id;
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
            </div>
            {/* KOTA PERTAMA */}
            <div className="flex flex-col justify-end items-end">
              <div className="w-[250px] h-auto text-secondary font-medium text-[14px] cursor-pointer">
                <div
                  onClick={() => {
                    if (selectedCity === "Semua" && selectedCity2 === "Semua" && isDataset2Clicked) return;
                    setOpenCity(!openCity);
                    if (openProvinsi) {
                      setOpenProvinsi(false);
                    }
                  }}
                  className={`bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px] ${selectedCity === "Semua" && selectedCity2 === "Semua" && isDataset2Clicked ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  {selectedCity ? (selectedCity?.length > 20 ? selectedCity?.substring(0, 20) + "..." : selectedCity) : "Kota/Kabupaten"}
                  <FontAwesomeIcon icon={faChevronDown} color="#24445A" className={`ml-[20px] w-[10px] h-[20px] ${openCity && "rotate-180"}`} />
                </div>
                <div
                  className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
          ${openCity ? "max-h-auto" : "hidden"}`}
                >
                  <FontAwesomeIcon icon={faSearch} color="#24445A" style={{ opacity: "40%" }} className="w-[10px] h-[20px] opacity-75" />
                  <input
                    type="text"
                    value={inputValueofCity}
                    onChange={(e) => setInputValueofCity(e.target.value.toLowerCase())}
                    placeholder="Cari Kota/Kabupaten"
                    className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
                  />
                </div>
                <ul
                  className={`bg-[#ebebeb] mt-2 rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar
              ${openCity ? "max-h-[240px]" : "max-h-[0]"}`}
                >
                  {!(selectedCity?.toLowerCase() !== "Semua" && selectedCity2?.toLowerCase() !== "Semua" && isDataset2Clicked) && (
                    <li
                      className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary ${selectedCity?.toLowerCase() === "semua" ? "bg-secondary text-white" : ""}`}
                      onClick={() => {
                        handleDataProvin();
                        handleDataProvin2();
                        wilayah = provinsi;
                        setInfoDaerah("Semua");
                        setSelectedCity("Semua");
                        setDataranicon("Semua");
                        setWilayahID(getInfoProvinsi);
                        setSelectedYears(sessionStorage.getItem("yearss"));
                        updatePeta(getInfoProvinsi);
                        setOpenCity(false);
                        setIsProvince(true);
                        sessionStorage.setItem("namawilayah", "Semua");
                        sessionStorage.setItem("idkota", getInfoProvinsi);
                        sessionStorage.setItem("namakota", "Semua");
                        sessionStorage.setItem("idwilayah", getInfoProvinsi);
                        setSelectedCity2("Semua");
                        wilayah2 = provinsi2;
                        setInfoDaerah2("Semua");
                        setSelectedCity2("Semua");
                        setWilayahID2(getInfoProvinsi2);
                        setSelectedYears(sessionStorage.getItem("yearss"));
                        updatePeta2(getInfoProvinsi2);
                        setOpenCity2(false);
                        setIsProvince(true);
                        sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                        sessionStorage.setItem("idkota_berkaca2", wilayahID2);
                        sessionStorage.setItem("namakota_berkaca2", "Semua");
                        sessionStorage.setItem("idwilayah_berkaca2", getInfoProvinsi2);
                      }}
                    >
                      Semua
                    </li>
                  )}

                  {cities?.map((regencies) => (
                    <li
                      key={regencies?.nama}
                      className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                ${regencies?.nama?.toLowerCase() === selectedCity?.toLowerCase() && "bg-secondary text-white"}
                ${regencies?.nama?.toLowerCase().includes(inputValueofCity) ? "block" : "hidden"}`}
                      onClick={() => {
                        handleDataProvin();
                        handleDataProvin2();
                        if (regencies?.nama?.toLowerCase() !== selectedCity.toLowerCase()) {
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
                          setIsProvince(false);
                          sessionStorage.setItem("idwilayah", regencies.id);
                          // setActiveTab("provinsi");
                          // updateSektor();
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
                  onClick={() => {
                    if (selectedCity !== "Semua" && selectedCity2 !== "Semua" && isDataset2Clicked) return;
                    setOpenProvinsi2(!openProvinsi2);
                    if (openCity2) {
                      setOpenCity2(false);
                    }
                  }}
                  className={`bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px] ${selectedCity !== "Semua" && selectedCity2 !== "Semua" && isDataset2Clicked ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  {selected2 ? (selected2?.length > 20 ? selected2?.substring(0, 20) + "..." : selected2) : "Provinsi"}
                  <FontAwesomeIcon icon={faChevronDown} color="#24445A" className={`ml-[20px] w-[10px] h-[20px] ${openProvinsi2 && "rotate-180"}`} />
                </div>
                <div
                  className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
            ${openProvinsi2 ? "max-h-auto" : "hidden"}`}
                >
                  <FontAwesomeIcon icon={faSearch} color="#24445A" style={{ opacity: "40%" }} className="w-[10px] h-[20px] opacity-75" />
                  <input
                    type="text"
                    value={inputValue2}
                    onChange={(e) => setInputValue2(e.target.value.toLowerCase())}
                    placeholder="Cari Provinsi"
                    className="text-secondary placeholder:text-opacity-75 p-2 outline-none w-full text-[12px] font-medium bg-[#ebebeb]"
                  />
                </div>
                <ul
                  className={`bg-[#ebebeb] mt-2 rounded-[10px] mb-2 max-h-60 overflow-y-scroll mini-scrollbar
              ${openProvinsi2 ? "max-h-[240px]" : "max-h-[0]"}`}
                >
                  {provincess2?.map((provinces2) => (
                    <li
                      key={provinces2?.nama}
                      className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] 
                ${provinces2?.nama?.toLowerCase() === selected2?.toLowerCase() && "bg-secondary text-white"}
                ${provinces2?.nama?.toLowerCase().includes(inputValue2) ? "block" : "hidden"}`}
                      onClick={() => {
                        // handleDataProvin();
                        handleDataProvin2();
                        updateKota2(provinces2?.nama, selected2, provinces2.id);
                        sessionStorage.setItem("idprovinsi_berkaca2", provinces2.id);
                        sessionStorage.setItem("namaprovinsi_berkaca2", provinces2.nama);
                        setGetInfoProvinsi2(provinces2.id);
                        setWilayahID2(provinces2.id);
                        sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                        setInfoDaerah2("Semua");
                        setSelectedCity2("Semua");
                        setDataranicon2("Semua");
                        setSelectedYears(sessionStorage.getItem("yearss"));
                        updatePeta2(provinces2.id);
                        setIsProvince(true);
                        provinsi2 = provinces2.id;
                        wilayah2 = provinces2.id;
                        sessionStorage.setItem("namakota_berkaca2", "Semua");
                        sessionStorage.setItem("idkota_berkaca2", provinces2.id);
                        sessionStorage.setItem("idwilayah_berkaca2", provinces2.id);
                        setProvinsiSelected(true);
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
                    if (selectedCity === "Semua" && selectedCity2 === "Semua" && isDataset2Clicked) return;
                    if (openProvinsi2) {
                      setOpenProvinsi2(false);
                    }
                    if (sessionStorage.getItem("idprovinsi_berkaca2") === null) {
                      handlePopupDropdownKota();
                      setOpenProvinsi2(true);
                    } else {
                      setOpenCity2(!openCity2);
                    }
                  }}
                  className={`bg-[#ebebeb] w-full p-2 px-[30px] flex items-center justify-between rounded-[10px] ${selectedCity === "Semua" && selectedCity2 === "Semua" && isDataset2Clicked ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  {selectedCity2 ? (selectedCity2?.length > 20 ? selectedCity2?.substring(0, 20) + "..." : selectedCity2) : "Kota/Kabupaten"}
                  <FontAwesomeIcon icon={faChevronDown} color="#24445A" className={`ml-[20px] w-[10px] h-[20px] ${openCity2 && "rotate-180"}`} />
                </div>
                <div
                  className={`flex items-center px-2 sticky top-0 bg-[#ebebeb] w-full mt-2 rounded-[10px]
                  ${openCity2 ? "max-h-auto" : "hidden"}`}
                >
                  <FontAwesomeIcon icon={faSearch} color="#24445A" style={{ opacity: "40%" }} className="w-[10px] h-[20px] opacity-75" />
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
                  ${openCity2 ? "max-h-[240px]" : "max-h-[0] hidden"}`}
                >
                  {selectedCity === "Semua" ? (
                    <>
                      <li className="p-2 text-[12px] text-gray-400">Pilih tingkat Kab/Kota di Daerah 1 untuk mengakses Kab/Kota</li>
                      <li
                        className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-secondary
                       ${"Semua" === selectedCity2?.toLowerCase() && "bg-secondary text-white"}`}
                        onClick={() => {
                          handleDataProvin();
                          handleDataProvin2();
                          setSelectedCity2("Semua");
                          wilayah2 = provinsi2;
                          setInfoDaerah2("Semua");
                          setSelectedCity2("Semua");
                          setDataranicon2("Semua");
                          setWilayahID2(getInfoProvinsi2);
                          setSelectedYears(sessionStorage.getItem("yearss"));
                          updatePeta2(getInfoProvinsi2);
                          setOpenCity2(false);
                          setIsProvince(true);
                          sessionStorage.setItem("namawilayah_berkaca2", "Semua");
                          sessionStorage.setItem("idkota_berkaca2", wilayahID2);
                          sessionStorage.setItem("namakota_berkaca2", "Semua");
                          sessionStorage.setItem("idwilayah_berkaca2", getInfoProvinsi2);
                          sessionStorage.getItem("selectedCity2", "Semua");
                          sessionStorage.setItem("infoProvinsi2", getInfoProvinsi2);
                        }}
                      >
                        Semua
                      </li>
                    </>
                  ) : (
                    !(selectedCity?.toLowerCase() !== "semua" && selectedCity2?.toLowerCase() !== "semua" && isDataset2Clicked) && <li className="p-2 text-[12px] text-gray-400">Pilih "Semua" di Daerah 1 untuk mengakses Provinsi</li>
                  )}
                  {cities2?.map((regencies2) => (
                    <li
                      key={regencies2?.nama}
                      className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] ${regencies2?.nama?.toLowerCase() === selectedCity2?.toLowerCase() && "bg-secondary text-white"} ${
                        regencies2?.nama?.toLowerCase().includes(inputValueofCity2) ? "block" : "hidden"
                      }`}
                      onClick={() => {
                        handleDataProvin();
                        handleDataProvin2();
                        if (selectedCity === "Semua") {
                          setSelectedCity2("Semua");
                          return;
                        }
                        if (regencies2?.nama?.toLowerCase() !== selectedCity2.toLowerCase()) {
                          wilayah2 = regencies2.id;
                          sessionStorage.setItem("namawilayah_berkaca2", regencies2.nama);
                          setSelectedCity2(regencies2?.nama);
                          sessionStorage.setItem("idkota_berkaca2", regencies2.id);
                          sessionStorage.setItem("namakota_berkaca2", regencies2.nama);
                          setOpenCity2(false);
                          setInputValueofCity2("");
                          updatePeta2(regencies2.id);
                          setWilayahID2(regencies2.id);
                          setSelectedYears(sessionStorage.getItem("yearss"));
                          setIsProvince(false);
                          sessionStorage.setItem("idwilayah_berkaca2", regencies2.id);
                        }
                      }}
                      style={{
                        color: selectedCity === "Semua" && regencies2?.nama !== "Semua" ? "gray" : null,
                      }}
                      disabled={selectedCity === "Semua"}
                    >
                      {regencies2?.nama}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[140px] h-auto text-secondary font-medium text-[14px] cursor-pointer mt-[40px]">
          <div onClick={() => setOpenYears(!openYears)} className="bg-[#ebebeb] w-full p-2 flex items-center justify-center rounded-[10px]">
            {selectedYears ? (selectedYears?.length > 12 ? selectedYears?.substring(0, 12) + "..." : selectedYears) : "Tahun"}
            <FontAwesomeIcon icon={faChevronDown} color="#24445A" className={`ml-[40px] w-[10px] h-[20px] ${openYears && "rotate-180"}`} />
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
                    sessionStorage.setItem("yearss", tahunn?.tahun);
                    sessionStorage.setItem("yearss", tahunn?.tahun);
                    updatePeta(wilayahID);
                    updatePeta2(wilayahID2);
                  }
                }}
              >
                {tahunn?.tahun}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden xl:block">
          <div className="flex gap-x-[80px] my-[20px]">
            {/* DAERAH1 */}
            {wilayahID2 && ( // Check if wilayahID2 exists
              <div className="flex flex-col items-center justify-center">
                <img src={peta} alt="" className="flex items-center w-80 mb-[40px] mt-[20px]" />
                <div className="flex justify-center items-center gap-x-[20px]">
                  <img src={pinMap} alt="" className="flex w-6" />
                  <div className="text-secondary">
                    <h1 className="text-[16px] font-bold">{infoDaerah}</h1>
                    <p className="font-semibold text-[14px]">{koordinatLokasi}</p>
                  </div>
                </div>
                <div className="flex gap-[40px] mt-[40px] mb-[20px] ml-[40px]">
                  <div className="text-[16px] text-secondary mt-[5px]">
                    <p className="font-bold"> {luaswilayah}</p>
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
                              {mdpl}
                              {selectedCity !== "Kota Jakarta" && <span>&nbsp;mdpl</span>}
                            </p>
                          </>
                        )}
                        <p>{datarannama}</p>
                      </span>
                    </div>
                    <a href="/Berkaca-Profil-Daerah1">
                      <img src={people} alt="" className="w-[60px] lg:w-20 object-contain hover:scale-110 transform transition duration-300" />
                    </a>
                    <div className="hover-container">
                      <img src={sektoricon} alt="" className="object-contain w-[60px] lg:w-20" />
                      <span className="hover-text w-[200%] mb-[10px]">
                        <p>{nilaisektor}</p>
                        <p>{sektornama}</p>
                      </span>
                    </div>
                  </div>
                  <div className="text-[16px] text-secondary mt-[5px] lg:text-[20px]">
                    <p className="font-bold">{Math.round(data_Penduduk).toLocaleString().replaceAll(/,/g, ".")}</p>
                    <p className="font-regular">10³ Jiwa</p>
                  </div>
                </div>
              </div>
            )}
            {/* DAERAH2 */}

            {wilayahID2 && (
              <div className="flex flex-col items-center justify-center">
                <img src={peta2} alt="" className="flex items-center w-80 mb-[40px] mt-[20px]" />
                <div className="flex justify-center items-center gap-x-[20px]">
                  <img src={pinMap2} alt="" className="flex w-6" />
                  <div className="text-secondary">
                    <h1 className="text-[16px] font-bold">{infoDaerah2}</h1>
                    <p className="font-semibold text-[14px]">{koordinatLokasi2}</p>
                  </div>
                </div>
                <div className="flex gap-[40px] mt-[40px] mb-[20px] ml-[40px]">
                  <div className="text-[16px] text-secondary mt-[5px]">
                    <p className="font-bold"> {luaswilayah2}</p>
                    <p className="font-regular">km²</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <div className="hover-container">
                      <img src={dataranicon2} alt="" className="object-contain w-[60px] lg:w-20" />
                      <span className="hover-text w-auto mb-[10px]">
                        {selectedCity2 !== "Semua" && ( // Hanya tampilkan mdpl jika selectedCity bukan "Semua"
                          <>
                            {luaswilayah2}
                            <span>&nbsp;km²</span>
                            <p>
                              {mdpl}
                              {selectedCity2 !== "Kota Jakarta" && <span>&nbsp;mdpl</span>}
                            </p>
                          </>
                        )}
                        <p>{datarannama2}</p>
                      </span>
                    </div>
                    <a href={selected2 ? "/Berkaca-Profil-Daerah2" : "#"} onClick={(e) => !selected2 && e.preventDefault()}>
                      <img src={people} alt="" className="w-[60px] lg:w-20 object-contain hover:scale-110 transform transition duration-300" />
                    </a>

                    <div className="hover-container">
                      <img src={sektoricon2} alt="" className="object-contain w-[60px] lg:w-20" />
                      <span className="hover-text w-[200%] mb-[10px]">
                        <p>{nilaisektor2}</p>
                        <p>{sektornama2}</p>
                      </span>
                    </div>
                  </div>
                  <div className="text-[16px] text-secondary mt-[5px] lg:text-[20px]">
                    <p className="font-bold">{Math.round(data_Penduduk2).toLocaleString().replaceAll(/,/g, ".")}</p>
                    <p className="font-regular">10³ Jiwa</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-[50px]">
        {/* DROPDOWN DATASET 1 */}
        <div id="dataset1" className="gap-[100px] mt-[40px] h-auto">
          <h1 className="text-secondary text-[14px] font-semibold text-center">DATASET 1</h1>
          <div>
            {provinsiSelected ? (
              <div className="relative flex flex-col items-center">
                <div className="lg:w-[250px] w-[200px] h-auto rounded-[10px] text-white border-1 border-[f1f1f1] text-[14px] font-medium  drop-shadow-lg mt-[10px] mb-[10px] cursor-pointer ">
                  <div
                    onClick={() => {
                      if (selectedCity.toLowerCase() !== "semua" && selectedCity2.toLowerCase() === "semua") {
                        Swal.fire({
                          title: "Perhatian!",
                          text: "Kolom Kab/Kota pada Daerah 2 harus diisi karena tidak memungkinkan perbandingan antara provinsi dan kabupaten.",
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
                        return;
                      }

                      if (selectedCity.toLowerCase() === "semua" && selectedCity2.toLowerCase() !== "semua") {
                        Swal.fire({
                          title: "Perhatian!",
                          text: "Kolom Kab/Kota pada Daerah 1 harus diisi karena tidak memungkinkan perbandingan antara provinsi dan kabupaten.",
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
                        return;
                      }

                      handleParentClick();
                      resetSelectFilter(selectedSelectFilter);
                    }}
                    className="bg-secondary w-full p-2 px-[20px] flex items-center justify-between rounded-[10px]"
                  >
                    {selectedParents ? (selectedParents?.length > 20 ? selectedParents?.substring(0, 20) + "..." : selectedParents) : "Pilih"}
                    <FontAwesomeIcon icon={faChevronDown} color="white" className={`ml-[20px] w-[10px] h-[20px] ${openParents && "rotate-180"}`} />
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
                        document.getElementById("anakanparent").classList.add("hidden");
                        document.getElementById("anakanfilter").classList.add("hidden");
                      }}
                    >
                      Pilih
                    </li>
                    {parents?.map((parentnya) => (
                      <li
                        key={parentnya?.id}
                        id={`ds1_parent_${parentnya.id}`}
                        className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-center`}
                        onClick={() => {
                          updateParents(parentnya.nama, selectedParents, parentnya.id, isProvince);
                          sessionStorage.setItem("idParent", parentnya.id);
                          sessionStorage.setItem("namaParent", parentnya.nama);
                          sessionStorage.setItem("namaParent1", parentnya.nama);
                          sessionStorage.setItem("namaParentBerkaca", parentnya.nama);
                          setIdParent(parentnya.id);
                          if (parentnya.id !== null) {
                            document.getElementById("anakanparent").classList.remove("hidden");
                          }
                        }}
                      >
                        {parentnya?.nama}
                      </li>
                    ))}
                  </ul>
                  {/* DROPDOWN ANAKAN PARENT */}
                  <div
                    id="anakanparent"
                    className="hidden lg:w-[250px] w-[200px] h-auto rounded-[10px] text-white border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg mt-[10px] mb-[10px] cursor-pointer"
                  >
                    <div
                      onClick={() => {
                        if (selectedCity.toLowerCase() !== "semua" && selectedCity2.toLowerCase() === "semua") {
                          Swal.fire({
                            title: "Perhatian!",
                            text: "Kolom Kab/Kota pada Daerah 2 harus diisi karena tidak memungkinkan perbandingan antara provinsi dan kabupaten.",
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
                          return;
                        }
                        if (selectedCity.toLowerCase() === "semua" && selectedCity2.toLowerCase() !== "semua") {
                          Swal.fire({
                            title: "Perhatian!",
                            text: "Kolom Kab/Kota pada Daerah 1 harus diisi karena tidak memungkinkan perbandingan antara provinsi dan kabupaten.",
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
                          return;
                        }

                        resetSelectFilter(null);
                        setOpenSelectFilter(!openSelectFilter);
                        //untuk unchecklist pilihan semua
                        var targetSemua = document.getElementById("dataset1").getElementsByClassName("semuaDataSet");
                        for (var i = 0; i < targetSemua.length; i++) {
                          targetSemua[i].checked = false;
                        }
                      }}
                      className="bg-third w-full p-2 px-[20px] flex items-center justify-between rounded-[10px]"
                    >
                      {selectedSelectFilter ? (selectedSelectFilter?.length > 20 ? selectedSelectFilter?.substring(0, 20) + "..." : selectedSelectFilter) : "Pilih"}
                      <FontAwesomeIcon icon={faChevronDown} color="white" className={`ml-[20px] w-[10px] h-[20px] ${openSelectFilter && "rotate-180"}`} />
                    </div>
                    <ul
                      className={`bg-third mt-2 rounded-[10px] max-h-60 overflow-y-auto
                      ${openSelectFilter ? "max-h-[240px]" : "max-h-[0]"}`}
                    >
                      <li
                        className="p-2 text-[12px] hover:bg-[#a4b6b9] hover:text-secondary rounded-[10px] text-center"
                        onClick={() => {
                          updateParents(null, null, null);
                          document.getElementById("anakanparent").classList.add("hidden");
                          document.getElementById("anakanfilter").classList.add("hidden");
                        }}
                      >
                        Pilih
                      </li>
                      {selectFilter?.map((filternya) => (
                        <li
                          key={filternya?.id}
                          id={`ds1_child_${filternya.id}`}
                          className={`p-2 text-[12px] hover:bg-[#a4b6b9] hover:text-secondary rounded-[10px] text-center`}
                          onClick={() => {
                            updateSelectFilter(filternya.nama, selectedSelectFilter, idParent, filternya.id);
                            // setIdParent2(filternya.id);
                            setIDChildFilter(filternya.id);
                            var label = [];
                            label[filternya.id] = filternya.nama;
                            setLabelSet1(label);
                            sessionStorage.setItem("namaFilter1Berkaca", filternya.nama);
                            if (filternya.id !== null) {
                              document.getElementById("anakanfilter").classList.remove("hidden");
                            }

                            //untuk unchecklist pilihan semua
                            var targetSemua = document.getElementById("dataset1").getElementsByClassName("semuaDataSet");
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
                          index == 0 && allOptions.indexOf(anaknyafilter.id_parent) >= 0 ? (
                            <>
                              <div className="flex justify-between">
                                <div className="flex items-center">
                                  <input type="checkbox" id={`ds1_all_${anaknyafilter.id_parent}`} class="semuaDataSet" onClick={(e) => allCondition(e.target, 1, `ds1_all_${anaknyafilter.id_parent}`)} />
                                  <label className="ml-[5px]">Semua</label>
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <ItemDropdown anaknyafilter={anaknyafilter} dropside={1} indexed={index} />
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col">
                              <ItemDropdown anaknyafilter={anaknyafilter} dropside={1} indexed={index} />
                            </div>
                          )
                        )
                      ) : (
                        <p>Data sedang di proses</p>
                      )}
                      {/* <TampilanDataSet1/> */}
                      <div></div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsDataset2Clicked(true);
                      const dataset1 = document.getElementById("dataset1");
                      const selectedElements = dataset1.querySelectorAll('input[type="checkbox"]:checked');
                      if (selectedElements.length === 0) {
                        Swal.fire({
                          title: "Perhatian!",
                          text: "Anda harus memilih setidaknya satu pilihan dari dataset.",
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
                        return;
                      }
                      if (selectedCity.toLowerCase() !== "semua" && selectedCity2.toLowerCase() === "semua") {
                        Swal.fire({
                          title: "Perhatian!",
                          text: "Kolom Kab/Kota pada Daerah 2 harus diisi karena tidak memungkinkan perbandingan antara provinsi dan kabupaten.",
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
                        return;
                      }
                      if (selectedCity.toLowerCase() === "semua" && selectedCity2.toLowerCase() !== "semua") {
                        Swal.fire({
                          title: "Perhatian!",
                          text: "Kolom Kab/Kota pada Daerah 1 harus diisi karena tidak memungkinkan perbandingan antara provinsi dan kabupaten.",
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
                        return;
                      }
                      if (selectedCity.toLowerCase() !== "semua" && selectedCity2.toLowerCase() === "semua") {
                        Swal.fire({
                          title: "Perhatian!",
                          text: "Kolom Kab/Kota pada Daerah 2 harus diisi karena tidak memungkinkan perbandingan antara provinsi dan kabupaten.",
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
                        return;
                      }
                      if (selectedCity.toLowerCase() === "semua" && selectedCity2.toLowerCase() !== "semua") {
                        Swal.fire({
                          title: "Perhatian!",
                          text: "Kolom Kab/Kota pada Daerah 1 harus diisi karena tidak memungkinkan perbandingan antara provinsi dan kabupaten.",
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
                        return;
                      }
                      document.getElementById("dataset1").classList.add("hidden");
                      document.getElementById("dataset2").classList.remove("hidden");
                      if (document.getElementById(`ds1_all_${IDchildFilter}`) !== null) {
                        if (!document.getElementById(`ds1_all_${IDchildFilter}`).checked) {
                          getDataSet1();
                        } else {
                          setDataSet1("semua");
                          sessionStorage.setItem("all_ds_1", "semua");
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
                    DATASET 2
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center mt-4 ">
                <button
                  onClick={() => {
                    // Tampilkan pesan bahwa provinsi harus dipilih terlebih dahulu
                    Swal.fire({
                      title: "Perhatian!",
                      text: "Anda harus memilih Daerah 2 terlebih dahulu.",
                      confirmButtonText: "Tutup",
                      confirmButtonColor: "#24445A",
                      customClass: {
                        title: "title-icon-errorr",
                        text: "text-icon",
                        confirmButton: "confirm-icon",
                        cancelButton: "cancel-icon",
                      },
                    });
                  }}
                  className="bg-secondary text-white px-4 py-2 rounded-md"
                >
                  Dataset 1
                </button>
              </div>
            )}
          </div>
        </div>
        {/* DROPDOWN DATASET 2 */}
        <div id="dataset2" className="hidden gap-[100px] mt-[40px] h-auto">
          <div>
            <div className="flex flex-row items-center justify-center gap-x-5 mt-5 xl:mr-[100px] lg:mr-[100px] md:mr-[80px] mr-[60px]">
              <button
                onClick={() => {
                  setIsDataset2Clicked(false);
                  // handleClick();
                  document.getElementById("dataset2").classList.add("hidden");
                  document.getElementById("dataset1").classList.remove("hidden");
                  loadHistoryDataset1();
                }}
                className="relative mt-[-10px] lg:mt-0"
              >
                <img src={back} alt="" className="md:w-[30px] w-[28px] lg:w-[36px] transition-transform duration-300 transform hover:scale-110" />
              </button>

              <h1 className="text-secondary text-[14px] font-semibold mt-[-6px] lg:mt-0">DATASET 2</h1>
            </div>

            <div className="relative flex flex-col items-center">
              <div className="lg:w-[250px] w-[200px] h-auto rounded-[10px] text-white border-1 border-[f1f1f1] text-[14px] font-medium drop-shadow-lg mt-[10px] mb-[10px] cursor-pointer ">
                <div
                  onClick={() => {
                    if (selectedCity.toLowerCase() !== "semua" && selectedCity2.toLowerCase() === "semua") {
                      Swal.fire({
                        title: "Perhatian!",
                        text: "Kolom Kab/Kota pada Daerah 2 harus diisi karena tidak memungkinkan perbandingan antara provinsi dan kabupaten.",
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
                      return;
                    }

                    if (selectedCity.toLowerCase() === "semua" && selectedCity2.toLowerCase() !== "semua") {
                      Swal.fire({
                        title: "Perhatian!",
                        text: "Kolom Kab/Kota pada Wilayah 1 harus diisi karena tidak memungkinkan perbandingan antara provinsi dan kabupaten.",
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
                      return;
                    }
                    handleParentClick2();
                    resetSelectFilter2(selectedSelectFilter2);
                  }}
                  className="bg-secondary w-full p-2 px-[20px] flex items-center justify-between rounded-[10px]"
                >
                  {selectedParents2 ? (selectedParents2?.length > 20 ? selectedParents2?.substring(0, 20) + "..." : selectedParents2) : "Pilih"}
                  <FontAwesomeIcon icon={faChevronDown} color="white" className={`ml-[20px] w-[10px] h-[20px] ${openParents2 && "rotate-180"}`} />
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
                      document.getElementById("anakanparent2").classList.add("hidden");
                      document.getElementById("anakanfilter2").classList.add("hidden");
                    }}
                  >
                    Pilih
                  </li>
                  {parents2?.map((parentnya) => (
                    <li
                      key={parentnya?.id}
                      id={`ds2_parent_${parentnya.id}`}
                      className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-center`}
                      onClick={() => {
                        updateParents2(parentnya.nama, selectedParents2, parentnya.id, isProvince);
                        sessionStorage.setItem("idParent", parentnya.id);
                        sessionStorage.setItem("namaParent", parentnya.nama);
                        sessionStorage.setItem("namaParent2", parentnya.nama);
                        setIdParent2(parentnya.id);
                        if (parentnya.id !== null) {
                          document.getElementById("anakanparent2").classList.remove("hidden");
                        }
                      }}
                    >
                      {parentnya?.nama}
                    </li>
                  ))}
                </ul>
                {/* DROPDOWN ANAKAN PARENT */}
                <div
                  id="anakanparent2"
                  className="hidden lg:w-[250px] w-[200px] h-auto rounded-[10px] text-white border-1 border-[f1f1f1] text-[14px] font-medium items-center justify-center drop-shadow-lg mt-[10px] mb-[10px] cursor-pointer"
                >
                  <div
                    onClick={() => {
                      resetSelectFilter2(null);
                      setOpenSelectFilter2(!openSelectFilter2);
                      //untuk unchecklist pilihan semua
                      var targetSemua = document.getElementById("dataset2").getElementsByClassName("semuaDataSet");
                      for (var i = 0; i < targetSemua.length; i++) {
                        targetSemua[i].checked = false;
                      }
                    }}
                    className="bg-third w-full p-2 px-[20px] flex items-center justify-between rounded-[10px]"
                  >
                    {selectedSelectFilter2 ? (selectedSelectFilter2?.length > 20 ? selectedSelectFilter2?.substring(0, 20) + "..." : selectedSelectFilter2) : "Pilih"}
                    <FontAwesomeIcon icon={faChevronDown} color="white" className={`ml-[20px] w-[10px] h-[20px] ${openSelectFilter2 && "rotate-180"}`} />
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
                        document.getElementById("anakanparent2").classList.add("hidden");
                        document.getElementById("anakanfilter2").classList.add("hidden");
                      }}
                    >
                      Pilih
                    </li>
                    {selectFilter2?.map((filternya) => (
                      <li
                        key={filternya?.id}
                        id={`ds2_child_${filternya.id}`}
                        className={`p-2 text-[12px] hover:bg-[#a4b6b9] hover:text-secondary rounded-[10px] text-center`}
                        onClick={() => {
                          updateSelectFilter2(filternya.nama, selectedSelectFilter2, idParent2, filternya.id);
                          setIDChildFilter2(filternya.id);
                          var label = [];
                          label[filternya.id] = filternya.nama;
                          setLabelSet2(label);
                          sessionStorage.setItem("namaFilter2Berkaca", filternya.nama);
                          if (filternya.id !== null) {
                            document.getElementById("anakanfilter2").classList.remove("hidden");
                          }

                          //untuk unchecklist pilihan semua
                          var targetSemua = document.getElementById("dataset2").getElementsByClassName("semuaDataSet");
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
                        index == 0 && allOptions.indexOf(anaknyafilter2.id_parent) >= 0 ? (
                          <>
                            <div className="flex justify-between">
                              <div className="flex items-center">
                                <input type="checkbox" id={`ds2_all_${anaknyafilter2.id_parent}`} class="semuaDataSet" onClick={(e) => allCondition(e.target, 2, `ds2_all_${anaknyafilter2.id_parent}`)} />
                                <label className="ml-[5px]">Semua</label>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <ItemDropdown anaknyafilter={anaknyafilter2} dropside={2} indexed={index} />
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col">
                            <ItemDropdown anaknyafilter={anaknyafilter2} dropside={2} indexed={index} />
                          </div>
                        )
                      )
                    ) : (
                      <p>Data sedang di proses</p>
                    )}
                    {/* <TampilanDataSet2/> */}
                    <div></div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (selectedCity.toLowerCase() !== "semua" && selectedCity2.toLowerCase() === "semua") {
                      Swal.fire({
                        title: "Perhatian!",
                        text: "Kolom Kab/Kota pada Daerah 2 harus diisi karena tidak memungkinkan perbandingan antara provinsi dan kabupaten.",
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
                      return;
                    }
                    if (selectedCity.toLowerCase() === "semua" && selectedCity2.toLowerCase() !== "semua") {
                      Swal.fire({
                        title: "Perhatian!",
                        text: "Kolom Kab/Kota pada Daerah 2 harus diisi karena tidak memungkinkan perbandingan antara provinsi dan kabupaten.",
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
                      return;
                    }
                    const dataset2 = document.getElementById("dataset2");
                    const selectedElements2 = dataset2.querySelectorAll('input[type="checkbox"]:checked');
                    if (selectedElements2.length === 0) {
                      Swal.fire({
                        title: "Perhatian!",
                        text: "Anda harus memilih setidaknya satu pilihan dari dataset.",
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
                      return;
                    }
                    document.getElementById("dataset2").classList.add("hidden");

                    if (document.getElementById(`ds2_all_${IDchildFilter2}`) !== null) {
                      if (!document.getElementById(`ds2_all_${IDchildFilter2}`).checked) {
                        getDataSet2();
                      } else {
                        setDataSet2("semua");
                        var live_data = JSON.parse(sessionStorage.getItem("selectedDataBerkaca"));
                        sessionStorage.setItem("all_ds_2", "semua");
                        sessionStorage.setItem(
                          "selectedDataBerkaca",
                          JSON.stringify({
                            ds1_parent: idParent,
                            ds1_child: IDchildFilter,
                            parent_id_1Berkaca: IDchildFilter,
                            dataset_1Berkaca: dataSet1.length === 0 ? live_data?.dataset_1Berkaca || [] : dataSet1,
                            all_ds1_set: ds1_set.length === 0 ? live_data?.all_ds1_set || [] : ds1_set,
                            ds2_parent: idParent2,
                            ds2_child: IDchildFilter2,
                            parent_id_2Berkaca: IDchildFilter2,
                            dataset_2Berkaca: "semua",
                            labelset1: labelSet1.length === 0 ? live_data?.labelset1 || [] : labelSet1,
                            labelset2: labelSet2,
                            namachild: selectedSelectFilter,
                            grafikTimeseries: dataChart,
                            grafikTimeseries2: dataChart2,
                            LabelnyaTimeseries_1: labelSet1.length === 0 ? live_data?.LabelnyaTimeseries_1 || [] : labelSet1,
                            LabelnyaTimeseries_2: labelSet2,
                          })
                        );
                      }
                    } else {
                      getDataSet2();
                    }
                    window.location.href = "/Berkaca-Grafik-PieChart";
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
                  PROSES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Berkacamain;
