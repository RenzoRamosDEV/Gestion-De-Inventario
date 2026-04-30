export interface Product {
  id: number
  name: string
  description: string | null
  price: number
  stock: number
  deleted: boolean
  createdAt: string
}

export interface ProductCreateDTO {
  name: string
  description?: string
  price: number
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
  number: number
  size: number
}
