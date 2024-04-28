import db from "../models/index";
import { Op, where } from "sequelize";
import moment from "moment";

const fetchData = async (model) => {
  try {
    let data = await model.findAll();
    if (data) {
      return {
        EM: "successfully",
        EC: 0,
        DT: data,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const getCategorySer = async () => {
  return await fetchData(db.Category);
};

const getCategoryDetailSer = async () => {
  return await fetchData(db.Category_detail);
};

const homeHotNewsSer = async () => {
  try {
    let data = await db.New.findAll({
      where: { id_category_detail: 15, status: "approved" },
      order: [["date", "DESC"]],
      limit: 10,
      attributes: ["id", "img_title", "title", "content_title"],
    });
    return {
      EM: "done get hotnews! ",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const homeLastestNewsSer = async () => {
  try {
    let data = await db.New.findAll({
      where: { status: "approved" },
      order: [["date", "DESC"]],
      limit: 3,
      attributes: ["id", "img_title", "title", "content_title"],
    });
    return {
      EM: "done get lastest news! ",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const homeLatestNewsSer = async () => {
  try {
    let data = await db.New.findAll({
      where: { status: "approved" },
      order: [["date", "ASC"]],
      limit: 3,
      attributes: ["id", "title"],
    });
    return {
      EM: "done get lastest news! ",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const homeNewsByCategorySer = async (categoryId) => {
  try {
    // Bước 1: Lấy danh sách chi tiết danh mục (category_detail) thuộc danh mục (category) đã cho
    let categoryDetails = await db.Category_detail.findAll({
      where: {
        id_category: categoryId,
      },
    });

    // Bước 2: Lấy danh sách các ID của chi tiết danh mục
    let categoryDetailIds = categoryDetails.map((detail) => detail.id);

    // Bước 3: Lấy tin tức (new) liên quan dựa trên danh sách ID của chi tiết danh mục
    let data = await db.New.findAll({
      where: {
        id_category_detail: categoryDetailIds,
        status: "approved",
      },
      order: [["date", "DESC"]],
      limit: 4,
      attributes: ["id", "img_title", "title", "content_title"],
    });
    return {
      EM: "done get category news! ",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const homeAllNewsSer = async () => {
  try {
    let data = await db.New.findAll({
      where: { status: "approved" },
      attributes: ["id", "img_title", "title"],
    });
    return {
      EM: "done get allNew! ",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const getLastestNewsSer = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.New.findAndCountAll({
      attributes: ["id", "img_title", "title", "content_title"],
      order: [["date", "DESC"]],
      offset: offset,
      limit: limit,

      where: {
        status: "approved",
      },
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      data: rows,
    };
    return {
      EM: "done get last news! ",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const getLatestNewsSer = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.New.findAndCountAll({
      attributes: ["id", "img_title", "title", "content_title"],
      order: [["date", "ASC"]],
      offset: offset,
      limit: limit,

      where: {
        status: "approved",
      },
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      data: rows,
    };
    return {
      EM: "done get last news! ",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const getNewsByCategoryDetailSer = async (id, page, limit) => {
  try {
    let data = "";
    if (!page && !limit) {
      data = await db.New.findAll({
        where: {
          id_category_detail: id,
          status: "approved",
        },
      });
    } else {
      let offset = (page - 1) * limit;
      const { count, rows } = await db.New.findAndCountAll({
        attributes: ["id", "img_title", "title", "content_title"],
        order: [["date", "DESC"]],
        offset: offset,
        limit: limit,

        where: {
          id_category_detail: id,
          status: "approved",
        },
        include: [
          {
            model: db.Category_detail,
            attributes: ["name", "id"],
            include: [
              {
                model: db.Category,
                attributes: ["name", "id"],
              },
            ],
          },
        ],
      });

      let totalPages = Math.ceil(count / limit);
      data = {
        totalRows: count,
        totalPages: totalPages,
        data: rows,
      };
    }

    return {
      EM: "done get detail news! ",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const getNewsByCategorySer = async (id, page, limit) => {
  try {
    let categoryDetails = await db.Category_detail.findAll({
      where: {
        id_category: id,
      },
    });

    // Bước 2: Lấy danh sách các ID của chi tiết danh mục
    let categoryDetailIds = categoryDetails.map((detail) => detail.id);

    let offset = (page - 1) * limit;
    const { count, rows } = await db.New.findAndCountAll({
      attributes: ["id", "img_title", "title", "content_title"],

      order: [["date", "DESC"]],
      offset: offset,
      limit: limit,

      where: {
        id_category_detail: categoryDetailIds,
        status: "approved",
      },
      include: [
        {
          model: db.Category_detail,
          attributes: ["name", "id"],
          include: [
            {
              model: db.Category,
              attributes: ["name", "id"],
            },
          ],
        },
      ],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      data: rows,
    };
    return {
      EM: "done get detail news! ",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const getAllNewsSer = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.New.findAndCountAll({
      attributes: ["id", "img_title", "title", "content_title"],
      offset: offset,
      limit: limit,

      where: {
        status: "approved",
      },
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      data: rows,
    };
    return {
      EM: "done get all news! ",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const getNewsDetailSer = async (id) => {
  try {
    let data = await db.New.findOne({
      attributes: [
        "id",
        "img_title",
        "id_category_detail",
        "title",
        "content_title",
        "content_html",
        "content",
        "date",
      ],
      where: {
        id: id,
        status: "approved",
      },
      include: [
        {
          model: db.Category_detail,
          attributes: ["name", "id"],
          include: [
            {
              model: db.Category,
              attributes: ["name", "id"],
            },
          ],
        },
        {
          model: db.Account_au,
          attributes: ["fullname"],
        },
      ],
    });
    return {
      EM: "done get detail news to see! ",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const searchNewsSer = async (key, page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.New.findAndCountAll({
      attributes: ["id", "img_title", "title", "content_title"],
      offset: offset,
      limit: limit,

      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${key}%`,
            },
          },
        ],
        status: "approved",
      },
    });

    let totalPages = Math.ceil(count / limit);

    let data = {
      totalRows: count,
      totalPages: totalPages,
      data: rows,
    };
    return {
      EM: "done search news! ",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const postHistoryNewsSer = async (data) => {
  try {
    if (!data.id_account || !data.id_new) {
      return {
        EM: "account or news id is missing",
        EC: -1,
        DT: "",
      };
    }

    let user = await db.History.findOne({
      where: {
        id_account: data.id_account,
      },
    });

    if (!user) {
      user = await db.History.create({
        id_account: data.id_account,
      });
    }

    let news = await db.New.findOne({
      where: {
        id: data.id_new,
      },
    });

    if (!news) {
      return {
        EM: "news is not exist",
        EC: -1,
        DT: "",
      };
    }

    let news_history = await db.New_history.findOne({
      where: {
        id_new: news.id,
        id_history: user.id,
      },
    });

    const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");

    if (!news_history) {
      await db.New_history.create({
        id_new: news.id,
        id_history: user.id,
        date_history: currentDate.toString(),
      });
    }

    if (news_history) {
      await db.New_history.update(
        {
          date_history: currentDate.toString(),
        },
        {
          where: {
            id_new: news.id,
            id_history: user.id,
          },
        }
      );
      return {
        EM: "Update time Successfully",
        EC: 0,
        DT: "",
      };
    }

    return {
      EM: "successfully",
      EC: 0,
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const getHistoryNewsSer = async (id, page, limit) => {
  try {
    let offset = (page - 1) * limit;

    let userHistory = await db.History.findAll({
      where: {
        id_account: id,
      },
    });

    let historyIds = userHistory.map((history) => history.id);
    const newsIds = await db.New_history.findAll({
      where: {
        id_history: historyIds,
      },
      attributes: ["id_new"],
      order: [["date_history", "DESC"]],
    });
    const newIds = newsIds.map((newsId) => newsId.id_new);

    const { count, rows } = await db.New.findAndCountAll({
      attributes: ["id", "img_title", "title", "content_title"],
      offset: offset,
      limit: limit,
      where: {
        id: newIds,
        status: "approved",
      },
      include: [
        {
          model: db.New_history,
          attributes: [],
          required: false,
          order: [["date_history", "DESC"]],
        },
      ],
      order: [[db.New_history, "date_history", "DESC"]],
    });

    let totalPages = Math.ceil(count / limit);

    let data = {
      totalRows: count,
      totalPages: totalPages,
      data: rows,
    };
    return {
      EM: "done get history news! ",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const postSaveNewsSer = async (rawData) => {
  try {
    if (!rawData.id_account || !rawData.id_new) {
      return {
        EM: "account or news id is missing",
        EC: -1,
        DT: "",
      };
    }

    let user = await db.Save.findOne({
      where: {
        id_account: rawData.id_account,
      },
    });

    if (!user) {
      user = await db.Save.create({
        id_account: rawData.id_account,
      });
    }

    let news = await db.New.findOne({
      where: {
        id: rawData.id_new,
      },
    });

    if (!news) {
      return {
        EM: "news is not exist",
        EC: -1,
        DT: "",
      };
    }

    let news_save = await db.New_save.findOne({
      where: {
        id_new: news.id,
        id_save: user.id,
      },
    });

    const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");

    if (!news_save) {
      await db.New_save.create({
        id_new: news.id,
        id_save: user.id,
        date_save: currentDate.toString(),
      });
    }

    if (news_save) {
      await db.New_save.update(
        {
          date_save: currentDate.toString(),
        },
        {
          where: {
            id_new: news.id,
            id_save: user.id,
          },
        }
      );
      return {
        EM: "Update time Successfully",
        EC: 0,
        DT: "",
      };
    }

    return {
      EM: "successfully",
      EC: 0,
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const getSaveNewsSer = async (id, page, limit) => {
  try {
    let offset = (page - 1) * limit;

    let userSave = await db.Save.findAll({
      where: {
        id_account: id,
      },
    });

    let saveIds = userSave.map((save) => save.id);
    const newsIds = await db.New_save.findAll({
      where: {
        id_save: saveIds,
      },
      attributes: ["id_new"],
      order: [["date_save", "DESC"]],
    });
    const newIds = newsIds.map((newsId) => newsId.id_new);

    const { count, rows } = await db.New.findAndCountAll({
      attributes: ["id", "img_title", "title", "content_title"],
      offset: offset,
      limit: limit,
      where: {
        id: newIds,
        status: "approved",
      },
      include: [
        {
          model: db.New_save,
          attributes: [],
          required: false,
          order: [["date_save", "DESC"]],
        },
      ],
      order: [[db.New_save, "date_save", "DESC"]],
    });
    let totalPages = Math.ceil(count / limit);

    let data = {
      totalRows: count,
      totalPages: totalPages,
      data: rows,
    };
    return {
      EM: "done get save news! ",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const deleteSaveNewsSer = async (newId) => {
  try {
    let deleteNewData = await db.New_save.findOne({
      where: { id_new: newId },
    });
    if (deleteNewData) {
      await deleteNewData.destroy();
      return {
        EM: "Delete Successfully",
        EC: 0,
        DT: "",
      };
    }
    return {
      EM: "Not found News",
      EC: -1,
      DT: "",
    };
  } catch (e) {
    return {
      EM: "some thing wrong in server",
      EC: -2,
      DT: "",
    };
  }
};

const checkSaveNewsSer = async (id, userID) => {
  try {
    if (!id || !userID) {
      return {
        EM: "Missing parameter",
        EC: -2,
        DT: "",
      };
    }
    let existingSavedNews = await db.New_save.findOne({
      where: { id_new: id, id_save: userID },
    });

    if (!existingSavedNews) {
      return {
        EM: "News not saved",
        EC: 1,
        DT: "",
      };
    }else{
      return {
        EM: "News is saved",
        EC: 0,
        DT: existingSavedNews,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Something went wrong in service",
      EC: -1,
      DT: "",
    };
  }
};

const getProfileSer = async (id, roleID) => {
  try {
    if (+roleID === 1) {
      let user = await db.Account_us.findOne({
        where: {
          id: id,
        },
        attributes: [
          "id",
          "email",
          "fullname",
          "birthday",
          "location",
          "gender",
          "img_avt",
        ],
      });
      if (!user) {
        return {
          EM: "No user! ",
          EC: -1,
          DT: "",
        };
      }
      return {
        EM: "done get profile news! ",
        EC: 0,
        DT: user,
      };
    }
    if (+roleID === 2) {
      let user = await db.Account_au.findOne({
        where: {
          id: id,
        },
        attributes: [
          "id",
          "email",
          "fullname",
          "birthday",
          "location",
          "gender",
          "img_avt",
        ],
      });
      if (!user) {
        return {
          EM: "No user! ",
          EC: -1,
          DT: "",
        };
      }
      return {
        EM: "done get profile news! ",
        EC: 0,
        DT: user,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service",
      EC: -2,
      DT: "",
    };
  }
};

const updateProfileSer = async (data) => {
  try {
    if (+data.roleID === 1) {
      let checkUser = await db.Account_us.findOne({
        where: { id: data.id },
      });
      if (!checkUser) {
        return {
          EM: "user is not exist!",
          EC: -1,
          DT: "",
        };
      }

      await db.Account_us.update(
        {
          email: data.email,
          fullname: data.fullname,
          birthday: data.birthday,
          location: data.location,
          img_avt: data.img_avt,
          gender: data.gender,
        },
        {
          where: { id: data.id },
        }
      );
      return {
        EM: "Successfully",
        EC: 0,
        DT: {
          userID: checkUser.id,
          roleID: checkUser.roleID,
          fullname: checkUser.fullname,
          img_avt: checkUser.img_avt,
        },
      };
    }
    if (+data.roleID === 2) {
      let checkAuthor = await db.Account_au.findOne({
        where: { id: data.id },
      });
      if (!checkAuthor) {
        return {
          EM: "author is not exist!",
          EC: -1,
          DT: "",
        };
      }
      await db.Account_au.update(
        {
          email: data.email,
          fullname: data.fullname,
          birthday: data.birthday,
          location: data.location,
          img_avt: data.img_avt,
          gender: data.gender,
        },
        {
          where: { id: data.id },
        }
      );
      return {
        EM: "Successfully",
        EC: 0,
        DT: {
          userID: checkAuthor.id,
          roleID: checkAuthor.roleID,
          fullname: checkAuthor.fullname,
          img_avt: checkAuthor.img_avt,
        },
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "server error in service",
      EC: -1,
      DT: "",
    };
  }
};

const postCommentNewsSer = async (data) => {
  try {
    const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");

    let user = await db.Account_us.findOne({
      where: { id: data.id_user },
    });
    if (user) {
      let news = await db.New.findOne({
        where: { id: data.id_news },
      });

      if (news) {
        await db.Comment.create({
          id_account: user.id,
          id_new: news.id,
          comment: data.comment,
          date: currentDate.toString(),
        });
        return {
          EM: "comment success",
          EC: 0,
          DT: "",
        };
      } else {
        return {
          EM: "News is not exist",
          EC: 1,
          DT: "",
        };
      }
    } else {
      return {
        EM: "User is not exist",
        EC: 1,
        DT: "",
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "server error in service",
      EC: -1,
      DT: "",
    };
  }
};

const getCommentSer = async (id) => {
  try {
    let news = await db.New.findOne({
      where: {id: id}
    })
    if(news){
      let comment = await db.Comment.findAll({
        where: {id_new: news.id},
        include: [
          {
            model: db.Account_us,
            attributes: ["img_avt","fullname"]
          }
        ],
        order: [["date", "DESC"]],
      })
      return {
        EM: "OK",
        EC: 0,
        DT: comment,
      };
    }
  } catch (e) {
    
  }
};

module.exports = {
  getCategorySer,
  getCategoryDetailSer,
  homeHotNewsSer,
  homeLastestNewsSer,
  homeLatestNewsSer,
  homeNewsByCategorySer,
  homeAllNewsSer,
  getLastestNewsSer,
  getLatestNewsSer,
  getNewsByCategorySer,
  getNewsByCategoryDetailSer,
  getAllNewsSer,

  getNewsDetailSer,
  searchNewsSer,
  postHistoryNewsSer,
  getHistoryNewsSer,
  postSaveNewsSer,
  getSaveNewsSer,
  deleteSaveNewsSer,
  checkSaveNewsSer,
  getProfileSer,
  updateProfileSer,
  postCommentNewsSer,
  getCommentSer,
};
