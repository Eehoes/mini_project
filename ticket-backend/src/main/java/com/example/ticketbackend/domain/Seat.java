package com.example.ticketbackend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Getter
@Setter
@Entity
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String grade;       // VIP / R / S 등급
    private int price;

    private String rowLabel;    // A, B, C ...
    private int columnNumber;   // 1 ~ N

    private boolean available;  // true = 예약 가능, false = 예약됨

    @ManyToOne
    @JoinColumn(name = "event_id")
    @JsonBackReference
    private Event event;
}
