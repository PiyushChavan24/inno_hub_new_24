/** @format */

import React, { forwardRef } from "react";
import { cn } from "../../lib/utils"; // adjust the path if needed

const Input = forwardRef(({ className, type = "text", ...props }, ref) => {
 return (
  <input
   type={type}
   className={cn(
    "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    className
   )}
   ref={ref}
   {...props}
  />
 );
});

Input.displayName = "Input";

export { Input };
