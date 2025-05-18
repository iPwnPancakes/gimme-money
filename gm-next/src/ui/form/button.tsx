import * as React from "react";
import { forwardRef } from "react";
import { Button as ButtonComponent, ButtonProps } from "@components/button";
import { useFormContext } from "@/lib/form";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const form = useFormContext();

    return (
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <ButtonComponent
            variant="default"
            className={className}
            ref={ref}
            disabled={isSubmitting}
            {...props}
          >
            {children}
          </ButtonComponent>
        )}
      </form.Subscribe>
    );
  }
);

Button.displayName = "Button";

export default Button;
