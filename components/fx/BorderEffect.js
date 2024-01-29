import classNames from "classnames";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "throttle-debounce";
import { v4 as uuid } from "uuid";

export default function BorderEffect({
  as,
  width: borderWidth = 2,
  radius: borderRadius = 0,
  color = "black",
  gradient,
  primary,
  secondary,
  children,
  className,
  ...props
}) {
  const Component = as ?? "div";
  const ref = useRef();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const onResize = useMemo(
    () =>
      debounce(50, () => {
        if (ref.current) {
          setWidth(ref.current.offsetWidth);
          setHeight(ref.current.offsetHeight);
        }
      }),
    []
  );
  const id = useMemo(() => uuid(), []);
  const observer = useRef();

  useEffect(() => {
    let temp = observer.current;

    if (ref.current && !temp) {
      temp = observer.current = new MutationObserver(onResize);
      temp.observe(ref.current, { attributes: true, childList: true, subtree: true });
    }

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      temp?.disconnect();
    };
  }, [onResize]);

  return (
    <Component ref={ref} className={classNames("relative", className)} {...props}>
      {children}
      <svg
        viewBox={`0 0 ${width + 2 * borderWidth} ${height + 2 * borderWidth}`}
        height={height + 2 * borderWidth}
        width={width + 2 * borderWidth}
        className="absolute pointer-events-none z-10"
        style={{
          top: `-${borderWidth}px`,
          left: `-${borderWidth}px`,
        }}
      >
        {gradient ? (
          <defs>
            <linearGradient
              id={`grad_${id}`}
              x1={gradient.endsWith("l") ? "100%" : "0%"}
              x2={gradient.endsWith("l") || !gradient.endsWith("r") ? "0%" : "100%"}
              y1={gradient.startsWith("t") ? "100%" : "0%"}
              y2={gradient.startsWith("t") || !gradient.startsWith("b") ? "0%" : "100%"}
            >
              <stop
                offset="0%"
                stopColor={`rgb(var(--${primary ? "primary" : "secondary"}-rgb))`}
              />
              <stop
                offset="100%"
                stopColor={`rgb(var(--${primary ? "secondary" : "primary"}-rgb))`}
              />
            </linearGradient>
          </defs>
        ) : (
          ""
        )}
        <rect
          fill="none"
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={width + borderWidth}
          height={height + borderWidth}
          rx={borderRadius}
          stroke={gradient ? `url(#grad_${id})` : color}
          strokeWidth={borderWidth}
          style={
            {
              // strokeDasharray: length,
              // strokeDashoffset: length,
            }
          }
        />
      </svg>
    </Component>
  );
}
