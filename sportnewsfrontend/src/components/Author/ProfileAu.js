import React, { useState, useEffect } from "react";
import "./ProfileAu.scss";
import HomeAu from "./HomeAu";
import Button from "react-bootstrap/Button";
import { connect, useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../services/public";
import { toast } from "react-toastify";
import _ from "lodash";
import { Buffer } from "buffer";
import CommonUtils from "../../utils/CommonUtils";
import * as action from "../../redux/action/usAction";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProfileAu = (props) => {
  const user = useSelector((state) => state.user.userData);
  const dataDefault = {
    fullname: "",
    email: "",
    gender: "",
    birthday: "",
    location: "",
    img_avt: "",
  };

  const checkDefault = {
    fullname: true,
    email: true,
    gender: true,
    birthday: true,
    location: true,
  };

  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(dataDefault);
  const [preview, setPreview] = useState("");
  const [check, setCheck] = useState(checkDefault);

  const displayProfile = async () => {
    let res = await getProfile(id, user.roleID);
    if (res && res.EC === 0) {
      if (res.DT.img_avt) {
        let img = new Buffer(res.DT.img_avt, "base64").toString("binary");
        setPreview(img);
        setUserInfo({ ...res.DT, roleID: user.roleID, img_avt: img });
      } else {
        setUserInfo({ ...res.DT, roleID: user.roleID });
      }
    }
  };

  useEffect(() => {
    displayProfile();
  }, []);

  const handleEdit = (type) => {
    let checkClone = _.cloneDeep(check);
    checkClone[type] = false;
    setCheck(checkClone);
  };

  const handleCancel = async (type) => {
    let res = await getProfile(id, user.roleID),
      _userInfoClone = _.cloneDeep(userInfo),
      checkClone = _.cloneDeep(check);
    if (res && res.EC === 0) {
      _userInfoClone[type] = res.DT[type];
      setUserInfo(_userInfoClone);
      checkClone[type] = true;
      setCheck(checkClone);
    }
  };

  const handleChange = (value, name) => {
    let _userInfoClone = _.cloneDeep(userInfo);
    _userInfoClone[name] = value;
    setUserInfo(_userInfoClone);
  };

  const handleConfirm = async () => {
    const res = await updateProfile(userInfo);
    if (res && res.EC === 0) {
      await displayProfile();
      props.updateRedux(res.DT);
      setCheck(checkDefault);
    } else {
      await displayProfile();
      setCheck(checkDefault);
    }
    const res1 = await updateProfile(userInfo);
    if (res1 && res1.EC === 0) {
      toast.success(res1.EM);
      await displayProfile();
      props.updateRedux(res1.DT);
      setCheck(checkDefault);
    } else {
      toast.error(res1.EM);
      await displayProfile();
      setCheck(checkDefault);
    }
  };

  const handleClose = () => {
    displayProfile();
    setCheck(checkDefault);
    console.log(user);
  };

  const handleImageChange = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file),
        objectUrl = URL.createObjectURL(file);
      setUserInfo({ ...userInfo, img_avt: base64 });
      setPreview(objectUrl);
    }
  };

  return (
    <>
      <HomeAu preview={preview} />

      <div className="profile col-md-10 mt-3">
        <div className="container">
            <h4 className="card-title text-center">Profile</h4>
          <div className="card mb-3 shadow">
            <div className="row g-0">
              <div className="col-md-2">
                <div className="mb-4">
                  <div className="position-relative">
                    <img
                      src={
                        preview
                          ? preview
                          : "https://static-00.iconduck.com/assets.00/profile-user-icon-2048x2048-m41rxkoe.png"
                      }
                      alt="Profile"
                      className="rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e)}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        opacity: 0,
                      }}
                      id="file"
                    />
                    <label htmlFor="file" style={{ cursor: "pointer" }}>
                      <i className="fas fa-camera fa-2x"></i>
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-md-10">
                <div className="card-body">
                  <div class="form-group">
                    <label for="exampleInputPassword1">Fullname:</label>
                    <input
                      value={userInfo.fullname}
                      onChange={(e) => handleChange(e.target.value, "fullname")}
                      disabled={check.fullname}
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Fullname"
                    />
                    <button
                      onClick={
                        check.fullname === true
                          ? () => handleEdit("fullname")
                          : () => handleCancel("fullname")
                      }
                      className={
                        check.fullname === true
                          ? "btn btn-primary"
                          : "btn btn-danger"
                      }
                    >
                      {check.fullname === true ? "Edit" : "Cancel"}
                    </button>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Email:</label>
                    <input
                      value={userInfo.email}
                      onChange={(e) => handleChange(e.target.value, "email")}
                      disabled={check.email}
                      type="email"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Email"
                    />
                    <button
                      onClick={
                        check.email === true
                          ? () => handleEdit("email")
                          : () => handleCancel("email")
                      }
                      className={
                        check.email === true
                          ? "btn btn-primary"
                          : "btn btn-danger"
                      }
                    >
                      {check.email === true ? "Edit" : "Cancel"}
                    </button>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Birthday:</label>
                    <input
                      value={userInfo.birthday}
                      disabled={check.birthday}
                      onChange={(e) => handleChange(e.target.value, "birthday")}
                      type="date"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Date"
                    />
                    <button
                      onClick={
                        check.birthday === true
                          ? () => handleEdit("birthday")
                          : () => handleCancel("birthday")
                      }
                      className={
                        check.birthday === true
                          ? "btn btn-primary"
                          : "btn btn-danger"
                      }
                    >
                      {check.birthday === true ? "Edit" : "Cancel"}
                    </button>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Gender:</label>
                    <select
                      value={userInfo.gender}
                      onChange={(e) => handleChange(e.target.value, "gender")}
                      disabled={check.gender}
                      className="form-select"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <button
                      onClick={
                        check.gender === true
                          ? () => handleEdit("gender")
                          : () => handleCancel("gender")
                      }
                      className={
                        check.gender === true
                          ? "btn btn-primary"
                          : "btn btn-danger"
                      }
                    >
                      {check.gender === true ? "Edit" : "Cancel"}
                    </button>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Location:</label>
                    <input
                      value={userInfo.location}
                      onChange={(e) => handleChange(e.target.value, "location")}
                      disabled={check.location}
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Location"
                    />
                    <button
                      onClick={
                        check.location === true
                          ? () => handleEdit("location")
                          : () => handleCancel("location")
                      }
                      className={
                        check.location === true
                          ? "btn btn-primary"
                          : "btn btn-danger"
                      }
                    >
                      {check.location === true ? "Edit" : "Cancel"}
                    </button>
                  </div>
                  <div className="mt-3 d-flex justify-content-end align-items-center">
                    <button
                      onClick={() => handleConfirm()}
                      className="btn btn-success"
                      style={{ marginRight: "8px" }}
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => handleClose()}
                      className="btn btn-warning"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
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
    updateRedux: (user) => dispatch(action.usUpdateSuccess(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAu);
