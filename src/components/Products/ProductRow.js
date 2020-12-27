import React, { useState, useEffect } from "react";

import { Form, Col } from "react-bootstrap";

const units = [
    "ML",
    "M²",
    "PIÈCES",
    "KG"
];

const ProductRow = props => {
    const id = props.id;
    const [product, setProduct] = useState({
        id: id,
        purchase_price: 0,
        prix: 0,
        reference: ""
    });
    const categoryElements = props.categories.map((category, index) => {
        return (
            <option value={category.id} key={index}>
                {category.nom}
            </option>
        );
    });

    const unitsElements = units.map((unit, index) => {
        return (
            <option value={unit} key={index}>
                {unit}
            </option>
        );
    });

    useEffect(() => {
        let tmp = props.productsList;
        let index = tmp.findIndex(p => p.id === id);
        if (index !== -1) {
            tmp.splice(index, 1, product);
            console.log(tmp);
            props.setProductsList(Array.from(tmp));
        }
    }, [product]);

    return (
        <>
            <Form.Row className="product-form-row">
                <Form.Group as={Col}>
                    <Form.Label>Réference</Form.Label>
                    <Form.Control
                        name="reference"
                        type="text"
                        className="form-control"
                        id={id}
                        placeholder="Réference"
                        onChange={e => {
                            setProduct({
                                ...product,
                                [e.target.name]: e.target.value
                            });
                        }}
                    />
                    <Form.Control.Feedback type="invalid">
                        Choisissez la catégorie.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCategorieProduct">
                    <Form.Label>Catégorie</Form.Label>
                    <Form.Control
                        name="categorie_id"
                        as="select"
                        onChange={e => {
                            setProduct({
                                ...product,
                                [e.target.name]: e.target.value
                            });
                        }}
                        required
                    >
                        <option></option>
                        {categoryElements}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Choisissez la catégorie.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDesignation">
                    <Form.Label>Désignation</Form.Label>
                    <Form.Control
                        name="designation"
                        type="text"
                        placeholder="Désignation"
                        onChange={e => {
                            setProduct({
                                ...product,
                                [e.target.name]: e.target.value
                            });
                        }}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Précisez la désignation.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridQuantityProduct">
                    <Form.Label>Quantité</Form.Label>
                    <Form.Control
                        required
                        name="quantite"
                        type="0.1"
                        className="form-control"
                        min="1"
                        onChange={e => {
                            setProduct({
                                ...product,
                                [e.target.name]: e.target.value
                            });
                        }}
                    />

                    <Form.Control.Feedback type="invalid">
                        Précisez la quantité.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPurchasePrice">
                    <Form.Label>Prix d'achat</Form.Label>
                    <Form.Control
                        name="purchase_price"
                        step="0.001"
                        type="number"
                        defaultValue="0"
                        className="form-control"
                        onChange={e => {
                            setProduct({
                                ...product,
                                [e.target.name]: e.target.value
                            });
                        }}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPrix">
                    <Form.Label>Prix de Vente</Form.Label>
                    <Form.Control
                        required
                        name="prix"
                        step="0.001"
                        type="number"
                        defaultValue="0"
                        className="form-control"
                        onChange={e => {
                            setProduct({
                                ...product,
                                [e.target.name]: e.target.value
                            });
                        }}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridUnit">
                    <Form.Label>Unité</Form.Label>
                    <Form.Control
                        as="select"
                        name="unit"
                        className="form-control"
                        onChange={e => {
                            setProduct({
                                ...product,
                                [e.target.name]: e.target.value
                            });
                        }}
                    >
                        <option></option>
                        {unitsElements}
                    </Form.Control>
                </Form.Group>
            </Form.Row>
        </>
    );
};

export default ProductRow;
