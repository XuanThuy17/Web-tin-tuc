import axios from "../axios";

const fetchNewAu = (id,page,limit) => {
    return axios.get(`http://localhost:8080/api/v1/au-get-new?page=${page}&&limit=${limit}&&id=${id}`)
}

const createNewAu = (data) => {
    return axios.post(`http://localhost:8080/api/v1/au-create-new`,{...data})
}

const getDetailNew = (id) =>{
    return axios.get(`http://localhost:8080/api/v1/au-get-detail?id=${id}`)
}

const updateNewAu = (data) => {
    return axios.put(`http://localhost:8080/api/v1/au-update-new`,{...data})
}

const deleteNewAu = (data) => {
    return axios.delete(`http://localhost:8080/api/v1/au-delete-new?id=${data.id}`)
}
export  {
    fetchNewAu,
    createNewAu,
    updateNewAu,
    getDetailNew,
    deleteNewAu
}