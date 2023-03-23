import React, { useEffect, useState, useRef, useMemo } from "react";
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { DatabaseModel, MessageType } from "../types";

const ChatBox = () => {
    const [messages, setMessages] = useState<DatabaseModel<MessageType>[]>([]);
    const scroll = useMemo(() => React.createRef<HTMLSpanElement>(), []);

    useEffect(() => {
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt"),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let messages: DatabaseModel<MessageType>[] = [];
            QuerySnapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id } as DatabaseModel<MessageType>);
            });
            setMessages(messages);
        });
        return () => unsubscribe();
    }, []);

    return (
        <main className="chat-box">
            <div className="messages-wrapper">
                {messages?.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
            <span ref={scroll}></span>
            <SendMessage scroll={scroll} />
        </main>
    );
};
export default ChatBox;

