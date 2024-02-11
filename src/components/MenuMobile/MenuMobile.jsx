import React from 'react'
import { Popover, Position, Menu, toaster, Button } from 'evergreen-ui'
import { MenuIcon, UserIcon, CrownIcon } from 'evergreen-ui'
import { Link } from 'react-router-dom'
import './MenuMobile.css'


const MenuMobile = () => {
  return (
    <>
      <Popover
        position={Position.BOTTOM_RIGHT}
        content={
          <Menu>
            <Menu.Group textAlign="center" alignItems="center" justifyContent="center">
              <Link className='link-login-mobile' to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserIcon style={{ marginRight: '5px' }} /> Login
              </Link>


              <Menu.Divider />

              <Link className='link-painel-mobile' to="/admin" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CrownIcon style={{ marginRight: '5px' }} /> Painel Admin
              </Link>

            </Menu.Group>

          </Menu>
        }
      >
        <Button
          height={40}
          fontSize={16}
          margin={8}
          padding={10}
          borderRadius={5}
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
          marginRight={16}>

          <MenuIcon />

        </Button>
      </Popover>
    </>

  )
}

export default MenuMobile


