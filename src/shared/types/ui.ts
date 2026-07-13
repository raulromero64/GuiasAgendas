import type { LucideIcon } from 'lucide-react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

export interface StatItem {
  title: string
  value: number
  icon: LucideIcon
}

export interface HeaderProfile {
  role: string
  campus: string
}
