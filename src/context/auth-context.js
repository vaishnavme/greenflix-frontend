import { createContext, useContext, useState } from  "react";

const AuthContext = createContext();

const user = {
    name: "Admin",
    username: "admin",
    password: "admin"
}

export function AuthProvider({children}) {
    const [isUserLogin, setLogin] = useState(false)
    const checkUser = (username, password) => {
        if(username === user.username && password === user.password) {
            setLogin(true)
        }
    }
    
    return (
        <AuthContext.Provider value={{user, isUserLogin, setLogin, checkUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);