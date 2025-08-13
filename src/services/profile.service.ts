import Staff, { IStaff } from "../models/staff.model";

class ProfileService {
  updateUser = async (
    id: string,
    data: Partial<IStaff>
  ): Promise<{ data: IStaff }> => {
    const allowedFields = ["name", "email", "password", "phone", "department"];

    const filteredData = Object.keys(data)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key as keyof IStaff] = data[key as keyof IStaff];
        return obj;
      }, {} as Partial<IStaff>);

    if (Object.keys(filteredData).length === 0) {
      throw new Error("No valid fields provided for update");
    }

    const updatedProfile = await Staff.findByIdAndUpdate(id, filteredData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProfile) {
      throw new Error("User not found");
    }

    return { data: updatedProfile };
  };
  deleteUser = async (id: string) => {
    const deletedProfile = await Staff.deleteOne({ id });
    return deletedProfile;
  };
}

export default new ProfileService();
