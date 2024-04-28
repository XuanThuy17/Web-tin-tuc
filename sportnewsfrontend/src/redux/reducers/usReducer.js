import actionType from "../action/actiontype";

const initState = {
  userData: {
    fullname: "",
    roleID: "",
    userID: "",
    img_avt:""
  },
  isLogin: false,
};

const usReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        userData: action.usSuccess,
      };
    case actionType.LOGIN_FAIL:
      return {
        ...state,
        isLogin: false,
        userData: null,
      };

    case actionType.UPDATE_SUCCESS:
      return {
        ...state,
        isLogin: true,
        userData: action.usUpdate,
      };

    case actionType.UPDATE_FAILED:
      return {
        ...state,
        isLogin: false,
        userData: null,
      };

    case actionType.LOGOUT:
      return {
        ...state,
        isLogin: false,
        userData: null,
      };
    default:
      return state;
  }
};

export default usReducer;
