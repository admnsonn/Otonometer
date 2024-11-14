// NavbarLogin.js

import React from 'react';
import { navLink } from '../data/datanya';
import logo from "../assets/logonav.svg";
import userIcon from "../assets/user-icon.png"; 
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

function NavbarLogin() {
    const navgate = useNavigate();

    return (
        <div className='flex justify-between items-center px-[135px] w-full h-[117px] mb-[126px]'>
            <div>
                <img src={logo} alt="loading" className='w-full h-full object-contain' />
            </div>
            <ul>
                <li className='flex gap-x-[25px]'>
                    {navLink.map((item) => {
                        return <Link to={item.id} key={item.id} className='text-secondary'>{item.name}</Link>;
                    })}
                </li>
            </ul>
            {/* Profile button */}
            <div>
                <img 
                    src={userIcon} // Menggunakan gambar user sebagai tombol
                    alt="User"
                    className="cursor-pointer w-[39px] h-[39px] rounded-full"
                    onClick={() => navgate('Profile')} // Navigasi ke halaman profil saat gambar diklik
                />
            </div>
        </div>
    );
}

export default NavbarLogin;
