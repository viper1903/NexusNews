import React from "react";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import BookmarkIcon from "../icons/BookmarkIcon";
import DeleteIcon from "../icons/DeleteIcon";
import historyService from "../api/historyService";
import "./ArticleCard.css";

const ArticleCard = ({ article, isSaved, onToggleBookmark, showActions = { bookmark: true, delete: false }, onDelete }) => {
  const { user } = useAuth();

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleReadMoreClick = (e) => {
    if (!user) {
      e.preventDefault();
      toast.error("You must be logged in to read the full article.");
      return;
    }

    const articleData = {
      articleId: article.id,
      title: article.title,
      author: article.author,
      description: article.description,
      url: article.url,
      imageUrl: article.imageUrl,
      publishedAt: article.publishedAt
    };
    historyService.logArticleView(articleData).catch(err => {
      console.error("Failed to log history:", err);
    });
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(article.id);
  };

  const handleBookmarkClick = (e) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Stop event from bubbling up to the card's link
    if (!user) {
      toast.error("You must be logged in to save articles.");
      return;
    }
    onToggleBookmark(article, isSaved);
  };

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="article-card-link"
      onClick={handleReadMoreClick}
    >
      <div className="article-card">
        <div className="card-header">
          {article.imageUrl && (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="article-image"
            />
          )}
          {/* Conditional rendering for icons */}
          {user && showActions?.bookmark && (
            <div className="bookmark-icon" onClick={handleBookmarkClick}>
              <BookmarkIcon isSaved={isSaved} />
            </div>
          )}
          {user && showActions?.delete && (
            <div className="delete-icon" onClick={handleDeleteClick}>
              <DeleteIcon />
            </div>
          )}
        </div>
        <div className="article-content">
          <h3 className="article-title">{article.title}</h3>
          <p className="article-description">{article.description}</p>
          <div className="article-footer">
            <span className="article-author">
              {article.author || "Unknown Author"}
            </span>
            <span className="article-date">{formattedDate}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ArticleCard;
