import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../store/slices/auth.slice";
import PageLoading from "../global/PageLoading";
import PageError from "../global/PageError";

export default function AppLayout({ children }) {
    const { user, loading, error } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user === null) {
            dispatch(getUserProfile());
        }
    }, []);

    if (loading) {
        return <PageLoading />;
    }

    if (error) {
        return <PageError message={error.message} />;
    }

    return (
        <>
            <h1>Hello World!</h1>
            <main>{children}</main>
        </>
    );
}
