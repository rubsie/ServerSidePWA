import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css';
import './App.css';
import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {ButtonRow} from "./components/ButtonRow";
import {skipWaiting} from "./serviceWorkerRegistration";
import {ProductList} from "./components/ProductList";
import {BarcodeHandler} from "./components/BarcodeHandler";
import {ProductProvider} from "./contexts/productscontext";
import {Examples} from "./components/ExampleBarcodes";
import {ProductModal} from "./components/Modal";
import {ShoppingList} from "./components/ShoppingList";
import {MessageProvider} from "./contexts/messagecontext";
import {Message} from "./components/Message";


function App() {
    return (<MessageProvider>
            <ProductProvider>
                <Message/>
                <Container>
                    <div className="h1">Home stock management</div>
                </Container>
                <Container fluid className="mt-3 mb-3">
                    <BarcodeHandler/>
                </Container>
                <Container fluid className="mt-3 mb-3">
                    <ProductList/>
                </Container>
                <ProductModal/>
                <Container fluid className="mt-3 mb-3">
                    <Examples/>
                    <ShoppingList/>
                </Container>
            </ProductProvider>
        </MessageProvider>
    );
}

export default App;
