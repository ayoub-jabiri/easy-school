import Subject from "./subject.model.js";

export const getAllSubjects = async (invoicesLimit, invoicesToSkip) =>
    await Subject.find().limit(invoicesLimit).skip(invoicesToSkip);
