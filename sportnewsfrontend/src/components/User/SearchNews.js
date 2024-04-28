import Header from "./Header";
import Footer from "./Footer";
import ReactPaginate from "react-paginate";
import ads1 from "../../assets/img/down.png";
import { searchNews } from "../../services/public";
import { Buffer } from "buffer";
import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./NewsDetail.scss";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const SearchNews = () => {
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(6);
    const [page, setPage] = useState(1);
  
    const { key } = useParams();
  
    const handlePageClick = (event) => {
      setPage(+event.selected + 1);
    };
  
    const displayListNew = async () => {
      let res = await searchNews(key, page, limit);
      if (res && res.EC === 0) {
        setGetNews(res.DT.data);
        setTotalPages(res.DT.totalPages);
      }
    };
    const [getNews, setGetNews] = useState([]);
  
    useEffect(() => {
  
          displayListNew(key);
      
    }, [key,page]);
    return(
        <>
        <Header />
      <div className="detail">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-9">
              <h4>
                Search result by key: "{key}"
              </h4>
            </div>
            <div className="col-12 col-sm-9">
              {getNews && getNews.length > 0 && (
                <>
                  <div className="row">
                    {getNews.map((news, index) => (
                      <div className="col-12" key={index}>
                        <Link to={`/detailNews/${news.id}`} className="Latest-news">
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
                            />{" "}
                          </div>
                          <div className="text">
                            <h4>{news.title}</h4>
                            <p>{news.content_title}</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  {totalPages > 0 && (
                    <div className="pagination">
                      <ReactPaginate
                        nextLabel={
                          <i className="fa-solid fa-chevron-right"></i>
                        }
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPages}
                        previousLabel={
                          <i className="fa-solid fa-chevron-left"></i>
                        }
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="col-0 col-sm-3">
              <div className="ads">
                <Link to="#">
                  <img src={ads1} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
        </>
    )
}

export default SearchNews;