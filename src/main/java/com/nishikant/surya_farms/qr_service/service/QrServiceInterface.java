package com.nishikant.surya_farms.qr_service.service;


import com.nishikant.surya_farms.qr_service.entity.QrCode;

import java.io.IOException;

public interface QrServiceInterface {
    QrCode generateQrCode(Long employeeId, String feedbackUrl) throws IOException;
    QrCode getQrCode(Long employeeId);
    byte[] fetchImageFromApi(String apiUrl) throws IOException;
    void deleteQr(Long employeeId);
}
