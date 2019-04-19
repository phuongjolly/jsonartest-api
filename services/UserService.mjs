import {findUserByEmail} from "../repositories/UserRepository";
import bcrypt from 'bcrypt-nodejs';

export async function authenticate(email, password) {
  const user = await findUserByEmail(email);
  if(user) {
    const encryptedPassword = user.userPassword;
    if(bcrypt.compareSync(password, encryptedPassword)) {
      console.log('Login successful');
      return user;
    }
  }
  return null;
}