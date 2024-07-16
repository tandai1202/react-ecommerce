import rootReducer from "../reducers";

import {addToBasket, clearBasket, removeFromBasket, addQuantityItem, minusQuantityItem, setBasketMsgOff, setBasketMsgOn, getBasketTotal, addToCheckout, getCheckoutTotal, setCheckoutAll, unsetCheckoutAll, removeFromCheckout} from "../actions/basketActions.js"
import { fetchFromLocalStorage } from "../ultis/helpers";
import PropTypes from "prop-types"
import { createContext, useReducer } from "react";

const initialState = {
    basket: fetchFromLocalStorage("basket"),
    itemsCount: 0,
    totalAmount: 0,
    checkoutCount: 0,
    checkoutTotal: 0,
    checkoutAll: false,
    basketMsgStatus: false
}

export const BasketContext = createContext({});

export const BasketProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer.basket, initialState);

    return (
        <BasketContext.Provider value={{...state, dispatch, addToBasket, clearBasket, removeFromBasket, addQuantityItem, minusQuantityItem, setBasketMsgOff, setBasketMsgOn, getBasketTotal, addToCheckout, removeFromCheckout, getCheckoutTotal, setCheckoutAll, unsetCheckoutAll }}>
            {children}
        </BasketContext.Provider>
    )
}

BasketProvider.prototype = {
    children: PropTypes.node.isRequired
}