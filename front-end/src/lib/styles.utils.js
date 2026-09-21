export const getGradeBadgeStyle = (score) => {
    if (score >= 14) return "bg-emerald-100 text-emerald-700";
    if (score >= 10) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
};

export const getLetterGrade = (score) => {
    if (score >= 16) return "A";
    if (score >= 14) return "B";
    if (score >= 12) return "C";
    if (score >= 10) return "D";
    return "F";
};
