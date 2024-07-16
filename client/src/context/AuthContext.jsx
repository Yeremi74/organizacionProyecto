import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, registerRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error('useAuth deberia estar en AuthProvider');
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setError([]);
      return setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setError(error.response.data);
      }
      setError([error.response.data.message]);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      console.log('a');
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        console.log(error);
      }
    }
    checkLogin();
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        signIn,
        user,
        isAuthenticated,
        setIsAuthenticated,
        error,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
