import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
    // const user = JSON.parse(localStorage.getItem('user'));
    const user = JSON.parse(localStorage.getItem("user"));
//   const { user } = useSelector((state) => ({ ...state.authReducer }));
  console.log(user);

  //   useEffect(() => {
  //     user ? children : navigate('/login');
  //   }, [user]);

//   return user ? children : navigate('/login');
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
