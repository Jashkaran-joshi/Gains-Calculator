import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const getBuys = async () => {
  const response = await axios.get(`${API_BASE_URL}/buys`);
  return response.data;
};

export const addBuy = async (buyData) => {
  const response = await axios.post(`${API_BASE_URL}/buys`, buyData);
  return response.data;
};

export const deleteBuy = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/buys/${id}`);
  return response.data;
};

export const calculateSell = async (sellData) => {
  const response = await axios.post(`${API_BASE_URL}/calculate`, sellData);
  return response.data;
};
