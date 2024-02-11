import React, { useState, useEffect } from 'react'
import "./ConfigAdmin.css"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

import HeaderConfigAdmin from '../../components/HeaderConfigAdmin/HeaderConfigAdmin'
import LogoIdee from '../../assets/logoide.png'
import { db, auth } from '../../firebase/Firebase'
import { signOut, onAuthStateChanged, onIdTokenChanged, getAuth, updateProfile } from 'firebase/auth'
import { getDocs, collection, deleteDoc, doc, updateDoc, query, where, onSnapshot } from 'firebase/firestore'


const ConfigAdmin = ({ modalUser, modalUserDesktop, sairSistema }) => {
  const [LogoIde, setLogoIde] = useState(true)
  const [ControleUsuario, setControleUsuario] = useState(false)
  const [users, setUsers] = useState([])
  const [userLogado, setUserLogado] = useState(false)
  const [detalheUserLogado, setDetalheUserLogado] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedUser, setSelectedUser] = useState(null);
  const auth = getAuth()



  useEffect(() => {

    async function checkLogin() {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserLogado(true)
          setDetalheUserLogado({
            uid: user.uid,
            email: user.email
          })
          localStorage.setItem('@userLogado', JSON.stringify(detalheUserLogado))
        } else {
          setUserLogado(false)
          setDetalheUserLogado({})
        }

      })
    }

    checkLogin()

    async function loadUser() {
      const response = collection(db, "usuarios")
      await getDocs(response)

        .then((snapshot) => {
          let lista = []

          snapshot.forEach((doc) => {
            lista.push({
              uid: doc.data().uid,
              nome: doc.data().nome,
              email: doc.data().email,
              data_nascimento: doc.data().data_nascimento,
              endereco: doc.data().endereco,
              cep: doc.data().cep,
              complemento: doc.data().complemento,
              cpf: doc.data().cpf,
              rg: doc.data().rg,
              senha: doc.data().senha,
              mensalidade: doc.data().mensalidade
            })
          }) //fechamento foreach

          console.log(lista)
          setUsers(lista)
        }).catch((error) => {
          console.log(error)
        })

    }

    loadUser()

  }, [])

  function modalUser() {
    setLogoIde(false)
    setControleUsuario(true)
  }

  function modalUserDesktop() {
    setLogoIde(false)
    setControleUsuario(true)
  }

  function fecharModalUser() {
    setControleUsuario(false)
    setLogoIde(true)
  }


  //function de sair do sistema
  async function sairSistema() {
    await signOut(auth)
      .then(() => {
        alert("Usuário deslogado com sucesso")
        localStorage.removeItem('@detalheAdmin')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function excluirAluno(selectedUser) {
    try {
      // Obtém a referência do documento a ser excluído
      const queryRef = query(collection(db, 'usuarios'), where('uid', '==', selectedUser.uid));

      // Realiza a consulta
      const querySnapshot = await getDocs(queryRef);

      // Verifica se existe algum documento retornado pela consulta
      if (!querySnapshot.empty) {
        // Exclui o primeiro documento retornado pela consulta
        await deleteDoc(querySnapshot.docs[0].ref);
        console.log('Documento excluído com sucesso');
      } else {
        console.log('Nenhum documento encontrado para excluir');
      }
    } catch (error) {
      console.error('Erro ao excluir documento:', error.message);
    }
  }


  async function pagamentoAutorizado(selectedUser) {
    const usuariosRef = collection(db, 'usuarios');
    const q = query(usuariosRef, where('uid', '==', selectedUser.uid));

    //trazendo os documentos e percorrendo eles para trocar as coisas
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, { mensalidade: true })
        .then(() => {
          console.log('Atualização realizada com sucesso');
        })
        .catch((error) => {
          console.error('Erro ao atualizar documento:', error);
        });
    });
  }

  async function pagamentoNegado(selectedUser) {
    const usuariosRef = collection(db, 'usuarios');
    const q = query(usuariosRef, where('uid', '==', selectedUser.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, { mensalidade: false })
          .then(() => {
            console.log('Atualização realizada com sucesso, pagamento negado');
          })
          .catch((error) => {
            console.error('Erro ao atualizar documento:', error);
          });
      });
    });
  }

  //crio uma query para pesquisar todos os documentos que são iguais ao id que eu to passando
  //assim eu consigo excluir do banco de dados do firestore

  return (
    <div className='config-container'>
      <HeaderConfigAdmin sairSistema={sairSistema} modalUser={modalUser} modalUserDesktop={modalUserDesktop} LogoIde={LogoIde} />

      <main className='main'>

        {LogoIde &&
          <img className='logo-ide-container-config' src={LogoIdee} alt="logo-ide" />
        }

        {ControleUsuario &&

          <section className='modal-container-user'>
            <div className='nav-title-container'>
              <h4>Alunos matriculados</h4>

              <button onClick={fecharModalUser}>X</button>
            </div>
            <hr />

            <div className='table-container-user'>
              <TableContainer>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th textAlign="center">Nome</Th>
                      <Th textAlign="center">Email</Th>
                      <Th textAlign="center">Ações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {users.map((profile) => {
                      return (
                        <Tr width="100%" key={profile.uid}>
                          <Td textAlign="center">{profile.nome}</Td>
                          <Td textAlign="center">{profile.email}</Td>
                          <Td textAlign="center"> <Button onClick={() => {
                            setSelectedUser(profile);
                            onOpen();
                          }}>Infos</Button> -  </Td>


                          <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent sx={{ width: "90%", maxWidth: "700px" }}>
                              <ModalHeader> Infos do aluno:  {selectedUser?.uid}</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <p>Nome: {selectedUser?.nome}</p>
                                <p>E-mail: {selectedUser?.email}</p>
                                <p>Nascimento: {selectedUser?.data_nascimento}</p>
                                <p>Cpf: {selectedUser?.cpf}</p>
                                <p>Rg: {selectedUser?.rg}</p>
                                <p>Endereço: {selectedUser?.endereco}</p>
                                <p>CEP: {selectedUser?.cep}</p>
                                <p>Complemento: {selectedUser?.complemento}</p>
                                {
                                  selectedUser?.mensalidade &&
                                  <p className='mensalidade-paga'>Mensalidade paga</p>
                                }

                                {
                                  !selectedUser?.mensalidade &&
                                  <p className='mensalidade-atrasada'>Pagamento não realizado</p>
                                }

                              </ModalBody>

                              <ModalFooter>
                                <Button onClick={() => { pagamentoAutorizado(selectedUser) }} colorScheme='green' mr={3} >Efetuar pagamento</Button>
                                <Button onClick={() => { pagamentoNegado(selectedUser) }} colorScheme='red' mr={3} >Retirar pagamento</Button>
                                <Button onClick={() => { excluirAluno(selectedUser) }} colorScheme='red' mr={3} >Excluir aluno</Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                        </Tr>
                      )
                    })}

                  </Tbody>
                </Table>
              </TableContainer>
            </div>

          </section>

        }
      </main>


    </div>
  )
}

export default ConfigAdmin