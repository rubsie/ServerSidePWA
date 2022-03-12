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


function App() {
    return (
        <ProductProvider>
            <Container fluid className="mt-3 mb-3">
                {/*<Row><h1 className="mt-2">Voorbeeld PWA</h1></Row>
                <Row><p className="">versie 1.0</p></Row>
                <Row><h5>Skip Waiting</h5></Row>
                <ButtonRow>
                    <Col>
                        <Button onClick={skipWaiting}>skip waiting</Button>
                    </Col>
                </ButtonRow>*/}
                <Row><BarcodeHandler/></Row>
                <Row>
                    <ProductList/>
                </Row>
            </Container>
            <ProductModal/>
            <Examples/>
        </ProductProvider>
    );
}

export default App;
