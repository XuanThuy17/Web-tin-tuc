import { combineReducers } from "redux";

import  usReducer  from "./usReducer";


const rootReducer = combineReducers({
    user: usReducer,
});

export default rootReducer;