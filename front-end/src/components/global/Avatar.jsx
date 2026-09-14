export default function Avatar({ name }) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");
    return (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
            {initials}
        </span>
    );
}
