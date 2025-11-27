package com.yashonidhi.timetable.repo;

import com.yashonidhi.timetable.entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeSlotRepo extends JpaRepository<TimeSlot, Long> {}
