const mysql = require("mysql");
const {
  EMPLOYEE_MANAGER_API_DATABASE_CONNECTION_LIMIT,
  EMPLOYEE_MANAGER_API_DATABASE_HOST,
  EMPLOYEE_MANAGER_API_DATABASE_PORT,
  EMPLOYEE_MANAGER_API_DATABASE_DATABASE_NAME,
  EMPLOYEE_MANAGER_API_DATABASE_USER,
  EMPLOYEE_MANAGER_API_DATABASE_PASSWORD,
  EMPLOYEE_MANAGER_API_DATABASE_CHARSET,
} = process.env;

let pool;
const getPool = () => {
  if (!pool) startConnection();
  return pool;
};

const startConnection = () => {
  pool = mysql.createPool({
    connectionLimit: parseInt(EMPLOYEE_MANAGER_API_DATABASE_CONNECTION_LIMIT),
    host: EMPLOYEE_MANAGER_API_DATABASE_HOST,
    port: parseInt(EMPLOYEE_MANAGER_API_DATABASE_PORT),
    database: EMPLOYEE_MANAGER_API_DATABASE_DATABASE_NAME,
    user: EMPLOYEE_MANAGER_API_DATABASE_USER,
    password: EMPLOYEE_MANAGER_API_DATABASE_PASSWORD,
    charset: EMPLOYEE_MANAGER_API_DATABASE_CHARSET,
  });
};

const testConnection = async () => {
  const pool = getPool();
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(`Unable to connect to database, error: ${err}`);
      connection.release();
      resolve();
    });
  });
};

const query = (query = "", ...params) => {
  const pool = getPool();
  return new Promise((resolve, reject) => {
    pool.query(query, params, (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
};

const closePool = () => {
  const pool = getPool();
  if (!pool) return;
  pool.end(
    (error) => error && console.log(`Error in function::closePool`, error)
  );
};

module.exports = {
  testConnection,
  query,
  closePool,
};
