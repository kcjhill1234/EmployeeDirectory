import React, { createContext, useContext, useReducer, useEffect } from 'react'

const employeeContext = createContext()

export function ProvideEmployees({ children }) {
    const service = useProvideEmployees()
    return <employeeContext.Provider value={service}>{children}</employeeContext.Provider>
}

export const useEmployees = () => {
    return useContext(employeeContext)
}

const actions = {
    LOAD_EMPLOYEES: 'LOAD_EMPLOYEES'
}

function employeeReducer(state, action) {
    switch (action.type) {
        case actions.LOAD_EMPLOYEES:
            return { ...state, employees: action.employees }
        default:
            throw new Error('Action not implemented')
    }
}

function useProvideEmployees() {
    const [state, dispatch] = useReducer(employeeReducer, {
        employees: [],
        loading: false,
        column: null,
        direction: null,
        query: ''
    })

    useEffect(() => {
        fetch('https://randomuser.me/api/?results=200&nat=us')
            .then(response => response.json())
            .then(users => {
                console.log(users.results[0])
                dispatch({
                    type: actions.LOAD_EMPLOYEES,
                    employees: users.results.map(employee => ({
                        first: employee.name.first,
                        last: employee.name.last,
                        email: employee.email,
                        phone: employee.phone,
                        location: `${employee.location.city}, ${employee.location.state}`
                    }))
                })
            })
    }, [])


    return {
        state,
        dispatch,
        actions
    }

}