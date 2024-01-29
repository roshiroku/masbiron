import classNames from "classnames";

export default function MainContainer({ children, className, ...props }) {
  return (
    <div className={classNames("w-full max-w-[1024px] mx-auto px-4 lg:px-0", className)} {...props}>
      {children}
    </div>
  );
}
