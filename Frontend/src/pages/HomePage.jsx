import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import newsService from '../api/newsService';
import bookmarkService from '../api/bookmarkService';
import useDebounce from '../hooks/useDebounce';
import toast from 'react-hot-toast';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import CategoryNav from '../components/CategoryNav';
import Spinner from '../components/Spinner';
import './HomePage.css';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(null);
  
  const { user } = useAuth();
  const [savedArticleIds, setSavedArticleIds] = useState(new Set());
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Effect to fetch saved article IDs when user logs in or out
  useEffect(() => {
    const fetchSavedIds = async () => {
      if (user) {
        try {
          const response = await bookmarkService.getBookmarkIds();
          setSavedArticleIds(new Set(response.data));
        } catch (error) {
          console.error("Failed to fetch saved article IDs", error);
        }
      } else {
        setSavedArticleIds(new Set()); // Clear IDs on logout
      }
    };
    fetchSavedIds();
  }, [user]);

  // Effect to fetch articles based on search, category, or page change
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError('');
      try {
        let response;
        const pageSize = 9;

        if (debouncedSearchQuery) {
          response = await newsService.searchArticles(debouncedSearchQuery, page, pageSize);
        } else if (category) {
          response = await newsService.getArticlesByCategory(category, page, pageSize);
        } else {
          response = await newsService.getArticles(page, pageSize);
        }
        setArticles(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError('Failed to fetch articles. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [page, debouncedSearchQuery, category]);

  // Effect to reset page number on new search or category selection
  useEffect(() => {
    setPage(0);
  }, [debouncedSearchQuery, category]);

  const handleSearch = (query) => {
    setCategory(null);
    setSearchQuery(query);
  };

  const handleSelectCategory = (selectedCategory) => {
    setSearchQuery('');
    setCategory(selectedCategory);
  };

  const handleToggleBookmark = async (article, isSaved) => {
    try {
      if (isSaved) {
        await bookmarkService.removeBookmark(article.id);
        setSavedArticleIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(article.id);
          return newSet;
        });
        toast.success("Bookmark removed!");
      } else {
        const bookmarkDto = {
          articleId: article.id,
          title: article.title,
          author: article.author,
          description: article.description,
          url: article.url,
          imageUrl: article.imageUrl,
          publishedAt: article.publishedAt
        };
        await bookmarkService.addBookmark(bookmarkDto);
        setSavedArticleIds(prev => new Set(prev).add(article.id));
        toast.success("Article saved!");
      }
    } catch (error) {
      toast.error("Action failed. Please try again.");
    }
  };

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} user={user} />
      <CategoryNav selectedCategory={category} onSelectCategory={handleSelectCategory} user={user} />

      {loading && <Spinner />}
      {error && <p className="error-message">{error}</p>}
      
      {!loading && articles.length === 0 && (
        <p className="no-articles-found">No articles found.</p>
      )}

      <div className="articles-grid">
        {articles.map(article => (
          <ArticleCard 
            key={article.id} 
            article={article}
            isSaved={savedArticleIds.has(article.id)}
            onToggleBookmark={handleToggleBookmark}
          />
        ))}
      </div>

      {!loading && totalPages > 1 && (
        <Pagination 
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          user={user}
        />
      )}
    </div>
  );
};

export default HomePage;