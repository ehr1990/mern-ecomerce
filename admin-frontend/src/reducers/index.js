import authReducer from "./auth.reducers";
import userReducer from "./user.reducer";
import productReducer from "./product.reducer";
import orderReducer from "./order.reducer";
import categoryReducer from "./category.reducer";
import {combineReducers} from "redux";

const rooterReducer = combineReducers({
    auth:authReducer,
    user:userReducer,
    product:productReducer,
    order:orderReducer,
    category:categoryReducer
})


export default rooterReducer;