package com.example.ticketbackend.controller;

import com.example.ticketbackend.domain.Event;
import com.example.ticketbackend.repository.EventRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/events")
public class EventController {

    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // 전체 조회
    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // 상세 조회
    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    // ★ 검색 기능 추가 ★
    @GetMapping("/search")
    public List<Event> searchEvents(@RequestParam String keyword) {
        return eventRepository.findByTitleContainingIgnoreCase(keyword);
    }


}
