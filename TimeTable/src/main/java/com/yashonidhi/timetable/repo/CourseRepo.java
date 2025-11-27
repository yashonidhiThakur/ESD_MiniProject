package com.yashonidhi.timetable.repo;


import com.yashonidhi.timetable.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseRepo extends JpaRepository<Course, Long> {
    List<Course> findAllByOrderByIdAsc();
    Optional<Course> findById(Long id);
}
