import axios from 'axios'
import { Product, ProductCreateDTO, ProductUpdateDTO, StockRequestDTO, PageResponse } from '../types/product'
import { api } from './client'

const BASE_URL = '/products'

export const productAPI = {
  // Obtener productos con paginación y filtros
  getProducts: (params?: {
    page?: number
    size?: number
    name?: string
    minPrice?: number
    maxPrice?: number
    inStock?: boolean
    showDeleted?: boolean
  }): Promise<PageResponse<Product>> => {
    return api.get(BASE_URL, { params }).then(res => res.data)
  },

  // Obtener producto por ID
  getProduct: (id: number): Promise<Product> => {
    return api.get(`${BASE_URL}/${id}`).then(res => res.data)
  },

  // Crear producto
  createProduct: (product: ProductCreateDTO): Promise<Product> => {
    return api.post(BASE_URL, product).then(res => res.data)
  },

  // Actualizar producto
  updateProduct: (id: number, product: ProductUpdateDTO): Promise<Product> => {
    return api.put(`${BASE_URL}/${id}`, product).then(res => res.data)
  },

  // Eliminar producto (soft delete)
  deleteProduct: (id: number): Promise<void> => {
    return api.delete(`${BASE_URL}/${id}`).then(res => res.data)
  },

  // Restaurar producto
  restoreProduct: (id: number): Promise<Product> => {
    return api.post(`${BASE_URL}/${id}/restore`).then(res => res.data)
  },

  // Aumentar stock
  increaseStock: (id: number, request: StockRequestDTO): Promise<Product> => {
    return api.post(`${BASE_URL}/${id}/increase-stock`, request).then(res => res.data)
  },

  // Reducir stock
  decreaseStock: (id: number, request: StockRequestDTO): Promise<Product> => {
    return api.post(`${BASE_URL}/${id}/decrease-stock`, request).then(res => res.data)
  }
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
