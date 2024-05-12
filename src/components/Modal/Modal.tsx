// Modal.tsx

import React, { ReactNode } from "react";

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
}

export default function Modal(props: ModalProps) {
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay">
          <div  className="modal-box">
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}
