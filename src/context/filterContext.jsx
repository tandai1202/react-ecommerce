import { createContext, useReducer } from "react"
import { constants } from "../constants"
import rootReducer from "../reducers"
import PropTypes from 'prop-types'
import { loadProducts, priceSort, setGridView, setListView } from "../actions/filterActions"

const initalState = {
    products: [],
    filtered_products: [],
    grid_views: true,
    sort_by: constants.BEST_MATCH
}

export const FilterContext = createContext({})

export const FilterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer.filter, initalState);

    return (
        <FilterContext.Provider value={{...state, dispatch, setGridView, setListView, priceSort, loadProducts }}>
            {children}
        </FilterContext.Provider>
    )
}

FilterProvider.propTypes = {
    children: PropTypes.node.isRequired,
};