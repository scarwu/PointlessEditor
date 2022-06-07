import axios from 'axios'

// Override Axios Config
axios.interceptors.request.use(config => {
    config.withCredentials = true

    return config
})

function successResponse (res) {
    return Promise.resolve(res.data)
}

function failureResponse (err) {
    return Promise.reject(err.response.data)
}

export default {

    // Config
    loadConfigItem() {
        return axios({
            url: window.location.origin + '/api/config',
            method: 'get'
        }).then(successResponse, failureResponse)
    },
    saveConfigItem(data) {
        return axios({
            url: window.location.origin + '/api/config/save',
            method: 'post',
            data: data
        }).then(successResponse, failureResponse)
    },

    // Post
    getPostList(data) {
        return axios({
            url: window.location.origin + '/api/post',
            method: 'get',
            params: data
        }).then(successResponse, failureResponse)
    },
    getPostItem(id, data) {
        return axios({
            url: window.location.origin + '/api/post/:id:'.replace(':id:', id),
            method: 'get',
            params: data
        }).then(successResponse, failureResponse)
    },
    createPostItem(data) {
        return axios({
            url: window.location.origin + '/api/post/create',
            method: 'post',
            data: data
        }).then(successResponse, failureResponse)
    },
    updatePostItem(id, data) {
        return axios({
            url: window.location.origin + '/api/post/:id:/update'.replace(':id:', id),
            method: 'post',
            data: data
        }).then(successResponse, failureResponse)
    },
    removePostItem(id, data) {
        return axios({
            url: window.location.origin + '/api/post/:id:/remove'.replace(':id:', id),
            method: 'post',
            data: data
        }).then(successResponse, failureResponse)
    },

    // Theme
    getThemeList() {
        return axios({
            url: window.location.origin + '/api/theme',
            method: 'get'
        }).then(successResponse, failureResponse)
    },
    installThemeItem(data) {
        return axios({
            url: window.location.origin + '/api/theme/install',
            method: 'post',
            data: data
        }).then(successResponse, failureResponse)
    },
    uninstallThemeItem(data) {
        return axios({
            url: window.location.origin + '/api/theme/uninstall',
            method: 'post',
            data: data
        }).then(successResponse, failureResponse)
    }
}
