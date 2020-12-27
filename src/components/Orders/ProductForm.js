import React, { useState, useEffect } from "react";

import axios from "axios";
import Select from "react-select";
import { Form, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { BASE_URL } from "../../store/store";

const ProductForm = props => {
    const id = props.id;
    const [product, setProduct] = useState({
        id: id,
        remise: 0
    });
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [products_per_category, setProductsPerCategory] = useState([]);
    const [products, setProducts] = useState([]);

    const getProductsPerCategory = id => {
        if (id) {
            axios
                .get(BASE_URL + `/produits/${id}`)
                .then(res => {
                    setProductsPerCategory(
                        Object.assign(
                            [],
                            res.data.filter(el => el.quantite != 0)
                        )
                    );
                })
                .catch(error => {
                    toast.error(
                        "impossible de récuperer les produits de cette catégorie."
                    );
                });
        }
    };

    const categoriesElements = props.categories.map((item, index) => {
        return (
            <option value={item.id} key={index}>
                {item.nom}
            </option>
        );
    });
    const options = () => {
        let tmp = [];
        products_per_category.map((item, index) => {
            tmp.push({
                label: `${item.designation} (${item.quantite} ${
                    item.unit ? item.unit : ""
                })`,
                value: `${item.id}`,
                quantite: `${item.quantite}`
            });
        });
        setProducts(Array.from(tmp));
    };
    useEffect(() => {
        options();
    }, [products_per_category]);

    useEffect(() => {
        let tmp = props.productsList;
        let index = tmp.findIndex(p => p.id === id);
        if (index !== -1) {
            tmp.splice(index, 1, product);
            console.log("wierd array bug", Array.from(tmp));
            props.setProductsList(Array.from(tmp));
        }
    }, [product]);

    return (
        <>
            <Form.Row className="product-form-row">
                <Form.Group as={Col} controlId="formGridCategorie">
                    <Form.Label>Catégorie</Form.Label>
                    <Form.Control
                        as="select"
                        required
                        onChange={e => getProductsPerCategory(e.target.value)}
                    >
                        <option></option>
                        {categoriesElements}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Choisissez la catégorie.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridProduct">
                    <Form.Label>Produit</Form.Label>
                    <Select
                        options={products}
                        onChange={opt => {
                            setProduct({
                                ...product,
                                product_id: opt.value
                            });
                            setSelectedProduct(opt.quantite);
                        }}
                    />

                    <Form.Control.Feedback type="invalid">
                        Choisissez le produit.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridQuantityOrder">
                    <Form.Label>
                        {props.flag === "order"
                            ? "À Commander"
                            : props.flag === "delivery"
                            ? "À Livrer"
                            : null}
                    </Form.Label>
                    <Form.Control
                        required
                        type="number"
                        min="0.1"
                        step="0.1"
                        placeholder="Au moins 1 unité"
                        max={parseFloat(selectedProduct)}
                        onBlur={e => {
                            setProduct({
                                ...product,
                                quantite: e.target.value
                            });
                        }}
                    />

                    <Form.Control.Feedback type="invalid">
                        Quantité invalide.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridRemise">
                    <Form.Label>Remise %</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.001"
                        max="20"
                        onChange={e => {
                            setProduct({
                                ...product,
                                remise: e.target.value
                            });
                        }}
                    />
                </Form.Group>
            </Form.Row>
        </>
    );
};

export default ProductForm;
