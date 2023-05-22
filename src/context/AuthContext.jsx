import { createContext, useEffect, useState } from 'react'

const defaultProvider = {
    authenticated: false,
    setIsAuthenticated: () => null,
}

const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
    const [authenticated, setIsAuthenticated] = useState(false)

    const values = {
        authenticated,
        setIsAuthenticated,
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
