import axios from "../axios";

const fetchCategory = () => {
    return axios.get('http://localhost:8080/api/v1/get-category')
}
const fetchCategoryDetail = () => {
    return axios.get('http://localhost:8080/api/v1/get-category-detail')
}

const fetchHomeHotNews = () => {
    return axios.get('http://localhost:8080/api/v1/home-hot-news')
}

const fetchHomeLastestNews = () => {
    return axios.get('http://localhost:8080/api/v1/home-lastest-news')
}

const fetchHomeLatestNews = () => {
    return axios.get('http://localhost:8080/api/v1/home-latest-news')
}

const fetchHomeNewsByCategory = (categoryId) => {
    return axios.get(`http://localhost:8080/api/v1/home-news-by-category?id=${categoryId}`)
}

const fetchHomeAllNews = () => {
    return axios.get('http://localhost:8080/api/v1/home-all-news')
}

const fetchGetNewsByCate = (id,page,limit) => {
    return axios.get(`http://localhost:8080/api/v1/get-news-by-category?page=${page}&&limit=${limit}&&id=${id}`)
}

const fetchGetNewsDetail = (id,page,limit) => {
    return axios.get(`http://localhost:8080/api/v1/get-news-by-category-detail?page=${page}&&limit=${limit}&&id=${id}`)
}

const fetchGetLastestNews = (page,limit) => {
    return axios.get(`http://localhost:8080/api/v1/get-lastest-news?page=${page}&&limit=${limit}`)
}

const fetchGetLatestNews = (page,limit) => {
    return axios.get(`http://localhost:8080/api/v1/get-latest-news?page=${page}&&limit=${limit}`)
}

const fetchGetAllNews = (page,limit) => {
    return axios.get(`http://localhost:8080/api/v1/get-all-news?page=${page}&&limit=${limit}`)
}

const getNewsDetail = (id) => {
    return axios.get(`http://localhost:8080/api/v1/get-new-detail?id=${id}`)
}

const searchNews = (key,page,limit) => {
    return axios.get(`http://localhost:8080/api/v1/search-news?page=${page}&&limit=${limit}&&key=${key}`)
}

const historyNews = (data) => {
    return axios.post(`http://localhost:8080/api/v1/history-news`,{...data})
}

const getHistoryNews = (id,page,limit) => {
    return axios.get(`http://localhost:8080/api/v1/get-history-news?page=${page}&&limit=${limit}&&id=${id}`)
}

const saveNews = (data) => {
    return axios.post(`http://localhost:8080/api/v1/save-news`,{...data})
}

const getSaveNews = (id,page,limit) => {
    return axios.get(`http://localhost:8080/api/v1/get-save-news?page=${page}&&limit=${limit}&&id=${id}`)
}

const deleteSaveNews = (data) => {
    return axios.delete(`http://localhost:8080/api/v1/delete-save-news?id=${data.id}`)
}

const checkSaveNews = (id,userID) => {
    return axios.get(`http://localhost:8080/api/v1/check-save-news?id=${id}&&userID=${userID}`)
}

const getProfile = (id,roleID) => {
    return axios.get(`http://localhost:8080/api/v1/get-profile?id=${id}&&roleID=${roleID}`)
}

const updateProfile = async (data) => {
    return axios.put(`http://localhost:8080/api/v1/update-profile`, { ...data});
}

const postComment = (data) => {
    return axios.post(`http://localhost:8080/api/v1/comment-news`,{...data})
}

const getComment = (id) => {
    return axios.get(`http://localhost:8080/api/v1/get-comment?id=${id}`)
}


export  {
    fetchCategory,
    fetchCategoryDetail,
    fetchHomeHotNews,
    fetchHomeLastestNews,
    fetchHomeLatestNews,
    fetchHomeNewsByCategory,
    fetchHomeAllNews,
    fetchGetNewsByCate,
    fetchGetNewsDetail,
    fetchGetLastestNews,
    fetchGetLatestNews,
    fetchGetAllNews,
    getNewsDetail,
    searchNews,
    historyNews,
    getHistoryNews,
    saveNews,
    getSaveNews,
    deleteSaveNews,
    checkSaveNews,
    getProfile,
    updateProfile,
    postComment,
    getComment,
}