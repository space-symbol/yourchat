import React, {useContext, useState} from "react";
import Img from "../img/img.png";
import {AuthContext} from "../context/AuthContext";
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import {db, storage} from "../firebase";
import {v4 as uuid} from "uuid";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {ChatContext} from "../context/ChatContext";

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);


    const handleSend = async () => {
        if (!img && !text) return
        if (img) {
            const storageRef = ref(storage, `images/userChats/${data.chatId}/${img.name}`);
            await uploadBytesResumable(storageRef, img).then((res) => {
                console.log(res)
                getDownloadURL(res.ref).then(async (downloadURL) => {
                    await updateDoc(doc(db, "chats", data.chatId), {
                        messages: arrayUnion({
                            id: uuid(),
                            text,
                            senderId: currentUser.uid,
                            date: Timestamp.now(),
                            img: downloadURL,
                        }),
                    });
                });
            });

        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,

            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);

    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSend();
    };


    return (
        <div className="input" onKeyDown={handleKey}>
            <textarea
                placeholder="Type something..."
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <div className="send">

                <input
                    type="file"
                    style={{display: "none"}}
                    id="image"
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="image">
                    <img src={Img} alt=""/>
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Input;
