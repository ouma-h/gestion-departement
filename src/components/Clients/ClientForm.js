import React, { useState, useEffect, Fragment } from "react";
import { addClient } from "../../store/actions/clients.action";
import { useSelector, useDispatch } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";

const ClientForm = props => {
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [addresse, setAddresse] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [ville, setVille] = useState("");
    const [raison_sociale, setRaisonSociale] = useState("");
    const [email, setEmail] = useState("");
    const [matricule, setMatricule] = useState("");

    const addClientItem = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        event.preventDefault();
        dispatch(
            addClient({
                matricule_fiscal: matricule,
                nom: nom + " " + prenom,
                telephone: telephone,
                addresse: addresse + " " + ville + " " + postalCode,
                raison_sociale: raison_sociale,
                email: email
            })
        );
        props.setCounts(props.counts + 1);
        props.show(false);
        form.reset();
    };
    return (
        <Fragment>
            <div className="col-xl-7 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green">
                            Ajouter Client
                        </h6>
                    </div>
                    <Form
                        style={{ padding: "15px" }}
                        validated={validated}
                        noValidate
                        onSubmit={addClientItem}
                    >
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Société / Entreprise</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control "
                                    id="validationCustom01"
                                    placeholder="Nom de l'entreprise"
                                    onBlur={e =>
                                        setRaisonSociale(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Matricule Fiscal</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control "
                                    id="validationCustom01"
                                    placeholder="Matricule fiscal"
                                    onBlur={e => setMatricule(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Entrez le matricule.{" "}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <h4 className="mb-4">Coordonnées</h4>

                        <Form.Group>
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                id="validationCustom01"
                                placeholder="Addresse"
                                onBlur={e => setAddresse(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Entrez une adresse.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Ville</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="validationCustom01"
                                    placeholder="ville"
                                    onBlur={e => setVille(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Code Postal</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="validationCustom01"
                                    placeholder="code postale"
                                    onBlur={e => setPostalCode(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Row>
                        <h4 className="mb-4">Contact</h4>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Nom contact </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="validationCustom01"
                                    placeholder="Nom"
                                    onBlur={e => setNom(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Entrez le nom du représentant.{" "}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Prénom contact </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="validationCustom01"
                                    placeholder="Prénom"
                                    onBlur={e => setPrenom(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Entrez le prénom du représentant.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>E-mail contact </Form.Label>
                                <Form.Control
                                    type="email"
                                    className="form-control"
                                    onBlur={e => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Entrez un email valide.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Téléphone contact </Form.Label>
                                <Form.Control
                                    type="tel"
                                    pattern="[0-9]{8}"
                                    className="form-control"
                                    placeholder="Téléphone"
                                    onBlur={e => setTelephone(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row
                            style={{ marginTop: "40px", marginLeft: "auto" }}
                        >
                            <Button
                                className="btn btn-dark margin-auto"
                                onClick={() => props.show(false)}
                            >
                                Fermer
                            </Button>
                            <Button
                                className="btn btn-warning left-margin"
                                type="reset"
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
                </div>
            </div>
        </Fragment>
    );
};

export default ClientForm;
