import { socialProfiles } from "@/constants/social-data";
import { AuthorType, SiteMetaData } from "@/types";

export const defaultAuthor: AuthorType = {
  name: "Trịnh Đình Tài",
  handle: "@taitddev",
  socialProfiles,
};

const defaultTitle = `${defaultAuthor.name}'s Blog`;
const defaultDescription = `I'm ${defaultAuthor.name}. Building hackin’ cool digital products around the world 🌴.`;

export const siteMetadata: SiteMetaData = {
  title: {
    template: `%s | ${defaultTitle}`,
    default: defaultTitle,
  },
  description: defaultDescription,
  newsletterUrl: "https://tinyletter.com/tailwind-nextjs-starter-blog",
  postsOnHomePage: 8,
};
