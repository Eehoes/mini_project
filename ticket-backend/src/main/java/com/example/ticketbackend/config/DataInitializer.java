package com.example.ticketbackend.config;

import com.example.ticketbackend.domain.Category;
import com.example.ticketbackend.domain.Event;
import com.example.ticketbackend.domain.Seat;
import com.example.ticketbackend.domain.User;
import com.example.ticketbackend.repository.CategoryRepository;
import com.example.ticketbackend.repository.EventRepository;
import com.example.ticketbackend.repository.SeatRepository;
import com.example.ticketbackend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    private final CategoryRepository categoryRepository;
    private final EventRepository eventRepository;
    private final SeatRepository seatRepository;
    private final UserRepository userRepository;

    public DataInitializer(
            CategoryRepository categoryRepository,
            EventRepository eventRepository,
            SeatRepository seatRepository,
            UserRepository userRepository
    ) {
        this.categoryRepository = categoryRepository;
        this.eventRepository = eventRepository;
        this.seatRepository = seatRepository;
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void init() {

        // ============================
        // 1) 테스트용 유저 생성 (user1~user100)
        // ============================
        for (int i = 1; i <= 100; i++) {
            User user = new User();
            user.setUserId("user" + i);    // user1, user2 ...
            userRepository.save(user);
        }

        // ============================
        // 2) 카테고리 생성
        // ============================
        Category musical = new Category();
        musical.setName("뮤지컬");
        categoryRepository.save(musical);

        Category concert = new Category();
        concert.setName("콘서트");
        categoryRepository.save(concert);

        // ============================
        // 3) 이벤트 생성
        // ============================
        Event e1 = new Event();
        e1.setTitle("난쟁이들");
        e1.setDescription("뮤지컬");
        e1.setImageUrl("https://tkfile.yes24.com/upload2/perfblog/202510/20251015/20251015-55442_1.jpg/dims/quality/70/");
        e1.setCategory(musical);
        eventRepository.save(e1);

        Event e2 = new Event();
        e2.setTitle("그레이하우스");
        e2.setDescription("뮤지컬");
        e2.setImageUrl("https://tkfile.yes24.com/upload2/perfblog/202508/20250814/20250814-54914.jpg/dims/quality/70/");
        e2.setCategory(concert);
        eventRepository.save(e2);

        // ============================
        // 4) 레베카 좌석 생성 (A~C행, 1~10열)
        // ============================
        createSeatGrid(e1, "VIP", 160000, 'A', 'A', 1, 10);
        createSeatGrid(e1, "R", 140000, 'B', 'B', 1, 10);
        createSeatGrid(e1, "S", 120000, 'C', 'C', 1, 10);

        // ============================
        // 5) 에스파 콘서트 좌석 생성 (A~D행, 1~15열)
        // ============================
        createSeatGrid(e2, "VIP", 180000, 'A', 'A', 1, 15);
        createSeatGrid(e2, "R", 150000, 'B', 'C', 1, 15);
    }

    // 좌석 자동 생성 메서드
    private void createSeatGrid(Event event, String grade, int price,
                                char startRow, char endRow,
                                int startCol, int endCol) {

        for (char row = startRow; row <= endRow; row++) {
            for (int col = startCol; col <= endCol; col++) {

                Seat seat = new Seat();
                seat.setEvent(event);
                seat.setGrade(grade);
                seat.setPrice(price);
                seat.setRowLabel(String.valueOf(row));
                seat.setColumnNumber(col);
                seat.setAvailable(true);

                seatRepository.save(seat);
            }
        }
    }
}
