import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalBox(props) {
    const [show, setShow]   = useState(false);

    const handleClose       = () => setShow(false);
    const handleShow        = () => setShow(true);

    const defaultRender    = (() =>
        <Button variant="primary" >
            {props.buttonCaption}
        </Button>);

    const ButtonComponent   = props.buttonComponent ? props.buttonComponent : defaultRender;

    return (
    <>
        <span onClick={handleShow}>
            <ButtonComponent />
        </span>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body><h5>{props.body}</h5></Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            {props.closeCaption}
            </Button>
            <Button variant="primary" onClick={props.confirmAction ? props.confirmAction : handleClose}>
            {props.confirmCaption}
            </Button>
        </Modal.Footer>
        </Modal>
    </>
    );
}

export default ModalBox;