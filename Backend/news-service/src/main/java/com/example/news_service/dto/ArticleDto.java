package com.example.news_service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleDto {
	
	private String author;
	private String title;
	private String description;
	private String url;
	private String urlToImage;
	private String publishedAt;
	private String content;

}
