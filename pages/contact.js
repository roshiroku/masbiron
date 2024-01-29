import Head from "next/head";
import TextSection from "@/components/TextSection";
import ActionButton from "@/components/ActionButton";
import { usePathname } from "next/navigation";
import { metaDescription } from ".";

export default function ContactPage({ title, description }) {
  const pathname = usePathname();

  title ??= "מסבירון - צרו קשר";
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
      <TextSection head="צרו קשר">
        <div className="flex flex-col gap-4">
          <TextSection.Paragraph>
            ניתן לפנות אלינו באימייל{" "}
            <a href="mailto:contact@masbiron.com" className="text-secondary hover:underline">
              contact@masbiron.com
            </a>{" "}
            בכל נושא שקשור באתר.
          </TextSection.Paragraph>
          <div>
            <ActionButton href="mailto:contact@masbiron.com" rounded gradient="r" primary>
              כתבו לנו
            </ActionButton>
          </div>
        </div>
      </TextSection>
    </>
  );
}
