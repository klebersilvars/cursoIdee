import React, { useState, useEffect } from "react"
import { auth } from "./firebase/Firebase"
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate, useNavigate } from "react-router-dom";

//crio a usestate para verificar se tem usuário logado ou se está carregando

export default function Private({ children }) {

    const [loading, setLoading] = useState(true)
    const [logado, setLogado] = useState(false)

    useEffect(() => {
        async function checkLogin() {

            //nessa função abaixo vou verificar se tem usuário logado ou não
            const sub = onAuthStateChanged(auth, (user) => {

                //aqui estou verificando as informações do usuário
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }
                    //guardando as informações do usuário logado no localstorage
                    localStorage.setItem('@detalheAdmin', JSON.stringify(userData))
                    setLoading(false)
                    setLogado(true)
                } else { //se não tiver usuário logado cai aqui
                    setLoading(false)
                    setLogado(false)
                }
            })

        }
        checkLogin()
    }, [])

    //fazendo verificações que se estiver carregando, vou mostrar somente uma div na tela vazia
    if (loading) {
        return (
            <div></div>
        )
    }

    //verificando que se ele não estiver logado, vai ser jogado para a página principal
    if (!logado) {
        return (
            <Navigate to="/admin" />
        )
    }

    return children
}