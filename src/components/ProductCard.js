import React from 'react';
import {Col, Row, Card, Image} from "react-bootstrap";
import {ManageStock} from "./ManageStock";

export function ProductCard(props) {
    const {product} = props;

    return <>
        <Card className={"h-100"}>
            <Card.Body>
                <Card.Title>{product.product_name}</Card.Title>
                <Row>
                    <Image src={product.image}/></Row>
                <Row>
                    <ManageStock product={product} key={product.code}/>
                </Row>
                <Row>
                    Minimal stock level: {product.min_stock_level}
                </Row>
                <Card.Footer>{product.serving_size}</Card.Footer>
            </Card.Body>
        </Card>
    </>
}