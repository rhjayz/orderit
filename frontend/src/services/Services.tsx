import axios from "axios";

const API_URL = import.meta.env.BACKEND_URL;

///AUTH CONFIGURATION
export const register = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const login = async (userData: { email: string; password: string }) => {
  return await axios.post(`${API_URL}/login`, userData, {
    withCredentials: true,
  });
};

export const loginGoogle = async () => {
  window.location.href = `${API_URL}/google`;
};

export const logout = async () => {
  return await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};

export const verifyAccount = async (token: string) => {
  return await axios.post(
    `${API_URL}/verify/${token}`,
    {},
    { withCredentials: true }
  );
};

export const forgotPassword = async (userData: { email: string }) => {
  return await axios.post(`${API_URL}/forgotPassword`, userData, {
    withCredentials: true,
  });
};

export const updatePassword = async (userData: {
  password: string;
  cfpassword: string;
  token: string;
}) => {
  return await axios.post(`${API_URL}/updatePassword`, userData, {
    withCredentials: true,
  });
};

///END AUTH CONFIGURATION

///DASHBOARD

export const indexDashboard = async (params: { userId: string }) => {
  return await axios.get(`${API_URL}/dashboard`, {
    params,
    withCredentials: true,
  });
};

export const filterCardDashboard = async (userData: {
  userId: string;
  selectedBranch: string;
  activeButton: string;
  selectedDate: Date | null;
}) => {
  return await axios.get(`${API_URL}/filterCard`, {
    params: userData,
    withCredentials: true,
  });
};

export const chartDataDashboard = async (params: { userId: string }) => {
  return await axios.get(`${API_URL}/chartDashboard`, {
    params,
    withCredentials: true,
  });
};

export const filterTableDashboard = async (userData: {
  userId: string;
  filterSearch: string;
  filterShow: number;
  page: number;
  isChecked: any;
}) => {
  const test = await axios.get(`${API_URL}/filterTable`, {
    params: userData,
    withCredentials: true,
  });
  console.log(test);
  return;
};

///END DASHBOARD
