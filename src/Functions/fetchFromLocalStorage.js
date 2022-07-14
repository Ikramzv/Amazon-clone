export function fetchBasketItemsFromLocalStorage () {
    return localStorage.getItem('basketItems') !== null ? 
    JSON.parse(localStorage.getItem('basketItems')) : []
}
