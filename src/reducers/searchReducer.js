import { actionType } from "../constants";

const searchReducer = (state, action) => {
    switch (action.type) {
        case actionType.GET_SEARCH_RESULT_REQUEST:
            return {
                ...state,
                searchLoading: true,
                searchError: false
            }
        case actionType.GET_SEARCH_RESULT_SUCCESS:
            return {
                ...state,
                searchLoading: false,
                searchError: false,
                searchResult: action.payload
            }
        case actionType.GET_SEARCH_RESULT_FAIL:
            return {
                ...state,
                searchLoading: false,
                searchError: true
            }

        default:
    }
}

export default searchReducer;