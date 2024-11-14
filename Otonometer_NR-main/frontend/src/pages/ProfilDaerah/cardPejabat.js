import React, { useEffect, useRef, useState } from 'react'
import { faClose, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import iconuser from "../../assets/nullpic.jpg";
const CardPejabat = (data) => {
  // const [openCardId, setOpenCardId] = useState(null);
  const [scrolling, setScrolling] = useState(false);
  useEffect(()=>{
    if (data.length > 3){
      setScrolling(true)
    }else{
      setScrolling(false)
    }
  },[data])

  const [socialMedia, setSocialMedia] = useState([])
  const [openOptionCardId, setOpenOptionCardId] = useState(null);
  const ref = useRef();
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
        setOpenOptionCardId(false);
    }
  };
  useEffect(() => {
    if (openOptionCardId) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openOptionCardId]);

  // const tabsBoxRef = useRef(null);
  // const [isDragging, setIsDragging] = useState(false);
  // const [scrollVal, setScrollVal] = useState(0);
  // const handleMouseMove = (e) => {
  //   if (!isDragging) return;
  //   const tabsBox = tabsBoxRef.current;
  //   tabsBox.classList.add("dragging");
  //   tabsBox.scrollLeft -= e.movementX;
  //   setScrollVal(tabsBox.scrollLeft);
  // };
  // const handleMouseDown = () => setIsDragging(true);
  // const handleMouseUp = () => {
  //   setIsDragging(false);
  //   const tabsBox = tabsBoxRef.current;
  //   tabsBox.classList.remove("dragging");
  // };
  // useEffect(() => {
  //   const tabsBox = tabsBoxRef.current;
  //   document.addEventListener("mouseup", handleMouseUp);
  //   return () => {
  //     document.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, []);
  const [isDragging, setIsDragging] = useState(false);
  const scrollContainerRef = useRef(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    if (!scrolling) return; // Disable dragging if scrolling is false
    setIsDragging(true);
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    document.body.style.cursor = 'grabbing';
    // document.body.style.userSelect = 'none'; // Disable text selection
  };

  const handleMouseLeave = () => {
    if (!scrolling) return;
    setIsDragging(false);
    document.body.style.cursor = 'default';
    // document.body.style.userSelect = 'auto'; // Re-enable text selection
  };

  const handleMouseUp = () => {
    if (!scrolling) return;
    setIsDragging(false);
    document.body.style.cursor = 'default';
    // document.body.style.userSelect = 'auto'; // Re-enable text selection
  };

  const handleMouseMove = (e) => {
    if (!scrolling || !isDragging) return; // Disable dragging if scrolling is false or not dragging
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX.current; // Horizontal movement
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };
  /// AKSI DETAIL
  const [openDetailAnggota, setOpenDetailAnggota] = useState(false)
  return (
    <div className={`flex w-full h-auto p-[25px] gap-x-[45px] ${scrolling ? 'overflow-scroll mini-scrollbar cursor-grab' : ''} items-center`}
    ref={scrollContainerRef}
    onMouseDown={handleMouseDown}
    onMouseLeave={handleMouseLeave}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}
    >
      {data.length > 0 ? (
        data?.map((dataCard) => (
            <div key={dataCard.id}>
                <div className={`relative flex justify-between items-start  rounded-[10px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-[286px] h-[71px] p-[5px]`}>
                    <div className='flex w-auto gap-x-[20px]'>
                        <img src={dataCard?.pejabat?.length > 0 && dataCard?.pejabat?.[0]?.profile?.photo ? `http://development.otonometer.com:9999/photo/${dataCard?.pejabat?.[0]?.profile?.photo}` : iconuser} alt="" className='w-[59px] h-[59px] object-cover rounded-[5px] cursor-pointer'
                          onClick={() => { 
                            if (window.location.pathname === '/ProfilDaerah-Main'){
                              return null;
                            }else{
                              if (dataCard.parent === null) {
                                window.location.href = `/ProfilDaerah-Main/Detail`;
                              } else {
                                if (window.location.pathname === "/ProfilDaerah-Main/Detail") {
                                  window.location.href = `/ProfilDaerah-Main/Detail/${dataCard.id}`;
                                } else {
                                  window.location.href = `${dataCard.id}`;
                                }
                              }
                            }
                          }}
                        />
                        {/* <div className='w-[59px] h-[59px] object-cover rounded-[5px] bg-black'></div> */}
                        <div className='flex flex-col'>
                            <p className='text-secondary text-[12px] font-bold'>{dataCard?.pejabat?.[0]?.profile?.nama || 'Nama tidak tersedia'}</p>
                            <p className='text-secondary text-[10px] font-regular'>{dataCard?.nama || 'Jabatan tidak tersedia'}</p>
                        </div>
                    </div>
                    <div className='flex w-auto mt-[5px] cursor-pointer' 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenOptionCardId(openOptionCardId === dataCard.id ? null : dataCard.id);
                        setSocialMedia(dataCard?.pejabat?.[0]?.profile?.social_media)
                      }}
                    >
                          <FontAwesomeIcon
                          icon={faEllipsisVertical}
                          color="#24445A"
                          className="w-[20px] h-[20px]"
                        />
                    </div>
                    {/* OPTION CARD */}
                    {openOptionCardId === dataCard.id && (
                        <div ref={ref} className='w-auto h-auto drop-shadow-[0_0_5px_rgba(0,0,0,0.15)] rounded-[12px] absolute bg-white z-20 text-[14px] right-[10px] text-secondary'>
                          <p className='py-[10px] px-[20px] cursor-pointer hover:bg-third rounded-[10px]' 
                              onClick={() => {
                                setOpenDetailAnggota(openDetailAnggota === dataCard.id ? null : dataCard.id)
                              }}>Lihat Detail</p>
                          <p className='py-[10px] px-[20px] cursor-pointer hover:bg-third rounded-[10px]'
                          onClick={() => {
                            window.location.href = `/ProfilDaerah-Main/Linimasa/${dataCard.id}`
                          }}
                          >Lini Masa</p>
                        </div>
                    )}
                </div>
                {/* DETAIL CARD */}
                {openDetailAnggota === dataCard.id && (
                      <div className="animate-fadeIn transition duration-200 ease-in fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10" >
                        <div className="flex flex-col bg-white rounded-[25px] justify-start items-center w-[700px] h-auto mx-[40px] md:mx-0 px-[40px] py-[30px]">
                        <div className="w-full flex justify-between items-center">
                          <div className="flex w-[40px]">
                            <div className="w-[40px]"></div>
                          </div>
                          <p className="w-full text-center text-[36px] font-bold text-secondary uppercase">
                            {dataCard?.nama || 'Jabatan tidak tersedia'}
                          </p>
                          <div className="flex w-[40px]">
                            <FontAwesomeIcon
                              icon={faClose}
                              color="#FFFFFF"
                              className={`w-[40px] h-[40px] cursor-pointer transition duration-200 ease-in bg-[#CD3838] rounded-[7px]`}
                              onClick={() => {
                                setOpenDetailAnggota(!openDetailAnggota);
                              }}
                            />
                          </div>
                        </div>
                          <div className={`flex items-center rounded-[50px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-full`}>
                            <div className="flex flex-col justify-center items-center w-[50%] h-[382px] rounded-[50px] bg-white py-[20px] px-[34px]">
                              <div className="w-full flex justify-center">
                                <div className="relative w-[146px] h-[146px] bg-white rounded-full border-[5px] border-solid border-secondary">
                                <img src={dataCard?.pejabat?.length > 0 && dataCard?.pejabat?.[0]?.profile?.photo ? `http://development.otonometer.com:9999/photo/${dataCard?.pejabat?.[0]?.profile?.photo}` : iconuser} alt="" className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-[128px] h-[128px] bg-secondary rounded-full border-[4px] border-solid border-secondary"
                                  
                                />
                                </div>
                              </div>
                              <p className="w-full text-secondary text-[16px] text-center break-words font-bold mt-[11px]">
                                {dataCard?.pejabat?.[0]?.profile?.nama || 'Nama tidak tersedia'}
                              </p>
                              <div className="w-[177px] h-[5px] rounded-[10px] bg-secondary text-center mt-[11px] min-h-[5px]:">
                              </div>
                              <p className="w-full text-secondary text-[12px] text-center break-words font-regular mt-[11px]">
                                Masa Periode : {dataCard?.pejabat?.[0]?.tanggal_mulai?.substring(0, 4)} - {dataCard?.pejabat?.[0]?.tanggal_berakhir || 'Sekarang'}
                              </p>
                              <a href={`https://wa.me/${dataCard?.pejabat?.[0]?.profile?.no_handphone || '-'}`} className="w-full text-secondary text-[12px] text-center break-words font-regular">
                                Kontak : {dataCard?.pejabat?.[0]?.profile?.no_handphone || '-'}
                              </a>
                              <p className="w-full text-secondary text-[12px] text-center break-words font-regular">
                                {dataCard?.pejabat?.[0]?.profile?.email || '-'}
                              </p>
                            </div>

                            <div className={`w-[50%] h-[382px] rounded-[50px] bg-white py-[20px] pr-[34px]`}>
                              <div className="w-full h-full bg-[#EFEFEF] rounded-[15px] text-secondary text-[12px] p-[18px] overflow-auto mini-scrollbar">
                                <p>Alamat Kantor : {dataCard?.pejabat?.[0]?.profile?.alamat_kantor || '-'}</p>
                                <p>Sosial Media :{socialMedia ? '' : '-'}</p>
                                {console.log(dataCard?.pejabat?.[0]?.profile?.social_media[0])}
                                {socialMedia?.map((dataSosmed) => (
                                  <p>{dataSosmed.nama || '-'} <span>: {dataSosmed.username}</span></p>
                                ))}
                                <p className="mt-[10px]">{dataCard?.pejabat?.[0]?.profile?.info_tambahan_1}</p>
                                <p className="mt-[10px]">{dataCard?.pejabat?.[0]?.profile?.info_tambahan_2}</p>
                                <p className="mt-[10px]">{dataCard?.pejabat?.[0]?.profile?.info_tambahan_3}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                )}
            </div>
        ))
      ):(
        <div className='flex w-full items-center justify-center text-secondary text-center text-[12px]'>Tidak ada</div>
      )}
    </div>
  )
}

export default CardPejabat