package com.example.news_service.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class NewsResponseDto {
	
	private String status;
	private int totalResults;
	private List<ArticleDto> articles;

}
