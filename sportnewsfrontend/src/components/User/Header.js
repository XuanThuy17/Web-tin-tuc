import React, { useState, useEffect } from "react";
import logo from "../../assets/img/EA-Sports-Logo-PNG_005.png";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { Buffer } from "buffer";
import * as action from "../../redux/action/usAction";
import { fetchCategory, fetchCategoryDetail } from "../../services/public";
import { useHistory, useParams } from "react-router-dom";

const Header = (props) => {
  const history = useHistory();
  const user = useSelector((state) => state.user.userData);
  const [categories, setCategories] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [key, setKey] = useState();

  const changeValue = (e) => {
    setKey(e.target.value);
  };

  const search = () => {
    history.push(`/searchNews/${key}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await fetchCategory();
        const detailResponse = await fetchCategoryDetail();
        if (categoryResponse.EC === 0 && detailResponse.EC === 0) {
          setCategories(categoryResponse.DT);
          setCategoryDetails(detailResponse.DT);
        } else {
          console.error("Error fetching data:", categoryResponse.EM);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleMouseEnter = (categoryId) => {
    setHoveredCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="logo">
            <Link to="/home">
              <img src={logo} alt="" className="logo" />
            </Link>
          </div>
          <div className="list-navbar">
            <ul className="dropdown1">
              <li>
                <NavLink activeClassName="active" to="/home" exact={true}>
                  <i className="fa-solid fa-house-chimney"></i>
                </NavLink>
              </li>

              {categories.map((category) => (
                <>
                  {category.id !== 5 && (
                    <li
                      key={category.id}
                      className="dropdown-li1"
                      onMouseEnter={() => handleMouseEnter(category.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <NavLink
                        activeClassName="active dropdown-link1"
                        to={`/allCate/${category.id}`}
                      >
                        {category.name}
                      </NavLink>
                      {hoveredCategory === category.id && (
                        <div className="dropdown2">
                          <ul>
                            {categoryDetails
                              .filter(
                                (detail) => detail.id_category === category.id
                              )
                              .map((detail) => (
                                <li key={detail.id}>
                                  <Link
                                    className="dropdown-link2"
                                    to={`/allCateDetail/${detail.id}`}
                                  >
                                    {detail.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  )}
                </>
              ))}

              <li className="dropdown-li1">
                <p className="dropdown-link1">
                  <i className="fa-solid fa-bars"></i>
                </p>
                <div className="dropdown2 option">
                  {categories.map((category) => (
                    <>
                      {category.id !== 5 && (
                        <div className="option-item" key={category.id}>
                          <NavLink
                            activeclassname="active dropdown-link1"
                            to={`/allCate/${category.id}`}
                          >
                            {category.name}
                          </NavLink>
                          <ul>
                            {categoryDetails
                              .filter(
                                (detail) => detail.id_category === category.id
                              )
                              .map((detail) => (
                                <li key={detail.id}>
                                  <Link
                                    className="dropdown-link2"
                                    to={`/allCateDetail/${detail.id}`}
                                  >
                                    {detail.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          <div className="account">
            <ul>
              <li>
                <div className="d-flex align-items-center">
                  <input
                    type="search"
                    placeholder="Search"
                    onChange={(e) => changeValue(e)}
                  />
                  <button onClick={() => search()}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </li>
              {props.authentication === true &&
              props.userRedux &&
              props.userRedux.roleID === 1 ? (
                <li>
                  <img
                    src={
                       props.userRedux.img_avt
                        ? Buffer(props.userRedux.img_avt, "base64").toString("binary")
                        : "https://static.vecteezy.com/system/resources/thumbnails/007/407/996/small/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg"
                    }
                    alt=""
                  />
                  <ul>
                    <li>
                      <Link to={`/profile/${props.userRedux.userID}`}>
                        <i className="fa-solid fa-user-pen"></i> My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to={`/history/${props.userRedux.userID}`}>
                        <i className="fa-solid fa-clock-rotate-left"></i>{" "}
                        History
                      </Link>
                    </li>
                    <li>
                      <Link to={`/saveNews/${props.userRedux.userID}`}>
                        <i class="fa-regular fa-floppy-disk"></i> Save News
                      </Link>
                    </li>
                    <li>
                      <Link onClick={props.logoutRedux} to="/home">
                        <i className="fa-solid fa-right-from-bracket"></i>{" "}
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="account-item">
                    <i className="fa-solid fa-user"></i>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userRedux: state.user.userData,
    authentication: state.user.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutRedux: () => dispatch(action.usLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
