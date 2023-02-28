import AccountRepository from '../repositories/account.repository';

const AccountService = {
    registerAccount(body, config) {
        return new Promise((resolve, reject) => {
            AccountRepository.registerAccount(
                body,
                config,
            )
                .then(({ data }) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    getMe(token, params = null) {
        return new Promise((resolve, reject) => {
            AccountRepository.getMe(token, {
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

    getUserByUsername(token, username, params = null) {
        return new Promise((resolve, reject) => {
            AccountRepository.getUserByUsername(username, {
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

    editBiodata(token, data, params=null) {
        return new Promise((resolve, reject) => {
            AccountRepository.editBiodata(data, {
                headers: {
                    Authorization: token,
                },
                params
            })
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    uploadProfilePhoto(token, data, params=null) {
        return new Promise((resolve, reject) => {
            AccountRepository.uploadProfilePhoto(data, {
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

    getUserById(token, id, params = null) {
        return new Promise((resolve, reject) => {
            AccountRepository.getUserById(id, {
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

    getUsersBySubstring(token, params = null) {
        return new Promise((resolve, reject) => {
            AccountRepository.getUsersBySubstring({
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
    },

    getCloseFriends(token, params = null) {
        return new Promise((resolve, reject) => {
            AccountRepository.getCloseFriends({
                headers: {
                    Authorization: token,
                },
                params
            })
                .then(({ data }) => {
                    // HANDLE RESPONSE FROM API (not neat)
                    const result = []
                    for (const friend in data) {
                        result.push(data[friend].user)
                    }
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    makeCloseFriend(token, data, params = null) {
        return new Promise((resolve, reject) => {
            AccountRepository.makeCloseFriend(data, {
                headers: {
                    Authorization: token
                },
                params
            })
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(data);
                })
        })
    },

    removeCloseFriend(token, data, params = null) {
        return new Promise((resolve, reject) => {
            AccountRepository.removeCloseFriend(data, {
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

export default AccountService;
