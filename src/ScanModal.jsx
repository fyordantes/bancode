import React from "react";
import Modal from "react-modal";
import ScanVideo from "./ScanVideo";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: 0,
  },
};

Modal.setAppElement("#root");

function ScanModal({ isOpen, closeModal }) {
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div>
            <button className="modal__header" onClick={() => closeModal()}>
              Kapat!
            </button>
          <ScanVideo onClose={closeModal} />
        </div>
      </Modal>
    </div>
  );
}

export default ScanModal;
