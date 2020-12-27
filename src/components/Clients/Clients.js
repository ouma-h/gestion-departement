import React, { useState, useRef } from "react";
import { useSelector  } from "react-redux";

import { BsFillPlusSquareFill } from "react-icons/bs";
import TopCard from "../SharedComponents/TopCard";

import ClientList from "./ClientList";
import ClientForm from "./ClientForm";
import { BsFillPersonFill } from "react-icons/bs";
import { Spinner } from "reactstrap";

const Clients = () => {
    const [showForm, setShowForm] = useState(false);
    const myRef = useRef(null);
    const [counts, setCounts] = useState({ total: 0 });
    const isLoaded = useSelector(state => state.clients.isLoaded);

    const getCounts = a => {
        setCounts({ total: a });
    };
    return (
        <>
            <h1 className="h3 mb-2 text-gray-800">Clients</h1>
            <div className="row">
                <TopCard
                    title="NOMBRE DE CLIENTS"
                    text={
                        isLoaded ? (
                            <div>{counts.total}</div>
                        ) : (
                            <Spinner color="primary" />
                        )
                    }
                    icon={<BsFillPersonFill size="60px" color="#eee" />}
                    class="primary"
                />
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">
                                Liste des Clients
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
                            <ClientList getCounts={getCounts} />
                        </div>
                        {showForm ? (
                            <div className="card-body product-form" ref={myRef}>
                                <ClientForm show={setShowForm} counts={counts} setCounts={setCounts} />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Clients;
