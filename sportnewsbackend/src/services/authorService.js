import db from "../models/index";

const createServiceNew = async (data) => {
  try {
    let checkAuthor = await db.Account_au.findOne({
      where: { id: data.id_author },
    });
    if (!checkAuthor) {
      return {
        EM: "Author is not exist!",
        EC: -1,
        DT: "",
      };
    }
    await db.New.create({
      id_category_detail: data.id_category_detail,
      id_author: checkAuthor.id,
      title: data.title,
      img_title: data.img_title,
      content_title: data.content_title,
      content: data.content,
      content_html: data.content_html,
      date: data.date,
      status: "pending",
    });
    return {
      EM: "Successfully",
      EC: 0,
      DT: "",
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

const updateServiceNew = async (data) => {
  try {
    let checkNew = await db.New.findOne({
      where: { id: data.id },
    });
    if (!checkNew) {
      return {
        EM: "News is not exist!",
        EC: -1,
        DT: "",
      };
    }
    await db.New.update(
      {
        id_category_detail: data.id_category_detail,
        id_author: data.id_author,
        title: data.title,
        img_title: data.img_title,
        content_title: data.content_title,
        content: data.content,
        content_html: data.content_html,
        date: data.date,
      },
      {
        where: { id: checkNew.id },
      }
    );
    return {
      EM: "Successfully",
      EC: 0,
      DT: "",
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

const displayNewAu = async (id, page, limit) => {
  try {
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

      where: { id_author: id },
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

const displayDetail = async (id) => {
  let data = await db.New.findOne({
    where: { id: id },
  });
  if (!data) {
    return {
      EM: "News is not exist",
      EC: -1,
      DT: "",
    };
  }
  return {
    EM: "successfully",
    EC: 0,
    DT: data,
  };
};

const deleteNew = async (newId) => {
  try {
    let deleteNewData = await db.New.findOne({
      where: { id: newId },
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

module.exports = {
  createServiceNew,
  updateServiceNew,
  displayNewAu,
  displayDetail,
  deleteNew,
};
