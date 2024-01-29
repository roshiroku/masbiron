import { SOCIALS_INFO } from "@/utils/socials";
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

  for (const { slug } of Object.values(SOCIALS_INFO)) {
    paths.push({ params: { slug } });
  }

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return await getFeedProps({ params });
}
