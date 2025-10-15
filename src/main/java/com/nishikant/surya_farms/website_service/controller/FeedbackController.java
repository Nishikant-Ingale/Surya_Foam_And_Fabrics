package com.nishikant.surya_farms.website_service.controller;


import com.nishikant.surya_farms.website_service.dto.Feedback;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/website/feedbacks")
public class FeedbackController {

    @PostMapping()
    public Feedback saveFeedbacks(@RequestBody Feedback feedback) {

        return feedback;
    }
}
