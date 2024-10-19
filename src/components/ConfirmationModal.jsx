import React from 'react';
import '../css/ConfirmationModal.css';

const ConfirmationModal = ({ recipeName, onConfirm, onCancel }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Are you sure you want to delete recipe "{recipeName}"?</h3>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
