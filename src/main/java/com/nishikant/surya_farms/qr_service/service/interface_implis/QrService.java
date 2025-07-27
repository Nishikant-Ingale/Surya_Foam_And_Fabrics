package com.nishikant.surya_farms.qr_service.service.interface_implis;

import com.nishikant.surya_farms.qr_service.entity.QrCode;
import com.nishikant.surya_farms.qr_service.entity.repository_interface.QrRepository;
import com.nishikant.surya_farms.qr_service.service.QrServiceInterface;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
@Slf4j
public class QrService implements QrServiceInterface {

    @Value("${qrcoder.api.key}")
    private String apiKey;

    @Autowired
    private QrRepository repository;


    @Override
    public QrCode generateQrCode(Long employeeId, String feedbackUrl) throws IOException {

        String apiUrl = "https://www.qrcoder.co.uk/api/v4/?key=" + apiKey + "&text=" + URLEncoder.encode(feedbackUrl, StandardCharsets.UTF_8);

        byte[] imageBytes = fetchImageFromApi(apiUrl);

        QrCode qrCode = repository.findByEmployeeId(employeeId).orElse(new QrCode());
        qrCode.setEmployeeId(employeeId);
        qrCode.setQrImage(imageBytes);
        qrCode.setQrUrl(feedbackUrl);
        return repository.save(qrCode);
    }

    @Override
    public QrCode getQrCode(Long employeeId) {
        return repository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new EntityNotFoundException("QR code not found for employeeId: " + employeeId));
    }

    @Override
    public byte[] fetchImageFromApi(String apiUrl) throws IOException {
        try (InputStream in = new URL(apiUrl).openStream()) {
            return in.readAllBytes();
        }
    }

    @Override
    public void deleteQr(Long employeeId){
        QrCode databaseQr = getQrCode(employeeId);
        repository.delete(databaseQr);
        log.info("Qr code deleted for employee: {}", employeeId);
    }
}
