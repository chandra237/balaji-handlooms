import { createContext, useContext, useState, useEffect, Children } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const login = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user",JSON.stringify({
            name: data.name,
            email: data.email,
            role: data.role
        }));

        setToken(data.token);
        setUser({
            name: data.name,
            email: data.email,
            role: data.role
        })
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            token,
            user,
            isLoggedIn: !!token,
            isAdmin: user?.role === "ROLE_ADMIN",
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);