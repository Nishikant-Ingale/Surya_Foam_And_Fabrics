package com.nishikant.surya_farms.admin_service.controller;

import com.nishikant.surya_farms.admin_service.dto.ResponseJson;
import com.nishikant.surya_farms.admin_service.entity.User;
import com.nishikant.surya_farms.admin_service.service.interface_implis.UserService;
import com.nishikant.surya_farms.qr_service.entity.QrCode;
import com.nishikant.surya_farms.qr_service.service.interface_implis.QrService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@Slf4j
public class UserController {

    String feedbackUrl = "http://suryafoamandfabrics.com/feedback/customer";


    @Autowired
    UserService userService;

    @Autowired
    QrService qrService;

    @GetMapping()
    public ResponseEntity<?> getAllUsers(Model model) {
        return ResponseEntity.ok(
                userService
                        .getAllUsers()
        );
    }

    @PostMapping()
    public ResponseEntity<?> insertUser(@Valid @RequestBody User user) throws IOException {

        User insertedUser = userService.insertUser(user);
        log.info("Inserted new user in data base: {}", insertedUser);
        QrCode generatedQrCode = qrService.generateQrCode(insertedUser.getId(), feedbackUrl + "/" + insertedUser.getId());
        log.info("New QR code generated for user {}: {}", insertedUser.getId(), generatedQrCode);
        return ResponseEntity.ok(new ResponseJson(insertedUser, generatedQrCode));
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<?> getUserByIdWithQrCode(@PathVariable Long employeeId) {

        log.info("Request accepted for fetching user information for {}", employeeId);

        User user = userService.getUserById(employeeId);
        QrCode qrCode = qrService.getQrCode(user.getId());

        return ResponseEntity.ok(new ResponseJson(user, qrCode));
    }

    @PutMapping("/{employeeId}")
    public ResponseEntity<?> updateUserData(@PathVariable Long employeeId, @RequestBody User user) {

        return ResponseEntity.ok(
                new ResponseJson(
                        userService.updateUserDetails(employeeId, user),
                        qrService.getQrCode(employeeId)
                )
        );
    }
    @DeleteMapping("/{employeeId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long employeeId){
        userService.deleteUserById(employeeId);
        return ResponseEntity.status(204).body(
                "User deleted"
        );
    }
    @DeleteMapping("/bulk/delete")
    public ResponseEntity<?> bulkDeleteUsers(@RequestBody List<User> users){
        users.forEach(user->{userService.deleteUserById(user.getId());});
        return ResponseEntity.status(204).body(
                "Users deleted"
        );
    }
}
