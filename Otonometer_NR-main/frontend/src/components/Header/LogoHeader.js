import React from 'react'
import logo from "../../assets/logonav.svg"
import {useNavigate, NavLink} from 'react-router-dom'
const LogoHeader = () => {
  const navgate = useNavigate;
  return (
    <div className='logo'>
        <NavLink onClick={() => navgate('/')}>
            <img src={logo} alt="loading" className='w-full h-full' />
        </NavLink>
    </div>
  )
}

export default LogoHeader