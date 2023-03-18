import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function useUserThreads() {
    const [user] = useAuthState(auth);

    // TODO: Fetch user threads from Firestore where user is a participant

    // TODO: Return user threads
    return { threads: [] };
}

export default useUserThreads;