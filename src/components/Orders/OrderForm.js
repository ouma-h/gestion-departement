import React, { useState, useEffect, Fragment, useRef } from "react";
import { useSelector } from "react-redux";

import { Form, Col } from "react-bootstrap";

import { getProducts } from "../../store/actions/products.action";
import { addOrder } from "../../store/actions/orders.actions";
import { getCategories } from "../../store/actions/categories.action";

import "react-datepicker/dist/react-datepicker.css";
import { BsFillPlusSquareFill, BsTrashFill } from "react-icons/bs";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FactureFormTemplate from "../SharedComponents/FactureFormTemplate";
import DevisFormTemplate from "../SharedComponents/DevisFormTemplate";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import ProductForm from "./ProductForm";
import { toast } from "react-toastify";
import { BASE_URL } from "../../store/store";
import ReactLoadingComponent from "../SharedComponents/ReactLoading";

const mode = [
    "Espèces",
    "Carte bancaire",
    "Chèque bancaire",
    "Virement bancaire"
];

const OrderForm = props => {
    const categories = useSelector(state => state.categories.categories);

    const [validated, setValidated] = useState(false);
    const [modalValidated, setModalValidated] = useState(false);
    const [disable, setDisable] = useState(false);
    const [selectedType, setSelectedType] = useState(1);
    const [order, setOrder] = useState({
        client_id: 0,
        etat: "",
        address_order: ""
    });
    const [show, setShow] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);

    const instantBill = useSelector(state => state.orders.instantBill);
    const [modalFacture, setModalFacture] = useState(false);
    const [beneficiary, setBeneficiary] = useState("");

    const [productsList, setProductsList] = useState([]);

    const [paymentItem, setPaymentItem] = useState({
        is_immediate: true
    });
    const downloadRequest = () => setModalFacture(!modalFacture);

    useEffect(() => {
        props.dispatch(getCategories());
    }, []);

    const clientElements = props.clients.map((item, index) => {
        return (
            <>
                <option value={index} key={index}>
                    {item.nom}
                </option>
            </>
        );
    });

    const formatName = name => {
        if (name.length >= 30) {
            return (
                name.slice(0, 15) +
                "\n\t" +
                name.slice(15, 24) +
                "\n\t" +
                name.slice(24) +
                "\t"
            );
        }
        if (name.length >= 18) {
            return name.slice(0, 10) + "\n\t" + name.slice(10);
        }
        return name;
    };
    const testPrintOnEPOS = async products => {
        var totalht = 0;
        var tva = 0;
        products.map((item, index) => {
            let total = item.pivot.quantite * item.prix;
            if (item.remise) {
                total -= (total * item.pivot.remise) / 100;
            }
            totalht += total;
            tva += total * 0.19;
        });

        const PRINT_API = "http://localhost:4000/print";
        await axios.post(
            PRINT_API,
            products.map(p => {
                return {
                    quantite: p.pivot.quantite,
                    designation: formatName(p.designation),
                    prix: p.prix - (p.prix * p.pivot.remise) / 100
                };
            })
        );
    };
    const deleteRow = () => {
        let newArr = productsList;
        newArr.pop();
        setProductsList(Array.from(newArr));
    };
    const handleReset = () => {
        formRef.current.reset();
        setValidated(false);
    };

    const handleSubmit = event => {
        if (productsList.length === 0) {
            toast.error("Précisez les produits à commander.");
            event.preventDefault();
            event.stopPropagation();
        } else {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                setValidated(true);
                setDisable(true);
                event.preventDefault();
                let tmp = productsList;
                tmp.map(p => delete p.id);
                if (selectedType == 1) {
                    setShow(true);
                } else if (selectedType == 2) {
                    props.dispatch(addOrder(order, tmp, []));
                    props.show(false);
                } else if (selectedType == 3) {
                    setShow(true);
                }
            }
        }
    };

    const getOrderProducts = id => {
        if (id) {
            setIsLoaded(false);
            axios
                .get(BASE_URL + `/commandes/produits/${id}`)
                .then(res => {
                    if (selectedType === 3) {
                        calculDevis(res.data);
                    } else {
                        // calculTotals(res.data);
                        testPrintOnEPOS(res.data);
                        setShow(false);
                        props.show(false);
                    }
                })
                .catch(error => {
                    console.log(error);
                    toast.error(
                        "Impossible de récupérer la liste de produits. Réessayer."
                    );
                });
        }
    };

    const calculTotals = products => {
        var totalht = 0;
        var tva = 0;
        products.map((item, index) => {
            let total = item.pivot.quantite * item.prix;
            if (item.remise) {
                total -= (total * item.pivot.remise) / 100;
            }
            totalht += total;
            tva += total * 0.19;
        });
        generateFacturePdf(products, tva, totalht);
    };

    const calculDevis = products => {
        var totalht = 0;
        var tva = 0;
        products.map((item, index) => {
            let total = item.pivot.quantite * item.prix;
            if (item.pivot.remise) {
                total -= (total * item.pivot.remise) / 100;
            }
            totalht += total;
            tva += total * 0.19;
        });
        generateDevisPdf(products, tva, totalht);
    };
    const generateFacturePdf = async (products, tva, totalHt) => {
        const factureDoc = FactureFormTemplate({
            orderProducts: products,
            client: { nom: beneficiary },
            facture: {
                id: instantBill.id,
                received_payment: instantBill.received_payment,
                mode: instantBill.mode
            },
            totals: { totalHt: totalHt, tva }
        });
        const blob = await pdf(factureDoc).toBlob();
        saveAs(blob, `facture_${instantBill.id}.pdf`);
        setShow(false);
        props.show(false);
    };

    const generateDevisPdf = async (products, tva, totalHt) => {
        const devisDoc = DevisFormTemplate({
            orderProducts: products,
            client: { nom: beneficiary },
            facture: {
                id: instantBill.id,
                received_payment: instantBill.received_payment,
                mode: instantBill.mode
            },
            totals: { totalHt: totalHt, tva }
        });
        const blob = await pdf(devisDoc).toBlob();
        saveAs(blob, `devis_${instantBill.id}.pdf`);
        setShow(false);
        props.show(false);
    };

    const submitCaisseOrder = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setModalValidated(true);
            setDisable(true);
            event.preventDefault();
            let tmp = productsList;
            tmp.map(p => delete p.id);
            props.dispatch(
                addOrder(
                    {
                        client_id: 0,
                        etat: selectedType === 3 ? "devis" : "caisse",
                        payed: selectedType === 3 ? -1 : 1,
                        delivered: selectedType === 3 ? -1 : 1,
                        beneficiary: beneficiary
                    },
                    tmp,
                    [paymentItem]
                )
            );
        }
    };

    useEffect(() => {
        if (Object.keys(instantBill).length != 0 && beneficiary) {
            getOrderProducts(instantBill.order_id);
        }
    }, [instantBill]);
    const formRef = useRef(null);
    return (
        <Fragment>
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-green">
                    Nouvelle Commande
                </h6>
            </div>
            <div className="card-body">
                <Form
                    validated={validated}
                    onSubmit={handleSubmit}
                    ref={formRef}
                >
                    <h5>Type de commande </h5>
                    <Form.Row
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            margin: "20px"
                        }}
                    >
                        <Button
                            outline
                            color="info"
                            onClick={() => {
                                setSelectedType(1);
                                setOrder({
                                    client_id: 0,
                                    etat: "caisse"
                                });
                            }}
                            active={selectedType === 1}
                        >
                            Commande type Caisse
                        </Button>
                        <Button
                            outline
                            color="info"
                            onClick={() => setSelectedType(2)}
                            active={selectedType === 2}
                        >
                            Commande type Facture
                        </Button>
                        <Button
                            outline
                            color="info"
                            onClick={() => setSelectedType(3)}
                            active={selectedType === 3}
                        >
                            Devis
                        </Button>
                    </Form.Row>
                    {selectedType == 2 ? (
                        <>
                            <h5> Bénéficiaire </h5>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridClient">
                                    <Form.Label>Nom Contact</Form.Label>
                                    <Form.Control
                                        required={selectedType == 2}
                                        as="select"
                                        defaultValue="Choisir..."
                                        onChange={event => {
                                            setOrder({
                                                client_id:
                                                    props.clients[
                                                        event.target.value
                                                    ].id,
                                                etat: "enregistrée",
                                                address_order:
                                                    props.clients[
                                                        event.target.value
                                                    ].addresse
                                            });
                                        }}
                                    >
                                        <option></option>
                                        {clientElements}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Choisissez le client.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    controlId="formGridAddress1"
                                >
                                    <Form.Label>
                                        Adresse de livraison
                                    </Form.Label>
                                    <Form.Control
                                        required={selectedType == 2}
                                        value={order.address_order}
                                        onBlur={event => {
                                            setOrder({
                                                address_order:
                                                    event.target.value
                                            });
                                        }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Entrer une adresse s'il vous plait.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>{" "}
                        </>
                    ) : null}
                    <br />
                    <div className="product_list_order_header">
                        <h5> Liste des Produits </h5>{" "}
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
                    {Array.isArray(productsList) && productsList.length ? (
                        productsList.map((p, index) => {
                            return (
                                <div key={index}>
                                    {
                                        <ProductForm
                                            id={p.id}
                                            categories={categories}
                                            validated={validated}
                                            productsList={productsList}
                                            setProductsList={setProductsList}
                                            flag="order"
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
                            color="danger"
                            className=" left-margin"
                            onClick={() => props.show(false)}
                        >
                            Fermer
                        </Button>
                        <Button
                            color="warning"
                            className=" left-margin"
                            onClick={() => {
                                handleReset();
                                setOrder({
                                    address_order: ""
                                });
                            }}
                        >
                            Réinitialiser
                        </Button>
                        <Button
                            color="success"
                            className="left-margin"
                            type="submit"
                            disable={disable}
                        >
                            Commander
                        </Button>
                    </Form.Row>
                </Form>
            </div>

            <Modal isOpen={show}>
                <Form validated={modalValidated} onSubmit={submitCaisseOrder}>
                    <ModalHeader toggle={() => setShow(false)}>
                        {selectedType == 3 ? "Devis" : "Paiement"}
                    </ModalHeader>

                    {isLoaded ? (
                        <>
                            <ModalBody>
                                {selectedType != 3 && (
                                    <Form.Group>
                                        <Form.Label htmlFor="inlineFormCustomSelect">
                                            Mode de paiement :
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            as="select"
                                            className="sm-2"
                                            name="mode"
                                            id="inlineFormCustomSelect"
                                            custom
                                            onBlur={e => {
                                                setPaymentItem({
                                                    ...paymentItem,
                                                    [e.target.name]:
                                                        mode[e.target.value]
                                                });
                                            }}
                                        >
                                            <option></option>
                                            <option value="0">Espèces</option>
                                            <option value="1">
                                                Carte bancaire
                                            </option>
                                            <option value="2">
                                                Chèque bancaire
                                            </option>
                                            <option value="3">
                                                Virement bancaire
                                            </option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Entrer le mode de paiement.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                )}
                                <Form.Group>
                                    <Form.Label htmlFor="inlineFormClient">
                                        À l'intention de :
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        className="sm-2"
                                        name="beneficiary"
                                        id="inlineFormClient"
                                        placeholder="Entrez le nom du débiteur"
                                        onBlur={e =>
                                            setBeneficiary(e.target.value)
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Entrer le nom du débiteur.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" type="submit">
                                    Confirmer{" "}
                                    {selectedType === 3 ? "Devis" : "Achat"}
                                </Button>
                                <Button
                                    color="secondary"
                                    onClick={() => setShow(false)}
                                >
                                    Annuler
                                </Button>
                            </ModalFooter>
                        </>
                    ) : (
                        <ModalBody>
                            <div>Patientez s'il vous plaît</div>
                            <ReactLoadingComponent />
                        </ModalBody>
                    )}
                </Form>
            </Modal>
        </Fragment>
    );
};

export default OrderForm;
