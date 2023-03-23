import { Query } from "@firebase/firestore";
import { useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { DatabaseModel } from "../types";

function useQueryResult<T>(query?: Query<any> | null | undefined) {
    const [snapshots, loading, error] = useCollection<T>(query);

    const data = useMemo(() => {
        if (!snapshots) return;
        return snapshots.docs.map<DatabaseModel<T>>((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            };
        });
    }, [snapshots]);

    return { data, loading, error };
}

export default useQueryResult;