import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  StyledModal,
  StyledModalHeader,
  StyledModalOverlay,
  StyledModalBody,
} from "./styles/ModalStyles";

function Modal({ show, onClose, children, title, onConfirm, confirm }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };
  const handleConfirmClick = (e) => {
    e.preventDefault();
    onConfirm();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal data-test="modalElement">
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </StyledModalHeader>
        {title && <h2>{title}</h2>}
        <StyledModalBody data-test="modalContent">{children}</StyledModalBody>
        {onConfirm && (
          <a href="#" onClick={handleConfirmClick} data-test="confirmBttn">
            {confirm}
          </a>
        )}
        {` `}
        <a href="#" onClick={handleCloseClick} data-test="closeModal">
          Close
        </a>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  }
  return null;
}

export default Modal;
