const joi = require("joi");
const {
  UserExistsError,
  UserNotExistsError,
  UserUnAuthorizedError,
  EmployeeExistError,
  EmployeeNotExistError,
} = require("../errors");

function errorLogger(err, req, res, next) {
  console.log(`Error while calling API: ${req.url}`, err);
  let statusCode = 500;
  let errorMessage = "An unexpected error occurred. Please try later.";
  switch (true) {
    case err instanceof joi.ValidationError:
      statusCode = 400;
      errorMessage = err.message;
      break;
    case err instanceof UserExistsError:
      statusCode = 400;
      errorMessage = `username is unavailable`;
      break;
    case err instanceof UserNotExistsError:
      statusCode = 400;
      errorMessage = `invalid user`;
      break;
    case err instanceof UserUnAuthorizedError:
      statusCode = 401;
      errorMessage = `user unauthorized`;
      break;
    case err instanceof EmployeeExistError:
      statusCode = 400;
      errorMessage = `employee with same id is already added`;
      break;
    case err instanceof EmployeeNotExistError:
      statusCode = 404;
      errorMessage = `employee does not exists`;
      break;
    default:
      break;
  }
  return res
    .status(statusCode)
    .send({ status: statusCode, message: errorMessage });
}

module.exports = {
  errorLogger,
};
