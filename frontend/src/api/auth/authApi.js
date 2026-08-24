import api from "../axios.js";

//Login Api
export const loginApi = async (data) => {
  console.log("Request Data:", data);

  const response = await api.post("/auth/", data);

  console.log("Response Data:", response.data);

  return response;
};

//Logout Api
export const logoutApi = () => {
  localStorage.clear();
};
