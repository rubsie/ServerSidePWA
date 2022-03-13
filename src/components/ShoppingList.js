import {useShownProductsContext} from "../contexts/productscontext";
import React from "react";

export function ShoppingList(){
    const {shownProducts} = useShownProductsContext();

    return <><div className="h1">We're running out of these products:</div>
        {shownProducts.filter(product => product.in_stock<product.min_stock_level).map(productToBuy => <li>{productToBuy.product_name}</li>)}
    </>
}