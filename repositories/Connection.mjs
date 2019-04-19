import mysql from 'promise-mysql';

/**
 *
 * @returns {Promise<Connection>}
 */
export default async function getConnection() {

  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'classicmodels'
  });
}

/**
 * run the query
 * @returns {Promise<[]>}
 */
export async function runQuery(query, parameters) {
  const connection = await getConnection();
  return connection.query(query, parameters);
}