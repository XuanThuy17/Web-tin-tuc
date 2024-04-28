import adminService from "../services/adminService";

const handleGetAuthor = async (req, res) => {
  try {
    let id = req.query.id,
      limit = req.query.limit,
      page = req.query.page,
      data = await adminService.displayAllAuthor(+page, +limit, id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "something wrong in control",
      EC: -2,
      DT: "",
    });
  }
};

const handleAcpAuthor = async (req, res) => {
  try {
    let data = await adminService.adminAcpAuthor(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "something wrong in control",
      EC: -2,
      DT: "",
    });
  }
};

const handleAcpNew = async (req, res) => {
  try {
    let data = await adminService.adminAcpNew(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "something wrong in control",
      EC: -2,
      DT: "",
    });
  }
};

const handleDisplayNew = async (req, res) => {
  try {
    let page = req.query.page,
      limit = req.query.limit,
      id = req.query.id;

    if (!id || !page || !limit) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -1,
        DT: "",
      });
    }

    let data = await adminService.displayNewAd(+page, +limit, id);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "something wrong in control",
      EC: -2,
      DT: "",
    });
  }
};

const handleGetUser = async (req, res) => {
  try {
    let id = req.query.id,
      limit = req.query.limit,
      page = req.query.page,
      data = await adminService.displayAllUser(+page, +limit, id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "something wrong in control",
      EC: -2,
      DT: "",
    });
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -1,
        DT: "",
      });
    }
    let data = await adminService.deleteUser(req.query.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "something wrong in control",
      EC: -1,
      DT: "",
    });
  }
};

const handleGetStatistic = async (req, res) => {
  try {
    if (!req.query.id) {
        return res.status(200).json({
          EM: "missing parameter",
          EC: -1,
          DT: "",
        });
      }
      let data = await adminService.handleGetStatisticSer(req.query.id);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "something wrong in control",
      EC: -1,
      DT: "",
    });
  }
};

const handleGetGoodauthor = async (req, res) => {
  try {
    if (!req.query.id &&!req.query.limit) {
        return res.status(200).json({
          EM: "missing parameter",
          EC: -1,
          DT: "",
        });
      }
      let id = req.query.id, 
      limit = req.query.limit,
      data = await adminService.getGoodauthorSer(id,+limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "something wrong in control",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  handleGetAuthor,
  handleAcpAuthor,
  handleAcpNew,
  handleDisplayNew,
  handleGetUser,
  handleDeleteUser,
  handleGetStatistic,
  handleGetGoodauthor,
};
