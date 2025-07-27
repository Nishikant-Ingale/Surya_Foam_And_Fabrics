package com.nishikant.surya_farms.qr_service.controller;


import com.nishikant.surya_farms.qr_service.entity.QrCode;
import com.nishikant.surya_farms.qr_service.service.interface_implis.QrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/qr")
public class QrController {

    @Autowired
    private QrService qrService;

    String feedbackUrl = "http://suryafoamandfabrics.com/feedback/customer";
    @PostMapping("/generate")
    public ResponseEntity<?> generateQr(@RequestParam Long employeeId, @RequestParam String feedbackUrl) {
        try {
            QrCode qr = qrService.generateQrCode(employeeId, feedbackUrl);
            return ResponseEntity.ok("QR code generated and stored successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to generate QR code.");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateQr(@RequestParam Long employeeId) {
        try {
            QrCode updated = qrService.generateQrCode(employeeId, feedbackUrl + "/" + employeeId);
            return ResponseEntity.ok(updated.getQrImage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update QR code.");
        }
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<byte[]> getQrCode(@PathVariable Long employeeId) {
        QrCode qr = qrService.getQrCode(employeeId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return new ResponseEntity<>(qr.getQrImage(), headers, HttpStatus.OK);
    }
}
