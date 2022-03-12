import React, {useState} from "react";
import {Modal, Button} from "react-bootstrap";
import {useShownProductsContext} from "../contexts/productscontext";
import {toLocalStorage} from "../utilities/localstorage";
import {ProductCard} from "./ProductCard";

export function ProductModal(props) {
    const {shownProducts, setShownProducts, showNewProductModal, setShowNewProductModal, newProduct} = useShownProductsContext();

    const handleClose = () => {
        setShowNewProductModal(false);
    };

    const handleSave = (e, product) => {
        e.preventDefault();
        toLocalStorage(product.code, product);
        setShownProducts(shownProducts => [...shownProducts, product].sort((a, b) => Number(a) - Number(b)));
        setShowNewProductModal(false)

    }

    return <Modal show={showNewProductModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Scanned product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Here's the information from the product matching your barcode:
            <ProductCard product={newProduct}/>
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