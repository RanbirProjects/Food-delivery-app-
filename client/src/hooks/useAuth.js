import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  login,
  register,
  logout,
  getProfile,
  updateProfile,
} from '../features/auth/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );

  const handleLogin = async (credentials) => {
    const result = await dispatch(login(credentials));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
    return result;
  };

  const handleRegister = async (userData) => {
    const result = await dispatch(register(userData));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
    return result;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleGetProfile = () => {
    return dispatch(getProfile());
  };

  const handleUpdateProfile = (profileData) => {
    return dispatch(updateProfile(profileData));
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    getProfile: handleGetProfile,
    updateProfile: handleUpdateProfile,
  };
};

export default useAuth; 