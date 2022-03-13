import React, {useState} from "react";
import {Modal, Button, Card, Row, Image, Form} from "react-bootstrap";
import {useShownProductsContext} from "../contexts/productscontext";
import {toLocalStorage} from "../utilities/localstorage";

export function ProductModal() {
    const {shownProducts, setShownProducts, showNewProductModal, setShowNewProductModal, newProduct, setNewProduct, setIsStockDirty} = useShownProductsContext();

    const handleClose = () => {
        setShowNewProductModal(false);
    };

    const handleSave = (e, product) => {
        e.preventDefault();
        toLocalStorage(product.code, product);
        setShownProducts(shownProducts => [...shownProducts, product]);
        setShowNewProductModal(false);
        setIsStockDirty(true);
    }

    return <Modal show={showNewProductModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Scanned product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Here's the information from the product matching your barcode:
            <Card className={"h-100"}>
            <Card.Body>
                <Card.Title>{newProduct.product_name}</Card.Title>
                <Row>
                    <Image src={newProduct.image}/></Row>
                <Row>Enter stock quantity:
                    <Form.Control type="number" value={newProduct.in_stock} onChange={e => setNewProduct({...newProduct, in_stock: parseInt(e.target.value)})}/>
                </Row>
                <Row>Enter minimal stock level
                    <Form.Control type="number" value={newProduct.min_stock_level} onChange={e => setNewProduct({...newProduct, min_stock_level: parseInt(e.target.value)})}/>
                </Row>
                <Card.Footer>{newProduct.serving_size}</Card.Footer>
            </Card.Body>
        </Card>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={(e, id) => handleSave(e, newProduct)}>
                Save
            </Button>
        </Modal.Footer>
    </Modal>
}