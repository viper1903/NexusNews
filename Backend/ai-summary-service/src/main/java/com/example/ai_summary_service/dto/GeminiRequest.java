package com.example.ai_summary_service.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class GeminiRequest {
	
	private List<Content> contents;
	
	public GeminiRequest(String text) {
		this.contents = List.of(new Content(List.of(new Part(text))));
	}
	
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Content {
		private List<Part> parts;
	}
	
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Part {
		private String text;  
	}
 
}
