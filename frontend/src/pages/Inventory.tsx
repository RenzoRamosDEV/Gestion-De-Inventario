import { useEffect, useState, useCallback } from 'react'
import {
  Search, Plus, Pencil, Trash2,
  TrendingUp, TrendingDown, ChevronLeft, ChevronRight, RotateCcw,
} from 'lucide-react'
import { productApi } from '../api/products'
import type { Product, ProductCreateDTO, ProductUpdateDTO } from '../types/product'
import StockBadge from '../components/StockBadge'
import ProductModal from '../components/ProductModal'
import StockModal from '../components/StockModal'

type StockMode = 'increase' | 'decrease'
type DeletedFilter = 'active' | 'deleted' | 'all'

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([])
  const [totalElements, setTotalElements] = useState(0)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [inStockFilter, setInStockFilter] = useState<boolean | undefined>(undefined)
  const [deletedFilter, setDeletedFilter] = useState<DeletedFilter>('all')

  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [stockModal, setStockModal] = useState<{ product: Product; mode: StockMode } | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const showDeleted = deletedFilter !== 'active' ? true : undefined
      const res = await productApi.getAll({
        name: search || undefined,
        inStock: inStockFilter,
        showDeleted,
        page,
        size: 10,
      })

      let content = res.data.content
      if (deletedFilter === 'active') content = content.filter(p => !p.deleted)
      if (deletedFilter === 'deleted') content = content.filter(p => p.deleted)

      setProducts(content)
      setTotalElements(res.data.totalElements)
      setTotalPages(res.data.totalPages)
    } finally {
      setLoading(false)
    }
  }, [search, inStockFilter, deletedFilter, page])

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300)
    return () => clearTimeout(timer)
  }, [fetchProducts])

  async function handleSave(data: ProductCreateDTO | ProductUpdateDTO) {
    if (editProduct) {
      await productApi.update(editProduct.id, data as ProductUpdateDTO)
    } else {
      await productApi.create(data as ProductCreateDTO)
    }
    setPage(0)
    fetchProducts()
  }

  async function handleDelete(product: Product) {
    if (!confirm(`¿Eliminar "${product.name}"?`)) return
    await productApi.delete(product.id)
    fetchProducts()
  }

  async function handleRestore(product: Product) {
    if (!confirm(`¿Restaurar "${product.name}"?`)) return
    await productApi.restore(product.id)
    fetchProducts()
  }

  async function handleStockConfirm(quantity: number) {
    if (!stockModal) return
    if (stockModal.mode === 'increase') {
      await productApi.increaseStock(stockModal.product.id, { quantity })
    } else {
      await productApi.decreaseStock(stockModal.product.id, { quantity })
    }
    fetchProducts()
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventario</h1>
          <p className="text-sm text-gray-500 mt-0.5">{totalElements} productos en total</p>
        </div>
        <button
          onClick={() => { setEditProduct(null); setShowModal(true) }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Agregar Producto
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0) }}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          />
        </div>

        <select
          value={inStockFilter === undefined ? '' : String(inStockFilter)}
          onChange={e => {
            setInStockFilter(e.target.value === '' ? undefined : e.target.value === 'true')
            setPage(0)
          }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-600"
        >
          <option value="">Todo el stock</option>
          <option value="true">Solo con stock</option>
        </select>

        <select
          value={deletedFilter}
          onChange={e => { setDeletedFilter(e.target.value as DeletedFilter); setPage(0) }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-600"
        >
          <option value="all">Todos los productos</option>
          <option value="active">Solo activos</option>
          <option value="deleted">Solo eliminados</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">ID</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Nombre</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden md:table-cell">Descripción</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Precio</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Stock</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Eliminado</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden lg:table-cell">Creado</th>
              <th className="px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="text-center py-12 text-gray-400">Cargando...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-12 text-gray-400">No se encontraron productos</td></tr>
            ) : products.map((product, i) => (
              <tr
                key={product.id}
                className={`border-b border-gray-50 transition-colors ${
                  product.deleted
                    ? 'bg-red-50/40 hover:bg-red-50'
                    : i % 2 === 0
                    ? 'hover:bg-gray-50'
                    : 'bg-gray-50/50 hover:bg-gray-100/60'
                }`}
              >
                <td className="px-4 py-3 text-gray-400 font-mono text-xs">#{product.id}</td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  <span className={product.deleted ? 'line-through text-gray-400' : ''}>
                    {product.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell max-w-[220px] truncate">
                  {product.description ?? '—'}
                </td>
                <td className="px-4 py-3 font-medium text-gray-700">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3"><StockBadge stock={product.stock} /></td>
                <td className="px-4 py-3">
                  {product.deleted ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Sí</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">No</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">
                  {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      title="Aumentar stock"
                      onClick={() => setStockModal({ product, mode: 'increase' })}
                      className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                    >
                      <TrendingUp size={14} />
                    </button>
                    <button
                      title="Reducir stock"
                      onClick={() => setStockModal({ product, mode: 'decrease' })}
                      className="p-1.5 rounded-lg text-orange-500 hover:bg-orange-50 transition-colors"
                    >
                      <TrendingDown size={14} />
                    </button>
                    {!product.deleted ? (
                      <>
                        <button
                          title="Editar"
                          onClick={() => { setEditProduct(product); setShowModal(true) }}
                          className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          title="Eliminar"
                          onClick={() => handleDelete(product)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    ) : (
                      <button
                        title="Restaurar"
                        onClick={() => handleRestore(product)}
                        className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                      >
                        <RotateCcw size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50">
            <span className="text-xs text-gray-500">Página {page + 1} de {totalPages}</span>
            <div className="flex gap-1">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <ProductModal
          product={editProduct}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      {stockModal && (
        <StockModal
          product={stockModal.product}
          mode={stockModal.mode}
          onClose={() => setStockModal(null)}
          onConfirm={handleStockConfirm}
        />
      )}
    </div>
  )
}
