import React, { useState, useEffect } from "react";
import logo from "../../assets/logonav.svg";
import { NavLink, redirect, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import map from "../../assets/icons/peta.png";
import iconuser from "../../assets/icons/iconuser.png";
import PropTypes, { object } from "prop-types";
import playstore from "../../assets/Google Play Black Border.svg";
import appstore from "../../assets/App Store Black Border.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ProfileImage from "../../assets/icons/iconuser.png";

const NavLinks = () => {
  const location = useLocation();

  const isActive = (match, location) => {
    if (match.url === "/Jelajah") {
      return (
        location.pathname === match.url ||
        location.pathname === "/Jelajah-Main" ||
        location.pathname === "/Jelajah-Profil"
      );
    }
    if (match.url === "/Utak-Atik") {
      return (
        location.pathname === match.url ||
        location.pathname === "/Utak-Atik-Main" ||
        location.pathname === "/Utak-Atik-Profil" ||
        location.pathname === "/Utak-Atik-Grafik"
      );
    }
    if (match.url === "/Berkaca") {
      return (
        location.pathname === match.url ||
        location.pathname === "/Berkaca-Main" ||
        location.pathname === "/Berkaca-Profil-Daerah1" ||
        location.pathname === "/Berkaca-Profil-Daerah2" ||
        location.pathname === "/Berkaca-Grafik-PieChart" ||
        location.pathname === "/Berkaca-Grafik-Timeseries"
      );
    }
    if (match.url === "/ProfilDaerah") {
      return (
        location.pathname === match.url ||
        location.pathname === "/ProfilDaerah-Main" ||
        location.pathname === "/ProfilDaerah-Main/Detail" ||
        /^\/ProfilDaerah-Main\/Detail\/\d+$/.test(location.pathname) ||
        location.pathname === "/ProfilDaerah-Main/Linimasa" ||
        /^\/ProfilDaerah-Main\/Linimasa\/\d+$/.test(location.pathname)
      );
    }
    return location.pathname === match.url;
  };

  const navLinkStyles = {
    fontWeight: "regular",
  };

  const MySwal = withReactContent(Swal);

  const handleLensaClick = () => {
    MySwal.fire({
      title: "Perhatian!",
      text: "Fitur Lensa sedang dalam tahap pengembangan.",
      showCancelButton: true,
      cancelButtonText: "Tutup",
      cancelButtonColor: "#24445a",
      customClass: {
        title: "title-icon-errorr",
        text: "text-icon",
        cancelButton: "cancel-icon",
        popup: "swal2-popup",
      },
      showConfirmButton: false,
    });
  };

  return (
    <>
      <NavLink
        style={
          isActive({ url: "/" }, location)
            ? { fontWeight: "bold" }
            : navLinkStyles
        }
        to={"/"}
        className={"text-secondary"}
      >
        Beranda
      </NavLink>
      <NavLink
        style={
          isActive({ url: "/Jelajah" }, location)
            ? { fontWeight: "bold" }
            : navLinkStyles
        }
        to={"/Jelajah"}
        className={"text-secondary"}
      >
        Jelajah
      </NavLink>
      <NavLink
        style={
          isActive({ url: "/Utak-Atik" }, location)
            ? { fontWeight: "bold" }
            : navLinkStyles
        }
        to={"/Utak-Atik"}
        className={"text-secondary"}
      >
        Utak-Atik
      </NavLink>
      <NavLink
        style={
          isActive({ url: "/Berkaca" }, location)
            ? { fontWeight: "bold" }
            : navLinkStyles
        }
        to={"/Berkaca"}
        className={"text-secondary"}
      >
        Berkaca
      </NavLink>

      <p onClick={handleLensaClick} style={{ cursor: "pointer" }} className="text-secondary">
        Lensa
      </p>
      {/* <NavLink
        style={
          isActive({ url: "/ProfilDaerah" }, location)
            ? { fontWeight: "bold" }
            : navLinkStyles
        }
        to={"/ProfilDaerah"}
        className={"text-secondary"}
      >
        Profil Daerah
      </NavLink> */}
    </>
  );
};

const Circleakunn = ({ src, alt, size }) => {
  const [isDropp, setIsDropp] = useState(false);

  const toggleDropdownn = () => {
    setIsDropp(!isDropp);
  };

  const containerStylee = {
    position: "relative",
    display: "inline-block",
  };

  const imageStylee = {
    width: size,
    height: size,
    borderRadius: "80%",
    border: "1px solid #FFFFFF",
    boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.60)",
  };
  return (
    <div style={containerStylee}>
      <button>
        <img
          src={src}
          alt={alt}
          style={imageStylee}
          className="object-cover"
          onClick={toggleDropdownn}
        />
      </button>
    </div>
  );
};

