import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const Wrapper = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("wrapper", className)}>
        {props.children}
      </div>
    );
  }
);