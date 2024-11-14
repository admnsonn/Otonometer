import React from 'react'
import {NavLink} from 'react-router-dom'

const ButtonAuth = () => {
  return (
    <div className='hidden gap-[10px] sm:hidden md:hidden xl:flex'>
        {/* Login */}
        <NavLink to={'/Login'}
            className='
            flex 
            bg-secondary 
            hover:bg-third 
            w-[105px] h-[39px] 
            rounded-[10px] 
            text-white 
            items-center justify-center'>
            Masuk</NavLink>
        {/* Register */}
        <NavLink to={'/Register'}
            className='
            flex 
            bg-none 
            hover:bg-third 
            hover:border-third
            w-[105px] h-[39px] 
            rounded-[10px]  
            text-secondary 
            items-center 
            hover:text-white border-2 
            border-secondary justify-center'>
        Register</NavLink>
    </div>
  )
}

export default ButtonAuth