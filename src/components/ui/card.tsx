// import * as React from "react";

// export type CardProps = React.HTMLAttributes<HTMLDivElement>;

// export const Card: React.FC<CardProps> = ({ className = "", children, ...props }) => {
//   return (
//     <div className={`border border-gray-200 rounded-lg shadow-md p-4 ${className}`} {...props}>
//       {children}
//     </div>
//   );
// };

// // Updated to accept className
// export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
//   return <div className={`p-4 ${className}`}>{children}</div>;
// };


import * as React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<CardProps> = ({ className = "", children, ...props }) => {
  return (
    <div className={`border border-gray-200 rounded-lg shadow-md ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = "", 
  children 
}) => {
  return <div className={`p-6 pb-2 ${className}`}>{children}</div>;
};

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = "", 
  children 
}) => {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
};

export const CardDescription: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = "", 
  children 
}) => {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = "", 
  children 
}) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = "", 
  children 
}) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};