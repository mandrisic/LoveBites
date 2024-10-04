import React from 'react';
import '../css/NavBar.css';
import dog from '../assets/img/ikigai-the-pastry-chef-making-a-three-tiered-cake-1.png';

const NavBar = () => {
  return (
    <div className="navbar-container">
        <div className="navbar">
            <h1 className='navbar-title'>LoveBites</h1>
            <div className="create-icon">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABRUlEQVR4nO2UQU7DMBBFswDWXIDaf7LrCrUqYoNyBBR5Im7AIUBdVeIGnIK20AWnQWLbDYgjgCZxRUhR47Z2JIRHmkVGjt/TeOwkiREjUGRZdmBIjw3htUo9llrSRVwPh4eG9AMTPutZALedwJn0VICG8F4AZwa4KL+hXzqF52lvIPVcqXNnAW60rS2l1XK2JRx6tgZPewP5rgRw41XA1OAGmG+E27XOAolj1OFM+MiBkdQLpU4ZeCvr0DNZ57QhbyFQtR2P3uDbCBT9/pF3uKtAMLiLgMANYdEy7XOB7/TycZsAqXwTXDqzgsvkexcwwMReq7tf4E/SoXKdfYq9CzD0sxW4F4nve47FCu6yz84ChrBcf5B+woMJXKXpiQUupRNyHDITTXgwgUuljkVi333C/NiIKMDxCGjPIWRP+fcEYvy7+AK5mGOrygb74wAAAABJRU5ErkJggg==" />
            </div>
        </div>
        <div className="searchbar">
            <input type="text" placeholder='Find new recipes' />
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABU0lEQVR4nO2UTU7DQAyFu+dnBXQZPydqpV6ihQMgpTOzQHANVLFAFNhwG6pyjhZuUihs+ZFnJkFIlJkpIBDCkjeR48958XOj8SejZN5SwLliXCvGg6QGpho4M0Wx+anmBtAaNNeM5/dSge4Uc3/55own2wy4NETdg2ZzRVLlWU8DIwthPBrOymRZqskN0+GiOsU0cBC63Wu1NqIBonk1eahWM42dXDiNBmjGjZ2eqBuq7efZth9mGg1QoHsL6HRWQ7W77faaA9A8GlDrHwHYL4r1ZIDsvNU1z3qhWsO8kyyRmMi/NArWMl35nzyMBohDxUR+BQcfDHLkTTdLdrU4VEzkGtBYtkX+iU0ri5vcD3Gc1Lz+Es5KMdGiU6EZM2n+ejoSZKpCHCom0sBE1tcfu4k8q2R5e5+WgIRC+ZNRJ3DxD/lNctHJlwMa7uQPv2WjfjReAJ8GujnpKXWWAAAAAElFTkSuQmCC" />
        </div>
        <img className='dog' src={dog} alt="dog cooking" />
    </div>
  )
}

export default NavBar
