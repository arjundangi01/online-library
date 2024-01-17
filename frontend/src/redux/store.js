import { legacy_createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { userReducer } from "./user/user.reducer";
import { bookReducer } from "./Book/book.reducer";
const rootReducer = combineReducers({
  userReducer,

  bookReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
