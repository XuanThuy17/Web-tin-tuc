import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import ForgotPassAu from "../components/Author/Account/ForgotPassAu";
import CreateUpdateNew from "../components/Author/CreateUpdateNews";
import NewsManage from "../components/Author/NewsManage";
import ProfileAu from "../components/Author/ProfileAu";

function Author(props) {
  return (
    <div>
      <Switch>
        <Route path="/create-new-au">
          <CreateUpdateNew />
        </Route>
        <Route path="/update-new-au/:id">
          <CreateUpdateNew />
        </Route>
        <Route path="/new-manage-au">
          <NewsManage />
        </Route>
        {props.authenticationUs === true &&
            props.authorRedux &&
            props.authorRedux.roleID === 2 && (
              <Route path="/profile-au/:id">
                <ProfileAu />
              </Route>
            )}
        <Route path="/forgot-pass-au">
          <ForgotPassAu />
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authorRedux: state.user.userData,
    authenticationUs: state.user.isLogin,
  };
};
export default connect(mapStateToProps)(Author);
