export const validators = {
  /**
   * Valida que un campo no esté vacío
   */
  required: (value: any, message: string = 'Este campo es requerido'): string | null => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return message
    }
    return null
  },

  /**
   * Valida la longitud mínima de un string
   */
  minLength: (value: string, min: number, message?: string): string | null => {
    if (value && value.length < min) {
      return message || `Debe tener al menos ${min} caracteres`
    }
    return null
  },

  /**
   * Valida la longitud máxima de un string
   */
  maxLength: (value: string, max: number, message?: string): string | null => {
    if (value && value.length > max) {
      return message || `No debe exceder ${max} caracteres`
    }
    return null
  },

  /**
   * Valida que un número sea positivo
   */
  positive: (value: number, message: string = 'Debe ser un número positivo'): string | null => {
    if (value !== undefined && value !== null && value <= 0) {
      return message
    }
    return null
  },

  /**
   * Valida formato de email
   */
  email: (value: string, message: string = 'Formato de email inválido'): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value && !emailRegex.test(value)) {
      return message
    }
    return null
  },

  /**
   * Valida que un precio sea válido
   */
  price: (value: number, message: string = 'Precio inválido'): string | null => {
    if (value !== undefined && value !== null) {
      if (isNaN(value) || value < 0) {
        return message
      }
      // Máximo 2 decimales
      const decimals = (value.toString().split('.')[1] || '').length
      if (decimals > 2) {
        return 'El precio no puede tener más de 2 decimales'
      }
    }
    return null
  },

  /**
   * Valida un stock (número entero no negativo)
   */
  stock: (value: number, message: string = 'Stock inválido'): string | null => {
    if (value !== undefined && value !== null) {
      if (!Number.isInteger(value) || value < 0) {
        return message
      }
    }
    return null
  }
}