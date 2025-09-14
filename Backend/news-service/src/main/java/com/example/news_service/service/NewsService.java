package com.example.news_service.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.news_service.model.Article;

public interface NewsService {
	void fetchAndSaveNews();

	Page<Article> getAllArticles(Pageable pageable);
	Page<Article> searchArticles(String keyword, Pageable pageable);
	Page<Article> getArticlesByCategory(String category, Pageable pageable);
	
	Optional<Article> getArticleById(Long id);

}
