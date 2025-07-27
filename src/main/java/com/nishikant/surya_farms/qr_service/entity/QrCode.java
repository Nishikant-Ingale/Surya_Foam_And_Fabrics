package com.nishikant.surya_farms.qr_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "qr_codes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class QrCode {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long employeeId;

    @Lob
    private byte[] qrImage;

    private String qrUrl;

    private LocalDateTime createdAt = LocalDateTime.now();

    public QrCode(Long employeeId, byte[] qrImage, String qrUrl) {
        this.employeeId = employeeId;
        this.qrImage = qrImage;
        this.qrUrl = qrUrl;
    }
}
