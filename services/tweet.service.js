import TweetRepository from '../repositories/tweet.repository';

const TweetService = {
    getAllValidTweets(token, params=null) {
        return new Promise((resolve, reject) => {
            TweetRepository.getAllValidTweets({
                headers: {
                    Authorization: token,
                },
                params
            })
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    console.log('error here')
                    reject(err);
                })
        })
    },

    createTweet(token, data, params = null) {
        return new Promise((resolve, reject) => {
            TweetRepository.createTweet(data, {
                headers: {
                    Authorization: token,
                },
                params
            })
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    deleteTweet(token, data, params = null) {
        return new Promise((resolve, reject) => {
            TweetRepository.deleteTweet(data, {
                headers: {
                    Authorization: token,
                },
                params
            })
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    getUserTweets(token, id, params=null) {
        return new Promise((resolve, reject) => {
            TweetRepository.getUserTweets(id, {
                headers: {
                    Authorization: token,
                },
                params
            })
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    editTweet(token, data, params=null) {
        return new Promise((resolve, reject) => {
            TweetRepository.editTweet(data, {
                headers: {
                    Authorization: token
                },
                params
            })
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
    
    
}

export default TweetService;
