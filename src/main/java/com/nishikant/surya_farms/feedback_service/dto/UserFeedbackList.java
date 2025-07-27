package com.nishikant.surya_farms.feedback_service.dto;


import com.nishikant.surya_farms.feedback_service.entity.Feedback;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserFeedbackList {

    private Long employeeId;
    private String firstName;
    private String lastName;
    private String email;
    List<Feedback> feedbacks;
}
