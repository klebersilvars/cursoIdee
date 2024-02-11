import React, { useState, useEffect } from 'react';
import "./SectionInput.css";
import ButtonCadastrarDados from '../ButtonCadastrarDados/ButtonCadastrarDados';
import InputMask from 'react-input-mask'
import { db, auth } from '../../firebase/Firebase';
import { addDoc, collection } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import LogoIde from '../../assets/logoide.png'

import { ToastContainer, toast } from 'react-toastify';



const SectionInput = () => {

  const handleUserCreation = async () => {
    try {
      //cadastrando no auth do firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha)
      const createdUser = userCredential.user;
      const userData = {
        uid: createdUser.uid,
        email: createdUser.email,
      };

      localStorage.setItem('@detalheUsuario', JSON.stringify(userData));
      setUser(userData);


       // cadastrnado no banco de dados
      const docRef = await addDoc(collection(db, 'usuarios'), {
        nome: name,
        email: createdUser?.email,
        senha: senha,
        data_nascimento: nascimento,
        cpf: cpf,
        rg: rg,
        cep: cep,
        endereco: endereco,
        complemento: complemento,
        uid: createdUser?.uid,
        mensalidade: false,
      })

      .then(()=> {
        // Adiciona um toast de sucesso
      toast.success('Usuário criado com sucesso!', {
        position: "top-right",
        autoClose: 1000, // Fecha automaticamente após 3 segundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setName("")
      setEmail("")
      setCpf("")
      setNascimento("")
      setEndereco("")
      setSenha("")
      setComplemento("")
      setCep("")
      setRg("")
      })

    } catch (error) {
      alert(error)

      if(error.code === 'auth/weak-password') {
        toast.error('Sua senha está fraca, cadastre novamente', {
          position: "top-right",
          autoClose: 2000, // Fecha automaticamente após 1 segundo
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSenha("")
      }else if(error.code === 'auth/email-already-in-use') {
        toast.error('E-mail já está sendo utilizado, tente outro!', {
          position: "top-right",
          autoClose: 2000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }else {
        toast.error('Erro ao cadastrar o usuário, tente novamente mais tarde!', {
          position: "top-right",
          autoClose: 2000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (name && email && cpf && rg && senha && nascimento && cep && endereco) {
      handleUserCreation();
    } else {
      alert('Preencha o formulário corretamente');
    }
  };

  const [name, setName] = useState("");
  const [user, setUser] = useState({})
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("")
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [userIdDoc, setuserIdDoc] = useState("")


  return (

    <div className='sectionInput-container'>
      <div className='text-container-ide'>

        <img src={LogoIde} className='logo-ide-principal' alt="img-logo-ide" />
        <h1>Instituto Teológico IDE</h1>
        <p>Projetado para aqueles que buscam uma compreensão mais profunda da fé, nosso curso oferece uma jornada envolvente pelos fundamentos da teologia.</p>
      </div>

      <section className='container-inputs-ide'>
        <div className='container-title-cadastro'>
          <h1>Cadastre-se em nosso curso!</h1>
        </div>

        <form onSubmit={handleSubmitForm} className='form-container'>
          <div className="container-nome">
            <span>Digite seu nome completo *</span>
            <input
              type="text"
              placeholder='Nome completo'
              className='input-nome'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='container-senha'>
            <span>Digite sua senha *</span>
            <input
              type="password"
              placeholder='*******'
              className='input-senha'
              value={senha}
              required
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="container-email">
            <span>Digite seu e-mail *</span>
            <input
              type="email"
              placeholder='teste@gmail.com'
              className='input-email'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="container-cpf">
            <span>Digite seu CPF * </span>
            <InputMask
              type="text"
              mask="999.999.999-99"
              maskChar={null}
              placeholder='999.999.999-99'
              className='input-cpf'
              value={cpf}
              required
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className="container-rg">
            <span>Digite seu RG * </span>
            <InputMask
              type="text"
              mask="99.999.999-9"
              maskChar={null}
              placeholder='29.629.722-9'
              className='input-rg'
              value={rg}
              required
              onChange={(e) => setRg(e.target.value)}
            />
          </div>

          <div className="container-nascimento">
            <span>Digite sua data de nascimento *</span>
            <InputMask
              type="text"
              mask="99/99/9999"
              maskChar={null}
              placeholder='17/12/2003'
              className='input-nascimento'
              value={nascimento}
              required
              onChange={(e) => setNascimento(e.target.value)}
            />
          </div>

          <div className="container-enderecos">

            <div className='container-filho-endereco'>
              <div className='container-cep'>
                <span>Digite seu CEP *</span>
                <InputMask
                  type="text"
                  mask="99999-999"
                  maskChar={null}
                  placeholder='21831-250'
                  className='input-cep'
                  value={cep}
                  required
                  onChange={(e) => setCep(e.target.value)}
                />
              </div>

              <div className='container-endereco-proprio'>
                <span>Digite seu endereço * </span>
                <input
                  type="text"
                  placeholder='Rua São Gabinio'
                  className='input-endereco'
                  value={endereco}
                  required
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </div>
            </div>

            <div className='container-button'>
              <div className='container-complemento'>
                <span>Digite seu Complemento</span>
                <input
                  type="text"
                  placeholder='Campo dos afonsos'
                  className='input-complemento'
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </div>
              <ButtonCadastrarDados />
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}

export default SectionInput