import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";

const ProfessorForm = (props) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [professor, setProfessor] = useState({});

  const addClientItem = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    // dispatch(addClient(professor));
    props.show(false);
    form.reset();
  };
  return (
    <Fragment>
      <div className="col-xl-7 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">
              Ajouter Enseignant
            </h6>
          </div>
          <Form
            style={{ padding: "15px" }}
            validated={validated}
            onSubmit={addClientItem}
          >
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  required
                  type="text"
                  className="form-control "
                  id="validationCustom01"
                  name="name"
                  onBlur={(e) =>
                    setProfessor({
                      ...professor,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>CIN</Form.Label>
                <Form.Control
                  required
                  type="text"
                  className="form-control "
                  name="cin"
                  id="validationCustom01"
                  onBlur={(e) =>
                    setProfessor({
                      ...professor,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Date de naissance</Form.Label>
                <Form.Control
                  required
                  type="date"
                  className="form-control "
                  name="birthdate"
                  id="validationCustom01"
                  onBlur={(e) =>
                    setProfessor({
                      ...professor,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form.Row>

            <hr />
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Grade</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Téléphone"
                  name="grade"
                  onBlur={(e) =>
                    setProfessor({
                      ...professor,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Date d'embauche</Form.Label>
                <Form.Control
                  required
                  type="date"
                  className="form-control "
                  name="date_emb"
                  id="validationCustom01"
                  onBlur={(e) =>
                    setProfessor({
                      ...professor,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form.Row>
            <hr />
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>E-mail contact </Form.Label>
                <Form.Control
                  type="email"
                  className="form-control"
                  name="email"
                  onBlur={(e) =>
                    setProfessor({
                      ...professor,
                      [e.target.name]: e.target.value,
                    })
                  }
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
                  name="phone"
                  onBlur={(e) =>
                    setProfessor({
                      ...professor,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form.Row>
            <hr />

            <Form.Row style={{ marginTop: "40px", marginLeft: "auto" }}>
              <Button
                className="btn btn-dark margin-auto"
                onClick={() => props.show(false)}
              >
                Fermer
              </Button>
              <Button className="btn btn-warning left-margin" type="reset">
                Réinitialiser
              </Button>
              <Button type="submit" className="btn btn-success left-margin">
                Enregistrer
              </Button>
            </Form.Row>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfessorForm;
