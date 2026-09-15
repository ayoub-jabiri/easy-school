export default function Avatar({ name }) {
    return (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
            {name[0].toUpperCase()}
        </span>
    );
}
