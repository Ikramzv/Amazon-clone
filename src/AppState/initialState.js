import { fetchBasketItemsFromLocalStorage } from "../Functions/fetchFromLocalStorage"

const fetchBasketItems = fetchBasketItemsFromLocalStorage()

export const initialState = {
    basket: fetchBasketItems === 'undefined' ? [] : fetchBasketItems ,
    user: null,
    itemQty: [],
    triggeredItemId: ''
}