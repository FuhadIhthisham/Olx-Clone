import { createContext, useState } from "react";

// creating context for signup
export const FirebaseContext = createContext(null)

export const AuthContext = createContext(null)

export default function Context ({children}) {
    const [user, setUser] = useState(null)

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}