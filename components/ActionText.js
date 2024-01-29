import classNames from "classnames";

export default function ActionText({
  as,
  primary,
  secondary,
  gradient,
  className,
  children,
  ...props
}) {
  const Component = as ?? "span";

  return (
    <Component
      className={classNames(
        "bg-clip-text",
        {
          "text-transparent": gradient,
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
          "text-primary": primary && !gradient,
          "text-secondary": secondary && !gradient,
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
