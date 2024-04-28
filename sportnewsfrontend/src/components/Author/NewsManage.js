import HomeAu from "./HomeAu";
import "./NewsManage.scss";
import logo from "../../assets/img/EA-Sports-Logo-PNG_005.png";
import ReactPaginate from "react-paginate";
import { fetchNewAu } from "../../services/author";
import { toast } from "react-toastify";
import { Component, useEffect, useState } from "react";
import { Buffer } from "buffer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DeleteNew from "./DeleteNew";
import { useDispatch, useSelector } from "react-redux";
const NewsManage = () => {
  const history = useHistory();

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const user = useSelector((state) => state.user.userData);
  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
  };

  const [listNew, setListNew] = useState([]);
  const displayListNew = async (id) => {
    let res = await fetchNewAu(id, page, limit);
    if (res && res.EC === 0) {
      setListNew(res.DT.data);
      setTotalPages(res.DT.totalPages);
    }
  };
  useEffect(() => {
    if (user) {
      displayListNew(user.userID);
    }
  }, [page, user]);

  const updateNews = (item) => {
    history.push(`/update-new-au/${item.id}`);
  };

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({type:true});
  const deleteNews = (item) => {
    setIsShowDelete(true);
    setDataDelete(item);
  };
  const handleClose = () => {
    setIsShowDelete(false);
  };
  return (
    <>
      <HomeAu />
      <div className="content-new col-10">
        <div className="container">
          <h4>My List News</h4>
          <div className="table">
            <table class="table table-responsive table-bordered">
              <thead>
                <tr>
                  <th scope="col">
                    <p>ID</p>
                  </th>
                  <th scope="col">
                    <p>Title</p>
                  </th>
                  <th scope="col">
                    <p>Image</p>
                  </th>
                  <th scope="col">
                    <p>Cagetgory</p>
                  </th>
                  <th scope="col">
                    <p>Cagetgory_detail</p>
                  </th>
                  <th scope="col">
                    <p>Date</p>
                  </th>
                  <th scope="col">
                    <p>Status</p>
                  </th>
                  <th scope="col">
                    <p>Option</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listNew &&
                  listNew.length > 0 &&
                  listNew.map((item, index) => {
                    return (
                      <tr>
                        <th scope="row" key={index}>
                          {item.id}
                        </th>
                        <td>
                          <p>{item.title}</p>
                        </td>
                        <td>
                          <img
                            src={
                              item.img_title
                                ? Buffer(item.img_title, "base64").toString(
                                    "binary"
                                  )
                                : logo
                            }
                          />
                        </td>
                        <td>
                          <p>
                            {item.Category_detail &&
                              item.Category_detail.Category &&
                              item.Category_detail.Category.name}
                          </p>
                        </td>
                        <td>
                          <p>
                            {item.Category_detail && item.Category_detail.name}
                          </p>
                        </td>
                        <td>
                          <p>{item.date}</p>
                        </td>
                        <td>
                          <p>{item.status}</p>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-between">
                            <button
                              className="btn btn-primary"
                              onClick={() => updateNews(item)}
                            >
                              <i className="fa-solid fa-pen-to-square"></i> Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteNews(item)}
                            >
                              <i class="fa-solid fa-trash-can"></i> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {totalPages > 0 && (
              <div className="pagination">
                <ReactPaginate
                  nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={totalPages}
                  previousLabel={<i className="fa-solid fa-chevron-left"></i>}
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
          </div>
        </div>
      </div>
      <DeleteNew
        isShowDelete={isShowDelete}
        dataDelete={dataDelete}
        handleClose={handleClose}
        displayListNew={displayListNew}
      />
    </>
  );
};

export default NewsManage;
