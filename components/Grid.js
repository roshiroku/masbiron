import classNames from "classnames";
import React from "react";

const COL_CLASSES = [
  "grid-cols-none",
  "grid-cols-1",
  "grid-cols-2",
  "grid-cols-3",
  "grid-cols-4",
  "grid-cols-5",
];

export default function Grid({ fitContent, children, cols = 3, className, ...props }) {
  return (
    <div
      className={classNames("grid gap-4", COL_CLASSES[cols], className, {
        "max-w-fit": fitContent,
      })}
      {...props}
    >
      {children}
    </div>
  );
}
