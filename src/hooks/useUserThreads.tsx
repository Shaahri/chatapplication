import { collection, Query, query, where } from "firebase/firestore";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { ThreadType } from "../types";

function useUserThreads() {
    const [user] = useAuthState(auth);

    const threadsQuery = useMemo(() => {
        if (!user) return;
        return query<ThreadType>(
            // Get the threads collection
            collection(db, "threads") as Query<ThreadType>,
            // Filter the threads where current user is in the userIds array
            where("userIds", "array-contains", user.uid)
        );
    }, [user]);

    // Get the threads data (will keep track of new data)
    const [threads, loading, error, snapshot] = useCollectionData<ThreadType>(threadsQuery);

    // Return important data so the UI component can render the screen
    return { threads: threads || [], loading, error };
};
export default useUserThreads;