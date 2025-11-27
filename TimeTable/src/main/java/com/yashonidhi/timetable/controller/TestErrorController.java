package com.yashonidhi.timetable.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestErrorController {

    @GetMapping("/test-error")
    public void triggerError() {
        throw new RuntimeException("This is a test 500 error to verify GlobalExceptionHandler!");
    }
}
