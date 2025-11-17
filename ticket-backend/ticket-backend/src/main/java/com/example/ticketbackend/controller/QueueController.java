package com.example.ticketbackend.controller;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/queue")
public class QueueController {

    private final StringRedisTemplate redisTemplate;

    // 최대 동시 입장 가능 인원
    private final int MAX_ACTIVE_USERS = 50;

    public QueueController(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // 로그인 시 대기열에 추가
    @PostMapping("/enter")
    public int enterQueue(@RequestParam String userId) {

        // Queue 저장: LPUSH or RPUSH
        redisTemplate.opsForList().rightPush("loginQueue", userId);

        // 현재 Queue에서 userId의 index(=순번) 확인
        Long position = redisTemplate.opsForList().indexOf("loginQueue", userId);

        return position == null ? -1 : position.intValue() + 1;
    }

    // 프론트에서 1초마다 호출해서 순번 확인
    @GetMapping("/position")
    public int getPosition(@RequestParam String userId) {

        Long position = redisTemplate.opsForList().indexOf("loginQueue", userId);

        if (position == null) return -1;

        return position.intValue() + 1;
    }

    // 입장 가능한지 확인
    @GetMapping("/canEnter")
    public boolean canEnter(@RequestParam String userId) {
        Long position = redisTemplate.opsForList().indexOf("loginQueue", userId);

        if (position == null) return false;

        return position < MAX_ACTIVE_USERS;
    }
}
