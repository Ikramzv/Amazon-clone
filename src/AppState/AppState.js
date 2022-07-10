import React , {createContext , useContext , useReducer} from "react";

const AppContext = createContext()

const AppStateLayer = ({ reducer , initialState , children }) => {
    return (
        <AppContext.Provider value={useReducer(reducer , initialState)} >
            { children }
        </AppContext.Provider>
    )
}


export const useStateValue = () => useContext(AppContext)
export default AppStateLayer