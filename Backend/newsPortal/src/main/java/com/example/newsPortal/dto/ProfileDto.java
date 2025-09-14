package com.example.newsPortal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ProfileDto {
    private Long id;
    private String username;
    private LocalDateTime memberSince;
    private long savedArticlesCount;
}