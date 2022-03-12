export function fromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key) || [])
}

export function toLocalStorage(barcode, productInfo) {
    localStorage.setItem(barcode, JSON.stringify(productInfo))
}

export function removeFromLocalStorage(barcode) {
    localStorage.removeItem(barcode)
}

