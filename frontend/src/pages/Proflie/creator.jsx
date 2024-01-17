import React, { useState } from "react";
import MyBook from "./myBook";
import AddBook from "./addBook";

const Creator = () => {
  const [tab, setTab] = useState("books");
  return (
    <main>
      <div className="flex cursor-pointer gap-5 ">
        <div
          className={` ${
            tab == "books" ? "bg-blue-500 text-white" : ""
          } py-2 px-2 rounded-lg `}
          onClick={() => setTab("books")}
        >
          Your Books
        </div>
        <div
          className={` ${
            tab == "add" ? "bg-blue-500 text-white" : ""
          } py-2 px-2 rounded-lg `}
          onClick={() => setTab("add")}
        >
          Add
        </div>
      </div>
      {/*  */}
      {tab == "books" ? <MyBook tab={tab} /> : <AddBook setTab={setTab} />}
    </main>
  );
};

export default Creator;
