import { SOCIALS_INFO } from "@/utils/socials";
import { Strapi } from "@/utils/strapi";
import HomePage, { getStaticProps as getFeedProps, metaDescription } from "@/pages/index";
import { useEffect } from "react";

export default function FeedPage({ network, posts, pagination }) {
  useEffect(() => {
    const el =
      document.querySelector("#feedTabs:not(.hidden)") ?? document.querySelector("#feedTabList");
    window.scroll({ top: el.offsetTop, behavior: "smooth" });
  }, [pagination.page]);

  return HomePage({ description: metaDescription(network), network, posts, pagination });
}

export async function getStaticPaths() {
  const paths = [];

  for (const { id, slug } of Object.values(SOCIALS_INFO)) {
    const { pageCount } = (await Strapi.api("posts").filter("network", id).fields("id").execute())
      .meta.pagination;

    for (let i = 0; i < Math.max(1, pageCount); i++) {
      paths.push({ params: { slug, page: `${i + 1}` } });
    }
  }

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return await getFeedProps({ params });
}
