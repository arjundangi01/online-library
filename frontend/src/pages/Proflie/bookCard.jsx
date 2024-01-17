import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { onDeleteBook } from "../../redux/Book/book.action";
import { Link } from "react-router-dom";
import { LoaderIcon } from "react-hot-toast";

const BookCard = ({
  _id,
  bookName,
  price,
  category,
  writerName,
  publisherName,
  createdBy,
  image,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true)
    dispatch(onDeleteBook(_id,setLoading));
  };
  return (
    <div className="flex items-center border">
      <div className="w-[50%]">
        <img className="w-[100%]" src={image} alt="" />
      </div>
      <div className="w-[50%]">
        <p className="font-semibold text-blue-500">{bookName}</p>
        <p>Writer : {writerName}</p>
        <p>Publisher : {publisherName}</p>
        <p>Category:{category}</p>
        <p>price : $ {price}</p>
        <div className="flex flex-col gap-1">
          <button
            disabled={loading}
            onClick={onDelete}
            className="bg-red-400 text-white font-semibold rounded-xl py-1 text-center flex justify-center"
          >
            { loading ?  <LoaderIcon   />  : "Delete"}
          </button>
          <Link
            to={`/edit/${_id}`}
            className="bg-green-400 text-center text-white font-semibold rounded-xl py-1"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
