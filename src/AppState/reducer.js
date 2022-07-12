export const actionTypes = {
    ADD_TO_BASKET: 'ADD_TO_BASKET',
    REMOVE_FROM_BASKET: 'REMOVE_FROM_BASKET',
    SET_USER: 'SET_USER',    
}

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_BASKET:
            return {
                ...state,
                basket: action.item !== null ? [
                    ...state.basket , 
                    action.item
                ] : state.basket
            }
        case actionTypes.REMOVE_FROM_BASKET :
            return {
                ...state ,
                basket: action.items
            }
        case actionTypes.SET_USER : 
            return {
                ...state ,
                user: action.user
            }
        default: 
            return state
    }
}