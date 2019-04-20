import {runQuery} from "./Connection";

/**
 * get Customer list
 * @param filter
 * @param page
 * @param pageSize
 * @returns {Promise<[Customer]>}
 */
export async function findAllCustomers(filter, page = 0, pageSize = 10) {

  let query = 'SELECT * FROM customers WHERE 1 = 1 ';
  const parameters = [];

  console.log('checking...');
  console.log(filter);

  if (filter && filter.customerName) {
    query += ' AND customerName like ? ';
    parameters.push(`%${filter.customerName}%`);
  }

  if(filter && filter.customerNumber) {
    query += ' AND customerNumber = ? ';
    parameters.push(filter.customerNumber);
  }

  if(filter && filter.salesRepEmployeeNumber) {
    query += ' AND salesRepEmployeeNumber = ? ';
    parameters.push(filter.salesRepEmployeeNumber);
  }

  console.log(parameters);

  query += `limit ${pageSize} offset ${page * pageSize}`;

  console.log(query);

  return await runQuery(query, parameters);
}