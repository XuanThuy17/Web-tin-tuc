import HomeAd from "./HomeAd";
import "../Author/NewsManage.scss";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { fetchAuthorAd } from "../../services/admin";
import AreYouSure from "./AreYouSure";
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
const AuthorManage = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const user = useSelector(state => state.user.userData)
  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
  };

  const [listAuthor, setListAuthor] = useState([]);
  const displayListAuthor = async (id) => {
    let res = await fetchAuthorAd(id, page, limit);
    if (res && res.EC === 0) {
      setListAuthor(res.DT.data);
      setTotalPages(res.DT.totalPages);
    }
  };

  useEffect(() => {
    if(user) {
      displayListAuthor(user.userID);
    }
  }, [page,user]);

  const [isShowSure, setIsShowSure] = useState(false);
  const [dataSure, setDataSure] = useState({
      id_admin: user && user.userID,
      key: "",
      id_author: "",
      type: true,
  });

  const handleClose = () => {
    setIsShowSure(false);
  };

  const handleApproved = (item) => {
    setIsShowSure(true);
    let _data = _.cloneDeep(dataSure)
    setDataSure({
      ..._data, id_author: item.id,key:"yes"
    });
  };
  const handleRejected = (item) => {
    setIsShowSure(true);
    let _data = _.cloneDeep(dataSure)
    setDataSure({
      ..._data, id_author: item.id,key: "no"
    });
  };

  return (
    <>
      <HomeAd />
      <div className="content-new col-10">
        <div className="container">
          <h4>List Authors</h4>
          <div className="table">
            <table class="table table-responsive table-bordered">
              <thead>
                <tr>
                  <th scope="col">
                    <p>ID</p>
                  </th>
                  <th scope="col">
                    <p>Full name</p>
                  </th>
                  <th scope="col">
                    <p>Email</p>
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
                {listAuthor &&
                  listAuthor.length > 0 &&
                  listAuthor.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{item.id}</th>
                        <td>
                          <p>{item.fullname}</p>
                        </td>
                        <td>
                          <p>{item.email}</p>
                        </td>
                        <td>
                          <p>{item.status}</p>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-around">
                            {item.status === "pending" ? (
                              <>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleApproved(item)}
                                >
                                  <i className="fa-solid fa-check"></i> Approved
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleRejected(item)}
                                >
                                  <i class="fa-solid fa-xmark"></i> Rejected
                                </button>
                              </>
                            ) : item.status === "approved" ? (
                              <button
                                className="btn btn-danger"
                                onClick={() => handleRejected(item)}
                              >
                                <i class="fa-solid fa-xmark"></i> Rejected
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary"
                                onClick={() => handleApproved(item)}
                              >
                                <i className="fa-solid fa-check"></i> Approved
                              </button>
                            )}
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
      <AreYouSure
        dataSure={dataSure}
        isShowSure={isShowSure}
        handleClose={handleClose}
        displayListAuthor={displayListAuthor}
      />
    </>
  );
};

export default AuthorManage;
