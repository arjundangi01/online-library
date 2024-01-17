import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuth, loginUserDetail } = useSelector((store) => store.userReducer);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
