import Footer from "../User/Footer";
import Header from "../User/Header";
import ScrollToTop from "./ScrollToTop";
import ads1 from "../../assets/img/down.png";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getNewsDetail,
  fetchGetNewsDetail,
  historyNews,
  checkSaveNews,
  saveNews,
  deleteSaveNews,
  postComment,
  getComment,
} from "../../services/public";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import { Buffer } from "buffer";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import "./NewsDetail.scss";

const NewsDetail = () => {
  const formatDate = (date) => {
    let dateNow = date.split("-"),
      format = `${dateNow[2]}.${dateNow[1]}.${dateNow[0]}`;
    return format;
  };
  const { id } = useParams();
  const user = useSelector((state) => state.user.userData);
  const [detailNews, setDetailNews] = useState({});
  const [isSaved, setIsSaved] = useState(false);


  const checkSaved = async () => {
    if (user && detailNews && detailNews.id) {
      try {
        const res = await checkSaveNews(detailNews.id, user.userID);
        if (res && res.EC===0) {
          setIsSaved(true);
        } 
        if(res && res.EC===1) {
          setIsSaved(false);
        }
      } catch (error) {
        console.error("Error checking saved news:", error.message);
      }
    }
  };

  useEffect(() => {
      checkSaved();
  }, []);
    
  const historySave = async (userID) => {
    if (detailNews) {
      try {
        let res = await historyNews({ id_new: id, id_account: userID });
        if (res && res.EC === 0) {
          // toast.success(res.EM);
        } else {
          // toast.error(res.EM);
        }
      } catch (error) {
        console.error("Error saving history:", error.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      historySave(user.userID);
    }
  }, [user]);

  const displayNews = async (id) => {
    let res = await getNewsDetail(id);
    if (res && res.EC === 0) {
      setDetailNews(res.DT);
    }
  };

  useEffect(() => {
    if (id) {
      displayNews(id);
    } else {
      setDetailNews([]);
    }
  }, [id]);


  const [relative, setRelative] = useState([]);

  const relativeNews = async (relativeId) => {
    let data = await fetchGetNewsDetail(relativeId);
    if (data && data.EC === 0) {
      setRelative(data.DT);
    }
  };

  useEffect(() => {
    if (detailNews) {
      relativeNews(detailNews.id_category_detail);
    }
  }, [detailNews]);


  // useEffect(() => {
  //   const checkSaved = async () => {
  //     if (user && detailNews && detailNews.id) {
  //       try {
  //         const res = await checkSaveNews(detailNews.id, user.userID);
  //         if (res && res.EC===0) {
  //           setIsSaved(true);
  //         } 
  //         if(res && res.EC===1) {
  //           setIsSaved(false);
  //         }
  //       } catch (error) {
  //         console.error("Error checking saved news:", error.message);
  //       }
  //     }
  //   };
  //   checkSaved();
    
  // }, []);

  const handleSave = async () => {
    if (isSaved) {
      // Tin đã được lưu, xóa khỏi danh sách
      try {
        const res = await deleteSaveNews({
          id: detailNews.id,
        });
        if (res && res.EC === 0) {
          toast.success(res.EM);
          setIsSaved(false);
        } else {
          toast.error(res.EM);
        }
      } catch (error) {
        console.error("Error deleting saved news:", error.message);
      }
    } else {
      // Tin chưa được lưu, thêm vào danh sách
      try {
        const res = await saveNews({
          id_new: detailNews.id,
          id_account: user.userID,
        });
        if (res && res.EC === 0) {
          toast.success(res.EM);
          setIsSaved(true);
        } else {
          toast.error(res.EM);
        }
      } catch (error) {
        console.error("Error saving news:", error.message);
      }
    }
  };
  const [comment, setComment] = useState(null);

  const changeInputCmt = (event) => {
    setComment(event.target.value);
  };

  const submitCmt = async () => {
    if (user) {
      if (comment) {
        let res = await postComment({
          id_user: user.userID,
          id_news: id,
          comment: comment,
        });
        if (res && res.EC === 0) {
          toast.success(res.EM);
        } else {
          toast.error(res.EM);
        }
        setComment("");
      } else {
        toast.error("not value comment");
      }
    } else {
      toast.error("must login to comment");
    }
    displayCmt(id);
  };

  const [listCmt, setListCmt] = useState([]);

  const displayCmt = async (id) => {
    let res = await getComment(id);
    if (res && res.EC === 0) {
      setListCmt(res.DT);
      // console.log(res.DT);
    }
  };

  useEffect(() => {
    if (id) {
      displayCmt(id);
    }
  }, [id]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="detail">
        <div className="container">
          <div className="row">
            {detailNews && (
              <div className="col-12 col-sm-9">
                <div className="d-flex justify-content-between align-items-center mb-2 mt-2">
                  <div className="link-group mb-2 mt-2">
                    <p>
                      <Link to="/home">
                        <i className="fa-solid fa-house-chimney"></i> Home
                      </Link>
                    </p>
                    <p className="dt-font-Inter dt-float-left">
                      <Link
                        to={`/allCate/${
                          detailNews.Category_detail &&
                          detailNews.Category_detail.Category &&
                          detailNews.Category_detail.Category.id
                        }`}
                      >
                        {detailNews.Category_detail &&
                          detailNews.Category_detail.Category &&
                          detailNews.Category_detail.Category.name}
                      </Link>
                    </p>
                    <p className="dt-font-Inter dt-float-left before:dt-content-['>'] before:dt-text-xl before:dt-leading-none before:dt-text-ca0a4a8 before:dt-block before:dt-relative before:dt-float-left before:dt-mx-[5px] before:dt-my-0">
                      <Link
                        to={`/allCateDetail/${
                          detailNews.Category_detail &&
                          detailNews.Category_detail.id
                        }`}
                      >
                        {detailNews.Category_detail &&
                          detailNews.Category_detail.name}
                      </Link>
                    </p>
                  </div>
                  <button className="save-news" onClick={handleSave}>
                    <i
                      className={
                        isSaved
                          ? "fa-sharp fa-solid fa-check"
                          : "fa-regular fa-bookmark"
                      }
                    ></i>
                  </button>
                  <p>
                    <span>{Date()}</span>
                  </p>
                </div>
                <div className="news-info">
                  <div className="content">
                    <h1>{detailNews.title}</h1>
                    <p>{detailNews.content_title}</p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: detailNews.content_html,
                      }}
                    />
                  </div>
                  <div className="d-flex author justify-content-between align-items-center">
                    <p>
                      Date by:{" "}
                      <span>
                        {detailNews.date && formatDate(detailNews.date)}
                      </span>
                    </p>
                    <p>
                      Written by:{" "}
                      <span>
                        {detailNews.Account_au &&
                          detailNews.Account_au.fullname}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="col-0 col-sm-3">
              <div className="ads">
                <Link to="#">
                  <img src={ads1} />
                </Link>
              </div>
            </div>
            <div className="col-12 col-sm-9">
              <div className="row">
                <div className="col-12">
                  <h4>Relative news</h4>
                </div>
                {relative.slice(0, 4).map((news, index) => (
                  <>
                    {news.id !== detailNews.id && (
                      <div className="col-12 col-sm-3" key={index}>
                        <Link
                          to={`/detailNews/${news.id}`}
                          className="news-item small"
                        >
                          <div className="img">
                            <img
                              style={{ height: "9rem" }}
                              src={
                                news.img_title
                                  ? Buffer(news.img_title, "base64").toString(
                                      "binary"
                                    )
                                  : "path_to_default_image"
                              }
                              alt={news.title}
                            />
                          </div>
                          <div className="text">
                            <p>{news.title}</p>
                          </div>
                        </Link>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>

            <div className="col-12 col-sm-9">
              <div className="comment">
                <h4>Comments</h4>
                <div className="comment-text d-flex justify-content-between align-items-center">
                  <input
                    placeholder="Comment here"
                    value={comment}
                    onChange={(event) => changeInputCmt(event)}
                  />
                  <button
                    onClick={() => submitCmt()}
                    className="btn btn-primary"
                  >
                    Send
                  </button>
                </div>
                {listCmt &&
                  listCmt.length > 0 &&
                  listCmt.map((item, index) => {
                    let img = "";
                    if (item.Account_u) {
                      img = new Buffer(
                        item.Account_u.img_avt,
                        "base64"
                      ).toString("binary");
                    }
                    return (
                      <div
                        className="comment-item d-flex justify-content-start align-items-center"
                        key={index}
                      >
                        <img src={img} />
                        <p>
                          <span>
                            {item.Account_u && item.Account_u.fullname}
                          </span>
                        </p>
                        <p>{item.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail;
