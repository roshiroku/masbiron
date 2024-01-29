import HeroSection from "@/components/HeroSection";
import FeedsSection from "@/components/FeedsSection";
import Head from "next/head";
import { SOCIALS_INFO } from "@/utils/socials";
import { Strapi } from "@/utils/strapi";
import { usePathname } from "next/navigation";

export function metaDescription(network) {
  return `בואו לראות את התגובות של תומכי ישראל ב${
    network ? `-${network}` : "רשתות החברתיות מרחבי העולם"
  } למלחמה נגד חמאס!`;
}

export default function HomePage({ title, description, network, posts, pagination }) {
  const pathname = usePathname();

  title ??= "מסבירון - מתחברים להסברה בעולם";
  description ??= metaDescription();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://www.masbiron.com/icon.png" />
        <meta property="og:url" content={`https://www.masbiron.com${pathname}`} />
      </Head>
      <HeroSection />
      <FeedsSection network={network} posts={posts} pagination={pagination} />
    </>
  );
}

export async function getStaticProps({ params = { slug: "x", page: "1" } }) {
  const { slug, page } = params;
  const network = SOCIALS_INFO[slug].id;
  const { data, meta } = await Strapi.api("posts")
    .filter("network", network)
    .sort("date:desc", "id:desc")
    .paginate(parseInt(page ?? "1"))
    .execute();
  const posts = data.map(({ attributes }) => attributes);
  const pagination = meta.pagination;

  return { props: { network, posts, pagination } };
}
