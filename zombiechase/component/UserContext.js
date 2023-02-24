import { createContext, useState } from "react";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  console.log("usercontext user", user);
  console.log("usercontext token", token);

  return (
    <userContext.Provider
      value={{ user, setUser, token, setToken, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </userContext.Provider>
  );
};
