import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import TopCard from "../SharedComponents/TopCard";
import { getCategories } from "../../store/actions/categories.action";
import {
    BsFillPlusSquareFill,
    BsFillExclamationTriangleFill
} from "react-icons/bs";
import { FaWarehouse, FaMoneyCheckAlt } from "react-icons/fa";
import { Spinner } from "reactstrap";

const Products = () => {
    const [showForm, setShowForm] = useState(false);
    const myRef = useRef(null);
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const isLoaded = useSelector(state => state.products.isLoaded);
    const purchases = useSelector(state => state.products.purchases);
    const total = useSelector(state => state.products.total);
    const outOfStock = useSelector(state => state.products.outOfStock);

    useEffect(() => {
        dispatch(getCategories());
    }, []);

    return (
        <>
            <div className="product-section-header">
                <div>
                    <h1 className="h3 mb-2 text-gray-800">Produits</h1>
                </div>
                <div>
                    <Link className="nav-link" to="/categories">
                        <Button
                            style={{
                                backgroundColor: "#b3243c",
                                borderColor: "#b3243c"
                            }}
                        >
                            Catégories
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <TopCard
                    title="NOMBRE DE PRODUITS"
                    text={
                        isLoaded ? (
                            <div>{total}</div>
                        ) : (
                            <Spinner color="primary" />
                        )
                    }
                    icon={<FaWarehouse size="60px" color="#eee" />}
                    class="primary"
                />
                <TopCard
                    title="PRODUITS HORS STOCK"
                    text={
                        isLoaded ? (
                            <div>{outOfStock}</div>
                        ) : (
                            <Spinner color="primary" />
                        )
                    }
                    icon={
                        <BsFillExclamationTriangleFill
                            size="60px"
                            color="#eee"
                        />
                    }
                    class="danger"
                />
                <TopCard
                    title="Prix total des produits"
                    text={
                        isLoaded ? (
                            <div>{(purchases).toFixed(3)} DT</div>
                        ) : (
                            <Spinner color="primary" />
                        )
                    }
                    icon={
                        <FaMoneyCheckAlt
                            size="60px"
                            color="#eee"
                        />
                    }
                    class="warning"
                />
            </div>
            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">
                                Liste des Produits
                            </h6>
                            <div className="header-buttons">
                                <BsFillPlusSquareFill
                                    color="#243495"
                                    size="2rem"
                                    onClick={() => {
                                        setShowForm(!showForm);
                                        setTimeout(() => {
                                            myRef.current.scrollIntoView({
                                                behavior: "smooth",
                                                block: "center"
                                            });
                                        }, 100);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="card-body">
                            <ProductList />
                        </div>

                        {showForm ? (
                            <div className="row card shadow mb-4" ref={myRef}>
                                <ProductForm
                                    categories={categories}
                                    show={setShowForm}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;
