import rootReducer from "../reducers";
import PropTypes from "prop-types";

import { getSearchProducts } from "../actions/searchActions";
import { createContext, useReducer } from "react";

const initalState = {
    searchTerm: "",
    searchLoading: false,
    searchError: false,
    searchErrorMsg: "",
    searchResult: [],
}

export const searchContext = createContext({})

export const SearchProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer.search, initalState);

    return (
        <searchContext.Provider value={{...state, dispatch, getSearchProducts }}>
            {children}
        </searchContext.Provider>
    )
}

SearchProvider.propTypes = {
    children: PropTypes.node.isRequired,
}