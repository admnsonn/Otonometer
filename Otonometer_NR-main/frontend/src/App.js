import React, { useState } from "react";
import HalamanLogin from "./pages/Sign/Loginpage";
import HalamanRegister from "./pages/Sign/Registerpage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Jelajahpage from "./pages/Jelajah/Jelajahpage";
import Dashboardpage from "./pages/Dashboard/Dashboardpage";
import Profilepage from "./pages/Profile/Profilepage";
import Jelajahmainpage from "./pages/Jelajah/Jelajahmainpage";
import Utakmainpage from "./pages/Utak-Atik/Utakmainpage";
import Berkacamainpage from "./pages/Berkaca/Berkacamainpage";
import Jelajahprofilpage from "./pages/Jelajah/Jelajahprofilpage";
import Utakpage from "./pages/Utak-Atik/Utakpage";
import Berkacapage from "./pages/Berkaca/Berkacapage";
import UtakGraphPage from "./pages/Utak-Atik/UtakGraphPage";
import Arsippage from "./pages/Jelajah/arsippage";
import HalamanMasuk from "./pages/auth/Masukpage";
import HalamanDaftar from "./pages/auth/Daftarpage";
import Timeseries from "./components/Grafik/Timeseries";
import UtakProfil from "./pages/Utak-Atik/UtakProfilPage";
import BerkacaGraphPage from "./pages/Berkaca/BerkacaGraphPage";
import ArsipBerkacaPage from "./pages/Berkaca/ArsipBerkacaPage";
import BerkacaTimeseriespage from "./pages/Berkaca/BerkacaTimeseriespage";
import ArsipAdam from "./pages/Berkaca/ArsipAdamBerkaca";
import BerkacaprofileD1page from "./pages/Berkaca/BerkacaprofileD1page";
import BerkacaprofileD2page from "./pages/Berkaca/BerkacaprofileD2page";
import EditProfilepage from "./pages/Profile/editProfilePage";
import EditProfilepageGoogle from "./pages/Profile/editProfileGooglePage";
import Forgotpage from "./pages/Sign/Forgotpage";
import Ubahpasspage from "./pages/Sign/Ubahpaspage";
import Daftarpageg from "./pages/auth/Daftarpageg";
import Tacpage from "./pages/auth/syaratketentuanpage";
import PPpage from "./pages/auth/pppage";
import ArsipGrap from "./pages/Utak-Atik/ArsipUtakgrap";
import ArsipMain from "./pages/Utak-Atik/ArsipUtakMain";
import BerkacaRillAPIPage from "./pages/Berkaca/BerkacaRillAPIPage";
import BerkacaGraphApiPage from "./pages/Berkaca/BerkacaGraphApiPage";
import BerkacaTSApiPage from "./pages/Berkaca/BerkacaTSApiPage";
import DprdUtama from "./pages/Dprd/dprdutama";
import DprdKedua from "./pages/Dprd/lengkapdprd";
import DprdKetiga from "./pages/Dprd/dprdketiga";
import Sekredprd from "./pages/Dprd/sekredprd";
import Dprdlinimasa from "./pages/Dprd/dprdlinimasa";
import Cookies from "js-cookie";
import DPRPage from "./pages/DPR/DPRPage";
import PemdaAwal from "./pages/Pemda/pemdaawal";
import PemdaLengkap from "./pages/Pemda/pemdalengkap";
import PemdaLinimasa from "./pages/Pemda/pemdalinimasa";
import PemdaAnakan from "./pages/Pemda/pemdaanakan";
import PemdaAnakan2 from "./pages/Pemda/pemdaanakan2";
import ProfilDaerah from "./pages/ProfilDaerah/ProfilDaerah";
import ProfilDaerahMain from "./pages/ProfilDaerah/ProfilDaerahMain";
import PengelolaDaerah from "./pages/ProfilDaerah/PengelolaDaerah";
import AnakanPengelolaDaerah from "./pages/ProfilDaerah/AnakanPengelolaDaerah";
import AnakanDariAnakanPengelolaDaerah from "./pages/ProfilDaerah/AnakanDariAnakanPengelolaDaerah";
import LiniMasa from "./pages/ProfilDaerah/LiniMasa";
import ReactGA from "react-ga4";
const App = () => {
  const TRACKING_ID = "G-27J1HCGXRZ"
  ReactGA.initialize(TRACKING_ID);
  const selectedData = JSON.parse(sessionStorage.getItem("selectedData"));
  const selectedDataBerkaca = JSON.parse(sessionStorage.getItem("selectedDataBerkaca"));
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation tidak support pada browser ini.");
    }
  }
  const [LatitudeUser, setLatitudeUser] = useState(null);
  const [Longitude, setLongitude] = useState(null);
  function showPosition(position) {
    setLatitudeUser(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    // buat ngecek dah ada apa belum
    const guestId = Cookies.get("id_guest");

    if (!guestId) {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch("https://development.otonometer.com:8000/api/visitor/req-id-guest", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status && result.data && result.data.length > 0) {
            const id = result.data[0].id;
            // Simpan ID di dalam cookiesnyaaa
            Cookies.set("id_guest", id, { expires: 365 });
          } else {
            console.error("Invalid response:", result);
          }
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<Dashboardpage />}></Route>
        <Route exact path="/Masuk" element={<HalamanLogin />}></Route>
        <Route exact path="/Lupa-Sandi" element={<Forgotpage />}></Route>
        <Route exact path="/Ubah-Sandi" element={<Ubahpasspage />}></Route>
        <Route exact path="/Daftar" element={<HalamanDaftar />}></Route>
        <Route exact path="/Profile" element={<Profilepage />}></Route>
        <Route exact path="/Buat-Kata-Sandi" element={<Daftarpageg />}></Route>
        <Route exact path="/Edit-Profile" element={<EditProfilepage />}></Route>
        <Route exact path="/Edit-Profile-Google" element={<EditProfilepageGoogle />}></Route>
        <Route exact path="/Syarat-Ketentuan" element={<Tacpage />}></Route>
        <Route exact path="/Kebijakan-Privasi" element={<PPpage />}></Route>
        {/* Jelajah Page */}
        <Route exact path="/Jelajah" element={<Jelajahpage />}></Route>
        <Route exact path="/Jelajah-Main" element={<Jelajahmainpage />}></Route>
        <Route exact path="/Jelajah-Profil" element={<Jelajahprofilpage />}></Route>
        {/* Utak Atik Page */}
        <Route exact path="/Utak-Atik" element={<Utakpage />}></Route>
        <Route exact path="/Utak-Atik-Main" element={<Utakmainpage />}></Route>
        <Route exact path="/Utak-Atik-Profil" element={<UtakProfil />}></Route>
        <Route path="/Utak-Atik-Grafik" element={selectedData?.parent_id_1 ? <UtakGraphPage /> : <Navigate to="/" />} />
        <Route path="/Berkaca-Grafik-PieChart" element={selectedDataBerkaca?.parent_id_1Berkaca ? <BerkacaGraphPage /> : <Navigate to="/" />} />
        <Route path="/Berkaca-Grafik-Timeseries" element={selectedDataBerkaca?.parent_id_1Berkaca ? <BerkacaTimeseriespage /> : <Navigate to="/" />} />
        {/* Berkaca Page */}
        <Route exact path="/Berkaca" element={<Berkacapage />}></Route>
        <Route exact path="/Berkaca-Main" element={<Berkacamainpage />}></Route>
        <Route exact path="/Berkaca-Profil-Daerah1" element={<BerkacaprofileD1page />}></Route>
        <Route exact path="/Berkaca-Profil-Daerah2" element={<BerkacaprofileD2page />}></Route>
        <Route exact path="/Berkaca-Rill-Api" element={<BerkacaRillAPIPage />}></Route>
        <Route exact path="/Berkaca-Graph-Api" element={<BerkacaGraphApiPage />}></Route>
        <Route exact path="/Berkaca-TS-Api" element={<BerkacaTSApiPage />}></Route>
        {/* Arsip */}
        <Route exact path="/Arsip" element={<Arsippage />}></Route>
        <Route exact path="/Register" element={<HalamanRegister />}></Route>
        <Route exact path="/Login" element={<HalamanMasuk />}></Route>
        {/* <Route exact path="/ArsipProfile" element={<ArsipProfile />}></Route> */}
        <Route exact path="/Time" element={<Timeseries />}></Route>
        <Route exact path="/ArsipAdam" element={<ArsipAdam />}></Route>
        <Route exact path="/ArsipUtakGrap" element={<ArsipGrap />}></Route>
        <Route exact path="/ArsipUtakMain" element={<ArsipMain />}></Route>
        {/* DPRD Page */}
        <Route exact path="/DprdUtama" element={<DprdUtama />}></Route>
        <Route exact path="/DprdKedua" element={<DprdKedua />}></Route>
        <Route exact path="/DprdKetiga" element={<DprdKetiga />}></Route>
        <Route exact path="/Sekredprd" element={<Sekredprd />}></Route>
        <Route exact path="/DPR" element={<DPRPage />}></Route>
        <Route exact path="/PemdaAwal" element={<PemdaAwal />}></Route>
        <Route exact path="/PemdaLengkap" element={<PemdaLengkap />}></Route>
        <Route exact path="/PemdaLiniMasa" element={<PemdaLinimasa />}></Route>
        <Route exact path="/PemdaAnakan" element={<PemdaAnakan />}></Route>
        <Route exact path="/PemdaAnakan2" element={<PemdaAnakan2 />}></Route>
        <Route exact path="/Dprdlinimasa" element={<Dprdlinimasa />}></Route>

        {/* PROFIL DAERAH */}
        {/* <Route exact path="/ProfilDaerah" element={<ProfilDaerah />}></Route> */}
        {/* <Route exact path="/ProfilDaerah-Main" element={<ProfilDaerahMain />}></Route> */}
        {/* LIHAT SELENGKAPNYA */}
        {/* <Route exact path="/ProfilDaerah-Main/Detail" element={<PengelolaDaerah />}></Route> */}
        {/* <Route exact path="/ProfilDaerah-Main/Detail/:id" element={<AnakanPengelolaDaerah />}></Route> */}
        {/* <Route exact path="/ProfilDaerah-Main/Detail/2" element={<AnakanDariAnakanPengelolaDaerah />}></Route> */}
        {/* <Route exact path="/ProfilDaerah-Main/Linimasa/:id" element={<LiniMasa />}></Route> */}


      </Routes>
    </Router>
  );
};
export default App;
