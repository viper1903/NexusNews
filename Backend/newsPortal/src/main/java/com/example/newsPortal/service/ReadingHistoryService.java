package com.example.newsPortal.service;

import com.example.newsPortal.dto.BookmarkDto;
import com.example.newsPortal.model.ReadingHistory;

import java.util.List;

public interface ReadingHistoryService {
    void addHistoryRecord(BookmarkDto articleDto);
    List<ReadingHistory> getReadingHistory();
    
    void deleteHistoryRecord(Long articleId);
    void clearHistory();
}