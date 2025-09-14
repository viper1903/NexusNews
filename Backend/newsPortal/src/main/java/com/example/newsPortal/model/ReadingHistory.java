package com.example.newsPortal.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "reading_history")
public class ReadingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long articleId;

    @Column(nullable = false, columnDefinition="TEXT")
    private String title;
    
    private String author;
    
    @Column(columnDefinition="TEXT")
    private String description;

    @Column(nullable = false, columnDefinition="TEXT")
    private String url;

    @Column(name = "image_url", columnDefinition="TEXT")
    private String imageUrl;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;
    
    @CreationTimestamp
    @Column(name = "visited_at", nullable = false, updatable = false)
    private LocalDateTime visitedAt;

    public ReadingHistory(Long userId, Long articleId, String title, String author, String description, String url, String imageUrl, LocalDateTime publishedAt) {
        this.userId = userId;
        this.articleId = articleId;
        this.title = title;
        this.author = author;
        this.description = description;
        this.url = url;
        this.imageUrl = imageUrl;
        this.publishedAt = publishedAt;
    }
}