import { collection, orderBy, Query, query, where } from "firebase/firestore";
import { useMemo } from "react";
import { db } from "../firebase";
import { MessageType } from "../types";
import useQueryResult from "./useQueryResult";

function useThreadMessages(threadId: string) {
    const messagesQuery = useMemo(() => {
        if (!threadId) return;
        return query<MessageType>(
            collection(db, "threads") as Query<MessageType>,
            where("threadId", "==", threadId),
            orderBy("timestamp", "asc")
        );
    }, [threadId]);

    const { data, loading, error } = useQueryResult<MessageType>(messagesQuery);

    // Return important data so the UI component can render the screen
    return { messages: data || [], loading, error };
}

export default useThreadMessages;