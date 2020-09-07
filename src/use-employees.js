import React, { createContext, useContext, useReducer, useEffect } from 'react'
import sortBy from 'lodash.sortby'

const employeeContext = createContext()

export function ProvideEmployees({ children }) {
    const service = useProvideEmployees()
    return <employeeContext.Provider value={service}>{children}</employeeContext.Provider>
}

export const useEmployees = () => {
    return useContext(employeeContext)
}

const actions = {
    LOAD_EMPLOYEES: 'LOAD_EMPLOYEES',
    CHANGE_SORT: 'CHANGE_SORT',
    SEARCH_CHANGED: 'SEARCH_CHANGED',
    FILTERED_EMPLOYEES: 'FILTERED_EMPLOYEES'
}

function employeeReducer(state, action) {
    switch (action.type) {
        case actions.FILTERED_EMPLOYEES:
            return { ...state, filteredEmployees: action.employees }
        case actions.SEARCH_CHANGED:
            return { ...state, query: action.query }
        case actions.CHANGE_SORT:
            if (state.column === action.column) {
                return {
                    ...state,
                    filteredEmployees: state.filteredEmployees.reverse(),
                    direction: state.direction === "ascending" ? "descending" : "ascending"
                }
            }
            return {
                ...state,
                column: action.column,
                filteredEmployees: sortBy(state.filteredEmployees, [action.column]),
                direction: "ascending"
            }
        case actions.LOAD_EMPLOYEES:
            return { ...state, employees: action.employees, filteredEmployees: action.employees }
        default:
            throw new Error('Action not implemented')
    }
}

function useProvideEmployees() {
    const [state, dispatch] = useReducer(employeeReducer, {
        filteredEmployees: [],
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