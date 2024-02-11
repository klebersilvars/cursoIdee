import React from 'react'
import "./Header.css"
import { useMedia } from 'react-use';
import { Link } from 'react-router-dom'
import MenuMobile from '../MenuMobile/MenuMobile'
import MenuDesktop from '../MenuDesktop/MenuDesktop';


const Header = () => {

  const isMobile = useMedia('(max-width: 768px)'); // Altere o valor conforme necessário

  const isDesktop = useMedia ('(min-width: 769px)');
  return (
    <div className='header-container'>
            <h1>CURSO IDE</h1>

            <div className='navs-container'>

              {isMobile && <MenuMobile/>}

              {isDesktop && <MenuDesktop/>}
            </div>
    </div>
  )
}

export default Header