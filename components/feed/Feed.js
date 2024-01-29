/**
 * @typedef {import("../../utils/socials").SocialNetworkId} SocialNetworkId
 */

import dynamic from "next/dynamic";
import { SOCIALS_INFO } from "../../utils/socials";
import classNames from "classnames";
import ActionButton from "@/components/ActionButton";
import FeedNav from "@/components/feed/FeedNav";
import BorderEffect from "../fx/BorderEffect";
import { useEffect, useMemo, useState } from "react";

function importEmbed(embed) {
  return dynamic(
    import("react-social-media-embed").then((mod) => mod[embed]),
    { ssr: false }
  );
}

const TwitterEmbed = importEmbed("TwitterEmbed");
const YouTubeEmbed = importEmbed("YouTubeEmbed");
const TikTokEmbed = importEmbed("TikTokEmbed");
const InstagramEmbed = importEmbed("InstagramEmbed");
const FacebookEmbed = importEmbed("FacebookEmbed");

const THREE_COL_CLASSES = "max-w-fit lg:max-w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
const TWO_COL_CLASSES = "grid-cols-1 lg:grid-cols-2";
const EMBED_HOVER_UPWARDS_CLASS = "[&_.rsme-embed:hover]:-translate-y-1";
const EMBED_HOVER_SHADOW_CLASS =
  "[&_.rsme-embed:hover]:shadow-md dark:[&_.rsme-embed]:shadow-white/5";

/**
 * @param {{ network: SocialNetworkId; posts: *[]; }} props
 */
export default function Feed({ network, posts, pagination }) {
  const Grid = useMemo(() => {
    switch (network) {
      case "X":
        return XFeed;
      case "YouTube":
        return YouTubeFeed;
      case "TikTok":
        return TikTokFeed;
      case "Instagram":
        return InstagramFeed;
      case "Facebook":
        return FacebookFeed;
    }
  }, [network]);
  const [unread, setUnread] = useState({});

  useEffect(() => {
    const temp = {};

    for (const { url, network } of posts) {
      const key = `${network}_` + url.split("/").pop().split("=").pop();

      if (!localStorage.getItem(key)) {
        temp[url] = true;
        localStorage.setItem(key, true);
      }
    }

    setUnread(temp);
  }, [posts]);

  return (
    <div className="inline-flex flex-col gap-4 items-center [&_.rsme-embed]:transition">
      {Grid && posts.length ? (
        <>
          <Grid posts={posts} unread={unread} />
          {pagination.pageCount > 1 ? (
            <FeedNav url={`/feed/${SOCIALS_INFO[network].slug}`} pagination={pagination} />
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <div className="text-xl tracking-tight">עדיין לא נוספו תכנים מ-{network}</div>
          {/* <div className="tracking-tight">
            <ActionButton href="mailto:contact@masbiron.com" rounded gradient="r" primary>
              הציעו תכנים
            </ActionButton>
          </div> */}
        </>
      )}
    </div>
  );
}

function XFeed({ posts, unread }) {
  return (
    <ResponsiveGrid className={THREE_COL_CLASSES}>
      {posts.map(({ url }) => (
        <div key={url}>
          <Embed border={unread[url]}>
            <TwitterEmbed
              url={url}
              width={325}
              twitterTweetEmbedProps={{
                options: {
                  /*conversation: "none", cards: "none"*/
                },
              }}
              linkText="טוען מ-X"
            />
          </Embed>
        </div>
      ))}
    </ResponsiveGrid>
  );
}

function YouTubeFeed({ posts, unread }) {
  return (
    <ResponsiveGrid
      className={classNames(
        TWO_COL_CLASSES,
        "[&_.rsme-d-none+div]:!rounded-xl [&_.rsme-embed]:!rounded-xl",
        "[&_iframe]:!h-auto [&_.rsme-d-none+div]:!h-full [&_iframe]:aspect-[1.777] [&_.rsme-embed]:aspect-[1.777]"
      )}
    >
      {posts.map(({ url }) => (
        <div key={url}>
          <Embed border={unread[url]}>
            <YouTubeEmbed url={url} width={500} linkText="טוען מ-YouTube" />
          </Embed>
        </div>
      ))}
    </ResponsiveGrid>
  );
}

function TikTokFeed({ posts, unread }) {
  return (
    <ResponsiveGrid
      className={classNames(
        THREE_COL_CLASSES,
        "[&_iframe]:h-[739px] [&_iframe]:!max-h-[739px] [&_iframe]:!min-h-[721px]"
      )}
    >
      {posts.map(({ url }) => (
        <div key={url}>
          <Embed border={unread[url] ? { radius: 10 } : undefined}>
            <TikTokEmbed url={url} width={325} linkText="טוען מ-TikTok" />
          </Embed>
        </div>
      ))}
    </ResponsiveGrid>
  );
}

function InstagramFeed({ posts, unread }) {
  return (
    <ResponsiveGrid
      className={classNames(
        THREE_COL_CLASSES,
        "[&_blockquote>div]:!rounded-xl [&_iframe]:!rounded-xl",
        "[&_iframe[height='0']]:!border-0 [&_iframe]:!m-0 [&_iframe]:!w-full"
      )}
    >
      {posts.map(({ url }) => (
        <div key={url}>
          <Embed border={unread[url]}>
            <InstagramEmbed
              url={url}
              width={328}
              linkText="טוען מ-Instagram"
              className="!overflow-visible"
            />
          </Embed>
        </div>
      ))}
    </ResponsiveGrid>
  );
}

function FacebookFeed({ posts }) {
  return (
    <ResponsiveGrid
      className={classNames(TWO_COL_CLASSES, EMBED_HOVER_SHADOW_CLASS, EMBED_HOVER_UPWARDS_CLASS)}
    >
      {posts.map(({ url }) => (
        <div key={url}>
          <FacebookEmbed url={url} width={325} linkText="טוען מ-Facebook" />
        </div>
      ))}
    </ResponsiveGrid>
  );
}

function ResponsiveGrid({ children, className, ...props }) {
  return (
    <div
      className={classNames(
        "grid gap-4 [&_iframe]:max-w-full [&_.rsme-embed]:max-w-full [&_.rsme-d-none+div]:!max-w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function Embed({ border, children }) {
  return border ? (
    <BorderEffect width={border?.width ?? 2} radius={border?.radius ?? 14} gradient="r" primary>
      {children}
    </BorderEffect>
  ) : (
    children
  );
}
