import Link from "next/link";
import { repeat } from "@/utils/arrays";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";

const MAX_PAGES = 9;
const MIN_PAGES = 5;

export default function FeedNav({ url, pagination }) {
  const { page, pageCount } = pagination;
  const [maxPages, setMaxPages] = useState(0);
  const start =
    page < Math.ceil(maxPages / 2)
      ? 1
      : Math.max(
          1,
          pageCount - page < Math.ceil(maxPages / 2)
            ? pageCount - maxPages
            : page - Math.floor(maxPages / 2)
        );
  const end = Math.min(start + maxPages, pageCount);
  const onResize = useCallback(() => {
    if (window.innerWidth < 769) {
      if (maxPages != MIN_PAGES) setMaxPages(() => MIN_PAGES);
    } else if (maxPages != MAX_PAGES) {
      setMaxPages(() => MAX_PAGES);
    }
  }, [maxPages]);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return (
    <nav className="flex gap-2 items-center justify-center">
      <FeedNavButton href={`${url}${page > 2 ? `/${page - 1}` : ""}`} disabled={page < 2}>
        <ChevronRight className="text-3xl" />
      </FeedNavButton>
      {repeat(end - start + 1).map((v, i) => (
        <Link
          key={i}
          href={`${url}${start + i - 1 ? `/${start + i}` : ""}`}
          className={classNames("py-1.5 px-3 rounded-md hover:bg-opaque-100 active:bg-opaque-200", {
            "bg-opaque-200 pointer-events-none": start + i == page,
          })}
          scroll={false}
        >
          {start + i}
        </Link>
      ))}
      <FeedNavButton
        href={`${url}${`/${Math.min(pageCount, page + 1)}`}`}
        disabled={page > pageCount - 1}
      >
        <ChevronLeft className="text-3xl" />
      </FeedNavButton>
    </nav>
  );
}

function FeedNavButton({ href, disabled, children }) {
  return (
    <Link
      href={href}
      className={classNames({
        "opacity-20 pointer-events-none": disabled,
        "opacity-50 hover:opacity-70 active:opacity-100": !disabled,
      })}
      scroll={false}
    >
      {children}
    </Link>
  );
}
