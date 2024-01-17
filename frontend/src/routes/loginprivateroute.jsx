import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const LoginPrivate = ({children }) => {
    const { isAuth, loginUserDetail } = useSelector((store) => store.userReducer);

    if (isAuth) {
      return <Navigate to="/" />;
    }
    return children;
}

export default LoginPrivate