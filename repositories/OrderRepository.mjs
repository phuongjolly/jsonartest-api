import {runQuery} from "./Connection";

export async function findOrdersFromDB(customerNumber, page, pageSize, sortBy, order) {
  let query = 'select * from orders where 1 = 1';
  let params = [];
  if(customerNumber) {
    query += ` and orders.customerNumber=${customerNumber}`;
    params.push(customerNumber);
  }
  if(sortBy && sortBy !== 'undefined') {
    console.log(sortBy);
    query += ` order by ${sortBy} ${order}`;
    params.push(sortBy);
    params.push(order);
  }
  if(pageSize) {
    query += ` limit ${pageSize}`;
    params.push(pageSize);
  }
  if(page) {
    query += ` offset ${page}`;
    params.push(page);
  }

  console.log(query);

  return await runQuery(
    query, params);

}

export async function findOrderDetailsFromDB(orderNumber) {
  const query = `select * from orderdetails as ordDetails
                      inner join products as prd
                      on prd.productCode=ordDetails.productCode
                      where ordDetails.orderNumber=?`;
  return await runQuery(query, [orderNumber]);
}