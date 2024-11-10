import React from "react";
import "./DeleteConfirmModal.css";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__delete-popup">
        <h2 className="modal__text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <div className="modal__delete-action">
          <button className="modal__confirm-button" onClick={onConfirm}>
            Yes, delete item
          </button>
          <button className="modal__cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button
            onClick={onClose}
            type="button"
            className="modal__close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
