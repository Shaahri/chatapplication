import { DocumentReference } from "@firebase/firestore";
import { useMemo } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { DatabaseModel } from "../types";

function useDocumentResult<T>(docRef?: DocumentReference<any> | null | undefined) {
    const [snapshot, loading, error] = useDocument<T>(docRef);

    const data = useMemo(() => {
        if (!snapshot) return;
        return {
            ...snapshot.data(),
            id: snapshot.id,
        } as DatabaseModel<T>;
    }, [snapshot]);

    return { data, loading, error };
}

export default useDocumentResult;