import db from "../models/index";
import { sequelize } from "../models/index";
const { Op } = require("sequelize");

const displayAllAuthor = async (page, limit, id) => {
  try {
    let checkAdmin = await db.Account_ad.findOne({
      where: { id: id },
    });
    if (!checkAdmin) {
      return {
        EM: "Admin is not exist!",
        EC: -1,
        DT: "",
      };
    }

    let offset = (page - 1) * limit;
    const { count, rows } = await db.Account_au.findAndCountAll({
      attributes: ["id", "fullname", "email", "status"],
      offset: offset,
      limit: limit,
    });

    let sortedRows = [];

    rows.forEach((row) => {
      if (row.status === "pending") {
        sortedRows.unshift(row); // Thêm vào đầu mảng để đưa lên trên cùng
      } else {
        sortedRows.push(row); // Thêm vào cuối mảng
      }
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      data: sortedRows,
    };

    return {
      EM: "Successfully",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "server error",
      EC: -1,
      DT: "",
    };
  }
};

const adminAcpAuthor = async (data) => {
  try {
    let checkAdmin = await db.Account_ad.findOne({
      where: { id: data.id_admin },
    });
    if (!checkAdmin) {
      return {
        EM: "Admin is not exist!",
        EC: -1,
        DT: "",
      };
    }
    if (data.key === "yes") {
      await db.Account_au.update(
        {
          status: "approved",
        },
        {
          where: { id: data.id_author },
        }
      );
      return {
        EM: "Author is approved!",
        EC: 0,
        DT: "",
      };
    } else {
      await db.Account_au.update(
        {
          status: "rejected",
        },
        {
          where: { id: data.id_author },
        }
      );
      return {
        EM: "Author is rejected!",
        EC: 0,
        DT: "",
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "server error",
      EC: -1,
      DT: "",
    };
  }
};

const adminAcpNew = async (data) => {
  try {
    let checkAdmin = await db.Account_ad.findOne({
      where: { id: data.id_admin },
    });
    if (!checkAdmin) {
      return {
        EM: "Admin is not exist!",
        EC: -1,
        DT: "",
      };
    }
    if (data.key === "yes") {
      await db.New.update(
        {
          status: "approved",
        },
        {
          where: { id: data.id_new },
        }
      );
      return {
        EM: "New is approved!",
        EC: 0,
        DT: "",
      };
    } else {
      await db.New.update(
        {
          status: "rejected",
        },
        {
          where: { id: data.id_new },
        }
      );
      return {
        EM: "New is rejected!",
        EC: 0,
        DT: "",
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "server error",
      EC: -1,
      DT: "",
    };
  }
};

const displayNewAd = async (page, limit, id) => {
  try {
    let checkAdmin = await db.Account_ad.findOne({
      where: { id: id },
    });
    if (!checkAdmin) {
      return {
        EM: "Admin is not exist!",
        EC: -1,
        DT: "",
      };
    }

    let offset = (page - 1) * limit;
    const { count, rows } = await db.New.findAndCountAll({
      attributes: ["id", "title", "img_title", "date", "status"],
      include: [
        {
          model: db.Category_detail,
          attributes: ["name"],
          include: [
            {
              model: db.Category,
              attributes: ["name"],
            },
          ],
        },
      ],
      order: [["id", "ASC"]],
      offset: offset,
      limit: limit,
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      data: rows,
    };
    return {
      EM: "successfully",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Error of server",
      EC: -1,
      DT: "",
    };
  }
};

const displayAllUser = async (page, limit, id) => {
  try {
    let checkAdmin = await db.Account_ad.findOne({
      where: { id: id },
    });
    if (!checkAdmin) {
      return {
        EM: "Admin is not exist!",
        EC: -1,
        DT: "",
      };
    }

    let offset = (page - 1) * limit;
    const { count, rows } = await db.Account_us.findAndCountAll({
      attributes: ["id", "fullname", "email"],
      offset: offset,
      limit: limit,
    });

    let sortedRows = [];

    rows.forEach((row) => {
      if (row.status === "pending") {
        sortedRows.unshift(row);
      } else {
        sortedRows.push(row);
      }
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      data: sortedRows,
    };

    return {
      EM: "Successfully",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "server error",
      EC: -1,
      DT: "",
    };
  }
};

const deleteUser = async (userID) => {
  try {
    let deleteUserData = await db.Account_us.findOne({
      where: { id: userID },
    });
    if (deleteUserData) {
      await deleteUserData.destroy();
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

const handleGetStatisticSer = async (id) => {
  try {
    let userData = await db.Account_ad.findOne({
      where: { id: id },
    });
    if (userData) {
      let pendingAu = await db.Account_au.count({
          where: { status: "pending" },
        }),
        quantityUs = await db.Account_us.count(),
        approvedAu = await db.Account_au.count({
          where: { status: "approved" },
        }),
        rejectedAu = await db.Account_au.count({
          where: { status: "rejected" },
        }),
        news = await db.New.count(),
        pendingNews = await db.New.count({
          where: { status: "pending" },
        }),
        approvedNews = await db.New.count({
          where: { status: "approved" },
        }),
        rejectedNews = await db.New.count({
          where: { status: "rejected" },
        }),
        data = {
          pendingAu: pendingAu,
          quantityUs: quantityUs,
          approvedAu: approvedAu,
          rejectedAu: rejectedAu,
          news: news,
          pendingNews: pendingNews,
          approvedNews: approvedNews,
          rejectedNews: rejectedNews,
        };

      return {
        EM: "done count autthors! ",
        EC: 0,
        DT: data,
      };
    }
  } catch (e) {
    return {
      EM: "some thing wrong in server",
      EC: -2,
      DT: "",
    };
  }
};

const getGoodauthorSer = async (id, limit) => {
  try {
    let userData = await db.Account_ad.findOne({
      where: { id: id },
    });
    if (userData) {
      const topAuthors = await db.Account_au.findAll({
        attributes: [
          "id",
          "fullname",
          "email",
          "status",
        ],
        include: [
          {
            model: db.New,
            attributes: [],
            where: { status: "approved" },
          },
        ],
        group: ["Account_au.id"],
        where: { status: "approved" },
        limit: limit,
      });

      const countNews = topAuthors.map(async author => {
        let count = await db.New.count(
          {
            where: { 
              id_author: author.id,  
              status: "approved" 
            },
          }
        )
        return {...author.toJSON(),newsCount: count}
      })
      let data = await Promise.all(countNews)
      data.sort((a, b) => b.newsCount - a.newsCount);
      return {
        EM: "done good authors!",
        EC: 0,
        DT: data,
      };
    }
  } catch (e) {
    console.log(e)
    return {
      EM: "something wrong in server",
      EC: -2,
      DT: "",
    };
  }
};
module.exports = {
  displayAllAuthor,
  adminAcpAuthor,
  adminAcpNew,
  displayNewAd,
  displayAllUser,
  deleteUser,
  handleGetStatisticSer,
  getGoodauthorSer,
};
