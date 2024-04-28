import "../Author/HomeAu.scss";
import logo from "../../assets/img/EA-Sports-Logo-PNG_005.png";
import { Link, NavLink } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import { Buffer } from "buffer";
import * as action from "../../redux/action/usAction";

const HomeAd = (props) =>{
    return(
        <div className="">
        <div class="side-menu col-2">
          <div class="sport-news">
            <div class="logo">
              <Link to="/new-manage-ad">
                <img src={logo} alt="" class="logo" />
              </Link>
            </div>
          </div>
          <ul>
            <li>
             <Link to="/new-manage-ad">List News All</Link>
            </li>
            <li>
              <Link to="/author-manage-ad">List Author</Link>
            </li>
            <li>
              <Link to="/user-manage-ad">List User</Link>
            </li>
            <li>
              <Link to="/statistic">Statistics</Link>
            </li>
            <li>
              <Link to="/">Advertisment</Link>
            </li>
            <li>
              <Link onClick={props.logoutRedux} to="/login-ad">Logout</Link>
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
                props.adminRedux &&
                props.adminRedux.roleID === 3 && (
                  <img
                    src={
                      props.adminRedux.img_avt
                        ? Buffer(props.adminRedux.img_avt, "base64").toString(
                            "binary"
                          )
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
    );
}
const mapStateToProps = (state) => {
  return {
    adminRedux: state.user.userData,
    authentication: state.user.isLogin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutRedux: () => dispatch(action.usLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeAd);