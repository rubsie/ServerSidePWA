import React from 'react';
import {useShownProductsContext} from "../contexts/productscontext";
import {ProductCard} from "./ProductCard";
import {Col, Row, Container} from "react-bootstrap";


export function ProductList() {
    const {shownProducts} = useShownProductsContext();

    return <Container fluid className={"headerIntro"}>
        <Row className={"mx-0"}>
            {shownProducts.map(product => <Col className={"mb-3"} xs={6} sm={6} lg={3} xl={2}
                                               key={product.code}><ProductCard key={product.code}
                                                                               product={product}/></Col>)}
        </Row>
    </Container>
}