const Circleakun = ({ src, alt, size }) => {
  const [isDrop, setIsDrop] = useState(false);

  const toggleDropdown = () => {
    setIsDrop(!isDrop);
  };

  const containerStyle = {
    position: "relative",
    display: "inline-block",
  };

  const imageStyle = {
    width: size,
    height: size,
    borderRadius: "80%",
    border: "1px solid #FFFFFF",
    boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.60)",
  };

  return (
    <div style={containerStyle}>
      <button>
        <img src={src} alt={alt} style={imageStyle} className="object-cover" onClick={toggleDropdown} />
      </button>
      {isDrop && (
        <div class="absolute justify-center ml-[-55px] bg-blue-300 bg-opacity-50 rounded-xl z-50 mt-2 pl-5 pr-5 pt-4 pb-4 shadow-md lg:w-[150px] w-[120px] text-center leading-[1.5] text-base text-white flex items-center lg:mt-[0px] mt-[px]">
          <ul>
            <NavLink to={"/Profile"}>
              <li className="lg:w-[120px] bg-secondary mb-2 rounded pt-1 pb-1 hover:bg-third hover:text-white lg:text-[17px] text-[12px]">
                Profil
              </li>
            </NavLink>
            <NavLink onClick={handlePopUpLogout}>
              <li className="lg:w-[120px] w-[100px] bg-[#CD3838] mb-2 rounded pt-1 pb-1 hover:bg-third hover:text-white lg:text-[17px] text-[12px]">
                Keluar Akun
              </li>
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
};

Circleakun.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

const handleLogout = async () => {
  sessionStorage.clear();
  window.location.replace("/Masuk");
  window.history.replaceState(null, "", "/Masuk");
};
const handlePopUpLogout = () => {
  Swal.fire({
    title: "Perhatian!",
    text: "Apakah Anda yakin ingin keluar?",
    confirmButtonText: "Ya",
    confirmButtonColor: "#24445A",
    showCancelButton: true,
    cancelButtonText: "Tidak",
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
      handleLogout()
    },
  });
};

const Navbar = () => {
  const [imageUser, setImageUser] = useState(null);

  const tokenUser = sessionStorage.getItem("token");

  useEffect(() => {
    if (tokenUser !== null) {
      const xhr_profile = new XMLHttpRequest();
      xhr_profile.onload = function () {
        const data_profile = JSON.parse(xhr_profile.responseText).data;
        setImageUser(data_profile.image);
      };
      xhr_profile.open(
        "GET",
        process.env.REACT_APP_URL_API+"/profile",
        true
      );
      xhr_profile.setRequestHeader("Authorization", "Bearer " + tokenUser);
      xhr_profile.send();
    }
  }, [tokenUser]);

  const navgate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("token") == null ? false : true
  );

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // const [fotoprofile, setFotoProfile] = useState(null);
  // useEffect(() => {
  //   if(tokenUser !== null){
  //     const xhr_profile = new XMLHttpRequest();
  //     xhr_profile.onload = function () {
  //       const data_profile = JSON.parse(xhr_profile.responseText).data;
  //       setFotoProfile(data_profile.image);
  //     };
  //     xhr_profile.open("GET", process.env.REACT_APP_URL_API+"/profile", true);
  //     xhr_profile.setRequestHeader("Authorization", "Bearer " + tokenUser);
  //     xhr_profile.send();
  //   }
  //   }, [tokenUser]);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await fetch(
  //         process.env.REACT_APP_URL_API+"/profile"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch profile");
  //       }
  //       const data = await response.json();
  //       setFotoProfile(data.data.image);
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   };
  //   fetchProfile();
  // }, []);

  return (
    <div className="flex w-full items-center justify-evenly fixed top-0 flex-wrap h-20 bg-white shadow-md z-50">
      <div className="logo">
        <NavLink to={"/"} onClick={() => navgate("/")}>
          <img
            src={logo}
            alt="loading"
            className="lg:w-full lg:h-full lg:mr-[0px] mr-[150px] h-[27px] md:mr-[0px] md:h-[25px]"
          />
        </NavLink>
      </div>

      <>
        <nav className="flex items-center justify-center">
          <div className="hidden sm:hidden md:flex xl:flex gap-x-[25px] text-secondary lg:text-[16px] md:text-[12px]">
            <NavLinks />
          </div>

          <div className="xl:hidden flex justify-end items-center mb-[28px] mr-[10px] md:hidden">
            <button className="mt-[30px]" onClick={toggleNavbar}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </>

      {isOpen && (
        <div
          className="flex flex-col justify-center items-start basis-full mt-[10px] ml-[10px] mr-[10px] gap-y-[20px] xl:hidden p-auto bg-black bg-white rounded-[5px]"
          style={{ boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.60)" }}
        >
          <div className="ml-[20px] flex flex-col gap-y-[15px] mt-[60px] mb-[-15px] text-[14px]">
            <NavLinks />
          </div>
          <div className=" gap-[10px] xl:flex">
            {isLoggedIn ? (
              <>
                <div className="flex ml-[20px] md:ml-[680px] mt-[-217px] gap-[10px]">
                  <div>
                    <Circleakunn
                      src={imageUser ? imageUser : ProfileImage}
                      alt="User Profile"
                      size="35px"
                    />
                  </div>
                  <div className="ml-[7px] mt-[8px] text-[14px] text-[#24445A] font-bold hover:font-bold">
                    <NavLink to={"/Profile"} className="">
                      <span>{sessionStorage.getItem("namaUser")}</span>
                    </NavLink>
                  </div>
                  <div className="border-r border-[#24445A] ml-[2px] mt-[10px] h-[15px]"></div>
                  <div className="ml-[3px] mt-[8px] text-[14px] text-[#CD3838] font-bold">
                    <NavLink onClick={handlePopUpLogout} className="">
                      Keluar Akun
                    </NavLink>
                  </div>
                </div>
                <div className="flex gap-[20px] mt-[185px] mx-auto ml-[17px] mb-[15px]">
                  <img
                    src={playstore}
                    alt="loading"
                    className="hover:opacity-60 hover:cursor-pointer h-[40px]"
                    onClick={() => {
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.otonometer.neracaruang&pcampaignid=web_share",
                        "_blank"
                      );
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex ml-[20px] md:ml-[680px] mt-[-214px] gap-[10px]">
                  <div className="ml-[0px] mt-[7px] text-[15px] text-[#24445A] font-bold hover:font-bold">
                    <NavLink to={"/Masuk"} className="">
                      Masuk
                    </NavLink>
                  </div>
                  <div className="border-r border-[#24445A] ml-[2px] mt-[10px] h-[17px]"></div>
                  <div className="ml-[2px] mt-[7px] text-[15px] text-[#24445A] font-bold">
                    <NavLink to={"/Daftar"} className="">
                      Daftar
                    </NavLink>
                  </div>
                </div>
                <div className="flex gap-[20px] mt-[195px] mx-auto ml-[17px] mb-[15px]">
                  <img
                    src={playstore}
                    alt="loading"
                    className="hover:opacity-60 hover:cursor-pointer h-[40px]"
                    onClick={() => {
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.otonometer.neracaruang&pcampaignid=web_share",
                        "_blank"
                      );
                    }}
                  />
                </div>
                {/* <div className="ml-[17px] flex flex-col gap-y-[9px] mb-[20px]">
                  <NavLink
                    to={"/Masuk"}
                    className="
              flex 
              bg-secondary 
              hover:bg-third 
              hover:text-white
              w-[105px] h-[39px] 
              rounded-[10px] 
              text-white 
              items-center justify-center"
                  >
                    Masuk
                  </NavLink>
                  <NavLink
                    to={"/Daftar"}
                    className="
              flex 
              bg-none 
              hover:bg-third 
              hover:border-third
              hover:text-white
              w-[105px] h-[39px] 
              rounded-[10px]  
              text-secondary 
              items-center 
              border-2 
              border-secondary justify-center"
                  >
                    Daftar
                  </NavLink>
                </div> */}
              </>
            )}
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div className="hidden xl:block md:block">
          <div className="hidden gap-[10px] sm:hidden md:flex xl:flex">
            {/* Login */}
            <>
              <NavLink
                to={"/Masuk"}
                className="
            flex 
            bg-secondary 
            hover:bg-third 
            hover:text-white
            lg:w-[105px] lg:h-[39px] 
            rounded-[10px] 
            text-white 
            items-center justify-center 
            lg:text-[17px] md:text-[13px]             
            w-[90px] h-[35px]
            md:w-[85px] md:h-[33px]"
              >
                Masuk
              </NavLink>
              {/* Register */}
              <NavLink
                to={"/Daftar"}
                className="
            flex 
            bg-none 
            hover:bg-third 
            hover:border-third
            hover:text-white
            lg:w-[105px] lg:h-[39px] 
            rounded-[10px]  
            text-secondary 
            items-center 
            border-2 
            border-secondary justify-center
            lg:text-[17px] md:text-[13px] 
            w-[90px] h-[35px]            
            md:w-[85px] md:h-[33px]"
              >
                Daftar
              </NavLink>
            </>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <>
          <div className="hidden xl:block md:hidden">
            <Circleakun
              src={imageUser ? imageUser : ProfileImage}
              alt="User Profile"
              size="45px"
            />
          </div>
          <div className="hidden md:block xl:hidden mt-[5px]">
            <Circleakun
              src={imageUser ? imageUser : ProfileImage}
              alt="User Profile"
              size="30px"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
