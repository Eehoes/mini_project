package com.example.ticketbackend.controller;

import com.example.ticketbackend.domain.Event;
import com.example.ticketbackend.domain.Reservation;
import com.example.ticketbackend.domain.Seat;
import com.example.ticketbackend.repository.EventRepository;
import com.example.ticketbackend.repository.ReservationRepository;
import com.example.ticketbackend.repository.SeatRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private final SeatRepository seatRepository;
    private final EventRepository eventRepository;
    private final ReservationRepository reservationRepository;

    public ReservationController(SeatRepository seatRepository,
                                 EventRepository eventRepository,
                                 ReservationRepository reservationRepository) {
        this.seatRepository = seatRepository;
        this.eventRepository = eventRepository;
        this.reservationRepository = reservationRepository;
    }

    @PostMapping
    @Transactional
    public Reservation reserveTicket(@RequestParam Long eventId,
                                     @RequestParam Long seatId) {

        // 1) seat 조회 (for update)
        Seat seat = seatRepository.findSeatForUpdate(seatId);
        if (seat == null) {
            throw new RuntimeException("Seat not found");
        }

        // 2) 예약 가능 여부 확인
        if (!seat.isAvailable()) {
            throw new RuntimeException("Seat already booked");
        }

        // 3) 좌석 예약 상태 변경 (true → false)
        seat.setAvailable(false);
        seatRepository.save(seat);

        // 4) event 조회
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        // 5) 예약 엔티티 생성
        Reservation reservation = new Reservation(
                event,
                seat,
                seat.getPrice()
        );

        return reservationRepository.save(reservation);
    }
}
