import React, {useState} from 'react'
import './Admin.css'
import ButtonLogarUsuario from '../../components/ButtonLogarUsuario/ButtonLogarUsuario'
import {Link, useNavigate} from 'react-router-dom'
import {auth, db} from '../../firebase/Firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'



const Admin = () => {

  const [logado, setLogado] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function logarAdmin(e) {
    e.preventDefault()

    if(email === 'admin@cursoide.com' || email === 'admin@cursoidee.com') {
      await signInWithEmailAndPassword(auth, email, password)
      .then((value)=> {
        //quando ele logar, mostrar notificação
  
        alert('usuário logado')
        setLogado(true)
        navigate('/administrador')
      })
  
      .catch((error)=> {
        alert('ERRO')
        console.log(error)
        setLogado(false)
      })
    }else {
      alert('Erro, você não é admin')
      setEmail('')
      setPassword('')
      return;
    }
    


  }
  return (
    <div className='admin-container'>
      <h1>Administração</h1>

      <section className='box-container-formulario'>
        <form onSubmit={logarAdmin} className='form-container-admin'>
            <div className='container-input-email-admin'>
              <span>E-mail</span>
                <input 
                className='input-email-admin'
                type="email" 
                name="email" 
                id="email"
                value={email}
                placeholder='E-mail@email.com'
                onChange={(e)=> {setEmail(e.target.value)}}
                />
            </div>    

            <div className='container-input-password-admin'>
            <span>Senha</span>
                <input 
                className='input-email-admin'
                type="password" 
                name="senha" 
                id="senha"
                value={password}
                placeholder='*********'
                onChange={(e)=> {setPassword(e.target.value)}}
                />
            </div>

            <div className='container-button-admin'>
                <ButtonLogarUsuario/>

                <Link to="/" className="link-home-admin">Voltar para a home</Link>
            </div>
        </form>
      </section>
    </div>
  )
}

export default Admin