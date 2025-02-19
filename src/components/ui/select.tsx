// import * as React from "react";

// export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

// export const Select: React.FC<SelectProps> = ({ className, children, ...props }) => {
//   return (
//     <select className={`border border-gray-300 rounded-lg px-4 py-2 w-full ${className}`} {...props}>
//       {children}
//     </select>
//   );
// };

// export const SelectTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
// export const SelectValue: React.FC<{ placeholder: string }> = ({ placeholder }) => <option value="">{placeholder}</option>;
// export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
// export const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => (
//   <option value={value}>{children}</option>
// );


"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils"; // Ensure you have a utility for classNames
import { Check, ChevronDown } from "lucide-react";

export const Select = SelectPrimitive.Root;
export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-gray-500",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export const SelectValue = SelectPrimitive.Value;
export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "border border-gray-200 bg-white shadow-md rounded-md",
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-gray-100",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator>
      <Check className="h-4 w-4" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
