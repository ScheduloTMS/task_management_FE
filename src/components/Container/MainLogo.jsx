import React from 'react'
import Logo from '../../Assets/Group3.png';
import './mainLogo.css';

const MainLogo = () => {
  return (
    <div className='LoginContainer'>
        <img src={Logo} alt="Schedulo Logo" className="logo" />
        <h1 className="schedulo-title">Schedulo</h1>
    </div>
  )
}

export default MainLogo