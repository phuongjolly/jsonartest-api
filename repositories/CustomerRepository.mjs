import {runQuery} from "./Connection";

/**
 * get Customer list
 * @param filter
 * @param page
 * @param pageSize
 * @returns {Promise<{[Customer], count}>}
 */
export async function findAllCustomers(filter, page = 0, pageSize = 10) {

  let query = 'SELECT * FROM customers WHERE 1 = 1 ';
  let countQuery = 'SELECT count(*) FROM customers WHERE 1 = 1 ';
  const parameters = [];

  if (filter && filter.customerName) {
    query += ' AND customerName like ? ';
    countQuery += ' AND customerName like ? ';
    parameters.push(`%${filter.customerName}%`);
  }

  if(filter && filter.customerNumber) {
    query += ' AND customerNumber = ? ';
    countQuery += ' AND customerNumber = ? ';
    parameters.push(filter.customerNumber);
  }

  if(filter && filter.salesRepEmployeeNumber) {
    query += ' AND salesRepEmployeeNumber = ? ';
    countQuery += ' AND salesRepEmployeeNumber = ? ';
    parameters.push(filter.salesRepEmployeeNumber);
  }

  console.log(parameters);

  query += `limit ${pageSize} offset ${page * pageSize}`;

  console.log(query);

  const data = await runQuery(query, parameters);
  const total = await runQuery(countQuery, parameters);
  console.log(total);
  return {
    rows: data,
    count: total
  }
}