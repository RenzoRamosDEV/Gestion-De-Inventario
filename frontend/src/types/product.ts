export interface Product {
  id: number
  name: string
  description: string | null
  price: number
  stock: number
  deleted: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductCreateDTO {
  name: string
  description?: string
  price: number
  initialStock?: number
}

export interface ProductUpdateDTO {
  name?: string
  description?: string
  price?: number
}

export interface StockRequestDTO {
  quantity: number
}

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  currentPage: number
  pageSize: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface DashboardStats {
  totalProducts: number
  activeProducts: number
  deletedProducts: number
  outOfStockProducts: number
  lowStockProducts: number
  totalInventoryValue: number
}
