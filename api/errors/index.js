class UserExistsError extends Error {
  constructor(message = "User already exists") {
    super(message);
    this.name = "UserExistsError";
  }
}

class UserUnAuthorizedError extends Error {
  constructor(message = "User is not authorized") {
    super(message);
    this.name = "UserUnAuthorizedError";
  }
}

class UserNotExistsError extends Error {
  constructor(message = "User does not exists") {
    super(message);
    this.name = "UserNotExistsError";
  }
}

class EmployeeExistError extends Error {
  constructor(message = "Employee already exists") {
    super(message);
    this.name = "EmployeeExistError";
  }
}

class EmployeeNotExistError extends Error {
  constructor(message = "Employee does not exist") {
    super(message);
    this.name = "EmployeeNotExistError";
  }
}

module.exports = {
  UserExistsError,
  UserNotExistsError,
  UserUnAuthorizedError,
  EmployeeExistError,
  EmployeeNotExistError,
};
