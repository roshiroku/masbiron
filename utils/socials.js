import slugify from "slugify";
import { SocialIcon } from "react-social-icons";

/**
 * @typedef {"X" | "YouTube" | "TikTok" | "Instagram" | "Facebook"} SocialNetworkId
 */

export const X = "X";
export const YT = "YouTube";
export const TT = "TikTok";
export const IT = "Instagram";
export const FB = "Facebook";

const SOCIAL_URLS = {
  [X]: "www.x.com",
  [YT]: "www.youtube.com",
  [TT]: "www.tiktok.com",
  [IT]: "www.instagram.com",
  [FB]: "www.facebook.com",
};

const SOCIALS_INFO = {
  [X]: socialsEntry(X),
  [YT]: socialsEntry(YT),
  [TT]: socialsEntry(TT),
  [IT]: socialsEntry(IT),
  [FB]: socialsEntry(FB),
};

for (const entry of Object.values(SOCIALS_INFO)) {
  SOCIALS_INFO[entry.slug] = entry;
}

/** @type {["X", "YouTube", "TikTok", "Instagram", "Facebook"]} */
const SOCIALS = [X, YT, TT, IT, FB];

/**
 * @param {SocialNetworkId} id
 */
function socialsEntry(id) {
  const slug = slugify(id, { lower: true });

  return {
    id,
    slug,
    url: SOCIAL_URLS[id],
    icon: (
      <SocialIcon
        as="i"
        network={slug}
        style={{ maxWidth: "100%", height: "auto", aspectRatio: 1 }}
      />
    ),
  };
}

export { SOCIALS, SOCIALS_INFO };
