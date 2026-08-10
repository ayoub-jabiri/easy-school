import Subject from "./subject.model.js";

export const getAllSubjects = async (invoicesLimit, invoicesToSkip) =>
    await Subject.find().limit(invoicesLimit).skip(invoicesToSkip);

export const getSubjectByTitle = async (title) =>
    await Subject.findOne({ title });

export const createSubject = async (subjectData) =>
    await Subject.create(subjectData);
