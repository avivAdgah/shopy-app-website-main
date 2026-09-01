const CATEGORY_COLORS = {
  Electronics: '#6366f1',
  Fashion: '#ec4899',
  'Home & Living': '#f59e0b',
  Sports: '#10b981',
}

export function categoryPlaceholder(category) {
  const color = CATEGORY_COLORS[category] ?? '#7c3aed'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
    <rect width="800" height="800" fill="${color}" />
    <text x="400" y="420" text-anchor="middle" font-family="Arial, sans-serif" font-size="40" font-weight="700" fill="#ffffff" fill-opacity="0.9">${category}</text>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export function handleImageError(category) {
  return (event) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = categoryPlaceholder(category)
  }
}
