package com.example.newsPortal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.newsPortal.model.Bookmark;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long>{ 
	
	List<Bookmark> findByUserIdOrderBySavedAtDesc(Long userId);
	
	Optional<Bookmark> findByUserIdAndArticleId(long userId, Long articleId);
	
	@Query("SELECT b.articleId FROM Bookmark b WHERE b.userId = :userId")
	List<Long> findArticleIdsByUserId(Long userId);
	
	Long countByUserId(Long userId);

}
