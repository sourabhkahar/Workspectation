import { http } from '@/api'

export const useUser = () => {
    const getAllUser = (data) => http.get('users', data);
    return {
        getAllUser
    }
}