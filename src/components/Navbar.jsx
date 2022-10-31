import React, {useContext} from 'react'
import {signOut} from "firebase/auth"
import {auth} from '../firebase'
import {AuthContext} from '../context/AuthContext'
import {ChatContext} from "../context/ChatContext";
import {ChatsContext} from "../context/ChatsContext";

const Navbar = () => {
    const {currentUser} = useContext(AuthContext)
    const {dispatch} = useContext(ChatContext)
    const {setChats} = useContext(ChatsContext)

    const Out = () => {
        dispatch({type: "RESET_USER"});
        setChats({})
        signOut(auth)

    }
    return (
        <div className='navbar'>
            <span className="logo"><i>Your</i>Chat</span>
            <div className="user">
                <img src={currentUser.photoURL} alt=""/>
                <span>{currentUser.displayName}</span>
                <button onClick={() => Out()}>logout</button>
            </div>
        </div>
    )
}

export default Navbar