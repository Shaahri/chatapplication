import { collection, orderBy, Query, query, where } from "firebase/firestore";
import { useMemo } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { MessageType } from "../types";

function useThreadMessages(threadId: string) {
    const messagesQuery = useMemo(() => {
        if (!threadId) return;
        return query<MessageType>(
            // get the messages collection from the thread
            collection(db, "threads", threadId, "messages") as Query<MessageType>,
            //order the messages by timestamp maybe
            orderBy("timestamp", "asc")
        );
    }, [threadId]);

    const [messages, loading, error, snapshot] = useCollectionData<MessageType>(messagesQuery);

    // Return important data so the UI component can render the screen
    return { messages: messages || [], loading, error };
}

export default useThreadMessages;