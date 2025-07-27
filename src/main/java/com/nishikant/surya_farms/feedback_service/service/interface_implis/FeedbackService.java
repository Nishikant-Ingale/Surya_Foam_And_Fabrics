package com.nishikant.surya_farms.feedback_service.service.interface_implis;

import com.nishikant.surya_farms.admin_service.entity.User;
import com.nishikant.surya_farms.admin_service.service.interface_implis.UserService;
import com.nishikant.surya_farms.feedback_service.dto.AllUserAVGResponse;
import com.nishikant.surya_farms.feedback_service.dto.EmployeeFeedbackRequest;
import com.nishikant.surya_farms.feedback_service.dto.UserFeedbackList;
import com.nishikant.surya_farms.feedback_service.entity.Feedback;
import com.nishikant.surya_farms.feedback_service.entity.repository_interface.FeedbackRepository;
import com.nishikant.surya_farms.feedback_service.service.FeedbackServiceInterface;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class FeedbackService implements FeedbackServiceInterface {

    @Autowired
    private FeedbackRepository repository;

    @Autowired
    private UserService userService;

    @Override
    public Feedback submitFeedback(Feedback feedback, String ip) {

        feedback.setIpAddress(ip);
        Optional<Feedback> existing = repository.findByEmployeeIdAndIpAddress(feedback.getEmployeeId(), ip);
        existing.ifPresent(old -> feedback.setId(old.getId()));
        return repository.save(feedback);
    }

    @Override
    public List<Feedback> getAllFeedbackByEmployeeId(Long employeeId) {
        return repository.findByEmployeeId(employeeId);
    }

    @Override
    public Double getAverageRating(Long employeeId, Feedback.FeedbackType feedbackType) {
        return Optional.ofNullable(repository.findAverageRatingByEmployeeIdAndType(employeeId, feedbackType)).orElse(0.0);
    }

    @Override
    public List<Feedback> getAllRecentFeedback() {
        return repository.findTop10ByFeedbackTypeOrderByTimeStampDesc(Feedback.FeedbackType.CUSTOMER);
    }

    public UserFeedbackList getFeedbackByTypeAndEmployeeId(Long employeeId, Feedback.FeedbackType feedbackType) {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("timeStamp").descending());
        Page<Feedback> page = repository.findAllByEmployeeIdAndFeedbackType(
                employeeId,
                feedbackType,
                pageable);
        List<Feedback> feedbackList = page.getContent();

        User user = userService.getUserById(employeeId);

        return new UserFeedbackList(
                employeeId,
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                feedbackList
        );
    }

    @Override
    public List<AllUserAVGResponse> getUserVisedAvgFeedbackList() {
        List<User> users = userService.getAllUsers();


        return users.stream().map(user -> {
            Double employeeFeedbackAverage = getAverageRating(user.getId(), Feedback.FeedbackType.EMPLOYEE);
            Double custoemrFeedbackAverage = getAverageRating(user.getId(), Feedback.FeedbackType.CUSTOMER);

            return new AllUserAVGResponse(
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    employeeFeedbackAverage,
                    custoemrFeedbackAverage);
        }).toList();
    }

    @Override
    public void insertOrUpdateEmployeeFeedback(EmployeeFeedbackRequest request) {

        String givenByEmail = request.getEmail();
        request.getFeedback().forEach((email, rating) -> {
            Optional<User> user = userService.getUserByEmail(email);

            if (user.isPresent()) {
                Optional<Feedback> oldFeedback = repository.findByEmployeeIdAndGivenByEmail(user.get().getId(), givenByEmail);
                if (oldFeedback.isPresent()) {
                    oldFeedback.get().setRating(rating);
                    repository.save(oldFeedback.get());
                } else {
                    Feedback newFeedback = new Feedback(user.get().getId(), rating, givenByEmail, Feedback.FeedbackType.EMPLOYEE);
                    repository.save(newFeedback);
                }
            }

        });
    }

    public Boolean canSubmitFeedbackToday(Long employeeId, String clientId) {

        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);


        Optional<Feedback> existingTodayFeedback = repository.findByEmployeeIdAndClientIdAndTimeStampBetween(
                employeeId, clientId, startOfDay, endOfDay);

        if (existingTodayFeedback.isPresent()) {
            throw new DailyFeedbackLimitExceededException("You are not allowed to submit feedback today");
        }

        return true;
    }

    public static class DailyFeedbackLimitExceededException extends RuntimeException {
        public DailyFeedbackLimitExceededException(String message) {
            super(message);
        }
    }

    public List<Long> getEmployeesWithoutFeedbackForCurrentMonth(String givenByEmail) {
        if (givenByEmail == null || givenByEmail.isEmpty()) {
            log.warn("Attempt to get employees without feedback with null or empty givenByEmail.");
            return List.of(); // Return empty list for invalid input
        }

        // Calculate the start and end of the current month
        LocalDate today = LocalDate.now();
        LocalDateTime startOfMonth = today.with(TemporalAdjusters.firstDayOfMonth()).atStartOfDay();
        LocalDateTime endOfMonth = today.with(TemporalAdjusters.lastDayOfMonth()).atTime(LocalTime.MAX);

        // 1. Get all distinct employee IDs that exist in the feedback system (i.e., have received feedback before)
        List<Long> allEmployeeIds = repository.findAllDistinctEmployeeIds();
        log.debug("Found all distinct employee IDs: {}", allEmployeeIds);


        // 2. Get distinct employee IDs for whom the user has already given feedback this month
        List<Long> employeeIdsWithFeedbackThisMonth = repository.findEmployeeIdsWhoReceivedFeedbackThisMonth(
                givenByEmail, startOfMonth, endOfMonth);
        log.debug("Employee IDs with feedback from {}: {}", givenByEmail, employeeIdsWithFeedbackThisMonth);


        // 3. Subtract the second list from the first to find those without feedback
        Set<Long> remainingEmployeeIds = allEmployeeIds.stream()
                .filter(employeeId -> !employeeIdsWithFeedbackThisMonth.contains(employeeId))
                .collect(Collectors.toSet());

        // Convert back to List and sort if desired
        List<Long> employeesToRate = remainingEmployeeIds.stream().sorted().collect(Collectors.toList());
        log.info("Found {} employee IDs that {} has not given feedback to this month.", employeesToRate.size(), givenByEmail);

        return employeesToRate;
    }


    public List<String> getEmployeePendingFeedback(String employeeEmail) {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfMonth = today.with(TemporalAdjusters.firstDayOfMonth()).atStartOfDay();
        LocalDateTime endOfMonth = today.with(TemporalAdjusters.lastDayOfMonth()).atTime(LocalTime.MAX);
        return userService.getAllUsers()
                .stream()
                .filter(user -> !user.getEmail().equals(employeeEmail))
                .map(user -> {
                    List<Feedback> feedbacks = repository.findByEmployeeIdAndGivenByEmailAndTimeStampBetween(
                            user.getId(),
                            employeeEmail,
                            startOfMonth,
                            endOfMonth
                    );

                    if (feedbacks.size() == 0) {
                        return user.getEmail();
                    }

                    return null;
                })
                .filter(email -> {
                    return email != null;
                })
                .collect(Collectors.toList());
    }


    @Transactional // Ensures atomicity: all or none are saved
    public List<Feedback> bulkSubmitFeedback(List<Feedback> feedbacks, String ip) {
        if (feedbacks == null || feedbacks.isEmpty()) {
            log.warn("Bulk feedback submission received an empty or null list.");
            return List.of(); // Return empty list if no feedbacks provided
        }

        log.info("Attempting to bulk submit {} feedback entries.", feedbacks.size());
        List<Feedback> savedFeedbacks = feedbacks.stream().map(feedback -> {
            // Apply common processing and daily limit check for each feedback
            // Reusing submitFeedback logic to ensure consistency and daily limit
            return submitFeedback(feedback, ip);
        }).collect(Collectors.toList());

        log.info("Successfully saved {} bulk feedback entries.", savedFeedbacks.size());
        return savedFeedbacks;
    }

}
