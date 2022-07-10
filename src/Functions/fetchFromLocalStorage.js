export function fetchBasketItemsFromLocalStorage () {
    return localStorage.getItem('basketItems') ? 
    JSON.parse(localStorage.getItem('basketItems')) : [] 
}