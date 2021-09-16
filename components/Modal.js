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
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </StyledModalHeader>
        {title && <h2>{title}</h2>}
        <StyledModalBody>{children}</StyledModalBody>
        {onConfirm && (
          <a href="#" onClick={handleConfirmClick}>
            {confirm}
          </a>
        )}
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}

export default Modal;
