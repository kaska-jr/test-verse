import { cn } from "@/lib/utils";
import React from "react";

const Label = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-[15px] font-medium leading-[35px] text-white",
      className
    )}
    {...props}
  />
));

Label.displayName = "Label";

export { Label };
