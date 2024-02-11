import React from 'react'
import "./HeaderConfigAdmin.css"
import { useMedia } from 'react-use'
import MenuMobileAdmin from '../MenuMobileAdmin/MenuMobileAdmin'
import MenuDesktopAdmin from '../MenuDesktopAdmin/MenuDesktopAdmin'

const HeaderConfigAdmin = ({modalUser, modalUserDesktop, sairSistema}) => {

    const isMobile = useMedia('(max-width: 768px)'); // Altere o valor conforme necessário

    const isDesktop = useMedia ('(min-width: 769px)');
  return (
    <div className='header-config-container'>
        <h1>Curso IDE</h1>

        <nav className='navs-container-admin'>
            {isMobile && <MenuMobileAdmin sairSistema={sairSistema} modalUser={modalUser}/>}

            {isDesktop && <MenuDesktopAdmin sairSistema={sairSistema} modalUserDesktop={modalUserDesktop}/>}

            <button onClick={()=> {sairSistema()}} className='button-sair'>Sair</button>
        </nav>

    </div>
  )
}

export default HeaderConfigAdmin