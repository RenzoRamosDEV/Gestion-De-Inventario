interface Props {
  stock: number
}

export default function StockBadge({ stock }: Props) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
        {stock}
      </span>
    )
  }
  if (stock < 10) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block" />
        {stock}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
      {stock}
    </span>
  )
}
