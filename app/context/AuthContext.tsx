'use client';
import { ReactNode, createContext, useContext, useState } from "react";

type Role = 'admin' | 'tutor' | 'student';

export interface User{
    id: string;
    role: Role;
    name: string;
    email: string;
    password: string;
}
interface AuthContextType {
    user: User | null;
    login: (userData : User) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ( { children } : { children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    
    const login = (userData: User) =>{
        setUser(userData);
    }
    const logout = () => {
        setUser(null);
    };

    return <AuthContext.Provider value = {{ user, login, logout }}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("no AuthProvider found");
    }
    return context;
}
