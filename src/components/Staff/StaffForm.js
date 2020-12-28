import React, { useState, useEffect, Fragment, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";

const StaffForm = (props) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [staff, setStaff] = useState({});

  const ref = useRef(null);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      event.preventDefault();
      // dispatch(addClient(staff));
      props.show(false);
      form.reset();
    }
  };
  return (
    <Fragment>
      <div className="col-xl-7 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">
              Ajouter un membre
            </h6>
          </div>
          <Form
            ref={ref}
            style={{ padding: "15px" }}
            validated={validated}
            noValidate
            onSubmit={handleSubmit}
          >
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  required
                  type="text"
                  className="form-control "
                  id="validationNom"
                  name="lastName"
                  onBlur={(e) =>
                    setStaff({ ...staff, [e.target.name]: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  required
                  type="text"
                  className="form-control "
                  id="validationPrenom"
                  name="firstName"
                  onBlur={(e) =>
                    setStaff({ ...staff, [e.target.name]: e.target.value })
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
                  id="validationCIN"
                  onBlur={(e) =>
                    setStaff({ ...staff, [e.target.name]: e.target.value })
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
                  id="validationDN"
                  onBlur={(e) =>
                    setStaff({ ...staff, [e.target.name]: e.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="validationRole"
                  onBlur={(e) =>
                    setStaff({ ...staff, [e.target.name]: e.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  className="form-control"
                  id="validationEMail"
                  name="email"
                  onBlur={(e) =>
                    setStaff({ ...staff, [e.target.name]: e.target.value })
                  }
                  placeholder="Email"
                />
                <Form.Control.Feedback type="invalid">
                  Entrez un email valide.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="tel"
                  pattern="[0-9]{8}"
                  className="form-control"
                  id="validationTel"
                  placeholder="Téléphone"
                  name="phone"
                  onBlur={(e) =>
                    setStaff({ ...staff, [e.target.name]: e.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>

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

export default StaffForm;
