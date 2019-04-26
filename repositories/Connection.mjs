import mysql from 'promise-mysql';

/**
 *
 * @returns {Promise<Connection>}
 */
export default async function getConnection() {

  return mysql.createConnection({
    host: env.process['MYSQL_HOST'] || "localhost",
    user: env.process['MYSQL_USER'] || "root",
    password: env.process['MYSQL_PASSWORD'] || "root",
    database: env.process['MYSQL_DB'] || 'classicmodels'
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