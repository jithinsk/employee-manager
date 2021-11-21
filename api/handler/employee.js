const {
  addEmployee,
  getEmployeeByID,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeByUniqueID,
} = require("../database/employee");
const { EmployeeExistError, EmployeeNotExistError } = require("../errors");

async function addNewEmployee(employee, userID) {
  try {
    const currentEmployee = await getEmployeeByID(employee.employeeID);
    if (currentEmployee) return Promise.reject(new EmployeeExistError());
    await addEmployee({ ...employee, addedBy: userID });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function updateExistingEmployee(id, employee) {
  try {
    const currentEmployee = await getEmployeeByUniqueID(id);
    if (!currentEmployee) return Promise.reject(new EmployeeNotExistError());
    await updateEmployee(id, employee);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function deleteExistingEmployee(id) {
  try {
    const currentEmployee = await getEmployeeByUniqueID(id);
    if (!currentEmployee) return Promise.reject(new EmployeeNotExistError());
    await deleteEmployee(id);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function searchEmployees(searchFields) {
  try {
    const searchParams = [];
    for (const key in searchFields) {
      if (!searchFields[key] || ["page", "limit"].includes(key)) continue;
      searchParams.push({ key, value: searchFields[key] });
    }
    const limit = parseInt(searchFields["limit"] || 5),
      skip = parseInt(((searchFields["page"] || 1) - 1) * limit);
    const { countData, response } = await getEmployees(
      searchParams,
      limit,
      skip
    );
    console.log(countData)
    return { employees: response, totalPages: Math.ceil(countData.totalCount / limit) };
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  addNewEmployee,
  updateExistingEmployee,
  deleteExistingEmployee,
  searchEmployees,
};
