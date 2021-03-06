import {authenticate} from "../services/UserService";
import jwt from 'jsonwebtoken';
import config from '../config';

export async function login(req, res, next) {
  let {username, password} = req.body;
  const data = await authenticate(username, password);

  if(data) {
    const user = {
      username: data.username,
    };

    let token = jwt.sign(user, config.jwt.secret, {
      expiresIn: '24h' // token expires in 15 minutes
    });

    // retrieve issue and expiration times
    let { iat, exp } = jwt.decode(token);

    res.send({
      user,
      iat,
      exp,
      token
    });

  } else {
    res.send(400, {
      message: 'Login failed!'
    });
  }

  next();

}

/**
 * get current user from token
 * @param req
 * @param res
 * @param next
 * @returns {Promise<User>}
 */
async function getUserFromToken(req, res, next) {
  res.send(req.currentUser);
  next();
}

export default function User(server) {
  server.post('/api/v1/login', login);
  server.get('/api/v1/users/me', getUserFromToken);
}