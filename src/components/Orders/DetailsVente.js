import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle
} from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPaymentsByOrder } from "../../store/actions/orders.actions";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "react-day-picker/lib/style.css";

import { TiArrowBack } from "react-icons/ti";
import { FaEye } from "react-icons/fa";
import Solde from "../SharedComponents/Solde";

const DetailsVente = forwardRef(({ orderId, total, clientId }, ref) => {
    const dispatch = useDispatch();
    const receivedPayments = useSelector(
        state => state.orders.receivedPayments
    );
    const plannedPayments = useSelector(state => state.orders.plannedPayments);
    const paidDeliveries = useSelector(state => state.orders.paidDeliveries);
    const [value, setValue] = useState(false);
    const [checkPayment, setCheckPayment] = useState(false);

    const showModal = () => {
        setValue(true);
    };

    const hideModal = () => {
        setValue(false);
    };
    const closeSolde = () => {
        setCheckPayment(false);
    };
    useImperativeHandle(ref, () => {
        return {
            showDetailsVente: showModal
        };
    });

    useEffect(() => {
        if (orderId) {
            dispatch(getPaymentsByOrder(orderId));
        }
        return function cleanup() {
            setCheckPayment(false);
        };
    }, [orderId]);
    return (
        <>
            <Modal
                isOpen={value}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                autoFocus={true}
            >
                <ModalHeader toggle={hideModal}>Détails Paiements</ModalHeader>

                <ModalBody>
                    <>
                        {plannedPayments.length || receivedPayments.length ? (
                            <div className="total-panel">
                                <div
                                    className="grid-item"
                                    style={{ backgroundColor: "#eee" }}
                                >
                                    <span>Reste à Payer</span>
                                </div>
                                <div className="grid-item">
                                    {" "}
                                    <span>
                                        {(
                                            (total /
                                                (receivedPayments.length +
                                                    plannedPayments.length)) *
                                            plannedPayments.length
                                        ).toFixed(3)}{" "}
                                        DT
                                    </span>
                                </div>
                            </div>
                        ) : null}
                        <br />
                        <br />
                        <div className="details-order-cards">
                            <div>
                                <h5>Paiements reçus</h5>
                                {receivedPayments.length ||
                                paidDeliveries.length ? (
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Reçu le</th>
                                                <th>Mode</th>
                                                <th>Bon N°</th>
                                                <th>montant</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {receivedPayments.map(
                                                (item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                {
                                                                    item.received_payment
                                                                }
                                                            </td>

                                                            <td>
                                                                {item.mode}
                                                                {item.solde &&
                                                                item.mode !=
                                                                    "solde" ? (
                                                                    <div>
                                                                        + solde
                                                                    </div>
                                                                ) : null}{" "}
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.livraison_id
                                                                }
                                                            </td>
                                                            <td>
                                                                {receivedPayments.length ? (
                                                                    <div>
                                                                        {(
                                                                            total /
                                                                            (receivedPayments.length +
                                                                                plannedPayments.length)
                                                                        ).toFixed(
                                                                            3
                                                                        )}{" "}
                                                                        DT
                                                                    </div>
                                                                ) : null}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                            {paidDeliveries.map(
                                                (item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                {
                                                                    item.received_payment
                                                                }
                                                            </td>

                                                            <td>
                                                                {item.mode}
                                                                {item.solde &&
                                                                item.mode !=
                                                                    "solde" ? (
                                                                    <div>
                                                                        + solde
                                                                    </div>
                                                                ) : null}{" "}
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.livraison_id
                                                                }
                                                            </td>
                                                            <td
                                                                style={{
                                                                    textAlign:
                                                                        "center"
                                                                }}
                                                            >
                                                                <Link
                                                                    to={{
                                                                        pathname:
                                                                            "/bon_de_livraison",
                                                                        state: {
                                                                            id:
                                                                                item.livraison_id
                                                                        }
                                                                    }}
                                                                >
                                                                    <FaEye
                                                                        size="20px"
                                                                        color="green"
                                                                    />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </Table>
                                ) : (
                                    <div className="div-no-element-added">
                                        Aucun paiement reçu
                                    </div>
                                )}
                            </div>
                            <div>
                                <h5>Paiements en attente</h5>
                                {plannedPayments.length ? (
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Prévu</th>
                                                <th>Montant</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {plannedPayments.map(
                                                (item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <TiArrowBack
                                                                    data-toggle="tooltip"
                                                                    data-placement="right"
                                                                    title={
                                                                        !index
                                                                            ? "transformer en paiement reçu"
                                                                            : "Vous pouvez transformer uniquement la première échéance en paiement reçu"
                                                                    }
                                                                    size={
                                                                        !index
                                                                            ? "30px"
                                                                            : "25px"
                                                                    }
                                                                    color={
                                                                        !index
                                                                            ? "green"
                                                                            : null
                                                                    }
                                                                    onClick={() => {
                                                                        !index
                                                                            ? setCheckPayment(
                                                                                  true
                                                                              )
                                                                            : null;
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.planned_payment
                                                                }
                                                            </td>
                                                            <td>
                                                                {plannedPayments.length ? (
                                                                    <div>
                                                                        {(
                                                                            total /
                                                                            (receivedPayments.length +
                                                                                plannedPayments.length)
                                                                        ).toFixed(
                                                                            3
                                                                        )}{" "}
                                                                        DT
                                                                    </div>
                                                                ) : null}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </Table>
                                ) : (
                                    <div className="div-no-element-added">
                                        Aucun paiement en attente
                                    </div>
                                )}
                            </div>
                        </div>
                    </>

                    <br />
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="btn btn-danger"
                        onClick={() => {
                            hideModal();
                        }}
                    >
                        Fermer
                    </Button>
                </ModalFooter>
            </Modal>

            {checkPayment ? (
                <Solde
                    show={checkPayment}
                    handleClose={closeSolde}
                    clientId={clientId}
                    totalOwing={(
                        total /
                        (receivedPayments.length + plannedPayments.length)
                    ).toFixed(3)}
                    livraisonId={null}
                    orderId
                    toggle={downloadRequest}
                    planned_payment={plannedPayments[0]}
                />
            ) : null}
        </>
    );
});
export default DetailsVente;
