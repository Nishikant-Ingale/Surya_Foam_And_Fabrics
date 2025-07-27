package com.nishikant.surya_farms.qr_service.entity.repository_interface;

import com.nishikant.surya_farms.qr_service.entity.QrCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QrRepository extends JpaRepository<QrCode, Long> {
    Optional<QrCode> findByEmployeeId(Long employeeId);
}
