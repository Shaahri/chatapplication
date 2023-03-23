import { setDoc, doc, serverTimestamp } from "@firebase/firestore";
import { useEffect, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import type { UserType } from "../types";
import useDocumentResult from "./useDocumentResult";

function useOrCreateUser() {
    const [authUser] = useAuthState(auth);

    const userRef = useMemo(() => {
        if (!authUser) return;
        return doc(db, "users", authUser.uid);
    }, [authUser]);

    // Get the threads data (will keep track of new data)
    const { data: user, loading, error } = useDocumentResult<UserType>(userRef);

    useEffect(() => {
        if (!authUser || loading) return;
        // If this user isn't in our db, create him
        if (!user) {
            console.log("User doesn't exist, creating him");
            const docRef = doc(db, "users", authUser.uid);
            setDoc(docRef, {
                createdAt: serverTimestamp(),
                email: authUser.email || undefined,
            });
        }
    }, [authUser, user, loading]);

    // Return important data so the UI component can render the screen
    return { user: user, loading, error };
};

export default useOrCreateUser;