package com.yashonidhi.timetable.controller;

import com.yashonidhi.timetable.dto.CourseRegisterRequest;
import com.yashonidhi.timetable.dto.WeeklyTimeTableResponse;
import com.yashonidhi.timetable.entity.Course;
import com.yashonidhi.timetable.exception.CourseNotFoundException;
import com.yashonidhi.timetable.exception.StudentNotFoundException;
import com.yashonidhi.timetable.exception.TimeSlotNotFoundException;
import com.yashonidhi.timetable.service.CourseService;
import com.yashonidhi.timetable.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

@RestController
@RequestMapping("/api/v1/student")
public class StudentController {
    private final StudentService studentService;
    private final CourseService courseService;

    public StudentController(StudentService studentService, CourseService courseService) {
        this.studentService = studentService;
        this.courseService = courseService;
    }



    @GetMapping("{id}/courses")
    public ResponseEntity<List<Course>> getAllCourses(@PathVariable Long id) {
        List<Course> courses = courseService.getAll();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("{id}/timetable")
    public ResponseEntity<?> getWeeklyTimeTable(@PathVariable Long id) {
        return studentService.showTimeTable(id);
    }

    @PostMapping("{id}/register-course")
    public ResponseEntity<?> registerCourse(
            @PathVariable Long id,
            @RequestBody CourseRegisterRequest request) {

        try {
            studentService.registerCourseToTimeSlot(id, request);
            return ResponseEntity.ok("Course registered to time slot successfully");
        } catch (StudentNotFoundException | CourseNotFoundException | TimeSlotNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @GetMapping("{id}/registered-courses") // Fixed endpoint to match frontend
    public ResponseEntity<?> getRegisteredCourses(@PathVariable Long id) {
        return studentService.getRegisteredCourses(id);
    }
}
