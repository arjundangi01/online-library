import { GET_ALL_BOOK_SUCCESS, GET_VIEWERBOOK_SUCCESS } from "./book.action";

const initialState = {
  viewerBooks: [],
  allBooks: [],
};

export const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VIEWERBOOK_SUCCESS:
      return { ...state, viewerBooks: payload };
    case GET_ALL_BOOK_SUCCESS:
      return { ...state, allBooks: payload };
    default:
      return state;
  }
};
