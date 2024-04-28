import axios from "../axios";

//user
const registerNewUser = (email, password, fullname) => {
  return axios.post("http://localhost:8080/api/v1/register", {
    email,
    password,
    fullname,
  });
};

const loginUser = (email, password) => {
  return axios.post("http://localhost:8080/api/v1/login", {
    email,
    password
  });
};

//author
const registerNewAuthor = (email, password, fullname) => {
  return axios.post("http://localhost:8080/api/v1/register-au", {
    email,
    password,
    fullname,
  });
};

const loginAuthor = (email, password) => {
  return axios.post("http://localhost:8080/api/v1/login-au", {
    email,
    password
  });
};

//admin
const registerNewAdmin = (email, password, fullname) => {
  return axios.post("http://localhost:8080/api/v1/register-ad", {
    email,
    password,
    fullname,
  });
};

const loginAdmin = (email, password) => {
  return axios.post("http://localhost:8080/api/v1/login-ad", {
    email,
    password
  });
};
export { registerNewUser, loginUser, registerNewAuthor, loginAuthor, registerNewAdmin, loginAdmin, };
