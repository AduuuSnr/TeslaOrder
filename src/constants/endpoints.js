import axios from 'axios';
import { atom } from 'jotai';

export const apiUrl = 'http://192.168.1.112:5000';

export const getAllProducts = atom(async () => {
  return await axios.get(`${apiUrl}/products`);
});
export const getAllOrders = atom(async () => {
  return await axios.get(`${apiUrl}/orders`);
});

export const findAProduct = async (params) => {
  return await axios.get(`${apiUrl}/products/${params.id}`);
};
export const getAllParts = atom(async () => {
  return await axios.get(`${apiUrl}/parts`);
});
export const createOrder = async (params) => {
  return await axios.post(`${apiUrl}/orders`, {
    product_name: params.product_name,
    product_price: params.product_price,
    order_items: params.order_items,
    total_price: params.total_price,
  });
};
