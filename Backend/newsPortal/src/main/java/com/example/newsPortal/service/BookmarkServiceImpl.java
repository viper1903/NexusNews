package com.example.newsPortal.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.newsPortal.dto.BookmarkDto;
import com.example.newsPortal.model.Bookmark;
import com.example.newsPortal.model.User;
import com.example.newsPortal.repository.BookmarkRepository;
import com.example.newsPortal.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class BookmarkServiceImpl implements BookmarkService {

	private final BookmarkRepository bookmarkRepository;
	private final UserRepository userRepository;

	public BookmarkServiceImpl(BookmarkRepository bookmarkRepository, UserRepository userRepository) {
		this.bookmarkRepository = bookmarkRepository;
		this.userRepository = userRepository;
	}

	@Override
	public List<Bookmark> getUserBookmarks() {
		Long userId = getCurrentUserId();
		return bookmarkRepository.findByUserIdOrderBySavedAtDesc(userId);
	}

	@Override
	public List<Long> getUserBookmarkIds() {
		Long userId = getCurrentUserId();
		return bookmarkRepository.findArticleIdsByUserId(userId);
	}

	@Override
	public void addBookmark(BookmarkDto bookmarkDto) {
		Long userId = getCurrentUserId();
		bookmarkRepository.findByUserIdAndArticleId(userId, bookmarkDto.getArticleId()).ifPresentOrElse((bookmark) -> {
		}, () -> {

			Bookmark bookmark = new Bookmark(userId, bookmarkDto.getArticleId(), bookmarkDto.getTitle(),
					bookmarkDto.getAuthor(), bookmarkDto.getDescription(), bookmarkDto.getUrl(),
					bookmarkDto.getImageUrl(), bookmarkDto.getPublishedAt());
			bookmarkRepository.save(bookmark);
		});
	}

	@Override
	@Transactional
	public void removeBookmark(Long articleId) {
		Long userId = getCurrentUserId();
		Bookmark bookmark = bookmarkRepository.findByUserIdAndArticleId(userId, articleId)
				.orElseThrow(() -> new IllegalStateException("Bookmark not found"));
		bookmarkRepository.delete(bookmark);
	}

	private Long getCurrentUserId() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		String username;
		if (principal instanceof UserDetails) {
			username = ((UserDetails) principal).getUsername();
		} else {
			username = principal.toString();
		}

		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new IllegalStateException("Authenticated user not found in database"));

		return user.getId();
	}

}
