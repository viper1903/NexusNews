package com.example.newsPortal.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.newsPortal.dto.BookmarkDto;
import com.example.newsPortal.model.ReadingHistory;
import com.example.newsPortal.model.User;
import com.example.newsPortal.repository.ReadingHistoryRepository;
import com.example.newsPortal.repository.UserRepository;

@Service
public class ReadingHistoryServiceImpl implements ReadingHistoryService {

	private final ReadingHistoryRepository readingHistoryRepository;
	private final UserRepository userRepository;

	public ReadingHistoryServiceImpl(ReadingHistoryRepository readingHistoryRepository, UserRepository userRepository) {
		this.readingHistoryRepository = readingHistoryRepository;
		this.userRepository = userRepository;
	}

	@Override
	public void addHistoryRecord(BookmarkDto articleDto) {
		Long userId = getCurrentUserId();

		readingHistoryRepository.findByUserIdAndArticleId(userId, articleDto.getArticleId())
				.ifPresentOrElse((history) -> {
					/* Do nothing if it already exists */ }, () -> {
						ReadingHistory newRecord = new ReadingHistory(userId, articleDto.getArticleId(),
								articleDto.getTitle(), articleDto.getAuthor(),
								articleDto.getDescription(), 
								articleDto.getUrl(), articleDto.getImageUrl(), articleDto.getPublishedAt());
						readingHistoryRepository.save(newRecord);
					});
	}

	@Override
	public List<ReadingHistory> getReadingHistory() {
		Long userId = getCurrentUserId();
		return readingHistoryRepository.findByUserIdOrderByVisitedAtDesc(userId);
	}

	@Override
	public void deleteHistoryRecord(Long articleId) {
		Long userId = getCurrentUserId();
		readingHistoryRepository.deleteByUserIdAndArticleId(userId, articleId);
	}

	@Override
	public void clearHistory() {
		Long userId = getCurrentUserId();
		readingHistoryRepository.deleteAllByUserId(userId);
	}

	private Long getCurrentUserId() {
		String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
				.getUsername();
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new IllegalStateException("Authenticated user not found"));
		return user.getId();
	}
}