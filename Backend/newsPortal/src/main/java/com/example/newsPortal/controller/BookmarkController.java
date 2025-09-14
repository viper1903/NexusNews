package com.example.newsPortal.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.newsPortal.dto.BookmarkDto;
import com.example.newsPortal.model.Bookmark;
import com.example.newsPortal.service.BookmarkService;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {
	
	private final BookmarkService bookmarkService;
	
	public BookmarkController(BookmarkService bookmarkService) {
		this.bookmarkService = bookmarkService;
	}
	
	@GetMapping
	public ResponseEntity<List<Bookmark>> getUserBookmarks() {
		return ResponseEntity.ok(bookmarkService.getUserBookmarks());
	}
	
	@GetMapping("/ids")
	public ResponseEntity<List<Long>> getUserBookmarkIds() {
		return ResponseEntity.ok(bookmarkService.getUserBookmarkIds());
	}
	
	@PostMapping
	public ResponseEntity<Void> addBookmark(@RequestBody BookmarkDto bookmarkDto) {
		bookmarkService.addBookmark(bookmarkDto);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/{articleId}")
	public ResponseEntity<Void> removeBookmark(@PathVariable Long articleId) {
		bookmarkService.removeBookmark(articleId);
		return ResponseEntity.ok().build();
	}

}
