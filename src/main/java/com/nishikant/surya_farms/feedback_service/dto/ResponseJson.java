package com.nishikant.surya_farms.feedback_service.dto;


import com.nishikant.surya_farms.admin_service.entity.User;
import com.nishikant.surya_farms.feedback_service.entity.Feedback;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseJson {

    private User user;
    private Feedback feedback;
}
