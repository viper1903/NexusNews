import React, { useState, useEffect } from 'react';
import historyService from '../api/historyService';
import ArticleCard from '../components/ArticleCard';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';
import ConfirmModal from '../components/ConfirmModal';
import './HistoryPage.css';


const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalState, setModalState] = useState({ isOpen: false, type: null, articleId: null });


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await historyService.getHistory();
        // Map the response to look like an Article object for the ArticleCard
        const articles = response.data.map(h => ({ ...h, id: h.articleId }));
        setHistory(articles);
      } catch (err) {
        setError("Failed to load your reading history.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleDeleteClick = (articleId) => {
    setModalState({ isOpen: true, type: 'delete', articleId: articleId });
  };

  const handleClearAllClick = () => {
    setModalState({ isOpen: true, type: 'clearAll' });
  };


  const handleConfirmAction = async () => {
    if (modalState.type === 'delete') {
      try {
        await historyService.deleteHistoryItem(modalState.articleId);
        setHistory(current => current.filter(h => h.id !== modalState.articleId));
        toast.success("Removed from history.");
      } catch (err) {
        toast.error("Failed to remove item.");
      }
    } else if (modalState.type === 'clearAll') {
      try {
        await historyService.clearAllHistory();
        setHistory([]);
        toast.success("History cleared.");
      } catch (err) {
        toast.error("Failed to clear history.");
      }
    }
    // Close the modal after the action
    setModalState({ isOpen: false, type: null, articleId: null });
  };


  if (loading) return <Spinner />;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <div className="page-header">
        <h1>Reading History</h1>
        {history.length > 0 && (
          <button onClick={handleClearAllClick} className="clear-all-button">
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p>You have not viewed any articles yet.</p>
      ) : (
        <div className="articles-grid">
          {history.map(article => (
            <ArticleCard
              key={`${article.id}-${article.visitedAt}`} // A more unique key
              article={article}
              onDelete={handleDeleteClick}
              showActions={{ bookmark: false, delete: true }}
              // We don't need bookmark functionality on this page
              isSaved={false} 
              onToggleBookmark={() => {}}
            />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, type: null, articleId: null })}
        onConfirm={handleConfirmAction}
        title={modalState.type === 'clearAll' ? "Clear All History" : "Remove Item"}
      >
        {modalState.type === 'clearAll'
          ? "Are you sure you want to clear your entire reading history? This cannot be undone."
          : "Are you sure you want to remove this from your history?"}
      </ConfirmModal>
    </div>
  );
};

export default HistoryPage;