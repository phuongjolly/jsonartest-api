import {findCustomers} from "../services/CustomerService";

/**
 * custom query from request
 * @param query
 * return {}
 */
function getCustomerQuery(query) {
  const filter = {};
  if(query && query.customerName) {
    if (!filter['customerName']) {
      filter['customerName'] = {};
    }

    filter['customerName'] = query.customerName;
  }

  if(query && query.customerNumber) {
    if (!filter['customerNumber']) {
      filter['customerNumber'] = {};
    }

    filter['customerNumber'] = query.customerNumber;
  }

  if(query && query.salesRepEmployeeNumber) {
    if (!filter['salesRepEmployeeNumber']) {
      filter['salesRepEmployeeNumber'] = {};
    }

    filter['salesRepEmployeeNumber'] = query.salesRepEmployeeNumber;
  }

  console.log(filter);
  return filter;
}

export async function getCustomers(req, res, next) {
  const filter = getCustomerQuery(req.query);
  const page = req.query.page || 0;
  const pageSize = req.query.pageSize || 10;
  console.log(req.query);
  const data = await findCustomers(filter, page, pageSize || 10);
  res.send(data);
  next();
}

export default function Customer(server) {
  server.get('/api/v1/customers', getCustomers);
}