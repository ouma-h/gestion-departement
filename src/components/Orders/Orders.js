import React, { Fragment, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getClients } from "../../store/actions/clients.action";

import OrderList from "./OrderList";
import OrderForm from "./OrderForm";

import { BsFillPlusSquareFill } from "react-icons/bs";

const Orders = () => {
    const myRef = useRef(null);
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();
    const clients = useSelector(state => state.clients.clients);

    return (
        <>
            <h1 className="h3 mb-2 text-gray-800">Commandes</h1>
            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">
                                Liste des Commandes
                            </h6>
                            <div className="header-buttons">
                                <BsFillPlusSquareFill
                                    color="#243495"
                                    size="2rem"
                                    onClick={() => {
                                        dispatch(getClients());
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
                            <div className="header-buttons"></div>
                        </div>
                        <div className="card-body">
                            <OrderList />
                        </div>
                        {showForm ? (
                            <div className="row card shadow mb-4" ref={myRef}>
                                <OrderForm
                                    clients={clients}
                                    dispatch={dispatch}
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

export default Orders;
