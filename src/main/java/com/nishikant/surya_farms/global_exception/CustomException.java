package com.nishikant.surya_farms.global_exception;



public class CustomException {
    public class DailyFeedbackLimitExceededException extends RuntimeException {
        public DailyFeedbackLimitExceededException(String message) {
            super(message);
        }
    }
}
