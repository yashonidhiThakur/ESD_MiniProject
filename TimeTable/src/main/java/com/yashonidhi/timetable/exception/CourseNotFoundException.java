package com.yashonidhi.timetable.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CourseNotFoundException extends RuntimeException {
    private final String msg;
}
