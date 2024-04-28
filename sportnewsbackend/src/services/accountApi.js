import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const hashAccountPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const checkEmailExist = async (emailAccount) => {
  try {
    let account_us = await db.Account_us.findOne({
      where: { email: emailAccount },
    });
    if (account_us) {
      return true;
    }

    let account_au = await db.Account_au.findOne({
      where: { email: emailAccount },
    });
    if (account_au) {
      return true;
    }

    let account_ad = await db.Account_ad.findOne({
      where: { email: emailAccount },
    });
    if (account_ad) {
      return true;
    }

    return false;
  } catch (e) {
    console.log(e);
    return {
      EM: "wrong in check email...",
      EC: -2,
    };
  }
};

const checkPassWord = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};

//user
const registerNewUser = async (rawUserData) => {
  try {
    //check email exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist",
        EC: 1,
      };
    }
    // hash pass
    let hashPasswordBcrypt = await hashAccountPassword(rawUserData.password);
    // create account
    await db.Account_us.create({
      email: rawUserData.email,
      password: hashPasswordBcrypt,
      fullname: rawUserData.fullname,
      roleID: 1,
    });
    return {
      EM: "Created successfully",
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service...",
      EC: -2,
    };
  }
};

const handleUserLogin = async (rawData) => {
  try {
    let user = await db.Account_us.findOne({
      where: { email: rawData.email },
    });
    if (user) {
      let isCorrectPass = await checkPassWord(rawData.password, user.password);
      if (isCorrectPass === true) {
        delete user["password"];
          return {
            EM: "successfully",
            EC: 0,
            DT: {
              roleID: user.roleID,
              userID: user.id,
              fullname: user.fullname,
              img_avt: user.img_avt,
            },
        }
      }
    } 
    return {
      EM: "Your email or password is incorrect",
      EC: -1,
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "some thing wrong",
      EC: -2,
    };
  }
};

//author
const registerNewAuthor = async (rawUserData) => {
  try {
    //check email exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist",
        EC: 1,
      };
    }
    // hash pass
    let hashPasswordBcrypt = await hashAccountPassword(rawUserData.password);
    // create account
    await db.Account_au.create({
      email: rawUserData.email,
      password: hashPasswordBcrypt,
      fullname: rawUserData.fullname,
      roleID: 2,
    });
    return {
      EM: "Created successfully",
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service...",
      EC: -2,
    };
  }
};

const handleAuthorLogin = async (rawData) => {
  try {
    let author = await db.Account_au.findOne({
      where: { email: rawData.email, status: "approved" },
    });
    if (author) {
      let isCorrectPass = await checkPassWord(
        rawData.password,
        author.password
      );
      if (isCorrectPass === true) {
        delete author["password"];
        if (author && author.img_avt) {
          return {
            EM: "successfully",
            EC: 0,
            DT: {
              roleID: author.roleID,
              userID: author.id,
              fullname: author.fullname,
              img_avt: author.img_avt,
            },
          };
        } else {
          return {
            EM: "successfully",
            EC: 0,
            DT: {
              roleID: author.roleID,
              userID: author.id,
              fullname: author.fullname,
            },
          };
        }
      }

      return {
        EM: "Your email or password is incorrect",
        EC: -1,
        DT: "",
      };
    }
    return {
      EM: "Your account isn't exist",
      EC: -3,
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "some thing wrong",
      EC: -2,
    };
  }
};

//admin
const registerNewAdmin = async (rawUserData) => {
  try {
    //check email exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist",
        EC: 1,
      };
    }
    // hash pass
    let hashPasswordBcrypt = await hashAccountPassword(rawUserData.password);
    // create account
    await db.Account_ad.create({
      email: rawUserData.email,
      password: hashPasswordBcrypt,
      fullname: rawUserData.fullname,
      roleID: 3,
    });
    return {
      EM: "Created successfully",
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong in service...",
      EC: -2,
    };
  }
};

const handleAdminLogin = async (rawData) => {
  try {
    let admin = await db.Account_ad.findOne({
      where: { email: rawData.email },
    });
    if (admin) {
      let isCorrectPass = await checkPassWord(rawData.password, admin.password);
      if (isCorrectPass === true) {
        delete admin["password"];
        if (admin&&admin.img_avt) {
          return {
            EM: "successfully",
            EC: 0,
            DT: {
              roleID: admin.roleID,
              userID: admin.id,
              fullname: admin.fullname,
              img_avt: admin.img_avt,
            },
          };
        } else {
          return {
            EM: "successfully",
            EC: 0,
            DT: {
              roleID: admin.roleID,
              userID: admin.id,
              fullname: admin.fullname,
            },
          };
        }
      }
    }
    return {
      EM: "Your email or password is incorrect",
      EC: -1,
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "some thing wrong",
      EC: -2,
    };
  }
};
module.exports = {
  registerNewUser,
  handleUserLogin,
  registerNewAuthor,
  handleAuthorLogin,
  registerNewAdmin,
  handleAdminLogin,
};
