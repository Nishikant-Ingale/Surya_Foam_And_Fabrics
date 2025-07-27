package com.nishikant.surya_farms.feedback_service.controller;

import com.nishikant.surya_farms.admin_service.entity.User;
import com.nishikant.surya_farms.admin_service.service.interface_implis.UserService;
import com.nishikant.surya_farms.feedback_service.dto.EmployeeFeedbackRequest;
import com.nishikant.surya_farms.feedback_service.entity.Feedback;
import com.nishikant.surya_farms.feedback_service.service.interface_implis.FeedbackService;
import com.nishikant.surya_farms.global_exception.CustomException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feedbacks")
@Slf4j
public class FeedbackController {

    @Autowired
    private FeedbackService service;

    @GetMapping("/employees-to-rate")
    public ResponseEntity<?> getEmployeesToRate(@RequestParam String givenByEmail) {

        if (givenByEmail == null || givenByEmail.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Employee email (givenByEmail) is required."));
        }

        log.info("Fetching employee IDs that {} has not given feedback to this month.", givenByEmail);
        try {
            List<String> employeeEmails = service.getEmployeePendingFeedback(givenByEmail);
            // Return as a simple JSON array of employee IDs
            return ResponseEntity.ok(employeeEmails);
        } catch (Exception e) {
            log.error("Error fetching employees to rate for email {}: {}", givenByEmail, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "An error occurred while fetching employees to rate."));
        }
    }


    @GetMapping
    public ResponseEntity<?> getFeedbacks() {
        return ResponseEntity.ok(
                service
                        .getAllRecentFeedback()
        );
    }

    @GetMapping("/recent")
    public ResponseEntity<?> getRecentFeedbackEntries() {
        return ResponseEntity.ok(
                service.getAllRecentFeedback()
        );
    }


    @GetMapping("/{employeeId}/customers")
    public ResponseEntity<?> getCustomerFeedbackByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(
                service.getFeedbackByTypeAndEmployeeId(employeeId, Feedback.FeedbackType.CUSTOMER)
        );
    }

    @GetMapping("/{employeeId}/employees")
    public ResponseEntity<?> getEmployeeFeedbackByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(
                service.getFeedbackByTypeAndEmployeeId(employeeId, Feedback.FeedbackType.EMPLOYEE)
        );
    }

    @GetMapping("/averages/grouped")
    public ResponseEntity<?> getFeedbackAverageByEmployeeList() {
        return ResponseEntity.ok(service.getUserVisedAvgFeedbackList());
    }


    @PostMapping
    public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback, HttpServletRequest request) {
        String ip = getClientIp(request);
        feedback.setFeedbackType(Feedback.FeedbackType.CUSTOMER);
        log.info("Storing feedback for {} with customer ip address: {}", feedback.getEmployeeId(), ip);
        Feedback saved = service.submitFeedback(feedback, ip);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{employeeId}/employees/average")
    public ResponseEntity<Double> getAverageRatingEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(service.getAverageRating(employeeId, Feedback.FeedbackType.EMPLOYEE));
    }

    @GetMapping("/{employeeId}/customers/average")
    public ResponseEntity<Double> getAverageRatingCustomer(@PathVariable Long employeeId) {
        return ResponseEntity.ok(service.getAverageRating(employeeId, Feedback.FeedbackType.CUSTOMER));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Feedback>> getAllFeedback(@PathVariable Long employeeId) {
        return ResponseEntity.ok(service.getAllFeedbackByEmployeeId(employeeId));
    }

    @PostMapping("/employee/insert")
    public ResponseEntity<?> insertEmployeeFeedback(@RequestBody EmployeeFeedbackRequest request) {
        service.insertOrUpdateEmployeeFeedback(request);
        return ResponseEntity.ok("Feedback saved");
    }

    public String getClientIp(HttpServletRequest request) {
        String header = request.getHeader("X-Forwarded-For");
        if (header != null && !header.isEmpty() && !"unknown".equalsIgnoreCase(header)) {
            return header.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    @GetMapping("/customer/can/submit")
    public ResponseEntity<?> canCustomerSubmitFeedback(@RequestParam Long employeeId, @RequestParam String clientId) {
        if (clientId.equalsIgnoreCase("f221cefa-7fa4-49f7-a3b4-8971f647cabd"))
            return ResponseEntity.ok("You can proceed with form submitting");
        service.canSubmitFeedbackToday(employeeId, clientId);
        return ResponseEntity.ok("You can proceed with form submitting");
    }

    @PostMapping("/bulk-submit") // New endpoint for bulk submission
    public ResponseEntity<?> bulkSubmitFeedback(@RequestBody List<Feedback> feedbackList, HttpServletRequest request) {
        String ip = getClientIp(request); // Get IP once for the entire bulk submission

        if (feedbackList == null || feedbackList.isEmpty()) {
            log.warn("Bulk feedback submission received an empty or null list.");
            return ResponseEntity.badRequest().body(Map.of("message", "Feedback list cannot be empty."));
        }

        try {
            List<Feedback> savedFeedbacks = service.bulkSubmitFeedback(feedbackList, ip);
            return ResponseEntity.ok(Map.of("message", "Feedback submitted successfully!", "count", savedFeedbacks.size()));
        } catch (CustomException.DailyFeedbackLimitExceededException e) {
            // If any feedback in the bulk list violates the daily limit, the entire transaction is rolled back.
            log.warn("Bulk feedback submission rejected due to daily limit violation: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            log.error("Error during bulk feedback submission: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "An error occurred during bulk feedback submission."));
        }
    }

}
