import { useEffect, useState } from "react";
import { GraduationCap, User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import InputLoading from "../../components/global/InputLoading";
import { userLogin } from "../../store/slices/auth.slice";
import { setErrorAlert } from "../../store/slices/alert.slice";
import InputError from "../../components/global/InputError";
import { getInputError } from "../../lib/input.errors";

export default function LoginPage() {
    const { loading, error, accessToken } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate, accessToken]);

    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(userLogin(userCredentials));
    };

    useEffect(() => {
        if (error && error.statusCode !== 401) {
            dispatch(setErrorAlert(error.message));
        }
    }, [dispatch, error]);

    const inputErros = error?.errors ? getInputError(error.errors) : {};

    return (
        <div className="flex min-h-screen w-full bg-white">
            <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-20 xl:px-28">
                <div className="mx-auto w-full max-w-sm">
                    <Link to="/" className="flex items-center gap-3  w-fit">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                            <GraduationCap className="h-6 w-6" />
                        </span>
                        <div className="leading-tight">
                            <p className="text-lg font-extrabold tracking-wide text-slate-900">
                                ACADEMIA
                            </p>
                            <p className="text-[10px] font-medium tracking-wider text-slate-400">
                                SCHOOL MANAGEMENT SYSTEM
                            </p>
                        </div>
                    </Link>

                    <h1 className="mt-10 text-lg font-bold text-slate-900">
                        Login to your account
                    </h1>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <div className="relative">
                                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                                    <User className="h-4 w-4" />
                                </span>
                                <input
                                    type="text"
                                    value={userCredentials.email}
                                    onChange={(e) =>
                                        setUserCredentials({
                                            ...userCredentials,
                                            email: e.target.value,
                                        })
                                    }
                                    placeholder="Email"
                                    className="w-full rounded-lg bg-slate-100 py-3 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                                />
                            </div>
                            {inputErros.email && (
                                <InputError message={inputErros.email} />
                            )}
                        </div>

                        <div>
                            <div className="relative">
                                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                                    <Lock className="h-4 w-4" />
                                </span>
                                <input
                                    type="password"
                                    value={userCredentials.password}
                                    onChange={(e) =>
                                        setUserCredentials({
                                            ...userCredentials,
                                            password: e.target.value,
                                        })
                                    }
                                    placeholder="Password"
                                    className="w-full rounded-lg bg-slate-100 py-3 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                                />
                            </div>
                            {inputErros.password && (
                                <InputError message={inputErros.password} />
                            )}
                        </div>

                        <span className="inline-block text-sm text-slate-500">
                            Forget password? Request the school administration
                            to reset your password.
                        </span>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                        >
                            {loading ? <InputLoading /> : "Login"}
                        </button>
                    </form>
                </div>
            </div>

            <div className="relative hidden bg-blue-50 lg:flex lg:w-1/2 lg:items-center lg:justify-center rounded-tl-[900px]">
                <img
                    src="/imgs/login.png"
                    alt="Students studying illustration"
                    className="relative z-10 w-250 max-w-full px-12"
                />
            </div>
        </div>
    );
}
