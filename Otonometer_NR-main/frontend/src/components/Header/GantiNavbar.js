import React, { useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {Menu, X} from "lucide-react"

const NavLinks = () => {
    const navLinkStyles = ({isActive}) =>{
        return{
            fontWeight: isActive? 'bold' : 'regular'
        }
    }
    return(
        <div>
            <NavLink style={navLinkStyles} to={'/'} className={'text-secondary'}>
                Dashboard
            </NavLink>
            <NavLink style={navLinkStyles} to={'/Jelajah'} className={'text-secondary'}>
                Jelajah
            </NavLink>
            <NavLink style={navLinkStyles} to={'/Utak-Atik'} className={'text-secondary'}>
                Utak-Atik
            </NavLink>
            <NavLink style={navLinkStyles} to={'/Berkaca'} className={'text-secondary'}>
                Berkaca
            </NavLink>
            <p>
                Lensa
            </p>
            <NavLink style={navLinkStyles} to={'/Berkaca'} className={'text-secondary'}>
                Profil Daerah
            </NavLink>
        </div>
    )
}
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () =>{
        setIsOpen(!isOpen);
    }
  return (
    <>
        <nav className='w-1/3 text-secondary'>
                {/* <div className='hidden justify-between items-center md:flex'>
                    <div className=''>
                        <button onClick={() => navgate('/')}>
                            <img src={logo} alt="loading" className='w-full h-full object-contain' />
                        </button>
                    </div>
                    <div className='hidden w-full md:flex gap-x-[25px] text-secondary'>
                        <NavLinks/>
                    </div>
                    login-regist button
                    <div className='hidden w-full md:flex gap-[10px] mr-[135px]'>
                        Login
                        <button 
                        onClick={() => navgate('/Login')}
                        className='
                        flex 
                        bg-secondary 
                        hover:bg-third 
                        w-[105px] h-[39px] 
                        rounded-[10px] 
                        text-white 
                        items-center justify-center'>
                            Masuk</button>
                        Register
                        <button 
                        onClick={() => navgate('/Register')}
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
                            Register</button>
                    </div>
                </div> */}
                <div className='flex items-center justify-center '>
                    <div className='hidden sm:hidden md:hidden xl:flex gap-x-[25px] text-secondary '>
                            <NavLinks/>
                    </div>
                </div>
                
                <div className='xl:hidden flex justify-end items-center'>
                    <button onClick={toggleNavbar}>{isOpen?<X/>:<Menu/>}
                    </button>
                </div>
        </nav>
        {isOpen && (
            <div className='flex flex-col justify-center items-end basis-full mt-[20px] mr-[100px] gap-y-[10px] xl:hidden p-auto'>
                <NavLinks/>
            </div>
        )}
    </>
    
    
  );
}

export default Navbar