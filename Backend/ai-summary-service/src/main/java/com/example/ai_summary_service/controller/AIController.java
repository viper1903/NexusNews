package com.example.ai_summary_service.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ai_summary_service.dto.SummaryRequest;
import com.example.ai_summary_service.dto.SummaryResponse;
import com.example.ai_summary_service.service.AIService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController { 
	
	private final AIService aiService;
	
	@PostMapping("/summarize")
	public Mono<SummaryResponse> summarizeArticle(@RequestBody SummaryRequest request) {
		return aiService.getSummary(Mono.just(request));
	}

}
