import React, {useContext, useEffect, useState} from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"
import {ChatContext} from "../context/ChatContext";


const Sidebar = () => {
    const {data} = useContext(ChatContext)
    const [isActive, setIsActive] = useState(false)


    useEffect(() => {
        if (Object.entries(data).toString() && window.innerWidth <= 460) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [data])

    window.addEventListener('resize', () => {
        if (Object.entries(data).toString() && window.innerWidth <= 460) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    })
    return (
        <div className={`${isActive && (window.innerWidth <= 480) ? 'mobile' : ''} sidebar `}>
            <Navbar/>
            <Search/>
            <Chats/>
        </div>
    );
};

export default Sidebar;
