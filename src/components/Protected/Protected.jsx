// import { Navigate } from "react-router-dom";
// import { useSelector } from 'react-redux';

// const Protected = ({ role, children }) => {
  
//     //const userRole = useSelector((state) => state.user ? state.user.role : null);

//   if (role !== "admin" && userRole !== role) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default Protected;

import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Protected = ({ requiredRole, children }) => {
  const userRole = useSelector((state) => state.user ? state.user.role : null);

  if (userRole !== "admin" && userRole !== "user") {
    return <Navigate to="/" replace />;
  }

  if (requiredRole === "admin" && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Protected;