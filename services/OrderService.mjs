import {findOrderDetailsFromDB, findOrdersFromDB} from "../repositories/OrderRepository";

export async function findOrders(customerNumber, page, pageSize, sortBy, order) {
  return await findOrdersFromDB(customerNumber, page, pageSize, sortBy, order);
}

export async function findOrderDetails(orderNumber) {
  return await findOrderDetailsFromDB(orderNumber);
}