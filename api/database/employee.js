const { query } = require("./connect");

async function addEmployee({
  employeeID,
  name,
  age,
  email,
  address,
  mobile,
  addedBy,
}) {
  try {
    await query(
      `INSERT INTO employees (employee_id, name, age, email, address, mobile, added_by) VALUES (?, ? ,?, ?, ?, ?, ?)`,
      employeeID,
      name,
      age,
      email,
      address,
      mobile,
      addedBy
    );
  } catch (error) {
    console.log(`Error in function::addEmployee`, error);
    throw new Error(`Adding employee failed`);
  }
}

async function getEmployees(searchFields, limit, skip) {
  try {
    let countQuery = `SELECT COUNT(id) as totalCount FROM employees`;
    let employeeQuery = `SELECT id, employee_id as employeeID, name, age, email, address, mobile FROM employees`;
    const params = [];
    let buildQuery = "";
    searchFields.map((field, index) => {
      let isNumber = false;
      let paramValue = field.value;
      if (["employee_id", "age"].includes(field.key)) {
        isNumber = true;
        paramValue = parseInt(paramValue);
        if (isNaN(paramValue)) return;
      }
      buildQuery = `${buildQuery}${index !== 0 ? " OR " : " WHERE "}`;
      if (isNumber) {
        buildQuery = `${buildQuery} ${field.key} = ? `;
        params.push(paramValue);
      } else {
        buildQuery = `${buildQuery} ${field.key} LIKE ? `;
        params.push(`%${paramValue}%`);
      }
    });
    const [countData] = await query(`${countQuery}${buildQuery}`, ...params);
    buildQuery = `${buildQuery} LIMIT ? OFFSET ?`;
    params.push(limit, skip);
    const response = await query(`${employeeQuery}${buildQuery}`, ...params);
    return { countData, response };
  } catch (error) {
    console.log(`Error in function::getEmployees`, error);
    throw new Error(`Fetching employees failed`);
  }
}

async function getEmployeeByUniqueID(id) {
  try {
    const [response] = await query(`SELECT * FROM employees WHERE id = ?`, id);
    return response;
  } catch (error) {
    console.log(`Error in function::getEmployeeByID`, error);
    throw new Error(`Fetching employee by id failed`);
  }
}

async function getEmployeeByID(employeeID) {
  try {
    const [response] = await query(
      `SELECT * FROM employees WHERE employee_id = ?`,
      employeeID
    );
    return response;
  } catch (error) {
    console.log(`Error in function::getEmployeeByID`, error);
    throw new Error(`Fetching employee by employee id failed`);
  }
}

async function updateEmployee(
  id,
  { employeeID, name, age, email, address, mobile }
) {
  try {
    await query(
      `UPDATE employees SET employee_id = ?, name = ?, age = ?, email = ?, address = ?, mobile = ? WHERE id = ?`,
      employeeID,
      name,
      age,
      email,
      address,
      mobile,
      id
    );
  } catch (error) {
    console.log(`Error in function::updateEmployee`, error);
    throw new Error(`Updating employee failed`);
  }
}

async function deleteEmployee(id) {
  try {
    await query(`DELETE FROM employees WHERE id = ?`, id);
  } catch (error) {
    console.log(`Error in function::deleteEmployee`, error);
    throw new Error(`Deleting employee failed`);
  }
}

module.exports = {
  addEmployee,
  getEmployees,
  getEmployeeByID,
  updateEmployee,
  deleteEmployee,
  getEmployeeByUniqueID,
};
