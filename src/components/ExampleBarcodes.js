import React from "react";
import {Card} from "react-bootstrap";

export function Examples() {
    let barcodeArray = ["04963406", "5400141757828", "3017620422003", "8711200175208", "5449000238375"]
    return <Card>
        <Card.Body>
            <Card.Title>Example barcodes</Card.Title>
            {barcodeArray.map(barcode => <div key={barcode}>{barcode}</div>)}
        </Card.Body>
    </Card>
}