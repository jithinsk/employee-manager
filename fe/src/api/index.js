import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  if (config.url.includes("/api/login") || config.url.includes("/api/signup"))
    return config;
  const token = sessionStorage.getItem("access_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.data.status === 401) {
      sessionStorage.removeItem("access_token");
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

async function request({ url, method, body, params }) {
  try {
    const {
      data: { data: response },
    } = await axiosInstance({
      url: `${process.env.REACT_APP_API_URL}${url}`,
      method,
      data: body,
      params,
    });
    return response;
  } catch (error) {
    console.error(`API error: ${error}`);
    const status =
      (error.response.data && error.response.data.message) ||
      "An unexpected error occurred";
    throw new Error(status);
  }
}

export function login(username, password) {
  return request({
    method: "POST",
    url: `/login`,
    body: {
      username,
      password,
    },
  });
}

export function signup(username, password, confirmPassword) {
  return request({
    method: "POST",
    url: `/signup`,
    body: {
      username,
      password,
      confirmPassword,
    },
  });
}

export function listEmployees(searchParams) {
  return request({
    method: "GET",
    url: `/employees`,
    params: searchParams,
  });
}

export function addEmployee(employeeDetails) {
  return request({
    method: "POST",
    url: `/employees`,
    body: employeeDetails,
  });
}

export function updateEmployee(employee) {
  return request({
    method: "PUT",
    url: `/employees/${employee.id}`,
    body: employee,
  });
}

export function deleteEmployee(employeeID) {
  return request({
    method: "DELETE",
    url: `/employees/${employeeID}`,
  });
}

export function getDashboardData() {
  return request({
    method: "GET",
    url: `/stats`,
  });
}
