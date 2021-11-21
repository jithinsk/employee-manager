const crypto = require("crypto");

function createHashedPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return { salt, hash };
}

function comparePasswords(hashedPassword, salt, password) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hashedPassword === hash;
}

module.exports = {
  createHashedPassword,
  comparePasswords,
};
