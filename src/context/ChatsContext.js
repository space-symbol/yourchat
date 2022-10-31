import {createContext, useContext, useEffect, useState,} from "react";
import {AuthContext} from "./AuthContext";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";

export const ChatsContext = createContext();

export const ChatsContextProvider = ({children}) => {
    const {currentUser} = useContext(AuthContext);
    const [chats, setChats] = useState([]);
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser?.uid &&  getChats();
    }, [currentUser?.uid]);

    return (
        <ChatsContext.Provider value={{chats: chats, setChats: setChats}}>
            {children}
        </ChatsContext.Provider>
    );
};
