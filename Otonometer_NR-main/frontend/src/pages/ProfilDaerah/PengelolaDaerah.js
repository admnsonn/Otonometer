import React, { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Header/Navbar";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import back from "../../assets/back.svg";
import CardPejabat from "./cardPejabat";
import './layananPublikStyle.css';
import { NavLink, useParams } from "react-router-dom";
import { faChevronDown, faChevronLeft, faChevronRight, faClose, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLayananPublik, getListJabatanALL, getListJabatanSpesific } from "./services";

const PengelolaDaerah = () => {
  const [dataCardPimpinan, setDataCardPimpinan] = useState([])
  const [StafFunction, setStafFunction] = useState([])
  const [LineFunction, setLineFunction] = useState([])

  useEffect(()=>{
    getListJabatanALL((data)=>{
      setDataCardPimpinan(data.data)
      const lineData = data.data[0].line.filter(lineItem => lineItem);
      const staffData = data.data[0].staff.filter(staffMember => staffMember);
      // console.log(data.data[0].nama)
      // console.log(data.data)
      // console.log(data.data[0].staff.filter(staffMember => staffMember))
      setStafFunction(staffData)
      setLineFunction(lineData)
    })
  },[])
  const [openPelayananPublik, setOpenPelayananPublik] = useState(false);
  const [opsiAktif, setOpsiAktif] = useState(null);
  
  /// LAYANAN PUBLIK
  const [haveLocation, setHaveLocation] = useState();
  const [dataParentLayananPublik, setDataParentLayananPublik] = useState([])

  const tabsBoxRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollVal, setScrollVal] = useState(0);

  const handleIcons = (scrollValue) => {
    const tabsBox = tabsBoxRef.current;
    const maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;

    const leftIcon = document.getElementById("left").parentElement;
    const rightIcon = document.getElementById("right").parentElement;

    leftIcon.style.display = scrollValue <= 0 ? "none" : "flex";
    rightIcon.style.display =
    maxScrollableWidth - scrollValue <= 1 ? "none" : "flex";
  };

  useEffect(() => {
    if(openPelayananPublik == true){
      handleIcons(scrollVal);
    }else{
      setScrollVal(null);
    }
  }, [scrollVal,openPelayananPublik]);

  const handleIconClick = (direction) => {
    const tabsBox = tabsBoxRef.current;
    const newScrollVal = (tabsBox.scrollLeft += direction === "left" ? -340 : 340);
    setScrollVal(newScrollVal);
    handleIcons(newScrollVal);
  };

  const handleTabClick = (index, tab) => {
    if (opsiAktif !== tab.id) {
      const tabsBox = tabsBoxRef.current;
      const activeTab = tabsBox.querySelector(".active");

      if (activeTab) {
        activeTab.classList.remove("active");
      }

      const allTabs = tabsBox.querySelectorAll(".tab");
      allTabs[index].classList.add("active");
      setOpsiAktif(tab.id);

      // Update subLayanan and lokasiLayanan based on the selected tab
      const selectedTab = dataParentLayananPublik.find(item => item.id === tab.id);
      if (selectedTab) {
        setSubLayanan(selectedTab.sub_layanan || []);
        setLokasiLayanan(selectedTab.lokasi_layanan || []);
        setHaveLocation(selectedTab.lokasi_layanan.length > 0);
      }
    }
  };
  

  const handleMouseDown = () => setIsDragging(true);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const tabsBox = tabsBoxRef.current;
    tabsBox.classList.add("dragging");
    tabsBox.scrollLeft -= e.movementX;
    setScrollVal(tabsBox.scrollLeft);
    handleIcons(tabsBox.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const tabsBox = tabsBoxRef.current;
    tabsBox.classList.remove("dragging");
  };

  useEffect(() => {
    if(openPelayananPublik == true){
      const tabsBox = tabsBoxRef.current;
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [openPelayananPublik]);

  const [tabs, setTabs] = useState ([]);
  const [subLayanan, setSubLayanan] = useState([]);
  const [lokasiLayanan, setLokasiLayanan] = useState([]);
  const [sektor, setSektor] = useState([]);
  const [listkey, setListkey] = useState({});
  const [dropdown, setDropdown] = useState([]);
  const [bidang, setBidang] = useState(null);
  const [datasetTerpilih, setDatasetTerpilih] = useState(null);
  const [containData, setContainData] = useState("");
  const [selectedButton, setSelectedButton] = useState(null);
  const [showKeuanganDropdown, setShowKeuanganDropdown] = useState(false);
  const [openSektor, setOpenSektor] = useState(false);
  const [selectedLokasi, setSelectedLokasi] = useState(null);
  const [dropdownLokasiLayanan, setDropdownLokasiLayanan] = useState([]);
  const [cardContact, setCardContact] = useState([]);
  const [cardAddress, setCardAddress] = useState('');
  const [viewContact, setViewContact] = useState();

  useEffect(()=>{
    getLayananPublik((data)=>{
      setSektor(data.data);
      setDataParentLayananPublik(data.data)
      setTabs(data.data)
    })
  },[])
  function updateSektor() {
    getLayananPublik((data)=>{
      setSektor(data.data);
      setDataParentLayananPublik(data.data)
      setTabs(data.data)
      if (data.data.length > 0) {
        const sub_layanan = data.data[0].sub_layanan || [];
        const lokasi_layanan = data.data[0].lokasi_layanan || [];
        setSubLayanan(sub_layanan);
        setLokasiLayanan(lokasi_layanan);
      }
    })
  }
  const toggleKeuanganDropdown = () => {
    setShowKeuanganDropdown(!showKeuanganDropdown);
    setOpenSektor(!openSektor);
  };
  const renderSubLayananOptions = (items) => {
    return items.map(item => (
      <optgroup key={item.id} label={item.nama}>
        {item.sub_layanan && renderSubLayananOptions(item.sub_layanan)}
      </optgroup>
    ));
  };
  
  function setcontentdropdwon(index, id, data) {
    data.forEach((element) => {
      if (element.id === id) {
        var list = [];
        for (var i = 0; i < dropdown.length; i++) {
          if (i < index) {
            list.push(dropdown[i]);
          }
        }
        var listItemDropDown = [];
        element.sub_layanan.forEach((sector) => {
          listItemDropDown.push(sector);
        });
        if (listItemDropDown.length > 0) {
          list[index] = {
            element: element,
            sector: listItemDropDown,
            index: index + 1,
          };
          setDropdown(list);
        } else {
          setDropdown(list);
        }
  
        // Mengatur lokasi layanan jika ada
        if (element.lokasi_layanan.length > 0) {
          setDropdownLokasiLayanan(element.lokasi_layanan);
        } else {
          setDropdownLokasiLayanan([]);
        }
      }
    });
  }
  
  const [selecteditems, setSelectedItems] = useState("");
  function Labelsnama({ data }) {
    const [openitems, setOpenItems] = useState(false);
    const [inputvalueitems, setInputValueItems] = useState("");
    const [items, setItems] = useState(data.sector);

    function handleClick(data, label) {
      setcontentdropdwon(data.index, label.id, data.element.sub_layanan);
      setSelectedItems(label.nama);
    }
    return (
      <div className="w-[210px] h-auto text-secondary text-[12px] cursor-pointer">
          <div
            onClick={() => setOpenItems(!openitems)}
            className="bg-[#ebebeb] w-full p-2 px-[15px] flex items-center justify-between rounded-[10px]"
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
            className={`bg-[#ebebeb] mt-[5px] rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar mb-[5px]
              ${openitems ? "max-h-[240px]" : "max-h-[0]"}`}
          >
            {items?.map((label) => (
          <li
            id={`children_${label.id}`}
            key={label?.nama}
            className={`p-2 text-[10px] hover:bg-third hover:text-white rounded-[10px] 
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
              // setBidang(label.id);
              setSelectedLokasi(null)
              setCardAddress(null)
              setCardContact(label)
              setViewContact(true)
              // if(label.sub_layanan.length > 0){
              //   setViewContact(false)
              //   setCardContact(label)
              // }else{
              //   setCardContact(label)
              //   setViewContact(true)
              // }
            }}
          >
            {label?.nama}
          </li>
            ))}
          </ul>
        </div>
    );
  }
  function LokasiLayananDropdown({ data }) {
    const [openItems, setOpenItems] = useState(false);
    const [inputValueItems, setInputValueItems] = useState("");
    const [items, setItems] = useState(data);
  
    function handleClick(label) {
      setSelectedLokasi(label.nama);
    }
  
    return (
      <div className="w-[210px] h-auto text-secondary text-[12px] cursor-pointer">
        <div
          onClick={() => setOpenItems(!openItems)}
          className="bg-[#ebebeb] w-full p-2 px-[15px] flex items-center justify-between rounded-[10px]"
        >
          <p>{selectedLokasi ?? "Pilih Lokasi"}</p>
          <FontAwesomeIcon
            icon={faChevronDown}
            color="#24445A"
            className={`ml-[20px] w-[10px] h-[20px] ${openItems && "rotate-180"}`}
          />
        </div>
        <ul
          className={`bg-[#ebebeb] mt-[5px] rounded-[10px] max-h-60 overflow-y-scroll mini-scrollbar mb-[5px]
            ${openItems ? "max-h-[240px]" : "max-h-[0]"}`}
        >
          {items?.map((label) => (
            <li
              key={label?.nama}
              className={`p-2 text-[10px] hover:bg-third hover:text-white rounded-[10px]
                ${
                  label?.nama?.toLowerCase() === selectedLokasi?.toLowerCase() &&
                  "bg-secondary text-white"
                }
                ${
                  label?.nama?.toLowerCase().includes(inputValueItems)
                    ? "block"
                    : "hidden"
                }`}
              onClick={() => {
                handleClick(label);
                setBidang(label.id);
                // setCardContact(label)
                setCardAddress(label.nama)
                setViewContact(true)
              }}
            >
              {label?.nama}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  function Setselecteddropdown(index, value) {
    var data = dropdown;
    data[index].select = value;
    setDropdown(data);
  }
  return (
    <div>
      <Navbar />
      <div className="flex flex-col mt-[125px] justify-start items-center min-h-screen h-auto">
        {/* <img src={bulat} alt="" className="fixed w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10" /> */}
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
        <div className="w-full flex justify-between items-center max-w-[1781px] mt-[24px] px-[175px]">
          <div
            className="w-[50px] h-[50px] transition-transform duration-300 transform hover:scale-110 cursor-pointer"
            onClick={() => {
              window.history.back();
            }}
          >
            <img src={back} alt="iconBack" />
          </div>
          <h1 className="text-center flex justify-center items-center text-secondary text-[24px] md:text-[34px] font-bold">
            Hubungi Layanan Kami
          </h1>
          <div className="w-[50px] h-[50px]"></div>
        </div>
        {dataParentLayananPublik.length > 0 ? (
          <div className="max-w-[600px] overflow-x-auto mini-scrollbar-horizontal py-[10px] cursor-pointer">
            <div className="flex mt-[24px] gap-x-[10px] justify-start items-center w-auto">
              {dataParentLayananPublik.slice(0, 3).map((dataLayananPublik) => (
                <div
                  key={dataLayananPublik.id}
                  onClick={() => {
                    setOpenPelayananPublik(!openPelayananPublik);
                  }}
                >
                  <div className="flex w-auto h-[40px] rounded-full border border-[f1f1f1] text-[12px] items-center justify-center px-[18px] py-[8px] whitespace-nowrap bg-secondary text-white">
                    {dataLayananPublik.nama}
                  </div>
                </div>
              ))}
              {dataParentLayananPublik.length > 3 && (
                <div
                  onClick={() => {
                    setOpenPelayananPublik(!openPelayananPublik);
                  }}
                >
                  <div className="flex w-auto h-[40px] rounded-full border border-[f1f1f1] text-[12px] items-center justify-center px-[18px] py-[8px] whitespace-nowrap bg-secondary text-white">
                    +{dataParentLayananPublik.length - 3}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}

        <div className="flex w-full max-w-[990px] items-center justify-center">
          <div className="flex w-full">{CardPejabat(dataCardPimpinan)}</div>
        </div>

        <div className="flex text-secondary font-bold italic text-[20px] mt-[15px]">
          Staff Function
        </div>
        <div className="flex w-full max-w-[990px] items-center justify-center">
          <div className="flex w-full">{CardPejabat(StafFunction)}</div>
        </div>

        <div className="flex text-secondary font-bold italic text-[20px] mt-[15px]">
          Line Function
        </div>

        <div className="flex w-full max-w-[990px] items-center justify-center">
          <div className="flex w-full">
              {CardPejabat(LineFunction)}
          </div>
        </div>
        {openPelayananPublik && (
          <div className="animate-fadeIn transition duration-200 ease-in fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="flex flex-col bg-white rounded-[25px] justify-start items-center w-[700px] h-auto mx-[40px] md:mx-0 px-[40px] py-[30px]">
              <div className="w-full flex justify-between items-center">
                <div className="flex w-[40px]">
                  <div className="w-[40px]"></div>
                </div>
                <p className="w-full text-center text-[24px] font-bold text-secondary">
                  Hubungi Layanan Kami
                </p>
                <div className="flex w-[40px]">
                  <FontAwesomeIcon
                    icon={faClose}
                    color="#FFFFFF"
                    className={`w-[40px] h-[40px] cursor-pointer transition duration-200 ease-in bg-[#CD3838] rounded-[7px]`}
                    onClick={() => {
                      setOpenPelayananPublik(!openPelayananPublik);
                      setOpsiAktif(null)
                      setViewContact(false)
                    }}
                  />
                </div>
              </div>
              <div className="wrapper">
                <div className="icon" onClick={() => handleIconClick("left")}>
                  <FontAwesomeIcon color="#FFFFFF" icon={faChevronLeft} id="left" className="w-[15px] h-[15px] cursor-pointer bg-secondary rounded-full p-[3px]" />
                </div>
                <ul
                  className="tabs-box"
                  ref={tabsBoxRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                >
                  {tabs.map((tab, index) => (
                    <li
                      id={`sektor_${index.id}`}
                      key={index.id}  // Ensure each button has a unique key
                      className={`tab ${opsiAktif === tab.id ? "active" : ""}`}
                      onClick={() => {
                        updateSektor();
                        setSelectedButton(tab.id);
                        toggleKeuanganDropdown();
                        setSelectedItems(null)
                        setShowKeuanganDropdown(true);
                        setcontentdropdwon(0, tab.id, sektor);
                        // setBidang(null);
                        handleTabClick(index, tab);
                        setOpsiAktif(tab.id);
                        setCardContact(tab)
                        setViewContact(true)
                        // setHaveLocation(false);
                      }}
                    >
                      {tab.nama}
                    </li>
                  ))}
                </ul>
                <div className="icon" onClick={() => handleIconClick("right")}>
                  <FontAwesomeIcon color="#FFFFFF" icon={faChevronRight} id="right" className="w-[15px] h-[15px] cursor-pointer bg-secondary rounded-full p-[3px]" />
                </div>
              </div>
              <div className="w-full px-[45px]">
              {opsiAktif ? (
                  <div className="w-full flex flex-col pb-[10px]">
                    <div className="w-full">
                      <div
                        className={`${
                          dropdownLokasiLayanan.length === 0 || showKeuanganDropdown.length === 0 ? "w-full flex justify-between items-start" : "w-full flex justify-center items-start"
                        }`}
                      >
                        {showKeuanganDropdown &&
                          dropdown.some((item) => item.sector.length > 0) && (
                            <div className="flex flex-col items-start justify-start">
                              <p className="text-[12px] text-secondary">Jenis Layanan</p>
                              {dropdown.map((item) => (
                                <Labelsnama data={item} />
                              ))}
                            </div>
                          )}
                        {dropdownLokasiLayanan.length > 0 && (
                          <div className="flex flex-col items-start justify-start">
                            <p className="text-[12px] text-secondary">Lokasi Pelayanan</p>
                            <LokasiLayananDropdown data={dropdownLokasiLayanan} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-[16px] text-secondary text-center my-[40px]">
                    Temukan berbagai layanan publik yang tersedia untuk masyarakat
                    pada pilihan di atas.
                  </p>
                )}
                {viewContact ?(
                  <div className="flex flex-col items-center w-full h-auto bg-secondary px-[40px] py-[30px] rounded-[30px] justify-between min-h-[210px]">
                    <div className="flex justify-between w-full">
                      <p className="w-auto font-black text-white text-[20px] uppercase break-words">{cardContact.nama.startsWith("Layanan") ? cardContact.nama.replace("Layanan", "").trim() : cardContact.nama}</p>
                    </div>
                    <div className="flex justify-between w-full">
                      <div className="flex flex-col">
                        <p className="font-regular text-white text-[14px]">
                          Alamat Kantor Pusat: {cardContact.alamat_kantor ? cardContact.alamat_kantor : ""} <span>{cardAddress ? cardAddress : ""}</span> 
                        </p>
                        <p className="font-regular text-white text-[14px]">
                          {cardAddress ? `Alamat Pelayanan: ${cardAddress}` : ""}
                        </p>
                        <p className="font-regular  text-white text-[14px]">
                          Kontak: <span className="font-bold">{cardContact.kontak ? cardContact.kontak : "-"}</span> 
                        </p>
                      </div>
                      <a className={`${cardContact.kontak ? "" : "hidden"} flex items-center justify-between w-auto h-[34px] px-[18px] py-[8px] bg-[#567C96] rounded-[40px] text-white text-[12px] gap-x-[10px] hover:bg-[#a0aeb8] cursor-pointer`} href={`https://wa.me/${cardContact.kontak}`}>
                        <p>Whatsapp</p>
                        <FontAwesomeIcon
                          icon={faPhone}
                          color="#FFF"
                          className={`w-[12px] h-auto scale-x-[-1]`}
                        />
                      </a>
                    </div>
                  </div>
                ):(
                  <></>
                )}
              </div>

              
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default PengelolaDaerah;
