import { useEffect, useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'
import { Package, DollarSign, AlertTriangle, XCircle } from 'lucide-react'
import { productApi } from '../api/products'
import type { Product } from '../types/product'
import StockBadge from '../components/StockBadge'

interface Stats {
  total: number
  totalValue: number
  lowStock: Product[]
  outOfStock: number
  topByPrice: Product[]
  allProducts: Product[]
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
}: {
  label: string
  value: string | number
  sub?: string
  icon: React.ElementType
  color: string
}) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
        <div className={`p-2.5 rounded-lg ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
    </div>
  )
}

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await productApi.getAll({ size: 100 })
        const all = res.data.content
        const totalValue = all.reduce((sum, p) => sum + p.price * p.stock, 0)
        const lowStock = all.filter(p => p.stock > 0 && p.stock < 10)
        const outOfStock = all.filter(p => p.stock === 0).length
        const topByPrice = [...all].sort((a, b) => b.price - a.price).slice(0, 5)
        setStats({ total: res.data.totalElements, totalValue, lowStock, outOfStock, topByPrice, allProducts: all })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="p-6 text-gray-400 text-sm">Cargando panel...</div>
  }

  if (!stats) return null

  const stockDistribution = [
    { name: 'Con stock', value: stats.allProducts.filter(p => p.stock >= 10).length },
    { name: 'Stock bajo', value: stats.allProducts.filter(p => p.stock > 0 && p.stock < 10).length },
    { name: 'Sin stock', value: stats.outOfStock },
  ]

  const priceRanges = [
    { range: '$0–400', count: stats.allProducts.filter(p => p.price <= 400).length },
    { range: '$401–700', count: stats.allProducts.filter(p => p.price > 400 && p.price <= 700).length },
    { range: '$701–900', count: stats.allProducts.filter(p => p.price > 700 && p.price <= 900).length },
    { range: '$901–1000', count: stats.allProducts.filter(p => p.price > 900 && p.price <= 1000).length },
    { range: '$1000+', count: stats.allProducts.filter(p => p.price > 1000).length },
  ]

  const stockByMonth = stats.allProducts
    .reduce<Record<string, number>>((acc, p) => {
      const month = p.createdAt ? new Date(p.createdAt).toLocaleString('es', { month: 'short', year: '2-digit' }) : 'Desconocido'
      acc[month] = (acc[month] ?? 0) + p.stock
      return acc
    }, {})
  const stockTrend = Object.entries(stockByMonth)
    .map(([month, stock]) => ({ month, stock }))
    .slice(-8)

  const PIE_COLORS = ['#6366f1', '#f59e0b', '#ef4444']

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Panel Principal</h1>
        <p className="text-sm text-gray-500 mt-0.5">Resumen general del inventario</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Productos" value={stats.total} sub="En el inventario" icon={Package} color="bg-indigo-500" />
        <StatCard label="Valor en Stock" value={`$${stats.totalValue.toLocaleString('es', { maximumFractionDigits: 0 })}`} sub="Precio × stock" icon={DollarSign} color="bg-violet-500" />
        <StatCard label="Stock Bajo" value={stats.lowStock.length} sub="Menos de 10 unidades" icon={AlertTriangle} color="bg-amber-500" />
        <StatCard label="Sin Stock" value={stats.outOfStock} sub="Necesitan reabastecerse" icon={XCircle} color="bg-red-500" />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Stock trend area chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Stock Total por Fecha de Lanzamiento</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={stockTrend}>
              <defs>
                <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="stock" stroke="#6366f1" strokeWidth={2} fill="url(#stockGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top products by price */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Top Productos por Precio</h2>
          <div className="space-y-3">
            {stats.topByPrice.map((p, i) => {
              const max = stats.topByPrice[0].price
              const pct = (p.price / max) * 100
              return (
                <div key={p.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 truncate max-w-[140px]">{p.name}</span>
                    <span className="font-medium text-gray-800">${p.price}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: COLORS[i] }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Price range bar chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Productos por Rango de Precio</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={priceRanges} barSize={24}>
              <XAxis dataKey="range" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {priceRanges.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stock status donut */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Estado del Stock</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={stockDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                {stockDistribution.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Low stock table */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Stock Bajo
            <span className="ml-2 text-xs font-normal text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              {stats.lowStock.length} necesitan reabastecerse
            </span>
          </h2>
          <div className="space-y-2">
            {stats.lowStock.slice(0, 5).map(p => (
              <div key={p.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700 truncate max-w-[160px]">{p.name}</span>
                <StockBadge stock={p.stock} />
              </div>
            ))}
            {stats.lowStock.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">Todos los productos tienen stock suficiente</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
