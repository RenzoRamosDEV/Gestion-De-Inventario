export const formatters = {
  /**
   * Formatea un número como moneda mexicana
   */
  currency: (amount: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount)
  },

  /**
   * Formatea un número con separadores de miles
   */
  number: (value: number): string => {
    return new Intl.NumberFormat('es-MX').format(value)
  },

  /**
   * Formatea una fecha en formato corto
   */
  dateShort: (date: string | Date): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(d)
  },

  /**
   * Formatea una fecha con hora
   */
  dateTime: (date: string | Date): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d)
  },

  /**
   * Formatea fecha relativa (hace X tiempo)
   */
  dateRelative: (date: string | Date): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

    if (diffInSeconds < 60) return 'hace unos segundos'
    if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)} minutos`
    if (diffInSeconds < 86400) return `hace ${Math.floor(diffInSeconds / 3600)} horas`
    if (diffInSeconds < 604800) return `hace ${Math.floor(diffInSeconds / 86400)} días`
    
    return formatters.dateShort(d)
  },

  /**
   * Trunca texto a una longitud específica
   */
  truncate: (text: string, length: number = 50): string => {
    if (text.length <= length) return text
    return text.substring(0, length) + '...'
  }
}