import restify from "restify";
import jwt from 'jsonwebtoken';
import config from './config';
import User from "./controllers/User";
import Customer from "./controllers/Customer";
import Order from "./controllers/Order";

const server = restify.createServer();
const PORT = process.env['PORT'] || 8081;

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser()); // for parsing application/x-www-form-urlencoded
server.use(restify.plugins.urlEncodedBodyParser());

//enable CORS
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use(function (request, response, next) {
  if (request.url !== '/api/v1/login') {
    const authorization = request.headers.authorization;
    const token = authorization != null ? authorization.substr(7) : null;

    console.log(token);

    jwt.verify(token, config.jwt.secret, function (err, user) {
      if(err) {
        response.send(403, {
          success: false,
          message: 'Please Log in using a valid email to submit posts'
        });
        next();
      } else {
        request.currentUser = user;
        next();
      }
    })
  } else {
    next();
  }
});

User(server);
Customer(server);
Order(server);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

//generate user data
//var salt = bcrypt.genSaltSync(10)
//const user1 = addUser('Test1', bcrypt.hashSync('test1@mytest.com', salt));
//const user2 = addUser('Test2', bcrypt.hashSync('test2@mytest.com', salt));