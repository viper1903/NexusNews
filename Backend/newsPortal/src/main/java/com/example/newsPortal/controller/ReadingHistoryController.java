package com.example.newsPortal.controller;

import com.example.newsPortal.dto.BookmarkDto;
import com.example.newsPortal.model.ReadingHistory;
import com.example.newsPortal.service.ReadingHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class ReadingHistoryController {

	private final ReadingHistoryService readingHistoryService;

	public ReadingHistoryController(ReadingHistoryService readingHistoryService) {
		this.readingHistoryService = readingHistoryService;
	}

	@PostMapping
	public ResponseEntity<Void> logHistory(@RequestBody BookmarkDto articleDto) {
		readingHistoryService.addHistoryRecord(articleDto);
		return ResponseEntity.ok().build();
	}

	@GetMapping
	public ResponseEntity<List<ReadingHistory>> getUserHistory() {
		return ResponseEntity.ok(readingHistoryService.getReadingHistory());
	}
	
	@DeleteMapping("/{articleId}")
    public ResponseEntity<Void> deleteHistoryItem(@PathVariable Long articleId) {
        readingHistoryService.deleteHistoryRecord(articleId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> clearUserHistory() {
        readingHistoryService.clearHistory();
        return ResponseEntity.noContent().build();
    }
}