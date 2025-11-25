import { apiConnector } from "../apiconnector";
import { orderEndpoints } from "../apis";

export const getAllOrders = async (token) => {
  return apiConnector("GET", orderEndpoints.GET_ALL_ORDERS_API, null, {
    Authorization: `Bearer ${token}`,
  });
};

export const approveOrder = async (orderId, token) => {
  return apiConnector("POST", orderEndpoints.APPROVE_ORDER_API,
    { orderId },
    { Authorization: `Bearer ${token}` }
  );
};

export const rejectOrder = async (orderId, token) => {
  return apiConnector("POST", orderEndpoints.REJECT_ORDER_API,
    { orderId },
    { Authorization: `Bearer ${token}` }
  );
};
    