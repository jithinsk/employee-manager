const { query } = require("./connect");

async function addUser(username, password, salt) {
  try {
    await query(
      `INSERT INTO admin_users (username, password, salt) VALUES (?, ?, ?)`,
      username,
      password,
      salt
    );
  } catch (error) {
    console.log(`Error in function::addUser`, error);
    throw new Error(`Adding user failed`);
  }
}

async function getUser(username) {
  try {
    const [response] = await query(
      `SELECT id, username, password, salt FROM admin_users WHERE username = ?`,
      username
    );
    return response;
  } catch (error) {
    console.log(`Error in function::getUser`, error);
    throw new Error(`Fetching user failed`);
  }
}

module.exports = {
  addUser,
  getUser,
};
