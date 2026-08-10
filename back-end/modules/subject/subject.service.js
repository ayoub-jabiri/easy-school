import Subject from "./subject.model.js";

export const getAllSubjects = async (invoicesLimit, invoicesToSkip) =>
    await Subject.find().limit(invoicesLimit).skip(invoicesToSkip);

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
