import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Signup from "../pages/login/signup";
import Profile from "../pages/Proflie/profile";
import EditBook from "../pages/Proflie/editBook";
import LoginPrivate from "./loginprivateroute";
import PrivateRoute from "./homePrivateroute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      >
        {" "}
      </Route>

      <Route
        path="/login"
        element={
          <LoginPrivate>
            <Login />
          </LoginPrivate>
        }
      ></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/edit/:id" element={<EditBook />}></Route>
    </Routes>
  );
};

export default AllRoutes;
