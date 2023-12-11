import http from "./http-common";

const register = (username, email, password, company_id, role_id) => {
  return http.post("/api/auth/signup", {
    username,
    email,
    password,
    company_id,
    role_id,
  });
};

const login = (username, password) => {
  return http.post("/api/auth/signin", { username, password })
    .then(response => {
      if(response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const AuthService = { register, login, logout };

export default AuthService;