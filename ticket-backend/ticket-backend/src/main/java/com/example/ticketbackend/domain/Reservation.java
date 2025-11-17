package com.example.ticketbackend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 어떤 이벤트인지
    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    // 어떤 좌석 등급인지
    @ManyToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;

    // 결제 금액
    private int price;

    public Reservation(Event event, Seat seat, int price) {
        this.event = event;
        this.seat = seat;
        this.price = price;
    }
}
