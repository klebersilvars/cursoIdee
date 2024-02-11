import React from 'react'
import './MenuDesktop.css'
import {Link} from 'react-router-dom'

const MenuDesktop = () => {
  return (
    <>
    <Link to="/login" className='link-login'>Login</Link>
    <Link to="/admin" className='link-painel' >Painel administrativo</Link>
    </>
  )
}

export default MenuDesktop