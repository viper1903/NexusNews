package com.example.news_service.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.news_service.model.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

	boolean existsByUrl(String url);

	Page<Article> findAllByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrContentContainingIgnoreCase(
			String titleKeyword, String descriptionKeyword, String contentKeyword, Pageable pageable);
	
	Page<Article> findByCategory(String category, Pageable pageable);
	
	@Transactional
    long deleteByPublishedAtBefore(LocalDateTime cutoffDate);

}