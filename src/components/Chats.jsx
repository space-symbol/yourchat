import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { ChatsContext } from "../context/ChatsContext";

const Chats = () => {
  const {chats} = useContext(ChatsContext);
  const { dispatch } = useContext(ChatContext);
  console.log(chats)
  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };
  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            {chat[1].lastMessage && <p>{chat[1].lastMessage.text}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
