import React from 'react'
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  className?: string
}

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  className = ''
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />
      case 'error':
        return <AlertCircle className="text-red-500" size={20} />
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={20} />
      default:
        return <Info className="text-blue-500" size={20} />
    }
  }

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800'
    }
  }

  return (
    <div className={`p-4 border rounded-lg ${getStyles()} ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">{title}</h3>
          {message && (
            <p className="mt-1 text-sm opacity-90">{message}</p>
          )}
        </div>
      </div>
    </div>
  )
}