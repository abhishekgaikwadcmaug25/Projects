package com.techshare.custom_exception;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ApiResponseException {

    private int status;
    private String message;
    private String path;
    private LocalDateTime timestamp;
}
