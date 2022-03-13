import React from "react";
import {Button, Col} from "react-bootstrap";
import {fromLocalStorage, toLocalStorage} from "../utilities/localstorage";
import {useShownProductsContext} from "../contexts/productscontext";

export function ManageStock(props) {
    const {product} = props;
    const {isStockDirty, setIsStockDirty} = useShownProductsContext()

    function changeStockCount(barcode, number) {
        let productInfo = fromLocalStorage(product.code);
        if (productInfo.in_stock === 0 && number < 0) {
            alert("cannot have negative stock quantity")
        } else if (productInfo.in_stock >= 0) {
            productInfo.in_stock += number;
            toLocalStorage(barcode, productInfo);
            setIsStockDirty(!isStockDirty);
        }
    }

    return <>
        <Col className={"mb-2"}><Button onClick={() => changeStockCount(product.code, -1)}>-</Button></Col>
        <Col className={"mb-8"} key={product.code}><Button variant="dark">In Stock: {product.in_stock}</Button></Col>
        <Col className={"mb-2"}><Button onClick={() => changeStockCount(product.code, +1)}>+</Button></Col>
    </>
}