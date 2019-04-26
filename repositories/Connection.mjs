import mysql from 'promise-mysql';

/**
 *
 * @returns {Promise<Connection>}
 */
export default async function getConnection() {

  return mysql.createConnection({
    host: process.env['MYSQL_HOST'] || "localhost",
    user: process.env['MYSQL_USER'] || "root",
    password: process.env['MYSQL_PASSWORD'] || "root",
    database: process.env['MYSQL_DB'] || 'classicmodels'
  });
}

/**
 * run the query
 * @returns {Promise<[]>}
 */
export async function runQuery(query, parameters) {
  const connection = await getConnection();
  const result = await connection.query(query, parameters);
  connection.destroy();
  return result;
}