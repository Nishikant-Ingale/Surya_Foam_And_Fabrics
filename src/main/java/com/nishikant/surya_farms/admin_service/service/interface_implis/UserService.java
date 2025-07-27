package com.nishikant.surya_farms.admin_service.service.interface_implis;


import com.nishikant.surya_farms.admin_service.entity.User;
import com.nishikant.surya_farms.admin_service.entity.repository_interface.UserRepository;
import com.nishikant.surya_farms.admin_service.service.UserServiceInterface;
import com.nishikant.surya_farms.qr_service.entity.repository_interface.QrRepository;
import com.nishikant.surya_farms.qr_service.service.interface_implis.QrService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserServiceInterface {

    @Autowired
    UserRepository userRepository;

    @Autowired
    QrService qrService;


    @Override
    public User insertUser(User user){
        return userRepository
                .save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository
                .findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not Found with Id: " + id));
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository
                .findByEmail(email);
    }

    @Override
    public User updateUserDetails(Long employeeId, User user) {
        User oldUser = getUserById(user.getId());
        // Only update fields that are allowed to change
        oldUser.setUsername(user.getUsername());
        oldUser.setEmail(user.getEmail());
        oldUser.setFirstName(user.getFirstName());
        oldUser.setLastName(user.getLastName());
        // Don't update password here unless explicitly needed

        return userRepository.save(oldUser);
    }


    @Override
    public void deleteUserById(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
        qrService.deleteQr(id);

    }

    @Override
    public void deleteUserByEmail(String email) {
            Optional<User> optionalUser = getUserByEmail(email);
            if (optionalUser.isEmpty()){
                throw new RuntimeException("User not found with Email: " + email);
            }
    }
}
