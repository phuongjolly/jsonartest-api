import {runQuery} from "./Connection";

/**
 * find user by email
 * @param email
 * @returns {Promise<User>}
 */
export async function findUserByEmail(email) {
  const users = await runQuery(`select * from users where userEmail=?`, [email]);

  return users && users[0];
}

export async function addUser(email, password) {
  const user = await findUserByEmail(email);
  if(!user) {
    console.log('start adding new user', email, password);
    return await runQuery(`insert into users (userEmail, userPassword) values (?, ?)`,
      [email, password]);
  }
}