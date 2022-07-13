export const actionTypes = {
    ADD_TO_BASKET: 'ADD_TO_BASKET',
    REMOVE_FROM_BASKET: 'REMOVE_FROM_BASKET',
    SET_USER: 'SET_USER',    
    SET_ITEM_QTY: 'SET_ITEM_QTY',
    SET_TRIGGERED_ITEM_ID: 'SET_TRIGGERED_ITEM_ID',
}

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_BASKET:
            return {
                ...state,
                basket: action.basket
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
        case actionTypes.SET_ITEM_QTY: 
            return {
                ...state,
                itemQty: action.itemQty
            }
        case actionTypes.SET_TRIGGERED_ITEM_ID: 
            return {
                ...state,
                triggeredItemId: action.itemId
            }
        default: 
            return state
    }
}