import React from "react";
import {Button} from "react-bootstrap";
import {fromLocalStorage, toLocalStorage} from "../utilities/localstorage";
import {useShownProductsContext} from "../contexts/productscontext";

export function ManageStock(props) {
    const {product} = props;
    const {isStockDirty, setIsStockDirty} = useShownProductsContext()

    function changeStockCount(barcode, number) {
        let productInfo = fromLocalStorage(product.code);
        if (productInfo.in_stock === 0 && number <0) {
            console.log("cannot have negative stock quantity")
        }
        else if (productInfo.in_stock >= 0) {
            productInfo.in_stock += number;
            toLocalStorage(barcode, productInfo);
            setIsStockDirty(!isStockDirty);
        }

    }

    return <>
        <Button onClick={() => changeStockCount(product.code, -1)}>-</Button>
        {product.in_stock}
        <Button onClick={() => changeStockCount(product.code, +1)}>+</Button>
    </>
}