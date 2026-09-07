import { getUserByIdService } from "../users/user.service.js";
import Guardian from "./guardian.model.js";

export const getGuardiansService = async (guardiansLimit, guardiansToSkip) =>
    await Guardian.find()
        .sort({ createdAt: -1 })
        .limit(guardiansLimit)
        .skip(guardiansToSkip);

export const getGuardianByQuery = async (query) =>
    await Guardian.findOne(query);

export const getGuardianByIdService = async (guardianId) =>
    await Guardian.findById(guardianId);

export const registerGuardianService = async (guardianData) =>
    await Guardian.create(guardianData);

export const updateGuardianService = async (guardianId, guardianData) => {
    const guardian = await getGuardianByIdService(guardianId);

    guardian.studentId = guardianData.studentId;
    guardian.parentId = guardianData.parentId;

    return await guardian.save();
};

export const deleteGuardianService = async (guardianId) =>
    await Guardian.findByIdAndDelete(guardianId);

export const getGuardianStudentService = async (guardianId) => {
    const guardian = await getGuardianByIdService(guardianId);

    return await getUserByIdService(guardian.studentId);
};

export const getGuardianParentService = async (guardianId) => {
    const guardian = await getGuardianByIdService(guardianId);

    return await getUserByIdService(guardian.parentId);
};
