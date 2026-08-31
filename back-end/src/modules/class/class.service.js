import Class from "./class.model.js";

export const getClassesService = async (classesLimit, classesToSkip) =>
    await Class.find().limit(classesLimit).skip(classesToSkip);
