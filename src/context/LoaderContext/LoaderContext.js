import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({children}) => {
    const [isLoading, setLoading] = useState(false);
    return (
        <LoaderContext.Provider value={{
            isLoading: isLoading,
            setLoading: setLoading
        }}>
            {children}
        </LoaderContext.Provider>
    )
}

export const useLoader = () => useContext(LoaderContext);