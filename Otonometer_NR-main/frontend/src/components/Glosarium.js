import React from 'react'
export default function Glosarium() {
  return (
    <>
    <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oleo+Script:wght@400;700&display=swap');
          .oleo-script-regular {
            font-family: "Oleo Script", system-ui;
            font-weight: 400;
            font-style: normal;
          }
        `}
    </style>
    <button className='fixed bottom-5 right-5 bg-secondary w-[60px] h-[60px] rounded-full shadow-lg'>
        <p className='oleo-script-regular text-white text-center text-[24px]'>i</p>
    </button>
    </>
    
  )
  
}
