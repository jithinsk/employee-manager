const jsonwebtoken = require("jsonwebtoken");
const { getUser, addUser } = require("../database/user");
const { createHashedPassword, comparePasswords } = require("../utils/password");
const { UserExistsError, UserNotExistsError } = require("../errors");
const { EMPLOYEE_MANAGER_API_JWT_SECRET } = process.env;

async function signInWithAccount(username, password) {
  try {
    const userData = await getUser(username);
    if (!userData) return Promise.reject(new UserNotExistsError());
    if (!comparePasswords(userData.password, userData.salt, password))
      return Promise.reject(new UserNotExistsError());
    const currentTime = new Date().getTime();
    const token = jsonwebtoken.sign(
      {
        iss: "emp_manager",
        exp: currentTime + 86400,
        iat: currentTime,
        sub: userData.id,
      },
      EMPLOYEE_MANAGER_API_JWT_SECRET
    );
    return token;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function createUserAccount(username, password) {
  try {
    const userData = await getUser(username);
    if (userData) return Promise.reject(new UserExistsError());
    const { salt, hash: hashedPassword } = createHashedPassword(password);
    await addUser(username, hashedPassword, salt);
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  createUserAccount,
  signInWithAccount,
};
