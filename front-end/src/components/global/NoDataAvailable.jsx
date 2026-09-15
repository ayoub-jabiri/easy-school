export default function NoDataAvailable({ message = "No data available." }) {
    return (
        <p className="h-10 flex justify-center items-center text-sm text-slate-500">
            {message}
        </p>
    );
}
