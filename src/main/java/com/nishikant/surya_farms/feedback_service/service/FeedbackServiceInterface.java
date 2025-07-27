package com.nishikant.surya_farms.feedback_service.service;


import com.nishikant.surya_farms.feedback_service.dto.AllUserAVGResponse;
import com.nishikant.surya_farms.feedback_service.dto.EmployeeFeedbackRequest;
import com.nishikant.surya_farms.feedback_service.entity.Feedback;

import java.util.List;

public interface FeedbackServiceInterface {
    public Feedback submitFeedback(Feedback feedback, String ip);

    public List<Feedback> getAllFeedbackByEmployeeId(Long employeeId);

    public Double getAverageRating(Long employeeId, Feedback.FeedbackType feedbackType);

    public List<Feedback> getAllRecentFeedback();

    public List<AllUserAVGResponse> getUserVisedAvgFeedbackList();

    public void insertOrUpdateEmployeeFeedback(EmployeeFeedbackRequest request);
}

