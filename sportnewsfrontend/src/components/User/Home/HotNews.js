import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchHomeHotNews } from "../../../services/public";
import { Buffer } from "buffer";

const HotNews = () => {
  const [hotNews, setHotNews] = useState([]);

  useEffect(() => {
    const fetchHotNewsData = async () => {
      try {
        const response = await fetchHomeHotNews();
        setHotNews(response.DT);
      } catch (e) {
        console.log(e);
      }
    };

    fetchHotNewsData();
  }, []);

  return (
    <div className="col-12 col-sm-9">
      <div className="row">
        <div className="col-12 col-sm-9">
          <div className="row">
            {hotNews.slice(0, 1).map((news, index) => (
              <div className="col-12" key={index}>
                <Link to={`/detailNews/${news.id}`} className="news-item">
                  <div className="img">
                    <img
                      src={
                        news.img_title
                          ? Buffer(news.img_title, "base64").toString("binary")
                          : "path_to_default_image"
                      }
                      alt={news.title}
                    />
                  </div>
                  <div className="text">
                    <h4>{news.title}</h4>
                    <p>{news.content_title}</p>
                  </div>
                </Link>
              </div>
            ))}
            <div className="col-12">
              <div className="row">
                {hotNews.slice(1, 4).map((news, index) => (
                  <div className="col-12 col-sm-4" key={index}>
                    <Link to={`/detailNews/${news.id}`} className="news-item small">
                      <div className="img">
                        <img 
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
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-3">
          {hotNews.slice(4, 10).map((news, index) => (
            <div className="col-12" key={index}>
              <div className="today-news">
                <p>Hot news</p>
                <Link to={`/detailNews/${news.id}`} className="news-item small">
                  <div className="text">
                    <p>{news.title}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotNews;
