/** @format */
import React from "react";

export const Badge = ({
 children,
 className,
 variant = "default",
 ...props
}) => {
 let baseClasses =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";

 const variantClasses = {
  default: "border-transparent bg-primary text-white",
  secondary: "border-transparent bg-secondary text-white",
  destructive: "border-transparent bg-red-600 text-white",
  outline: "border-gray-300 text-gray-700",
 };

 return (
  <div
   className={`${baseClasses} ${variantClasses[variant]} ${className || ""}`}
   {...props}>
   {children}
  </div>
 );
};
