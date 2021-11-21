const { query } = require("./connect");

const getTotalStats = async () => {
  try {
    const [response] = await query(
      `SELECT COUNT(employee_id) AS totalCount, MAX(created_at) as maxDate, MAX(employee_id) AS maxID FROM employees`
    );
    return response;
  } catch (error) {
    console.log(`Error in function::getTotalStats`, error);
    throw new Error(`Getting total stats failed`);
  }
};

const getUserStats = async (userID) => {
  try {
    const [response] = await query(
      `SELECT COUNT(employees.employee_id) AS totalCount, MAX(employees.created_at) as maxDate, MAX(employees.employee_id) AS maxID FROM employees JOIN admin_users ON admin_users.id = employees.added_by WHERE admin_users.id = ?`,
      userID
    );
    return response;
  } catch (error) {
    console.log(`Error in function::getUserStats`, error);
    throw new Error(`Getting user stats failed`);
  }
};

module.exports = {
  getTotalStats,
  getUserStats,
};
