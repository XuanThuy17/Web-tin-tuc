import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchHomeLastestNews } from "../../../services/public";
import { Buffer } from "buffer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const LastestNews = () => {
  const history = useHistory()
  const [lastestNews, setLastestNews] = useState([]);

  useEffect(() => {
    const fetchLastestNewsData = async () => {
      try {
        const response = await fetchHomeLastestNews();
        setLastestNews(response.DT);
      } catch (e) {
        console.log(e);
      }
    };

    fetchLastestNewsData();
  }, []);
  const handleMore = () => {
    history.push('/allLastest')
  }
  return (
    <div className="col-12 col-sm-9">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-2 mt-2">
            <Link to="/allLastest">
              <h4>Lastest news</h4>
            </Link>
            <button className="More" onClick={()=>handleMore()}>
              More <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {lastestNews.slice(0, 3).map((news, index) => (
          <div className="col-12" key={index}>
            <Link to={`/detailNews/${news.id}`} className="Latest-news">
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
      </div>
    </div>
  );
};
export default LastestNews;
