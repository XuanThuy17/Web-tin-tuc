import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ForgotPassAd from "../components/Admin/Account/ForgotPassAd";
import AuthorManage from "../components/Admin/AuthorManage";
import NewsManageAd from "../components/Admin/NewsManageAd";
import AdNewDetail from "../components/Admin/AdNewDetail";
import UserManage from "../components/Admin/UserManage"
import Statistic from "../components/Admin/Statistic";
function Admin() {
  return (
    <div>
      <Switch>
        <Route path="/author-manage-ad">
          <AuthorManage />
        </Route>
        <Route path="/user-manage-ad">
          <UserManage />
        </Route>
        <Route path="/new-manage-ad">
          <NewsManageAd />
        </Route>
        <Route path="/show-new-ad/:id">
          <AdNewDetail />
        </Route>
        <Route path="/statistic">
          <Statistic />
        </Route>
        <Route path="/forgot-pass-ad">
          <ForgotPassAd />
        </Route>
      </Switch>
    </div>
  );
}

export default Admin;
