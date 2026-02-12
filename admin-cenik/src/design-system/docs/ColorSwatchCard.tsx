import { CardSurface, Text } from '../index'

interface ColorSwatchCardProps {
  name: string
  value: string
}

function isLightColor(value: string): boolean {
  // Very small heuristic – good enough for tokens in this DS
  if (value.startsWith('#') && (value.length === 7 || value.length === 4)) {
    const hex = value.length === 7
      ? value.slice(1)
      : value.slice(1).split('').map((ch) => ch + ch).join('')

    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luminance > 200
  }

  if (value.startsWith('rgba')) {
    const match = value.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/)
    if (match) {
      const r = parseInt(match[1], 10)
      const g = parseInt(match[2], 10)
      const b = parseInt(match[3], 10)
      const a = parseFloat(match[4])
      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) * a + 255 * (1 - a)
      return luminance > 220
    }
  }

  return false
}

export default function ColorSwatchCard({ name, value }: ColorSwatchCardProps) {
  const light = isLightColor(value)

  return (
    <CardSurface>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div
          style={{
            height: 72,
            borderRadius: 8,
            background: value,
            border: light ? '1px solid var(--ds-border-subtle)' : 'none',
          }}
        />
        <Text variant="bodySm" className="fw-semibold">
          {name}
        </Text>
        <Text variant="bodySm" muted>
          {value}
        </Text>
      </div>
    </CardSurface>
  )
}

