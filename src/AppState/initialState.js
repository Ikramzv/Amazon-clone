import { fetchBasketItemsFromLocalStorage } from "../Functions/fetchFromLocalStorage"

const fetchBasketItems = fetchBasketItemsFromLocalStorage()

export const initialState = {
    basket: fetchBasketItems,
    user: null,
    itemQty: [],
    triggeredItemId: ''
}