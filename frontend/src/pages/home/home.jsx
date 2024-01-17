import React, { useEffect, useRef, useState } from "react";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Card from "./components/card";

import { LoadingIcon } from "../../components/loading";
import { monthObj, yearObj } from "../../utils/date";
import toast, { Toaster } from "react-hot-toast";
import Banner from "./components/banner";
import { onGetAllBooks } from "../../redux/Book/book.action";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuth, loginUserDetail } = useSelector((store) => store.userReducer);

  const { allBooks } = useSelector((store) => store.bookReducer);
  const [loading, setLoading] = useState(false);
  const [filterOnCategory, setFilterOnCategory] = useState("");
  const [sort, setSort] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    setLoading(true);
    dispatch(onGetAllBooks(filterOnCategory, sort, time,setLoading));
  }, [filterOnCategory, sort, time]);

  return (
    <main className="">
      <Toaster />
      <section id="banner" className="mb-5">
        <Banner />
      </section>
      <section id="books sort" className="w-[80%] m-auto my-5">
        <div className="flex gap-3 cursor-pointer ">
          <div
            className={` ${
              time == "" ? "bg-blue-500 text-white" : ""
            } py-2 px-2 rounded-lg `}
            onClick={() => setTime("")}
          >
            All
          </div>
          <div
            className={` ${
              time == "within10" ? "bg-blue-500 text-white" : ""
            } py-2 px-2 rounded-lg `}
            onClick={() => setTime("within10")}
          >
            Within 10 min
          </div>
          <div
            className={` ${
              time == "old" ? "bg-blue-500 text-white" : ""
            } py-2 px-2 rounded-lg `}
            onClick={() => setTime("old")}
          >
            10 Min ago
          </div>
        </div>
      </section>
      <section id="books" className="w-[80%] m-auto">
        {loading && <LoadingIcon/> }
        <table className="w-[100%] m-auto">
          <thead className="border ">
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>
                <select
                  onChange={(e) => setFilterOnCategory(e.target.value)}
                  name=""
                  id=""
                >
                  <option value="">Filter Category</option>
                  <option value="science">Science</option>
                  <option value="maths">Maths</option>
                  <option value="history">History</option>
                  <option value="other">Other</option>
                </select>
              </th>
              <th>
                <select onChange={(e) => setSort(e.target.value)} name="" id="">
                  <option value="">Sort</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </th>
            </tr>
            <tr>
              <th>Book Image</th>
              <th>Book Title</th>
              <th>Author Name</th>
              <th>Publisher Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {allBooks?.map((ele) => (
              <tr>
                <td className="text-center">
                  <img className="w-20 border h-20" src={ele?.image} alt="" />
                </td>
                <td className="text-center">{ele?.bookName}</td>
                <td className="text-center">{ele?.writerName}</td>
                <td className="text-center">{ele?.publisherName}</td>
                <td className="text-center">{ele?.category}</td>
                <td className="text-center">${ele?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Home;
