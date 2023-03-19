import { collection, Query, query, where } from "firebase/firestore";
import { useMemo } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { MessageType } from "../types";

function useThreadMessages(threadId: string) {
    const messagesQuery = ;// TODO Implement
    
    const [messages, loading, error, snapshot] = useCollectionData<MessageType>(messagesQuery);
        
    // Return important data so the UI component can render the screen
    return { messages: messages || [], loading, error };
}

export default useThreadMessages;