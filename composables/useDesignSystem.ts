/**
 * Design System Composable
 * Fornece acesso fácil às configurações do design system
 */

import { 
  colors, 
  gradients, 
  shadows, 
  spacing, 
  borders, 
  typography, 
  transitions, 
  interactive, 
  layout, 
  feedback, 
  breakpoints 
} from '../config/design-system.js'

export const useDesignSystem = () => {
  // Função para construir classes de botão
  const buttonClasses = (variant: 'primary' | 'secondary' | 'ghost' | 'destructive' = 'primary', size: 'sm' | 'md' | 'lg' = 'md') => {
    const validVariants = ['primary', 'secondary', 'ghost'] as const
    const baseVariant = validVariants.includes(variant as any) ? variant as 'primary' | 'secondary' | 'ghost' : 'primary'
    const base = interactive.button[baseVariant]
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }
    return `${base} ${sizes[size]} font-semibold`
  }

  // Função para construir classes de card
  const cardClasses = (variant: 'base' | 'hover' = 'base') => {
    return interactive.card[variant]
  }

  // Função para construir classes de input
  const inputClasses = (error: boolean = false) => {
    return error ? `${interactive.input.base} ${interactive.input.error}` : interactive.input.base
  }

  // Função para construir classes de badge
  const badgeClasses = (variant: 'primary' | 'success' | 'warning' | 'error' = 'primary') => {
    return feedback.badge[variant]
  }

  // Função para construir classes de grid responsivo
  const gridClasses = (type: 'products' | 'form' | 'stats' = 'products') => {
    return layout.grid[type]
  }

  // Função para construir classes de container
  const containerClasses = (size: 'sm' | 'md' | 'lg' | 'xl' = 'lg') => {
    return layout.container[size]
  }

  // Função para construir classes de tipografia
  const headingClasses = (level: 'h1' | 'h2' | 'h3' | 'h4' = 'h1') => {
    return typography.heading[level]
  }

  // Função para loading skeleton
  const skeletonClasses = (width: string = 'w-full', height: string = 'h-4') => {
    return `${feedback.loading.skeleton} ${width} ${height}`
  }

  // Função para estado vazio
  const emptyStateClasses = () => {
    return {
      container: feedback.empty.container,
      icon: feedback.empty.icon,
      title: feedback.empty.title,
      description: feedback.empty.description
    }
  }

  // Função para construir gradientes de texto
  const textGradient = (variant: 'primary' | 'secondary' = 'primary') => {
    const gradientMap = {
      primary: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
      secondary: 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
    }
    return gradientMap[variant]
  }

  // Função para construir classes de transição
  const transitionClasses = (type: 'fast' | 'normal' | 'slow' | 'hover' = 'normal') => {
    return transitions[type]
  }

  return {
    // Configurações diretas
    colors,
    gradients,
    shadows,
    spacing,
    borders,
    typography,
    transitions,
    interactive,
    layout,
    feedback,
    breakpoints,
    
    // Funções utilitárias
    buttonClasses,
    cardClasses,
    inputClasses,
    badgeClasses,
    gridClasses,
    containerClasses,
    headingClasses,
    skeletonClasses,
    emptyStateClasses,
    textGradient,
    transitionClasses
  }
}