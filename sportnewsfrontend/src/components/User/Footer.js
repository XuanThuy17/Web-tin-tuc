import "./Footer.scss";
import logo from "../../assets/img/EA-Sports-Logo-PNG_005.png";
import { Link, NavLink } from "react-router-dom";
import { fetchCategory } from "../../services/public";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await fetchCategory();
        if (categoryResponse.EC === 0) {
          setCategories(categoryResponse.DT);
        } else {
          console.error("Error fetching data:", categoryResponse.EM);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <ul>
            <li>
              <Link className="dropdown-link2" to="/home">
                <i class="fa-solid fa-house-chimney"></i>
              </Link>
            </li>
            {categories.map((category) => (
              <>
                {category.id !== 5 && (
                  <li key={category.id} className="dropdown-li1">
                    <NavLink
                            activeclassname="active dropdown-link1"
                            to={`/allCate/${category.id}`}
                          >
                      {category.name}
                    </NavLink>
                  </li>
                )}
              </>
            ))}
          </ul>
        </div>
        <div className="footer-bottom">
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="left">
                <div className="left-top">
                  <h4>Ha Noi</h4>
                  <p>
                    <i className="fa-solid fa-location-dot"></i> 12th Floor,
                    Geleximco Building, 36 Hoang Cau, O Cho Dua Ward, Dong Da
                    District, City. Hanoi
                  </p>
                  <p>
                    <i className="fa-solid fa-phone"></i> Phone: (84-24) 73 00
                    24 24 | (84-24) 35 12 18 06{" "}
                  </p>
                  <p>
                    <i class="fa-solid fa-fax"></i> Fax: 0243 512 1804
                  </p>
                </div>
                <div className="left-top mt-2">
                  <h4>Ho Chi Minh</h4>
                  <p>
                    <i className="fa-solid fa-location-dot"></i> 7th Floor, Viet
                    Uc Building, 402 Nguyen Thi Minh Khai, Ward 5, District 3,
                    City. Ho Chi Minh
                  </p>
                  <p>
                    <i className="fa-solid fa-phone"></i> Phone: (84-28) 73 00
                    24 24
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="right">
                <p>
                  Product of <h4>Electronic Arts .Inc</h4>
                </p>
                <img src={logo} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Footer-link">
        <p>
          Copyright © {new Date().getFullYear()} All rights reserved | This
          template is made by Electronic Arts .Inc.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
