import HomeAd from "./HomeAd";
import "../Author/NewsManage.scss";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { fetchUserAd } from "../../services/admin";
import DeleteNew from "../Author/DeleteNew";
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
const UserManage = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const user = useSelector(state => state.user.userData)
  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
  };

  const [listUser, setListUser] = useState([]);
  const displayListUser = async (id) => {
    let res = await fetchUserAd(id, page, limit);
    if (res && res.EC === 0) {
      setListUser(res.DT.data);
      setTotalPages(res.DT.totalPages);
    }
  };

  useEffect(() => {
    if(user) {
      displayListUser(user.userID);
    }
  }, [page,user]);

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState("");
  const deleteUser = (item) => {
    setIsShowDelete(true);
    setDataDelete(item);
  };

  const handleClose = () => {
    setIsShowDelete(false);
  };

  return (
    <>
      <HomeAd />
      <div className="content-new col-10">
        <div className="container">
          <h4>List Users</h4>
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
                    <p>Option</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listUser &&
                  listUser.length > 0 &&
                  listUser.map((item, index) => {
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
                          <div className="d-flex align-items-center justify-content-around">
                            
                              <button
                                className="btn btn-primary"
                                onClick={() => deleteUser(item)}
                              >
                                <i className="fa-solid fa-trash-can"></i>Delete
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
        handleClose={handleClose}
        displayListUser={displayListUser}
        dataDelete={dataDelete}
        />
    </>
  );
};

export default UserManage;
