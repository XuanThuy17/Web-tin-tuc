import axios from "../axios";

const fetchNewAd = (id,page,limit) => {
    return axios.get(`http://localhost:8080/api/v1/ad-get-new?page=${page}&&limit=${limit}&&id=${id}`)
}

const fetchAuthorAd = (id,page,limit) => {
    return axios.get(`http://localhost:8080/api/v1/ad-get-author?page=${page}&&limit=${limit}&&id=${id}`)
}

const statusNew = (data) => {
    return axios.put(`http://localhost:8080/api/v1/ad-acp-new`,{...data})
}

const statusAuthor = (data) => {
    return axios.put(`http://localhost:8080/api/v1/ad-acp-author`,{...data})
}

const fetchUserAd = (id,page,limit) => {
    return axios.get(`http://localhost:8080/api/v1/ad-get-user?page=${page}&&limit=${limit}&&id=${id}`)
}

const deleteUserAd = (data) => {
    return axios.delete(`http://localhost:8080/api/v1/ad-delete-user?id=${data.id}`)
}

const getStatistic = (id) => {
    return axios.get(`http://localhost:8080/api/v1/ad-get-statistic?id=${id}`)
}

const getGoodauthor = (id,limit) => {
    return axios.get(`http://localhost:8080/api/v1/ad-get-goodauthor?id=${id}&&limit=${limit}`)
}

export  {
    fetchNewAd,
    fetchAuthorAd,
    statusNew,
    statusAuthor,
    fetchUserAd,
    deleteUserAd,
    getStatistic,
    getGoodauthor
}