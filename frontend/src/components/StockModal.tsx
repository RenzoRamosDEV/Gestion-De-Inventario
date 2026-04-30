import { useState } from 'react'
import { X, TrendingUp, TrendingDown } from 'lucide-react'
import type { Product } from '../types/product'

interface Props {
  product: Product
  mode: 'increase' | 'decrease'
  onClose: () => void
  onConfirm: (quantity: number) => Promise<void>
}

export default function StockModal({ product, mode, onClose, onConfirm }: Props) {
  const [quantity, setQuantity] = useState('1')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const qty = parseInt(quantity)
    if (isNaN(qty) || qty < 1) return setError('La cantidad debe ser al menos 1')
    if (mode === 'decrease' && qty > product.stock) {
      return setError(`No se puede reducir en ${qty}. Stock disponible: ${product.stock}`)
    }
    setLoading(true)
    setError('')
    try {
      await onConfirm(qty)
      onClose()
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error
      setError(msg ?? 'Ocurrió un error')
    } finally {
      setLoading(false)
    }
  }

  const isIncrease = mode === 'increase'

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            {isIncrease ? (
              <TrendingUp size={18} className="text-green-600" />
            ) : (
              <TrendingDown size={18} className="text-red-600" />
            )}
            <h2 className="text-lg font-semibold text-gray-800">
              {isIncrease ? 'Aumentar Stock' : 'Reducir Stock'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <p className="text-sm text-gray-600">
            Producto: <span className="font-medium text-gray-800">{product.name}</span>
            <br />
            Stock actual: <span className="font-medium">{product.stock}</span>
          </p>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 text-white rounded-lg py-2 text-sm font-medium disabled:opacity-60 ${
                isIncrease ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {loading ? 'Actualizando...' : isIncrease ? 'Agregar Stock' : 'Quitar Stock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
