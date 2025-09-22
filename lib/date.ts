// Utilidades centralizadas de formatação de datas usando date-fns
import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatShort(date: Date | string) {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'dd/MM/yyyy', { locale: ptBR })
}

export function formatMonthDay(date: Date | string) {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'dd MMM', { locale: ptBR })
}

export function fromNow(date: Date | string) {
  const d = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(d, { addSuffix: true, locale: ptBR })
}
