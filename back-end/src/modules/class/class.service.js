import Class from "./class.model.js";

export const getClassesService = async (classesLimit, classesToSkip) =>
    await Class.find().limit(classesLimit).skip(classesToSkip);

export const getClassByQuery = async (query) => await Class.findOne(query);

export const registerClassService = async (classData) =>
    await Class.create(classData);
