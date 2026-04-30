import { DashboardStats } from '../types/product'
import { api } from './client'

export const dashboardAPI = {
  getStats: (): Promise<DashboardStats> => {
    return api.get('/dashboard/stats').then(res => res.data)
  }
}