package com.yashonidhi.timetable.controller;


import com.yashonidhi.timetable.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
    private final StudentService studentService;

    public LoginController(StudentService studentService) {
        this.studentService = studentService;
    }



    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(org.springframework.security.core.Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        String email = (String) authentication.getPrincipal();
        System.out.println("LoginController: Getting user details for: " + email);
        return ResponseEntity.ok(studentService.getStudentByEmail(email));
    }
}
