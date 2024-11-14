import React, { useEffect, useState } from 'react'
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import back from "../../assets/back.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faClose } from '@fortawesome/free-solid-svg-icons';
import partaiPDIP from "../../assets/pdip.jpg";
import iconuser from "../../assets/megachan.jpg";

const DPR = () => {
  const [openTable, setOpenTable] = useState(null)
  const [openDetailAnggota, setOpenDetailAnggota] = useState(false)
  const [idDPRDetail, setIdDPRDetail] = useState(null);
  const [dataDPR] = useState([
    {
      id: 1,
      namaPartai: 'PDIP',
      alamatPartai: 'Jl. Diponegoro No. 27, Bandung, Jawa Barat, Indonesia 40115',
      logoPartai: partaiPDIP,
    },
    {
        id: 2,
        namaPartai: 'Golkar',
        alamatPartai: 'Jl. Diponegoro No. 27, Bandung, Jawa Barat, Indonesia 40115',
        logoPartai: partaiPDIP,
    },
    {
        id: 3,
        namaPartai: 'Gerindra',
        alamatPartai: 'Jl. Diponegoro No. 27, Bandung, Jawa Barat, Indonesia 40115',
        logoPartai: partaiPDIP,
    },
    {
        id: 4,
        namaPartai: 'NasDem',
        alamatPartai: 'Jl. Diponegoro No. 27, Bandung, Jawa Barat, Indonesia 40115',
        logoPartai: partaiPDIP,
    },
    {
        id: 5,
        namaPartai: 'PKB',
        alamatPartai: 'Jl. Diponegoro No. 27, Bandung, Jawa Barat, Indonesia 40115',
        logoPartai: partaiPDIP,
    },
    {
        id: 6,
        namaPartai: 'PKS',
        alamatPartai: 'Jl. Diponegoro No. 27, Bandung, Jawa Barat, Indonesia 40115',
        logoPartai: partaiPDIP,
    },
    {
        id: 7,
        namaPartai: 'PAN',
        alamatPartai: 'Jl. Diponegoro No. 27, Bandung, Jawa Barat, Indonesia 40115',
        logoPartai: partaiPDIP,
    },
    {
        id: 8,
        namaPartai: 'PPP',
        alamatPartai: 'Jl. Diponegoro No. 27, Bandung, Jawa Barat, Indonesia 40115',
        logoPartai: partaiPDIP,
    },
    {
        id: 9,
        namaPartai: 'Demokrat',
        alamatPartai: 'Jl. Diponegoro No. 27, Bandung, Jawa Barat, Indonesia 40115',
        logoPartai: partaiPDIP,
    },
    {
        id: 10,
        namaPartai: 'Hanura',
        alamatPartai: 'Jl. Diponegoro No. 27, Bandung, Jawa Barat, Indonesia 40115',
        logoPartai: partaiPDIP,
    }
    ])
    
    const [openTableID, setOpenTableID] = useState(null);
    const handleOpenTable = (id) => {
      setOpenTableID(prevID => (prevID== id ? null : id));
    };

    useEffect(() => {
      const storedId = sessionStorage.getItem("idDPRDetail");
      if (storedId !== null) {
        setIdDPRDetail(storedId);
      }
    }, []);
  
    useEffect(() => {
        handleOpenTable(idDPRDetail);
    }, [idDPRDetail]);
  
    useEffect(() => {
      if (idDPRDetail == null) {
        window.scrollTo(0, 0);
      }
  }, []);

    useEffect(() => {
      if (idDPRDetail !== null) {
        const element = document.getElementById(idDPRDetail);
        if (element) {
          const marginTop = 110; // Set your desired margin top value here
          const elementPosition = element.getBoundingClientRect().top + window.scrollY - marginTop;
          window.scrollTo({
              top: elementPosition,
              behavior: "smooth",
          });
          setTimeout(() => {
            sessionStorage.removeItem("idDPRDetail");
          }, 1000); 
      }
      
      }
    }, [idDPRDetail]);
    
  return (
    <div className='flex flex-col items-center w-full h-auto mb-auto '>
      {/* HEADER */}
      <div className="flex flex-col justify-center items-center">
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
      </div>
      <div className="w-full flex justify-between items-center max-w-[1610px] lg:px-[120px] mt-[120px] mb-[80px]">
        <a
          href="/Jelajah-Profil"
          className='w-[50px] h-[50px] transition-transform duration-300 transform hover:scale-110'
        >
          <img
            src={back}
            href="/Jelajah-Profil"
            alt=""
          />
        </a>
        <h1 className="flex text-secondary text-2xl font-bold lg:text-4xl uppercase text-center">
          PERWAKILAN DPR PROVINSI JAWA BARAT
        </h1>
        <div></div>
      </div>
      
      {/* CONTENT */}
      <div className='w-full flex flex-col gap-y-[30px] items-center h-auto mb-[80px] min-h-[1920px] mt-[20px]'>
        {dataDPR?.map((dataCard)=>(
            <div id={dataCard.id} className='w-full max-w-[1610px] h-auto lg:px-[120px]'>
              <div className={`${openTableID== dataCard.id ? "rounded-t-[10px]" : "rounded-[10px]"} flex items-center bg-secondary w-full rounded-t-[10px] px-[40px] py-[20px] text-white justify-between gap-x-[30px] h-auto`}>
                <div className='flex w-[80%] h-full gap-x-[30px] items-center justify-start'>
                  <img src={dataCard.logoPartai} alt="" className="object-cover w-[76px] h-[76px] bg-white rounded-full border-[4px] border-solid border-white"/>
                  <div className='flex flex-col justify-between h-full'>
                    <p className='uppercase font-extrabold text-[24px]'>
                      {dataCard.namaPartai}
                    </p>
                    <p className='text-[16px]'>{dataCard.alamatPartai}</p>
                  </div>
                </div>
                <div className='flex w-[20%] h-full gap-x-[30px] items-center justify-end'>
                  <p className='uppercase font-black text-[32px] text-white'>
                    154 Kursi
                  </p>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    color="#FFFFFF"
                    className={`ml-[20px] w-[30px] h-[40px] cursor-pointer transition duration-200 ease-in ${openTableID== dataCard.id ? "rotate-180":""}`}
                    onClick={()=>{
                      handleOpenTable(dataCard.id)
                    }}
                  />
                </div>
                
              </div>

              <div className={`${openTableID== dataCard.id ? "flex flex-col items-center justify-start w-full h-auto gap-y-[30px] bg-white rounded-b-[10px] border-[1px] p-[40px]" : "hidden"}`}>
                <div className='flex justify-between gap-x-[20px] w-full items-center'>
                  <div className='w-[35%] flex gap-x-[30px] items-center'>
                    <p className='uppercase text-third text-[24px] font-bold'>
                      #1
                    </p>
                    <p className='font-bold text-secondary'>Prof. Dr. Hj. Bunda Diah Permata Megawati Setiawati Soekarnoputri</p>
                  </div>
                  <div className="w-[55%] h-[34px] border-solid border-[1px] rounded-full border-secondary relative overflow-hidden">
                    <div className="bg-secondary h-full rounded-full border-[1px]"
                      style={{
                        width: "100%"
                      }}
                    >
                      <p className="absolute font-bold text-[20px] text-white ml-[20px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        150.000 Suara
                      </p>
                    </div>
                  </div>
                  <p className='w-auto text-secondary cursor-pointer' onClick={()=>{setOpenDetailAnggota(!openDetailAnggota)}}>Lihat Detail</p>
                </div>
                <div className='flex justify-between gap-x-[20px] w-full items-center'>
                  <div className='w-[35%] flex gap-x-[30px] items-center'>
                    <p className='uppercase text-third text-[24px] font-bold'>
                      #2
                    </p>
                    <p className='font-bold text-secondary'>Hj. Muhammad Adam Firaun, S.Kom, M.Kom</p>
                  </div>
                  <div className="w-[55%] h-[34px] border-solid border-[1px] rounded-full border-secondary relative overflow-hidden">
                    <div className="bg-secondary h-full rounded-full border-[1px]"
                      style={{
                        width: "90%"
                      }}
                    >
                      <p className="absolute font-bold text-[20px] text-white ml-[20px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        140.000 Suara
                      </p>
                    </div>
                  </div>
                  <p className='w-auto text-secondary'>Lihat Detail</p>
                </div>
                <div className='flex justify-between gap-x-[20px] w-full items-center'>
                  <div className='w-[35%] flex gap-x-[30px] items-center'>
                    <p className='uppercase text-third text-[24px] font-bold'>
                      #3
                    </p>
                    <p className='font-bold text-secondary'>Andi Muhammad Abdul Wahid, MIPA, S.M</p>
                  </div>
                  <div className="w-[55%] h-[34px] border-solid border-[1px] rounded-full border-secondary relative overflow-hidden">
                    <div className="bg-secondary h-full rounded-full border-[1px]"
                      style={{
                        width: "80%"
                      }}
                    >
                      <p className="absolute font-bold text-[20px] text-white ml-[20px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        130.000 Suara
                      </p>
                    </div>
                  </div>
                  <p className='w-auto text-secondary'>Lihat Detail</p>
                </div>
                <div className='flex justify-between gap-x-[20px] w-full items-center'>
                  <div className='w-[35%] flex gap-x-[30px] items-center'>
                    <p className='uppercase text-third text-[24px] font-bold'>
                      #4
                    </p>
                    <p className='font-bold text-secondary'>Muhammad Andyano Takraw, S.KJ</p>
                  </div>
                  <div className="w-[55%] h-[34px] border-solid border-[1px] rounded-full border-secondary relative overflow-hidden">
                    <div className="bg-secondary h-full rounded-full border-[1px]"
                      style={{
                        width: "70%"
                      }}
                    >
                      <p className="absolute font-bold text-[20px] text-white ml-[20px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        120.000 Suara
                      </p>
                    </div>
                  </div>
                  <p className='w-auto text-secondary'>Lihat Detail</p>
                </div>
              </div>
            </div>
        ))}
        
      </div>
      {
        openDetailAnggota && (
        <div className="animate-fadeIn transition duration-200 ease-in fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10" >
          <div className="flex flex-col bg-white rounded-[25px] justify-start items-center w-[700px] h-auto mx-[40px] md:mx-0 px-[40px] py-[30px]">
            <div className='flex w-full justify-end mb-[20px] items-start'>
              <FontAwesomeIcon
                icon={faClose}
                color="#FFFFFF"
                className={`w-[40px] h-[40px] cursor-pointer transition duration-200 ease-in ${openTable ? "":"rotate-180"} bg-[#CD3838] rounded-[7px]`}
                onClick={()=>{setOpenDetailAnggota(!openDetailAnggota)}}
              />
            </div>
            
            <div className={`flex items-center rounded-[50px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-auto`}>
              <div className="flex flex-col items-center w-[50%] h-[382px] rounded-[50px] bg-white py-[20px] px-[34px]">
                <div className="w-full flex justify-center">
                  <div className="relative w-[146px] h-[146px] bg-white rounded-full border-[5px] border-solid border-secondary">
                  <img src={iconuser} alt="" className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-[128px] h-[128px] bg-secondary rounded-full border-[4px] border-solid border-secondary"/>
                  </div>
                </div>
                <p className="w-full text-secondary text-[16px] text-center break-words font-bold mt-[11px]">
                  Prof. Dr. Hj. Bunda Diah Permata Megawati Setiawati Soekarnoputri
                </p>
                <p className="w-full text-secondary text-[12px] text-center break-words font-regular">
                  Penguasa Partai
                </p>
                <div className="w-[177px] h-auto rounded-[10px] bg-secondary text-center mt-[11px]">
                  <span className=" text-white text-[12px] font-bold">
                    150.000&nbsp;
                  </span> 
                  <span className="font-regular text-[12px] text-white">Suara</span>
                </div>
                <p className="w-full text-secondary text-[12px] text-center break-words font-regular mt-[11px]">
                  Masa Periode : 2019 - 2024
                </p>
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
        )
      }
      
      
    </div>
  )
}

export default DPR
