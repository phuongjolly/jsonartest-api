import {findAllCustomers} from "../repositories/CustomerRepository";

export async function findCustomers(filter, page, pageSize) {
  return await findAllCustomers(filter, page, pageSize);
}