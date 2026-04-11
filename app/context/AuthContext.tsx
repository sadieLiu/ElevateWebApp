/* AuthContext stores the currently logged in user and provides login/logout functions.
This allows other pages and components to see who the user is and implement role based access control */

'use client';
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type Role = 'admin' | 'tutor' | 'student';

export interface User {
    userId: number;
    userName: string;
    role: Role;
    name: string; // note: this will be null at first
}
interface AuthContextType {
    user: User | null;
    login: (userName: string, passwordHash: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // this function keeps the user logged in
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    // this function stores the logged in user so that they stay logged in
    const login = async (userName: string, passwordHash: string) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, passwordHash }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
                return true;
            } 
            else {
                return false;
            }
        } 
        // if login was unsuccessful, send an error message
        catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Error: no AuthProvider found");
    }
    return context;
};
