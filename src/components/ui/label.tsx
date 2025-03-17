import { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return <label className="text-sm font-medium" {...props}>{children}</label>;
};
