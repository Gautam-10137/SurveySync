import React from 'react'
import { Route,Navigate } from 'react-router-dom'
import Create from '../Poll/Create';
const PrivateRoute = ({element,isLoggedIn,...props}) => {
     
  return ( isLoggedIn?element:<Navigate to="/login" replace></Navigate>

  )
}

export default PrivateRoute;
