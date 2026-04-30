export const ROUTES = {
  DASHBOARD: '/',
  INVENTORY: '/inventory',
  PRODUCTS: '/products',
  SETTINGS: '/settings',
} as const

export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: number) => `/products/${id}`,
  INCREASE_STOCK: (id: number) => `/products/${id}/increase-stock`,
  DECREASE_STOCK: (id: number) => `/products/${id}/decrease-stock`,
  RESTORE_PRODUCT: (id: number) => `/products/${id}/restore`,
  DASHBOARD_STATS: '/dashboard/stats',
} as const

export const PAGINATION = {
  DEFAULT_PAGE: 0,
  DEFAULT_SIZE: 10,
  MAX_SIZE: 100,
} as const

export const STOCK_THRESHOLDS = {
  LOW_STOCK: 10,
  OUT_OF_STOCK: 0,
} as const