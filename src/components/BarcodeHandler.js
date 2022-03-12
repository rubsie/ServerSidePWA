import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useShownProductsContext} from "../contexts/productscontext";

export function BarcodeHandler() {
    const [input, setInput] = useState();
    const {addProduct} = useShownProductsContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        addProduct(input);
    }

    return <>
        <Form onSubmit={e => handleSubmit(e)}>
            <Form.Control type="text" value={input} onChange={e => setInput(e.target.value)}/>
            <Button variant="primary" type="submit">Search</Button>
        </Form>
    </>
}