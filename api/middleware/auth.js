const jsonwebtoken = require("jsonwebtoken");
const { UserUnAuthorizedError } = require("../errors");
const { EMPLOYEE_MANAGER_API_JWT_SECRET } = process.env;

function auth(req, _, next) {
  try {
    const authHeader = req.headers["authorization"];
    const [, token] = authHeader.split(" ");
    if (!token) return next(new UserUnAuthorizedError());
    const { sub } = jsonwebtoken.verify(token, EMPLOYEE_MANAGER_API_JWT_SECRET);
    req.userID = sub;
    return next();
  } catch (error) {
    return next(new UserUnAuthorizedError());
  }
}

module.exports = {
  auth,
};
