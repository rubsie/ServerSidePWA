import React from "react";
import {Row, Button, Col} from "react-bootstrap";
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

    return <Row>
        <Col className={"mb-1"} sm={2}><Button onClick={() => changeStockCount(product.code, -1)}>-</Button></Col>
        <Col className={"mb-1 center"} sm={8}key={product.code}>In Stock: {product.in_stock}</Col>
        <Col className={"mb-1"} sm={2}><Button onClick={() => changeStockCount(product.code, +1)}>+</Button></Col>
    </Row>
}