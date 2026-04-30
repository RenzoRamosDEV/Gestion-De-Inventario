package org.service_entity.entity.service;

import org.service_entity.entity.service.model.DashboardStatsDTO;

/**
 * Servicio para obtener estadísticas del dashboard.
 */
public interface DashboardService {
    
    /**
     * Obtiene las estadísticas generales del inventario.
     * @return estadísticas del dashboard
     */
    DashboardStatsDTO getDashboardStats();
}