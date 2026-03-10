import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

const USERS_KEY = "hotel_users";
const SESSION_KEY = "hotel_session";

const generateId = () => crypto.randomUUID();

/** Hash a password using SHA-256 via the Web Crypto API */
const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on app load
  useEffect(() => {
    const session = getSession();
    if (session) {
      setIsAuthenticated(true);
      setUser(session);
    }
    setLoading(false);
  }, []);

  // Email/Password Login
  const login = async (email, password) => {
    try {
      const passwordHash = await hashPassword(password);
      const users = getUsers();
      const found = users.find(
        (u) => u.email === email && u.passwordHash === passwordHash
      );
      if (!found) {
        return { success: false, error: "Invalid email or password." };
      }
      const { passwordHash: _hash, ...userData } = found;
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Email/Password Signup
  const signup = async (email, password, name, phone) => {
    try {
      const users = getUsers();
      if (users.find((u) => u.email === email)) {
        return {
          success: false,
          error: "An account with this email already exists.",
        };
      }
      const passwordHash = await hashPassword(password);
      const newUser = {
        uid: generateId(),
        email,
        passwordHash,
        name,
        phone,
        photoURL: null,
        createdAt: new Date().toISOString(),
      };
      saveUsers([...users, newUser]);
      const { passwordHash: _hash, ...userData } = newUser;
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem(SESSION_KEY);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
