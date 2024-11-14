import React from "react";
import logo from "../../assets/biglogo.svg";
import playstore from "../../assets/Google Play Black Border.svg";
import appstore from "../../assets/App Store Black Border.svg";
import Carousel from "../../components/Carousel";
import logo3d from "../../assets/About/logo3d.svg";
import ombak from "../../assets/About/ombak.png";
import bulat from "../../assets/bulat.svg";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import karaosell from "../../assets/karaosel";
import karaosel from "../../assets/karaosel";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import slideer1 from '../../assets/jelajah.png';
import slideer2 from '../../assets/utak.png';
import slideer3 from '../../assets/berkaca.png';
import slideer4 from '../../assets/lens.png';
import Cookies from 'js-cookie';

// import ReactGA from "react-ga4";
import axios from "axios";
const Dashboard = () => {
  const [tokenUser, setTokenUser] = useState(sessionStorage.getItem("token"));
  const [userAge, setUserAge] = useState(null);
  const [userGender, setUserGender] = useState(null);
  const [emailUser, setEmailUser] = useState(null);
  const [latUser, setLatUser] = useState(null);
  const [longUser, setLongUser] = useState(null);

  useEffect(() => {
    if (tokenUser !== null) {
      axios.get(`${process.env.REACT_APP_URL_API}/profile`, {
        headers: {
          'Authorization': `Bearer ${tokenUser}`
        }
      })
      .then((response) => {
        const data_profile = response.data.data;
        setEmailUser(data_profile.email)
        sessionStorage.setItem("emailUser",data_profile.email)
      })
      .catch((error) => {
      });
    }
  }, [tokenUser]);

  function getLocation() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        alert("Geolocation tidak support pada browser ini.");
        resolve(null); // Resolve with null if geolocation is not supported
        return;
      }
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setLatUser(latitude);
          setLongUser(longitude);
          sessionStorage.setItem("latitudeUser", latitude);
          sessionStorage.setItem("longitudeUser", longitude);
          resolve({ latitude, longitude });
        },
        () => {
          resolve(null); // Resolve with null if user denies location
        }
      );
    });
  }
  
  useEffect(() => {
    dataStatsUser();
  }, []);
  
  async function dataStatsUser() {
    const location = await getLocation();
    const latUser = location ? location.latitude : null;
    const longUser = location ? location.longitude : null;
  
    if (tokenUser !== null) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL_API}/profile`, {
          headers: {
            'Authorization': `Bearer ${tokenUser}`
          }
        });
        
        const data_profile = response.data.data;
        const emailUser = data_profile.email;
        const userAge = data_profile.tanggal_lahir;
        const userGender = data_profile.title;
        const gender = userGender === "Nn" || userGender === "Ny" ? "female" : "male";
  
        // Calculate age
        const calculateAge = (dob) => {
          if (!dob) return null;
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
  
        const formdata = new FormData();
        formdata.append("guest", Cookies.get("id_guest"));
        formdata.append("status", tokenUser !== null ? 1 : 0);
        formdata.append("halaman", 0);
        formdata.append("lat", latUser);
        formdata.append("long", longUser);
        formdata.append("parent_dataset_1", null);
        formdata.append("dataset_1", null);
        formdata.append("parent_dataset_2", null);
        formdata.append("dataset_2", "");
        formdata.append("daerah_1", "");
        formdata.append("daerah_2", "");
        formdata.append("email", emailUser ? emailUser : "");
        formdata.append("website_akses", "1");
        formdata.append("gender", userGender !== null ? gender : "");
        formdata.append("age", userAge !== null ? calculateAge(userAge) : "");
  
        const requestSystem = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
  
        fetch("https://development.otonometer.com:8000/api/visitor/add", requestSystem)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
        
      } catch (error) {
        console.error(error);
      }
    }else if (tokenUser == null){
      const formdata = new FormData();
        formdata.append("guest", Cookies.get("id_guest"));
        formdata.append("status", 0);
        formdata.append("halaman", 0);
        formdata.append("lat", latUser);
        formdata.append("long", longUser);
        formdata.append("parent_dataset_1", "");
        formdata.append("dataset_1", "");
        formdata.append("parent_dataset_2", "");
        formdata.append("dataset_2", "");
        formdata.append("daerah_1", "");
        formdata.append("daerah_2", "");
        formdata.append("email", "");
        formdata.append("website_akses", "1");
        formdata.append("gender", "");
        formdata.append("age", "");
  
        const requestSystem = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
  
        fetch("https://development.otonometer.com:8000/api/visitor/add", requestSystem)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
    }
  }
  
  function getLocation() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        alert("Geolocation tidak support pada browser ini.");
        resolve(null); // Resolve with null if geolocation is not supported
        return;
      }
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          sessionStorage.setItem("latitudeUser", latitude);
          sessionStorage.setItem("longitudeUser", longitude);
          resolve({ latitude, longitude });
        },
        () => {
          resolve(null); // Resolve with null if user denies location
        }
      );
    });
  }
  
  
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
  function Karousel() {
    const [width, setWidth] = useState(0);
    const karousel = useRef(null);
    const slideImages = [slideer1, slideer2, slideer3, slideer4];
    const pageUrls = ['/Jelajah', '/Utak-Atik', '/Berkaca', null];
  
    useEffect(() => {
      if (karousel.current) {
        setWidth(karousel.current.scrollWidth - karousel.current.offsetWidth);
      }
    }, []);
  
    return (
      <motion.div
        ref={karousel}
        className="slidernya"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="inner-karousel"
        >
          {slideImages.map((slideer, index) => (
            <motion.div
              className="item"
              key={index}
              onClick={() => {
                if (pageUrls[index]) {
                  window.location.href = pageUrls[index];
                } else {
                  handleLensaClick();
                }
              }}
            >
              <img src={slideer} alt={`slider-${index}`} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <section className="mt-[100px]">
      
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
      {/* HEADING SECTION */}
      <div className="text-[14px] text-center text-secondary mt-[50px] w-[260px] mx-auto xl:hidden">
        Layanan untuk mengenal lebih jauh{" "}
        <span className="font-bold">(keotonomian fiskal)</span> daerah Anda!
      </div>
      <div className="w-[300px] mx-auto xl:hidden mt-[150px] mb-[100px]">
        <Karousel />
      </div>
      <div className="flex xl:absolute xl:justify-between w-full bg-primer xl:pl-[10%] px-[15%] xl:gap-[20px] xl:mt-[200px] mt-[50px]">
        <div className="flex flex-col justify-center items-start w-[800px] xl:w-full">
          {/* <img src={logo} alt="loading" className="h-[0] xl:h-[82px]"/> */}
          <p className="hidden md:block w-full xl:w-[900px] text-[14px] xl:text-[20px] mt-[10px] text-secondary text-center xl:text-left xl:ml-[40px]">
            <span className="font-bold">Otonometer</span> menyediakan informasi
            akurat
            <br />
            kepada pengguna indikator keuangan,
            <br />
            ekonomi dan statistik dari 549 daerah provinsi,
            <br />
            kabupaten dan kota di Indonesia.
          </p>
          <p className="md:hidden w-full xl:w-[900px] text-[14px] xl:text-[20px] mt-[10px] text-secondary text-center xl:text-left xl:ml-[40px]">
            <span className="font-bold">
            Otonometer</span> menyediakan informasi akurat kepada pengguna indikator keuangan, ekonomi dan statistik dari 549 daerah provinsi, kabupaten dan kota di Indonesia.
          </p>
          <div className="flex gap-[20px] mt-[30px] mx-auto xl:mx-0 xl:ml-[40px]">
            {/* <img
              src={appstore}
              alt="loading"
              className="hover:opacity-60 hover:cursor-pointer"
            /> */}
            <img
              src={playstore}
              alt="loading"
              className="hover:opacity-60 hover:cursor-pointer"
              onClick={() => {
                window.open(
                  "https://play.google.com/store/apps/details?id=com.otonometer.neracaruang&pcampaignid=web_share",
                  "_blank"
                );
              }}
            />
          </div>
        </div>
      </div>

      <div className="hidden xl:block left-0 right-0">
        <Carousel />
      </div>

      {/* ABOUT SECTION */}
      <div className="xl:relative xl:mt-0 mt-[200px]">
        <img
          src={ombak}
          alt="illustrate"
          className="hidden xl:flex items-center"
        />
        <div className="xl:absolute xl:inset-0 left-0">
          <div className="flex flex-col justify-center items-center xl:flex-row gap-[10px] xl:gap-[200px] xl:px-[15%] xl:mt-0 px-[15%]">
            <img src={logo3d} alt="" className="hidden xl:block xl:w-[40%]" />
            <div className="w-full xl:w-[80%] text-secondary text-[16px] text-justify">
              <div className="mb-[10px] md:mb-[20px] text-[40px] xl:text-[50px] font-bold">
                Tentang Kami
              </div>
              <p className="xl:mb-0 mb-[200px]">
                Tujuan aplikasi Otonometer ini adalah menyediakan informasi
                kepada publik luas agar lebih memahami potensi dan kinerja
                setiap daerah. Kami juga ingin informasi tersebut dapat
                digunakan untuk penelitian akademis di lembaga riset dan
                pendidikan. Disamping itu kami berkeinginan agar informasi
                tersebut menjadi masukan kepada pemerintah daerah dalam
                mengembangkan kebijakan yang meningkatkan kemandirian daerah.
                Kami juga ingin membantu pelaku bisnis memahami dan meramalkan
                tren serta mengidentifikasi peluang investasi dari daerah-daerah
                tersebut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
<style></style>;
export default Dashboard;
