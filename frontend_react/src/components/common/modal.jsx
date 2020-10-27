import React, { useState } from 'react';
import { Modal, Button }    from 'react-bootstrap';
import ModalContext from '../../context/modalContext';

function ModalBox(props) {
    const [show, setShow]   = useState(false);

    const handleClose       = () => setShow(false);
    const handleShow        = () => setShow(true);

    const defaultRender    = (() =>
        <Button variant="primary" >
            {props.buttonCaption}
        </Button>);

    const ButtonComponent   = props.buttonComponent ? props.buttonComponent : defaultRender;
    
    //props.body.props.closeModal    = {handleClose};
    return ( 
        <ModalContext.Provider value={handleClose}>
            <span onClick={handleShow}>
                <ButtonComponent />
            </span>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.heading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {props.closeCaption}
                </Button>
                {
                    props.confirmCaption ? 
                    <Button id={props.itemId} variant="primary" onClick={props.confirmAction ? props.confirmAction : handleClose}>
                        {props.confirmCaption}
                    </Button>
                    : ''
                }
            </Modal.Footer>
            </Modal>
        </ModalContext.Provider>
    );
}

export default ModalBox;