package com.nishikant.surya_farms.feedback_service.entity.repository_interface;

import com.nishikant.surya_farms.feedback_service.entity.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    Optional<Feedback> findByEmployeeIdAndIpAddress(long employeeId, String ipAddress);

    List<Feedback> findByEmployeeId(long employeeId);

    @Query("SELECT AVG(f.rating) FROM Feedback f WHERE f.employeeId = :employeeId AND f.feedbackType = :feedbackType")
    Double findAverageRatingByEmployeeIdAndType(@Param("employeeId") long employeeId, @Param("feedbackType") Feedback.FeedbackType feedbackType);

    List<Feedback> findTop10ByFeedbackTypeOrderByTimeStampDesc(Feedback.FeedbackType feedbackType);

    Page<Feedback> findAllByEmployeeIdAndFeedbackType(Long employeeId, Feedback.FeedbackType feedbackType, Pageable pageable);

    Optional<Feedback> findByEmployeeIdAndGivenByEmail(Long employeeId, String givenByEmail);

    Optional<Feedback> findByEmployeeIdAndClientIdAndTimeStampBetween(Long employeeId, String clientId, LocalDateTime startOfDay, LocalDateTime endOfDay);

    @Query("SELECT DISTINCT f.employeeId FROM Feedback f")
    List<Long> findAllDistinctEmployeeIds();

    @Query("SELECT DISTINCT f.employeeId FROM Feedback f " +
            "WHERE f.givenByEmail = :givenByEmail AND f.timeStamp BETWEEN :startOfMonth AND :endOfMonth")
    List<Long> findEmployeeIdsWhoReceivedFeedbackThisMonth(String givenByEmail, LocalDateTime startOfMonth, LocalDateTime endOfMonth);

    List<Feedback> findByEmployeeIdAndGivenByEmailAndTimeStampBetween(
            long employeeId,
            String givenByEmail,
            LocalDateTime startDate,
            LocalDateTime endDate
    );
}

