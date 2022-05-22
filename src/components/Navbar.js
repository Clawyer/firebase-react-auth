import React, {useContext} from 'react'
import {UserContext} from '../context/userContext'
import {Link} from "react-router-dom"
import {signOut} from "firebase/auth"
import {useNavigate} from "react-router-dom"
import {auth} from "../firebase-config"

export default function Navbar() {

  const {toggleModals} = useContext(UserContext)
  const navigate = useNavigate()


  const logout = async () => {
    try {
      await signOut(auth)
      navigate('/')
    }
    catch (err) {
      console.dir(err)
      alert("Error can't disconnect, please check your network connection")
      throw new Error
    }
  }


  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        AuthJS
      </Link>
      <div>
        <button onClick={() => toggleModals("signUp")}>Sign Up</button>
        <button onClick={() => toggleModals("signIn")}>Sign In</button>
        <button onClick={logout}>Log Out</button>
      </div>
    </nav>
  );
}
