import React from 'react';
import { useSummary } from '../context/SummaryContext';
import Spinner from './Spinner';
import AIIcon from '../icons/AIIcon';
import './SummaryModal.css';

const SummaryModal = () => {
  const {
    isSummaryOpen,
    summaryContent,
    isLoadingSummary,
    summaryError,
    closeSummary,
  } = useSummary();

  if (!isSummaryOpen) {
    return null;
  }

  return (
    <div className="summary-modal-container">
      <div className="summary-modal-header">
        <div className="summary-modal-title-wrapper">
          <AIIcon />
          <h3 className="summary-modal-title">Article Summary</h3>
        </div>
        <button onClick={closeSummary} className="summary-modal-close-button">
          &times;
        </button>
      </div>
      <div className="summary-modal-body">
        {isLoadingSummary && <Spinner />}
        {summaryError && <p className="error-message">{summaryError}</p>}
        {summaryContent && <pre className="summary-text">{summaryContent}</pre>}
      </div>
    </div>
  );
};

export default SummaryModal;