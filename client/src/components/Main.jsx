import React from 'react';
import { Outlet, Link } from "react-router-dom";
import NavigationBar from './NavigationBar';

export default function Main({user}) {
  return (
    <>
    <NavigationBar user={user} />
    <div className="menuDiv">
        <div className="menuContainerLeft">
          <div className='menuOptions'><Link to="/leaderboard">Scores</Link></div>
          <div className='menuOptions'><Link to="/info">Info</Link></div>  
        </div>
        <div className="menuContainerRight">
          <div className='menuOptions'><Link to="/credit">Credit</Link></div>
          <div className='menuOptions'><Link to="/quit">Quit</Link></div>      
        </div>
          <svg className='clickLogo'>
            <Link to="/game">
              <rect className='rectLogo' fill='rgba(0,0,0,0)'/>
            </Link>
          </svg>
        <div className='menuDivLogo'></div>
        <Outlet />   
    </div>
    </>
  )
}
