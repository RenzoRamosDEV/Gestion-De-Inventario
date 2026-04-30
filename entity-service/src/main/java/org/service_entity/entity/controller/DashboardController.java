package org.service_entity.entity.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.service_entity.entity.service.DashboardService;
import org.service_entity.entity.service.model.DashboardStatsDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST para operaciones del dashboard.
 */
@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Dashboard", description = "Operaciones del dashboard y estadísticas")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    @Operation(summary = "Obtener estadísticas del dashboard")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        log.info("Solicitando estadísticas del dashboard");
        DashboardStatsDTO stats = dashboardService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }
}