package com.nishikant.surya_farms.feedback_service.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "feedbacks")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private long employeeId;
    private Double rating;
    private String ipAddress;
    private String comment;
    private LocalDateTime timeStamp = LocalDateTime.now();
    private String givenByEmail;
    private String clientId;
    @Enumerated(EnumType.STRING)
    private FeedbackType feedbackType;

    public enum FeedbackType {
        CUSTOMER,
        EMPLOYEE
    }

    public Feedback(Long id, long employeeId, Double rating, String ipAddress, FeedbackType feedbackType, String clientId) {
        this.id = id;
        this.employeeId = employeeId;
        this.rating = rating;
        this.ipAddress = ipAddress;
        this.feedbackType = feedbackType;
        this.clientId = clientId;
    }

    public Feedback(long employeeId, Double rating, String givenByEmail, FeedbackType feedbackType) {
        this.employeeId = employeeId;
        this.rating = rating;
        this.givenByEmail = givenByEmail;
        this.feedbackType = feedbackType;
    }
}
