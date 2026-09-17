const sizeClasses = {
    sm: "h-7 w-7 text-[10px]",
    md: "h-9 w-9 text-xs",
    lg: "h-16 w-16 text-xl",
};

export default function Avatar({ name, size = "md" }) {
    return (
        <span
            className={`flex shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-600 ${sizeClasses[size]}`}
        >
            {name[0].toUpperCase()}
        </span>
    );
}
