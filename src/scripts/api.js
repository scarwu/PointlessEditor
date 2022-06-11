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

    // Post
    getPostList(payload = {}) {
        return axios({
            url: window.location.origin + '/api/post/getList/:type:'
                .replace(':type:', payload.type),
            method: 'get'
        }).then(successResponse, failureResponse)
    },
    getPostItem(payload = {}) {
        return axios({
            url: window.location.origin + '/api/post/getItem/:url:'
                .replace(':url:', payload.url),
            method: 'get'
        }).then(successResponse, failureResponse)
    },
    createPostItem(payload = {}) {
        return axios({
            type: window.location.origin + '/api/post/createItem/:type:'
                .replace(':type:', payload.type),
            method: 'post',
            data: payload.data
        }).then(successResponse, failureResponse)
    },
    updatePostItem(payload = {}) {
        return axios({
            url: window.location.origin + '/api/post/updateItem/:url:'
                .replace(':url:', payload.url),
            method: 'post',
            data: payload.data
        }).then(successResponse, failureResponse)
    },
    removePostItem(payload = {}) {
        return axios({
            url: window.location.origin + '/api/post/removeItem/:url:'
                .replace(':url:', payload.url),
            method: 'post'
        }).then(successResponse, failureResponse)
    },
    getPostMediaList(payload = {}) {
        return axios({
            url: window.location.origin + '/api/post/getMediaItem/:url:'
                .replace(':url:', payload.url),
            method: 'post',
            headers: {
                'content-type': 'multipart/form-data'
            },
            data: payload.data
        }).then(successResponse, failureResponse)
    },
    uploadPostMediaItem(payload = {}) {
        return axios({
            url: window.location.origin + '/api/post/uploadMediaItem/:url:'
                .replace(':url:', payload.url),
            method: 'post',
            headers: {
                'content-type': 'multipart/form-data'
            },
            data: payload.data
        }).then(successResponse, failureResponse)
    },
    removePostMediaItem(payload = {}) {
        return axios({
            url: window.location.origin + '/api/post/removeMediaItem/:url:/:hash:'
                .replace(':url:', payload.url)
                .replace(':hash:', payload.hash),
            method: 'post'
        }).then(successResponse, failureResponse)
    },

    // Config
    loadConfigItem() {
        return axios({
            url: window.location.origin + '/api/config/loadItem',
            method: 'get'
        }).then(successResponse, failureResponse)
    },
    saveConfigItem(data) {
        return axios({
            url: window.location.origin + '/api/config/saveItem',
            method: 'post',
            data: payload.data
        }).then(successResponse, failureResponse)
    },

    // Theme
    getThemeList() {
        return axios({
            url: window.location.origin + '/api/theme/getList',
            method: 'get'
        }).then(successResponse, failureResponse)
    },
    installThemeItem(payload = {}) {
        return axios({
            url: window.location.origin + '/api/theme/installItem',
            method: 'post',
            data: payload.data
        }).then(successResponse, failureResponse)
    },
    uninstallThemeItem(payload = {}) {
        return axios({
            url: window.location.origin + '/api/theme/uninstallItem/:name:'
                .replace(':name:', payload.name),
            method: 'post'
        }).then(successResponse, failureResponse)
    }
}
