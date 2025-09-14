package com.example.newsPortal.service;

import com.example.newsPortal.dto.ProfileDto;
import com.example.newsPortal.model.User;
import com.example.newsPortal.repository.BookmarkRepository;
import com.example.newsPortal.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BookmarkRepository bookmarkRepository;

    public UserServiceImpl(UserRepository userRepository, BookmarkRepository bookmarkRepository) {
        this.userRepository = userRepository;
        this.bookmarkRepository = bookmarkRepository;
    }

    @Override
    public ProfileDto getUserProfile() {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();

        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));

        
        long bookmarkCount = bookmarkRepository.countByUserId(user.getId());

        return new ProfileDto(
                user.getId(),
                user.getUsername(),
                user.getCreatedAt(),
                bookmarkCount
        );
    }
}