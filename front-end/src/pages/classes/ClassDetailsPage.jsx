import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import PageLoading from "../../components/global/PageLoading";
import PageError from "../../components/global/PageError";
import NoDataAvailable from "../../components/global/NoDataAvailable";

import ClassHeader from "../../components/classes/details/ClassHeader";
import ClassDetailsTabs from "../../components/classes/details/ClassDetailsTabs";

import { getClassById } from "../../store/slices/classes.slice";

export default function ClassDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const {
        data: classData,
        loading,
        error,
    } = useSelector((state) => state.classes.classDetails);
    const {
        teacherAssignmentData: { message: teacherMessage },
        studentRegistrationData: { message: studentMessage },
    } = useSelector((state) => state.classes);

    useEffect(() => {
        dispatch(getClassById(id));
    }, [dispatch, id, teacherMessage, studentMessage]);

    if (loading) {
        return <PageLoading />;
    }

    if (error) {
        return <PageError message={error?.message || error} />;
    }

    if (!classData) {
        return (
            <div className="min-h-screen w-full bg-slate-50 p-6">
                <NoDataAvailable message="No class found." />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-slate-50 p-6">
            <div className="mx-auto max-w-6xl">
                <div className="mb-4 flex items-center gap-1 text-sm text-slate-500">
                    <Link
                        to="/classes"
                        className="transition hover:text-slate-700"
                    >
                        Classes
                    </Link>

                    <ChevronRight className="h-3.5 w-3.5" />

                    <span className="font-medium text-slate-700">
                        Class Details
                    </span>
                </div>

                <ClassHeader classData={classData} />

                <div className="mt-6">
                    <ClassDetailsTabs classId={id} classData={classData} />
                </div>
            </div>
        </div>
    );
}
