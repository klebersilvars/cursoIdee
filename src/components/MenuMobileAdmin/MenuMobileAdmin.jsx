import React, {useState} from 'react'
import { Popover, Position, Menu, toaster, Button } from 'evergreen-ui'
import { MenuIcon, UserIcon, CrownIcon } from 'evergreen-ui'
import { Link } from 'react-router-dom'
import "./MenuMobileAdmin.css"


const MenuMobileAdmin = ({modalUser}) => {
  

  return (
    <>
      <Popover
        position={Position.BOTTOM_RIGHT}
        content={
          <Menu>
            <Menu.Group textAlign="center" alignItems="center" justifyContent="center">
              <p onClick={()=> {modalUser()}} className='link-login-mobile-admin' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserIcon style={{ marginRight: '5px' }} /> Alunos
              </p>


              <Menu.Divider />

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

export default MenuMobileAdmin


