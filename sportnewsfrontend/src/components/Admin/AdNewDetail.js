import HomeAd from "./HomeAd";
import "../Author/NewsManage.scss";
import logo from "../../assets/img/EA-Sports-Logo-PNG_005.png";
import { toast } from "react-toastify";
import { Component, useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { fetchCategoryDetail } from "../../services/public";
import _ from "lodash";
import CommonUtils from "../../utils/CommonUtils";
import moment from "moment";
import { getDetailNew } from "../../services/author";
import { useDispatch, useSelector } from 'react-redux';

import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { Buffer } from "buffer";
const mdParser = new MarkdownIt();

const AdNewDetail = () => {
  const history = useHistory();
  const { id } = useParams();
  const user = useSelector(state => state.user.userData)
  const [listCategoryDetail, setlistCategoryDetail] = useState([]);
  const [review, setReview] = useState("");
  const getCateDetail = async () => {
    let res = await fetchCategoryDetail();
    if (res && res.EC === 0) {
      setlistCategoryDetail(res.DT);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetailNew(id);
    } else {
      setNew(dataDefault);
      setReview("");
      setCheck(checkDefault);
    }
  }, [id]);

  useEffect(() => {
    getCateDetail();
  }, []);

  const handleEditorChange = ({ html, text }) => {
    setNew({
      ...New,
      content: text,
    });
    setCheck(checkDefault);
  };

  const dataDefault = {
    id_author: user && user.userID,
    title: "",
    id_category_detail: "",
    img_title: "",
    content: "",
    content_title: "",
    date: moment(new Date()).format("YYYY-MM-DD"),
    existNew: false,
  };

  const checkDefault = {
    id_author: true,
    title: true,
    id_category_detail: true,
    img_title: true,
    content: true,
    content_title: true,
  };

  const [New, setNew] = useState(dataDefault);
  const [CheckInput, setCheck] = useState(checkDefault);

  const validate = () => {
    setCheck(checkDefault);
    let check = true;
    let arr = [
      "id_author",
      "title",
      "content_title",
      "id_category_detail",
      "img_title",
    ];
    for (let i = 0; i < arr.length; i++) {
      if (!New[arr[i]]) {
        let _checkInput = _.cloneDeep(checkDefault);
        _checkInput[arr[i]] = false;
        setCheck(_checkInput);
        check = false;
        toast.error("Invalid input!");
        break;
      }
    }
    return check;
  };

  const handleInput = (value, key) => {
    let _New = _.cloneDeep(New);
    _New[key] = value;
    setNew(_New);
    setCheck(checkDefault);
  };

  const handleChangeImg = async (e) => {
    let src = e.target.files,
      file = src[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file),
        objectUrl = URL.createObjectURL(file);
      setNew({ ...New, img_title: base64 });
      setReview(objectUrl);
    }
    setCheck(checkDefault);
  };

  const handleCancel = () => {
    setNew(dataDefault);
    setReview("");
    setCheck(checkDefault);
    history.push(`/new-manage-ad`);
  };

  const fetchDetailNew = async (id) => {
    let res = await getDetailNew(id);
    if (res && res.EC === 0) {
      if (res.DT.img_title) {
        let img = Buffer(res.DT.img_title, "base64").toString("binary");
        setNew({
          ...res.DT,
          img_title: img,
          existNew: true,
        });
        setReview(img);
      } else {
        setNew({ ...res.DT, existNew: true });
      }
    }
  };
  return (
    <>
      <HomeAd />
      <div className="content-new col-10">
        <div className="container">
          <h4> Detail News</h4>
          <div className="row">
            <div className="form-group col-6">
              <label className="text-justify">Title</label>
              <textarea
                disabled={true}
                value={New.title}
                onChange={(event) => handleInput(event.target.value, "title")}
                row={4}
                cols={50}
                type="text"
                className={
                  CheckInput.title ? "form-control" : "is-invalid form-control"
                }
                id="Title"
                placeholder="Title"
              />
            </div>
            <div className="form-group col-6">
              <label className="text-justify">Content Title</label>
              <textarea
                disabled={true}
                value={New.content_title}
                onChange={(event) => handleInput(event.target.value, "content_title")}
                row={4}
                cols={50}
                className={
                  CheckInput.content_title
                    ? "form-control"
                    : "is-invalid form-control"
                }
                type="text"
                id="Content_Title"
                placeholder="Content Title"
              />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label className="text-justify">Cagetgory Detail</label>
              <select
                disabled={true}
                value={New.id_category_detail}
                onChange={(event) =>
                  handleInput(event.target.value, "id_category_detail")
                }
                className={
                  CheckInput.id_category_detail
                    ? "form-select"
                    : "is-invalid form-select"
                }
                id="gender"
                name="gender"
              >
                <option>Choose</option>
                {listCategoryDetail &&
                  listCategoryDetail.length > 0 &&
                  listCategoryDetail.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group col-12 col-sm-6">
              <label className="text-justify">Image title</label>
              <div className="d-flex">
                <span className="btn btn-primary text-white">
                  <label htmlFor="Image" className="text-justify">
                    <i className="fa-solid fa-upload"></i>
                  </label>
                </span>
                <input
                  disabled={true}
                  hidden
                  onChange={(e) => handleChangeImg(e)}
                  id="Image"
                  type="file"
                  className="form-control"
                />
                <div
                  style={{ backgroundImage: `url(${review})` }}
                  className={
                    CheckInput.img_title ? "preview" : "is-invalid preview"
                  }
                ></div>
              </div>
            </div>
            <div className="form-group col-12 mt-2 mb-2">
              <label className="text-justify">Content</label>
              <MdEditor
                value={New.content}
                onChange={(html, text) => handleEditorChange(html, text)}
                style={{ height: "300px" }}
                renderHTML={(text) => mdParser.render(text)}
                readOnly
              />
            </div>
            <div className="form-group col-12 mt-3 d-flex align-items-center justify-content-center">
              <button onClick={() => handleCancel()} className="btn btn-danger">
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdNewDetail;
