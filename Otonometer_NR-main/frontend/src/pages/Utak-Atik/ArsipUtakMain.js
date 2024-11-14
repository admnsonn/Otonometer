import React, { useState, useEffect } from "react";
import map from "../../assets/icons/peta.png";
import people from "../../assets/icons/people.png";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import back from "../../assets/back.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faL,
  faFilePdf,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import bulat from "../../assets/circ.svg";
import "../../style/Components.css";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
  LineChart,
  Line,
} from "recharts";
import "../../components/Grafik/Timeseries";
import { element, func, object } from "prop-types";
import Swal from "sweetalert2";

const Utakmain = () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const tokenUser = sessionStorage.getItem("token");
  useEffect(() => {
    if (
      sessionStorage.getItem("token") == null ||
      sessionStorage.getItem("token") == ""
    ) {
      return (window.location.href = "http://localhost:3000");
    }
  }, [sessionStorage.getItem("token")]);

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
    const selectedYearBack = sessionStorage.getItem("yearss");
    if (selectedYearBack) {
      setSelectedYears(selectedYearBack);
    }
  }, [sessionStorage.getItem("yearss")]);

  ///DROPDOWN PROVINSI
  const [provincess, setProvinces] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(
    sessionStorage.getItem("namaprovinsi")
  );
  const [openProvinsi, setOpenProvinsi] = useState(false);
  const [getInfoProvinsi, setGetInfoProvinsi] = useState(null);
  const [wilayahID, setWilayahID] = useState(null);
  const [isProvince, setIsProvince] = useState();

  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API + "/provinces")
      .then((response) => response.json())
      .then((data) => {
        if (
          sessionStorage.getItem("idprovinsi") === null &&
          sessionStorage.getItem("namaprovinsi") === null
        ) {
          sessionStorage.setItem("idwilayah", data.data[0].id);
          setProvinces(data.data);
          sessionStorage.setItem("idprovinsi", data.data[0].id);
          sessionStorage.setItem("namaprovinsi", data.data[0].nama);
          updateKota(
            sessionStorage.getItem("namaprovinsi"),
            selected,
            sessionStorage.getItem("idprovinsi")
          );
          updatePeta(sessionStorage.getItem("idprovinsi"));
          sessionStorage.setItem("namawilayah", "Semua");
          setInfoDaerah("Semua");
          setSelectedCity("Semua");
          setDataranicon("Semua");
          setIsProvince(true);

          sessionStorage.setItem("namakota", "Semua");
          sessionStorage.setItem(
            "idkota",
            sessionStorage.getItem("idprovinsi")
          );
          setGetInfoProvinsi(sessionStorage.getItem("idprovinsi"));
          setWilayahID(sessionStorage.getItem("idprovinsi"));
          provinsi = sessionStorage.getItem("idprovinsi");
          wilayah = sessionStorage.getItem("idprovinsi");
          setSelectedYears(sessionStorage.getItem("yearss"));
          console.log("idwilayah", data.data[0].id);
        } else {
          setProvinces(data.data);
        }
      });
  }, []);

  ///DROPDOWN KOTA
  const [cities, setCity] = useState(null);
  const [inputValueofCity, setInputValueofCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(
    sessionStorage.getItem("namakota")
  );
  const [openCity, setOpenCity] = useState(false);

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

  function updatePeta(wilayah_id) {
    fetch(
      process.env.REACT_APP_URL_API +
        "/wilayah-info?lang=id&wilayah_id=" +
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
            "https://storage.googleapis.com/otonometer-bucket/infografis/655fb32670807.icon_geo_dattinggi.png"
          );
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

  useEffect(() => {
    if (sessionStorage.getItem("idkota") !== null) {
      updatePeta(sessionStorage.getItem("idkota"));
    }
  }, []);

  ///DATASET1
  const [idParent, setIdParent] = useState();
  const [parents, setParents] = useState(null);
  const [openParents, setOpenParents] = useState(false);
  const [selectedParents, setSelectedParents] = useState("");

  function clickElement(target) {
    try {
      document.getElementById(target).click();
      console.log("berhasil mengclick => ", document.getElementById(target));
    } catch (error) {
      clickElement(target);
    }
  }
  useEffect(() => {
    fetch(process.env.REACT_APP_URL_API + "/filter-parent?lang=en")
      .then((response) => response.json())
      .then((data) => {
        setParents(data.data);
        // if (sessionStorage.getItem("selectedData") != null) {
        //   console.log("data terload");
        //   var live_data = JSON.parse(sessionStorage.getItem("selectedData"));
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
        if (sessionStorage.getItem("selectedData") != null) {
          var live_data = JSON.parse(sessionStorage.getItem("selectedData"));
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

    fetch(
      process.env.REACT_APP_URL_API +
        "/filter-select?parent_id=" +
        id +
        "&lang=en"
    )
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
        });
        setSelectFilter(data);
        setLabelSet1([]);
      });
  }

  useEffect(() => {
    if (selectFilter != null && selectFilter != "") {
      if (selectFilter.length > 0) {
        if (sessionStorage.getItem("selectedData") != null) {
          var live_data = JSON.parse(sessionStorage.getItem("selectedData"));
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

    fetch(
      process.env.REACT_APP_URL_API +
        "/filter-child?satuan_id=" +
        idanak +
        "&lang=en&parent_id=" +
        idbunda
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
  useEffect(() => {}, [dataSet1]);

  useEffect(() => {}, [labelSet1]);
  useEffect(() => {}, [labelSet2]);
  const [ds1_set, setds1_set] = useState([]);

  function getDataSet1() {
    var dataset = [];
    var labels = [];
    var all_ds1 = [];
    var list = document
      .getElementById("dataset1")
      .getElementsByClassName("isSet");
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
        // if (sessionStorage.getItem("selectedData") != null) {
        //   console.log("data terload");
        //   var live_data = JSON.parse(sessionStorage.getItem("selectedData"));
        //   data.data.forEach((item) => {
        //     if (item.id == live_data.ds2_parent) {
        //       console.log(
        //         document.getElementById("ds2_parent_" + live_data.ds2_parent)
        //       );
        //       updateParents2(item.nama, selectedParents2, item.id, isProvince);
        //       document
        //         .getElementById("anakanparent2")
        //         .classList.remove("hidden");
        //       // try {
        //       //   document
        //       //     .getElementById("ds2_child_" + live_data.ds2_child)
        //       //     .click();
        //       // } catch (error) {
        //       //   console.log("error ds 2:", error.message);
        //       // }
        //       document.getElementById("dataset1").classList.add("hidden");
        //       document.getElementById("dataset2").classList.remove("hidden");
        //     }
        //   });
        // } else {
        //   console.log("data tidak terload atau tidak ada");
        // }
      });
  }, []);

  useEffect(() => {
    if (parents2 != null && parents2 != "") {
      if (parents2.length > 0) {
        if (sessionStorage.getItem("selectedData") != null) {
          var live_data = JSON.parse(sessionStorage.getItem("selectedData"));
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

    fetch(
      process.env.REACT_APP_URL_API +
        "/filter-select?parent_id=" +
        id +
        "&lang=en"
    )
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
        });
        setSelectFilter2(data);
      });
  }

  useEffect(() => {
    if (selectFilter2 != null && selectFilter2 != "") {
      if (selectFilter2.length > 0) {
        if (sessionStorage.getItem("selectedData") != null) {
          var live_data = JSON.parse(sessionStorage.getItem("selectedData"));
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
    fetch(
      process.env.REACT_APP_URL_API +
        "/filter-child?satuan_id=" +
        idanak +
        "&lang=en&parent_id=" +
        idbunda
    )
      .then((response) => response.json())
      .then((data) => {
        setChildFilter2(data.data);
      });
  }
  const [dataChart, setDataChart] = useState([]);
  const [dataSet2, setDataSet2] = useState([]);
  var allOptions = [4, 132, 196, 214];
  useEffect(() => {}, [dataSet2]);

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
  };
  function getDataSet2() {
    var dataset = [];
    var all_ds2 = [];
    var labels = [];
    var list = document
      .getElementById("dataset2")
      .getElementsByClassName("isSet");

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
    var live_data = JSON.parse(sessionStorage.getItem("selectedData"));
    sessionStorage.setItem(
      "selectedData",
      JSON.stringify({
        ds1_parent: idParent,
        ds1_child: IDchildFilter,
        parent_id_1: IDchildFilter,
        dataset_1: dataSet1.length == 0 ? live_data.dataset_1 : dataSet1,
        all_ds1_set: ds1_set.length == 0 ? live_data.all_ds1_set : ds1_set,
        ds2_parent: idParent2,
        ds2_child: IDchildFilter2,
        parent_id_2: IDchildFilter2,
        dataset_2: dataset,
        all_ds2_set: all_ds2,
        labelset1: labelSet1.length == 0 ? live_data.labelset1 : labelSet1,
        labelset2: labels,
        namachild: selectedSelectFilter,
        grafikTimeseries: dataChart,
        grafikTimeseries2: dataChart2,
        sumberTimeSeries: sumbernya,
        LabelnyaTimeseries_1:
          labelSet1.length == 0 ? live_data.LabelnyaTimeseries_1 : labelSet1,
        LabelnyaTimeseries_2: labels,
      })
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
    }
    useEffect(() => {
      fetch(
        process.env.REACT_APP_URL_API +
          `/filter-child?satuan_id=1&lang=en&parent_id=${anaknyafilter.id}`
      )
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
          });
          setChildrend(list);
        });
    }, []);

    useEffect(() => {
      if (sessionStorage.getItem("selectedData") != null) {
        var live_data = JSON.parse(sessionStorage.getItem("selectedData"));
        if (dropside == 1) {
          if (live_data.dataset_1 == "semua") {
            console.log(
              document.getElementById("ds1_all_" + live_data.ds1_child)
            );
            try {
              document.getElementById("ds1_all_" + live_data.ds1_child).click();
            } catch (error) {}
          } else {
            //${dropside}_checkbox_${anaknyafilter?.id}
            var found = live_data.all_ds1_set.indexOf("" + anaknyafilter.id);
            if (found >= 0) {
              console.log(found);
              document.getElementById(
                "1_checkbox_" + anaknyafilter.id
              ).checked = true;
              showChildren(
                document.getElementById("1_checkbox_" + anaknyafilter.id),
                `children_${anaknyafilter?.id}`,
                anaknyafilter?.id,
                menu
              );
              var label = labelSet1;
              label[anaknyafilter?.id] = anaknyafilter?.nama;
              setLabelSet1(label)
              console.log(
                document.getElementById("1_checkbox_" + anaknyafilter.id)
              );
            }
          }
        }
        if (dropside == 2) {
          if (live_data.dataset_2 == "semua") {
            console.log(
              document.getElementById("ds2_all_" + live_data.ds2_child)
            );
            try {
              document.getElementById("ds2_all_" + live_data.ds2_child).click();
            } catch (error) {}
          } else {
            var found = live_data.all_ds2_set.indexOf("" + anaknyafilter.id);
            if (found >= 0) {
              console.log(found);
              document.getElementById(
                "2_checkbox_" + anaknyafilter.id
              ).checked = true;
              showChildren(
                document.getElementById("2_checkbox_" + anaknyafilter.id),
                `children_${anaknyafilter?.id}`,
                anaknyafilter?.id,
                menu
              );
              
              console.log(
                document.getElementById("2_checkbox_" + anaknyafilter.id)
              );
            }
          }
        }
      }
    }, []);

    function showChildren(elm, target, id, menu = []) {
      if (elm.checked) {
        setViewChildren(true);
        if (elm.id === "1_checkbox_24" || elm.id === "2_checkbox_24") {
          popUpRetribusi();
        }

        if (menu.length > 0) {
          menu[0].forEach((item) => {
            document.getElementById(`${dropside}_checkbox_${item}`).checked =
              menu[1];
            document.getElementById(
              `${dropside}_checkbox_${item}`
            ).disabled = true;
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
                `${dropside}_checkbox_${menu[2][index]}`
              ).checked;
              index++;
            }

            if (status) {
              document.getElementById(`${dropside}_checkbox_${item}`).checked =
                menu[1];
              document.getElementById(
                `${dropside}_checkbox_${item}`
              ).disabled = true;
            } else {
              document.getElementById(`${dropside}_checkbox_${item}`).checked =
                menu[1];
              document.getElementById(
                `${dropside}_checkbox_${item}`
              ).disabled = false;
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
                  menu
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
        for (var i = 0; i < element.length; i++) {
          element[i].checked = false;
          element[i].disabled = false;
        }
      } else {
        //dataset 2
        var element = document
          .getElementById("dataset2")
          .getElementsByClassName("anakan");
        for (var i = 0; i < element.length; i++) {
          element[i].checked = false;
          element[i].disabled = false;
        }
      }
    }
  }

  const [sumbernya, setSumbernya] = useState("");

  // useEffect(() => {
  //   if (dataSet1.length === 0 && dataSet2.length === 0 && wilayahID === null) {
  //     return;
  //   }
  //   var urls = "https://api.otonometer.neracaruang.com/api/utak-atik?tahun=semua&wilayah="+wilayahID;
  //   if(typeof dataSet1 !== 'string'){
  //     urls += "&parent_id_1="+IDchildFilter+"&dataset_1=["+dataSet1+"]"
  //   }else{
  //     urls += "&parent_id_1="+IDchildFilter+"&dataset_1="+dataSet1
  //   }

  //   if(typeof dataSet2 !== 'string'){
  //     urls += "&parent_id_2="+IDchildFilter2+"&dataset_2=["+dataSet2+"]"
  //   }else {
  //     urls += "&parent_id_2="+IDchildFilter2+"&dataset_2="+dataSet2
  //   }
  //   fetch(urls)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       var datasheet1 = [];
  //       var tahun = [];
  //       var datasheet2 = [];
  //       var tahun2 = [];
  //       var minimumTahun = 2019;
  //       var maksimumTahun = 2022;
  //       Object.keys(data.data.dataset_1).forEach(item =>{
  //         data.data.dataset_1[item].forEach(list =>{
  //           if(tahun[""+list.label] == null){
  //             var lokalData = list;
  //             lokalData[
  //               labelSet1[list.id_bidang]
  //             ] = lokalData.value
  //             tahun[""+list.label] = lokalData
  //           }else {
  //             var lokalData = tahun[""+list.label];
  //             lokalData[
  //               labelSet1[list.id_bidang]
  //             ] = list.value
  //             tahun[""+list.label] = lokalData
  //           }
  //         })
  //       })
  //       Object.keys(tahun).forEach(item => {
  //         if(item >= minimumTahun && item <= maksimumTahun){
  //           datasheet1.push(tahun[item])
  //         }
  //       })

  //       Object.keys(data.data.dataset_2).forEach(item =>{
  //         data.data.dataset_2[item].forEach(list =>{
  //           if(tahun2[""+list.label] == null){
  //             var lokalData = list;
  //             lokalData[
  //               labelSet2[list.id_bidang]
  //             ] = lokalData.value
  //             tahun2[""+list.label] = lokalData
  //           }else {
  //             var lokalData = tahun2[""+list.label];
  //             lokalData[
  //               labelSet2[list.id_bidang]
  //             ] = list.value
  //             tahun2[""+list.label] = lokalData
  //           }
  //         })
  //       })
  //       Object.keys(tahun2).forEach(item => {
  //         datasheet2.push(tahun2[item])
  //       })
  //       setDataChart(datasheet1);
  //       setDataChart2(datasheet2);
  //       setSumbernya(data.sumber)
  //     })
  //     .catch((error) => {
  //     });
  // }, [wilayahID, IDchildFilter, dataSet1, IDchildFilter2, dataSet2]);
  // function Timeseries() {
  //   var strokeD1 = ['#DF7200', '#FF8D16', '#FFD04C', '#86C81A', '#299B68', '#740589', '#4AB887', '#398B90', '#2B6D6D', '#28577D','#487FAC', '#6E5BAD', '#9674C2', '#7D6284', '#545674', '#4B3657', '#3B2723', '#623626', '#894A33', '#A84520',
  //   '#D15737', '#FF6C35', '#FE9273', '#B97286', '#895273', '#545674', '#2F5F98', '#2D8BBA', '#41B8D5', '#94DEFF']
  //   var fillD1 = ['#DF7200', '#FF8D16', '#FFD04C', '#86C81A', '#299B68', '#740589', '#4AB887', '#398B90', '#2B6D6D', '#28577D','#487FAC', '#6E5BAD', '#9674C2', '#7D6284', '#545674', '#4B3657', '#3B2723', '#623626', '#894A33', '#A84520',
  //   '#D15737', '#FF6C35', '#FE9273', '#B97286', '#895273', '#545674', '#2F5F98', '#2D8BBA', '#41B8D5', '#94DEFF']
  //   var idLineD1 = ['DF7200', 'FF8D16', 'FFD04C', '86C81A', '299B68', '740589', '4AB887', '398B90', '2B6D6D', '28577D','487FAC', '6E5BAD', '9674C2', '7D6284', '545674', '4B3657', '3B2723', '623626', '894A33', 'A84520',
  //   'D15737', 'FF6C35', 'FE9273', 'B97286', '895273', '545674', '2F5F98', '2D8BBA', '41B8D5', '94DEFF']
  //   var start = 0
  //   return (
  //     <section className="w-full gap-x-[30px] mt-[40px]">
  //       <div className="flex gap-x-[30px]">
  //         <div className="flex bg-white w-[650px] h-[450px] text-secondary rounded-[25px] grappp">
  //           <div className="w-full h-[350px] mt-[90px] mx-[20px] overflow-y-auto mini-scrollbar">
  //             {dataChart && dataChart.length > 0 && (
  //               <AreaChart data={dataChart} width={600} height={300}>
  //                 <defs>
  //                 {labelSet1.map((grafiknya, index) => (
  //                 <linearGradient id={idLineD1[index]} x1="0" y1="0" x2="0" y2="1">
  //                   <stop offset="5%" stopColor={fillD1[index]} stopOpacity={0.8} />
  //                   <stop offset="100%" stopColor={fillD1[index]} stopOpacity={0} />
  //                 </linearGradient>
  //                 ))}
  //                 </defs>
  //                 <XAxis dataKey="label" tick={{ fontSize: 12 }} />
  //                 <YAxis />
  //                 <CartesianGrid
  //                   strokeDasharray="0"
  //                   horizontalCoordinatesGenerator={(props) =>
  //                     (props.width = 150)
  //                   }
  //                 />
  //                 <Tooltip />
  //                 {labelSet1.map((grafiknya, index) => (
  //                   <Area
  //                     type="monotone"
  //                     dataKey={grafiknya}
  //                     stroke={strokeD1[index]}
  //                     fillOpacity={1}
  //                     fill={fillD1[index]}
  //                     layout="vertical"
  //                     dot={{ r: 3 }}
  //                     label="labelData"
  //                   />
  //                 ))}
  //                 <Legend
  //                   iconType="circle"
  //                   layout="vertical"
  //                   iconSize={10}
  //                   wrapperStyle={{ fontSize: "12px" }}
  //                 />
  //               </AreaChart>
  //             )}
  //           </div>
  //         </div>
  //         <div className="flex bg-white w-[650px] h-[450px] text-secondary rounded-[25px] grappp">
  //           <div className="w-full h-[350px] mt-[90px] mx-[20px] overflow-y-auto mini-scrollbar">
  //             {dataChart2 && dataChart2.length > 0 && (
  //               <AreaChart data={dataChart2} width={600} height={300}>
  //                 <defs>
  //                   <linearGradient id="740589" x1="0" y1="0" x2="0" y2="1">
  //                     <stop offset="5%" stopColor="#740589" stopOpacity={0.8} />
  //                     <stop offset="100%" stopColor="#740589" stopOpacity={0} />
  //                   </linearGradient>
  //                   <linearGradient id="8E5B9F" x1="0" y1="0" x2="0" y2="1">
  //                     <stop offset="5%" stopColor="#8E5B9F" stopOpacity={0.8} />
  //                     <stop offset="100%" stopColor="#8E5B9F" stopOpacity={0} />
  //                   </linearGradient>
  //                   <linearGradient id="9465CB" x1="0" y1="0" x2="0" y2="1">
  //                     <stop offset="5%" stopColor="#9465CB" stopOpacity={0.8} />
  //                     <stop offset="100%" stopColor="#9465CB" stopOpacity={0} />
  //                   </linearGradient>
  //                   <linearGradient id="AA9EFF" x1="0" y1="0" x2="0" y2="1">
  //                     <stop offset="5%" stopColor="#AA9EFF" stopOpacity={0.8} />
  //                     <stop offset="100%" stopColor="#AA9EFF" stopOpacity={0} />
  //                   </linearGradient>
  //                   <linearGradient id="C7BFFF" x1="0" y1="0" x2="0" y2="1">
  //                     <stop offset="5%" stopColor="#C7BFFF" stopOpacity={0.8} />
  //                     <stop offset="100%" stopColor="#C7BFFF" stopOpacity={0} />
  //                   </linearGradient>
  //                   <linearGradient id="740589" x1="0" y1="0" x2="0" y2="1">
  //                     <stop offset="5%" stopColor="#740589" stopOpacity={0.8} />
  //                     <stop offset="100%" stopColor="#740589" stopOpacity={0} />
  //                   </linearGradient>
  //                   <linearGradient id="8E5B9F" x1="0" y1="0" x2="0" y2="1">
  //                     <stop offset="5%" stopColor="#8E5B9F" stopOpacity={0.8} />
  //                     <stop offset="100%" stopColor="#8E5B9F" stopOpacity={0} />
  //                   </linearGradient>
  //                   <linearGradient id="9465CB" x1="0" y1="0" x2="0" y2="1">
  //                     <stop offset="5%" stopColor="#9465CB" stopOpacity={0.8} />
  //                     <stop offset="100%" stopColor="#9465CB" stopOpacity={0} />
  //                   </linearGradient>
  //                   <linearGradient id="AA9EFF" x1="0" y1="0" x2="0" y2="1">
  //                     <stop offset="5%" stopColor="#AA9EFF" stopOpacity={0.8} />
  //                     <stop offset="100%" stopColor="#AA9EFF" stopOpacity={0} />
  //                   </linearGradient>
  //                   <linearGradient id="C7BFFF" x1="0" y1="0" x2="0" y2="1">
  //                     <stop offset="5%" stopColor="#C7BFFF" stopOpacity={0.8} />
  //                     <stop offset="100%" stopColor="#C7BFFF" stopOpacity={0} />
  //                   </linearGradient>
  //                 </defs>
  //                 <XAxis dataKey="label" tick={{ fontSize: 12 }} />
  //                 <YAxis />
  //                 <CartesianGrid
  //                   strokeDasharray="0"
  //                   horizontalCoordinatesGenerator={(props) =>
  //                     (props.width = 150)
  //                   }
  //                 />
  //                 <Tooltip />
  //                 {labelSet2.map((grafiknya, index) => (
  //                   <Area
  //                     type="monotone"
  //                     dataKey={grafiknya}
  //                     stroke={
  //                       index % 10 === 0
  //                         ? "#740589"
  //                         : index % 10 === 1
  //                         ? "#8E5B9F"
  //                         : index % 10 === 2
  //                         ? "#9465CB"
  //                         : index % 10 === 3
  //                         ? "#AA9EFF"
  //                         : index % 10 === 4
  //                         ? "#C7BFFF"
  //                         : index % 10 === 5
  //                         ? "#740589"
  //                         : index % 10 === 6
  //                         ? "#8E5B9F"
  //                         : index % 10 === 7
  //                         ? "#9465CB"
  //                         : index % 10 === 8
  //                         ? "#AA9EFF"
  //                         : index % 10 === 9
  //                         ? "#C7BFFF"
  //                         : null
  //                     }
  //                     fillOpacity={1}
  //                     fill={
  //                       index % 10 === 0
  //                         ? "url(#740589)"
  //                         : index % 10 === 1
  //                         ? "url(#8E5B9F)"
  //                         : index % 10 === 2
  //                         ? "url(#9465CB)"
  //                         : index % 10 === 3
  //                         ? "url(#AA9EFF)"
  //                         : index % 10 === 4
  //                         ? "url(#C7BFFF)"
  //                         : index % 10 === 5
  //                         ? "url(#740589)"
  //                         : index % 10 === 6
  //                         ? "url(#8E5B9F)"
  //                         : index % 10 === 7
  //                         ? "url(#9465CB)"
  //                         : index % 10 === 8
  //                         ? "url(#AA9EFF)"
  //                         : index % 10 === 9
  //                         ? "url(#C7BFFF)"
  //                         : null
  //                     }
  //                     layout="vertical"
  //                     dot={{ r: 3 }}
  //                     label="labelData"
  //                   />
  //                 ))}
  //                 <Legend
  //                   iconType="circle"
  //                   layout="vertical"
  //                   iconSize={10}
  //                   wrapperStyle={{ fontSize: "12px" }}
  //                 />
  //               </AreaChart>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //       <div className="text-center italic mt-[30px] text-secondary">
  //         <span>Sumber: </span>
  //         {sumbernya}
  //       </div>
  //     </section>
  //   );
  // }
  // function Timeseries(){
  //   return (
  //     <section className='w-full gap-x-[30px] mt-[40px]'>
  //       <div className="flex gap-x-[30px]">
  //       <div className='flex bg-white w-[650px] h-[450px] text-secondary rounded-[25px] grappp'>
  //           <div className='w-full h-[350px] mt-[90px] mx-[20px] overflow-y-auto mini-scrollbar'>
  //             {dataChart && dataChart.length > 0 && (
  //               <LineChart data={dataChart}
  //               width={600}
  //               height={300}
  //             >
  //               <defs>
  //                 <linearGradient id="054B79" x1="0" y1="0" x2="0" y2="1">
  //                   {/* <stop offset="5%" stopColor="#054B79" stopOpacity={0.8}/>
  //                   <stop offset="100%" stopColor="#054B79" stopOpacity={0}/> */}
  //                 </linearGradient>
  //                 <linearGradient id="2D6A92" x1="0" y1="0" x2="0" y2="1">
  //                   {/* <stop offset="5%" stopColor="#2D6A92" stopOpacity={0.8}/>
  //                   <stop offset="100%" stopColor="#2D6A92" stopOpacity={0}/> */}
  //                 </linearGradient>
  //                 <linearGradient id="2D8BBA" x1="0" y1="0" x2="0" y2="1">
  //                   <stop offset="5%" stopColor="#2D8BBA" stopOpacity={0.8}/>
  //                   <stop offset="100%" stopColor="#2D8BBA" stopOpacity={0}/>
  //                 </linearGradient>
  //                 <linearGradient id="72B5D8" x1="0" y1="0" x2="0" y2="1">
  //                   <stop offset="5%" stopColor="#72B5D8" stopOpacity={0.8}/>
  //                   <stop offset="100%" stopColor="#72B5D8" stopOpacity={0}/>
  //                 </linearGradient>
  //                 <linearGradient id="94DEFF" x1="0" y1="0" x2="0" y2="1">
  //                   <stop offset="5%" stopColor="#94DEFF" stopOpacity={0.8}/>
  //                   <stop offset="100%" stopColor="#94DEFF" stopOpacity={0}/>
  //                 </linearGradient>
  //               </defs>
  //               <XAxis dataKey="label" tick={{fontSize: 12}}/>
  //               <YAxis />
  //               {/* <CartesianGrid strokeDasharray="0" horizontalCoordinatesGenerator={(props) => props.width = 150} /> */}
  //               <CartesianGrid strokeDasharray="0" />

  //               <Tooltip />
  //               {labelSet1.map((grafiknya, index) => (
  //                 <Line
  //                 strokeWidth={3}
  //                   type="monotone"
  //                   dataKey={grafiknya}
  //                   stroke={
  //                     index % 10 === 1 ? '#054B79' :
  //                     index % 10 === 2 ? '#2D6A92' :
  //                     index % 10 === 3 ? '#2D8BBA' :
  //                     index % 10 === 4 ? '#72B5D8' :
  //                     index % 10 === 5 ? '#94DEFF' :
  //                     null
  //                   }
  //                   fillOpacity={1}
  //                   fill={
  //                     index % 10 === 1 ? 'url(#054B79)' :
  //                     index % 10 === 2 ? 'url(#2D6A92)' :
  //                     index % 10 === 3 ? 'url(#2D8BBA)' :
  //                     index % 10 === 4 ? 'url(#72B5D8)' :
  //                     index % 10 === 5 ? 'url(#94DEFF)' :
  //                     null
  //                   }
  //                   layout="vertical"
  //                   dot={{ r: 3 }}
  //                   label="labelData"
  //                 />
  //               ))}
  //               <Legend iconType='circle' layout='vertical' iconSize={10} wrapperStyle={{fontSize: "12px"}}/>
  //             </LineChart>
  //             )}
  //           </div>

  //         </div>

  //         <div className='flex bg-white w-[650px] h-[450px] text-secondary rounded-[25px] grappp'>
  //         <div className='w-full h-[350px] mt-[90px] mx-[20px] overflow-y-auto mini-scrollbar'>
  //             {dataChart2 && dataChart2.length > 0 && (
  //               <AreaChart data={dataChart2}
  //               width={600}
  //               height={300}
  //             >
  //               <defs>
  //                 <linearGradient id="740589" x1="0" y1="0" x2="0" y2="1">
  //                   <stop offset="5%" stopColor="#740589" stopOpacity={0.8}/>
  //                   <stop offset="100%" stopColor="#740589" stopOpacity={0}/>
  //                 </linearGradient>
  //                 <linearGradient id="8E5B9F" x1="0" y1="0" x2="0" y2="1">
  //                   <stop offset="5%" stopColor="#8E5B9F" stopOpacity={0.8}/>
  //                   <stop offset="100%" stopColor="#8E5B9F" stopOpacity={0}/>
  //                 </linearGradient>
  //                 <linearGradient id="9465CB" x1="0" y1="0" x2="0" y2="1">
  //                   <stop offset="5%" stopColor="#9465CB" stopOpacity={0.8}/>
  //                   <stop offset="100%" stopColor="#9465CB" stopOpacity={0}/>
  //                 </linearGradient>
  //                 <linearGradient id="AA9EFF" x1="0" y1="0" x2="0" y2="1">
  //                   <stop offset="5%" stopColor="#AA9EFF" stopOpacity={0.8}/>
  //                   <stop offset="100%" stopColor="#AA9EFF" stopOpacity={0}/>
  //                 </linearGradient>
  //                 <linearGradient id="C7BFFF" x1="0" y1="0" x2="0" y2="1">
  //                   <stop offset="5%" stopColor="#C7BFFF" stopOpacity={0.8}/>
  //                   <stop offset="100%" stopColor="#C7BFFF" stopOpacity={0}/>
  //                 </linearGradient>
  //                 <linearGradient id="740589" x1="0" y1="0" x2="0" y2="1">
  //                   <stop offset="5%" stopColor="#740589" stopOpacity={0.8}/>
  //                   <stop offset="100%" stopColor="#740589" stopOpacity={0}/>
  //                 </linearGradient>
  //                 <linearGradient id="8E5B9F" x1="0" y1="0" x2="0" y2="1">
  //                   <stop offset="5%" stopColor="#8E5B9F" stopOpacity={0.8}/>
  //                   <stop offset="100%" stopColor="#8E5B9F" stopOpacity={0}/>
  //                 </linearGradient>
  //                 <linearGradient id="9465CB" x1="0" y1="0" x2="0" y2="1">
  //                   <stop offset="5%" stopColor="#9465CB" stopOpacity={0.8}/>
  //                   <stop offset="100%" stopColor="#9465CB" stopOpacity={0}/>
  //                 </linearGradient>
  //                 <linearGradient id="AA9EFF" x1="0" y1="0" x2="0" y2="1">
  //                   <stop offset="5%" stopColor="#AA9EFF" stopOpacity={0.8}/>
  //                   <stop offset="100%" stopColor="#AA9EFF" stopOpacity={0}/>
  //                 </linearGradient>
  //                 <linearGradient id="C7BFFF" x1="0" y1="0" x2="0" y2="1">
  //                   <stop offset="5%" stopColor="#C7BFFF" stopOpacity={0.8}/>
  //                   <stop offset="100%" stopColor="#C7BFFF" stopOpacity={0}/>
  //                 </linearGradient>
  //               </defs>
  //               <XAxis dataKey="label" tick={{fontSize: 12}}/>
  //               <YAxis />
  //               <CartesianGrid strokeDasharray="0" horizontalCoordinatesGenerator={(props) => props.width = 150} />
  //               <Tooltip />
  //               {labelSet2.map((grafiknya, index) => (
  //                 <Area
  //                   type="monotone"
  //                   dataKey={grafiknya}
  //                   stroke={
  //                     index % 10 === 0 ? '#740589' :
  //                     index % 10 === 1 ? '#8E5B9F' :
  //                     index % 10 === 2 ? '#9465CB' :
  //                     index % 10 === 3 ? '#AA9EFF' :
  //                     index % 10 === 4 ? '#C7BFFF' :
  //                     index % 10 === 5 ? '#740589' :
  //                     index % 10 === 6 ? '#8E5B9F' :
  //                     index % 10 === 7 ? '#9465CB' :
  //                     index % 10 === 8 ? '#AA9EFF' :
  //                     index % 10 === 9 ? '#C7BFFF' :
  //                     null
  //                   }
  //                   fillOpacity={1}
  //                   fill={
  //                     index % 10 === 0 ? 'url(#740589)' :
  //                     index % 10 === 1 ? 'url(#8E5B9F)' :
  //                     index % 10 === 2 ? 'url(#9465CB)' :
  //                     index % 10 === 3 ? 'url(#AA9EFF)' :
  //                     index % 10 === 4 ? 'url(#C7BFFF)' :
  //                     index % 10 === 5 ? 'url(#740589)' :
  //                     index % 10 === 6 ? 'url(#8E5B9F)' :
  //                     index % 10 === 7 ? 'url(#9465CB)' :
  //                     index % 10 === 8 ? 'url(#AA9EFF)' :
  //                     index % 10 === 9 ? 'url(#C7BFFF)' :
  //                     null
  //                   }
  //                   layout="vertical"
  //                   dot={{ r: 3 }}
  //                   label="labelData"
  //                 />
  //               ))}
  //               <Legend iconType='circle' layout='vertical' iconSize={10} wrapperStyle={{fontSize: "12px"}}/>
  //             </AreaChart>
  //             )}
  //           </div>
  //         </div>

  //       </div>
  //         <div className="text-center italic mt-[30px] text-secondary">
  //           <span>Sumber: </span>{sumbernya}
  //         </div>
  //     </section>
  //   )
  // }
  if (jumlahpenduduk != null) {
    var convertStringtoInt = jumlahpenduduk.replaceAll(".", "");
    var data_Penduduk = parseInt(convertStringtoInt) / 1000;
  }

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

  // useEffect(()=>{
  //   sessionStorage.removeItem("selectedData");
  // }, [])
  return (
    <div>
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
        UTAK-ATIK
      </div> */}
        <h1 className="text-secondary text-2xl text-center mt-5 mb-2 font-bold lg:text-4xl lg:mt-10 lg:mb-5 lg:text-center">
          Utak-Atik Menyajikan Insight Tanpa Batas!
        </h1>
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
                    sessionStorage.setItem("idprovinsi", provinces.id);
                    sessionStorage.setItem("namaprovinsi", provinces.nama);
                    sessionStorage.setItem("idwilayah", provinces.id);
                    setGetInfoProvinsi(provinces.id);
                    setWilayahID(provinces.id);
                    sessionStorage.setItem("namawilayah", "Semua");
                    setInfoDaerah("Semua");
                    setSelectedCity("Semua");
                    setDataranicon("Semua");
                    setSelectedYears(sessionStorage.getItem("yearss"));
                    provinsi = provinces.id;
                    wilayah = provinces.id;
                    updatePeta(provinces.id);
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
                  setInfoDaerah("Semua");
                  setSelectedCity("Semua");
                  setDataranicon("Semua");
                  setWilayahID(getInfoProvinsi);
                  sessionStorage.setItem("idwilayah", getInfoProvinsi);
                  setSelectedYears(sessionStorage.getItem("yearss"));
                  updatePeta(getInfoProvinsi);
                  setOpenCity(false);
                  setIsProvince(true);
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
                  regencies?.nama?.toLowerCase().startsWith(inputValueofCity)
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
          className="flex items-center w-[250px] lg:w-80 mb-[40px] mt-[20px]"
        />
        <div className="flex justify-between items-center gap-x-[40px] mr-[20px] lg:mr-[20px]">
          <img src={pinMap} alt="" className="flex w-6" />
          <div className="text-secondary">
            <h1 className="text-[20px] lg:text-[24px] font-bold">
              {infoDaerah}
            </h1>
            <p className="font-semibold text-[16px] lg:text-[20px]">
              {koordinatLokasi}
            </p>
          </div>
        </div>

        <div className="flex gap-[20px] mt-[40px] mb-[20px] ml-[10px] lg:gap-[50px] lg:ml-[40px]">
          <div className="text-[18px] text-secondary mt-[5px] lg:text-[20px]">
            <p className="font-bold text-right">{luaswilayah}</p>
            <p className="font-regular">km²</p>
          </div>
          <div className="flex gap-[10px]">
            <div className="hover-container">
              <img src={dataranicon} alt="" className="w-[60px] lg:w-20" />
              <span className="hover-text w-auto mb-[10px]">
                {luaswilayah}
                <span>&nbsp;km²</span>
                <p>
                  {mdpl}
                  <span>&nbsp;mdpl</span>
                </p>
                <p>{datarannama}</p>
              </span>
            </div>
            <a href="/Utak-Atik-Profil">
              <img
                src={people}
                alt=""
                className="w-[60px] lg:w-20 object-contain hover:scale-110 transform transition duration-300"
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
            <p className="font-bold text-left">
              {Math.round(data_Penduduk).toLocaleString().replaceAll(/,/g, ".")}
            </p>
            <p className="font-regular">10³ Jiwa</p>
          </div>
        </div>

        {/* DROPDOWN DATASET 1 */}
        <div id="dataset1" className="gap-[100px] mt-[40px] h-auto">
          <div>
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
                      id={`ds1_parent_${parentnya.id}`}
                      className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-center`}
                      onClick={() => {
                        updateParents(
                          parentnya.nama,
                          selectedParents,
                          parentnya.id,
                          isProvince
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
                        id={`ds1_child_${filternya.id}`}
                        className={`p-2 text-[12px] hover:bg-[#a4b6b9] hover:text-secondary rounded-[10px] text-center`}
                        onClick={() => {
                          updateSelectFilter(
                            filternya.nama,
                            selectedSelectFilter,
                            idParent,
                            filternya.id
                          );
                          setIDChildFilter(filternya.id);
                          var label = [];
                          label[filternya.id] = filternya.nama;
                          setLabelSet1(label);
                          sessionStorage.setItem("namaFilter1", filternya.nama);
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
                                      `ds1_all_${anaknyafilter.id_parent}`
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
                        )
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
                              `ds1_all_${IDchildFilter}`
                            ) !== null
                          ) {
                            if (
                              !document.getElementById(
                                `ds1_all_${IDchildFilter}`
                              ).checked
                            ) {
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
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DROPDOWN DATASET 2 */}
        <div id="dataset2" className="hidden gap-[100px] mt-[40px] h-auto">
          <div>
            <div className="flex flex-row lg:flex-row md:flex-row lg:items-center lg:justify-center lg:gap-x-5 md:gap-x-2 mt-5 lg:mt-[0px]">
              <button
                onClick={() => {
                  document.getElementById("dataset2").classList.add("hidden");
                  document
                    .getElementById("dataset1")
                    .classList.remove("hidden");
                }}
                className="lg:ml-[-110px] md:ml-[-40px] ml-[-30px] mt-[-10px] lg:mt-[0px] md:mt-[-10px] lg:mb-[5px] relative"
              >
                <img
                  src={back}
                  alt=""
                  className="md:w-[30px] w-[28px] lg:w-[36px] transition-transform duration-300 transform hover:scale-110"
                />
              </button>

              <h1 className="text-secondary text-[14px] font-semibold ml-[45px] mt-[-6px]">
                DATASET 2
              </h1>
            </div>
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
                      id={`ds2_parent_${parentnya.id}`}
                      className={`p-2 text-[12px] hover:bg-third hover:text-white rounded-[10px] text-center`}
                      onClick={() => {
                        updateParents2(
                          parentnya.nama,
                          selectedParents2,
                          parentnya.id,
                          isProvince
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
                        id={`ds2_child_${filternya.id}`}
                        className={`p-2 text-[12px] hover:bg-[#a4b6b9] hover:text-secondary rounded-[10px] text-center`}
                        onClick={() => {
                          updateSelectFilter2(
                            filternya.nama,
                            selectedSelectFilter2,
                            idParent2,
                            filternya.id
                          );
                          setIDChildFilter2(filternya.id);
                          var label = [];
                          label[filternya.id] = filternya.nama;
                          setLabelSet2(label);
                          sessionStorage.setItem("namaFilter2", filternya.nama);
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
                                      `ds2_all_${anaknyafilter2.id_parent}`
                                    )
                                  }
                                />
                                <label className="ml-[5px]">Semua</label>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <ItemDropdown
                                anaknyafilter={anaknyafilter2}
                                dropside={2}
                                indexed={index}
                              />
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col">
                            <ItemDropdown
                              anaknyafilter={anaknyafilter2}
                              dropside={2}
                              indexed={index}
                            />
                          </div>
                        )
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
                              `ds2_all_${IDchildFilter2}`
                            ) !== null
                          ) {
                            if (
                              !document.getElementById(
                                `ds2_all_${IDchildFilter2}`
                              ).checked
                            ) {
                              getDataSet2();
                            } else {
                              setDataSet2("semua");
                              var live_data = JSON.parse(
                                sessionStorage.getItem("selectedData")
                              );
                              sessionStorage.setItem("all_ds_2", "semua");
                              sessionStorage.setItem(
                                "selectedData",
                                JSON.stringify({
                                  ds1_parent: idParent,
                                  ds1_child: IDchildFilter,
                                  parent_id_1: IDchildFilter,
                                  dataset_1:
                                    dataSet1.length == 0
                                      ? live_data.dataset_1
                                      : dataSet1,
                                  all_ds1_set:
                                    ds1_set.length == 0
                                      ? live_data.all_ds1_set
                                      : ds1_set,
                                  ds2_parent: idParent2,
                                  ds2_child: IDchildFilter2,
                                  parent_id_2: IDchildFilter2,
                                  dataset_2: "semua",
                                  labelset1:
                                    labelSet1.length == 0
                                      ? live_data.labelset1
                                      : labelSet1,
                                  labelset2: labelSet2,
                                  namachild: selectedSelectFilter,
                                  grafikTimeseries: dataChart,
                                  grafikTimeseries2: dataChart2,
                                  sumberTimeSeries: sumbernya,
                                  LabelnyaTimeseries_1:
                                    labelSet1.length == 0
                                      ? live_data.LabelnyaTimeseries_1
                                      : labelSet1,
                                  LabelnyaTimeseries_2: labelSet2,
                                })
                              );
                            }
                          } else {
                            getDataSet2();
                          }
                          window.location.href = "/Utak-Atik-Grafik";
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
        {/* <div id="grafiktimeseries" className="hidden">
        {Timeseries()}
      </div> */}
        {/* <div className="mt-[100px]">
        <Timeseries/>
      </div> */}
      </div>
    </div>
  );
};

export default Utakmain;
