import "./Statistic.scss";
import HomeAd from "./HomeAd";
import { getStatistic,getGoodauthor } from "../../services/admin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Statistic = () => {
  const user = useSelector((state) => state.user.userData);
  const [statistic, setStatistic] = useState(null);
  const [listGoodAu,setListGoodAu] = useState([])
  const [limit,setLimit] = useState(3)
  const displayStatistic = async (id) => {
    let res = await getStatistic(id);
    if (res && res.EC === 0) {
      setStatistic(res.DT);
    }
  };

  useEffect(() => {
    if (user) {
      displayStatistic(user.userID);
      fetchGoodAu(user.userID)
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchGoodAu(user.userID,limit)
    }
  }, [user,limit]);

  const fetchGoodAu = async (id,limit) => {
      let res = await getGoodauthor(id,limit)
      if(res && res.EC === 0) {
        setListGoodAu(res.DT)
      }
  }

  return (
    <>
      <HomeAd />

      <div className="wrapper col-10">
        <div className="container">
          {statistic !== null && (
            <div className="row">
              <div className="box col-5 ms-md-5 mb-5">
                <div className="box1">
                  <i class="fa-solid fa-user-pen"></i>
                  <span className="num">{statistic.pendingAu}</span>
                  <span className="text">Pending Authors</span>
                </div>
              </div>

              <div className="box col-5 ms-md-5">
                <div className="box1">
                  <i class="fa-solid fa-users"></i>
                  <span className="num">{statistic.quantityUs}</span>
                  <span className="text">Users</span>
                </div>
              </div>

              <div className="box col-5 ms-md-5 mb-5">
                <div className="box1">
                  <i class="fa-solid fa-user-check"></i>
                  <span className="num">{statistic.approvedAu}</span>
                  <span className="text">Approved Authors</span>
                </div>
              </div>

              <div className="box col-5 ms-md-5">
                <div className="box1">
                  <i class="fa-solid fa-user-xmark"></i>
                  <span className="num">{statistic.rejectedAu}</span>
                  <span className="text">Rejected Authors</span>
                </div>
              </div>

              <div className="box col-2 ms-md-5 me-md-5">
                <div className="box1">
                  <i class="fa-solid fa-newspaper"></i>
                  <span className="num">{statistic.news}</span>
                  <span className="text">News</span>
                </div>
              </div>

              <div className="box col-2 ms-md-5 me-md-4">
                <div className="box1">
                  <i class="fa-solid fa-hourglass-half"></i>
                  <span className="num">{statistic.pendingNews}</span>
                  <span className="text">Pending News</span>
                </div>
              </div>

              <div className="box col-2 ms-md-5 me-md-5">
                <div className="box1">
                  <i class="fa-solid fa-square-check"></i>
                  <span className="num">{statistic.approvedNews}</span>
                  <span className="text">Approved News</span>
                </div>
              </div>

              <div className="box col-2 ms-md-5 ">
                <div className="box1">
                  <i class="fa-solid fa-square-xmark"></i>
                  <span className="num">{statistic.rejectedNews}</span>
                  <span className="text">Rejected News</span>
                </div>
              </div>
            </div>
          )}
          <div className="d-flex col-12 mt-md-5 justify-content-center">
            <h2>Best author</h2>
          </div>
          <select value={limit} onChange={(event)=>setLimit(event.target.value)} className="form-select mb-2 w-25">
            <option>Choose limit</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
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
                    <p>News</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listGoodAu &&
                  listGoodAu.length > 0 &&
                  listGoodAu.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
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
                          <p>{item.newsCount}</p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistic;
