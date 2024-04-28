import publicApi from "../routes/publicApi";
import publicService from "../services/publicService";

const handleRequest = async (func, req, res) => {
  try {
    let data = await func();
    if (data) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "something wrong in control",
      EC: -1,
      DT: "",
    });
  }
};

const getCategory = async (req, res) => {
  return await handleRequest(publicService.getCategorySer, req, res);
};

const getCategoryDetail = async (req, res) => {
  return await handleRequest(publicService.getCategoryDetailSer, req, res);
};

const homeHotNews = async (req, res) => {
  try {
    let data = await publicService.homeHotNewsSer();
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

const homeLastestNews = async (req, res) => {
  try {
    let data = await publicService.homeLastestNewsSer();
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

const homeLatestNews = async (req, res) => {
  try {
    let data = await publicService.homeLatestNewsSer();
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

const homeNewsByCategory = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -2,
        DT: "",
      });
    }
    let data = await publicService.homeNewsByCategorySer(req.query.id);
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

const homeAllNews = async (req, res) => {
  try {
    let data = await publicService.homeAllNewsSer();
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

const getLastestNews = async (req, res) => {
  try {
    if (!req.query.limit || !req.query.page) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -2,
        DT: "",
      });
    }
    let page = req.query.page,
      limit = req.query.limit,
      data = await publicService.getLastestNewsSer(+page, +limit);
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

const getLatestNews = async (req, res) => {
  try {
    if (!req.query.limit || !req.query.page) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -2,
        DT: "",
      });
    }
    let page = req.query.page,
      limit = req.query.limit,
      data = await publicService.getLatestNewsSer(+page, +limit);
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

const getNewsByCategory = async (req, res) => {
  try {
    if (!req.query.id || !req.query.limit || !req.query.page) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -2,
        DT: "",
      });
    }
    let id = req.query.id,
      page = req.query.page,
      limit = req.query.limit,
      data = await publicService.getNewsByCategorySer(id, +page, +limit);
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

const getNewsByCategoryDetail = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -2,
        DT: "",
      });
    }
    let id = req.query.id,
      page = req.query.page,
      limit = req.query.limit,
      data = await publicService.getNewsByCategoryDetailSer(id, +page, +limit);
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

const getAllNews = async (req, res) => {
  try {
    if (!req.query.limit || !req.query.page) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -2,
        DT: "",
      });
    }
    let page = req.query.page,
      limit = req.query.limit,
      data = await publicService.getAllNewsSer(+page, +limit);
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

const getNewsDetail = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -2,
        DT: "",
      });
    }
    let data = await publicService.getNewsDetailSer(req.query.id);
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

const searchNews = async (req, res) => {
  try {
    if (!req.query.key || !req.query.page || !req.query.limit) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -2,
        DT: "",
      });
    }
    let key = req.query.key,
      page = req.query.page,
      limit = req.query.limit,
      data = await publicService.searchNewsSer(key, +page, +limit);
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

const postHistoryNews = async (req, res) => {
  try {
    let data = await publicService.postHistoryNewsSer(req.body);
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

const getHistoryNews = async (req, res) => {
  try {
    if (!req.query.id || !req.query.limit || !req.query.page) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -2,
        DT: "",
      });
    }
    let id = req.query.id,
      page = req.query.page,
      limit = req.query.limit,
      data = await publicService.getHistoryNewsSer(id, +page, +limit);
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

const postSaveNews = async (req, res) => {
  try {
    let data = await publicService.postSaveNewsSer(req.body);
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

const getSaveNews = async (req, res) => {
  try {
    if (!req.query.id || !req.query.limit || !req.query.page) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -2,
        DT: "",
      });
    }
    let id = req.query.id,
      page = req.query.page,
      limit = req.query.limit,
      data = await publicService.getSaveNewsSer(id, +page, +limit);
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

const deleteSaveNews = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -1,
        DT: "",
      });
    }
    let data = await publicService.deleteSaveNewsSer(req.query.id);
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

const checkSaveNews = async (req, res) => {
  try {
    if (!req.query.id || !req.query.userID) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -2,
        DT: "",
      });
    }
    let id = req.query.id,
      userID = req.query.userID,
      data = await publicService.checkSaveNewsSer(id, userID);
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

const getProfile = async (req, res) => {
  try {
    if (!req.query.id || !req.query.roleID) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -2,
        DT: "",
      });
    }
    let id = req.query.id,
      roleID = req.query.roleID,
      data = await publicService.getProfileSer(id, roleID);
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

const updateProfile = async (req, res) => {
  try {
    let data = await publicService.updateProfileSer(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "something wrong in controll",
      EC: -2,
      DT: "",
    });
  }
};

const postCommentNews = async (req, res) => {
  try {
    let data = await publicService.postCommentNewsSer(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "something wrong in controll",
      EC: -2,
      DT: "",
    });
  }
};

const getComment = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        EM: "missing parameter",
        EC: -2,
        DT: "",
      });
    }
    let data = await publicService.getCommentSer(req.query.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "something wrong in controll",
      EC: -2,
      DT: "",
    });
  }
};

module.exports = {
  getCategory,
  getCategoryDetail,
  homeHotNews,
  homeLastestNews,
  homeLatestNews,
  homeNewsByCategory,
  homeAllNews,
  getNewsByCategoryDetail,
  getLastestNews,
  getLatestNews,
  getNewsByCategory,
  getAllNews,

  getNewsDetail,
  searchNews,
  postHistoryNews,
  getHistoryNews,
  postSaveNews,
  getSaveNews,
  deleteSaveNews,
  checkSaveNews,
  getProfile,
  updateProfile,
  postCommentNews,
  getComment,
};
