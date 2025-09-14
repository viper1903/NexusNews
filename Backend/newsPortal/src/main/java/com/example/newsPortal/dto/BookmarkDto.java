package com.example.newsPortal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkDto {
    private Long articleId;
    private String title;
    private String url;
    private String imageUrl;
    private LocalDateTime publishedAt;
    private String author;
    private String description;
}