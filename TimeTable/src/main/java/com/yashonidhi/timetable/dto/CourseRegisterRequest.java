package com.yashonidhi.timetable.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CourseRegisterRequest(
        @JsonProperty("courseId") Long courseId
) {}
