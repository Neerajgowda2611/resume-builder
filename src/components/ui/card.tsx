// // src/components/ui/card.tsx
// import { cn } from '@/lib/utils'
// import { HTMLAttributes, forwardRef } from 'react'

// export type CardProps = HTMLAttributes<HTMLDivElement>

// export const Card = forwardRef<HTMLDivElement, CardProps>(
//   ({ className, ...props }, ref) => {
//     return (
//       <div
//         ref={ref}
//         className={cn(
//           'rounded-lg border bg-white shadow-sm',
//           className
//         )}
//         {...props}
//       />
//     )
//   }
// )
// Card.displayName = 'Card'   

// import * as React from "react";

// export type CardProps = React.HTMLAttributes<HTMLDivElement>

// export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
//   return (
//     <div className={`border border-gray-200 rounded-lg shadow-md p-4 ${className}`} {...props}>
//       {children}
//     </div>
//   );
// };

// export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;


import * as React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<CardProps> = ({ className = "", children, ...props }) => {
  return (
    <div className={`border border-gray-200 rounded-lg shadow-md p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Updated to accept className
export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
