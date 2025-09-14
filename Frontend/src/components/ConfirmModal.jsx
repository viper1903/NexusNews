import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, children }) => {
  // If the modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    // The semi-transparent background overlay
    <div className="modal-overlay" onClick={onClose}>
      {/* The modal content box */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{children}</p>
        <div className="modal-actions">
          <button onClick={onClose} className="modal-button cancel">
            No
          </button>
          <button onClick={onConfirm} className="modal-button confirm">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;