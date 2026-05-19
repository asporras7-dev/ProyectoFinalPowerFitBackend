<<<<<<< HEAD
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../Services/userService';
=======
/* eslint-disable react-refresh/only-export-components, react-hooks/set-state-in-effect */
import React, { createContext, useState, useEffect } from 'react';
import { BASE_URL } from '../Services/apiConfig';
import { getUserById } from '../Services/userService';
>>>>>>> f7e7d2999b6066b1f637d367a8065ff0b1adbd23
import toast from 'react-hot-toast';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
<<<<<<< HEAD
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token) {
            setLoading(false);
            return;
        }

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch { /* ignored */ }
        }

        getCurrentUser()
            .then(freshUser => {
                if (freshUser && freshUser.id) {
                    localStorage.setItem('user', JSON.stringify(freshUser));
                    setUser(freshUser);
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                    toast.error('Sesión expirada. Inicia sesión nuevamente.');
                }
            })
            .catch(() => {
                console.warn('No se pudo verificar el token. Usando sesión local.');
            })
            .finally(() => setLoading(false));
    }, []);

    const login = (userData, token) => {
        if (token) localStorage.setItem('token', token);
=======
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            // Sync with backend to get latest data (including avatar)
            getUserById(parsedUser.id)
                .then(latestUser => {
                    if (latestUser && latestUser.id) {
                        localStorage.setItem('user', JSON.stringify(latestUser));
                        setUser(latestUser);
                    } else {
                        localStorage.removeItem('user');
                        setUser(null);
                        toast.error("Sesión inválida o expirada. Inicia sesión nuevamente.");
                    }
                })
                .catch(err => {
                    console.error("Sync error, user might not exist anymore:", err);
                    localStorage.removeItem('user');
                    setUser(null);
                    toast.error("Sesión inválida o expirada. Inicia sesión nuevamente.");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = (userData) => {
>>>>>>> f7e7d2999b6066b1f637d367a8065ff0b1adbd23
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
<<<<<<< HEAD
        localStorage.removeItem('token');
=======
>>>>>>> f7e7d2999b6066b1f637d367a8065ff0b1adbd23
        localStorage.removeItem('user');
        setUser(null);
    };

    const refreshUser = (updatedData) => {
        try {
            const stored = localStorage.getItem('user');
<<<<<<< HEAD
            const current = stored ? JSON.parse(stored) : {};
            const merged = { ...current, ...updatedData };
            localStorage.setItem('user', JSON.stringify(merged));
            setUser(merged);
        } catch {
=======
            const currentUser = stored ? JSON.parse(stored) : {};
            const newUser = { ...currentUser, ...updatedData };
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);
        } catch (error) {
            console.error("Error refreshing user data in localStorage:", error);
            // Even if localStorage fails, update the state so the UI stays in sync
>>>>>>> f7e7d2999b6066b1f637d367a8065ff0b1adbd23
            setUser(prev => ({ ...prev, ...updatedData }));
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, refreshUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};
