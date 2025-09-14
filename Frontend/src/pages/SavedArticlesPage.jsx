import React, { useState, useEffect } from 'react';
import bookmarkService from '../api/bookmarkService';
import ArticleCard from '../components/ArticleCard';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';
import ConfirmModal from '../components/ConfirmModal'; // 1. Import the modal component

const SavedArticlesPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // 2. Add state to manage the modal's visibility and which article to delete
  const [modalState, setModalState] = useState({ isOpen: false, articleId: null });

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const response = await bookmarkService.getBookmarks();
        const articles = response.data.map(b => ({ ...b, id: b.articleId }));
        setBookmarks(articles);
      } catch (err) {
        setError("Failed to load saved articles.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  // 3. This function now just OPENS the confirmation modal
  const handleToggleBookmark = (article, isSaved) => {
    if (isSaved) {
      setModalState({ isOpen: true, articleId: article.id });
    }
  };

  // 4. This new function handles the ACTUAL deletion after confirmation
  const handleConfirmDelete = async () => {
    if (modalState.articleId) {
      try {
        await bookmarkService.removeBookmark(modalState.articleId);
        // Update the UI instantly by filtering out the deleted article
        setBookmarks(currentBookmarks =>
          currentBookmarks.filter(b => b.id !== modalState.articleId)
        );
        toast.success("Bookmark removed!");
      } catch (error) {
        toast.error("Failed to remove bookmark.");
      } finally {
        // Close the modal
        setModalState({ isOpen: false, articleId: null });
      }
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <h1>Saved Articles</h1>
      {bookmarks.length === 0 ? (
        <p>You have no saved articles.</p>
      ) : (
        <div className="articles-grid">
          {bookmarks.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              isSaved={true} // All articles on this page are saved
              onToggleBookmark={handleToggleBookmark}
              // We want the bookmark icon, not the delete icon, here
              showActions={{ bookmark: true, delete: false }}
            />
          ))}
        </div>
      )}
      
      {/* 5. Add the modal to the page */}
      <ConfirmModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, articleId: null })}
        onConfirm={handleConfirmDelete}
        title="Remove Bookmark"
      >
        Are you sure you want to remove this article from your saved list?
      </ConfirmModal>
    </div>
  );
};

export default SavedArticlesPage;