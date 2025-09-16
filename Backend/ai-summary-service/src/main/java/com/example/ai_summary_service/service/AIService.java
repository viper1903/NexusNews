package com.example.ai_summary_service.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.ai_summary_service.dto.GeminiRequest;
import com.example.ai_summary_service.dto.GeminiResponse;
import com.example.ai_summary_service.dto.SummaryRequest;
import com.example.ai_summary_service.dto.SummaryResponse;

import reactor.core.publisher.Mono;

@Service
public class AIService {

	private final WebClient webClient;
	private final String geminiApiKey;

	public AIService(WebClient.Builder webClientBuilder, @Value("${gemini.api.url}") String geminiApiUrl,
			@Value("${gemini.api.key}") String geminiApiKey) {
		this.webClient = webClientBuilder.baseUrl(geminiApiUrl).build();
		this.geminiApiKey = geminiApiKey;
	}

	public Mono<SummaryResponse> getSummary(Mono<SummaryRequest> requestMono) {
		return requestMono.flatMap(request -> {
			String prompt = "Provide a comprehensive summary of the following article in exactly five bullet points. Each point should be a complete sentence that captures a key aspect of the article, allowing a reader to fully understand the main topic, key findings, and conclusion:\\n\\n\" "
					+ request.getContent();
			GeminiRequest geminiRequest = new GeminiRequest(prompt);

			return webClient.post().uri(uriBuilder -> uriBuilder.queryParam("key", geminiApiKey).build())
					.contentType(MediaType.APPLICATION_JSON).bodyValue(geminiRequest).retrieve()
					.bodyToMono(GeminiResponse.class).map(geminiResponse -> {
						String summaryText = geminiResponse.getCandidates().get(0).getContent().getParts().get(0)
								.getText();
						return new SummaryResponse(summaryText);
					});
		});
	}
}
