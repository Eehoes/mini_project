package com.example.ticketbackend.controller;

import com.example.ticketbackend.domain.Category;
import com.example.ticketbackend.domain.Event;
import com.example.ticketbackend.repository.CategoryRepository;
import com.example.ticketbackend.repository.EventRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryRepository categoryRepository;
    private final EventRepository eventRepository;

    public CategoryController(CategoryRepository categoryRepository, EventRepository eventRepository) {
        this.categoryRepository = categoryRepository;
        this.eventRepository = eventRepository;
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/{id}/events")
    public List<Event> getEventsByCategory(@PathVariable Long id) {
        return eventRepository.findByCategoryId(id);
    }
}
