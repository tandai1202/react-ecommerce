import {createContext, useEffect, useReducer} from 'react'
import rootReducer from "../reducers"

import PropTypes from "prop-types"
import { getAllProducts, getSingleProduct } from '../actions/productActions'

const initalState = {
    products: [],
    productsLoading: false,
    productsError: false,
    productsErrorMsg: "",
    singleProduct: [],
    singleProductLoading: false,
    singleProductError: false,
    singleProductErrorMsg: "",
}

export const ProductContext = createContext({})

export const ProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer.product, initalState)

    useEffect(() => {
      getAllProducts(dispatch);
    }, [])
    
    return (
        <ProductContext.Provider value={{ ...state, dispatch, getSingleProduct}}>
            {children}
        </ProductContext.Provider>
    )
}

ProductProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
