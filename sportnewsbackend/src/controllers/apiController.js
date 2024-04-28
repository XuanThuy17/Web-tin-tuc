import accountApi from "../services/accountApi";
const testApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test-apipo",
  });
};
//user
const handleRegister = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.fullname) {
      return res.status(200).json({
        EM: "Missing required parameter",
        EC: "3",
        DT: "",
      });
    }
    //service : create account
    let data = await accountApi.registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await accountApi.handleUserLogin(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

//author
const handleRegisterAu = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.fullname) {
      return res.status(200).json({
        EM: "Missing required parameter",
        EC: "3",
        DT: "",
      });
    }
    //service : create account
    let data = await accountApi.registerNewAuthor(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleLoginAu = async (req, res) => {
  try {
    let data = await accountApi.handleAuthorLogin(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

//admin
const handleRegisterAd = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.fullname) {
      return res.status(200).json({
        EM: "Missing required parameter",
        EC: "3",
        DT: "",
      });
    }
    //service : create account
    let data = await accountApi.registerNewAdmin(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleLoginAd = async (req, res) => {
  try {
    let data = await accountApi.handleAdminLogin(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
module.exports = {
  testApi,
  handleRegister,
  handleLogin,
  handleRegisterAu,
  handleLoginAu,
  handleRegisterAd,
  handleLoginAd
};
