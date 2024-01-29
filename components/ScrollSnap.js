import classNames from "classnames";
import React, { useEffect, useRef } from "react";

export default function ScrollSanp({ vertical, children, ...props }) {
  const container = useRef();
  const list = useRef();
  const snapper = useRef();

  children = React.Children.toArray(children);

  useEffect(() => {
    if (snapper.current) snapper.current.unmount();

    const snapperType = vertical ? VerticalScrollSnapper : HorizontalScrollSnapper;
    snapper.current = new snapperType(list.current, container.current);
    snapper.current.mount();

    return () => {
      snapper.current.unmount();
    };
  }, [vertical]);

  return (
    <div ref={container} {...props}>
      <ul
        ref={list}
        className={classNames("flex", {
          "flex-col": vertical,
          "overflow-hidden sticky top-0": !vertical,
        })}
      >
        {children.map((child) => (
          <li key={child.key} className="w-full shrink-0">
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
}

class ScrollSnapper {
  get scrollHeight() {
    return this.scrollWidth;
  }

  get scrollWidth() {
    return this.list.scrollWidth;
  }

  get scrollTop() {
    return Math.min(0, Math.max(this.minScrollTop, this.container.offsetTop - window.scrollY));
  }

  get minScrollTop() {
    return -(this.scrollHeight - window.innerHeight);
  }

  constructor(list, container) {
    this.list = list;
    this.container = container;
    this.prevScrollTop = this.scrollTop;
  }

  onScroll() {}

  onScrollEnd() {
    if (this.scrollTop < 0 && this.scrollTop > this.minScrollTop) {
      const { round, floor, ceil } = Math;
      const dir = this.scrollTop - this.prevScrollTop;
      const steps =
        round(10 * (this.list.children.length - 1) * (this.scrollTop / this.minScrollTop)) / 10;
      const page = dir > 0 ? floor(steps) : ceil(steps);
      const scrollTop = (page * this.minScrollTop) / (this.list.children.length - 1);
      const top = this.container.offsetTop - scrollTop;

      if (Math.abs(top - window.scrollY) > 1) {
        window.scroll({ top, behavior: "smooth" });
      }
    }

    this.prevScrollTop = this.scrollTop;
  }

  onResize() {
    this.onScrollEnd();
  }

  mount() {
    this.onScroll = this.onScroll.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);
    this.onResize = this.onResize.bind(this);

    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("scrollend", this.onScrollEnd);
    window.addEventListener("resize", this.onResize);
  }

  unmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("scrollend", this.onScrollEnd);
    window.removeEventListener("resize", this.onResize);
  }
}

class HorizontalScrollSnapper extends ScrollSnapper {
  get width() {
    return this.list.offsetWidth;
  }

  get height() {
    return this.list.offsetHeight;
  }

  onScroll() {
    this.list.scroll({
      left: (this.scrollWidth - this.width) * (this.scrollTop / -this.minScrollTop),
    });
  }

  onResize() {
    this.container.style.height = `${this.scrollHeight}px`;
    super.onResize();
  }

  mount() {
    this.onResize();
    super.mount();
  }

  unmount() {
    this.container.style.height = "";
    super.unmount();
  }
}

class VerticalScrollSnapper extends ScrollSnapper {
  get scrollHeight() {
    const pageHeight = this.list.firstChild.offsetHeight;
    const offsetHeight = pageHeight * (this.list.children.length - 1) + window.innerHeight;
    return offsetHeight;
  }
}
