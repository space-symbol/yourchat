import React, {useContext, useEffect, useState} from "react";

import Messages from "./Messages";
import Input from "./Input";
import {ChatContext} from "../context/ChatContext";

const Chat = () => {
    const {data} = useContext(ChatContext);
    const [isActive, setIsActive] = useState(false)
    useEffect(()=>{
        if (Object.entries(data).toString()){
            setIsActive(true)
        }
    },[data])
    return (
        <>
            {isActive && <div className="chat">
                <div className="chatInfo">
                    <span>{data.user?.displayName}</span>
                    <div className="chatIcons">
                    </div>
                </div>
                <Messages/>
                <Input/>
            </div>}
        </>

    );
};

export default Chat;
