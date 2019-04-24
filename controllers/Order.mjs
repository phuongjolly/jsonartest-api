import {findOrderDetails, findOrders} from "../services/OrderService";

export async function getOrders(req, res, next) {
  const { customerNumber, page, pageSize, sortBy, order } = req.query;

  try {
    const data = await findOrders(customerNumber, page, pageSize, sortBy, order);
    res.send(200, data);
  } catch (e) {
    res.send(403, []);
  }

  next();
}

export async function getOrderDetailByOrderNumber(req, res, next) {
  const { id } = req.params;
  const data = await findOrderDetails(id, 0, 10);
  res.send(data);
  next();
}

export default function Orders(server) {
  server.get('/api/v1/orders', getOrders);
  server.get('/api/v1/orders/:id', getOrderDetailByOrderNumber);
}