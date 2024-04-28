import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchHomeAllNews } from "../../../services/public";
import { Buffer } from "buffer";
import Slider from "react-slick";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AllNewHome = () => {
  const history = useHistory()
  let settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const slider = React.useRef(null);
  const [allNews, setAllNews] = useState([]);

  useEffect(() => {
    const fetchAllNewsData = async () => {
      try {
        const response = await fetchHomeAllNews();
        setAllNews(response.DT);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllNewsData();
  }, []);
  const handleMore = () => {
    history.push('/allNews')
  }
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-2 mt-2">
            <Link to="/allNews">
              <h4>All news</h4>
            </Link>
            <button className="More" onClick={()=>handleMore()}>
              More <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="col-12">
          <div className="list-slide">
            <Slider ref={slider} {...settings}>
              {allNews.map((news, index) => (
                <>
                  <Link to={`/detailNews/${news.id}`} className="slide-item" key={index}>
                    <div className="img">
                    <img style={{height: '17rem'}}
                      src={
                        news.img_title
                          ? Buffer(news.img_title, "base64").toString("binary")
                          : "path_to_default_image"
                      }
                      alt={news.title}
                    />
                    </div>
                    <div className="text">
                      <p>
                      {news.title}
                      </p>
                    </div>
                  </Link>
                </>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllNewHome;
