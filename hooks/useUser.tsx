import { useContext, createContext, ReactNode, useEffect, useState } from "react";
import { UserDTO } from "@/dto/user.dto";

type UserContextType = {
  user: UserDTO | null;
  token: string | null;
  setUser: React.Dispatch<React.SetStateAction<UserDTO | null>>;
  saveUser: (userData: UserDTO, token?: string) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  setUser: () => {},
  saveUser: () => {},
  clearUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<UserDTO | null>(null);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const saveUser = (userData: UserDTO, tokenValue?: string) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    if (tokenValue) {
      setToken(tokenValue);
      localStorage.setItem("token", tokenValue);
    }
  };

  const clearUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, token, setUser, saveUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
