import React, { useState, useEffect, useRef } from "react";
import "../../style/Switchbtn.css";
import "../../style/Components.css";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  faArrowRight,
  faCaretDown,
  faChevronDown,
  faSearch,
  faEllipsisV,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import back from "../../assets/back.svg";
import fotowalikota from "../../assets/walikota.svg";
import iconuser from "../../assets/megachan.jpg";
import Footer from "../../components/Footer";
import Navbar from "../../components/Header/Navbar";
import fotodprd from "../../assets/fotoketuad.jpg";

const PemdaLinimasa = () => {
  const [openDetailAnggota, setOpenDetailAnggota] = useState(false);
  const [openTable, setOpenTable] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center mt-[100px]">
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
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center gap-x-2 mt-2 md:mt-5 lg:mt-[50px]">
        <a
          href="/Dprdkedua"
          className="ml-2 mr-4 xl:mr-[890px] xl:ml-[60px] md:mt-0 lg:mb-7 relative"
        >
          <img
            src={back}
            alt=""
            className="w-[30px] md:w-[30px] lg:w-auto transition-transform duration-300 transform hover:scale-110"
          />
        </a>
        <h1 className="text-secondary text-2xl text-center mt-5 mb-2 font-bold lg:text-4xl lg:mt-0 lg:mb-5 lg:mr-10 xl:mr-[400px] xl:ml-[-5px]"></h1>
      </div>
      <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center mt-2 md:mt-5 lg:mt-[20px]">
        <h1 className="text-[#24445A] text-2xl text-center mt-5 mb-2 font-bold lg:text-4xl lg:mt-[-90px] lg:mb-5 ">
          Lini Masa Ketua DPRD
          <br />
          Kota Sumedang
        </h1>
        <h1 className="hidden lg:block text-secondary text-2xl text-center mt-5 mb-2 font-bold lg:text-4xl lg:mt-0 lg:mb-5"></h1>
      </div>
      {/* Tambahakan sebuah tabel di sini yang berisi 5 kolom */}
      <div className="flex justify-center mt-5 px-4">
        <table className="bg-white border border-gray-200 rounded-md shadow-lg custom-table-width">
          <thead>
            <tr className="bg-[#24445A] border-b">
              <th className="py-3 px-14 text-left text-sm font-semibold text-white">
                Nama Lengkap
              </th>
              <th className="py-3 px-14 text-left text-sm font-semibold text-white">
                Jabatan
              </th>
              <th className="py-3 px-14 text-left text-sm font-semibold text-white">
                Fraksi
              </th>
              <th className="py-3 px-14 text-left text-sm font-semibold text-white">
                Mulai
              </th>
              <th className="py-3 px-14 text-left text-sm font-semibold text-white">
                Akhir
              </th>
              <th className="py-3 px-14 text-left text-sm font-semibold text-white">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4 text-sm text-[#24445A] flex items-center text-[20px] font-normal">
                <img
                  src={fotodprd}
                  alt="Foto"
                  className="w-[50px] h-[50px] object-cover rounded-full mr-4"
                />
                Ridwan Kamil
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Ketua DPRD
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Partai Golongan Karya
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                16 September 2013
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                5 September 2018
              </td>
              <td
                className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal cursor-pointer"
                onClick={() => {
                  setOpenDetailAnggota(!openDetailAnggota);
                }}
              >
                Lihat Detail
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-sm text-[#24445A] flex items-center text-[20px] font-normal">
                <img
                  src={fotodprd}
                  alt="Foto"
                  className="w-[50px] h-[50px] object-cover rounded-full mr-4"
                />
                Oded Muhammad Danial
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Ketua DPRD
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Partai Demokrasi Indonesia Perjuangan
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                20 September 2018
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                10 Desember 2021
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Lihat Detail
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-sm text-[#24445A] flex items-center text-[20px] font-normal">
                <img
                  src={fotodprd}
                  alt="Foto"
                  className="w-[50px] h-[50px] object-cover rounded-full mr-4"
                />
                Yana Mulyana
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Ketua DPRD
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Partai Persatuan Pembangunan
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                10 Desember 2021
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                18 April 2022
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Lihat Detail
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-sm text-[#24445A] flex items-center text-[20px] font-normal">
                <img
                  src={fotodprd}
                  alt="Foto"
                  className="w-[50px] h-[50px] object-cover rounded-full mr-4"
                />
                Yana Mulyana
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Ketua DPRD
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Partai Keadilan Sejahtera
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                18 April 2022
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                15 April 2023
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Lihat Detail
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-sm text-[#24445A] flex items-center text-[20px] font-normal">
                <img
                  src={fotodprd}
                  alt="Foto"
                  className="w-[50px] h-[50px] object-cover rounded-full mr-4"
                />
                Ema Sumarna
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Ketua DPRD
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Partai Solidaritas Indonesia
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                15 April 2023
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                20 September 2023
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Lihat Detail
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-sm text-[#24445A] flex items-center text-[20px] font-normal">
                <img
                  src={fotodprd}
                  alt="Foto"
                  className="w-[50px] h-[50px] object-cover rounded-full mr-4"
                />
                Bambang Tirtoyuliono
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Ketua DPRD
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Partai Gerakan Indonesia
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                20 September 2023
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Sekarang
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">
                Lihat Detail
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
      {openDetailAnggota && (
        <div className="animate-fadeIn transition duration-200 ease-in fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="flex flex-col bg-white rounded-[25px] justify-start items-center w-[700px] h-auto mx-[40px] md:mx-0 px-[40px] py-[30px]">
            <div className="flex w-full justify-end mb-[20px] items-start">
              <FontAwesomeIcon
                icon={faClose}
                color="#FFFFFF"
                className={`w-[40px] h-[40px] cursor-pointer transition duration-200 ease-in ${
                  openTable ? "" : "rotate-180"
                } bg-[#CD3838] rounded-[7px]`}
                onClick={() => {
                  setOpenDetailAnggota(!openDetailAnggota);
                }}
              />
            </div>

            <div
              className={`flex items-center rounded-[50px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-auto`}
            >
              <div className="flex flex-col items-center w-[50%] h-[382px] rounded-[50px] bg-white py-[20px] px-[34px]">
                <div className="w-full flex justify-center">
                  <div className="relative w-[146px] h-[146px] bg-white rounded-full border-[5px] border-solid border-secondary">
                    <img
                      src={fotodprd}
                      alt=""
                      className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-[128px] h-[128px] bg-secondary rounded-full border-[4px] border-solid border-secondary"
                    />
                  </div>
                </div>
                <p className="w-full text-secondary text-[16px] text-center break-words font-bold mt-[11px]">
                  Ridwan Kamil
                </p>
                <p className="w-full text-secondary text-[12px] text-center break-words font-regular">
                  Ketua DPRD
                </p>
                <p className="w-full text-secondary text-[12px] text-center break-words font-regular mt-[11px]">
                  Fraksi : Patai Golongan Karya
                </p>
                <p className="w-full text-secondary text-[12px] text-center break-words font-regular">
                  Mulai : 16 September 2013
                </p>
                <p className="w-full text-secondary text-[12px] text-center break-words font-regular">
                  Selesai : 5 September 2018
                </p>
                <a
                  href="https://wa.me/081296735155"
                  className="w-full text-secondary text-[12px] text-center break-words font-regular"
                >
                  Kontak : 081296735155
                </a>
              </div>

              <div
                className={`w-[50%] h-[382px] rounded-[50px] bg-white py-[20px] pr-[34px]`}
              >
                <div className="w-full h-full bg-[#EFEFEF] rounded-[15px] text-secondary text-[12px] p-[18px] overflow-auto mini-scrollbar">
                  <p>
                    Alamat Kantor : HVRW+M8W, Simbula, Kec. Katoi, Kabupaten
                    Kolaka Utara, Sulawesi Tenggara 93957 Adasdasdsda asdasdasd
                    jkkk asd asdasdasd
                  </p>
                  <p className="mt-[10px]">Jabatan Lain : Anggota DPRnya mi</p>
                  <p className="mt-[10px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    dictum non ligula consectetur malesuada. Praesent bibendum
                    eu ipsum vel ullamcorper biam.
                  </p>
                  <p className="mt-[10px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    dictum non ligula consectetur malesuada. Praesent bibendum
                    eu ipsum vel ullamcorper biam.
                  </p>
                  <p className="mt-[10px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    dictum non ligula consectetur malesuada. Praesent bibendum
                    eu ipsum vel ullamcorper biam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-[100px]"></div>

      <Footer />
    </div>
  );
};

export default PemdaLinimasa;
