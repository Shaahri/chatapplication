import { collection, query, where } from "firebase/firestore";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { ThreadType } from "../types";
import useQueryResult from "./useQueryResult";

function useUserThreads() {
    const [user] = useAuthState(auth);

    const threadsQuery = useMemo(() => {
        if (!user) return;
        return query(
            // Get the threads collection
            collection(db, "threads"),
            // Filter the threads where current user is in the userIds array
            where("userIds", "array-contains", user.uid)
        );
    }, [user]);

    // Get the threads data (will keep track of new data)
    const { data, loading, error } = useQueryResult<ThreadType>(threadsQuery);
    
    // Return important data so the UI component can render the screen
    return { threads: data || [], loading, error };
};

export default useUserThreads;