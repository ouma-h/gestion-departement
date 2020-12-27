import React, { useState, useEffect, Fragment, useRef } from "react";
import { addProduct } from "../../store/actions/products.action";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { BsFillPlusSquareFill, BsTrashFill } from "react-icons/bs";
import { getCategories } from "../../store/actions/categories.action";

import ProductRow from "./ProductRow";

const ProductForm = props => {
    const categories = useSelector(state => state.categories.categories);

    const dispatch = useDispatch();

    const [validated, setValidated] = useState(false);

    const [productsList, setProductsList] = useState([]);

    const deleteRow = () => {
        let newArr = productsList;
        newArr.pop();
        setProductsList(Array.from(newArr));
    };
    const addProductItem = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setValidated(true);
            event.preventDefault();
            let tmp = productsList;
            tmp.map(p => delete p.id);
            dispatch(addProduct(tmp));
            props.show(false);
        }
    };
    const handleReset = () => {
        formRef.current.reset();
        setValidated(false);
        setProductsList([]);
    };

    useEffect(() => {
        dispatch(getCategories());
    }, []);
    const formRef = useRef(null);

    return (
        <Fragment>
            <div
                className="card-header py-3"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <h6 className="m-0 font-weight-bold text-green">
                    Nouveau(x) Produit(s)
                </h6>
                <BsFillPlusSquareFill
                    color="#243495"
                    size="2rem"
                    onClick={() => {
                        setProductsList([
                            ...productsList,
                            {
                                id: Math.random().toString(32)
                            }
                        ]);
                    }}
                />
            </div>
            <Form
                style={{ padding: "15px" }}
                ref={formRef}
                validated={validated}
                onSubmit={addProductItem}
            >
                {Array.isArray(productsList) && productsList.length ? (
                    productsList.map((p, index) => {
                        return (
                            <div key={index}>
                                <div className="m-0 font-weight-bold text-green">
                                    Produit N° {index + 1}
                                </div>
                                {
                                    <ProductRow
                                        categories={categories}
                                        id={p.id}
                                        productsList={productsList}
                                        setProductsList={setProductsList}
                                        validated={validated}
                                    />
                                }
                                {index == productsList.length - 1 ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            marginBottom: "10px"
                                        }}
                                    >
                                        <BsTrashFill
                                            className="product_row_delete"
                                            size="25px"
                                            onClick={() => {
                                                deleteRow();
                                            }}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        );
                    })
                ) : (
                    <div className="div-no-element-added">
                        Aucun produit Ajouté
                    </div>
                )}
                <Form.Row
                    style={{
                        display: " flex",
                        flexDirection: "row-reverse"
                    }}
                >
                    <Button
                        className="btn btn-dark left-margin"
                        onClick={() => props.show(false)}
                    >
                        Fermer
                    </Button>
                    <Button
                        className="btn btn-warning left-margin"
                        onClick={() => {
                            handleReset();
                        }}
                    >
                        Réinitialiser
                    </Button>
                    <Button
                        type="submit"
                        className="btn btn-success left-margin"
                    >
                        Enregistrer
                    </Button>
                </Form.Row>
            </Form>
        </Fragment>
    );
};

export default ProductForm;
