import classNames from "classnames";
import Link from "next/link";
import React from "react";

function ActionButton(
  {
    as,
    href,
    xs,
    sm,
    md,
    lg,
    xl,
    rounded,
    primary,
    secondary,
    gradient,
    className,
    children,
    ...props
  },
  ref
) {
  const Component = as ?? href ? Link : "button";

  return (
    <Component
      className={classNames(
        className,
        "inline-block p-0.5 font-medium [&>div]:hover:bg-opaque-100 [&>div]:active:bg-opaque-200",
        {
          "rounded-lg": rounded,
          "bg-gradient-to-t": gradient == "t",
          "bg-gradient-to-b": gradient == "b",
          "bg-gradient-to-r": gradient == "r",
          "bg-gradient-to-l": gradient == "l",
          "bg-gradient-to-tr": gradient == "tr",
          "bg-gradient-to-tl": gradient == "tl",
          "bg-gradient-to-br": gradient == "br",
          "bg-gradient-to-bl": gradient == "bl",
          "from-primary to-secondary": primary && gradient,
          "from-secondary to-primary": secondary && gradient,
          "bg-primary": primary && !gradient,
          "bg-secondary": secondary && !gradient,
        }
      )}
      {...(href ? { href } : {})}
      {...props}
      ref={ref}
    >
      <div className={classNames("bg-opaque px-4 py-2", { "rounded-md": rounded })}>{children}</div>
    </Component>
  );
}

export default React.forwardRef(ActionButton);
