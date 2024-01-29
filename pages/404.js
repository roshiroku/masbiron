import TextSection from "@/components/TextSection";
import Head from "next/head";
import { metaDescription } from ".";

export default function PageNotFound() {
  const title = "מסבירון - הדף לא נמצא";
  const description = metaDescription();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://www.masbiron.com/icon.png" />
      </Head>
      <TextSection head="סמאללה 404" body="הדף לא נמצא..." />
    </div>
  );
}
