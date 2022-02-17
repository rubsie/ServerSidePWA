import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css';
import './App.css';
import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {ButtonRow} from "./components/ButtonRow";


function App() {
    return (
        <Container fluid className="mt-3 mb-3">
            <Row><h1 className="mt-2">Voorbeeld PWA</h1></Row>
            <Row><p className="">versie 1.0</p></Row>
            <Row><h5>Skip Waiting</h5></Row>
            <ButtonRow>
                <Col>
                    <Button onClick={() => console.log("not yet implemented")}>skip waiting</Button>
                </Col>
            </ButtonRow>
        </Container>
    );
}

export default App;
