package com.example.ticketbackend.repository;

import com.example.ticketbackend.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByCategoryId(Long categoryId);

    // 검색 기능 추가
    List<Event> findByTitleContainingIgnoreCase(String keyword);
}
