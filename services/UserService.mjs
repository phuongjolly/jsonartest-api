import {findUserByUsername} from "../repositories/UserRepository";
import bcrypt from 'bcrypt-nodejs';

export async function authenticate(username, password) {
  const user = await findUserByUsername(username);
  if(user) {
    const encryptedPassword = user.password;
    if(bcrypt.compareSync(password, encryptedPassword)) {
      console.log('Login successful aaa');
      return user;
    }
  }
  return null;
}

