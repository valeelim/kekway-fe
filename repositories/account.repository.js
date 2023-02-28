import $axios from './axiosClient';

const resource = '/auth/users';
const resourceAccount = '/account';

export default {
    registerAccount(body, config=null) {
        return $axios.post(`${resource}/`, body, config);
    },
    
    getMe(config=null) {
        return $axios.get(`${resource}/me`, config);
    },

    editBackgroundPicture(data, config=null)  {
        return $axios.post(`${resourceAccount}/edit-background-picture/`, data, config);
    },

    getUserByUsername(username, config=null) {
        return $axios.get(`${resourceAccount}/get-user-by-username/${username}`, config);
    },

    uploadProfilePhoto(data, config=null) {
        return $axios.post(`${resourceAccount}/upload-profile-photo/`, data, config)
    },

    editBiodata(data, config=null) {
        return $axios.post(`${resourceAccount}/edit-biodata/`, data, config);
    },

    getUserById(id, config=null) {
        return $axios.get(`${resourceAccount}/get-user-by-id/${id}`, config);
    },

    getUsersBySubstring(config=null) {
        return $axios.get(`${resourceAccount}/get-users-by-substring`, config);
    },

    getCloseFriends(config=null) {
        return $axios.get(`${resourceAccount}/get-close-friend/`, config);
    },

    makeCloseFriend(data, config=null) {
        return $axios.post(`${resourceAccount}/make-close-friend/`, data, config);
    },

    removeCloseFriend(data, config=null) {
        return $axios.post(`${resourceAccount}/remove-close-friend/`, data, config);
    }
}
