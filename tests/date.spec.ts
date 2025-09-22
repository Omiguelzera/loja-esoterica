import { describe, it, expect, vi } from 'vitest'
import { formatShort, formatMonthDay, fromNow } from '../lib/date.js'

// Fix current date reference by freezing Date.now for deterministic fromNow tests

describe('date utils', () => {
  it('formatShort returns dd/MM/yyyy', () => {
    const d = new Date('2024-05-10T12:00:00Z')
    expect(formatShort(d)).toBe('10/05/2024')
  })

  it('formatMonthDay returns dd MMM (pt-BR)', () => {
    const d = new Date('2024-05-10T12:00:00Z')
    expect(formatMonthDay(d)).toMatch(/^10 /) // month name localized
  })

  it('fromNow returns relative string with suffix', () => {
    const base = new Date('2024-05-10T12:00:00Z')
    const spy = vi.spyOn(Date, 'now').mockReturnValue(base.getTime())
    const past = new Date(base.getTime() - 1000 * 60 * 60) // 1 hour ago
    const result = fromNow(past)
    expect(result).toMatch(/1 hora|cerca de 1 hora|aproximadamente 1 hora/) // allow locale variation
    spy.mockRestore()
  })
})
