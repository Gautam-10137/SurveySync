import React from 'react'
import { Route,Navigate } from 'react-router-dom'

const PrivateRoute = ({element,isLoggedIn,...props}) => {
     
  return (
     isLoggedIn?
     element
     :<Navigate to="/login" replace></Navigate>

  )
}

export default PrivateRoute;
