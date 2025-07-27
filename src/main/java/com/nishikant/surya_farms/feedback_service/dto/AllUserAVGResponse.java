package com.nishikant.surya_farms.feedback_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AllUserAVGResponse {


    private Long employeeId;
    private String firstName;
    private String lastName;
    private String emailAddress;
    private Double employeeFeedbackAverage;
    private Double customerFeedbackAverage;

}

