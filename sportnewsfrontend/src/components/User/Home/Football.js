import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchHomeNewsByCategory } from "../../../services/public";
import { Buffer } from "buffer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Football = () => {
  const history = useHistory()
  const [categoryNews, setCategoryNews] = useState([]);

  useEffect(() => {
    const fetchCategoryNewsData = async () => {
      try {
        const response = await fetchHomeNewsByCategory(1);
        setCategoryNews(response.DT);
      } catch (e) {
        console.log(e);
      }
    };

    fetchCategoryNewsData();
  }, []);

  const handleCate = () => {
    history.push('/allCate/1')
  }
  return (
    <>
      <div className="col-12 col-sm-6">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-2 mt-2">
              <Link to="/allCate/1">
                <h4>Football</h4>
              </Link>
              <button className="More" onClick={()=>handleCate()}>
                More <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <div className="col-12">
            <div className="row">
            {categoryNews.slice(0, 1).map((news, index) => (
              <div className="col-12" key={index}>
                <Link to={`/detailNews/${news.id}`} className="Latest-news small-item">
                  <div className="img">
                    <img  src={
                        news.img_title
                          ? Buffer(news.img_title, "base64").toString("binary")
                          : "path_to_default_image"
                      } />
                  </div>
                  <div className="text">
                  <h4>{news.title}</h4>
                  <p>{news.content_title}</p>
                  </div>
                </Link>
              </div>
            ))}
            {categoryNews.slice( 1,4).map((news, index) => (
              <div className="col-12 col-sm-4" key={index}>
                <Link to={`/detailNews/${news.id}`} className="news-item small">
                  <div className="img">
                  <img  src={
                        news.img_title
                          ? Buffer(news.img_title, "base64").toString("binary")
                          : "path_to_default_image"
                      } />
                  </div>
                  <div className="text">
                    <p>
                    {news.title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Football;
