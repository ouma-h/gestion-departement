import React from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

const ActionConfirmModal = props => {
    return (
        <Modal isOpen={props.show}>
            <ModalHeader toggle={props.handleClose}>
                <span style={{ color: "#5a5c69" }}>
                    Êtes-vous sûr de vouloir confirmer cette action?
                </span>
            </ModalHeader>
            <ModalFooter>
                <Button
                    color="success"
                    onClick={() => {
                        props.action();
                        props.handleClose();
                    }}
                >
                    Oui
                </Button>
                <Button color="secondary" onClick={() => props.handleClose()}>
                    Non
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ActionConfirmModal;
