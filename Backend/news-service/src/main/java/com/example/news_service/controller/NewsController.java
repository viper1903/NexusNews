package com.example.news_service.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.news_service.model.Article;
import com.example.news_service.service.NewsService;

@RestController
@RequestMapping("/api/news")
public class NewsController {

	private final NewsService newsService;

	public NewsController(NewsService newsService) {
		this.newsService = newsService;
	}

	@PostMapping("/fetch")
	public ResponseEntity<String> fetchNews() {
		newsService.fetchAndSaveNews();
		return ResponseEntity.ok("News fetched and saved successfully.");
	}

	@GetMapping
	public ResponseEntity<Page<Article>> getAllArticles(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {

		Pageable pageable = PageRequest.of(page, size, Sort.by("publishedAt").descending());

		Page<Article> articles = newsService.getAllArticles(pageable);
		return ResponseEntity.ok(articles);

	}

	@GetMapping("/search/{keyword}")
	public ResponseEntity<Page<Article>> searchArticles(@PathVariable String keyword,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

		Pageable pageable = PageRequest.of(page, size, Sort.by("publishedAt").descending());
		Page<Article> articles = newsService.searchArticles(keyword, pageable);
		return ResponseEntity.ok(articles);
	}

	@GetMapping("/category/{category}")
	public ResponseEntity<Page<Article>> getArticlesByCategory(@PathVariable String category,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
		Pageable pageable = PageRequest.of(page, size, Sort.by("publishedAt").descending());
		Page<Article> articles = newsService.getArticlesByCategory(category, pageable);
		return ResponseEntity.ok(articles);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
		return newsService.getArticleById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

}
