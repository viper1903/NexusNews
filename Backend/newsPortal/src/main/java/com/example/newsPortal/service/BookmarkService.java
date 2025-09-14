package com.example.newsPortal.service;

import com.example.newsPortal.dto.BookmarkDto;
import com.example.newsPortal.model.Bookmark;

import java.util.List;

public interface BookmarkService {
    List<Bookmark> getUserBookmarks();
    List<Long> getUserBookmarkIds();
    void addBookmark(BookmarkDto bookmarkDto);
    void removeBookmark(Long articleId);
}