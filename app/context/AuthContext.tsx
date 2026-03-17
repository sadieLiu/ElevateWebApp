/* AuthContext stores the currently logged in user and provides login/logout functions.
This allows other pages and components to see who the user is and implement role based access control */

'use client';
import { ReactNode, createContext, useContext, useState } from "react";

type Role = 'admin' | 'tutor' | 'student'; // temporary

export interface User {
    id: string;
    role: Role;
    name: string;
    password: string;
    email: string;
}
interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => { // note: this will change once backend is setup
        setUser(userData);
    }
    const logout = () => {
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Error: no AuthProvider found");
    }
    return context;
}
