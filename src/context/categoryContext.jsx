import rootReducer from "../reducers";
import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { getCategoriesList, getCategoryProducts } from "../actions/categoryActions";

const initalState = {
    categoryLoading: false,
    categoryError: false,
    categoryErrorMsg: "",
    categories: [],
    categoryProductLoading: false,
    categoryProductError: false,
    categoryProducts: [],
}

export const CategoryContext = createContext({})

export const CategoryProvider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer.category, initalState);
    
    useEffect(() => {
        getCategoriesList(dispatch);
    }, [dispatch])

    return (
        <CategoryContext.Provider value = {{...state, dispatch, getCategoriesList, getCategoryProducts}}>
            {children}
        </CategoryContext.Provider>
    )
}

CategoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
};