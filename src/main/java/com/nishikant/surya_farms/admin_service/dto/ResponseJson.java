package com.nishikant.surya_farms.admin_service.dto;

import com.nishikant.surya_farms.admin_service.entity.User;
import com.nishikant.surya_farms.qr_service.entity.QrCode;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseJson {
    User user;
    QrCode qrCode;
}
