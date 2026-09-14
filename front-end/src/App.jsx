import { RouterProvider } from "react-router";
import router from "./routes/router";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "./components/global/ErrorAlert";
import { clearAlerts } from "./store/slices/alert.slice";
import SuccessAlert from "./components/global/SuccessAlert";
import { useEffect } from "react";

function App() {
    const { success, error } = useSelector((state) => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        if (success || error) {
            setTimeout(() => {
                dispatch(clearAlerts());
            }, 3000);
        }
    }, [dispatch, success, error]);

    return (
        <>
            <RouterProvider router={router} />

            {success && <SuccessAlert />}
            {error && <ErrorAlert />}
        </>
    );
}

export default App;
