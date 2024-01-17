import axios from "axios";
import Cookies from "js-cookie";

export const GET_VIEWERBOOK_SUCCESS = "GET_VIEWERBOOK_SUCCESS";
export const GET_ALL_BOOK_SUCCESS = "GET_ALL_BOOK_SUCCESS";

export const onGetAllBooks =
  (filterOnCategory, sort, time, setLoading) => async (dispatch) => {
    const userToken = Cookies.get("book_token");
    if (!userToken) {
      // notifyError("Please Login First");
      return;
    }
    console.log("filterOnCategory", filterOnCategory);
    try {
      let url = `${process.env.REACT_APP_BASE_URL}/books?sort=${sort}&category=${filterOnCategory}`;
      if (time == "within10") {
        url = `${url}&new=1`;
      } else if (time == "old") {
        url = `${url}&old=1`;
      }

      const response = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          role: "VIEW_ALL",
        },
      });

      dispatch({ type: GET_ALL_BOOK_SUCCESS, payload: response.data.data });
      if (setLoading) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

export const onGetViewerBooks = (setLoading) => async (dispatch) => {
  const userToken = Cookies.get("book_token");
  if (!userToken) {
    // notifyError("Please Login First");
    return;
  }
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/books`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          role: "VIEWER",
        },
      }
    );
    setLoading(false);

    dispatch({ type: GET_VIEWERBOOK_SUCCESS, payload: response.data.data });
  } catch (error) {
    setLoading(false);

    console.log(error);
  }
};

export const onAddNewBook =
  (bookData, setIsSubmitLoading,setTab) => async (dispatch) => {
    const userToken = Cookies.get("book_token");
    if (!userToken) {
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/books`,
        bookData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            role: "CREATOR",
          },
        }
      );
      console.log(response);
      setIsSubmitLoading(false);
      setTab("books");
    } catch (error) {
      console.log(error);
      setIsSubmitLoading(false);
      setTab("books");

    }
  };
export const onDeleteBook = (_id, setLoading) => async (dispatch) => {
  const userToken = Cookies.get("book_token");
  if (!userToken) {
    return;
  }
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/books/delete/${_id}`,

      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          role: "CREATOR",
        },
      }
    );
    console.log(response);
    dispatch(onGetViewerBooks(setLoading));
    setLoading(false);
  } catch (error) {
    setLoading(false);

    console.log(error);
  }
};
export const onUpdateBook =
  (id, bookData, setIsSubmitLoading, navigate) => async (dispatch) => {
    const userToken = Cookies.get("book_token");
    if (!userToken) {
      return;
    }
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/books/update/${id}`,
        bookData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            role: "CREATOR",
          },
        }
      );
      console.log(response);
      setIsSubmitLoading(false);
      
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };
