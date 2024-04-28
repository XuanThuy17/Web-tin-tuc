import React from "react";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Author from "./Author";
import Admin from "./Admin";
import Profile from "../components/User/Profile";

import Register from "../components/User/Account/Register";
import Login from "../components/User/Account/Login";
import Home from "../components/User/Home/Home";
import ForgotPass from "../components/User/Account/ForgotPass";
import AllNewsCate from "../components/User/AllNews/AllNewsCate";
import AllNewsCateDetail from "../components/User/AllNews/AllNewsCateDetail";
import AllNewsLastest from "../components/User/AllNews/AllNewsLastest";
import AllNewsLatest from "../components/User/AllNews/AllNewsLatest";
import AllNews from "../components/User/AllNews/AllNews";
import NewsDetail from "../components/User/NewsDetail";
import SearchNews from "../components/User/SearchNews";
import History from "../components/User/History";
import SaveNews from "../components/User/SaveNews";

import RegisterAu from "../components/Author/Account/RegisterAu";
import LoginAu from "../components/Author/Account/LoginAu";

import RegisterAd from "../components/Admin/Account/RegisterAd";
import LoginAd from "../components/Admin/Account/LoginAd";

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App(props) {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/allCate/:id">
            <AllNewsCate />
          </Route>
          <Route path="/allCateDetail/:id">
            <AllNewsCateDetail />
          </Route>
          <Route path="/allLastest">
            <AllNewsLastest />
          </Route>
          <Route path="/allNews">
            <AllNews />
          </Route>
          <Route path="/allLatest">
            <AllNewsLatest />
          </Route>
          <Route path="/detailNews/:id">
            <NewsDetail />
          </Route>
          <Route path="/searchNews/:key">
            <SearchNews />
          </Route>
          {props.authenticationUs === false && (
            <Route path="/login">
              <Login />
            </Route>
          )}
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/forgot-pass">
            <ForgotPass />
          </Route>
          {props.authenticationUs === true &&
            props.userRedux &&
            props.userRedux.roleID === 1 && (
              <Route path="/profile/:id">
                <Profile />
              </Route>
            )}
          {props.authenticationUs === true &&
            props.userRedux &&
            props.userRedux.roleID === 1 && (
              <Route path="/history/:id">
                <History />
              </Route>
            )}
          
          {props.authenticationUs === true &&
            props.userRedux &&
            props.userRedux.roleID === 1 && (
              <Route path="/saveNews/:id">
                <SaveNews />
              </Route>
            )}
          {props.authenticationUs === true &&
            props.userRedux &&
            props.userRedux.roleID === 2 && <Author />}
          {props.authenticationUs === false && (
            <Route path="/login-au">
              <LoginAu />
            </Route>
          )}
          <Route path="/register-au">
            <RegisterAu />
          </Route>
          {props.authenticationUs === true &&
            props.userRedux &&
            props.userRedux.roleID === 3 && <Admin />}
          {props.authenticationUs === false && (
            <Route path="/login-ad">
              <LoginAd />
            </Route>
          )}
          <Route path="/register-ad">
            <RegisterAd />
          </Route>
          <Route path="*">404 not found</Route>
        </Switch>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    userRedux: state.user.userData,
    authenticationUs: state.user.isLogin,
  };
};
export default connect(mapStateToProps)(App);
