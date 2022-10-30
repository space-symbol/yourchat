import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {AuthContextProvider} from "./context/AuthContext";
import {ChatContextProvider} from "./context/ChatContext";
import {ChatsContextProvider} from "./context/ChatsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContextProvider>
        <ChatContextProvider>
            <ChatsContextProvider>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </ChatsContextProvider>
        </ChatContextProvider>
    </AuthContextProvider>
);
