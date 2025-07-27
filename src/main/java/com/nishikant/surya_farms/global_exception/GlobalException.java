package com.nishikant.surya_farms.global_exception;


import com.nishikant.surya_farms.feedback_service.service.interface_implis.FeedbackService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalException {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationError(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error -> {
                    errors.put(error.getField(), error.getDefaultMessage());
                });

        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, String>> handleConstrainException(ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getConstraintViolations().forEach(error -> {
            errors.put(
                    error.getPropertyPath().toString(),
                    error.getMessage()
            );
        });
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolation(DataIntegrityViolationException ex) {

        log.info("Custom Data Integrity Violation Exception");

        Map<String, String> error = new HashMap<>();

        String rootMessage = ex.getRootCause() != null ? ex.getRootCause().getMessage() : ex.getMessage();

        if (rootMessage != null) {
            if (rootMessage.contains("users.UK6dotkott2kjsp8vw4d0m25fb7")) {
                error.put("email", "Email is already in use");
            } else if (rootMessage.contains("users.UKr43af9ap4edm43mmtq01oddj6")) { // example for username
                error.put("username", "Username is already taken");
            } else if (rootMessage.contains("Duplicate entry")) {
                error.put("error", "Duplicate entry violates a unique constraint");
            } else {
                error.put("error", "Data integrity error: " + rootMessage);
            }
        } else {
            error.put("error", "Unknown data integrity violation");
        }

        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleMainExceptino(Exception e){
        Map<String, String> errors = new HashMap<>();
        errors.put("message", e.getMessage());
        return ResponseEntity.internalServerError().body(errors);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleEntityNotFoundException(EntityNotFoundException e){
        Map<String, String> errors = new HashMap<>();
        errors.put("message", e.getMessage());
        return ResponseEntity.status(404).body(errors);
    }

    @ExceptionHandler(FeedbackService.DailyFeedbackLimitExceededException.class)
    public ResponseEntity<Map<String, String>> handleDailyFeedbackLimitExceededException(FeedbackService.DailyFeedbackLimitExceededException e){
        Map<String, String> errors = new HashMap<>();
        errors.put("message", e.getMessage());
        return ResponseEntity.status(400).body(errors);
    }

}
