import React from 'react'
import './Login.css';
import LogoIde from '../../assets/logoide.png'
import ButtonLogarUsuario from '../../components/ButtonLogarUsuario/ButtonLogarUsuario';
import { Link } from 'react-router-dom';


const Login = () => {
  return (
    <div className='login-container'>
        <h1>Área de acesso</h1>
        <div className='img-input-container'>
            <form className='form-container-login'>
                <div className='container-email-login' >
                    <span>E-mail</span>
                    <input 
                        type="text" 
                        className='input-email-login' 
                        placeholder='Digite seu e-mail'
                    />
                </div>

                <div className='container-senha-login' >
                    <span>Senha</span>
                    <input 
                        type="password" 
                        className='input-senha-login'
                        placeholder='*********'
                    />
                </div>

                <ButtonLogarUsuario/>
                <div className='area-link'>
                    <Link to='/' className='link-pagina-inicial'>Voltar a página inicial</Link>
                </div>
            </form>
            <img className='img-logo' src={LogoIde} alt="logo-ide" />
        </div>
    </div>
  )
}

export default Login