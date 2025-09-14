package com.example.newsPortal.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "bookmarks")
public class Bookmark {
	
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

    @Column(nullable = false, columnDefinition="TEXT", unique = true)
    private String url;

    @Column(name = "image_url", columnDefinition="TEXT")
    private String imageUrl;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;
	
	@CreationTimestamp
	@Column(name = "saved_at", nullable = false, updatable = false)
	private LocalDateTime savedAt;
	
	public Bookmark(Long userId, Long articleId, String title, String author, String description, String url, String imageUrl, LocalDateTime publishedAt) {
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
