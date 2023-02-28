import $axios from './axiosClient';

const resource = '/tweet';

export default {
    getAllValidTweets(config=null) {
        return $axios.get(`${resource}/get-all-valid-tweets/`, config);
    },

    createTweet(data, config=null) {
        return $axios.post(`${resource}/create-tweet/`, data, config);
    },

    deleteTweet(data, config=null) {
        return $axios.post(`${resource}/delete-tweet/`, data, config);
    },

    getUserTweets(username, config=null) {
        return $axios.get(`${resource}/get-user-tweets/${username}`, config);
    },

    editTweet(data, config=null) {
        return $axios.post(`${resource}/edit-tweet/`, data, config);
    }
}
