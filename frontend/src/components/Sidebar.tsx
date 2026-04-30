import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  BarChart2,
  Users,
  Settings,
} from 'lucide-react'

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Inicio' },
  { to: '/inventory', icon: Package, label: 'Inventario' },
  { to: '/reports', icon: BarChart2, label: 'Reportes' },
  { to: '/users', icon: Users, label: 'Usuarios' },
  { to: '/settings', icon: Settings, label: 'Configuración' },
]

export default function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-[#1e1b4b] flex flex-col fixed left-0 top-0 bottom-0 z-10">
      <div className="px-6 py-5 border-b border-indigo-800">
        <span className="text-white font-bold text-lg tracking-wide">📦 Inventario</span>
      </div>
      <nav className="flex-1 mt-4">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
