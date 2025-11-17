package com.example.ticketbackend.repository;

import com.example.ticketbackend.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
