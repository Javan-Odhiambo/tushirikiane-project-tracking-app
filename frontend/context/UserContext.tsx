import React, { createContext, useState, useContext } from 'react';

import { User } from '../types/types';

type UserContextType = {
    user: User | undefined,
    setUser: (user: User) => void
} | undefined;

type UserProviderProps = {
    children: React.ReactNode
};

// Step 1: Create a new context
const UserContext = createContext<UserContextType| undefined>(undefined);


// Step 2: Create a provider component
export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider >
    );
};


// Create a custom hook for using the user context
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
