import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoutes = () => {
  const { user, isAuthenticated, loading } = useAuth();

  console.log(user?.rol);

  if (loading) return <h1>loading...</h1>;
  if (user.rol !== 'admin') return <Navigate to='/' replace />;

  if (!loading && !isAuthenticated) return <Navigate to='/' replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
