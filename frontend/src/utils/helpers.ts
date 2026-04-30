import { Product } from '../types/product'

/**
 * Formatea un precio para mostrar en la UI
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(price)
}

/**
 * Formatea una fecha para mostrar en la UI
 */
export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

/**
 * Obtiene el color del badge de stock
 */
export const getStockBadgeColor = (stock: number): string => {
  if (stock === 0) return 'bg-red-100 text-red-800'
  if (stock <= 10) return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
}

/**
 * Obtiene el texto del badge de stock
 */
export const getStockBadgeText = (stock: number): string => {
  if (stock === 0) return 'Sin stock'
  if (stock <= 10) return 'Stock bajo'
  return 'Disponible'
}

/**
 * Filtra productos por nombre
 */
export const filterProductsByName = (products: Product[], searchTerm: string): Product[] => {
  if (!searchTerm.trim()) return products
  
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

/**
 * Valida un precio
 */
export const validatePrice = (price: string): boolean => {
  const numericPrice = parseFloat(price)
  return !isNaN(numericPrice) && numericPrice > 0
}