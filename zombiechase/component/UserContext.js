import { createContext, useState } from "react";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");

  return (
    <userContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </userContext.Provider>
  );
};
