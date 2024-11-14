import React, { useState, useEffect, useRef } from "react";
import "../../style/Switchbtn.css";
import "../../style/Components.css";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faArrowRight, faCaretDown, faChevronDown, faSearch, faEllipsisV, faClose } from "@fortawesome/free-solid-svg-icons";
import back from "../../assets/back.svg";
import fotowalikota from "../../assets/walikota.svg";
import iconuser from "../../assets/megachan.jpg";

const PemdaLinimasa = () => {
  const [openDetailAnggota, setOpenDetailAnggota] = useState(false);
  const [openTable, setOpenTable] = useState(false);
  return (
    <div>
      <img src={geometry} alt="" className="md:hidden lg:block hidden fixed w-full top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10 opacity-10 object-cover" />
      <img src={geometrys} alt="" className="hidden md:block lg:hidden fixed w-full top-[40%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover" />
      <img src={geometryss} alt="" className="block md:hidden lg:hidden fixed w-full top-[5%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover" />
      <div className="flex flex-col mt-[50px] mb-[15px]">
        <div className="flex flex-col md:flex-row lg:flex-row items-center mt-2 md:mt-[100px] lg:mt-[100px] md:ml-[100px] md:ml-[100px]">
          <a href="/PemdaLengkap" className="mr-4 md:mr-4 md:mt-0 md:mt-2 relative">
            <img src={back} alt="Back" className="w-[30px] md:w-[30px] lg:w-auto transition-transform duration-300 transform hover:scale-110" />
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center mt-2 md:mt-5 lg:mt-[20px]">
        <h1 className="text-[#24445A] text-2xl text-center mt-5 mb-2 font-bold lg:text-4xl lg:mt-0 lg:mb-5 ">
          Lini Masa Wali Kota
          <br />
          Kota Bandung
        </h1>
        <h1 className="hidden lg:block text-secondary text-2xl text-center mt-5 mb-2 font-bold lg:text-4xl lg:mt-0 lg:mb-5"></h1>
      </div>
      {/* Tambahakan sebuah tabel di sini yang berisi 5 kolom */}
      <div className="flex justify-center mt-5 px-4">
        <table className="bg-white border border-gray-200 rounded-md shadow-lg custom-table-width">
          <thead>
            <tr className="bg-[#24445A] border-b">
              <th className="py-3 px-14 text-left text-sm font-semibold text-white">Nama Lengkap</th>
              <th className="py-3 px-14 text-left text-sm font-semibold text-white">Jabatan</th>
              <th className="py-3 px-14 text-left text-sm font-semibold text-white">Mulai</th>
              <th className="py-3 px-14 text-left text-sm font-semibold text-white">Akhir</th>
              <th className="py-3 px-14 text-left text-sm font-semibold text-white"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4 text-sm text-[#24445A] flex items-center text-[20px] font-normal">
                <img src={fotowalikota} alt="Foto" className="w-[50px] h-[50px] object-cover rounded-full mr-4" />
                Ridwan Kamil
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">Wali Kota</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">16 September 2013</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">5 September 2018</td>
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
                <img src={fotowalikota} alt="Foto" className="w-[50px] h-[50px] object-cover rounded-full mr-4" />
                Oded Muhammad Danial
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">Wali Kota</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">20 September 2018</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">10 Desember 2021</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">Lihat Detail</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-sm text-[#24445A] flex items-center text-[20px] font-normal">
                <img src={fotowalikota} alt="Foto" className="w-[50px] h-[50px] object-cover rounded-full mr-4" />
                Yana Mulyana
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">Pelaksana Tugas</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">10 Desember 2021</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">18 April 2022</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">Lihat Detail</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-sm text-[#24445A] flex items-center text-[20px] font-normal">
                <img src={fotowalikota} alt="Foto" className="w-[50px] h-[50px] object-cover rounded-full mr-4" />
                Yana Mulyana
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">Wali Kota</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">18 April 2022</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">15 April 2023</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">Lihat Detail</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-sm text-[#24445A] flex items-center text-[20px] font-normal">
                <img src={fotowalikota} alt="Foto" className="w-[50px] h-[50px] object-cover rounded-full mr-4" />
                Ema Sumarna
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">Pelaksana Harian</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">15 April 2023</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">20 September 2023</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">Lihat Detail</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-sm text-[#24445A] flex items-center text-[20px] font-normal">
                <img src={fotowalikota} alt="Foto" className="w-[50px] h-[50px] object-cover rounded-full mr-4" />
                Bambang Tirtoyuliono
              </td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">Penjabat Sementara</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">20 September 2023</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">Sekarang</td>
              <td className="py-3 px-4 text-sm text-[#24445A] text-[20px] font-normal">Lihat Detail</td>
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
                className={`w-[40px] h-[40px] cursor-pointer transition duration-200 ease-in ${openTable ? "" : "rotate-180"} bg-[#CD3838] rounded-[7px]`}
                onClick={() => {
                  setOpenDetailAnggota(!openDetailAnggota);
                }}
              />
            </div>

            <div className={`flex items-center rounded-[50px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-auto`}>
              <div className="flex flex-col items-center w-[50%] h-[382px] rounded-[50px] bg-white py-[20px] px-[34px]">
                <div className="w-full flex justify-center">
                  <div className="relative w-[146px] h-[146px] bg-white rounded-full border-[5px] border-solid border-secondary">
                    <img src={fotowalikota} alt="" className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-[128px] h-[128px] bg-secondary rounded-full border-[4px] border-solid border-secondary" />
                  </div>
                </div>
                <p className="w-full text-secondary text-[16px] text-center break-words font-bold mt-[11px]">Ridwan Kamil</p>
                <p className="w-full text-secondary text-[12px] text-center break-words font-regular">Wali Kota</p>
                <div className="w-[177px] h-auto rounded-[10px] bg-secondary text-center mt-[11px]"></div>
                <p className="w-full text-secondary text-[12px] text-center break-words font-regular mt-[11px]">Mulai : 16 September 2013</p>
                <p className="w-full text-secondary text-[12px] text-center break-words font-regular">Selesai : 5 September 2018</p>
                <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
                  Kontak : 081296735155
                </a>
              </div>

              <div className={`w-[50%] h-[382px] rounded-[50px] bg-white py-[20px] pr-[34px]`}>
                <div className="w-full h-full bg-[#EFEFEF] rounded-[15px] text-secondary text-[12px] p-[18px] overflow-auto mini-scrollbar">
                  <p>Alamat Kantor : HVRW+M8W, Simbula, Kec. Katoi, Kabupaten Kolaka Utara, Sulawesi Tenggara 93957 Adasdasdsda asdasdasd jkkk asd asdasdasd</p>
                  <p className="mt-[10px]">Jabatan Lain : Anggota DPRnya mi</p>
                  <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
                  <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
                  <p className="mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum non ligula consectetur malesuada. Praesent bibendum eu ipsum vel ullamcorper biam.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PemdaLinimasa;
