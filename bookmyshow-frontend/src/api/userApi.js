import api from "./axios";

export const getProfile = async()=>{

    const response = await api.get(
        "/api/users/profile"
    );

    return response.data;

};