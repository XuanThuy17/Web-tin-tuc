import HomeAu from "./HomeAu";
import "./NewsManage.scss";
import { toast } from "react-toastify";
import { Component, useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { fetchCategoryDetail } from "../../services/public";
import _ from "lodash";
import CommonUtils from "../../utils/CommonUtils";
import moment from "moment";
import { createNewAu, getDetailNew, updateNewAu } from "../../services/author";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { Buffer } from "buffer";
import { useDispatch, useSelector } from 'react-redux';



const mdParser = new MarkdownIt();

const CreateUpdateNews = () => {
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
      content_html: html,
    });
    setCheck(checkDefault);
  };

  const dataDefault = {
    id_author: user && user.userID,
    title: "",
    id_category_detail: "",
    img_title: "",
    content: "",
    content_html: "",
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
    content_html: true,
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
      "content_html",
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

  const handleCreate = async () => {
    let check = validate();
    if (check) {
      let res = "";
      New.existNew === true
        ? (res = await updateNewAu(New))
        : (res = await createNewAu(New));
      if (res && res.EC === 0) {
        toast.success(res.EM);
      } else {
        toast.error(res.EM);
      }
      history.push(`/new-manage-au`);
      setNew(dataDefault);
      setReview("");
    }
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
    history.push(`/new-manage-au`);
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
      <HomeAu />
      <div className="content-new col-10">
        <div className="container">
          <h4>{New.existNew === false ? "Create News" : "Update News"}</h4>
          <div className="row">
            <div className="form-group col-6">
              <label className="text-justify">Title</label>
              <input
                value={New.title}
                onChange={(event) => handleInput(event.target.value, "title")}
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
              <input
                value={New.content_title}
                onChange={(event) =>
                  handleInput(event.target.value, "content_title")
                }
                className={
                  CheckInput.content_title
                    ? "form-control"
                    : "is-invalid form-control"
                }
                type="text"
                id="Content_Title"
                placeholder="Content Title"
                style={{ overflowX: "auto" }}
              />
            </div>
            <div className="form-group col-12 col-sm-6">
              <label className="text-justify">Cagetgory Detail</label>
              <select
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
              />
            </div>
            <div className="form-group col-12 mt-3 d-flex align-items-center justify-content-center">
              <button
                onClick={() => handleCreate()}
                className="btn btn-primary"
                style={{ marginRight: 8 }}
              >
                {New.existNew === false ? "Create" : "Update"}
              </button>
              <button onClick={() => handleCancel()} className="btn btn-danger">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUpdateNews;
