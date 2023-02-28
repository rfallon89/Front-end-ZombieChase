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
      return data;
    });
};

export const getUser = (token) => {
  return api.get(`/user?secret_token=${token}`).then(({ data }) => {
    return data;
  });
};

export const updateUser = (token, updatedUser) => {
  // const updatedUser = {
  //   username: username,
  //   email: email,
  //   name: name,
  // };
  return api
    .patch(`/user?secret_token=${token}`, updatedUser)
    .then(({ data: { result } }) => {
      return result;
    });
};

export const signup = (user) => {
  return api.post(`/signup`, user).then(({ data }) => {
    return data;
  });
};
export const postRun = (user_id, token, run_data) => {
  const body = {
    user_id: user_id,
    run_data: run_data,
    created_at: new Date(Date.now()).toDateString(),
  };
  return api
    .post(`/runs?secret_token=${token}`, body)
    .catch((e) => console.log(e));
};

export const getRuns = (user_id, token) => {
  return api
    .get(`/runs/${user_id}?secret_token=${token}`)
    .then(({ data: { result } }) => result);
};
