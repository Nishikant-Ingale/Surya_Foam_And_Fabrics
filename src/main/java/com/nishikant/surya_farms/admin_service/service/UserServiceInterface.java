package com.nishikant.surya_farms.admin_service.service;

import com.nishikant.surya_farms.admin_service.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserServiceInterface {

    User insertUser(User user);
    List<User> getAllUsers();
    User getUserById(Long id);
    Optional<User> getUserByEmail(String email);
    User updateUserDetails(Long employeeId, User user);
    void deleteUserById(Long id);
    void deleteUserByEmail(String email);
}
