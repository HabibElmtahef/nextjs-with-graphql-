import {createContext, useEffect, useReducer} from "react";
import reducers from "./Reducers";
import { useQuery, gql } from '@apollo/client'

const ME = gql`
   query {
       me {
           _id
           username
           email
           avatar
           role
       }
   }
`


export const DataContext = createContext()


export const DataProvider = ({children}) => {
    const initialState = { auth: {} }

    const [state, dispatch] = useReducer(reducers, initialState)
    const { data, error } = useQuery(ME)

    useEffect(() => {
            dispatch({
                type: 'AUTH',
                payload: {
                    user: data?.me
                }
            })
    }, [data])

    useEffect(() => {
            dispatch({
                type: 'AUTH',
                payload: {}
            })
    }, [error])

    return (
        <DataContext.Provider value={{state, dispatch}} >
            {children}
        </DataContext.Provider>
    )
}