import React from "react";
import { useSelector } from "react-redux";

const Detail = () => {
  const { isAuth, loginUserDetail } = useSelector((store) => store.userReducer);
  console.log(loginUserDetail);
  return (
    <main className="flex gap-5 items-center">
      <div>
        <img
          className="w-48 h-48 rounded-[50%] border object-cover"
          src={loginUserDetail?.profileImage}
          alt=""
        />
      </div>
      <div className="">
        <p className="font-semibold" >
          {" "}
          User Name : <span>{loginUserDetail?.userName}</span>
        </p>
        <p className="font-semibold" >
          {" "}
          User Email : <span>{loginUserDetail?.email}</span>
        </p>
      </div>
    </main>
  );
};

export default Detail;
