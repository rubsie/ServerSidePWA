import React, {useState, useContext, createContext, useCallback, useMemo, useEffect} from 'react';
import {fetchOneBarcode} from "../utilities/fetch";
import {fromLocalStorage, removeFromLocalStorage, toLocalStorage} from "../utilities/localstorage";

const ProductsContext = createContext();

export function ProductProvider(props) {
    const [shownProducts, setShownProducts] = useState([]);
    const [isStockDirty, setIsStockDirty] = useState(false);

    //get all previously saved products from localStorage
    //store in shownProduct
    useEffect(() => {
        async function load() {
            let allProducts = []
            const keys = Object.keys(localStorage);
            for (let key of keys) {
                console.log('getting from localStorage')
                console.log(`${key}: ${localStorage.getItem(key)}`);
                allProducts.push(fromLocalStorage(key));
            }
            console.log(allProducts)
            setShownProducts(allProducts)
        }

        load()
    }, [setShownProducts, isStockDirty])

    const addProduct = useCallback(async barcode => {
        console.log('getting product info for barcode: ' + barcode)
        //only fetch product if barcode not yet in shownProducts
        if (!shownProducts.some(product => product.code === barcode)) {
            const newProduct = await fetchOneBarcode(barcode)
            if (newProduct.status != 0) {
                //store fetched product in localStorage for future use
                toLocalStorage(barcode, newProduct);
                setShownProducts(shownProducts => [...shownProducts, newProduct].sort((a, b) => Number(a) - Number(b)));
            } else console.log("product not found")
        } else console.log("product already in localStorage")
    }, [shownProducts, setShownProducts]);

    const removeProduct = useCallback(async barcode => {
        console.log('removing product with barcode: ' + barcode);
        //check if product is in shownProducts
        if (shownProducts.some(product => product.code === barcode)) {
            //when true, filter all products with barcode different from argument given to callback fn
            setShownProducts(shownProducts => shownProducts.filter(product => product.barcode !== barcode));
            console.log('removing product from localStorage')
            removeFromLocalStorage(barcode)
        }
    }, [shownProducts, setShownProducts]);

    const api = useMemo(() => ({
        shownProducts, addProduct, removeProduct, isStockDirty, setIsStockDirty
    }), [shownProducts, addProduct, removeProduct, isStockDirty, setIsStockDirty]);

    return <ProductsContext.Provider value={api}>
        {props.children}
    </ProductsContext.Provider>
}

export const useShownProductsContext = () => useContext(ProductsContext);