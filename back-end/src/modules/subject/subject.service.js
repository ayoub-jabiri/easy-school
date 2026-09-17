import Subject from "./subject.model.js";

export const getAllSubjects = async ({ page, limit, search }) => {
    const skip = (page - 1) * limit;

    const filter = {};

    if (search.trim()) {
        const regex = new RegExp(search.trim(), "i");

        filter.title = regex;
    }

    const [subjects, totalSubjects] = await Promise.all([
        Subject.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),

        Subject.countDocuments(filter),
    ]);

    return {
        subjects,
        totalSubjects,
    };
};

export const getSubjectByTitle = async (title) =>
    await Subject.findOne({ title });

export const getSubjectById = async (id) => await Subject.findById(id);

export const createSubject = async (subjectData) =>
    await Subject.create(subjectData);

export const updateSubjectService = async (id, subjectNewTitle) => {
    const subject = await Subject.findById(id);

    subject.title = subjectNewTitle;
    return await subject.save();
};

export const deleteSubjectService = async (id) =>
    await Subject.findByIdAndDelete(id);
