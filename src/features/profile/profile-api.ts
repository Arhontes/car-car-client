import {axiosInstance} from "../../common/api/axios-instance";
import {UpdateProfileDto, UserType} from "../../common/types/profile-types";

export const profileApi = {

    async updateProfile(userId:string,updateProfileDto: UpdateProfileDto){
        const result = await axiosInstance.patch<UserType>(`users/${userId}`, updateProfileDto)
        return result.data
    },

}