import authorService from "../services/authorService";

const handleCreateNew = async (req, res) => {
  try {
    let data = await authorService.createServiceNew(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "something wrong",
      EC: -2,
      DT: "",
    });
  }
};

const handleUpdateNew = async (req, res) => {
  try {
    let data = await authorService.updateServiceNew(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "something wrong",
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

    let data = await authorService.displayNewAu(id, +page, +limit);

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

const handleDisplayDetail = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -1,
        DT: "",
      });
    }
    let data = await authorService.displayDetail(req.query.id);

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

const handleDeleteNew = async (req, res) => {
  try {
      if(!req.query.id){
          return res.status(200).json({
              EM: "missing parameter",
              EC: -1,
              DT: "",
            });
      }
    let data = await authorService.deleteNew(req.query.id);
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
  handleCreateNew,
  handleUpdateNew,
  handleDisplayNew,
  handleDisplayDetail,
  handleDeleteNew,
};
