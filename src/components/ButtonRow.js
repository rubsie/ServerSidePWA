import {Row} from "react-bootstrap";
import React from "react";

export function ButtonRow({children}) {
    return <Row className="m-3 p-3 " style={{backgroundColor: "#dddddd"}}>
        {children}
    </Row>
}