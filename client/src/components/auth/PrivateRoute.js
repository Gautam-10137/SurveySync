import React from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
const PrivateRoute = ({element,isLoggedIn,...props}) => {
     
  return ( isLoggedIn?<Routes>
    <Route {...props} element={element}>        
  </Route>
  </Routes>:<Navigate to="/login" replace></Navigate>
    
  )
}

export default PrivateRoute;
