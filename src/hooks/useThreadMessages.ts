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
            /**
             * If you hover over the collection function you will see the following:
             * collection(firestore: Firestore, path: string, ...pathSegments: string[])
             * @param path — A slash-separated path to a collection.
             * @param pathSegments Additional path segments to apply relative to the first argument.
             * 
             * This means it will combine the path and pathSegments into a single string
             * and then use that string to get the collection from the database.
             * 
             * So if we pass in the following:
             * collection(db, "threads", threadId, "messages")
             * 
             * It will combine the strings into the following:
             * "threads/{threadId}/messages"
             * 
             * Which in our case would be wrong. We want to get the messages collection.
             * So we need to pass in the following:
             * collection(db, "messages")
             */
            // TODO: Fix this
            collection(db, "threads", threadId, "messages") as Query<MessageType>,
            /**
             * The where function is used to filter the data.
             * We want to filter the messages by the threadId.
             * 
             * If you hover over the where function you will see the following:
             * where(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown): QueryFieldFilterConstraint
             * @param fieldPath — The path to compare (e.g. 'foo' or 'foo.bar').
             * @param opStr — A comparison operator (e.g. '<', '<=', '==', '>=', '>', 'array-contains').
             * @param value — The value for comparison (e.g. 42).
             * 
             * So we need to pass in the following:
             */
            where("threadId", "==", threadId),
            //order the messages by timestamp maybe
            orderBy("timestamp", "asc")
        );
    }, [threadId]);

    const [messages, loading, error, snapshot] = useCollectionData<MessageType>(messagesQuery);

    // Return important data so the UI component can render the screen
    return { messages: messages || [], loading, error };
}

export default useThreadMessages;