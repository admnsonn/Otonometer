import React from 'react'
const CardPejabat = (detailCard, iconuser, namaPejabat, jabatan, totalSuara, titleTotalSuara, masaPeriode, kontakPejabat, alamatKantor, jabatanLain, field1, field2, field3) => {
  return (
    <div className={`flex items-center rounded-[50px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-auto ${detailCard ? 'animate-expand' : 'animate-collapse'}`}>
      <div className="flex flex-col items-center w-[347px] h-[382px] rounded-[50px] bg-white py-[20px] px-[34px]">
        <div className="w-full flex justify-end cursor-pointer" 
        onClick={()=>{
          !detailCard
        }}>
          <FontAwesomeIcon
            icon={faArrowRight}
            color="#24445A"
            className={`w-[21px] h-auto transition duration-200 ease-in ${detailCard ? "rotate-180" : ""}`}
          />
        </div>
        <div className="w-full flex justify-center">
          <div className="relative w-[146px] h-[146px] bg-white rounded-full border-[5px] border-solid border-secondary">
          <img src={iconuser} alt="" className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-[128px] h-[128px] bg-secondary rounded-full border-[4px] border-solid border-secondary"/>
          </div>
        </div>
        <p className="w-full text-secondary text-[16px] text-center break-words font-bold mt-[11px]">
            {namaPejabat}
        </p>
        <p className="w-full text-secondary text-[12px] text-center break-words font-regular">
            {jabatan}
        </p>
        <div className="w-[177px] h-auto rounded-[10px] bg-secondary text-center mt-[11px]">
          <span className=" text-white text-[12px] font-bold">
            {totalSuara}&nbsp;
          </span> 
          <span className="font-regular text-[12px] text-white">{titleTotalSuara}</span>
        </div>
        <p className="w-full text-secondary text-[12px] text-center break-words font-regular mt-[11px]">
            {masaPeriode}
        </p>
        <a href="https://wa.me/081296735155" className="w-full text-secondary text-[12px] text-center break-words font-regular">
            {kontakPejabat}
        </a>
      </div>

      <div className={`${openCard2 ? "block animate-fadeIn" : "hidden"} transition duration-200 ease-in w-[347px] h-[382px] rounded-[50px] bg-white py-[20px] pr-[34px]`}>
        <div className="w-full h-full bg-[#EFEFEF] rounded-[15px] text-secondary text-[12px] p-[18px] overflow-auto mini-scrollbar">
          <p>{alamatKantor}</p>
          <p className="mt-[10px]">{jabatanLain}</p>
          <p className="mt-[10px]">{field1}</p>
          <p className="mt-[10px]">{field2}</p>
          <p className="mt-[10px]">{field3}</p>
        </div>
      </div>
    </div>
  )
}

export default CardPejabat