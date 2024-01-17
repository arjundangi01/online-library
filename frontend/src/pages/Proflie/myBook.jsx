import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetViewerBooks } from "../../redux/Book/book.action";
import BookCard from "./bookCard";
import { LoaderIcon } from "react-hot-toast";
import { LoadingIcon } from "../../components/loading";

const MyBook = ({tab}) => {
  const { isAuth, loginUserDetail } = useSelector((store) => store.userReducer);
  const { viewerBooks } = useSelector((store) => store.bookReducer);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loginUserDetail?.roles.includes("CREATOR")) {
      setLoading(true);
      dispatch(onGetViewerBooks(setLoading));
    }
  }, [tab]);
  return (
    <>
      {loading && <LoadingIcon/>}
      <div className="mt-5 grid lg:grid-cols-2 xl:grid-cols-3 gap-2 ">
        {viewerBooks?.map((ele) => (
          <BookCard key={ele?._id} {...ele} />
        ))}
      </div>
    </>
  );
};

export default MyBook;
