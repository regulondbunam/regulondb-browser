import React, { createContext, useState } from 'react'

export const DataCONTEXT = createContext();

export function DataProvider({datamart_name, datamart_arguments, children}) {

    const [_data, set_data] = useState()

    if (!_data) {
        
    }else{
        return (
            <DataCONTEXT.Provider value={{
                _data
            }}>
                {children}
            </DataCONTEXT.Provider>
        )
    }
    
}