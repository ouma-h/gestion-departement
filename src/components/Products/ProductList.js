import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import {
    deleteProduct,
    getProducts,
    editProduct
} from "../../store/actions/products.action";

import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import ReactLoading from "../SharedComponents/ReactLoading";
import ActionConfirmModal from "../SharedComponents/ActionConfirmModal";
import { BsTrashFill } from "react-icons/bs";

const ProductList = () => {
    const dispatch = useDispatch();

    const products = useSelector(state => state.products.products);
    const isLoaded = useSelector(state => state.products.isLoaded);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [productId, setProductId] = useState(0);

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    const handleClose = () => setShowDeleteModal(false);
    const handleShow = () => setShowDeleteModal(true);

    const handleDelete = () => {
        dispatch(deleteProduct(productId));
        handleClose();
    };

    const actions = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className="table-actions">
                <BsTrashFill
                    size="1.3rem"
                    color="red"
                    onClick={() => {
                        setProductId(row.id);
                        handleShow();
                    }}
                />
            </div>
        );
    };

    const columns = [
        {
            dataField: "id",
            text: "N°"
        },
        {
            dataField: "reference",
            text: "Réference",
            sort: true,
            filter: textFilter()
        },
        {
            dataField: "designation",
            text: "Désignation",
            sort: true,
            filter: textFilter()
        },
        {
            dataField: "categorie.nom",
            text: "Catégorie",
            filter: textFilter()
        },
        {
            dataField: "quantite",
            text: "Quantité",
            sort: true,
            validator: (newValue, row, column) => {
                if (isNaN(newValue)) {
                    return {
                        valid: false,
                        message: "Valeur non numérique."
                    };
                }
                if (newValue < 0) {
                    return {
                        valid: false,
                        message: "Valeur négative."
                    };
                }
                return true;
            }
        },
        {
            dataField: "purchase_price",
            text: "Prix Achat",
            sort: true,
            validator: (newValue, row, column) => {
                if (isNaN(newValue)) {
                    return {
                        valid: false,
                        message: "Faites entrez une valeur numérique"
                    };
                }
                if (newValue < 0) {
                    return {
                        valid: false,
                        message: "Faites entrez une valeur positive"
                    };
                }
                return true;
            },
            formatter: (val) =>  parseFloat(val).toFixed(3)
        },
        {
            dataField: "prix",
            text: "Prix Vente",
            sort: true,
            validator: (newValue, row, column) => {
                if (isNaN(newValue)) {
                    return {
                        valid: false,
                        message: "Faites entrez une valeur numérique"
                    };
                }
                if (newValue < 0) {
                    return {
                        valid: false,
                        message: "Faites entrez une valeur positive"
                    };
                }
                return true;
            },
           formatter: (val) =>  parseFloat(val).toFixed(3)
        },
        {
            dataField: "unit",
            text: "Unité",
            sort: true
        },
        {
            dataField: "actions",
            text: "Actions",
            formatter: actions
        }
    ];
    const defaultSorted = [
        {
            dataField: "id",
            order: "desc"
        }
    ];
    const cellEdit = cellEditFactory({
        mode: "dbclick",
        afterSaveCell: (oldValue, newValue, row, column) => {
            dispatch(editProduct(row.id, column.dataField, newValue, oldValue));
        }
    });
    return (
        <>
            {isLoaded ? (
                <div className="table-responsive portlet">
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={products}
                        columns={columns}
                        cellEdit={cellEdit}
                        filter={filterFactory()}
                        noDataIndication="Pas de Produits"
                        pagination={paginationFactory()}
                        striped
                        bordered={false}
                        wrapperClasses="table-responsive"
                        defaultSorted={defaultSorted}
                    />
                    {showDeleteModal ? (
                        <ActionConfirmModal
                            show={showDeleteModal}
                            handleClose={handleClose}
                            action={handleDelete}
                        />
                    ) : null}
                </div>
            ) : (
                <ReactLoading />
            )}
        </>
    );
};
export default ProductList;
