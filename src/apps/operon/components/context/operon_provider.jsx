import React, { createContext } from 'react'

export const OperonCONTEXT = createContext();

export function OperonProvider({operonContextElements, children}) {

    return (
        <OperonCONTEXT.Provider value={{
            operonContextElements
        }}>
            {children}
        </OperonCONTEXT.Provider>
    )
}
