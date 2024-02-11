import React from 'react'
import './MenuDesktopAdmin.css'
import {Link} from 'react-router-dom'

const MenuDesktopAdmin = ({modalUserDesktop}) => {
  return (
    <>
    <div className='button-alunos-admin-container'>
      <h3 onClick={()=> {modalUserDesktop()}} className='button-alunos-admin'>Alunos</h3>
    </div>
    </>
  )
}

export default MenuDesktopAdmin