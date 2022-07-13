export function fetchBasketItemsFromLocalStorage () {
    return localStorage.getItem('basketItems') !== 'undefined' || null ? 
    JSON.parse(localStorage.getItem('basketItems')) : [] 
}
