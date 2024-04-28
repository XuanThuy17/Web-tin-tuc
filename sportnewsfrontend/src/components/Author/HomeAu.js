import "./HomeAu.scss";
import logo from "../../assets/img/EA-Sports-Logo-PNG_005.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Buffer } from "buffer";
import * as action from "../../redux/action/usAction";
import { connect, useSelector } from "react-redux";


const HomeAu = (props) => {

  return (
    <>
      <div className="">
        <div class="side-menu col-2">
          <div class="sport-news">
            <div class="logo">
              <Link to="/new-manage-au">
                <img src={logo} alt="" class="logo" />
              </Link>
            </div>
          </div>
          <ul>
            <li>
              <Link to="/new-manage-au">My News</Link>
            </li>
            <li>
              <Link to="/create-new-au">Create News</Link>
            </li>
            <li>
              <Link to={`/profile-au/${props.authorRedux.userID}`}>My Profile</Link>
            </li>
            <li>
              <Link onClick={props.logoutRedux} to="login-au" >Logout</Link>
            </li>
          </ul>
        </div>
        <div class="container-au col-10">
          <div class="header-au">
            <div class="nav">
              <div class="search d-flex align-items-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <button type="submit">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div class="user">
                {props.authentication === true &&
                  props.authorRedux &&
                  props.authorRedux.roleID === 2 && (
                    <img
                      src={
                        props.authorRedux.img_avt
                          ? Buffer(
                              props.authorRedux.img_avt,
                              "base64"
                            ).toString("binary")
                          : "https://static.vecteezy.com/system/resources/thumbnails/007/407/996/small/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg"
                      }
                      alt=""
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authorRedux: state.user.userData,
    authentication: state.user.isLogin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutRedux: () => dispatch(action.usLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeAu);
