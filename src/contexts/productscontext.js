import React, {useState, useContext, createContext, useCallback, useMemo, useEffect} from 'react';
//import {fetchOneBarcode} from "../utilities/fetch";
import {fromLocalStorage, removeFromLocalStorage, toLocalStorage} from "../utilities/localstorage";
//import {ProductModal} from "../components/Modal";


const ProductsContext = createContext();

export function ProductProvider(props) {
    const [shownProducts, setShownProducts] = useState([]);
    const [isStockDirty, setIsStockDirty] = useState(false);
    const [showNewProductModal, setShowNewProductModal] = useState(false);
    const [newProduct, setNewProduct] = useState({})

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


    function getImage(data) {
        if (!data.product.image_front_small_url) return "https://via.placeholder.com/200";
        else return data.product.image_front_small_url// ;
    }

    async function fetchOneBarcode(barcode) {
        //fetch data for 1 barcode
        const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}`);
        const data = await response.json();
        console.log(`---received data for ${barcode} with data: `, {data})
        //returned object when barcode not found
        if (data.status == 0) {
            return {
                code: String(data.code),
                status: data.status,
                status_verbose: data.status_verbose
            }
        } else return {
            code: String(data.code),
            product_name: data.product.product_name,
            serving_size: data.product.serving_size,
            image: getImage(data),
            in_stock: 1,
            min_stock_level: 1
        }
    }

    const fetchProduct = useCallback(async barcode => {
        console.log('getting product info for barcode: ' + barcode)
        //only fetch product if barcode not yet in shownProducts
        if (!shownProducts.some(product => product.code === barcode)) {
            const fetchedProduct = await fetchOneBarcode(barcode)
            if (fetchedProduct.status !== 0) {
                //store fetched product in localStorage for future use
                console.log("fetched info, now showing Modal")
                setNewProduct(fetchedProduct)
                setShowNewProductModal(true);
                // toLocalStorage(barcode, newProduct);
                // setShownProducts(shownProducts => [...shownProducts, newProduct].sort((a, b) => Number(a) - Number(b)));
            } else alert('product not found')
        } else alert("product already in localStorage")
    }, [shownProducts, setShownProducts]);

    const removeProduct = useCallback(async barcode => {
        console.log('removing product with barcode: ' + barcode);
        //check if product is in shownProducts
        if (shownProducts.some(product => product.code === barcode)) {
            //when true, filter all products with barcode different from argument given to callback fn
            setShownProducts(shownProducts => shownProducts.filter(product => product.code !== barcode));
            console.log('removing product from localStorage')
            removeFromLocalStorage(barcode)
        }
    }, [shownProducts, setShownProducts]);

    const api = useMemo(() => ({
        shownProducts,
        fetchProduct,
        removeProduct,
        isStockDirty,
        setIsStockDirty,
        showNewProductModal,
        setShowNewProductModal,
        newProduct,
        setNewProduct,
        setShownProducts
    }), [shownProducts, fetchProduct, removeProduct, isStockDirty, setIsStockDirty, showNewProductModal, setShowNewProductModal, newProduct, setNewProduct, setShownProducts]);

    return <ProductsContext.Provider value={api}>
        {props.children}
    </ProductsContext.Provider>
}

export const useShownProductsContext = () => useContext(ProductsContext);