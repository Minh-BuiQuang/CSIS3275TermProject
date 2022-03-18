import {Outlet, Navigate} from 'react-router-dom';

function ProtectedRoute({authenticated, redirectPath = '/'}){
    console.log(authenticated);
    if (!authenticated) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return <Outlet />;
};

export default ProtectedRoute;