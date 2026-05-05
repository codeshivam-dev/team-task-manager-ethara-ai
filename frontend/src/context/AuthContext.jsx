import { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, login as loginApi, signup as signupApi, logout as logoutApi } from '../api/authApi';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await loginApi({ email, password });
      setUser(res.data.user);
      toast.success('Logged in successfully');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await signupApi({ name, email, password });
      setUser(res.data.user);
      toast.success('Account created successfully');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
      toast.success('Logged out');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};