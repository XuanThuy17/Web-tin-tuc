import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchHomeLatestNews } from "../../../services/public";
import { Buffer } from "buffer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const LatestNews = () => {
  const history = useHistory()
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    const fetchLatestNewsData = async () => {
      try {
        const response = await fetchHomeLatestNews();
        setLatestNews(response.DT);
      } catch (e) {
        console.log(e);
      }
    };

    fetchLatestNewsData();
  }, []);
  const handleMore = () => {
    history.push('/allLatest')
  }
  return (
    <div className="col-12 col-sm-3">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-2 mt-2">
            <Link to="/allLatest">
              <h4>Latest News</h4>
            </Link>
            <button className="More" onClick={()=>handleMore()}>
              More <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
        {latestNews.slice(0, 3).map((news, index) => (
        <div className="col-12" key={index}>
          <Link to={`/detailNews/${news.id}`} className="news-item small">
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
  );
};
export default LatestNews;
