import {Outlet, Navigate} from 'react-router-dom';

function ProtectedRoute({authenticated, redirectPath = '/'}){
    if (!authenticated) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return <Outlet />;
};

export default ProtectedRoute;