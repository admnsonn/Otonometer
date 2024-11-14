import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Header/Navbar'
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import back from "../../assets/back.svg";
import CardPejabat from './cardPejabat';
import { faArrowDown, faArrowDownShortWide, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import iconuser from "../../assets/megachan.jpg";
const AnakanDariAnakanPengelolaDaerah = () => {
    let dataCardPimpinan = [{
        id:1,
        namaJabatan: 'Kepala Divisi 1',
        penjabat: 'Penjabat 1',
        tahunPembentukanDivisi: "1231",
        tahunPenutupanDivisi: "1231",
      },{
        id:2,
        namaJabatan: 'Sekretariat Daerah',
        penjabat: 'H. Timur Tumanggor, S.Sos, M.AP',
        tahunPembentukanDivisi: "1231",
        tahunPenutupanDivisi: "1231",
      },{
        id:3,
        namaJabatan: 'Pejabat (PJ) Bupati',
        penjabat: 'IR. Wiriya Alrahman, MM',
        tahunPembentukanDivisi: "1231",
        tahunPenutupanDivisi: "1231",
      },{
        id:4,
        namaJabatan: 'Wakil Pejabat (PJ) Bupati',
        penjabat: 'IR. Wiriya Alrahman, MM',
        tahunPembentukanDivisi: "1231",
        tahunPenutupanDivisi: "1231",
      }]
    let onSuperVisor = [{
      id:1,
      namaJabatan: 'Kepala Divisi A',
      penjabat: 'Penjabat A',
      tahunPembentukanDivisi: "1231",
      tahunPenutupanDivisi: "1231",
    }]
    let onSelected = [{
      id:1,
      namaJabatan: 'Kepala Sub Bagian X',
      penjabat: 'Penjabat X',
      tahunPembentukanDivisi: "1231",
      tahunPenutupanDivisi: "1231",
    }]
    let StafFunction = []
    let LineFunction = []
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
                <div className='w-[50px] h-[50px] transition-transform duration-300 transform hover:scale-110 cursor-pointer' onClick={()=>{window.history.back()}}>
                  <img src={back} alt='iconBack'/>
                </div>
                <h1 className="text-center flex justify-center items-center text-secondary text-[24px] md:text-[34px] font-bold">
                    Hubungi Layanan Kami
                </h1>
                <div className='w-[50px] h-[50px]'></div>
              </div>
              <div className='w-full flex items-center justify-center max-w-[676px] p-[5px] mt-[25px] gap-x-[20px] text-[12px] cursor-pointer'>
                <div className='w-auto h-auto px-[18px] py-[8px] bg-secondary rounded-[40px] text-white'>Pemadam Kebakaran</div>
                <div className='w-auto h-auto px-[18px] py-[8px] bg-secondary rounded-[40px] text-white'>Pengadilan Negeri</div>
                <div className='w-auto h-auto px-[18px] py-[8px] bg-secondary rounded-[40px] text-white'>Polisi</div>
                <div className='w-auto h-auto px-[18px] py-[8px] bg-secondary rounded-[40px] text-white'>SAR/Basarnas</div>
              </div>

              <div className='flex text-secondary font-bold italic text-[20px] mt-[15px]'>
                Supervisor
              </div>
              
              <div className='flex flex-col w-full max-w-[990px] items-start justify-start'>
                <div className='flex w-full'>
                  <div className='flex w-full items-start justify-start'>
                    <div className='w-full'>
                      {CardPejabat(onSuperVisor)}
                    </div>
                    <div className='w-full max-w-[690px]'>
                      <div className='flex w-full h-auto py-[25px] px-[15px] gap-x-[15px] overflow-scroll mini-scrollbar'>
                        {
                          dataCardPimpinan?.map((dataCard) => (
                            <div className='flex items-center gap-x-[15px]' key={dataCard.id}>
                                <div>
                                  <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    color="#24445A"
                                    className={`w-[15px] h-[20px]`}
                                  />
                                </div>
                                <div className={`relative flex justify-between items-start rounded-[10px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-[286px] h-[71px] p-[5px]`}>
                                    <div className='flex w-auto gap-x-[20px]'>
                                        <img src={iconuser} alt='Profile Penjabat' className='w-[59px] h-[59px] object-cover rounded-[5px] cursor-pointer'
                                        onClick={()=>{}}
                                        />
                                        {/* <div className='w-[59px] h-[59px] object-cover rounded-[5px] bg-black'></div> */}
                                        <div className='flex flex-col'>
                                            <p className='text-secondary text-[12px] font-bold'>{dataCard.penjabat}</p>
                                            <p className='text-secondary text-[10px] font-regular'>{dataCard.namaJabatan}</p>
                                        </div>
                                    </div>
                                    <div className='flex w-auto mt-[5px] cursor-pointer' 
                                      onClick={(e) => {
                                      }}
                                    >
                                          <FontAwesomeIcon
                                          icon={faEllipsisVertical}
                                          color="#24445A"
                                          className="w-[20px] h-[20px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                      </div>
                    </div>
                </div>
                </div>
                <div className='flex w-full px-[25px]'> 
                  <div className="flex w-[286px] items-center justify-center">
                    <FontAwesomeIcon
                      icon={faArrowDown}
                      color="#24445A"
                      className={`w-[15px] h-[20px]`}
                    />
                  </div>
                </div>
              </div>
              <div className='flex w-full max-w-[990px] items-center justify-center'>
                <div className='flex w-full'>
                    {CardPejabat(onSelected)}
                </div>
              </div>
              

              <div className='flex text-secondary font-bold italic text-[20px] mt-[15px]'>
                Staff Function
              </div>
              <div className='flex w-full max-w-[990px] items-center justify-center'>
                <div className='flex w-full'>
                    {CardPejabat(StafFunction)}
                </div>
              </div>

              <div className='flex text-secondary font-bold italic text-[20px] mt-[15px]'>
                Line Function
              </div>
              <div className='flex w-full max-w-[990px] items-center justify-center'>
                <div className='flex w-full'>
                    {CardPejabat(LineFunction)}
                </div>
              </div>
              
          </div>
        <Footer />
    </div>
  )
}

export default AnakanDariAnakanPengelolaDaerah