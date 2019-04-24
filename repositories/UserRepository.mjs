import {runQuery} from "./Connection";

/**
 * find user by email
 * @param email
 * @returns {Promise<User>}
 */
export async function findUserByUsername(username) {
  const users = await runQuery(`select * from users where username=?`, [username]);

  return users && users[0];
}

/**
 * Add new User
 * @param username
 * @param password
 * @returns {Promise<*[User]>}
 */
export async function addUser(username, password) {
  const user = await findUserByUsername(username);
  if(!user) {
    return await runQuery(`insert into users (username, password) values (?, ?)`,
      [username, password]);
  }
}