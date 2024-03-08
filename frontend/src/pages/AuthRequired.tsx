import React, { Children, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { Location, Params } from 'react-router-dom';
import { redirect } from "react-router-dom";

type AuthRequiredProps = {
  children: React.FC
  next?: string
}


/**
 * Function converts path like /user/123 to /user/:id
 */
const getRoutePath = (location: Location, params: Params): string => {
  const { pathname } = location;

  if (!Object.keys(params).length) {
    return pathname; // we don't need to replace anything
  }

  let path = pathname;
  Object.entries(params).forEach(([paramName, paramValue]) => {
    if (paramValue) {
      path = path.replace(paramValue, `:${paramName}`);
    }
  });
  return path;
};


const AuthRequired = ({ children }: AuthRequiredProps) => {
  //Should check the user is logged in and redirect to login if not
  // The state being checked is the isAuthenticated state in the authSlice
  // If the user is not authenticated, redirect to login
  // If the user is authenticated, render the children


  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const path = getRoutePath(location, params);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/login') {
      toast.error('You need to be logged in to access this page');
      navigate('/login?next=' + path);
    } else if (isAuthenticated && location.pathname === '/login') {
      toast.success('You are already logged in');
      navigate('/projects');
    }
    

  }, []);

  if (isAuthenticated) {
    return (
      <>
        {children}
      </>
    )
  }
}

export default AuthRequired