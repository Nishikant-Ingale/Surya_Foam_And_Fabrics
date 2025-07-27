package com.nishikant.surya_farms.feedback_service.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class EmployeeFeedbackRequest {
    private String email;
    private Map<String, Double> feedback;
}
