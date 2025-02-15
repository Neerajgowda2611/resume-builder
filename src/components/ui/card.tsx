// src/components/ui/card.tsx
import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

export type CardProps = HTMLAttributes<HTMLDivElement>

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border bg-white shadow-sm',
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'   