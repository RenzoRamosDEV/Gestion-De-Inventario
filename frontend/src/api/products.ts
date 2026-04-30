import axios from 'axios'
import type { PageResponse, Product, ProductCreateDTO, ProductUpdateDTO, StockRequestDTO } from '../types/product'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

export interface ProductFilters {
  name?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  showDeleted?: boolean
  page?: number
  size?: number
}

export const productApi = {
  getAll: (filters: ProductFilters = {}) => {
    const params: Record<string, unknown> = { page: filters.page ?? 0, size: filters.size ?? 20 }
    if (filters.name) params.name = filters.name
    if (filters.minPrice !== undefined) params.minPrice = filters.minPrice
    if (filters.maxPrice !== undefined) params.maxPrice = filters.maxPrice
    if (filters.inStock !== undefined) params.inStock = filters.inStock
    if (filters.showDeleted !== undefined) params.showDeleted = filters.showDeleted
    return api.get<PageResponse<Product>>('/products', { params })
  },

  getById: (id: number) =>
    api.get<Product>(`/products/${id}`),

  create: (dto: ProductCreateDTO) =>
    api.post<Product>('/products', dto),

  update: (id: number, dto: ProductUpdateDTO) =>
    api.put<Product>(`/products/${id}`, dto),

  delete: (id: number) =>
    api.delete(`/products/${id}`),

  restore: (id: number) =>
    api.post<Product>(`/products/${id}/restore`),

  increaseStock: (id: number, dto: StockRequestDTO) =>
    api.post<Product>(`/products/${id}/increase-stock`, dto),

  decreaseStock: (id: number, dto: StockRequestDTO) =>
    api.post<Product>(`/products/${id}/decrease-stock`, dto),
}
