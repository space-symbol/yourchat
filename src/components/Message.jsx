import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  let formatterDate = Intl.DateTimeFormat('ru',{
    weekday: "short",
    day: "numeric",
    month: "short",

  })
  let formatterTime = Intl.DateTimeFormat('ru',{
    hour: "2-digit",
    minute: "2-digit",
  })

  const messageDate = formatterDate.format(message.date.toDate())
  const messageTime = formatterTime.format(message.date.toDate())
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  },[message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message && (message.senderId === currentUser.uid) ? currentUser.photoURL : data.user.photoURL
          }
          alt=""
        />
        <span className="date">{messageDate}</span>
        <span className="time">{messageTime}</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
