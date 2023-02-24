import axios from "axios";

const api = axios.create({
  baseURL: "https://zombie-run.onrender.com",
});

export const login = (email, password) => {
  return api
    .post("/login", {
      email: email.toLowerCase(),
      password: password,
    })
    .then(({ data }) => {
      console.log("data", data.data);
      return data;
    });
};

export const getUser = (token) => {
  return api.get(`/user?secret_token=${token}`).then(({ data }) => {
    return data;
  });
};

export const signup = (user) => {
  return api.post(`/signup`, user).then(({ data }) => {
    console.log(data);
    return data;
  });
};
