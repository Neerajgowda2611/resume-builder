// // src/components/ui/input.tsx
// import { cn } from '@/lib/utils'
// import { InputHTMLAttributes, forwardRef } from 'react'

// export type InputProps = InputHTMLAttributes<HTMLInputElement>

// export const Input = forwardRef<HTMLInputElement, InputProps>(
//   ({ className, ...props }, ref) => {
//     return (
//       <input
//         className={cn(
//           'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2',
//           'text-sm ring-offset-background file:border-0 file:bg-transparent',
//           'file:text-sm file:font-medium placeholder:text-muted-foreground',
//           'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
//           'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
//           className
//         )}
//         ref={ref}
//         {...props}
//       />
//     )
//   }
// )
// Input.displayName = 'Input'


import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";
