package com.example.newsPortal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.newsPortal.model.ReadingHistory;

@Repository
public interface ReadingHistoryRepository extends JpaRepository<ReadingHistory, Long> {

    List<ReadingHistory> findByUserIdOrderByVisitedAtDesc(Long userId);
    Optional<ReadingHistory> findByUserIdAndArticleId(Long userId, Long articleId);
    
    @Transactional
    void deleteByUserIdAndArticleId(Long userId, Long articleId);
    @Transactional
    void deleteAllByUserId(Long userId);
}