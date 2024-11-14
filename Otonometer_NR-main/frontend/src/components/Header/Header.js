import React from 'react'

import LogoHeader from './LogoHeader';
import ButtonAuth from './ButtonAuth';
import Navbar from './Navbar';

function Header(){
  return (
    <header className='flex w-full items-center justify-center sticky bg-none my-[30px] xl:gap-x-[210px] flex-wrap md:gap-x-[50px]'>
        <LogoHeader/>
        <Navbar/>
        <ButtonAuth/>
    </header>
  )
}

export default Header;