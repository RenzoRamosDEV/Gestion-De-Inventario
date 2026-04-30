import React, { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'

interface SearchFiltersProps {
  onSearch: (term: string) => void
  onFilter: (filters: ProductFilters) => void
  onClear: () => void
}

interface ProductFilters {
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  includeDeleted?: boolean
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  onFilter,
  onClear
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<ProductFilters>({})

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    onSearch(term)
  }

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const clearAll = () => {
    setSearchTerm('')
    setFilters({})
    setShowFilters(false)
    onClear()
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '')

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar productos por nombre..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
            showFilters || hasActiveFilters
              ? 'bg-blue-50 border-blue-300 text-blue-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter size={20} />
          <span>Filtros</span>
          {hasActiveFilters && (
            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
              {Object.values(filters).filter(v => v !== undefined && v !== '').length}
            </span>
          )}
        </button>

        {/* Clear All */}
        {(searchTerm || hasActiveFilters) && (
          <button
            onClick={clearAll}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X size={20} />
            <span>Limpiar</span>
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio mínimo
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio máximo
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.inStock === undefined ? '' : filters.inStock ? 'true' : 'false'}
                onChange={(e) => handleFilterChange('inStock', e.target.value === '' ? undefined : e.target.value === 'true')}
              >
                <option value="">Todos</option>
                <option value="true">Con stock</option>
                <option value="false">Sin stock</option>
              </select>
            </div>

            <div>
              <label className="flex items-center mt-6">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.includeDeleted || false}
                  onChange={(e) => handleFilterChange('includeDeleted', e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-700">
                  Incluir eliminados
                </span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}