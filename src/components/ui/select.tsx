import * as React from "react";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export const Select: React.FC<SelectProps> = ({ className, children, ...props }) => {
  return (
    <select className={`border border-gray-300 rounded-lg px-4 py-2 w-full ${className}`} {...props}>
      {children}
    </select>
  );
};

export const SelectTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const SelectValue: React.FC<{ placeholder: string }> = ({ placeholder }) => <option value="">{placeholder}</option>;
export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => (
  <option value={value}>{children}</option>
);
