package com.example.news_service.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.news_service.dto.ArticleDto;
import com.example.news_service.dto.NewsResponseDto;
import com.example.news_service.model.Article;
import com.example.news_service.repository.ArticleRepository;

@Service
public class NewsServiceImpl implements NewsService {

	private final WebClient webClient;
	private final ArticleRepository articleRepository;
	private final Environment environment;
	private final String[] categories;
	private final String apiKey;

	public NewsServiceImpl(WebClient webClient, ArticleRepository articleRepository, Environment environment,
			@Value("${newsapi.key}") String apiKey, @Value("${newsapi.categories}") String[] categories) {
		this.webClient = webClient;
		this.articleRepository = articleRepository;
		this.environment = environment;
		this.apiKey = apiKey;
		this.categories = categories;
	}

	@Override
	@Scheduled(cron = "0 0 * * * *")
	public void fetchAndSaveNews() {
		System.out.println("Running Scheduled job: Fetching news for all categories...");

		Arrays.stream(categories).forEach(category -> {
			String sources = environment.getProperty("newsapi.sources." + category);

			if (sources == null || sources.isEmpty()) {
				System.err.println("No sources defined for category: " + category);
				return;
			}

			System.out.println("Fetching news for category: " + category + " from sources: " + sources);

//			String url = String.format("https://newsapi.org/v2/top-headlines?sources=%s&apiKey=%s", sources, apiKey);
			String url = String.format(
					"https://newsapi.org/v2/everything?q=%s&language=en&sortBy=publishedAt&apiKey=%s", category,
					apiKey);

			NewsResponseDto response = webClient.get().uri(url).retrieve().bodyToMono(NewsResponseDto.class).block();

			if (response != null && response.getArticles() != null) {
				for (ArticleDto articleDto : response.getArticles()) {
					if (articleDto.getUrl() != null && !articleRepository.existsByUrl(articleDto.getUrl())) {
						Article article = new Article();
						article.setAuthor(articleDto.getAuthor());
						article.setTitle(articleDto.getTitle());
						article.setDescription(articleDto.getDescription());
						article.setUrl(articleDto.getUrl());
						article.setImageUrl(articleDto.getUrlToImage());
						article.setContent(articleDto.getContent());
						article.setCategory(category);

						if (articleDto.getPublishedAt() != null) {
							article.setPublishedAt(
									LocalDateTime.parse(articleDto.getPublishedAt(), DateTimeFormatter.ISO_DATE_TIME));
						}
						article.setCategory(category);

						articleRepository.save(article);
					}
				}
			}
		});
	}

	@Override
	public Page<Article> getAllArticles(Pageable pageable) {
		return articleRepository.findAll(pageable);
	}

	@Override
	public Page<Article> searchArticles(String keyword, Pageable pageable) {
		return articleRepository
				.findAllByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrContentContainingIgnoreCase(
						keyword, keyword, keyword, pageable);
	}

	@Override
	public Page<Article> getArticlesByCategory(String category, Pageable pageable) {
		return articleRepository.findByCategory(category, pageable);
	}

	@Scheduled(cron = "0 0 * * * *")
	public void fetchNewsPeriodically() {
		System.out.println("Running scheduling job: Fetching news....");
		fetchAndSaveNews();
	}

	@Override
	public Optional<Article> getArticleById(Long id) {
		return articleRepository.findById(id);
	}

	@Scheduled(cron = "0 0 2 * * ?")
	public void cleanupOldArticles() {
		System.out.println("Running scheduled job: Cleaning up old articles...");

//		LocalDateTime cutoff = LocalDateTime.now().minusWeeks(3);
		LocalDateTime cutoff = LocalDateTime.now().minusMinutes(1);

		long articlesDeleted = articleRepository.deleteByPublishedAtBefore(cutoff);

		System.out.println("Finished cleanup job. Deleted " + articlesDeleted + " articles older than " + cutoff);
	}

}
